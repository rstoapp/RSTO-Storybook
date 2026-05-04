import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircularProgress, Box, Typography } from '@mui/material';

const meta: Meta<typeof CircularProgress> = {
    title: 'RSTO/Atoms/CircularProgress',
    component: CircularProgress,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
        },
        variant: {
            control: 'select',
            options: ['indeterminate', 'determinate'],
        },
        size: { control: 'number' },
        thickness: { control: 'number' },
        value: { control: { type: 'range', min: 0, max: 100 } },
    },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Indeterminate: Story = {
    args: { color: 'primary' },
};

export const Determinate: Story = {
    args: { variant: 'determinate', value: 72, color: 'primary' },
};

export const WithLabel: Story = {
    render: (args) => (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...args} />
            <Box
                sx={{
                    top: 0, left: 0, bottom: 0, right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" color="text.secondary">
                    {`${args.value ?? 0}%`}
                </Typography>
            </Box>
        </Box>
    ),
    args: { value: 68, size: 60 },
};

export const Large: Story = {
    args: { size: 80, color: 'primary' },
};
