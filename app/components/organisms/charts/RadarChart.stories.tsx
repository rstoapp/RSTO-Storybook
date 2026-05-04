import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RadarChart from './RadarChart';
import { SERIES_COLORS, P, hexAlpha } from './chart-theme';
import { makeRadarScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

// ─── Sample data ──────────────────────────────────────────────────────────────

const AXES = ['Access', 'Cultural safety', 'Family engagement', 'Staffing', 'Environment', 'Learning', 'Transitions'];
const SP_DATA  = [72, 65, 80, 58, 75, 68, 70];
const COM_DATA = [60, 78, 70, 72, 65, 75, 60];

function makeRadarDataset(
    label: string,
    data: number[],
    color: string,
    fillAlpha = 0.14,
    lineWidth = 2,
    pointRadius = 4,
) {
    return {
        label,
        data,
        borderColor: color,
        backgroundColor: hexAlpha(color, fillAlpha),
        borderWidth: lineWidth,
        pointBackgroundColor: color,
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius,
        pointHoverRadius: pointRadius + 2,
    };
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/RadarChart',
    component: RadarChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**RadarChart** — spider / radar chart. Used in EcecQl1 (SP + Community views).

### Design tokens
- Dataset 1: Blue 70 \`#2E6878\` — Service Provider / primary
- Dataset 2: Blue 55 \`#5A9EAF\` — Community / secondary
- Grid / angle lines: \`P.bone\` (\`#EEE8DF\`)
- Fill alpha: ~14% — enough to show overlap without obscuring either polygon

### Design decisions
- **Scale**: 0–100, gridlines at 25-point intervals
- **Two datasets max** — beyond two, overlapping fills become unreadable; use a table instead
- **Point labels**: Open Sans at axis font size, P.shadow colour

### When to use
Use to compare two perspectives (SP vs Community) across a fixed set of quality dimensions.
Not suitable for time-series data or more than 8 axes.
                `,
            },
        },
    },
    argTypes: {
        isLoading: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 500, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default — SP vs Community dual dataset. */
export const Default: Story = {
    args: {
        data: {
            labels: AXES,
            datasets: [
                makeRadarDataset('Service Provider', SP_DATA,  SERIES_COLORS[0]),
                makeRadarDataset('Community',        COM_DATA, SERIES_COLORS[1]),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeRadarScales(),
        } as Parameters<typeof RadarChart>[0]['options'],
    },
};

/** Single dataset — SP only. */
export const SingleDataset: Story = {
    name: 'Single dataset (SP only)',
    args: {
        data: {
            labels: AXES,
            datasets: [
                makeRadarDataset('Service Provider', SP_DATA, SERIES_COLORS[0]),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeRadarScales(),
        } as Parameters<typeof RadarChart>[0]['options'],
    },
    parameters: {
        docs: { description: { story: 'Single-dataset view — useful when community data is not yet available.' } },
    },
};

/** Minimal mode — outline only, minimal fills. */
export const ModeMinimal: Story = {
    name: 'Visual mode — Minimal',
    args: {
        data: {
            labels: AXES,
            datasets: [
                makeRadarDataset('Service Provider', SP_DATA,  SERIES_COLORS[0], 0.04, 2, 3),
                makeRadarDataset('Community',        COM_DATA, SERIES_COLORS[1], 0.04, 2, 3),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeRadarScales(),
        } as Parameters<typeof RadarChart>[0]['options'],
    },
};

/** Editorial mode — bold fills for emphasis. */
export const ModeEditorial: Story = {
    name: 'Visual mode — Editorial',
    args: {
        data: {
            labels: AXES,
            datasets: [
                makeRadarDataset('Service Provider', SP_DATA,  SERIES_COLORS[0], 0.26, 2.5, 5),
                makeRadarDataset('Community',        COM_DATA, SERIES_COLORS[1], 0.26, 2.5, 5),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeRadarScales(),
        } as Parameters<typeof RadarChart>[0]['options'],
    },
};

/** Stronger gridlines for print contexts. */
export const CrosshatchGrid: Story = {
    name: 'Grid — stronger (print-safe)',
    args: {
        data: {
            labels: AXES,
            datasets: [
                makeRadarDataset('Service Provider', SP_DATA,  SERIES_COLORS[0]),
                makeRadarDataset('Community',        COM_DATA, SERIES_COLORS[1]),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeRadarScales({ gridColor: P.stone }),
        } as Parameters<typeof RadarChart>[0]['options'],
    },
    parameters: {
        docs: { description: { story: 'Stronger gridlines using Stone 50 — for print or high-ambient-light contexts.' } },
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
