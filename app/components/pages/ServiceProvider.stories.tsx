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
import ChartCard from '../organisms/charts/ChartCard';
import LineChart from '../organisms/charts/LineChart';
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

const months = ['Jan 23', 'Feb 23', 'Mar 23', 'Apr 23', 'May 23', 'Jun 23', 'Jul 23', 'Aug 23', 'Sep 23', 'Oct 23', 'Nov 23', 'Dec 23', 'Jan 24'];

const COMMUNITY_COLOURS = {
    carlton: '#F28B2D',
    docklands: '#F6AE6C',
    harbour: '#191919',
    broadmeadows: '#4CAAC1',
    clareCourt: '#0B651E',
};

const leadChartData = {
    labels: months,
    datasets: [
        { label: 'Gowrie Carlton Learning Precinct', data: [50, 55, 82, 75, 80, 75, 62, 85, 80, 78, 75, 72, 60], borderColor: COMMUNITY_COLOURS.carlton, backgroundColor: 'transparent' },
        { label: 'Gowrie Docklands Kindegarten', data: [45, 58, 70, 68, 72, 65, 55, 70, 72, 65, 60, 55, 50], borderColor: COMMUNITY_COLOURS.docklands, backgroundColor: 'transparent' },
        { label: 'Gowrie at The Harbour', data: [55, 60, 65, 58, 55, 50, 45, 50, 55, 50, 45, 40, 38], borderColor: COMMUNITY_COLOURS.harbour, backgroundColor: 'transparent' },
        { label: 'Gowrie Broadmeadows', data: [40, 45, 55, 50, 58, 55, 50, 58, 62, 60, 55, 50, 48], borderColor: COMMUNITY_COLOURS.broadmeadows, backgroundColor: 'transparent' },
        { label: 'Gowrie Clare Court', data: [25, 30, 20, 40, 45, 55, 50, 55, 58, 55, 50, 45, 42], borderColor: COMMUNITY_COLOURS.clareCourt, backgroundColor: 'transparent' },
        { label: 'Target 100%', data: Array(13).fill(100), borderColor: '#F28B2D', backgroundColor: 'transparent', borderDash: [6, 4] },
    ],
};

const lagChartData = {
    labels: months,
    datasets: [
        { label: 'Gowrie Carlton Learning Precinct', data: [48, 52, 78, 72, 75, 70, 58, 80, 75, 72, 68, 65, 55], borderColor: COMMUNITY_COLOURS.carlton, backgroundColor: 'transparent' },
        { label: 'Gowrie Docklands Kindegarten', data: [42, 55, 65, 62, 68, 60, 50, 65, 68, 60, 55, 50, 45], borderColor: COMMUNITY_COLOURS.docklands, backgroundColor: 'transparent' },
        { label: 'Gowrie at The Harbour', data: [52, 56, 60, 54, 50, 45, 40, 45, 50, 45, 40, 35, 32], borderColor: COMMUNITY_COLOURS.harbour, backgroundColor: 'transparent' },
        { label: 'Gowrie Broadmeadows', data: [38, 42, 50, 45, 54, 50, 45, 54, 58, 55, 50, 45, 42], borderColor: COMMUNITY_COLOURS.broadmeadows, backgroundColor: 'transparent' },
        { label: 'Gowrie Clare Court', data: [22, 28, 15, 35, 40, 50, 45, 50, 52, 50, 45, 40, 38], borderColor: COMMUNITY_COLOURS.clareCourt, backgroundColor: 'transparent' },
        { label: 'Target 100%', data: Array(13).fill(100), borderColor: '#F28B2D', backgroundColor: 'transparent', borderDash: [6, 4] },
    ],
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

const LegendDot = ({ color, label }: { color: string; label: string }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
        <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Stack>
);

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
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                    <Typography variant="h1">
                        GOWRIE VICTORIA
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                        <LocationOnOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            Metro Victoria · Early education and care
                        </Typography>
                    </Stack>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />}
                        sx={{ borderColor: 'rstoGray._60', color: 'text.primary', textTransform: 'none', borderRadius: '8px', fontWeight: 400 }}
                    >
                        Export Report
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />}
                        sx={{ borderColor: 'rstoGray._60', color: 'text.primary', textTransform: 'none', borderRadius: '8px', fontWeight: 400 }}
                    >
                        Q1 2026 ▾
                    </Button>
                </Stack>
            </Stack>

            {/* Insight card */}
            <Box mt={3} mb={3}>
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
                <Grid item xs={12} md={6}>
                    <ChartCard
                        chartName="Chart One - Lead Indicator Projected On Track"
                        title={
                            <Stack>
                                <Typography variant="body2">Percentage on track to attend 600+ hours amongst</Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap">
                                    <Typography variant="body2" fontWeight={600}>active children ▾</Typography>
                                    <Typography variant="body2">at</Typography>
                                    <Typography variant="body2" fontWeight={600}>Broadmeadows ▾</Typography>
                                    <Typography variant="body2" fontWeight={600}>2 years before school ▾</Typography>
                                </Stack>
                            </Stack>
                        }
                        titleTooltip={{ content: { text: 'Projected percentage of children on track to meet the 600+ hour attendance target before school entry.' }, variant: 'default' }}
                        subTitle="Jan 2025 - Jan 2026"
                        chart={<LineChart aspectRatio={{ width: 16, height: 9 }} chartData={leadChartData} />}
                        footer={
                            <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
                                <LegendDot color={COMMUNITY_COLOURS.carlton} label="Gowrie Carlton Learning Precinct" />
                                <LegendDot color={COMMUNITY_COLOURS.docklands} label="Gowrie Docklands Kindegarten" />
                                <LegendDot color={COMMUNITY_COLOURS.harbour} label="Gowrie at The Harbour" />
                                <LegendDot color={COMMUNITY_COLOURS.broadmeadows} label="Gowrie Broadmeadows" />
                                <LegendDot color={COMMUNITY_COLOURS.clareCourt} label="Gowrie Clare Court" />
                            </Stack>
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ChartCard
                        chartName="Chart Two - Lag Indicator Historical Achieved"
                        title={
                            <Stack>
                                <Typography variant="body2">Percentage of children who actually received 600+ hours amongst</Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap">
                                    <Typography variant="body2" fontWeight={600}>active children ▾</Typography>
                                    <Typography variant="body2">at</Typography>
                                    <Typography variant="body2" fontWeight={600}>Broadmeadows ▾</Typography>
                                    <Typography variant="body2" fontWeight={600}>2 years before school ▾</Typography>
                                </Stack>
                            </Stack>
                        }
                        titleTooltip={{ content: { text: 'Historical percentage of children who actually achieved the 600+ hour attendance target.' }, variant: 'default' }}
                        subTitle="Jan 2025 - Jan 2026"
                        chart={<LineChart aspectRatio={{ width: 16, height: 9 }} chartData={lagChartData} />}
                        footer={
                            <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
                                <LegendDot color={COMMUNITY_COLOURS.carlton} label="Gowrie Carlton Learning Precinct" />
                                <LegendDot color={COMMUNITY_COLOURS.docklands} label="Gowrie Docklands Kindegarten" />
                                <LegendDot color={COMMUNITY_COLOURS.harbour} label="Gowrie at The Harbour" />
                                <LegendDot color={COMMUNITY_COLOURS.broadmeadows} label="Gowrie Broadmeadows" />
                                <LegendDot color={COMMUNITY_COLOURS.clareCourt} label="Gowrie Clare Court" />
                            </Stack>
                        }
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
