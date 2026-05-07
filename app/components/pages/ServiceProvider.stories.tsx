import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import * as React from 'react';

import InsightCard from '../molecules/InsightCard';
import RstoChip from '../molecules/RstoChip';
import HeadingWithChips from '../molecules/HeadingWithChips';
import ChartCard, { FilterChip } from '../organisms/charts/ChartCard';
import MultiLineChart, { mkMultiLineMuted, MultiLineSeries } from '../organisms/charts/MultiLineChart';
import WeeklyAttendanceChart, { mkAttendanceDatasets } from '../organisms/charts/WeeklyAttendanceChart';
import { makeScales, makeLegend, makeTooltip, makeTotalLineDataset, BASE_OPTIONS } from '../organisms/charts/default-chart-options';
import { STACKED_TOP_RADIUS } from '../organisms/charts/stacked-top-radius-plugin';
import { P } from '../organisms/charts/chart-theme';
import AppSideMenu, { RstoNavItem } from '../organisms/AppSideMenu';

// ── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS: RstoNavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlinedIcon sx={{ fontSize: 16 }} />,
        children: [
            {
                id: 'quantity',
                label: 'Quantity',
                children: [{ id: 'qn1', code: 'QN1', label: 'Are there enough ECEC places?' }],
            },
            {
                id: 'quality',
                label: 'Quality',
                children: [{ id: 'ql1', code: 'QL1', label: 'Are we delivering quality services?' }],
            },
            {
                id: 'participation',
                label: 'Participation',
                children: [{ id: 'p1', code: 'P1', label: 'Community engagement levels' }],
            },
        ],
    },
    { id: 'upload', label: 'Upload', icon: <FileUploadOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsOutlinedIcon sx={{ fontSize: 16 }} /> },
];

// ── Chart data ──────────────────────────────────────────────────────────────

const months = [
    'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
    'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26',
];

const CENTRES_LEAD: MultiLineSeries[] = [
    { name: 'Gowrie at The Harbour',                data: [55, 58, 62, 60, 57, 53, 50, 54, 58, 55, 52, 48, 38] },
    { name: 'Gowrie Broadmeadows',                  data: [40, 44, 52, 50, 55, 54, 50, 56, 60, 58, 53, 48, 45] },
    { name: 'Gowrie Carlton Learning Precinct',     data: [50, 54, 80, 74, 78, 73, 60, 83, 78, 76, 72, 68, 56] },
    { name: 'Gowrie Carlton North',                 data: [57, 60, 88, 82, 86, 80, 68, 90, 86, 83, 79, 74, 62] },
    { name: 'Gowrie Docklands Kindergarten',        data: [44, 56, 68, 66, 70, 63, 54, 68, 70, 63, 58, 53, 48] },
    { name: 'Gowrie Marshalltown Rd Kindergarten',  data: [38, 42, 48, 46, 50, 48, 44, 52, 56, 54, 50, 45, 40] },
    { name: 'Gowrie Minindee Rd Kindergarten',      data: [32, 36, 40, 42, 46, 44, 40, 48, 52, 50, 46, 42, 36] },
    { name: 'Gowrie Oberon Kindergarten',           data: [46, 50, 58, 55, 60, 58, 52, 62, 66, 63, 58, 53, 46] },
    { name: 'Gowrie- Clare Court',                  data: [25, 30, 20, 40, 45, 54, 50, 54, 57, 54, 49, 44, 40] },
];

// ── Weekly attendance chart data ─────────────────────────────────────────────
// 27 weeks: 28 Jul 2025 → 26 Jan 2026

const GOWRIE_WEEKS = [
    '28 Jul', '4 Aug',  '11 Aug', '18 Aug', '25 Aug',
    '1 Sep',  '8 Sep',  '15 Sep', '22 Sep', '29 Sep',
    '6 Oct',  '13 Oct', '20 Oct', '27 Oct',
    '3 Nov',  '10 Nov', '17 Nov', '24 Nov',
    '1 Dec',  '8 Dec',  '15 Dec', '22 Dec', '29 Dec',
    '5 Jan',  '12 Jan', '19 Jan', '26 Jan',
];

// Scale factor per week: 1.0 = full term enrolment (~870 children), drops for Christmas
const WEEK_SCALE = [
    1.00, 1.01, 1.00, 0.99, 1.00,   // Jul–Aug
    1.02, 1.01, 0.99, 1.00, 1.01,   // Sep
    1.00, 1.01, 1.00, 1.00, 0.99,   // Oct–Nov
    1.00, 1.01, 0.99,                // Nov
    0.19, 0.18, 0.16, 0.21, 0.01,   // Dec (Christmas closure)
    0.38, 0.40, 0.41, 0.70,         // Jan (gradual return)
];

// Base children per attendance band at full enrolment (bottom → top)
// 30+  25–30  15–25  13–15  10–13  8–10  6–8  4–6  <4  Did not attend
const BASE_BANDS = [200, 140, 175, 96, 78, 61, 43, 26, 17, 33];

const GOWRIE_ATTENDANCE: number[][] = BASE_BANDS.map((base) =>
    WEEK_SCALE.map((scale) => Math.round(base * scale)),
);

const GOWRIE_ENROLLED = GOWRIE_ATTENDANCE.reduce(
    (totals, series) => totals.map((t, i) => t + series[i]),
    new Array(GOWRIE_WEEKS.length).fill(0) as number[],
);

const attendanceOptions = {
    ...BASE_OPTIONS,
    _stackedTopRadius: STACKED_TOP_RADIUS,
    plugins: { legend: makeLegend(), tooltip: makeTooltip() },
    scales: makeScales({ stacked: true, rotateX: true }),
};

