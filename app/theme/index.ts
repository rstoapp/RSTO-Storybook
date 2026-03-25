import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { typography } from './typography';
import { palette } from './palette';

const rstoTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440,
        },
    },
    components,
    palette,
    typography,
});

export default rstoTheme;
