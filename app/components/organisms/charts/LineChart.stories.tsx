import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LineChart from './LineChart';
import { SERIES_COLORS, hexAlpha } from './chart-theme';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

// ─── Sample data ──────────────────────────────────────────────────────────────

const QUARTERS = ["Q2 '22", "Q3 '22", "Q4 '22", "Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"];

function makeLineDataset(
    label: string,
    data: number[],
    color: string,
    fillAlpha = 0.07,
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
        tension: 0.32,
        fill: true,
    };
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/LineChart',
    component: LineChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**LineChart** — multi-series line chart with optional area fills.
Used in EcecP1, AncQl2, AncQl10, PpQl1.

### Design tokens
- Series 1: Blue 70 \`#2E6878\` — primary / top performer
- Series 2: Blue 55 \`#5A9EAF\` — secondary

### Design decisions
- **Tension**: 0.32 — gentle curve that reads as trend without over-smoothing
- **Point style**: Filled circle, white 2px border, 4px radius
- **Area fill**: 7% opacity (default) · 0% Minimal · 16% Editorial
- **Crosshair tooltip**: \`mode: 'index', intersect: false\` — shows all series at hovered x

### When to use
Use for time-series data where trend over time matters.
Maximum 4 lines — use MultiLineChart or a table for more series.
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
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Two series with subtle fills — standard pattern. */
export const Default: Story = {
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                makeLineDataset('Service provider', [62, 65, 68, 71, 70, 73, 76, 74, 78], SERIES_COLORS[0]),
                makeLineDataset('Community average', [45, 48, 52, 55, 58, 56, 60, 63, 65], SERIES_COLORS[1]),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: {
                legend: makeLegend(),
                tooltip: { ...makeTooltip(), mode: 'index', intersect: false },
            },
            scales: makeScales({ yMin: 30, yMax: 100, yTickCallback: (v) => `${v}%` }),
        },
    },
};

/** Single series — simpler trend view. */
export const SingleLine: Story = {
    name: 'Single series',
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                makeLineDataset('Service provider', [62, 65, 68, 71, 70, 73, 76, 74, 78], SERIES_COLORS[0]),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: {
                legend: makeLegend(),
                tooltip: { ...makeTooltip(), mode: 'index', intersect: false },
            },
            scales: makeScales({ yMin: 30, yMax: 100, yTickCallback: (v) => `${v}%` }),
        },
    },
};

/** Minimal mode — no fills, thinner lines. */
export const ModeMinimal: Story = {
    name: 'Visual mode — Minimal (no fills)',
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                makeLineDataset('Service provider', [62, 65, 68, 71, 70, 73, 76, 74, 78], SERIES_COLORS[0], 0, 2, 3),
                makeLineDataset('Community average', [45, 48, 52, 55, 58, 56, 60, 63, 65], SERIES_COLORS[1], 0, 2, 3),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: {
                legend: makeLegend(),
                tooltip: { ...makeTooltip(), mode: 'index', intersect: false },
            },
            scales: makeScales({ yMin: 30, yMax: 100, yTickCallback: (v) => `${v}%` }),
        },
    },
    parameters: {
        docs: { description: { story: 'Zero fill alpha, smaller points — for dense or print contexts.' } },
    },
};

/** Editorial mode — bold fills for emphasis. */
export const ModeEditorial: Story = {
    name: 'Visual mode — Editorial (bold fills)',
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                makeLineDataset('Service provider', [62, 65, 68, 71, 70, 73, 76, 74, 78], SERIES_COLORS[0], 0.16, 2.5, 5),
                makeLineDataset('Community average', [45, 48, 52, 55, 58, 56, 60, 63, 65], SERIES_COLORS[1], 0.16, 2.5, 5),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: {
                legend: makeLegend(),
                tooltip: { ...makeTooltip(), mode: 'index', intersect: false },
            },
            scales: makeScales({ yMin: 30, yMax: 100, yTickCallback: (v) => `${v}%` }),
        },
    },
    parameters: {
        docs: { description: { story: '16% fill alpha, bolder lines and points — for hero/summary views.' } },
    },
};

/** Four series — maximum recommended before switching to MultiLineChart. */
export const FourSeries: Story = {
    name: 'Four series (maximum)',
    args: {
        data: {
            labels: QUARTERS,
            datasets: [
                makeLineDataset('Site A', [62, 65, 68, 71, 70, 73, 76, 74, 78], SERIES_COLORS[0]),
                makeLineDataset('Site B', [45, 48, 52, 55, 58, 56, 60, 63, 65], SERIES_COLORS[1]),
                makeLineDataset('Site C', [55, 57, 60, 62, 64, 67, 65, 68, 70], SERIES_COLORS[3]),
                makeLineDataset('Site D', [38, 40, 43, 46, 48, 50, 52, 55, 57], SERIES_COLORS[4]),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            plugins: {
                legend: makeLegend(),
                tooltip: { ...makeTooltip(), mode: 'index', intersect: false },
            },
            scales: makeScales({ yMin: 30, yMax: 100, yTickCallback: (v) => `${v}%` }),
        },
    },
    parameters: {
        docs: { description: { story: 'Four series is the maximum for readability. Beyond this, use MultiLineChart strategies (muted tonal, focus/highlight).' } },
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
