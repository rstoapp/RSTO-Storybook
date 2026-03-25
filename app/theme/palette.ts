import { ThemeOptions } from '@mui/material/styles/createTheme';
import { Palette } from '@mui/material/styles';

export const colours: Pick<
    Palette,
    | 'rstoOrange'
    | 'rstoGray'
    | 'rstoBlue'
    | 'rstoRed'
    | 'rstoGreen'
    | 'rstoFunctional'
> = {
    rstoOrange: {
        _80: '#730C00',
        _70: '#A53F00',
        _60: '#D87214',
        _50: '#F28B2D',
        _40: '#F6AE6C',
        _30: '#F9C596',
        _20: '#FBDCC0',
        _10: '#FEF3EA',
    },
    rstoGray: {
        shadow: '#1919190D',
        black: '#191919',
        _90: '#474747',
        _80: '#757575',
        _70: '#A3A3A3',
        _60: '#D1D1D1',
        _50: '#EAEAEA',
        _40: '#EFEFEF',
        _30: '#F3F3F3',
        _20: '#FCFCFC',
        white: '#FFFFFF',
    },
    rstoBlue: {
        _80: '#00455C',
        _70: '#19788E',
        _60: '#4CAAC1',
        _50: '#65C4DB',
        _40: '#93D6E6',
        _30: '#B2E1ED',
        _20: '#D1EDF4',
        _10: '#F0F9FB',
    },
    rstoGreen: {
        _80: '#0B651E',
        _70: '#3E9851',
        _60: '#71CB84',
        _50: '#8BE49D',
        _40: '#AEECBA',
        _30: '#C5F2CE',
        _20: '#DCF7E2',
        _10: '#F3FCF5',
    },
    rstoRed: {
        _80: '#490000',
        _70: '#7C0000',
        _60: '#AF0303',
        _50: '#E23636',
        _40: '#EB7272',
        _30: '#F19A9A',
        _20: '#F6C3C3',
        _10: '#FCEBEB',
    },
    rstoFunctional: {
        error: '#DA2E2E',
        success: '#99D35F',
    },
};

export const palette: Partial<ThemeOptions['palette']> = {
    ...colours,
    background: {
        default: '#FCFCFC',  // Neutrals/20
        paper: '#FFFFFF',    // Neutrals/White — cards, panels sit on top
    },
    info: {
        main: '#4CAAC1',
        light: '#65C4DB',
        dark: '#19788E',
        contrastText: '#191919',
    },
    warning: {
        main: '#F28B2D',
        light: '#F6AE6C',
        dark: '#D87214',
        contrastText: '#191919',
    },
    primary: {
        main: '#f28b2d',
        light: '#f9c596',
        dark: '#D87214',
        contrastText: '#191919',
    },
    secondary: {
        main: '#65c4db',
        light: '#b2e1ed',
        dark: '#19788e',
    },
    error: {
        main: '#e23636',
        light: '#EB7272',
        dark: '#950000',
    },
    text: {
        primary: '#191919',
        secondary: '#474747',
        disabled: '#757575',
    },
    success: {
        main: '#4D8613',
        contrastText: '#FFFFFF',
    },
};
