import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BarChart from './BarChart';
import { stackedTopRadiusPlugin, STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';
import { STACK_COLORS, SEMANTIC, P, hexAlpha } from './chart-theme';
import { makeScales, makeLegend, makeTooltip, makeTotalLineDataset, BASE_OPTIONS } from './default-chart-options';

// ─── Shared sample data ───────────────────────────────────────────────────────

const QUARTERS = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"];
const SERIES_LABELS = ['Complete record', 'Pathology appt', 'Urine test', 'Hb screen'];
const SERIES_DATA = [
    [45, 50, 54, 58, 62, 67],
    [38, 42, 44, 48, 52, 56],
    [55, 58, 61, 63, 67, 70],
    [30, 33, 35, 38, 42, 45],
];
const TOTALS = [95, 102, 106, 112, 118, 124];

function makeDatasets(alpha = 0.88) {
    return SERIES_LABELS.map((label, i) => ({
        label,
        data: SERIES_DATA[i],
        backgroundColor: hexAlpha(STACK_COLORS[i], alpha),
        borderColor: STACK_COLORS[i],
        stack: 'main',
    }));
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/BarChart',
    component: BarChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**BarChart** — vertical stacked bar chart. Most-used chart type in RSTO (25+ consumers).

### Design tokens
- Series colours: \`STACK_COLORS[0..3]\` — Sage 60 → Sage 40 → Blue 38 → Blue 55
- Total reference line: \`P.stone\` (Stone 50) dashed 1.5px
- Bar radius: topmost segment only via \`stackedTopRadiusPlugin\`

### Anatomy
\`\`\`
[chart canvas]
[legend]   ● Complete record  ● Pathology appt  …
\`\`\`
Place inside \`ChartCard\` to add eyebrow, title, and optional ⓘ tooltip.

### When to use
Use for tracking multiple care indicators across time periods (quarters).
Use the \`WithTotalLine\` story pattern when showing a population denominator.
                `,
            },
        },
    },
    argTypes: {
        isLoading: { control: 'boolean', description: 'Show skeleton placeholder' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 700, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default stacked bar — four care indicators across six quarters. */
export const Default: Story = {
    args: {
        data: {
            labels: QUARTERS,
            datasets: makeDatasets(),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof BarChart>[0]['options'],
    },
};

/** With a dashed total-women reference line overlaid. */
export const WithTotalLine: Story = {
    name: 'With total reference line',
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                ...makeDatasets(),
                makeTotalLineDataset('Total women', TOTALS),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof BarChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Mixed chart: stacked bars + a dashed Stone 50 reference line. `stackedTopRadiusPlugin` ignores line-type datasets automatically.',
            },
        },
    },
};

/** Minimal mode — outline-only bars, 7% fill. */
export const ModeMinimal: Story = {
    name: 'Visual mode — Minimal',
    args: {
        data: {
            labels: QUARTERS,
            datasets: SERIES_LABELS.map((label, i) => ({
                label,
                data: SERIES_DATA[i],
                backgroundColor: hexAlpha(STACK_COLORS[i], 0.07),
                borderColor: STACK_COLORS[i],
                borderWidth: 2,
                stack: 'main',
            })),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: 0,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof BarChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: { story: 'Outline-only variant — fills drop to 7% opacity. No top radius. Useful for print or high-contrast contexts.' },
        },
    },
};

/** Editorial mode — bold fills, 8px radius. */
export const ModeEditorial: Story = {
    name: 'Visual mode — Editorial',
    args: {
        data: {
            labels: QUARTERS,
            datasets: makeDatasets(1.0),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: 8,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof BarChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: { story: 'Full opacity fills, 8px top radius — for hero or summary views.' },
        },
    },
};

/** Semantic RAG — four-level RAG when colour carries meaning. */
export const SemanticRAG: Story = {
    name: 'Semantic RAG colours',
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                {
                    label: 'On track',
                    data: [45, 50, 54, 58, 62, 67],
                    backgroundColor: hexAlpha(SEMANTIC.positive, 0.88),
                    borderColor: SEMANTIC.positive,
                    stack: 'main',
                },
                {
                    label: 'Neutral',
                    data: [20, 18, 17, 16, 15, 13],
                    backgroundColor: hexAlpha(SEMANTIC.neutral, 0.88),
                    borderColor: SEMANTIC.neutral,
                    stack: 'main',
                },
                {
                    label: 'Caution',
                    data: [20, 18, 17, 16, 14, 12],
                    backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),
                    borderColor: SEMANTIC.caution,
                    stack: 'main',
                },
                {
                    label: 'Needs attention',
                    data: [15, 14, 12, 10, 9, 8],
                    backgroundColor: hexAlpha(SEMANTIC.attention, 0.88),
                    borderColor: SEMANTIC.attention,
                    stack: 'main',
                },
            ],
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof BarChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Four-level RAG palette (Sage 40 / Blue 55 / Amber 55 / Amber 75). Use when colour carries meaning — colours must remain consistent across views.',
            },
        },
    },
};

/** Compact density — for data-dense dashboards. */
export const CompactDensity: Story = {
    name: 'Compact density',
    args: {
        data: {
            labels: QUARTERS,
            datasets: makeDatasets(),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend({ density: 'compact' }), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true, density: 'compact' }),
        } as Parameters<typeof BarChart>[0]['options'],
    },
    parameters: {
        docs: { description: { story: 'Reduced axis/legend font sizes for dense dashboard layouts.' } },
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
