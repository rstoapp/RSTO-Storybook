import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HorizontalBarChart from './HorizontalBarChart';
import { SEMANTIC, SEMANTIC_LABELS, SERIES_COLORS, hexAlpha } from './chart-theme';
import { makeHorizontalScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

// ─── Sample data ──────────────────────────────────────────────────────────────

const COMPONENTS = ['On target', 'Qual. standards', 'Session length', 'No. sessions', 'Review freq.', 'Session themes'];

function makeRAGDatasets(alpha: number) {
    return [
        {
            label: SEMANTIC_LABELS.positive,
            data: [4, 3, 5, 2, 4, 3],
            backgroundColor: hexAlpha(SEMANTIC.positive, alpha),
            borderColor: SEMANTIC.positive,
            stack: 'main',
        },
        {
            label: SEMANTIC_LABELS.neutral,
            data: [2, 2, 1, 2, 2, 2],
            backgroundColor: hexAlpha(SEMANTIC.neutral, alpha),
            borderColor: SEMANTIC.neutral,
            stack: 'main',
        },
        {
            label: SEMANTIC_LABELS.caution,
            data: [2, 2, 1, 3, 2, 2],
            backgroundColor: hexAlpha(SEMANTIC.caution, alpha),
            borderColor: SEMANTIC.caution,
            stack: 'main',
        },
        {
            label: SEMANTIC_LABELS.attention,
            data: [1, 1, 1, 2, 1, 2],
            backgroundColor: hexAlpha(SEMANTIC.attention, alpha),
            borderColor: SEMANTIC.attention,
            stack: 'main',
        },
    ];
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/HorizontalBarChart',
    component: HorizontalBarChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**HorizontalBarChart** — horizontal stacked bar. Used in EcecQl1 (SP + Community views).

### Design decisions
- **indexAxis**: \`'y'\` — categories on Y axis, values on X
- **Radius**: applied to the rightmost non-zero segment per row via \`stackedTopRadiusPlugin\`
- **Semantic RAG**: Sage 40 / Blue 55 / Amber 55 / Amber 75 (4-level scale)

### When to use
Prefer horizontal bars when:
- Category labels are long (avoids rotated x-axis labels)
- You have 5+ categories — horizontal layout gives each more room
- Comparing RAG status across named program components
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
} satisfies Meta<typeof HorizontalBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default — four-level RAG, 6 program components. */
export const Default: Story = {
    args: {
        data: {
            labels: COMPONENTS,
            datasets: makeRAGDatasets(0.88),
        },
        options: {
            ...BASE_OPTIONS,
            indexAxis: 'y' as const,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeHorizontalScales({ stacked: true }),
        } as Parameters<typeof HorizontalBarChart>[0]['options'],
    },
};

/** Community view — same structure, different perspective. */
export const CommunityView: Story = {
    name: 'Community view',
    args: {
        data: {
            labels: COMPONENTS,
            datasets: [
                { label: SEMANTIC_LABELS.positive, data: [3, 2, 4, 2, 3, 2], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88), borderColor: SEMANTIC.positive, stack: 'main' },
                { label: SEMANTIC_LABELS.neutral,  data: [2, 2, 1, 1, 2, 2], backgroundColor: hexAlpha(SEMANTIC.neutral, 0.88),  borderColor: SEMANTIC.neutral,  stack: 'main' },
                { label: SEMANTIC_LABELS.caution,  data: [2, 3, 2, 2, 2, 3], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),  borderColor: SEMANTIC.caution,  stack: 'main' },
                { label: SEMANTIC_LABELS.attention,data: [1, 1, 1, 3, 1, 1], backgroundColor: hexAlpha(SEMANTIC.attention, 0.88),borderColor: SEMANTIC.attention, stack: 'main' },
            ],
        },
        options: {
            ...BASE_OPTIONS,
            indexAxis: 'y' as const,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeHorizontalScales({ stacked: true }),
        } as Parameters<typeof HorizontalBarChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: { story: 'Community perspective — same component list, different rating data. Pair with SP view for side-by-side comparison in EcecQl1.' },
        },
    },
};

/** Single series — non-stacked. */
export const SingleSeries: Story = {
    name: 'Single series (non-stacked)',
    args: {
        data: {
            labels: COMPONENTS,
            datasets: [
                {
                    label: 'Sessions delivered',
                    data: [12, 8, 15, 6, 10, 9],
                    backgroundColor: hexAlpha(SERIES_COLORS[0], 0.88),
                    borderColor: SERIES_COLORS[0],
                },
            ],
        },
        options: {
            ...BASE_OPTIONS,
            indexAxis: 'y' as const,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeHorizontalScales({ stacked: false }),
        } as Parameters<typeof HorizontalBarChart>[0]['options'],
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
