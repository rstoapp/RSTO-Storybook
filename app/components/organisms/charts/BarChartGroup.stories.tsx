import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BarChartGroup from './BarChartGroup';
import { SERIES_COLORS, SEMANTIC, SEMANTIC_LABELS, hexAlpha } from './chart-theme';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

// ─── Sample data ──────────────────────────────────────────────────────────────

const CATEGORIES = ['On target', 'Qual. standards', 'Session length', 'No. sessions', 'Review freq.'];

function makeRAGDatasets(alpha: number) {
    return [
        {
            label: SEMANTIC_LABELS.positive,
            data: [4, 3, 5, 2, 4],
            backgroundColor: hexAlpha(SEMANTIC.positive, alpha),
            borderColor: SEMANTIC.positive,
            borderRadius: { topLeft: 4, topRight: 4 },
            borderSkipped: 'bottom' as const,
        },
        {
            label: SEMANTIC_LABELS.neutral,
            data: [2, 2, 1, 2, 2],
            backgroundColor: hexAlpha(SEMANTIC.neutral, alpha),
            borderColor: SEMANTIC.neutral,
            borderRadius: { topLeft: 4, topRight: 4 },
            borderSkipped: 'bottom' as const,
        },
        {
            label: SEMANTIC_LABELS.caution,
            data: [2, 3, 1, 3, 2],
            backgroundColor: hexAlpha(SEMANTIC.caution, alpha),
            borderColor: SEMANTIC.caution,
            borderRadius: { topLeft: 4, topRight: 4 },
            borderSkipped: 'bottom' as const,
        },
        {
            label: SEMANTIC_LABELS.attention,
            data: [1, 1, 1, 2, 1],
            backgroundColor: hexAlpha(SEMANTIC.attention, alpha),
            borderColor: SEMANTIC.attention,
            borderRadius: { topLeft: 4, topRight: 4 },
            borderSkipped: 'bottom' as const,
        },
    ];
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/BarChartGroup',
    component: BarChartGroup,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**BarChartGroup** — grouped (side-by-side) bar chart. Used in AncP1, AncP2.

### Semantic RAG palette
This chart uses the **four-level RAG palette** — colours carry meaning and must remain consistent:

| Colour | Hex | Role |
|--------|-----|------|
| Sage 40 \`#80A89C\` | \`SEMANTIC.positive\` | On track |
| Blue 55 \`#5A9EAF\` | \`SEMANTIC.neutral\` | Neutral |
| Amber 55 \`#D4844A\` | \`SEMANTIC.caution\` | Caution |
| Amber 75 \`#8F4E2A\` | \`SEMANTIC.attention\` | Needs attention |

### When to use
Use when comparing a small number of categories side-by-side across RAG levels.
Keep to 3–4 groups maximum for legibility.
                `,
            },
        },
    },
    argTypes: {
        isLoading: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 700, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BarChartGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default — four-level RAG, balanced mode. */
export const Default: Story = {
    args: {
        data: {
            labels: CATEGORIES,
            datasets: makeRAGDatasets(0.88),
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: false }),
        },
    },
};

/** Two RAG levels — binary view when partial/neutral is not tracked. */
export const TwoGroups: Story = {
    name: 'Two RAG levels (binary)',
    args: {
        data: {
            labels: CATEGORIES,
            datasets: [
                {
                    label: SEMANTIC_LABELS.positive,
                    data: [4, 3, 5, 2, 4],
                    backgroundColor: hexAlpha(SEMANTIC.positive, 0.88),
                    borderColor: SEMANTIC.positive,
                    borderRadius: { topLeft: 4, topRight: 4 },
                    borderSkipped: 'bottom' as const,
                },
                {
                    label: SEMANTIC_LABELS.attention,
                    data: [2, 3, 2, 4, 2],
                    backgroundColor: hexAlpha(SEMANTIC.attention, 0.88),
                    borderColor: SEMANTIC.attention,
                    borderRadius: { topLeft: 4, topRight: 4 },
                    borderSkipped: 'bottom' as const,
                },
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: false }),
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Binary view — On track vs Needs attention. Use when neutral/caution states are not tracked.',
            },
        },
    },
};

/** Categorical series — multi-centre comparison without RAG meaning. */
export const CategoricalSeries: Story = {
    name: 'Categorical series (multi-centre)',
    args: {
        data: {
            labels: CATEGORIES,
            datasets: [
                { label: 'Site A', data: [4, 3, 5, 2, 4], backgroundColor: hexAlpha(SERIES_COLORS[0], 0.88), borderColor: SERIES_COLORS[0], borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                { label: 'Site B', data: [2, 4, 3, 3, 2], backgroundColor: hexAlpha(SERIES_COLORS[1], 0.88), borderColor: SERIES_COLORS[1], borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                { label: 'Site C', data: [1, 1, 2, 2, 1], backgroundColor: hexAlpha(SERIES_COLORS[3], 0.88), borderColor: SERIES_COLORS[3], borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: false }),
        },
    },
    parameters: {
        docs: {
            description: { story: 'When colour does not carry RAG meaning, use `SERIES_COLORS` (Blue 70, Blue 55, Amber 75…) instead of `SEMANTIC` tokens.' },
        },
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
