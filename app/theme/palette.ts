import { ThemeOptions } from '@mui/material/styles/createTheme';
import {
    rstoOrange,
    rstoGray,
    rstoBlue,
    rstoGreen,
    rstoRed,
    rstoNeutral,
    rstoBrown,
    rstoFunctional,
} from './tokens';

// colours is re-exported so components.ts and stories can reference scales by name.
export const colours = {
    rstoOrange,
    rstoGray,
    rstoBlue,
    rstoGreen,
    rstoRed,
    rstoNeutral,
    rstoBrown,
    rstoFunctional,
};

export const palette: Partial<ThemeOptions['palette']> = {
    ...colours,
    background: {
        // Warm outback neutrals — matches prototype --n-paper / --warm-card
        default: rstoNeutral.paper,   // #FBF6EE — Page / app shell background
        paper:   '#FDFAF4',           // Warm card surface — slightly lighter than page, per prototype --warm-card
    },
    info: {
        main:          rstoBlue._60,
        light:         rstoBlue._50,
        dark:          rstoBlue._70,
        contrastText:  rstoNeutral.ink,
    },
    warning: {
        main:          rstoOrange._50, // Warning banners, caution badges
        light:         rstoOrange._40,
        dark:          rstoOrange._60,
        contrastText:  rstoNeutral.ink,
    },
    // MUI "primary" = deep teal — drives buttons, checkboxes, radio buttons, focus rings, Slider.
    primary: {
        main:          rstoBlue._80,  // #1D4552 — deep teal (8.1:1 AAA)
        light:         rstoBlue._60,  // #3E90A3 — mid teal (chips, hover surfaces)
        dark:          rstoBlue._70,  // #2D6B7A — used for hover on primary button
        contrastText:  rstoGray.white,
    },
    // MUI "secondary" = dusk teal outlined (light teal fill on hover).
    secondary: {
        main:         rstoBlue._70,  // #2D6B7A — dusk teal border + text
        light:        rstoBlue._10,  // #E8F2F4 — light teal hover fill
        dark:         rstoBlue._80,  // #1D4552 — deeper border on hover
        contrastText: rstoBlue._70,
    },
    error: {
        main:  rstoOrange._60,  // Destructive action buttons (terracotta)
        light: rstoOrange._40,
        dark:  rstoOrange._70,
        contrastText: rstoGray.white,
    },
    text: {
        primary:   rstoNeutral.ink,     // #1F1A14 — body copy, headings (warm ink)
        secondary: rstoNeutral.shadow,  // #6B5E4A — supporting / descriptive text
        disabled:  rstoNeutral.stone,   // #BFB197 — inactive labels
    },
    success: {
        main:         rstoFunctional.success,  // Success icon, badge fill
        contrastText: rstoGray.white,
    },
};
