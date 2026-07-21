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
        // Pure white backgrounds to match rsto-app production
        default: rstoGray.white,   // #FFFFFF — Page / app shell background
        paper:   rstoGray.white,   // #FFFFFF — Card surface
    },
    info: {
        main:          rstoBlue._60,
        light:         rstoBlue._50,
        dark:          rstoBlue._70,
        contrastText:  rstoGray.white,
    },
    warning: {
        main:          rstoOrange._50, // Warning banners, caution badges
        light:         rstoOrange._40,
        dark:          rstoOrange._60,
        contrastText:  rstoGray.white,
    },
    // MUI "primary" = RSTO orange — drives primary buttons, links, focus rings
    primary: {
        main:          rstoOrange._50,  // #F28B2D — RSTO orange (matches rsto-app)
        light:         rstoOrange._40,  // Lighter orange for hover surfaces
        dark:          rstoOrange._60,  // Darker orange for hover on primary button
        contrastText:  rstoGray.white,
    },
    // MUI "secondary" = blue outlined
    secondary: {
        main:         rstoBlue._70,   // Dark blue border + text
        light:        rstoBlue._10,   // Light blue hover fill
        dark:         rstoBlue._80,   // Deeper border on hover
        contrastText: rstoBlue._70,
    },
    error: {
        main:  rstoRed._60,         // Destructive action buttons
        light: rstoRed._40,
        dark:  rstoRed._70,
        contrastText: rstoGray.white,
    },
    text: {
        primary:   rstoGray.black,   // #191919 — body copy, headings (pure black)
        secondary: rstoGray._90,     // #474747 — supporting / descriptive text
        disabled:  rstoGray._70,     // #A3A3A3 — inactive labels
    },
    success: {
        main:         rstoFunctional.success,  // Success icon, badge fill
        contrastText: rstoGray.white,
    },
};
