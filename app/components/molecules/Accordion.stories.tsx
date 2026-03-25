import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography } from '@mui/material';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
    title: 'RSTO/Molecules/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 600 }}>
                <Story />
            </div>
        ),
    ],
    args: {
        title: 'Indicator context',
        defaultExpanded: false,
    },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Collapsed: Story = {
    args: {
        title: 'Indicator context',
        defaultExpanded: false,
        children: (
            <Typography variant="body2">
                This section provides additional context about the indicator methodology and data sources.
            </Typography>
        ),
    },
};

export const Expanded: Story = {
    args: {
        title: 'Indicator context',
        defaultExpanded: true,
        children: (
            <Typography variant="body2">
                This section provides additional context about the indicator methodology and data sources.
            </Typography>
        ),
    },
};
