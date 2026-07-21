import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HtmlTooltip from './HtmlTooltip';

// HtmlTooltip requires children: ReactElement — using untyped meta to avoid
// StoryAnnotations constraint errors on render-only stories.
const meta: Meta = {
    title: 'RSTO/Atoms/HtmlTooltip',
    component: HtmlTooltip,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**HtmlTooltip** — a custom-styled MUI \`Tooltip\` using the paper background, secondary text colour,
24px padding, 320px width, and a soft drop shadow. Used throughout CI Planning and data submission
flows where rich tooltip content (multi-line text or JSX) is needed.

Extends standard MUI \`TooltipProps\` — accepts all placement, arrow, and trigger options.
Hover or focus the trigger element to open. Use \`open\` to force-show in Storybook docs.
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <Box sx={{ padding: '80px 160px' }}>
                <Story />
            </Box>
        ),
    ],
};

export default meta;
type Story = StoryObj;

/** Default — text tooltip on an info icon (hover to open). */
export const Default: Story = {
    render: () => (
        <HtmlTooltip title="This is a rich tooltip with paper background and drop shadow.">
            <InfoOutlinedIcon sx={{ fontSize: '20px', color: 'text.secondary', cursor: 'pointer' }} />
        </HtmlTooltip>
    ),
};

/** Open — forced open for visual inspection. */
export const Open: Story = {
    render: () => (
        <HtmlTooltip
            open
            title="This tooltip is forced open for documentation purposes."
        >
            <InfoOutlinedIcon sx={{ fontSize: '20px', color: 'text.secondary', cursor: 'pointer' }} />
        </HtmlTooltip>
    ),
};

/** Rich content — JSX tooltip body with heading and body text. */
export const RichContent: Story = {
    render: () => (
        <HtmlTooltip
            open
            title={
                <>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        What is a focus area?
                    </Typography>
                    <Typography variant="body2">
                        A focus area represents the aspect of your service&apos;s practice
                        you are working to improve during this CI cycle.
                    </Typography>
                </>
            }
        >
            <Button variant="outlined" size="small">Hover for help</Button>
        </HtmlTooltip>
    ),
};

/** Placement bottom — tooltip positioned below the trigger. */
export const PlacementBottom: Story = {
    render: () => (
        <HtmlTooltip
            open
            placement="bottom"
            title="Tooltip positioned below the trigger element."
        >
            <Button variant="outlined" size="small">Below</Button>
        </HtmlTooltip>
    ),
};
