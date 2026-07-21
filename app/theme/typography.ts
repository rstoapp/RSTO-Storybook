import { ThemeOptions } from '@mui/material/styles/createTheme';
import { fonts } from './tokens';

// Open Sans is used for all type — h1 through caption and overline

export const typography: ThemeOptions['typography'] = {
    fontFamily: fonts.body,
    h1: {
        fontSize: '2.25rem',     // 36px
        lineHeight: '2.75rem',   // 44px
        letterSpacing: '-0.01em',
        fontWeight: 700,
    },
    h2: {
        fontSize: '1.5rem',      // 24px — matches rsto-app
        lineHeight: '2rem',      // 32px
        letterSpacing: '-0.01em',
        fontWeight: 700,
    },
    h3: {
        fontSize: '1.25rem',     // 20px — matches rsto-app
        lineHeight: '1.75rem',   // 28px
        letterSpacing: 0,
        fontWeight: 700,
    },
    h4: {
        fontSize: '1.125rem',    // 18px — component headings: modals, cards
        lineHeight: '1.625rem',  // 26px
        letterSpacing: 0,
        fontWeight: 600,
    },
    h5: {
        fontSize: '1rem',        // 16px — item headings: table names, list items
        lineHeight: '1.5rem',    // 24px
        letterSpacing: 0,
        fontWeight: 600,
    },
    h6: {
        fontSize: '0.875rem',    // 14px — compact headings, secondary labels
        lineHeight: '1.375rem',  // 22px
        letterSpacing: 0,
        fontWeight: 600,
    },
    subtitle1: {
        fontSize: '1rem',        // 16px — bold body (replaces body1 + fontWeight)
        lineHeight: '1.5rem',    // 24px
        letterSpacing: '0.01em',
        fontWeight: 600,
    },
    subtitle2: {
        fontSize: '0.875rem',    // 14px — bold secondary (replaces body2 + fontWeight)
        lineHeight: '1.375rem',  // 22px
        letterSpacing: '0.01em',
        fontWeight: 600,
    },
    body1: {
        fontSize: '1rem',        // 16px
        lineHeight: '1.5rem',    // 24px
        letterSpacing: '0.01em',
    },
    body2: {
        fontSize: '0.875rem',    // 14px
        lineHeight: '1.375rem',  // 22px
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
        fontSize: '0.6875rem',   // 11px
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
