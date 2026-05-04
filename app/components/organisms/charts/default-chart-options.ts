/**
 * default-chart-options.ts
 * Shared Chart.js option factories for all RSTO chart components.
 *
 * Usage:
 *   import { makeScales, makeLegend, makeTooltip } from './default-chart-options';
 *
 *   const options = {
 *     ...BASE_OPTIONS,
 *     plugins: { legend: makeLegend(), tooltip: makeTooltip() },
 *     scales: makeScales({ stacked: true }),
 *   };
 */

import type { ChartOptions, ScaleOptions, LegendOptions, TooltipOptions } from 'chart.js';
import { P, CHART_FONT_FAMILY, CHART_FONT_SIZES } from './chart-theme';

// ─── Density ──────────────────────────────────────────────────────────────────

export const CHART_DENSITY = {
  compact:  { axisFont: 9.5,  legendFont: 10, legendPad: 10, axisPad: 4  },
  standard: { axisFont: 11,   legendFont: 11, legendPad: 14, axisPad: 8  },
  generous: { axisFont: 12.5, legendFont: 13, legendPad: 20, axisPad: 12 },
} as const;

export type ChartDensity = keyof typeof CHART_DENSITY;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScaleConfig {
  stacked?: boolean;
  /** Rotate x-axis labels 45° — use for dense time labels (WeeklyAttendanceChart). */
  rotateX?: boolean;
  /** Show vertical gridlines (x-axis grid). Default false. */
  showVerticalGrid?: boolean;
  /** Override grid line colour. Defaults to P.bone. */
  gridColor?: string;
  /** Y-axis tick callback, e.g. (v) => v + '%' */
  yTickCallback?: (value: number | string) => string;
  /** X-axis tick callback, e.g. for label truncation. Receives the raw label string and its index. */
  xTickCallback?: (value: string | number, index: number) => string;
  /** Disable Chart.js auto-skipping of x-axis labels. Defaults to true (Chart.js default). */
  xAutoSkip?: boolean;
  /** Explicit min/max for Y axis. */
  yMin?: number;
  yMax?: number;
  /** Density preset — overrides fontSize/yPadding when supplied. */
  density?: ChartDensity;
  /** Font size override. Defaults to CHART_FONT_SIZES.axisLabel. */
  fontSize?: number;
  /** Tick padding override. Defaults to 8 for Y, 4 for X. */
  yPadding?: number;
}

export interface LegendConfig {
  fontSize?: number;
  padding?: number;
  /** Density preset — overrides fontSize/padding when supplied. */
  density?: ChartDensity;
}

// ─── Base options (apply to all chart types) ──────────────────────────────────

export const BASE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 350 },
} satisfies Partial<ChartOptions>;

// ─── Scales ───────────────────────────────────────────────────────────────────

/**
 * Standard vertical bar / line scales.
 * X: no gridlines. Y: horizontal hairlines (P.bone).
 */
export function makeScales(config: ScaleConfig = {}): Record<string, ScaleOptions<'linear'>> {
  const {
    stacked = false,
    rotateX = false,
    showVerticalGrid = false,
    gridColor = P.bone,
    yTickCallback,
    xTickCallback,
    xAutoSkip = true,
    yMin,
    yMax,
    density,
    yPadding,
  } = config;

  const d = density ? CHART_DENSITY[density] : null;
  const fontSize = config.fontSize ?? d?.axisFont ?? CHART_FONT_SIZES.axisLabel;
  const resolvedYPadding = yPadding ?? d?.axisPad ?? 8;

  const tickFont = { family: CHART_FONT_FAMILY, size: fontSize };
  const tickColor = P.shadow;

  return {
    x: {
      stacked,
      border: { display: false },
      grid: showVerticalGrid
        ? { color: gridColor, lineWidth: 1, drawTicks: false }
        : { display: false },
      ticks: {
        font: tickFont,
        color: tickColor,
        autoSkip: xAutoSkip,
        maxRotation: rotateX ? 45 : 0,
        minRotation: rotateX ? 45 : 0,
        padding: 4,
        ...(xTickCallback ? { callback: xTickCallback } : {}),
      },
    } as ScaleOptions<'linear'>,
    y: {
      stacked,
      border: { display: false },
      grid: { color: gridColor, lineWidth: 1, drawTicks: false },
      ticks: {
        font: tickFont,
        color: tickColor,
        padding: resolvedYPadding,
        maxTicksLimit: 5,
        ...(yTickCallback ? { callback: yTickCallback } : {}),
      },
      ...(yMin !== undefined ? { min: yMin } : {}),
      ...(yMax !== undefined ? { max: yMax } : {}),
    } as ScaleOptions<'linear'>,
  };
}

/**
 * Horizontal bar scales (indexAxis: 'y').
 * Y: no gridlines (category axis). X: vertical hairlines.
 */
