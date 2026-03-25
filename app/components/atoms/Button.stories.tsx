import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@mui/material';

const meta: Meta<typeof Button> = {
    title: 'RSTO/Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    args: {
        children: 'Button label',
        variant: 'contained',
        color: 'primary',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['contained', 'outlined', 'text'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'warning', 'success'],
        },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: { color: 'primary', variant: 'contained', children: 'Primary action' },
};

export const Secondary: Story = {
    args: { color: 'secondary', variant: 'outlined', children: 'Secondary action' },
};

export const Disabled: Story = {
    args: { color: 'primary', variant: 'contained', disabled: true, children: 'Disabled' },
};

export const Destructive: Story = {
    args: { color: 'error', variant: 'contained', children: 'Delete' },
};

