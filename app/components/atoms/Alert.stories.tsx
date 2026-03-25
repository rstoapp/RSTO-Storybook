import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from '@mui/material';

const meta: Meta<typeof Alert> = {
    title: 'RSTO/Atoms/Alert',
    component: Alert,
    tags: ['autodocs'],
    args: {
        children: 'This is an alert message.',
        variant: 'standard',
    },
    argTypes: {
        severity: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info'],
        },
        variant: {
            control: 'select',
            options: ['standard', 'filled', 'outlined'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
    args: {
        severity: 'success',
        variant: 'standard',
        children: 'Data uploaded successfully.',
    },
};

export const Error: Story = {
    args: {
        severity: 'error',
        variant: 'standard',
        children: 'Something went wrong. Please try again.',
    },
};

export const Warning: Story = {
    args: {
        severity: 'warning',
        children: 'This action cannot be undone.',
    },
};

export const Info: Story = {
    args: {
        severity: 'info',
        children: 'Your session will expire in 5 minutes.',
    },
};
