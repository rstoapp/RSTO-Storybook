import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
            options: ['contained', 'outlined'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Base variants ─────────────────────────────────────────────────────────────

export const Primary: Story = {
    // Deep teal fill (#1D4552) — main call-to-action. Hover lightens to #2D6B7A. Radius 8px.
    args: { color: 'primary', variant: 'contained', children: 'Primary action' },
};

export const Secondary: Story = {
    // Dusk teal outlined (#2D6B7A border + text) — supporting actions alongside a primary.
    args: { color: 'secondary', variant: 'outlined', children: 'Secondary action' },
};

export const Disabled: Story = {
    // Bone fill (#F4ECE0) + stone text (#BFB197) — applies to all variants.
    args: { color: 'primary', variant: 'contained', disabled: true, children: 'Disabled' },
};

export const Destructive: Story = {
    // Terracotta fill (#C86A1F) — delete / irreversible actions only. Never use outlined destructive.
    args: { color: 'error', variant: 'contained', children: 'Delete', startIcon: <DeleteOutlineIcon /> },
};

// ── Icon variants ─────────────────────────────────────────────────────────────

export const PrimaryIconRight: Story = {
    // Leading action — icon trails the label to suggest forward navigation or progression.
    args: {
        color: 'primary',
        variant: 'contained',
        children: 'Continue',
        endIcon: <ArrowForwardIcon />,
    },
};

export const PrimaryIconLeft: Story = {
    // Supporting icon — icon precedes the label to clarify the action type.
    args: {
        color: 'primary',
        variant: 'contained',
        children: 'Add item',
        startIcon: <AddCircleOutlineIcon />,
    },
};

export const SecondaryIconLeft: Story = {
    args: {
        color: 'secondary',
        variant: 'outlined',
        children: 'Download',
        startIcon: <FileDownloadOutlinedIcon />,
    },
};

// ── Size variants ─────────────────────────────────────────────────────────────

export const Small: Story = {
    // 30px height — dense UI, table row actions, filter areas.
    args: { color: 'primary', variant: 'contained', size: 'small', children: 'Small' },
};

export const Medium: Story = {
    // 36px height — default for most screens.
    args: { color: 'primary', variant: 'contained', size: 'medium', children: 'Medium' },
};

export const Large: Story = {
    // 42px height — hero CTAs, onboarding flows.
    args: { color: 'primary', variant: 'contained', size: 'large', children: 'Large' },
};

