import { ThemeOptions } from '@mui/material/styles/createTheme';
import { colours } from './palette';

export const components: ThemeOptions['components'] = {
    MuiTabs: {
        styleOverrides: {
            root: {
                '.MuiTabs-indicator': {
                    backgroundColor: colours.rstoOrange._50,
                },
            },
        },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                color: colours.rstoGray._90,
                padding: '0.25rem 1rem',
                '&.Mui-selected': {
                    color: colours.rstoGray.black,
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderColor: colours.rstoGray._40,
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
                    boxShadow: `0px 4px 4px 0px ${colours.rstoGray.shadow}`,
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
                    backgroundColor: colours.rstoBlue._70,
                    color: colours.rstoGray.white,
                },
            },
            {
                props: { color: 'secondary' },
                style: {
                    backgroundColor: colours.rstoOrange._50,
                    color: colours.rstoGray.white,
                },
            },
            {
                props: { color: 'default' },
                style: {
                    backgroundColor: colours.rstoGray._30,
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
            },
        },
        variants: [
            {
                props: { color: 'primary' },
                style: {
                    backgroundColor: colours.rstoBlue._70,
                    color: colours.rstoGray.white,
                    '&:hover': {
                        backgroundColor: colours.rstoBlue._60,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: colours.rstoGray._30,
                        color: colours.rstoGray._90,
                    },
                },
            },
            {
                props: { color: 'secondary' },
                style: {
                    color: colours.rstoGray.black,
                    borderColor: colours.rstoGray._60,
                },
            },
        ],
    },
    MuiLink: {
        styleOverrides: {
            root: {
                color: colours.rstoBlue._70,
                textDecorationColor: colours.rstoBlue._70,
            },
        },
    },
    MuiAlert: {
        variants: [
            {
                props: { variant: 'standard', severity: 'success' },
                style: {
                    backgroundColor: colours.rstoGreen._10,
                    border: `2px solid ${colours.rstoGreen._30}`,
                    borderLeft: `4px solid ${colours.rstoGreen._60}`,
                    '& .MuiAlert-icon': {
                        color: colours.rstoGreen._60,
                    },
                    '& .MuiAlert-action': {
                        color: colours.rstoGreen._60,
                    },
                },
            },
            {
                props: { variant: 'standard', severity: 'error' },
                style: {
                    backgroundColor: colours.rstoRed._10,
                    border: `2px solid ${colours.rstoRed._30}`,
                    borderLeft: `4px solid ${colours.rstoRed._60}`,
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
