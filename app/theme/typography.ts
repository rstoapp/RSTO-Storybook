import { ThemeOptions } from '@mui/material/styles/createTheme';
import { fonts } from './tokens';

// Fonts are loaded via Google Fonts in globals.css
// Fraunces is the display typeface (replaces Bebas Neue) — used for h1–h3
// Open Sans is the body typeface (replaces Inter)

export const typography: ThemeOptions['typography'] = {
    fontFamily: fonts.body,
    h1: {
        fontFamily: fonts.display,
        fontSize: '2rem',        // 32px — matches actual usage across all pages
        lineHeight: '2.5rem',    // 1.25x
        letterSpacing: '0.02em',
    },
    h2: {
        fontSize: '2rem',        // 32px
        lineHeight: '2.5rem',    // 1.25x
        letterSpacing: '-0.01em',
        fontWeight: 700,
    },
    h3: {
        fontSize: '1.5rem',      // 24px
        lineHeight: '2rem',      // 1.33x
        letterSpacing: 0,
        fontWeight: 700,
    },
    h4: {
        fontSize: '1.25rem',     // 20px
        lineHeight: '1.75rem',   // 1.4x
        letterSpacing: 0,
        fontWeight: 600,
    },
    h5: {
        fontSize: '1.125rem',    // 18px
        lineHeight: '1.5rem',    // 1.33x
        letterSpacing: 0,
        fontWeight: 600,
    },
    h6: {
        fontSize: '1rem',        // 16px — same as body1, differentiated by weight
        lineHeight: '1.5rem',    // 1.5x
        letterSpacing: 0,
        fontWeight: 600,
    },
    body1: {
        fontSize: '1rem',        // 16px
        lineHeight: '1.5rem',    // 1.5x — standard readable line height
        letterSpacing: '0.01em',
    },
    body2: {
        fontSize: '0.875rem',    // 14px
        lineHeight: '1.375rem',  // 1.57x
        letterSpacing: '0.01em',
    },
    button: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        letterSpacing: 0,
        textTransform: 'none',
        fontWeight: 600,
    },
    caption: {
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
        letterSpacing: '0.02em',
    },
    overline: {
        fontSize: '0.6875rem',   // 11px — minimum for WCAG legibility
        lineHeight: '1rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 600,
    },
};

// ── Eyebrow style ─────────────────────────────────────────────────────────────
// Not a MUI variant — used via sx prop. Same size as overline but:
//   - NOT uppercase
//   - tighter letter-spacing (0.03em vs 0.08em)
//   - tighter line-height (1 vs 1.45)
// Usage: <Typography sx={eyebrowSx}>ANC - Routine Care</Typography>
export const eyebrowSx = {
    fontFamily: fonts.body,
    fontSize: '0.6875rem',   // 11px
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.03em',
    textTransform: 'none',
} as const;
