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

// ─── Reference-scale story ────────────────────────────────────────────────────
// Mirrors the reference design: Jul 2025 → Jan 2026 (30 weeks), ~800–900 children,
// 10 attendance bands + "Total number of children" line overlay.

const REF_WEEKS = [
    '28 Jul 2025', '4 Aug 2025',  '11 Aug 2025', '18 Aug 2025', '25 Aug 2025',
    '1 Sept 2025', '8 Sept 2025', '15 Sept 2025','22 Sept 2025','29 Sept 2025',
    '6 Oct 2025',  '13 Oct 2025', '20 Oct 2025', '27 Oct 2025',
    '3 Nov 2025',  '10 Nov 2025', '17 Nov 2025', '24 Nov 2025',
    '1 Dec 2025',  '8 Dec 2025',  '15 Dec 2025', '22 Dec 2025', '29 Dec 2025',
    '5 Jan 2026',  '12 Jan 2026', '19 Jan 2026', '26 Jan 2026',
];

// 10 bands × 27 weeks — bottom (30+ hrs) → top (Did not attend).
// Proportional distribution per full term week (~835 total):
//   30+: 23% · 25–30: 6.5% · 15–25: 18% · 13–15: 20.5% · 10–13: 18%
//   8–10: 5% · 6–8: 2.5% · 4–6: 1.8% · <4: 1.2% · DnA: 3.5%
// Pattern: term weeks ~835 · mid-term break wk10–11 ~505/455 · Dec holiday ~300/0 · Jan recovery ~300–545
const REF_DATA: number[][] = [
    // 30+ hrs        wk1  wk2  wk3  wk4  wk5  wk6  wk7  wk8  wk9 wk10 wk11 wk12 wk13 wk14 wk15 wk16 wk17 wk18 wk19 wk20 wk21 wk22 wk23 wk24 wk25 wk26 wk27
    [ 97, 195, 190, 192, 195, 191, 195, 192, 191, 115, 105, 191, 195, 190, 192, 195, 192, 191, 195, 190, 180,  70,   0,  70,  70,  72, 125],
    // 25–<30 hrs
    [ 27,  55,  55,  54,  55,  54,  55,  55,  54,  33,  30,  54,  55,  55,  54,  55,  55,  54,  55,  55,  52,  20,   0,  20,  20,  20,  35],
    // 15–<25 hrs
    [ 76, 150, 150, 149, 150, 147, 150, 148, 149,  90,  82, 147, 150, 148, 149, 150, 148, 148, 150, 150, 141,  54,   0,  54,  55,  57,  98],
    // 13–<15 hrs  ← dominant middle band in the reference (~20.5%)
    [ 86, 170, 171, 169, 170, 167, 170, 171, 169, 103,  93, 167, 170, 171, 169, 170, 171, 168, 170, 171, 160,  62,   0,  62,  63,  64, 112],
    // 10–<13 hrs  ← second-largest band (~18%)
    [ 76, 150, 149, 149, 150, 147, 150, 148, 149,  91,  82, 147, 150, 148, 149, 150, 148, 148, 150, 148, 141,  54,   0,  54,  55,  56,  98],
    // 8–<10 hrs   ← orange threshold (~5%)
    [ 21,  42,  42,  42,  42,  41,  42,  42,  41,  25,  23,  41,  42,  42,  42,  42,  42,  41,  42,  42,  39,  15,   0,  15,  15,  16,  27],
    // 6–<8 hrs
    [ 11,  21,  21,  20,  21,  20,  21,  20,  20,  13,  11,  20,  21,  21,  20,  21,  21,  20,  21,  21,  20,   8,   0,   8,   8,   8,  14],
    // 4–<6 hrs
    [  8,  15,  15,  15,  15,  15,  15,  15,  15,   9,   8,  15,  15,  15,  15,  15,  15,  15,  15,  15,  14,   5,   0,   5,   5,   6,  10],
    // <4 hrs
    [  5,  10,  10,  10,  10,  10,  10,  10,  10,   6,   6,  10,  10,  10,  10,  10,  10,  10,  10,  10,   9,   4,   0,   4,   4,   4,   7],
    // Did not attend
    [ 13,  27,  32,  30,  27,  28,  27,  34,  32,  20,  15,  28,  27,  35,  30,  27,  33,  35,  27,  33,  29,   8,   0,   8,  10,  12,  19],
];

const REF_TOTALS = REF_DATA.reduce(
    (totals, series) => totals.map((t, i) => t + series[i]),
    new Array(REF_WEEKS.length).fill(0),
);

/**
 * Reference-scale view — Jul 2025 → Jan 2026.
 * Matches the breakdown shown in the reference design: 10 attendance-hour bands
 * plus a "Total number of children" Stone 50 line overlay.
 * School-year pattern: full term weeks ~800–900; Dec holidays ~170; mid-term break ~30.
 */
export const ReferenceScaleWithTotalLine: Story = {
    name: 'Reference scale — Jul 2025–Jan 2026 with total line',
    args: {
        data: {
            labels: REF_WEEKS,
            datasets: [
                ...mkAttendanceDatasets(REF_DATA),
                makeTotalLineDataset('Total number of children', REF_TOTALS),
            ],
        },
        options: {
            ...BASE_OPTIONS,
            _stackedTopRadius: STACKED_TOP_RADIUS,
            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
            scales: makeScales({ stacked: true, rotateX: true }),
        } as Parameters<typeof WeeklyAttendanceChart>[0]['options'],
        aspectRatio: { width: 16, height: 7 },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 1100, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: `Mirrors the reference design: weekly attendance from Jul 2025 to Jan 2026 across all 10 hour-band breakdowns. The Stone 50 dashed line shows total number of children per week. Holiday periods (late Dec) drop to near-zero; mid-term break shows a trough around week 10.`,
            },
        },
    },
};
