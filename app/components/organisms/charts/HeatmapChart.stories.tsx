import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeatmapChart from './HeatmapChart';
import { HEATMAP_COLORS, hexAlpha } from './chart-theme';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

// ─── Sample data ──────────────────────────────────────────────────────────────

const MONTHS = ["Nov '23", "Dec '23", "Jan '24", "Feb '24", "Mar '24", "Apr '24", "Jun '24"];

// 5-band subset using alternate steps from the 10-level attendance scale
const BANDS  = ['<4 hrs', '4–8 hrs', '8–13 hrs', '13–25 hrs', '25+ hrs'];
const BAND_COLORS = [HEATMAP_COLORS[8], HEATMAP_COLORS[7], HEATMAP_COLORS[5], HEATMAP_COLORS[3], HEATMAP_COLORS[1]];
const DATA   = [
    [15, 18, 16, 14, 17, 15, 13],
    [22, 20, 24, 22, 20, 23, 25],
    [30, 28, 26, 30, 28, 27, 29],
    [20, 22, 21, 20, 22, 23, 20],
    [13, 12, 13, 14, 13, 12, 13],
];

function makeHeatDatasets(alpha = 1.0) {
    return BANDS.map((label, i) => ({
        label,
        data: DATA[i],
        backgroundColor: hexAlpha(BAND_COLORS[i], alpha),
        borderColor: 'white',
        borderWidth: 1.5,
        stack: 'main',
    }));
}

const tooltipWithLabel = {
    ...makeTooltip(),
    callbacks: {
        label: (ctx: { dataset: { label: string }; parsed: { y: number } }) =>
            ` ${ctx.dataset.label}: ${ctx.parsed.y} children`,
    },
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/HeatmapChart',
    component: HeatmapChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**HeatmapChart** — stacked bar chart used as an intensity heatmap. Used in PpQl1.

### Implementation note
This is not a true matrix heatmap — it is a vertical stacked bar where each
band represents a frequency bucket. The colour ramp creates the intensity effect.

### Colour ramp (v4.1 Desaturated palette)
Drawn from the 10-level weekly attendance scale — pick steps at even intervals:

| Step | Hex | Role |
|------|-----|------|
| Amber 65 \`#B06230\` | Lowest frequency |
| Amber 55 \`#D4844A\` | Low |
| Blue 22 \`#B8D8E2\` | Mid |
| Sage 40 \`#80A89C\` | High |
| Sage 70 \`#3D6860\` | Highest frequency |

For full 10-band weekly attendance data, use **WeeklyAttendanceChart** instead.

### Design decisions
- White 1.5px \`borderColor\` between segments — clearly separates bands at full opacity
- \`stackedTopRadiusPlugin\` rounds the topmost band each column
- In Minimal mode, reduce fill alpha to ~0.55 to preserve the sequential gradient
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
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default — full opacity, 5 frequency bands. */
export const Default: Story = {
    args: {
        data: {
            labels: MONTHS,
            datasets: makeHeatDatasets(1.0),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: tooltipWithLabel },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof HeatmapChart>[0]['options'],
    },
};

/** Minimal mode — lighter fills preserve gradient readability. */
export const ModeMinimal: Story = {
    name: 'Visual mode — Minimal (lightened fills)',
    args: {
        data: {
            labels: MONTHS,
            datasets: makeHeatDatasets(0.55),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: 0,
            plugins: { legend: makeLegend(), tooltip: tooltipWithLabel },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof HeatmapChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: {
                story: 'In Minimal mode, heatmap fills drop to 55% — a fully transparent heatmap would be unreadable. The sequential gradient must remain visible.',
            },
        },
    },
};

/** Bare grid — no y-axis gridlines. */
export const GridBare: Story = {
    name: 'Grid — Bare (no gridlines)',
    args: {
        data: {
            labels: MONTHS,
            datasets: makeHeatDatasets(1.0),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: tooltipWithLabel },
            scales: makeScales({ stacked: true, showVerticalGrid: false }),
        } as Parameters<typeof HeatmapChart>[0]['options'],
    },
    parameters: {
        docs: { description: { story: 'No gridlines — the colour bands provide all the structure needed.' } },
    },
};

/** Three bands — simplified view for basic reporting. */
export const ThreeBands: Story = {
    name: 'Three frequency bands',
    args: {
        data: {
            labels: MONTHS,
            datasets: [
                { label: 'Less than 8 hrs',  data: [37, 38, 40, 36, 37, 38, 38], backgroundColor: BAND_COLORS[0], borderColor: 'white', borderWidth: 1.5, stack: 'main' },
                { label: '8–13 hrs',         data: [30, 28, 26, 30, 28, 27, 29], backgroundColor: BAND_COLORS[2], borderColor: 'white', borderWidth: 1.5, stack: 'main' },
                { label: 'More than 13 hrs', data: [33, 34, 34, 34, 35, 35, 33], backgroundColor: BAND_COLORS[4], borderColor: 'white', borderWidth: 1.5, stack: 'main' },
            ],
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: tooltipWithLabel },
            scales: makeScales({ stacked: true }),
        } as Parameters<typeof HeatmapChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: {
                story: 'Collapsed to 3 bands — pick colours at even intervals to preserve sequential readability.',
            },
        },
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
