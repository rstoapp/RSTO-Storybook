import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RadarIcon from '@mui/icons-material/Radar';
import GridOnIcon from '@mui/icons-material/GridOn';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Menu, MenuItem } from '@mui/material';
import ChartCard, { FilterChip } from './ChartCard';
import BarChart from './BarChart';
import BarChartGroup from './BarChartGroup';
import LineChart from './LineChart';
import HorizontalBarChart from './HorizontalBarChart';
import RadarChart from './RadarChart';
import HeatmapChart from './HeatmapChart';
import DoughnutChart from './DoughnutChart';
import EmptyChartState from './EmptyChartState';
import { P, STACK_COLORS, SERIES_COLORS, SEMANTIC, HEATMAP_COLORS, hexAlpha, CHART_FONT_FAMILY } from './chart-theme';
import { makeScales, makeHorizontalScales, makeRadarScales, makeLegend, makeTooltip, makeTotalLineDataset, BASE_OPTIONS } from './default-chart-options';
import { STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'RSTO/Organisms/Charts/ChartCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**ChartCard** — organism that wraps any chart molecule in the RSTO card shell.

### Anatomy
\`\`\`
[icon + eyebrow]   ANC · Routine Care          [ⓘ tooltip]
[title]            Routine test completeness by care item
[filters]          Site: All sites ▾   Period: Q1 2023 – Q2 2024 ▾
[chart canvas]     ← any chart molecule
\`\`\`

### Usage
Pass any chart molecule as the \`chart\` prop. All six chart types are demonstrated below.
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 700, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

// ── Shared helpers ────────────────────────────────────────────────────────────

const QUARTERS = ["Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"];
const SERIES_LABELS = ['Complete record', 'Pathology appt', 'Urine test', 'Hb screen'];
const SERIES_DATA = [
    [52, 38, 65, 44, 70, 58],   // Complete record — dips Q2, peaks Q4/Q5
    [35, 58, 28, 62, 40, 68],   // Pathology appt  — alternates high/low
    [48, 74, 52, 36, 82, 60],   // Urine test      — strong Q2/Q5, dips Q4
    [28, 44, 18, 52, 33, 56],   // Hb screen       — low with two strong peaks
];
// Derived so the reference line always sits exactly at the top of each column.
const TOTALS = SERIES_DATA[0].map((_, i) => SERIES_DATA.reduce((sum, row) => sum + row[i], 0));

// Mixed palette — cool→warm using the first 4 STACK_COLORS steps in order.
// Deep sage → mid sage → teal-blue → burnt clay.
const MIXED_COLORS = [
    STACK_COLORS[0],    // Deep sage  — bottom/dominant
    STACK_COLORS[1],    // Mid sage   — second
    STACK_COLORS[2],    // Teal-blue  — third
    STACK_COLORS[3],    // Burnt clay — top/smallest
] as const;

const ICON_SX = { width: '14px', height: '14px', color: P.eyebrow };

// ── ECEC places data (real implementation reference) ──────────────────────────
// Source: ACECQA (place counts) + ABS (total children). "Children without places"
// is a derived field — only non-zero where demand exceeds available places.
const ECEC_SUBURBS = [
    'Belmont',
    'Broadmeadows',
    'Carlton',
    'Carlton North – Princes Hill',
    'Docklands',
    'Grovedale – Mt Duneed',
    'Manor Lakes – Quandong',
    'Yarraville',
];
const ECEC_GOWRIE  = [20,  200,  90, 130, 220,  5,   5, 175]; // Gowrie VIC licensed places
const ECEC_OTHER   = [80,  470, 500, 115, 410, 55, 130, 210]; // Other ECEC places (ACECQA)
const ECEC_CHILDREN = [100, 1060, 330, 340, 735, 60, 130, 1105]; // ABS children 0-5 (line overlay)
// Unmet demand — only appears when children exceed total places in that area.
const ECEC_WITHOUT = ECEC_CHILDREN.map(
    (c, i) => Math.max(0, c - ECEC_GOWRIE[i] - ECEC_OTHER[i]),
);

// ── Stories ──────────────────────────────────────────────────────────────────

export const WithBarChart: StoryObj = {
    name: 'ChartCard + BarChart',
    render: () => (
        <ChartCard
            chartName="ANC · Routine Care"
            icon={<BarChartIcon sx={ICON_SX} />}
            title="Routine test completeness by care item"
            titleTooltip={{
                content: {
                    text: 'This chart shows the number of pregnant women who attended antenatal appointments where they were asked about smoking and their answer was recorded.',
                },
            }}
            filters={<>
                <FilterChip label="Site" value="All sites" />
                <FilterChip label="Period" value="Q1 2023 – Q2 2024" />
            </>}
            chart={
                <BarChart
                    data={{
                        labels: QUARTERS,
                        datasets: SERIES_LABELS.map((label, i) => ({
                            label,
                            data: SERIES_DATA[i],
                            backgroundColor: hexAlpha(MIXED_COLORS[i], 0.88),
                            borderColor: MIXED_COLORS[i],
                            stack: 'main',
                        })),
                    }}
                    options={{
                        ...BASE_OPTIONS,
                        _stackedTopRadius: STACKED_TOP_RADIUS,
                        plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                        scales: makeScales({ stacked: true }),
                    } as Parameters<typeof BarChart>[0]['options']}
                />
            }
        />
    ),
};

export const WithBarChartAndTotalLine: StoryObj = {
    name: 'ChartCard + BarChart (total reference line)',
    decorators: [
        (Story) => (
            <div style={{ width: 900, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
    render: () => (
        <ChartCard
            chartName="ECEC · Place Availability"
            icon={<BarChartIcon sx={ICON_SX} />}
            title="Availability of ECEC places"
            titleTooltip={{
                content: {
                    text: 'Stacked bars show licensed places (Gowrie VIC) and other ECEC places (ACECQA data). The orange segment indicates children without a place — shown only where ABS child population exceeds available places. The dashed line is the ABS total of children aged 0–5 in each catchment.',
                },
            }}
            filters={<>
                <FilterChip label="Region" value="All regions" />
                <FilterChip label="Year" value="2023" />
            </>}
            chart={
                <BarChart
                    data={{
                        labels: ECEC_SUBURBS,
                        datasets: [
                            {
                                label: 'Gowrie VIC places',
                                data: ECEC_GOWRIE,
                                backgroundColor: hexAlpha(STACK_COLORS[0], 0.88),
                                borderColor: STACK_COLORS[0],
                                stack: 'main',
                            },
                            {
                                label: 'Other ECEC places',
                                data: ECEC_OTHER,
                                backgroundColor: hexAlpha(STACK_COLORS[2], 0.88),
                                borderColor: STACK_COLORS[2],
                                stack: 'main',
                            },
                            {
                                label: 'Children without places',
                                data: ECEC_WITHOUT,
                                backgroundColor: hexAlpha(STACK_COLORS[3], 0.88),
                                borderColor: STACK_COLORS[3],
                                stack: 'main',
                            },
                            makeTotalLineDataset('Total number of children', ECEC_CHILDREN),
                        ],
                    }}
                    options={{
                        ...BASE_OPTIONS,
                        _stackedTopRadius: STACKED_TOP_RADIUS,
                        plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                        scales: makeScales({
                            stacked: true,
                            xAutoSkip: false,
                            xTickCallback: (_, i) => {
                                const label = ECEC_SUBURBS[i as number] ?? '';
                                return label.length > 13 ? label.slice(0, 12) + '\u2026' : label;
                            },
                        }),
                    } as Parameters<typeof BarChart>[0]['options']}
                />
            }
        />
    ),
};

// ── Antenatal gestational-age data (grouped-stacked reference) ────────────────
// Columns: Q4 2024, Q1 2025, Q2 2025, Q3 2025, Q4 2025
// Rows: gestational age band at first booking (better → worse, cool → warm)
const ANC_QUARTERS = ["Q4 '24", "Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25"];
const ANC_BAND_LABELS = [
    'Attended before 12.6 weeks',
    'Attended between 13.0\u201314.6 weeks',
    'Attended between 15.0\u201316.6 weeks',
    'Attended between 17.0\u201327.6 weeks',
    'Attended at 28.0 weeks or above',
];
// Short labels used in the tooltip (keeps tooltip rows compact)
const ANC_BAND_SHORT = [
    'Before 12.6 wks',
    '13.0\u201314.6 wks',
    '15.0\u201316.6 wks',
    '17.0\u201327.6 wks',
    '28.0+ wks',
];
//              Q4'24  Q1'25  Q2'25  Q3'25  Q4'25
const ANC_GP: number[][] = [
    [3, 1, 5, 2, 3],   // before 12.6 wks
    [2, 1, 3, 1, 2],   // 13.0-14.6 wks
    [1, 0, 2, 1, 1],   // 15.0-16.6 wks
    [1, 1, 1, 0, 1],   // 17.0-27.6 wks
    [0, 0, 0, 1, 0],   // 28.0+ wks
];  // GP-led totals:   7  3  11  5  7
const ANC_MDHS: number[][] = [
    [3, 1, 4, 2, 3],
    [1, 1, 3, 1, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
];  // MDHS-led totals: 7  3  11  5  7
const ANC_TOTALS = [7, 3, 11, 5, 7]; // total per quarter (reference line — one group)

export const WithGroupedStackedBarChart: StoryObj = {
    name: 'ChartCard + BarChart (grouped stacked)',
    decorators: [
        (Story) => (
            <div style={{ width: 900, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
    render: () => {
        // 10 bar datasets: 5 bands × 2 delivery models (GP-led left, MDHS-led right)
        // Each pair shares the same STACK_COLORS[i] colour so the legend only
        // needs 5 entries. The filter callback below keeps only GP-led datasets
        // (even indices) in the legend and strips the " \u00b7 GP" suffix.
        const barDatasets = ANC_BAND_SHORT.flatMap((shortLabel, i) => [
            {
                label: `${shortLabel} \u00b7 GP`,
                data: ANC_GP[i],
                backgroundColor: hexAlpha(STACK_COLORS[i], 0.88),
                borderColor: STACK_COLORS[i],
                stack: 'gp',
            },
            {
                label: `${shortLabel} \u00b7 MDHS`,
                data: ANC_MDHS[i],
                backgroundColor: hexAlpha(STACK_COLORS[i], 0.88),
                borderColor: STACK_COLORS[i],
                stack: 'mdhs',
            },
        ]);
        const LINE_DS_INDEX = barDatasets.length; // 10 — the reference line

        return (
            <ChartCard
                chartName="ANC · First Booking"
                icon={<BarChartIcon sx={ICON_SX} />}
                title={<>Number of pregnant women&nbsp;\u2022&nbsp;who attended their first antenatal appointment by gestational age</>}
                titleTooltip={{
                    content: {
                        text: 'Stacked bars show the gestational age at first antenatal booking. Cooler colours = earlier (better) bookings; warmer colours = later (concerning). Left bar per quarter = GP-led, right bar = MDHS-led. Dashed line shows total women per quarter.',
                    },
                }}
                filters={<>
                    <FilterChip label="Site" value="All sites" />
                    <FilterChip label="Period" value="Q4 2024 \u2013 Q4 2025" />
                </>}
                chart={
                    <BarChart
                        data={{
                            labels: ANC_QUARTERS,
                            datasets: [
                                ...barDatasets,
                                makeTotalLineDataset('Total number of women', ANC_TOTALS),
                            ],
                        }}
                        options={{
                            ...BASE_OPTIONS,
                            _stackedTopRadius: STACKED_TOP_RADIUS,
                            plugins: {
                                legend: {
                                    ...makeLegend(),
                                    labels: {
                                        ...(makeLegend() as { labels: object }).labels,
                                        // Show only GP-led bands (even indices) + the reference line.
                                        // Strip the " · GP" suffix so labels read as gestational age only.
                                        filter: (item: { datasetIndex: number; text: string }) => {
                                            if (item.datasetIndex === LINE_DS_INDEX) return true;
                                            if (item.datasetIndex % 2 !== 0) return false;
                                            item.text = item.text.replace(' \u00b7 GP', '');
                                            return true;
                                        },
                                    } as any,
                                } as ReturnType<typeof makeLegend>,
                                tooltip: {
                                    ...makeTooltip(),
                                    // Hide 0-value items to keep the tooltip readable across 10+ datasets
                                    filter: (item: { parsed: { y: number } }) => item.parsed.y > 0,
                                },
                            },
                            scales: makeScales({ stacked: true }),
                        } as Parameters<typeof BarChart>[0]['options']}
                    />
                }
            />
        );
    },
};

export const WithBarChartGroup: StoryObj = {
    name: 'ChartCard + BarChartGroup',
    render: () => {
        const CATEGORIES = ['On target', 'Qual. standards', 'Session length', 'No. sessions', 'Review freq.'];
        return (
            <ChartCard
                chartName="ANC · Program Fidelity"
                icon={<StackedBarChartIcon sx={ICON_SX} />}
                title="Program components — implementation fidelity"
                titleTooltip={{
                    content: {
                        text: 'Each component is rated against evidence standards. Colour indicates implementation level: green = to evidence, orange = partial, rust = not to evidence.',
                    },
                }}
                filters={<>
                    <FilterChip label="Site" value="All sites" />
                    <FilterChip label="Program" value="All programs" />
                </>}
                chart={
                    <BarChartGroup
                        data={{
                            labels: CATEGORIES,
                            datasets: [
                                { label: 'Implemented to evidence', data: [4, 3, 5, 2, 4], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88), borderColor: SEMANTIC.positive, borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                                { label: 'Partially implemented',   data: [2, 3, 1, 3, 2], backgroundColor: hexAlpha(SEMANTIC.neutral, 0.88),   borderColor: SEMANTIC.neutral,   borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                                { label: 'Not to evidence',         data: [1, 1, 1, 2, 1], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),   borderColor: SEMANTIC.caution,   borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                            ],
                        }}
                        options={{
                            ...BASE_OPTIONS,
                            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                            scales: makeScales({ stacked: false }),
                        }}
                    />
                }
            />
        );
    },
};

export const WithLineChart: StoryObj = {
    name: 'ChartCard + LineChart',
    render: () => (
        <ChartCard
            chartName="ANC · Quality"
            icon={<ShowChartIcon sx={ICON_SX} />}
            title="Proportion of programs implemented to evidence"
            titleTooltip={{
                content: {
                    text: 'Percentage of active programs assessed as implemented to evidence standards, across all sites. Supported programs include all funded programs; priority programs are flagged for intensive support.',
                },
            }}
            filters={<>
                <FilterChip label="Site" value="All sites" />
                <FilterChip label="Period" value="Q2 2022 – Q2 2024" />
            </>}
            chart={
                <LineChart
                    data={{
                        labels: ["Q2 '22", "Q3 '22", "Q4 '22", "Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23", "Q1 '24", "Q2 '24"],
                        datasets: [
                            { label: 'Supported programs', data: [62, 65, 68, 71, 70, 73, 76, 74, 78], borderColor: SERIES_COLORS[0], backgroundColor: hexAlpha(SERIES_COLORS[0], 0.07), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[0], pointBorderColor: P.paper, pointBorderWidth: 2, pointRadius: 4, tension: 0.32, fill: true },
                            { label: 'Priority programs',  data: [45, 48, 52, 55, 58, 56, 60, 63, 65], borderColor: SERIES_COLORS[1], backgroundColor: hexAlpha(SERIES_COLORS[1], 0.07), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[1], pointBorderColor: P.paper, pointBorderWidth: 2, pointRadius: 4, tension: 0.32, fill: true },
                        ],
                    }}
                    options={{
                        ...BASE_OPTIONS,
                        plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                        scales: makeScales({ yMin: 30, yMax: 100, yTickCallback: (v) => `${v}%` }),
                    } as Parameters<typeof LineChart>[0]['options']}
                />
            }
        />
    ),
};

export const WithHorizontalBarChart: StoryObj = {
    name: 'ChartCard + HorizontalBarChart',
    render: () => {
        const COMPONENTS = ['On target', 'Qual. standards', 'Session length', 'No. sessions', 'Review freq.', 'Session themes'];
        return (
            <ChartCard
                chartName="ECEC · Quality"
                icon={<BarChartIcon sx={{ ...ICON_SX, transform: 'rotate(90deg)' }} />}
                title="Implementation breakdown by component — SP view"
                titleTooltip={{
                    content: {
                        text: 'Each program component is rated as implemented, partial, or not to evidence. Results are aggregated across all sites for the selected period.',
                    },
                }}
                filters={<>
                    <FilterChip label="Site" value="All sites" />
                    <FilterChip label="Program" value="All programs" />
                </>}
                chart={
                    <HorizontalBarChart
                        data={{
                            labels: COMPONENTS,
                            datasets: [
                                { label: 'Implemented to evidence', data: [4, 3, 5, 2, 4, 3], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88), borderColor: SEMANTIC.positive, stack: 'main' },
                                { label: 'Partially implemented',   data: [2, 2, 1, 3, 2, 2], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),   borderColor: SEMANTIC.caution,   stack: 'main' },
                                { label: 'Not to evidence',         data: [1, 1, 1, 2, 1, 2], backgroundColor: hexAlpha(SEMANTIC.attention, 0.88), borderColor: SEMANTIC.attention, stack: 'main' },
                            ],
                        }}
                        options={{
                            ...BASE_OPTIONS,
                            indexAxis: 'y' as const,
                            _stackedTopRadius: STACKED_TOP_RADIUS,
                            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                            scales: makeHorizontalScales({ stacked: true }),
                        } as Parameters<typeof HorizontalBarChart>[0]['options']}
                    />
                }
            />
        );
    },
};

export const WithRadarChart: StoryObj = {
    name: 'ChartCard + RadarChart',
    render: () => {
        const AXES = ['Access', 'Cultural safety', 'Family engagement', 'Staffing', 'Environment', 'Learning', 'Transitions'];
        return (
            <ChartCard
                chartName="ECEC · Quality"
                icon={<RadarIcon sx={ICON_SX} />}
                title="Quality indicators — SP vs Community rating"
                titleTooltip={{
                    content: {
                        text: 'Scores out of 100 across seven quality domains. Service Provider ratings are self-assessed; Community ratings are collected via survey.',
                    },
                }}
                filters={<>
                    <FilterChip label="Site" value="All sites" />
                    <FilterChip label="Period" value="Q2 2024" />
                </>}
                chart={
                    <RadarChart
                        data={{
                            labels: AXES,
                            datasets: [
                                { label: 'Service Provider', data: [72, 65, 80, 58, 75, 68, 70], borderColor: SERIES_COLORS[0], backgroundColor: hexAlpha(SERIES_COLORS[0], 0.15), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[0], pointBorderColor: P.paper, pointBorderWidth: 2, pointRadius: 4 },
                                { label: 'Community',        data: [60, 78, 70, 72, 65, 75, 60], borderColor: SERIES_COLORS[1], backgroundColor: hexAlpha(SERIES_COLORS[1], 0.15), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[1], pointBorderColor: P.paper, pointBorderWidth: 2, pointRadius: 4 },
                            ],
                        }}
                        options={{
                            ...BASE_OPTIONS,
                            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                            scales: makeRadarScales(),
                        } as Parameters<typeof RadarChart>[0]['options']}
                    />
                }
            />
        );
    },
};

export const WithHeatmapChart: StoryObj = {
    name: 'ChartCard + HeatmapChart',
    render: () => {
        const MONTHS = ["Nov '23", "Dec '23", "Jan '24", "Feb '24", "Mar '24", "Apr '24", "Jun '24"];
        return (
            <ChartCard
                chartName="PP · Quality"
                icon={<GridOnIcon sx={ICON_SX} />}
                title="How often did children attend ECEC each week?"
                titleTooltip={{
                    content: {
                        text: 'Distribution of weekly ECEC attendance hours across enrolled children. Darker shading indicates higher frequency of that attendance band.',
                    },
                }}
                filters={<>
                    <FilterChip label="Site" value="All sites" />
                    <FilterChip label="Period" value="Nov 2023 – Jun 2024" />
                </>}
                chart={
                    <HeatmapChart
                        data={{
                            labels: MONTHS,
                            datasets: ['0–4 hrs', '4–8 hrs', '8–12 hrs', '12–16 hrs', '16+ hrs'].map((label, i) => ({
                                label,
                                data: [[15, 18, 16, 14, 17, 15, 13], [22, 20, 24, 22, 20, 23, 25], [30, 28, 26, 30, 28, 27, 29], [20, 22, 21, 20, 22, 23, 20], [13, 12, 13, 14, 13, 12, 13]][i],
                                backgroundColor: HEATMAP_COLORS[i],
                                borderColor: P.paper,
                                borderWidth: 1.5,
                                stack: 'main',
                            })),
                        }}
                        options={{
                            ...BASE_OPTIONS,
                            _stackedTopRadius: STACKED_TOP_RADIUS,
                            plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                            scales: makeScales({ stacked: true }),
                        } as Parameters<typeof HeatmapChart>[0]['options']}
                    />
                }
            />
        );
    },
};

// ── Shared dropdown styles (matches design spec) ─────────────────────────────
const DROPDOWN_PAPER_SX = {
    elevation: 0,
    sx: {
        background: P.paper,
        border: `1px solid ${P.sand}`,
        borderRadius: '8px',
        boxShadow: `0 4px 16px ${hexAlpha(P.ink, 0.10)}`,
        padding: '4px',
        mt: '4px',
        transition: 'none',
        '& .MuiList-root': { padding: 0 },
        '& .MuiMenuItem-root': {
            fontFamily: CHART_FONT_FAMILY,
            fontSize: '11px',
            fontWeight: 400,
            lineHeight: 1,
            color: P.earth,
            borderRadius: '5px',
            padding: '6px 8px',
            minHeight: 'unset',
            '&:hover': { backgroundColor: P.bone },
            '&.Mui-selected': {
                backgroundColor: 'transparent',
                fontWeight: 600,
                color: P.ink,
                '&:hover': { backgroundColor: P.bone },
            },
        },
    },
};

// Returns slotProps.paper with minWidth matching the trigger element width.
const dropdownProps = (anchor: HTMLButtonElement | null) => ({
    ...DROPDOWN_PAPER_SX,
    sx: { ...DROPDOWN_PAPER_SX.sx, minWidth: anchor?.offsetWidth ?? 0 },
});

export const WithFilterDropdown: StoryObj = {
    name: 'ChartCard + FilterChip — dropdown open',
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates interactive filter chips. Click **Program** or **Site** to open the dropdown menu.',
            },
        },
    },
    render: () => {
        const COMPONENTS = ['On target', 'Qual. standards', 'Session length', 'No. sessions', 'Review freq.', 'Session themes'];
        const PROGRAMS = ['Tuning into Kids', 'Circle of Security', 'Stronger Families & Communities Partnership Program'];
        const SITES = ['All sites', 'Alice Springs', 'Darwin', 'Katherine'];

        const [programAnchor, setProgramAnchor] = React.useState<HTMLButtonElement | null>(null);
        const [siteAnchor, setSiteAnchor] = React.useState<HTMLButtonElement | null>(null);
        const [selectedProgram, setSelectedProgram] = React.useState('Tuning into Kids');
        const [selectedSite, setSelectedSite] = React.useState('All sites');

        return (
            <>
                <ChartCard
                    chartName="ECEC · Implementation Breakdown"
                    icon={<BarChartIcon sx={{ ...ICON_SX, transform: 'rotate(90deg)' }} />}
                    title="Implementation breakdown by component — SP view"
                    titleTooltip={{
                        content: {
                            text: 'Each program component is rated as implemented, partial, or not to evidence. Results are aggregated across all sites for the selected period.',
                        },
                    }}
                    filters={<>
                        <FilterChip
                            label="Program"
                            value={selectedProgram}
                            open={Boolean(programAnchor)}
                            onClick={(e) => setProgramAnchor(e.currentTarget)}
                        />
                        <FilterChip
                            label="Site"
                            value={selectedSite}
                            open={Boolean(siteAnchor)}
                            onClick={(e) => setSiteAnchor(e.currentTarget)}
                        />
                    </>}
                    chart={
                        <HorizontalBarChart
                            data={{
                                labels: COMPONENTS,
                                datasets: [
                                    { label: 'On track',              data: [4, 3, 5, 2, 4, 3], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88),  borderColor: SEMANTIC.positive,  stack: 'main' },
                                    { label: 'Neutral / progressing', data: [2, 2, 1, 3, 2, 2], backgroundColor: hexAlpha(SEMANTIC.neutral, 0.88),   borderColor: SEMANTIC.neutral,   stack: 'main' },
                                    { label: 'Caution',               data: [1, 2, 1, 2, 1, 1], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),   borderColor: SEMANTIC.caution,   stack: 'main' },
                                    { label: 'Needs attention',       data: [1, 1, 1, 2, 1, 2], backgroundColor: hexAlpha(SEMANTIC.attention, 0.88), borderColor: SEMANTIC.attention, stack: 'main' },
                                ],
                            }}
                            options={{
                                ...BASE_OPTIONS,
                                indexAxis: 'y' as const,
                                _stackedTopRadius: STACKED_TOP_RADIUS,
                                plugins: { legend: makeLegend(), tooltip: makeTooltip() },
                                scales: makeHorizontalScales({ stacked: true }),
                            } as Parameters<typeof HorizontalBarChart>[0]['options']}
                        />
                    }
                />

                <Menu
                    anchorEl={programAnchor}
                    open={Boolean(programAnchor)}
                    onClose={() => setProgramAnchor(null)}
                    slotProps={{ paper: dropdownProps(programAnchor) }}
                >
                    {PROGRAMS.map((p) => (
                        <MenuItem
                            key={p}
                            selected={p === selectedProgram}
                            onClick={() => { setSelectedProgram(p); setProgramAnchor(null); }}
                        >
                            {p}
                        </MenuItem>
                    ))}
                </Menu>

                <Menu
                    anchorEl={siteAnchor}
                    open={Boolean(siteAnchor)}
                    onClose={() => setSiteAnchor(null)}
                    slotProps={{ paper: dropdownProps(siteAnchor) }}
                >
                    {SITES.map((s) => (
                        <MenuItem
                            key={s}
                            selected={s === selectedSite}
                            onClick={() => { setSelectedSite(s); setSiteAnchor(null); }}
                        >
                            {s}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    },
};

export const WithDoughnutChart: StoryObj = {
    name: 'ChartCard + DoughnutChart',
    decorators: [
        (Story) => (
            <div style={{ width: 400, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
    render: () => {
        const EPIS_COLORS = {
            exploration:        SERIES_COLORS[0],
            preparation:        SEMANTIC.neutral,
            implementation:     SEMANTIC.caution,
            fullImplementation: SEMANTIC.positive,
        } as const;
        const EPIS_DATA = [
            { label: 'Exploration',         value: 18, color: EPIS_COLORS.exploration },
            { label: 'Preparation',         value: 19, color: EPIS_COLORS.preparation },
            { label: 'Implementation',      value: 18, color: EPIS_COLORS.implementation },
            { label: 'Full implementation', value: 1,  color: EPIS_COLORS.fullImplementation },
        ];
        const total = EPIS_DATA.reduce((s, d) => s + d.value, 0);
        return (
            <ChartCard
                chartName="EPIS · Actions"
                icon={<DonutLargeIcon sx={ICON_SX} />}
                title="Actions by EPIS stage"
                titleTooltip={{
                    content: {
                        text: 'Actions are tracked using the EPIS framework (Exploration, Preparation, Implementation, Sustainment). Each action is linked to community improvement goals.',
                    },
                }}
                filters={<FilterChip label="Year" value="2025" />}
                chart={
                    <DoughnutChart
                        data={{
                            labels: EPIS_DATA.map((d) => d.label),
                            datasets: [{
                                data: EPIS_DATA.map((d) => d.value),
                                backgroundColor: EPIS_DATA.map((d) => hexAlpha(d.color, 0.88)),
                                borderColor: EPIS_DATA.map((d) => d.color),
                                borderWidth: 1,
                                hoverOffset: 6,
                            }],
                        }}
                        options={{
                            plugins: {
                                legend: makeLegend(),
                                tooltip: {
                                    ...makeTooltip(),
                                    callbacks: {
                                        label: (item: { parsed: number; label: string }) => ` ${item.parsed} action${item.parsed !== 1 ? 's' : ''} — ${item.label}`,
                                    },
                                },
                            },
                        } as any}
                        centerLabel={{ count: total, caption: 'actions' }}
                    />
                }
            />
        );
    },
};

export const LoadingState: StoryObj = {
    name: 'Loading state',
    render: () => (
        <ChartCard
            chartName="ANC · Routine Care"
            icon={<BarChartIcon sx={ICON_SX} />}
            title="Routine test completeness by care item"
            filters={<>
                <FilterChip label="Site" value="All sites" />
                <FilterChip label="Period" value="Q1 2023 – Q2 2024" />
            </>}
            chart={<BarChart isLoading />}
        />
    ),
};

export const EmptyStateNoFilters: StoryObj = {
    name: 'Empty state — no data for filters',
    render: () => (
        <ChartCard
            chartName="ANC · Routine Care"
            icon={<BarChartIcon sx={ICON_SX} />}
            title="Routine test completeness by care item"
            filters={<>
                <FilterChip label="Site" value="Gowrie Docklands Kinder" />
                <FilterChip label="Period" value="Q1 2023 – Q2 2024" />
            </>}
            chart={<EmptyChartState reason="no-filters" />}
        />
    ),
};

export const EmptyStateNotStarted: StoryObj = {
    name: 'Empty state — reporting not started',
    render: () => (
        <ChartCard
            chartName="ECEC · Weekly Attendance"
            icon={<BarChartIcon sx={ICON_SX} />}
            title="Weekly attendance amongst children by hours bracket"
            filters={<>
                <FilterChip label="Centre" value="Gowrie Oberon Kindergarten" />
                <FilterChip label="Who are" value="3, 4 & 5 year olds" />
            </>}
            chart={<EmptyChartState reason="not-started" />}
        />
    ),
};

export const EmptyStateLoadingFailed: StoryObj = {
    name: 'Empty state — data unavailable',
    render: () => (
        <ChartCard
            chartName="PP · Evidence Fidelity"
            icon={<ShowChartIcon sx={ICON_SX} />}
            title="Proportion of programs implemented to evidence"
            filters={<>
                <FilterChip label="Strategy" value="All strategies" />
            </>}
            chart={<EmptyChartState reason="loading-failed" chartType="line" />}
        />
    ),
};

export const EmptyStateNoResults: StoryObj = {
    name: 'Empty state — no matching results',
    render: () => (
        <ChartCard
            chartName="ECEC · Implementation Breakdown"
            icon={<BarChartIcon sx={ICON_SX} />}
            title="Implementation breakdown by component — SP view"
            filters={<>
                <FilterChip label="Program" value="Supported Playgroups" />
                <FilterChip label="Site" value="Gowrie Marshalltown Rd" />
            </>}
            chart={<EmptyChartState reason="no-results" />}
        />
    ),
};
