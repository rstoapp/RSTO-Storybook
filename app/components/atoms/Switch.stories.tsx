import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch, FormControlLabel } from '@mui/material';

const meta: Meta<typeof Switch> = {
    title: 'RSTO/Atoms/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium'],
        },
        disabled: { control: 'boolean' },
        defaultChecked: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: { color: 'primary' },
};

export const Checked: Story = {
    args: { defaultChecked: true, color: 'primary' },
};

export const WithLabel: Story = {
    render: (args) => (
        <FormControlLabel control={<Switch {...args} />} label="Enable notifications" />
    ),
    args: { defaultChecked: true, color: 'primary' },
};

export const Small: Story = {
    args: { size: 'small', defaultChecked: true },
};

export const Disabled: Story = {
    args: { disabled: true, defaultChecked: true },
};
