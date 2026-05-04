import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MultiLineChart, { mkMultiLineMuted, mkMultiLineFocus, mkMultiLineGraduated } from './MultiLineChart';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

// ─── Sample data ──────────────────────────────────────────────────────────────

const QUARTERS = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24"];

const CENTRES = [
    { name: 'Gowrie Fitzroy',      data: [74, 76, 78, 80, 79, 82, 84, 83] },
    { name: 'Gowrie Carlton',      data: [65, 67, 70, 72, 71, 74, 76, 75] },
    { name: 'Gowrie Richmond',     data: [58, 60, 62, 64, 66, 68, 70, 69] },
    { name: 'Gowrie Collingwood',  data: [50, 52, 54, 56, 55, 57, 59, 61] },
    { name: 'Gowrie Brunswick',    data: [42, 44, 46, 48, 50, 52, 54, 53] },
    { name: 'Gowrie Northcote',    data: [35, 37, 39, 40, 42, 44, 45, 46] },
];

const sharedOptions = {
    ...BASE_OPTIONS,
    plugins: {
        legend: makeLegend(),
        tooltip: { ...makeTooltip(), mode: 'index' as const, intersect: false },
    },
    scales: makeScales({ yMin: 20, yMax: 100, yTickCallback: (v: number | string) => `${v}%` }),
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/MultiLineChart',
    component: MultiLineChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**MultiLineChart** — multi-centre / multi-cohort line chart for 5+ series.

### Three dataset strategies
Choose based on whether the user has a primary centre of interest:

| Strategy | When to use |
|---|---|
| **Muted tonal** (Option A) | No primary selection — all centres equal weight |
| **Focus + highlight** (Option B, recommended) | User has a primary centre — others recede to ghost grey |
| **Graduated blues** (Option C) | Wide panel with short centre labels — use end labels instead of legend |

### Dataset helpers
\`\`\`ts
mkMultiLineMuted(centres)           // Option A — full Outback palette
mkMultiLineFocus(centres, index)    // Option B — one bold, rest ghost
mkMultiLineGraduated(centres)       // Option C — graduated blues
\`\`\`

### When to use
Use when comparing 5+ centres/cohorts over time. For 2–4 series, use \`LineChart\` instead.
                `,
            },
        },
    },
    argTypes: {
        isLoading: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 750, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MultiLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Option A — Muted tonal family. All centres equal weight, Outback palette. */
export const MutedTonal: Story = {
    name: 'Option A — Muted tonal',
    args: {
        data: {
            labels: QUARTERS,
            datasets: mkMultiLineMuted(CENTRES),
        },
        options: sharedOptions,
    },
    parameters: {
        docs: {
            description: { story: 'All lines drawn from the Outback palette at equal weight. Use when no centre is selected as primary.' },
        },
    },
};

/** Option B — Grey chorus + highlight (recommended). One bold highlighted line. */
export const FocusHighlight: Story = {
    name: 'Option B — Focus + highlight (recommended)',
    args: {
        data: {
            labels: QUARTERS,
            datasets: mkMultiLineFocus(CENTRES, 0),
        },
        options: sharedOptions,
    },
    parameters: {
        docs: {
            description: { story: 'Gowrie Fitzroy (index 0) highlighted in Amber 55; all other centres recede to ghost grey. Recommended when the user selects a primary centre.' },
        },
    },
};

/** Option B — different centre highlighted. */
export const FocusHighlightMidSeries: Story = {
    name: 'Option B — Different centre highlighted',
    args: {
        data: {
            labels: QUARTERS,
            datasets: mkMultiLineFocus(CENTRES, 3),
        },
        options: sharedOptions,
    },
    parameters: {
        docs: {
            description: { story: 'Gowrie Collingwood (index 3) highlighted — demonstrates highlighting a mid-series centre.' },
        },
    },
};

/** Option C — Graduated blues, suitable for end-label layouts. */
export const GraduatedBlues: Story = {
    name: 'Option C — Graduated blues',
    args: {
        data: {
            labels: QUARTERS,
            datasets: mkMultiLineGraduated(CENTRES.slice(0, 3)),
        },
        options: {
            ...sharedOptions,
            plugins: {
                legend: { display: false },
                tooltip: { ...makeTooltip(), mode: 'index' as const, intersect: false },
            },
        },
    },
    parameters: {
        docs: {
            description: { story: 'Three-centre graduated blues — legend hidden, intended for end-of-line label annotations. Best for wide panels with short centre names.' },
        },
    },
};

/** Compact density — for data-dense dashboard panels. */
export const CompactDensity: Story = {
    name: 'Compact density',
    args: {
        data: {
            labels: QUARTERS,
            datasets: mkMultiLineFocus(CENTRES, 0),
        },
        options: {
            ...BASE_OPTIONS,
            plugins: {
                legend: makeLegend({ density: 'compact' }),
                tooltip: { ...makeTooltip(), mode: 'index' as const, intersect: false },
            },
            scales: makeScales({ yMin: 20, yMax: 100, yTickCallback: (v: number | string) => `${v}%`, density: 'compact' }),
        },
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
