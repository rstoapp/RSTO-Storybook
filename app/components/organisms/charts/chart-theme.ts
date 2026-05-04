/**
 * chart-theme.ts
 * RSTO Chart Design System — v4.1 Outback Palette Desaturated
 * Chart.js ^4.4.1 · react-chartjs-2 ^5.2.0
 */

// ─── Neutral surface tokens ───────────────────────────────────────────────────

export const P = {
  paper:  '#FFFFFF',   // Card background
  bone:   '#EEE8DF',   // Gridlines, tooltip background
  sand:   '#E0D8CC',   // Card border, tooltip border
  stone:  '#A0A49C',   // Reference lines, decorative (Stone 50)
  shadow: '#8A7B6A',   // Axis ticks, legend text, filter labels (4.8:1 AA)
  earth:  '#5C4F3A',   // Tooltip body, filter label text
  bark:   '#3D3028',   // Card title — between earth and ink
  ink:    '#2C2416',   // Tooltip title, filter values
  o50:    '#F28B2D',   // RSTO brand orange — eyebrow label
} as const;

export type PaletteKey = keyof typeof P;

// ─── Stacked bar series (BarChart, WeeklyAttendanceChart) ─────────────────────
// stack[0] = bottom/dominant → stack[3] = top/smallest

export const STACK_COLORS = [
  '#567A6E',  // Sage 60 — stack.1
  '#80A89C',  // Sage 40 — stack.2
  '#8BBFCC',  // Blue 38 — stack.3
  '#5A9EAF',  // Blue 55 — stack.4
] as const;

// ─── Multi-series palette (LineChart, MultiLineChart) ────────────────────────
// Assign by performance rank: highest → Series 1 (Blue 70), lowest → Series 6 (Amber 35)

export const SERIES_COLORS = [
  '#2E6878',  // Blue 70  — Series 1 · top performer / primary (5.8:1 AAA)
  '#5A9EAF',  // Blue 55  — Series 2 · mid-range
  '#8BBFCC',  // Blue 38  — Series 3 · light (decorative only)
  '#8F4E2A',  // Amber 75 — Series 4 · contrasting warm
  '#D4844A',  // Amber 55 — Series 5 · mid-warm
  '#E8B48A',  // Amber 35 — Series 6 · low-signal (decorative only)
] as const;

export const SERIES_NAMES = [
  'Series 1 · Blue 70',
  'Series 2 · Blue 55',
  'Series 3 · Blue 38',
  'Series 4 · Amber 75',
  'Series 5 · Amber 55',
  'Series 6 · Amber 35',
] as const;

// ─── Semantic RAG palette ─────────────────────────────────────────────────────
// Use when colour carries meaning. Apply consistently across all views.
//
// RAG progression: On track → Neutral → Caution → Needs attention
//                  Sage 40    Blue 55   Amber 55  Amber 75

export const SEMANTIC = {
  positive:  '#80A89C',  // Sage 40  — On track / above threshold
  neutral:   '#5A9EAF',  // Blue 55  — Neutral / right direction
  caution:   '#D4844A',  // Amber 55 — Caution / below threshold
  attention: '#8F4E2A',  // Amber 75 — Needs attention / critical
  reference: '#A0A49C',  // Stone 50 — Reference / total lines
} as const;

export const SEMANTIC_LABELS = {
  positive:  'On track',
  neutral:   'Neutral',
  caution:   'Caution',
  attention: 'Needs attention',
  reference: 'Reference',
} as const;

// ─── Weekly attendance / heatmap scale (10 series, bottom → top) ─────────────
// Used in WeeklyAttendanceChart. "Did not attend" always renders at 55% opacity.

export const HEATMAP_COLORS = [
  '#284E44',  // Sage 80 — 30+ hrs        (on track — darkest)
  '#3D6860',  // Sage 70 — 25–<30 hrs
  '#567A6E',  // Sage 60 — 15–<25 hrs
  '#80A89C',  // Sage 40 — 13–<15 hrs
  '#8BBFCC',  // Blue 38 — 10–<13 hrs
  '#B8D8E2',  // Blue 22 — 8–<10 hrs
  '#E8B48A',  // Amber 35 — 6–<8 hrs
  '#D4844A',  // Amber 55 — 4–<6 hrs
  '#B06230',  // Amber 65 — <4 hrs
  '#A0A49C',  // Stone 50 — Did not attend (always at 55% opacity)
] as const;

export const HEATMAP_NAMES = [
  '30+ hrs',
  '25–<30 hrs',
  '15–<25 hrs',
  '13–<15 hrs',
  '10–<13 hrs',
  '8–<10 hrs',
  '6–<8 hrs',
  '4–<6 hrs',
  '<4 hrs',
  'Did not attend',
] as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const CHART_FONT_FAMILY = "'Open Sans', sans-serif";

export const CHART_FONT_SIZES = {
  axisLabel:    11,
  legend:       11,
  tooltipTitle: 12,
  tooltipBody:  11,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert hex + opacity to rgba string. */
export function hexAlpha(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}
