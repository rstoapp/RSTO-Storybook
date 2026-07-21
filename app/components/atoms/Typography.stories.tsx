import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, Stack, Divider } from '@mui/material';
import { eyebrowSx } from '../../theme/typography';
import ChartCard, { FilterChip } from '../organisms/charts/ChartCard';

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
            <Typography variant="h1">H1 — Open Sans 36px, 700 — Display / page names</Typography>
            <Typography variant="h2">H2 — Open Sans 24px, 700 — Section headings</Typography>
            <Typography variant="h3">H3 — Open Sans 20px, 700 — Subsection headings</Typography>
            <Typography variant="h4">H4 — Open Sans 18px, 600 — Component headings: modals, cards</Typography>
            <Typography variant="h5">H5 — Open Sans 16px, 600 — Item headings: table names, list items</Typography>
            <Typography variant="h6">H6 — Open Sans 14px, 600 — Compact headings, secondary labels</Typography>
            <Typography variant="subtitle1">Subtitle 1 — Open Sans 16px, 600 — Bold body text</Typography>
            <Typography variant="subtitle2">Subtitle 2 — Open Sans 14px, 600 — Bold secondary text</Typography>
            <Typography variant="body1">Body 1 — Open Sans 16px. Primary content.</Typography>
            <Typography variant="body2">Body 2 — Open Sans 14px. Secondary content.</Typography>
            <Typography variant="button" display="block">Button Label — Open Sans 14px, SemiBold</Typography>
            <Typography variant="caption">Caption — Open Sans 12px. Helper text, metadata.</Typography>
            <Typography variant="overline">Overline — Open Sans 11px uppercase. Navigation section labels.</Typography>
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
            <Typography color="text.primary">text.primary — rstoGray.black #191919</Typography>
            <Typography color="text.secondary">text.secondary — rstoGray._90 #474747</Typography>
            <Typography color="text.disabled">text.disabled — rstoGray._70 #A3A3A3</Typography>
            <Typography color="error">error — rstoRed._60 #AF0303</Typography>
            <Typography color="success.main">success — rstoFunctional.success #99D35F</Typography>
        </Stack>
    ),
};

export const ChartStyles: Story = {
    name: 'Chart Styles',
    render: () => (
        <ChartCard
            chartName="Chart One"
            title="Early Childhood Education & Care Participation"
            titleTooltip={{ content: { text: 'Example tooltip explaining what this chart measures.' } }}
            filters={
                <>
                    <FilterChip label="Location" value="Greenwich" />
                    <FilterChip label="Priority Group" value="Aboriginal and Torres Strait Islander" />
                </>
            }
            chart={<></>}
        />
    ),
};
