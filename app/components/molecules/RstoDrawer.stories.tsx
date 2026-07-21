import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button, IconButton, Typography, Stack, Divider } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RstoDrawer from './RstoDrawer';

const meta = {
    title: 'RSTO/Molecules/RstoDrawer',
    component: RstoDrawer,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**RstoDrawer** — the base drawer molecule. A generic shell (header with optional icon,
title, and close button · scrollable content area · optional footer) with no business
logic. Use it as the structural foundation for any RSTO drawer — reference panels,
notes panels, multi-step creation flows — rather than styling a MUI \`Drawer\` from
scratch in each feature.

- **Header** — \`title\` and optional \`icon\` slot, always with a close button.
- **Content** — scrollable, padded, takes \`children\`.
- **Footer** — optional \`footer\` slot rendered below a divider. Pass your own
  \`Stack\`/\`Box\` to control button layout (e.g. \`justifyContent: 'space-between'\`
  for a Back + Cancel/Next pattern, or \`'flex-end'\` for a single action).
- **Header actions** — optional \`headerActions\` slot rendered before the close
  button (e.g. a delete icon in a detail view). The \`icon\` slot can also be made
  interactive (e.g. an \`IconButton\` with a back arrow) for drawers with internal
  view navigation — see \`QualitativeNotesDrawer\`'s list/form/detail views.
- **Width** — defaults to 400px; pass \`width\` for narrower filter panels or wider
  multi-field forms (capped at 90vw on small viewports).

Feature-specific drawers (goal creation, task creation, reference dictionaries,
qualitative notes) are **organisms** that compose this molecule with their own
content and state — see \`RSTO/Organisms/GoalCreationDrawer\`,
\`RSTO/Organisms/ReferenceDictionaryDrawer\`, and \`RSTO/Organisms/QualitativeNotesDrawer\`.
                `,
            },
        },
    },
    args: {
        open: true,
        title: 'Provider details',
        onClose: () => {},
    },
} satisfies Meta<typeof RstoDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const WithIconAndFooter: Story = {
    name: 'With header icon + footer',
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>Open with footer</Button>
                <RstoDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Add goal"
                    icon={<FlagOutlinedIcon sx={{ fontSize: '2rem', color: 'rstoBlue._70' }} />}
                    width={600}
                    footer={
                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                                Next
                            </Button>
                        </Stack>
                    }
                >
                    <Typography variant="body2">
                        A header icon and footer are both optional slots. Feature organisms
                        (like the CI Planning goal-creation flow) supply their own footer layout —
                        e.g. a Back button on the left and Cancel/Next on the right.
                    </Typography>
                </RstoDrawer>
            </>
        );
    },
};

export const WithBackNavigationAndHeaderAction: Story = {
    name: 'With back navigation + header action',
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button variant="outlined" onClick={() => setOpen(true)}>Open detail view</Button>
                <RstoDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Note"
                    icon={
                        <IconButton size="small" aria-label="Back to list" onClick={() => setOpen(false)}>
                            <ArrowBackIcon fontSize="small" />
                        </IconButton>
                    }
                    headerActions={
                        <IconButton size="small" aria-label="Delete note" sx={{ color: 'rstoRed._60' }}>
                            <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <Typography variant="body2">
                        For drawers with internal view navigation (list → detail → form), swap the
                        static <code>icon</code> for an interactive back button, and use
                        <code>headerActions</code> for view-specific actions like delete — the close
                        button always stays available to dismiss the whole drawer.
                    </Typography>
                </RstoDrawer>
            </>
        );
    },
};
