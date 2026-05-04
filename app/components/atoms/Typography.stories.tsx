import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, Stack } from '@mui/material';

const meta: Meta<typeof Typography> = {
    title: 'RSTO/Foundation/Typography',
    component: Typography,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const TypeScale: Story = {
    render: () => (
        <Stack spacing={2}>
            <Typography variant="h1">H1 — Bebas Neue 32px — Service provider / page names</Typography>
            <Typography variant="h2">H2 — Inter 32px, 700 — Section headings</Typography>
            <Typography variant="h3">H3 — Inter 24px, 700</Typography>
            <Typography variant="h4">H4 — Inter 20px, 600</Typography>
            <Typography variant="h5">H5 — Inter 18px, 600</Typography>
            <Typography variant="h6">H6 — Inter 16px, 600 — use sparingly; prefer body1 + fontWeight 600</Typography>
            <Typography variant="body1">Body 1 — Inter 16px. Used for primary content.</Typography>
            <Typography variant="body2">Body 2 — Inter 14px. Used for secondary content.</Typography>
            <Typography variant="caption">Caption — Inter 12px</Typography>
            <Typography variant="overline">Overline — Inter 11px uppercase</Typography>
        </Stack>
    ),
};

export const Colours: Story = {
    render: () => (
        <Stack spacing={1}>
            <Typography color="text.primary">text.primary — #191919</Typography>
            <Typography color="text.secondary">text.secondary — #474747</Typography>
            <Typography color="text.disabled">text.disabled — #757575</Typography>
            <Typography color="error">error — #E23636</Typography>
            <Typography color="success.main">success — #4D8613</Typography>
        </Stack>
    ),
};