const attendanceChartData = {
    labels: GOWRIE_WEEKS,
    datasets: [
        ...mkAttendanceDatasets(GOWRIE_ATTENDANCE),
        makeTotalLineDataset('Total number of children', GOWRIE_ENROLLED),
    ],
};

const TARGET_LINE = {
    label: 'Target 100%',
    data: Array(13).fill(100),
    borderColor: P.stone,
    backgroundColor: 'transparent',
    borderDash: [6, 4] as number[],
    borderWidth: 1.5,
    pointRadius: 0,
    pointHoverRadius: 0,
};

const lineOptions = {
    ...BASE_OPTIONS,
    plugins: {
        legend: makeLegend(),
        tooltip: { ...makeTooltip(), mode: 'index' as const, intersect: false },
    },
    scales: makeScales({ yMin: 0, yMax: 100, yStepSize: 25, yTickCallback: (v: number | string) => `${v}%` }),
};

const leadChartData = {
    labels: months,
    datasets: [...mkMultiLineMuted(CENTRES_LEAD), TARGET_LINE],
};



// ── Stat chip ────────────────────────────────────────────────────────────────

interface StatChipProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    badge?: React.ReactNode;
}

const StatChip = ({ icon, label, value, badge }: StatChipProps) => (
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ py: '6px' }}>
        {icon}
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {value}
        </Typography>
        {badge}
    </Stack>
);

// ── Legend row ────────────────────────────────────────────────────────────────

// Removed: LegendDot — MultiLineChart renders its own Chart.js legend via makeLegend()

// ── Page ──────────────────────────────────────────────────────────────────────

const ServiceProviderPage = () => (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppSideMenu
            navItems={NAV_ITEMS}
            activeItemId="qn1"
            defaultOpenIds={['dashboard', 'quantity']}
            onLogout={() => {}}
        />

        {/* Main content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
            {/* Page header */}
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <HeadingWithChips
                    heading="Gowrie Victoria"
                    chips={['Metro Victoria', 'Early Education & Care']}
                />
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}
                    >
                        Export Report
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />}
                    >
                        Q1 2026
                    </Button>
                </Stack>
            </Stack>

            {/* Insight card */}
            <Box mb={3}>
                <InsightCard
                    insightName="ANC Participation Snapshot"
                    description={
                        <Typography variant="body2" color="text.primary">
                            Across all <b>4 EYP communities</b>, ANC participation averages <b>64%</b> — up <b>2%</b> on the prior year.{' '}
                            <b>Two communities</b> (Derby and Bidyadanga) require priority support, with participation below <b>60%</b>.{' '}
                            <b>312</b> pregnancies are tracked this quarter.
                        </Typography>
                    }
                />
                {/* Stat chips row */}
                <Box sx={{ mt: -1, px: 3, pb: 2, bgcolor: 'rstoBlue._10', borderRadius: '0 0 8px 8px', border: '2px solid', borderColor: 'rstoBlue._30', borderTop: 'none' }}>
                    <Stack direction="row" spacing={3} flexWrap="wrap" divider={<Box sx={{ width: '1px', bgcolor: 'rstoGray._60', alignSelf: 'stretch' }} />}>
                        <StatChip icon={<PublicOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />} label="Communities" value="4" badge={<RstoChip text="All reporting" size="small" color="success" />} />
                        <StatChip icon={<TrendingUpIcon sx={{ fontSize: 14, color: 'text.disabled' }} />} label="Avg ANC" value="64%" badge={<RstoChip text="+2% vs prior year" size="small" color="success" />} />
                        <StatChip icon={<LocationOnOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />} label="Pregnancies" value="312" badge={<Typography variant="caption" color="text.secondary">This quarter</Typography>} />
                        <StatChip icon={<TrendingUpIcon sx={{ fontSize: 14, color: 'text.disabled' }} />} label="Priority" value="2" badge={<Typography variant="caption" color="text.secondary">Require support</Typography>} />
                    </Stack>
                </Box>
            </Box>

            {/* Chart cards */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ChartCard
                        chartName="Chart One"
                        title="Percentage on track to attend 600+ hours"
                        titleTooltip={{ content: { text: 'Projected percentage of children on track to meet the 600+ hour attendance target before school entry.' }, variant: 'default' }}
                        filters={
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                <FilterChip label="Cohort" value="All children" />
                                <FilterChip label="Site" value="All centres" />
                                <FilterChip label="Stage" value="2 years before school" />
                            </Stack>
                        }
                        chart={<MultiLineChart aspectRatio={{ width: 16, height: 9 }} data={leadChartData} options={lineOptions} />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ChartCard
                        chartName="Chart Two"
                        title="Weekly attendance"
                        titleTooltip={{ content: { text: 'Weekly distribution of children by attendance hours band across all selected centres and cohorts.' }, variant: 'default' }}
                        filters={
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                <FilterChip label="Children" value="All children" />
                                <FilterChip label="Centre" value="All centres" />
                                <FilterChip label="Who are" value="3, 4 & 5 year olds" />
                            </Stack>
                        }
                        chart={<WeeklyAttendanceChart data={attendanceChartData} options={attendanceOptions} />}
                    />
                </Grid>
            </Grid>
        </Box>
    </Box>
);

// ── Story ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'RSTO/Pages/Service Provider',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        nextjs: { navigation: { pathname: '/service-provider' } },
    },
};

export default meta;
type Story = StoryObj;

export const GowrieVictoria: Story = {
    name: 'Gowrie Victoria — ECEC Dashboard',
    render: () => <ServiceProviderPage />,
};
