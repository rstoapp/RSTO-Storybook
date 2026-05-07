import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, Stack, Divider } from '@mui/material';
import { eyebrowSx } from '../../../theme/typography';

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
            <Typography variant="h1">H1 — Fraunces 32px — Display / page names</Typography>
            <Typography variant="h2">H2 — Open Sans 32px, 700 — Section headings</Typography>
            <Typography variant="h3">H3 — Open Sans 24px, 700</Typography>
            <Typography variant="h4">H4 — Open Sans 20px, 600</Typography>
            <Typography variant="h5">H5 — Open Sans 18px, 600</Typography>
            <Typography variant="h6">H6 — Open Sans 16px, 600</Typography>
            <Typography variant="body1">Body 1 — Open Sans 16px. Primary content.</Typography>
            <Typography variant="body2">Body 2 — Open Sans 14px. Secondary content.</Typography>
            <Typography variant="caption">Caption — Open Sans 12px. Helper text, metadata.</Typography>
            <Typography variant="overline">Overline — Open Sans 11px uppercase. Section labels.</Typography>
            <Divider />
            <Typography sx={eyebrowSx}>
                Eyebrow — Open Sans 11px, not uppercase. Chart card labels, card eyebrows.
            </Typography>
        </Stack>
    ),
};

export const Colours: Story = {
    render: () => (
        <Stack spacing={1}>
            <Typography color="text.primary">text.primary — warm ink #1F1A14</Typography>
            <Typography color="text.secondary">text.secondary — shadow #6B5E4A</Typography>
            <Typography color="text.disabled">text.disabled — stone #BFB197</Typography>
            <Typography color="error">error — terracotta #C86A1F</Typography>
            <Typography color="success.main">success — sage #99D35F</Typography>
        </Stack>
    ),
};
