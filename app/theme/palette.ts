import { ThemeOptions } from '@mui/material/styles/createTheme';
import {
    rstoOrange,
    rstoGray,
    rstoBlue,
    rstoGreen,
    rstoRed,
    rstoFunctional,
} from './tokens';

export const colours = {
    rstoOrange,
    rstoGray,
    rstoBlue,
    rstoGreen,
    rstoRed,
    rstoFunctional,
};

export const palette: Partial<ThemeOptions['palette']> = {
    ...colours,
    background: {
        default: rstoGray._20,   // Neutrals/20
        paper:   rstoGray.white, // cards, panels sit on top
    },
    info: {
        main:          rstoBlue._60,
        light:         rstoBlue._50,
        dark:          rstoBlue._70,
        contrastText:  rstoGray.black,
    },
    warning: {
        main:          rstoOrange._50,
        light:         rstoOrange._40,
        dark:          rstoOrange._60,
        contrastText:  rstoGray.black,
    },
    primary: {
        main:          rstoOrange._50,
        light:         rstoOrange._30,
        dark:          rstoOrange._60,
        contrastText:  rstoGray.black,
    },
    secondary: {
        main:  rstoBlue._50,
        light: rstoBlue._30,
        dark:  rstoBlue._70,
    },
    error: {
        main:  rstoRed._50,
        light: rstoRed._40,
        dark:  '#950000',
    },
    text: {
        primary:   rstoGray.black,
        secondary: rstoGray._90,
        disabled:  rstoGray._80,
    },
    success: {
        main:         rstoFunctional.success,
        contrastText: rstoGray.white,
    },
};
