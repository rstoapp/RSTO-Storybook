// Raw design tokens — single source of truth for the RSTO palette.
// Matches rsto-app production implementation.

// ─── Neutrals (pure gray scale) ──────────────────────────────────────────────
// Pure grays for backgrounds, borders, and text.
// Note: rstoNeutral kept for compatibility but maps to rstoGray values.
export const rstoNeutral = {
    paper:  '#FFFFFF', // Pure white page background
    bone:   '#FCFCFC', // Card backgrounds
    sand:   '#F3F3F3', // Rules, borders
    stone:  '#D1D1D1', // Tertiary text
    shadow: '#474747', // Secondary text
    earth:  '#191919', // Body text
    ink:    '#191919', // Headlines
} as const;

// ─── Orange (RSTO primary) ───────────────────────────────────────────────────
// RSTO primary orange. Matches rsto-app production values.
export const rstoOrange = {
    _10: '#FDF1E2',
    _20: '#F8D9B0',
    _30: '#F0B174',
    _40: '#E8934A',
    _50: '#F28B2D', // RSTO primary orange
    _60: '#D87214', // Darker orange
    _70: '#A53F00', // Deep orange
    _80: '#730C00', // Darkest orange
} as const;

// ─── Blue (secondary accent) ─────────────────────────────────────────────────
// Blue accent scale. Matches rsto-app production values.
export const rstoBlue = {
    _10: '#E8F2F4',
    _20: '#C3DDE2',
    _30: '#9CC5CE',
    _40: '#7AB8C5',
    _50: '#65C4DB', // Light blue
    _60: '#4CAAC1', // Mid blue
    _70: '#19788E', // Dark blue
    _80: '#00455C', // Darkest blue
} as const;

// ─── Green / Saltbush (outback: g-*) ─────────────────────────────────────────
// Desaturated bushland greens. Eucalyptus, mulga.
export const rstoGreen = {
    _10: '#EDF0E5', // --g-10
    _20: '#D4DCBC', // --g-20
    _30: '#A8B48A', // --g-30
    _40: '#7F9165', // --g-40
    _50: '#5D7A45', // --g-50  eucalyptus
    _60: '#475F34', // --g-60  mulga
    _70: '#2D3D20', // --g-70
} as const;

// ─── Brown (tertiary accent) ─────────────────────────────────────────────────
// Brown scale for tertiary accents and data visualization.
export const rstoBrown = {
    _10: '#F0E4D5',
    _20: '#D8C4A6',
    _30: '#B8997A',
    _40: '#96735A',
    _50: '#6F5340', // Mid brown
    _60: '#4F3A2C',
    _70: '#2D1F16',
} as const;

// ─── Gray (neutral, non-warm) ─────────────────────────────────────────────────
// Kept for MUI component defaults and wherever a pure gray is required.
// Prefer rstoNeutral for brand-facing surfaces.
export const rstoGray = {
    shadow: '#1919190D',
    black:  '#191919',
    _90:    '#474747',
    _80:    '#757575',
    _70:    '#A3A3A3',
    _60:    '#D1D1D1',
    _50:    '#EAEAEA',
    _40:    '#EFEFEF',
    _30:    '#F3F3F3',
    _20:    '#FCFCFC',
    white:  '#FFFFFF',
} as const;

// ─── Red (error / danger) ─────────────────────────────────────────────────────
// Kept for error states; no direct equivalent in the outback palette.
export const rstoRed = {
    _80: '#490000',
    _70: '#7C0000',
    _60: '#AF0303',
    _50: '#E23636',
    _40: '#EB7272',
    _30: '#F19A9A',
    _20: '#F6C3C3',
    _10: '#FCEBEB',
} as const;

// ─── Functional / Status ──────────────────────────────────────────────────────
export const rstoFunctional = {
    error:          '#DA2E2E',
    success:        '#99D35F',
    // Outback status scale (--status-*)
    statusPositive: '#5D7A45', // --status-positive  eucalyptus green  on-track
    statusModerate: '#3E90A3', // --status-moderate  desert sky blue   watch
    statusWarning:  '#F28B2D', // --status-warning   RSTO orange       below-target
    statusCritical: '#A34E16', // --status-critical  burnt sienna      needs attention
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const fonts = {
    body: '"Open Sans", sans-serif',
} as const;
