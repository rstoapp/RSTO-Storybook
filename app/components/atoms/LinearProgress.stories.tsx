import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LinearProgress, Box } from '@mui/material';

const meta: Meta<typeof LinearProgress> = {
    title: 'RSTO/Atoms/LinearProgress',
    component: LinearProgress,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ width: 400 }}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
        },
        variant: {
            control: 'select',
            options: ['indeterminate', 'determinate', 'buffer', 'query'],
        },
        value: { control: { type: 'range', min: 0, max: 100 } },
    },
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Indeterminate: Story = {
    args: { variant: 'indeterminate', color: 'primary' },
};

export const Determinate: Story = {
    args: { variant: 'determinate', value: 65, color: 'primary' },
};

export const Buffer: Story = {
    args: { variant: 'buffer', value: 50, valueBuffer: 75 },
};

export const Success: Story = {
    args: { variant: 'determinate', value: 100, color: 'success' },
};

export const Warning: Story = {
    args: { variant: 'determinate', value: 40, color: 'warning' },
};
