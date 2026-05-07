import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import DoughnutChart from './DoughnutChart';
import { SERIES_COLORS, SEMANTIC, hexAlpha } from './chart-theme';
import { makeTooltip } from './default-chart-options';

// ─── Shared data ─────────────────────────────────────────────────────────────
const EPIS_COLORS = {
    exploration:        SERIES_COLORS[0],   // Blue 70    (#2E6878)
    preparation:        SEMANTIC.neutral,   // Teal-blue  (#4A8EA8)
    implementation:     SEMANTIC.caution,   // Burnt clay (#C07840)
    fullImplementation: SEMANTIC.positive,  // Deep sage  (#3A5E52)
} as const;

const EPIS_DATA = [
    { label: 'Exploration',         value: 18, color: EPIS_COLORS.exploration },
    { label: 'Preparation',         value: 19, color: EPIS_COLORS.preparation },
    { label: 'Implementation',      value: 18, color: EPIS_COLORS.implementation },
    { label: 'Full implementation', value: 1,  color: EPIS_COLORS.fullImplementation },
];

const TOTAL = EPIS_DATA.reduce((s, d) => s + d.value, 0);

const sharedDataset = {
    data: EPIS_DATA.map((d) => d.value),
    backgroundColor: EPIS_DATA.map((d) => hexAlpha(d.color, 0.88)),
    borderColor: EPIS_DATA.map((d) => d.color),
    borderWidth: 1,
    hoverOffset: 6,
};

const tooltipOptions = {
    ...makeTooltip(),
    callbacks: {
        label: (item: { parsed: number; label: string }) =>
            ` ${item.parsed} action${item.parsed !== 1 ? 's' : ''} — ${item.label}`,
    },
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/DoughnutChart',
    component: DoughnutChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**DoughnutChart** — ring chart for part-to-whole proportions.

### Design tokens
- Segment colours follow EPIS progression (cool → warm)
- Center label rendered as an absolute overlay — no plugin needed
- \`cutout: '65%'\` — consistent inner-radius ratio

Place inside **ChartCard** for the standard eyebrow, title, and filter shell — see the ChartCard stories.
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 300, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DoughnutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default — with center label. */
export const Default: Story = {
    args: {
        data: {
            labels: EPIS_DATA.map((d) => d.label),
            datasets: [sharedDataset],
        },
        options: { plugins: { tooltip: tooltipOptions } },
        centerLabel: { count: TOTAL, caption: 'actions' },
    },
};

/** Without center label. */
export const WithoutCenterLabel: Story = {
    name: 'Without center label',
    args: {
        data: {
            labels: EPIS_DATA.map((d) => d.label),
            datasets: [sharedDataset],
        },
        options: { plugins: { tooltip: tooltipOptions } },
    },
};

/** Loading skeleton. */
export const Loading: Story = {
    name: 'Loading state',
    args: { isLoading: true },
};
