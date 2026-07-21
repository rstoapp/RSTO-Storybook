// MUI module augmentation — teaches TypeScript about the custom RSTO token
// scales that `palette.ts` spreads onto the theme via `...colours`.
//
// Without this, `theme.palette.rstoOrange._50` (and every other scale) is a
// type error even though it resolves correctly at runtime. Keep this file in
// sync with the `colours` object in `palette.ts`.

import type {
    rstoOrange,
    rstoGray,
    rstoBlue,
    rstoGreen,
    rstoRed,
    rstoNeutral,
    rstoBrown,
    rstoFunctional,
} from './tokens';

declare module '@mui/material/styles' {
    interface Palette {
        rstoOrange: typeof rstoOrange;
        rstoGray: typeof rstoGray;
        rstoBlue: typeof rstoBlue;
        rstoGreen: typeof rstoGreen;
        rstoRed: typeof rstoRed;
        rstoNeutral: typeof rstoNeutral;
        rstoBrown: typeof rstoBrown;
        rstoFunctional: typeof rstoFunctional;
    }

    interface PaletteOptions {
        rstoOrange?: typeof rstoOrange;
        rstoGray?: typeof rstoGray;
        rstoBlue?: typeof rstoBlue;
        rstoGreen?: typeof rstoGreen;
        rstoRed?: typeof rstoRed;
        rstoNeutral?: typeof rstoNeutral;
        rstoBrown?: typeof rstoBrown;
        rstoFunctional?: typeof rstoFunctional;
    }
}
