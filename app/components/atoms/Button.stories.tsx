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
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                    { id: 'focus-trap', enabled: true },
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
    },
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
    // rstoBlue._70 (#19788E) fill — main call-to-action. Hover: rstoBlue._60 (#4CAAC1). Radius 8px.
    args: { color: 'primary', variant: 'contained', children: 'Primary action' },
};

export const Secondary: Story = {
    // White fill, rstoGray.black (#191919) text, rstoGray._40 (#EFEFEF) border — supporting actions.
    args: { color: 'secondary', variant: 'outlined', children: 'Secondary action' },
};

export const Disabled: Story = {
    // rstoGray._30 (#F3F3F3) fill + rstoGray._90 (#474747) text — applies to all variants.
    args: { color: 'primary', variant: 'contained', disabled: true, children: 'Disabled' },
};

export const Destructive: Story = {
    // rstoOrange._60 (#D87214) fill — delete / irreversible actions only. Never use outlined destructive.
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