export function makeHorizontalScales(config: ScaleConfig = {}): Record<string, ScaleOptions<'linear'>> {
  const {
    stacked = false,
    gridColor = P.bone,
    density,
  } = config;

  const d = density ? CHART_DENSITY[density] : null;
  const fontSize = config.fontSize ?? d?.axisFont ?? CHART_FONT_SIZES.axisLabel;

  const tickFont = { family: CHART_FONT_FAMILY, size: fontSize };
  const tickColor = P.shadow;

  return {
    x: {
      stacked,
      border: { display: false },
      grid: { color: gridColor, lineWidth: 1, drawTicks: false },
      ticks: { font: tickFont, color: tickColor, maxTicksLimit: 5, padding: 4 },
    } as ScaleOptions<'linear'>,
    y: {
      stacked,
      border: { display: false },
      grid: { display: false },
      ticks: { font: tickFont, color: tickColor, padding: 4 },
    } as ScaleOptions<'linear'>,
  };
}

/**
 * Radar / spider scales.
 */
export function makeRadarScales(config: { fontSize?: number; gridColor?: string } = {}) {
  const { fontSize = CHART_FONT_SIZES.axisLabel, gridColor = P.bone } = config;
  return {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        font: { family: CHART_FONT_FAMILY, size: 9.5 },
        color: P.shadow,
        backdropColor: 'transparent',
      },
      grid: { color: gridColor },
      angleLines: { color: gridColor },
      pointLabels: {
        font: { family: CHART_FONT_FAMILY, size: fontSize },
        color: P.shadow,
      },
    },
  };
}

// ─── Legend ───────────────────────────────────────────────────────────────────

/**
 * Bottom-aligned legend — RSTO standard.
 * Rounded square boxes, Open Sans, shadow text.
 */
export function makeLegend(config: LegendConfig = {}): Partial<LegendOptions<'bar'>> {
  const d = config.density ? CHART_DENSITY[config.density] : null;
  const fontSize = config.fontSize ?? d?.legendFont ?? CHART_FONT_SIZES.legend;
  const padding = config.padding ?? d?.legendPad ?? 14;

  return {
    position: 'bottom',
    align: 'start',
    labels: {
      font: { family: CHART_FONT_FAMILY, size: fontSize },
      color: P.shadow,
      boxWidth: 11,
      boxHeight: 11,
      borderRadius: 3,
      useBorderRadius: true,
      padding,
    } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

/**
 * RSTO warm-neutral tooltip.
 * White background, sand border, ink/earth text, Open Sans.
 * Mode 'index' shows all segments at a data point; footer sums bar segments only.
 */
export function makeTooltip(): Partial<TooltipOptions<'bar'>> {
  return {
    mode: 'index',
    intersect: false,
    backgroundColor: P.paper,
    titleColor: P.ink,
    bodyColor: P.earth,
    footerColor: P.shadow,
    borderColor: P.sand,
    borderWidth: 1,
    titleFont: { family: CHART_FONT_FAMILY, size: CHART_FONT_SIZES.tooltipTitle, weight: '600' } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    bodyFont: { family: CHART_FONT_FAMILY, size: CHART_FONT_SIZES.tooltipBody } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    footerFont: { family: CHART_FONT_FAMILY, size: CHART_FONT_SIZES.tooltipBody, weight: '400' } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    footerMarginTop: 6,
    padding: 10,
    cornerRadius: 8,
    boxPadding: 4,
    boxWidth: 11,
    boxHeight: 11,
    usePointStyle: false,
    multiKeyBackground: 'transparent',
    callbacks: {
      labelColor: (item) => {
        const ds = item.chart.data.datasets[item.datasetIndex] as any;
        // Line datasets use transparent backgroundColor; fall back to borderColor.
        const bg = ds.backgroundColor;
        const color = (bg && bg !== 'transparent') ? bg : (ds.borderColor ?? P.shadow);
        return {
          borderColor: 'transparent',
          backgroundColor: color,
          borderWidth: 0,
          borderRadius: 3,
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      },
      footer: (items) => {
        // Sum only bar/stacked datasets — skip line overlays (type === 'line')
        const total = items.reduce((sum, item) => {
          const ds = item.chart.data.datasets[item.datasetIndex] as any;
          if (ds.type === 'line') return sum;
          return sum + (Number(item.parsed.y) || 0);
        }, 0);
        if (total === 0 || items.length <= 1) return '';
        return `Total: ${total}`;
      },
    },
  };
}

// ─── Dataset helpers ──────────────────────────────────────────────────────────

/**
 * Standard reference / total line dataset.
 * Dashed Stone 50 overlay — "Total women in cohort", "Total children enrolled".
 */
export function makeTotalLineDataset(
  label: string,
  data: number[],
  color: string = P.stone,
) {
  return {
    type: 'line' as const,
    label,
    data,
    borderColor: color,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderDash: [4, 3],
    pointBackgroundColor: color,
    pointBorderColor: 'white',
    pointBorderWidth: 2,
    pointRadius: 4.5,
    pointHoverRadius: 6,
    fill: false,
    tension: 0.1,
    order: -1,   // smaller = drawn last = on top of bar datasets (order: 0)
  };
}
