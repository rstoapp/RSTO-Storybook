import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import rstoTheme from '../app/theme';
import '../app/globals.css';

const preview: Preview = {
    decorators: [
        (Story) => (
            <ThemeProvider theme={rstoTheme}>
                <CssBaseline />
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
    },
};

export default preview;
