import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RadarIcon from '@mui/icons-material/Radar';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Menu, MenuItem } from '@mui/material';
import ChartCard, { FilterChip } from './ChartCard';
import BarChart from './BarChart';
import BarChartGroup from './BarChartGroup';
import LineChart from './LineChart';
import HorizontalBarChart from './HorizontalBarChart';
import RadarChart from './RadarChart';
import HeatmapChart from './HeatmapChart';
import EmptyChartState from './EmptyChartState';
import { P, STACK_COLORS, SERIES_COLORS, SEMANTIC, HEATMAP_COLORS, hexAlpha, CHART_FONT_FAMILY } from './chart-theme';
import { makeScales, makeHorizontalScales, makeRadarScales, makeLegend, makeTooltip, makeTotalLineDataset, BASE_OPTIONS } from './default-chart-options';
import { STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'RSTO/Organisms/Charts/ChartCard',
    tags: ['autodocs'],
    parameters: {
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

// Mixed palette — two cool (sage/blue) anchors + two warm (amber) tones.
// Shows the full cool-to-warm diversity of the RSTO palette in a single chart.
const MIXED_COLORS = [
    STACK_COLORS[0],    // Sage 60  — cool anchor (bottom/dominant)
    STACK_COLORS[3],    // Blue 55  — mid cool
    SERIES_COLORS[4],   // Amber 55 — mid warm
    SERIES_COLORS[3],   // Amber 75 — warm accent (top/smallest)
] as const;

const ICON_SX = { width: '14px', height: '14px', color: P.o50 };

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
                            borderWidth: 1,
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
                                backgroundColor: hexAlpha(STACK_COLORS[1], 0.88),
                                borderColor: STACK_COLORS[1],
                                borderWidth: 1,
                                stack: 'main',
                            },
                            {
                                label: 'Other ECEC places',
                                data: ECEC_OTHER,
                                backgroundColor: hexAlpha(STACK_COLORS[3], 0.88),
                                borderColor: STACK_COLORS[3],
                                borderWidth: 1,
                                stack: 'main',
                            },
                            {
                                label: 'Children without places',
                                data: ECEC_WITHOUT,
                                backgroundColor: hexAlpha(SERIES_COLORS[4], 0.88),
                                borderColor: SERIES_COLORS[4],
                                borderWidth: 1,
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
                                { label: 'Implemented to evidence', data: [4, 3, 5, 2, 4], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88), borderColor: SEMANTIC.positive, borderWidth: 1, borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                                { label: 'Partially implemented',   data: [2, 3, 1, 3, 2], backgroundColor: hexAlpha(SEMANTIC.neutral, 0.88),   borderColor: SEMANTIC.neutral,   borderWidth: 1, borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
                                { label: 'Not to evidence',         data: [1, 1, 1, 2, 1], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),   borderColor: SEMANTIC.caution,   borderWidth: 1, borderRadius: { topLeft: 4, topRight: 4 }, borderSkipped: 'bottom' as const },
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
                            { label: 'Supported programs', data: [62, 65, 68, 71, 70, 73, 76, 74, 78], borderColor: SERIES_COLORS[0], backgroundColor: hexAlpha(SERIES_COLORS[0], 0.07), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[0], pointBorderColor: 'white', pointBorderWidth: 2, pointRadius: 4, tension: 0.32, fill: true },
                            { label: 'Priority programs',  data: [45, 48, 52, 55, 58, 56, 60, 63, 65], borderColor: SERIES_COLORS[1], backgroundColor: hexAlpha(SERIES_COLORS[1], 0.07), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[1], pointBorderColor: 'white', pointBorderWidth: 2, pointRadius: 4, tension: 0.32, fill: true },
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
                                { label: 'Implemented to evidence', data: [4, 3, 5, 2, 4, 3], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88), borderColor: SEMANTIC.positive, borderWidth: 1, stack: 'main' },
                                { label: 'Partially implemented',   data: [2, 2, 1, 3, 2, 2], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),   borderColor: SEMANTIC.caution,   borderWidth: 1, stack: 'main' },
                                { label: 'Not to evidence',         data: [1, 1, 1, 2, 1, 2], backgroundColor: hexAlpha(SEMANTIC.attention, 0.88), borderColor: SEMANTIC.attention, borderWidth: 1, stack: 'main' },
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
                                { label: 'Service Provider', data: [72, 65, 80, 58, 75, 68, 70], borderColor: SERIES_COLORS[0], backgroundColor: hexAlpha(SERIES_COLORS[0], 0.15), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[0], pointBorderColor: 'white', pointBorderWidth: 2, pointRadius: 4 },
                                { label: 'Community',        data: [60, 78, 70, 72, 65, 75, 60], borderColor: SERIES_COLORS[1], backgroundColor: hexAlpha(SERIES_COLORS[1], 0.15), borderWidth: 2, pointBackgroundColor: SERIES_COLORS[1], pointBorderColor: 'white', pointBorderWidth: 2, pointRadius: 4 },
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
                                borderColor: 'white',
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
        background: '#FFFFFF',
        border: `1px solid ${P.sand}`,
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
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
                                    { label: 'On track',              data: [4, 3, 5, 2, 4, 3], backgroundColor: hexAlpha(SEMANTIC.positive, 0.88),  borderColor: SEMANTIC.positive,  borderWidth: 1, stack: 'main' },
                                    { label: 'Neutral / progressing', data: [2, 2, 1, 3, 2, 2], backgroundColor: hexAlpha(SEMANTIC.neutral, 0.88),   borderColor: SEMANTIC.neutral,   borderWidth: 1, stack: 'main' },
                                    { label: 'Caution',               data: [1, 2, 1, 2, 1, 1], backgroundColor: hexAlpha(SEMANTIC.caution, 0.88),   borderColor: SEMANTIC.caution,   borderWidth: 1, stack: 'main' },
                                    { label: 'Needs attention',       data: [1, 1, 1, 2, 1, 2], backgroundColor: hexAlpha(SEMANTIC.attention, 0.88), borderColor: SEMANTIC.attention, borderWidth: 1, stack: 'main' },
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

export const EmptyState: StoryObj = {
    name: 'Empty state',
    render: () => <EmptyChartState />,
};

export const EmptyStateCustomMessage: StoryObj = {
    name: 'Empty state — custom message',
    render: () => <EmptyChartState message="No data has been submitted for this reporting period." />,
};
