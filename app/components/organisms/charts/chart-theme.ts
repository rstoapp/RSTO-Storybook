/**
 * chart-theme.ts
 * RSTO Chart Design System — v4.1 Outback Palette Desaturated
 * Chart.js ^4.4.1 · react-chartjs-2 ^5.2.0
 */

// ─── Neutral surface tokens ───────────────────────────────────────────────────

export const P = {
  paper:   '#FFFFFF',   // Card background
  frost:   '#FAF8F4',   // Skeleton/loading background — barely-warm white
  linen:   '#F7F3ED',   // Empty state background — warm off-white, lighter than bone
  bone:    '#EEE8DF',   // Gridlines, tooltip background
  sand:    '#E0D8CC',   // Card border, tooltip border
  stone:   '#A0A49C',   // Reference lines, decorative (Stone 50)
  shadow:  '#8A7B6A',   // Axis ticks, legend text, filter labels (4.8:1 AA)
  earth:   '#5C4F3A',   // Tooltip body, filter label text
  bark:    '#3D3028',   // Card title — between earth and ink
  ink:     '#2C2416',   // Tooltip title, filter values
  o50:     '#C06010',   // RSTO brand orange — large UI elements (4.26:1, decorative)
  eyebrow: '#9A4D0A',   // Eyebrow label + icon — #9A4D0A passes AA 4.5:1 on white at 11px
} as const;

export type PaletteKey = keyof typeof P;

// ─── Stacked bar series (BarChart, WeeklyAttendanceChart) ─────────────────────
// stack[0] = bottom/dominant → stack[4] = top/smallest
// Cool → warm direction: cooler = positive, warmer = concern.

export const STACK_COLORS = [
  '#3A5E52',  // Deep sage (Sage 70) — stack.1
  '#567A6E',  // Mid sage  (Sage 60) — stack.2
  '#4A8EA8',  // Teal-blue (Blue 55) — stack.3
  '#C07840',  // Burnt clay (Amber 55) — stack.4
  '#8C3A18',  // Deep rust (Amber 75) — stack.5
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
//                  Deep sage  Teal-blue  Burnt clay  Deep rust

export const SEMANTIC = {
  positive:  '#3A5E52',  // Deep sage  — On track / above threshold
  neutral:   '#4A8EA8',  // Teal-blue  — Neutral / right direction
  caution:   '#C07840',  // Burnt clay — Caution / below threshold
  attention: '#8C3A18',  // Deep rust  — Needs attention / critical
  reference: '#A0A49C',  // Stone 50   — Reference / total lines
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
  '#A0C4BA',  // Sage 28 — 10–<13 hrs
  '#CAD8D0',  // Sage 18 — 8–<10 hrs
  '#E8B48A',  // Amber 35 — 6–<8 hrs
  '#C07840',  // Amber 55 — 4–<6 hrs
  '#8C3A18',  // Deep rust — <4 hrs
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
