import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Stack } from '@mui/material';
import FilterChip from './FilterChip';

const meta = {
    title: 'RSTO/Molecules/FilterChip',
    component: FilterChip,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**FilterChip** — ghost-button filter pill used in ChartCard and dashboard headers.

Renders as an interactive \`ButtonBase\` when \`onClick\` is supplied. Without \`onClick\` it
is a static display element (no pointer cursor, no hover state).

### Anatomy
\`\`\`
[label]:  [value]  ▾
\`\`\`

- **label** — descriptor text at 400 weight (e.g. "Site")
- **value** — selected value at 600 weight (e.g. "All sites")
- **▾** — \`ArrowDropDownIcon\`, decorative, \`aria-hidden\`

### Accessibility
- \`aria-label="Filter by {label}: {value}"\` describes the full button purpose
- \`aria-expanded\` reflects open/closed dropdown state when interactive
                `,
            },
        },
    },
    args: {
        label: 'Site',
        value: 'All sites',
    },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default resting state — no dropdown open. */
export const Default: Story = {};

/** Open state — cream background, darker text. */
export const Open: Story = {
    args: { open: true },
};

/** Interactive — with onClick handler (pointer cursor, hover state active). */
export const Interactive: Story = {
    render: () => {
        const [open, setOpen] = React.useState(false);
        return (
            <FilterChip
                label="Site"
                value="All sites"
                open={open}
                onClick={() => setOpen((o) => !o)}
            />
        );
    },
};

/** Multiple chips side by side — typical ChartCard usage. */
export const MultipleFilters: Story = {
    render: () => (
        <Stack direction="row" sx={{ ml: '-8px' }}>
            <FilterChip label="Site" value="All sites" />
            <FilterChip label="Period" value="Q1 2023 – Q2 2024" />
            <FilterChip label="Program" value="All programs" />
        </Stack>
    ),
};

/** Display-only — no onClick, no pointer cursor. */
export const DisplayOnly: Story = {
    args: { onClick: undefined },
};
