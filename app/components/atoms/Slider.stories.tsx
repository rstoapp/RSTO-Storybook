import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Slider, Box } from '@mui/material';

const meta: Meta<typeof Slider> = {
    title: 'RSTO/Atoms/Slider',
    component: Slider,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ width: 320, px: 2, pt: 4 }}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary'],
        },
        disabled: { control: 'boolean' },
        marks: { control: 'boolean' },
        valueLabelDisplay: {
            control: 'select',
            options: ['auto', 'on', 'off'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
    args: { defaultValue: 40, color: 'primary' },
};

export const WithMarks: Story = {
    args: { defaultValue: 60, marks: true, step: 10, min: 0, max: 100 },
};

export const Range: Story = {
    args: { defaultValue: [20, 70], color: 'primary' },
};

export const WithValueLabel: Story = {
    args: { defaultValue: 50, valueLabelDisplay: 'on' },
};

export const Disabled: Story = {
    args: { defaultValue: 30, disabled: true },
};
