/**
 * chart-theme.ts
 * RSTO Chart Design System — token-aligned
 * Chart.js ^4.4.1 · react-chartjs-2 ^5.2.0
 *
 * Every colour here is derived from the master design tokens in
 * `app/theme/tokens.ts` — the single source of truth for the RSTO palette.
 * Do NOT introduce raw hex values in this file or in chart stories; add or
 * reference a token instead so charts stay in lock-step with the rest of the
 * design system.
 */

import {
    rstoOrange,
    rstoBlue,
    rstoGreen,
    rstoGray,
    rstoFunctional,
    fonts,
} from '../../../theme/tokens';

// ─── Neutral surface tokens ───────────────────────────────────────────────────
// All neutrals map to the pure `rstoGray` scale (matches rsto-app production).

export const P = {
  paper:   rstoGray.white, // #FFFFFF — Card background
  frost:   rstoGray._20,   // #FCFCFC — Skeleton / loading background
  linen:   rstoGray._30,   // #F3F3F3 — Empty-state background
  bone:    rstoGray._40,   // #EFEFEF — Gridlines, tooltip background
  sand:    rstoGray._50,   // #EAEAEA — Card border, tooltip border
  stone:   rstoGray._70,   // #A3A3A3 — Reference lines, decorative
  shadow:  rstoGray._80,   // #757575 — Axis ticks, legend text (4.6:1 AA on white)
  earth:   rstoGray._90,   // #474747 — Tooltip body, filter label text
  bark:    rstoGray.black, // #191919 — Card title
  ink:     rstoGray.black, // #191919 — Tooltip title, filter values
  o50:     rstoOrange._50, // #F28B2D — RSTO brand orange, large UI elements
  eyebrow: rstoOrange._70, // #A53F00 — Eyebrow label + icon (AA 4.5:1 on white)
} as const;

export type PaletteKey = keyof typeof P;

// ─── Stacked bar series (BarChart, WeeklyAttendanceChart) ─────────────────────
// stack[0] = bottom/dominant → stack[4] = top/smallest
// Cool → warm direction: cooler = positive, warmer = concern.

export const STACK_COLORS = [
  rstoGreen._60,  // #475F34 — deep sage  · stack.1
  rstoGreen._50,  // #5D7A45 — mid sage   · stack.2
  rstoBlue._70,   // #19788E — teal-blue  · stack.3
  rstoOrange._60, // #D87214 — burnt clay · stack.4
  rstoOrange._70, // #A53F00 — deep rust  · stack.5
] as const;

// ─── Multi-series palette (LineChart, MultiLineChart) ────────────────────────
// Assign by performance rank: highest → Series 1 (Blue 70), lowest → Series 6.

export const SERIES_COLORS = [
  rstoBlue._70,   // #19788E — Series 1 · top performer / primary
  rstoBlue._60,   // #4CAAC1 — Series 2 · mid-range
  rstoBlue._40,   // #7AB8C5 — Series 3 · light (decorative only)
  rstoOrange._70, // #A53F00 — Series 4 · contrasting warm
  rstoOrange._60, // #D87214 — Series 5 · mid-warm
  rstoOrange._40, // #E8934A — Series 6 · low-signal (decorative only)
] as const;

export const SERIES_NAMES = [
  'Series 1 · rstoBlue._70',
  'Series 2 · rstoBlue._60',
  'Series 3 · rstoBlue._40',
  'Series 4 · rstoOrange._70',
  'Series 5 · rstoOrange._60',
  'Series 6 · rstoOrange._40',
] as const;

// ─── Semantic RAG palette ─────────────────────────────────────────────────────
// Use when colour carries meaning. Maps directly to the `rstoFunctional`
// status scale so charts, badges, and status chips agree.
//
// RAG progression: On track → Neutral → Caution → Needs attention

export const SEMANTIC = {
  positive:  rstoFunctional.statusPositive, // #5D7A45 — On track / above threshold
  neutral:   rstoFunctional.statusModerate, // #3E90A3 — Neutral / right direction
  caution:   rstoFunctional.statusWarning,  // #F28B2D — Caution / below threshold
  attention: rstoFunctional.statusCritical, // #A34E16 — Needs attention / critical
  reference: rstoGray._70,                   // #A3A3A3 — Reference / total lines
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
// Sequential green → blue bridge → amber → rust, composed from the token scales.
// Green = on track. Orange threshold begins at 8–<10 hrs (index 5).

export const HEATMAP_COLORS = [
  rstoGreen._70,  // #2D3D20 — 30+ hrs   (on track — darkest)
  rstoGreen._60,  // #475F34 — 25–<30 hrs
  rstoGreen._50,  // #5D7A45 — 15–<25 hrs
  rstoBlue._70,   // #19788E — 13–<15 hrs (green→blue transition)
  rstoBlue._60,   // #4CAAC1 — 10–<13 hrs (sky blue)
  rstoOrange._40, // #E8934A — 8–<10 hrs  (concern threshold — orange starts here)
  rstoOrange._50, // #F28B2D — 6–<8 hrs
  rstoOrange._60, // #D87214 — 4–<6 hrs
  rstoOrange._70, // #A53F00 — <4 hrs     (deep rust)
  rstoGray._70,   // #A3A3A3 — Did not attend (always at 55% opacity)
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

export const CHART_FONT_FAMILY = fonts.body; // '"Open Sans", sans-serif'

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
