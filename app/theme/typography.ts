import { ThemeOptions } from '@mui/material/styles/createTheme';

// Fonts are loaded via Google Fonts in globals.css
// Bebas Neue is used sparingly — h1 only, for major RSTO product headings
const BEBAS_NEUE = '"Bebas Neue", sans-serif';
const INTER = '"Inter", sans-serif';

export const typography: ThemeOptions['typography'] = {
    fontFamily: INTER,
    h1: {
        fontFamily: BEBAS_NEUE,
        fontSize: '3rem',        // 48px — display size, Bebas Neue has the space
        lineHeight: '3.5rem',    // 1.17x — tight is correct for display type
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
    subtitle1: {
        fontSize: '0.875rem',    // 14px
        lineHeight: '1.375rem',  // 1.57x
        letterSpacing: '0.01em',
    },
    subtitle2: {
        fontSize: '0.75rem',     // 12px
        lineHeight: '1.25rem',   // 1.67x
        letterSpacing: '0.01em',
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
        letterSpacing: '0.04em',
        textTransform: 'none',
        fontWeight: 600,
    },
    caption: {
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
        letterSpacing: '0.02em',
    },
    overline: {
        fontSize: '0.625rem',
        lineHeight: '1rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 600,
    },
};
