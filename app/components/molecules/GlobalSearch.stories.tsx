import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import GlobalSearch, { SearchItem } from './GlobalSearch';

// ── Sample index ───────────────────────────────────────────────────────────────
// Mirrors the Gowrie Victoria indicator structure in AppSideMenu.

const INDICATOR_INDEX: SearchItem[] = [
    // Quantity
    { id: 'qn1', code: 'QN1', label: 'Are there enough ECEC places?',              category: 'Dashboard · Quantity' },
    { id: 'qn2', code: 'QN2', label: 'Service provider capacity',                   category: 'Dashboard · Quantity' },
    // Quality
    { id: 'ql1', code: 'QL1', label: 'Are services meeting quality standards?',     category: 'Dashboard · Quality' },
    { id: 'ql2', code: 'QL2', label: 'Staff qualifications and training',           category: 'Dashboard · Quality' },
    // Participation
    { id: 'p1',  code: 'P1',  label: 'Community engagement levels',                 category: 'Dashboard · Participation' },
    { id: 'p2',  code: 'P2',  label: 'Families attending parenting programs',       category: 'Dashboard · Participation' },
    // Top-level nav items
    { id: 'upload',   label: 'Upload data',              category: 'Upload' },
    { id: 'settings', label: 'Settings',                 category: 'Settings' },
];

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Molecules/GlobalSearch',
    component: GlobalSearch,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**GlobalSearch** — keyword search over a flat \`SearchItem[]\` index.

Renders a rounded pill input. As the user types, a dropdown shows results
filtered by \`label\`, \`code\`, and \`category\`. Clicking a result calls
\`onSelect\` and clears the input.

### Building the index

Flatten your nav/indicator structure into a \`SearchItem[]\` array:

\`\`\`ts
const items: SearchItem[] = navItems.flatMap(section =>
  section.children.flatMap(group =>
    group.children.map(leaf => ({
      id: leaf.id,
      code: leaf.code,
      label: leaf.label,
      category: \`Dashboard · \${group.label}\`,
    }))
  )
);
\`\`\`

### Navigation

Wire \`onSelect\` to your router:

\`\`\`tsx
<GlobalSearch
  items={items}
  onSelect={(item) => router.push(\`/dashboard/\${item.id}\`)}
/>
\`\`\`

### Scope

Currently searches: indicator index (label, code, category).
Future: extend \`SearchItem\` with \`keywords?: string[]\` for richer matching.
                `,
            },
        },
    },
    argTypes: {
        width: { control: 'text' },
        placeholder: { control: 'text' },
        onSelect: { action: 'selected' },
    },
    decorators: [
        (Story) => (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, minHeight: 400 }}>
                <Story />
            </Box>
        ),
    ],
} satisfies Meta<typeof GlobalSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────────

/** Default empty state — as it appears in the top nav before interaction. */
export const Default: Story = {
    args: {
        items: INDICATOR_INDEX,
        placeholder: 'Search',
        width: 280,
    },
};

/** Pre-filled query showing filtered results. Demonstrates the dropdown layout. */
export const WithResults: Story = {
    name: 'With results — "qual"',
    render: (args) => {
        const [selected, setSelected] = React.useState<SearchItem | null>(null);
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 4, minHeight: 400 }}>
                <GlobalSearch
                    {...args}
                    onSelect={(item) => { setSelected(item); args.onSelect?.(item); }}
                />
                {selected && (
                    <Typography variant="caption" color="text.secondary">
                        Selected: [{selected.code ?? '—'}] {selected.label}
                    </Typography>
                )}
            </Box>
        );
    },
    args: {
        items: INDICATOR_INDEX,
        placeholder: 'Search',
        width: 280,
    },
    parameters: {
        docs: {
            description: {
                story: 'Type "qual" or "p1" to see filtered results. Clicking a result fires `onSelect` and clears the input.',
            },
        },
    },
};

/** No results state — query that matches nothing. */
export const NoResults: Story = {
    name: 'No results',
    args: {
        items: INDICATOR_INDEX,
        placeholder: 'Search',
        width: 280,
    },
    parameters: {
        docs: {
            description: {
                story: 'Type any string that doesn\'t match the index to see the empty state.',
            },
        },
    },
};

/** Wider variant — as it might appear in a full-width top navigation bar. */
export const Wide: Story = {
    name: 'Wide (400px) — top nav context',
    args: {
        items: INDICATOR_INDEX,
        placeholder: 'Search indicators, pages…',
        width: 400,
    },
};
