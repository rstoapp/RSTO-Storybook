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
        backgrounds: {
            default: 'warm',
            values: [
                { name: 'warm', value: '#FBF6EE' },
                { name: 'white', value: '#FFFFFF' },
            ],
        },
        docs: {
            canvas: {
                sourceState: 'none',
            },
        },
    },
};

export default preview;
