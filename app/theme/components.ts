import { ThemeOptions } from '@mui/material/styles/createTheme';
import { colours } from './palette';

// ─── Component token reference ────────────────────────────────────────────────
// Buttons      → MuiButton  primary:     rstoBlue._70 fill (#19788E), white text, no shadow — hover: _60
//                           secondary:   outlined rstoGray._40 border / rstoGray.black text / white fill — hover: rstoGray._20 fill, rstoGray._60 border
//                           disabled:    rstoGray._30 fill (#F3F3F3), rstoGray._90 text (#474747)
//                           destructive: rstoOrange._60 fill (#C86A1F), white text, no shadow
// Tabs         → MuiTabs    indicator: rstoOrange._50 (brand orange)
// Chips        → MuiChip    primary: rstoBlue._70 fill / white text
//                           secondary: rstoOrange._70 fill / white text
//                           default: rstoGray._30 fill / rstoGray._90 text
// Cards        → MuiCard    border: rstoGray._40 (#EFEFEF) | elevation shadow: rstoGray.shadow
// Links        → MuiLink    rstoBlue._70
// Alerts       → MuiAlert   success: rstoGreen._10 bg / _30 border / _60 stripe
//                           error:   rstoRed._10 bg / _30 border / _60 stripe
// Backgrounds  → palette    page: rstoGray.white (#FFFFFF) | card: rstoGray.white
// Text         → palette    primary: rstoGray.black (#191919) | secondary: rstoGray._90 (#474747)
// Focus ring   → palette    rstoOrange._50 (via primary.main)
// Charts       → chart-theme.ts (SEMANTIC, STACK_COLORS, SERIES_COLORS)

export const components: ThemeOptions['components'] = {
    MuiTabs: {
        styleOverrides: {
            root: {
                '.MuiTabs-indicator': {
                    backgroundColor: colours.rstoOrange._50,  // Brand orange tab indicator
                },
            },
        },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                color: colours.rstoGray._90,  // #474747 — inactive tab label
                padding: '0.25rem 1rem',
                '&.Mui-selected': {
                    color: colours.rstoGray.black,  // #191919 — active tab label
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderColor: colours.rstoGray._40,  // #EFEFEF — card border
                borderRadius: 2,
                borderWidth: '1px',
                borderStyle: 'solid',
                height: '100%',
                boxShadow: 'none',
            },
        },
        variants: [
            {
                props: { variant: 'elevation' },
                style: {
                    boxShadow: `0px 4px 4px 0px ${colours.rstoGray.shadow}`,  // Elevated card shadow
                },
            },
        ],
    },
    MuiChip: {
        styleOverrides: {
            root: {
                width: 'fit-content',
            },
        },
        variants: [
            {
                props: { color: 'primary' },
                style: {
                    backgroundColor: colours.rstoBlue._70,   // Dusk blue fill
                    color: colours.rstoGray.white,
                },
            },
            {
                props: { color: 'secondary' },
                style: {
                    backgroundColor: colours.rstoOrange._70,  // Deep rust fill
                    color: colours.rstoGray.white,
                },
            },
            {
                props: { color: 'default' },
                style: {
                    backgroundColor: colours.rstoGray._30,  // Neutral chip
                    color: colours.rstoGray._90,
                },
            },
        ],
    },
    MuiButton: {
        styleOverrides: {
            root: {
                width: 'fit-content',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,            // RSTO design decision — 8px rounded corners
                boxShadow: 'none',          // No drop shadow on any button
                '&:hover': { boxShadow: 'none' },
                '&:active': { boxShadow: 'none' },
                '&:focus': { boxShadow: 'none' },
            },
        },
        variants: [
            {
                props: { color: 'primary' },
                style: {
                    backgroundColor: colours.rstoBlue._70,  // Dark teal (#19788E) — primary fill
                    color: colours.rstoGray.white,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colours.rstoBlue._60,  // Slightly lighter on hover (#4CAAC1)
                        boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: colours.rstoGray._30,  // Light gray fill — #F3F3F3
                        color: colours.rstoGray._90,            // Muted gray text — #474747
                    },
                },
            },
            {
                props: { color: 'secondary' },
                style: {
                    backgroundColor: '#FFFFFF',                  // White fill
                    color: colours.rstoGray.black,              // Black text (#191919)
                    borderColor: colours.rstoGray._40,          // Gray border (#EFEFEF)
                    fontWeight: 400,
                    padding: '8px 12px',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colours.rstoGray._20,  // Light gray fill on hover (#FCFCFC)
                        borderColor: colours.rstoGray._60,      // Gray border on hover (#D1D1D1)
                        boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                        color: colours.rstoGray._60,            // Gray text when disabled (#D1D1D1)
                        borderColor: colours.rstoGray._60,      // Gray border when disabled (#D1D1D1)
                    },
                },
            },
            {
                props: { color: 'error' },
                style: {
                    backgroundColor: colours.rstoOrange._60,  // Terracotta (#C86A1F) — destructive/delete
                    color: colours.rstoGray.white,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colours.rstoOrange._70,
                        boxShadow: 'none',
                    },
                },
            },
        ],
    },
    MuiLink: {
        styleOverrides: {
            root: {
                color: colours.rstoBlue._70,              // Link text
                textDecorationColor: colours.rstoBlue._70,
            },
        },
    },
    MuiAlert: {
        variants: [
            {
                props: { variant: 'standard', severity: 'success' },
                style: {
                    backgroundColor: colours.rstoGreen._10,                  // Alert background
                    border: `2px solid ${colours.rstoGreen._30}`,            // Alert border
                    borderLeft: `4px solid ${colours.rstoGreen._60}`,        // Left stripe
                    '& .MuiAlert-icon': {
                        color: colours.rstoGreen._70,
                    },
                    '& .MuiAlert-action': {
                        color: colours.rstoGreen._70,
                    },
                },
            },
            {
                props: { variant: 'standard', severity: 'error' },
                style: {
                    backgroundColor: colours.rstoRed._10,                    // Alert background
                    border: `2px solid ${colours.rstoRed._30}`,              // Alert border
                    borderLeft: `4px solid ${colours.rstoRed._60}`,          // Left stripe
                    '& .MuiAlert-icon': {
                        color: colours.rstoRed._60,
                    },
                    '& .MuiAlert-action': {
                        color: colours.rstoRed._60,
                    },
                },
            },
        ],
    },
};
