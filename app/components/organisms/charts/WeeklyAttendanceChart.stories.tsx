import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import WeeklyAttendanceChart, { mkAttendanceDatasets } from './WeeklyAttendanceChart';
import { makeScales, makeLegend, makeTooltip, makeTotalLineDataset, BASE_OPTIONS } from './default-chart-options';
import { STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

// ─── Sample data ──────────────────────────────────────────────────────────────
// 26 weeks: 30 Jun → 29 Dec (biweekly labels for readability)

const WEEKS = [
    '30 Jun', '7 Jul', '14 Jul', '21 Jul', '28 Jul',
    '4 Aug',  '11 Aug', '18 Aug', '25 Aug',
    '1 Sep',  '8 Sep',  '15 Sep', '22 Sep', '29 Sep',
    '6 Oct',  '13 Oct', '20 Oct', '27 Oct',
    '3 Nov',  '10 Nov', '17 Nov', '24 Nov',
    '1 Dec',  '8 Dec',  '15 Dec', '22 Dec',
];

// 10 series × 26 weeks — bottom (30+ hrs) → top (Did not attend)
const ATTENDANCE_DATA: number[][] = [
    [8, 9, 10, 9, 8, 10, 9, 8, 10, 9, 8, 9, 10, 9, 8, 10, 9, 8, 9, 10, 9, 8, 9, 10, 9, 8],   // 30+
    [6, 7, 6, 7, 8, 7, 6, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 7, 6, 7, 8, 7, 6, 7, 8],          // 25–30
    [10, 9, 8, 9, 10, 9, 10, 9, 8, 9, 10, 9, 8, 9, 10, 9, 8, 9, 9, 10, 9, 8, 9, 10, 9, 8],   // 15–25
    [7, 8, 7, 6, 7, 8, 7, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 8, 7, 6, 7, 8, 7, 6, 7],          // 13–15
    [6, 6, 7, 7, 6, 6, 7, 6, 7, 7, 6, 6, 7, 7, 6, 6, 7, 7, 6, 6, 7, 7, 6, 6, 7, 7],          // 10–13
    [5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5],          // 8–10
    [4, 4, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 4, 3, 4, 4, 3, 4, 4, 3],          // 6–8
    [3, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 3, 4, 3, 3, 4, 3, 3, 4],          // 4–6
    [2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2],          // <4
    [5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5],          // Did not attend
];

const ENROLLED = ATTENDANCE_DATA.reduce(
    (totals, series) => totals.map((t, i) => t + series[i]),
    new Array(26).fill(0),
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/WeeklyAttendanceChart',
    component: WeeklyAttendanceChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**WeeklyAttendanceChart** — 26-week stacked bar showing attendance hours distribution.
Used in the Gowrie weekly attendance view.

### Implementation
A specialised wrapper over \`HeatmapChart\` that sets:
- X-axis labels rotated 45° (\`rotateX: true\`)
- Wider default aspect ratio (16:7)
- \`mkAttendanceDatasets()\` helper to build the 10-series dataset array

### Colour scale (bottom → top)
10 steps from Sage 80 (on track, darkest) → Stone 50 (did not attend).
"Did not attend" always renders at 55% opacity — lower signal, same stack.

### Filters (from spec)
- Children: 3 options
- Centre: 9 Gowrie locations
- Who are: 2 options

### When to use
For 26-week session attendance data with hourly bands.
Use \`HeatmapChart\` for shorter time ranges or non-attendance distributions.
                `,
            },
        },
    },
    argTypes: {
        isLoading: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 900, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof WeeklyAttendanceChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default — 26 weeks, 10-series attendance scale, rotated x labels. */
export const Default: Story = {
    args: {
        data: {
            labels: WEEKS,
            datasets: mkAttendanceDatasets(ATTENDANCE_DATA),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true, rotateX: true }),
        } as Parameters<typeof WeeklyAttendanceChart>[0]['options'],
    },
};

/** With total enrolled reference line. */
export const WithEnrolledLine: Story = {
    name: 'With total enrolled reference line',
    args: {
        data: {
            labels: WEEKS,
            datasets: [
                ...mkAttendanceDatasets(ATTENDANCE_DATA),
                makeTotalLineDataset('Total enrolled', ENROLLED),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true, rotateX: true }),
        } as Parameters<typeof WeeklyAttendanceChart>[0]['options'],
    },
    parameters: {
        docs: {
            description: { story: 'Overlaid Stone 50 dashed reference line for total enrolled children per week.' },
        },
    },
};

/** Compact density — for space-constrained dashboard panels. */
export const CompactDensity: Story = {
    name: 'Compact density',
    args: {
        data: {
            labels: WEEKS,
            datasets: mkAttendanceDatasets(ATTENDANCE_DATA),
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend({ density: 'compact' }), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true, rotateX: true, density: 'compact' }),
        } as Parameters<typeof WeeklyAttendanceChart>[0]['options'],
    },
};

/** Loading skeleton state. */
export const Loading: Story = {
    args: { isLoading: true },
};
