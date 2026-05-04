import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack, Typography } from '@mui/material';
import RstoTooltip from './RstoTooltip';

const HELP_TEXT = 'This indicator measures the percentage of children who received their immunisation on schedule. Data is sourced from the national health registry.';

const meta: Meta<typeof RstoTooltip> = {
    title: 'RSTO/Molecules/RstoTooltip',
    component: RstoTooltip,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ padding: '40px 80px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof RstoTooltip>;

export const Default: Story = {
    name: 'Default — ? icon, orange hover',
    args: {
        variant: 'default',
        content: { text: HELP_TEXT },
    },
    decorators: [
        (Story) => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h5" fontWeight={700}>Section heading</Typography>
                <Story />
            </Stack>
        ),
    ],
};

export const Insight: Story = {
    name: 'Insight — ? icon, blue colour',
    args: {
        variant: 'insight',
        content: { text: HELP_TEXT },
    },
    decorators: [
        (Story) => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" sx={{ color: 'rstoBlue._60', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Insight one
                </Typography>
                <Story />
            </Stack>
        ),
    ],
};

export const WithCTA: Story = {
    name: 'With CTA button',
    args: {
        variant: 'default',
        content: {
            text: HELP_TEXT,
            cta: { text: 'Read more', href: '#', target: '_blank' },
        },
    },
    decorators: [
        (Story) => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h5" fontWeight={700}>Section heading</Typography>
                <Story />
            </Stack>
        ),
    ],
};
