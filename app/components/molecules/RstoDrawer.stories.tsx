import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button, Typography, Stack, Divider } from '@mui/material';
import RstoDrawer from './RstoDrawer';

const meta: Meta<typeof RstoDrawer> = {
    title: 'RSTO/Molecules/RstoDrawer',
    component: RstoDrawer,
    tags: ['autodocs'],
    args: {
        open: true,
        title: 'Provider details',
        onClose: () => {},
    },
};

export default meta;
type Story = StoryObj<typeof RstoDrawer>;

export const Default: Story = {
    render: (args) => (
        <RstoDrawer {...args}>
            <Typography variant="body2">
                Drawer content goes here. Use this pattern for contextual detail panels,
                filters, or supplementary information without leaving the current page.
            </Typography>
        </RstoDrawer>
    ),
};

export const Interactive: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>Open drawer</Button>
                <RstoDrawer open={open} onClose={() => setOpen(false)} title="Provider details">
                    <Typography variant="body2">
                        Drawer content goes here. Use this pattern for contextual detail panels,
                        filters, or supplementary information without leaving the current page.
                    </Typography>
                </RstoDrawer>
            </>
        );
    },
};

export const WithContent: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>Open provider panel</Button>
                <RstoDrawer open={open} onClose={() => setOpen(false)} title="Northern Family Services">
                    <Stack spacing={3} divider={<Divider />}>
                        <Stack spacing={1}>
                            <Typography variant="overline" color="text.secondary">Service type</Typography>
                            <Typography variant="body2">Out-of-Home Care</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="overline" color="text.secondary">Active cases</Typography>
                            <Typography variant="body2">142</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="overline" color="text.secondary">Completion rate</Typography>
                            <Typography variant="body2">87%</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="overline" color="text.secondary">Status</Typography>
                            <Typography variant="body2">Active</Typography>
                        </Stack>
                    </Stack>
                </RstoDrawer>
            </>
        );
    },
};

export const Narrow: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="outlined" onClick={() => setOpen(true)}>Open narrow drawer</Button>
                <RstoDrawer open={open} onClose={() => setOpen(false)} title="Filters" width={280}>
                    <Typography variant="body2">
                        Narrower drawers work well for filter panels or quick-action side panels.
                    </Typography>
                </RstoDrawer>
            </>
        );
    },
};
