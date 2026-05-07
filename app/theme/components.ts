import { ThemeOptions } from '@mui/material/styles/createTheme';
import { colours } from './palette';

// ─── Component token reference ────────────────────────────────────────────────
// Buttons      → MuiButton  primary:     rstoBlue._80 fill (#1D4552), white text, no shadow — hover: _70
//                           secondary:   outlined rstoBlue._70 border + text, rstoBlue._10 hover fill
//                           disabled:    rstoNeutral.bone fill (#F4ECE0), rstoNeutral.stone text
//                           destructive: rstoOrange._60 fill (#C86A1F), white text, no shadow
// Tabs         → MuiTabs    indicator: rstoOrange._50 (brand orange)
// Chips        → MuiChip    primary: rstoBlue._70 fill / white text
//                           secondary: rstoOrange._70 fill / white text
//                           default: rstoGray._30 fill / rstoNeutral.shadow text
// Cards        → MuiCard    border: rstoNeutral.sand (#E8DCC6) | elevation shadow: rstoGray.shadow
// Links        → MuiLink    rstoBlue._70
// Alerts       → MuiAlert   success: rstoGreen._10 bg / _30 border / _60 stripe
//                           error:   rstoRed._10 bg / _30 border / _60 stripe
// Backgrounds  → palette    page: rstoNeutral.paper (#FBF6EE) | card: #FDFAF4
// Text         → palette    primary: rstoNeutral.ink (#1F1A14) | secondary: rstoNeutral.shadow (#6B5E4A)
// Focus ring   → palette    rstoBlue._80 (via primary.main)
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
                color: colours.rstoNeutral.shadow,  // #6B5E4A — inactive tab label
                padding: '0.25rem 1rem',
                '&.Mui-selected': {
                    color: colours.rstoNeutral.ink,  // #1F1A14 — active tab label
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderColor: colours.rstoNeutral.sand,  // #E8DCC6 — warm card border
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
                    backgroundColor: colours.rstoBlue._80,  // Deep teal (#1D4552) — primary fill
                    color: colours.rstoGray.white,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colours.rstoBlue._70,  // Slightly lighter on hover (#2D6B7A)
                        boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: colours.rstoNeutral.bone,  // Light sand fill — #F4ECE0
                        color: colours.rstoNeutral.stone,           // Muted stone text — #BFB197
                    },
                },
            },
            {
                props: { color: 'secondary' },
                style: {
                    backgroundColor: 'transparent',
                    color: colours.rstoBlue._70,              // Teal text (#2D6B7A)
                    borderColor: colours.rstoBlue._70,        // Teal border
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: colours.rstoBlue._10,  // Light teal fill on hover (#E8F2F4)
                        borderColor: colours.rstoBlue._80,      // Deeper border on hover
                        boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                        color: colours.rstoNeutral.stone,       // Stone text when disabled
                        borderColor: colours.rstoNeutral.stone, // Stone border when disabled
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
                        color: colours.rstoGreen._80,
                    },
                    '& .MuiAlert-action': {
                        color: colours.rstoGreen._80,
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
