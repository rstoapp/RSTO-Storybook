import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button } from '@mui/material';
import AlertSnackbar from './AlertSnackbar';

const meta: Meta<typeof AlertSnackbar> = {
    title: 'RSTO/Molecules/AlertSnackbar',
    component: AlertSnackbar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof AlertSnackbar>;

const SnackbarDemo = ({ severity, message }: { severity: 'success' | 'error' | 'warning' | 'info'; message: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Show {severity} toast
            </Button>
            <AlertSnackbar open={open} onClose={() => setOpen(false)} severity={severity}>
                {message}
            </AlertSnackbar>
        </>
    );
};

export const Success: Story = {
    render: () => (
        <SnackbarDemo severity="success" message="All files have been successfully processed." />
    ),
};

export const Error: Story = {
    render: () => (
        <SnackbarDemo severity="error" message="Upload failed. Please check your file and try again." />
    ),
};

export const Warning: Story = {
    render: () => (
        <SnackbarDemo severity="warning" message="Some records could not be matched and were skipped." />
    ),
};

export const Info: Story = {
    render: () => (
        <SnackbarDemo severity="info" message="Data processing may take a few minutes to complete." />
    ),
};
