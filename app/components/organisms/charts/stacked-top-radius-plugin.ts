/**
 * stacked-top-radius-plugin.ts
 * Chart.js 4.x plugin — rounds only the topmost visible bar segment per column.
 *
 * Problem: Chart.js applies borderRadius to every bar in a dataset uniformly.
 * In a stacked chart, this rounds the bottom corners of middle segments,
 * which looks wrong. This plugin fixes that by computing the topmost
 * non-zero dataset per column and applying radius only there.
 *
 * Works for:
 *   - Vertical stacked bars   (indexAxis: 'x', default)
 *   - Horizontal stacked bars (indexAxis: 'y')
 *   - Mixed bar+line charts   (line datasets are ignored)
 *
 * Registration:
 *   import { stackedTopRadiusPlugin } from './stacked-top-radius-plugin';
 *   Chart.register(stackedTopRadiusPlugin);
 *
 * Activation per chart (pass via options):
 *   options: { _stackedTopRadius: 4 }
 *
 * The _stackedTopRadius value is the pixel radius applied to the top corners
 * of the topmost segment. Bottom corners of all segments remain 0.
 */

import type { Chart, Plugin } from 'chart.js';

export const STACKED_TOP_RADIUS = 4;

// We store the original draw() method on each element so we can restore it
// after the render cycle (needed for re-updates where the data changes and
// a previously-zero element becomes non-zero).
const ORIG_DRAW = Symbol('origDraw');

type BarEl = {
  [ORIG_DRAW]?: (ctx: CanvasRenderingContext2D) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  options: {
    borderRadius: number | { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
    borderSkipped: string | boolean;
  };
};

function barDatasets(chart: Chart) {
  return chart.data.datasets
    .map((ds, i) => ({ ds, i }))
    .filter(({ ds }) => !('type' in ds) || (ds as { type?: string }).type === 'bar');
}

function applyRadiusAndSuppressZeros(chart: Chart): void {
  const r = (chart.options as Record<string, unknown>)['_stackedTopRadius'] as number | undefined;
  if (!r) return;

  const horizontal = chart.options.indexAxis === 'y';
  const allBars = barDatasets(chart);

  // Group bar datasets by their `stack` key so each independent stack
  // (e.g. 'gp' and 'mdhs' in a grouped-stacked chart) gets its own
  // topmost-segment calculation. Charts with a single stack just end up
  // with one group and behave identically to before.
  const stackGroups = new Map<string, typeof allBars>();
  for (const item of allBars) {
    const key = (item.ds as { stack?: string }).stack ?? '__default__';
    if (!stackGroups.has(key)) stackGroups.set(key, []);
    stackGroups.get(key)!.push(item);
  }

  const numPoints = allBars[0]?.ds?.data?.length ?? 0;

  for (const bars of Array.from(stackGroups.values())) {
    for (let col = 0; col < numPoints; col++) {
      // Find the topmost non-zero bar dataset for this stack + column.
      let topIndex = -1;
      for (let k = bars.length - 1; k >= 0; k--) {
        if (Number(bars[k].ds.data[col]) > 0) { topIndex = bars[k].i; break; }
      }

      for (const { ds, i } of bars) {
        const meta = chart.getDatasetMeta(i);
        const el = meta.data[col] as unknown as BarEl;
        if (!el) continue;

        const value = Number(ds.data[col]);

        // Restore draw if it was previously suppressed (data might have changed).
        if (el[ORIG_DRAW]) {
          el.draw = el[ORIG_DRAW];
          delete el[ORIG_DRAW];
        }

        if (!el.options) continue;

        if (i === topIndex) {
          // Clone options — during non-hover render all elements in a dataset
          // share the SAME resolved-options reference. Without cloning, setting
          // borderRadius here would be overwritten when the next column's
          // element (same dataset, not topmost) sets borderRadius = 0.
          el.options = Object.assign({}, el.options);
          el.options.borderRadius = horizontal
            ? { topLeft: 0, topRight: r, bottomLeft: 0, bottomRight: r }
            : { topLeft: r, topRight: r, bottomLeft: 0, bottomRight: 0 };
          el.options.borderSkipped = false;
        } else {
          el.options.borderRadius = 0;
          el.options.borderSkipped = false;

          // 0-value elements above the topmost segment: replace draw() with
          // a no-op so Chart.js never paints them. This avoids the hairline
          // artifact from canvas anti-aliasing on a degenerate fill path,
          // without touching shared resolved-options like backgroundColor.
          if (value === 0) {
            el[ORIG_DRAW] = el.draw;
            el.draw = (_ctx: CanvasRenderingContext2D) => {};
          }
        }
      }
    }
  }
}

export const stackedTopRadiusPlugin: Plugin = {
  id: 'stackedTopRadius',
  // afterUpdate — after a full data/options change.
  // afterEvent  — after hover/click processing (setHoverStyle) but before render.
  // beforeDatasetsDraw — just before bar elements are drawn, in case the render
  //   cycle recalculated options between afterEvent and painting.
  afterUpdate: applyRadiusAndSuppressZeros,
  afterEvent(chart) { applyRadiusAndSuppressZeros(chart); },
  beforeDatasetsDraw: applyRadiusAndSuppressZeros,
};
