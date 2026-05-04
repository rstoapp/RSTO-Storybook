import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import RstoDialog from './RstoDialog';

const meta: Meta<typeof RstoDialog> = {
    title: 'RSTO/Molecules/RstoDialog',
    component: RstoDialog,
    tags: ['autodocs'],
    args: {
        open: true,
        title: 'Service details',
        onClose: () => {},
    },
};

export default meta;
type Story = StoryObj<typeof RstoDialog>;

export const Default: Story = {
    render: (args) => (
        <RstoDialog {...args}>
            <Typography variant="body2">
                Review the details below before confirming the service assignment.
            </Typography>
        </RstoDialog>
    ),
};

export const Interactive: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>Open dialog</Button>
                <RstoDialog open={open} onClose={() => setOpen(false)} title="Service details">
                    <Typography variant="body2">
                        Review the details below before confirming the service assignment.
                    </Typography>
                </RstoDialog>
            </>
        );
    },
};

export const WithActions: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>Open with actions</Button>
                <RstoDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Confirm assignment"
                    actions={
                        <>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button>
                        </>
                    }
                >
                    <Typography variant="body2">
                        Are you sure you want to assign this family to Northern Family Services?
                        This action will notify the service provider.
                    </Typography>
                </RstoDialog>
            </>
        );
    },
};

export const Confirmation: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="contained" color="error" onClick={() => setOpen(true)}>
                    Remove provider
                </Button>
                <RstoDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Remove service provider"
                    maxWidth="xs"
                    fullWidth
                    actions={
                        <>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" color="error" onClick={() => setOpen(false)}>
                                Remove
                            </Button>
                        </>
                    }
                >
                    <Typography variant="body2">
                        This will permanently remove Coastal Child Support from the active provider list.
                        This action cannot be undone.
                    </Typography>
                </RstoDialog>
            </>
        );
    },
};

export const FullWidth: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="outlined" onClick={() => setOpen(true)}>Open full width</Button>
                <RstoDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Indicator report"
                    maxWidth="md"
                    fullWidth
                >
                    <Typography variant="body2">
                        Full-width dialogs are suitable for detailed forms, reports, or data tables
                        that need more horizontal space.
                    </Typography>
                </RstoDialog>
            </>
        );
    },
};
