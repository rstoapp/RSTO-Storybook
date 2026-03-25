'use client';
import * as React from 'react';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import ChartCard from './charts/ChartCard';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import InsightCard from '../molecules/InsightCard';
import InfoCard from '../molecules/InfoCard';
import Accordion from '../molecules/Accordion';
import Selector, { SelectorOption } from '../molecules/Selector';
import DataProcessingAlert from '../molecules/DataProcessingAlert';
import HeadingWithChips from '../molecules/HeadingWithChips';

import type {
    ParticipationTierData,
    SituationalAnalysisData,
    DashboardState,
} from '../../lib/pp-service-types';

// ── Chart colours (matching existing palette conventions) ────────────────────

const TIER_COLOURS = {
    full: '#4D8613',       // success.main — 100% completion
    threshold: '#F28B2D',  // primary/warning — threshold completion
    below: '#E23636',      // error — below threshold
};

const TREND_COLOURS = {
    region: '#474747',     // dark gray (consistent with ServiceProvider trend)
    comparison: '#A3A3A3', // muted gray dashed
};

// ── Chart aspect ratios ──────────────────────────────────────────────────────

const CHART_ASPECT_RATIO = { width: 16, height: 9 };
const TREND_ASPECT_RATIO = { width: 16, height: 7 };

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildTierChartData(data: ParticipationTierData) {
    return {
        labels: data.trend.map((t) => t.period),
        datasets: [
            {
                label: data.tiers[0].label,
                data: data.trend.map((t) => t.tiers[0]),
                backgroundColor: TIER_COLOURS.full,
            },
            {
                label: data.tiers[1].label,
                data: data.trend.map((t) => t.tiers[1]),
                backgroundColor: TIER_COLOURS.threshold,
            },
            {
                label: data.tiers[2].label,
                data: data.trend.map((t) => t.tiers[2]),
                backgroundColor: TIER_COLOURS.below,
            },
        ],
    };
}

function buildPopulationTrendData(sa: SituationalAnalysisData) {
    return {
        labels: sa.population0to8.trend.map((t) => t.period),
        datasets: [
            {
                label: '0–8 year-old population',
                data: sa.population0to8.trend.map((t) => t.value),
                borderColor: TREND_COLOURS.region,
                backgroundColor: 'transparent',
            },
        ],
    };
}

function buildAedcTrendData(sa: SituationalAnalysisData) {
    return {
        labels: sa.aedcDV1.trend.map((t) => t.period),
        datasets: [
            {
                label: 'AEDC DV1 (%)',
                data: sa.aedcDV1.trend.map((t) => t.value),
                borderColor: TIER_COLOURS.below,
                backgroundColor: 'transparent',
                borderDash: [6, 4],
            },
        ],
    };
}

// ── Sub-components ───────────────────────────────────────────────────────────

interface TierSummaryCardProps {
    label: string;
    count: number;
    percentage: number;
    colour: string;
    icon: React.ReactNode;
}

/** A single tier summary — count + percentage in a coloured left-border card. */
const TierSummaryCard = ({ label, count, percentage, colour, icon }: TierSummaryCardProps) => (
    <Card
        variant="outlined"
        sx={{
            borderLeft: `4px solid ${colour}`,
            borderRadius: '8px',
            height: '100%',
        }}
    >
        <CardContent sx={{ padding: '16px', '&:last-child': { paddingBottom: '16px' } }}>
            <Stack spacing={0.5}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    {icon}
                    <Typography
                        variant="caption"
                        sx={{
                            color: colour,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: 10,
                        }}
                    >
                        {label}
                    </Typography>
                </Stack>
                <Typography variant="h4" fontWeight={700}>
                    {count}
                </Typography>
                <Typography variant="body2" color="rstoGray._90">
                    {percentage.toFixed(1)}% of enrolled families
                </Typography>
            </Stack>
        </CardContent>
    </Card>
);

interface SAStatCardProps {
    label: string;
    value: string | number;
    subtitle: string;
    changeLabel: string;
    isPositive: boolean;
    icon: React.ReactNode;
}

/** Situational analysis stat card with trend indicator. */
const SAStatCard = ({ label, value, subtitle, changeLabel, isPositive, icon }: SAStatCardProps) => (
    <InfoCard sx={{ width: '100%', height: '100%', borderRadius: '8px' }}>
        <CardContent sx={{ padding: '24px' }}>
            <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    {icon}
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rstoBlue._60',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: 10,
                        }}
                    >
                        {label}
                    </Typography>
                </Stack>
                <Typography variant="h4" fontWeight={700}>
                    {value}
                </Typography>
                <Typography variant="body2" color="rstoGray._90">
                    {subtitle}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    {isPositive ? (
                        <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                    ) : (
                        <TrendingDownIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                    )}
                    <Typography variant="caption" color="text.secondary">
                        {changeLabel}
                    </Typography>
                </Stack>
            </Stack>
        </CardContent>
    </InfoCard>
);

// ── Loading state ────────────────────────────────────────────────────────────

const LoadingState = () => (
    <Stack spacing={3}>
        <Skeleton variant="rectangular" height={40} width={300} />
        <Grid container spacing={3}>
            {[0, 1, 2].map((i) => (
                <Grid item xs={12} md={4} key={i}>
                    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: '8px' }} />
                </Grid>
            ))}
        </Grid>
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '8px' }} />
        <Grid container spacing={3}>
            {[0, 1].map((i) => (
                <Grid item xs={12} md={6} key={i}>
                    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '8px' }} />
                </Grid>
            ))}
        </Grid>
    </Stack>
);

// ── Empty state ──────────────────────────────────────────────────────────────

const EmptyState = () => (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 400 }}>
        <DataProcessingAlert
            icon={
                <WarningAmberRoundedIcon
                    sx={{ width: '48px', height: '48px', color: 'rstoOrange._50' }}
                />
            }
            title="No data available"
            description={'No participation data has been submitted\nfor this reporting period yet.'}
        />
    </Stack>
);

// ── Error state ──────────────────────────────────────────────────────────────

const ErrorState = ({ message }: { message: string }) => (
    <Alert severity="error" sx={{ m: 2 }}>
        <Typography variant="body2" fontWeight={700}>
            Dashboard could not be loaded
        </Typography>
        <Typography variant="body2">{message}</Typography>
    </Alert>
);

// ── Main component ───────────────────────────────────────────────────────────

export interface PPServiceDashboardProps {
    /** Current dashboard state. */
    state: DashboardState;
    /** Error message (only used when state is 'error'). */
    errorMessage?: string;
    /** 3-tier participation data for the selected population filter. */
    participationData?: ParticipationTierData;
    /** Situational analysis data. */
    saData?: SituationalAnalysisData;
    /** Priority population filter options. */
    populationOptions: SelectorOption[];
    /** Currently selected priority population filter value. */
    selectedPopulation: string;
    /** Callback when the user changes the priority population filter. */
    onPopulationChange: (value: string) => void;
}

/**
 * D1: PP Service Dashboard — Nunga, Derby.
 *
 * Displays a 3-tier parenting program participation breakdown with priority
 * population filtering and a situational analysis panel showing population
 * context and developmental vulnerability data.
 *
 * Reuses existing ChartCard, BarChart, LineChart, InsightCard, InfoCard,
 * Selector, Accordion, and other RSTO molecules and organisms.
 */
const PPServiceDashboard = ({
    state,
    errorMessage,
    participationData,
    saData,
    populationOptions,
    selectedPopulation,
    onPopulationChange,
}: PPServiceDashboardProps) => {
    // ── State dispatch ───────────────────────────────────────────────────────
    if (state === 'loading') return <LoadingState />;
    if (state === 'empty') return <EmptyState />;
    if (state === 'error') return <ErrorState message={errorMessage ?? 'An unexpected error occurred.'} />;

    if (!participationData || !saData) return <EmptyState />;

    // ── Derived data ─────────────────────────────────────────────────────────
    const tierChartData = buildTierChartData(participationData);
    const populationTrendData = buildPopulationTrendData(saData);
    const aedcTrendData = buildAedcTrendData(saData);

    const completionRate = participationData.tiers[0].percentage + participationData.tiers[1].percentage;

    return (
        <Stack spacing={3}>
            {/* ── Section: Participation Breakdown ─────────────────────────── */}
            <HeadingWithChips
                heading="Are families completing the program?"
                chips={['P1', 'Participation Indicator 01']}
            />

            {/* Priority population filter — inline selector, under 3 clicks */}
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                <Typography variant="body2" color="text.secondary">
                    Showing data for
                </Typography>
                <Selector
                    options={populationOptions}
                    value={selectedPopulation}
                    onChange={onPopulationChange}
                />
                <Typography variant="body2" color="text.secondary">
                    within {participationData.programName} ({participationData.location})
                </Typography>
            </Stack>

            {/* Success alert (matching existing pattern from screenshots) */}
            <Alert
                severity="success"
                sx={{ borderRadius: '8px' }}
                action={
                    <Typography
                        variant="caption"
                        sx={{ cursor: 'pointer', color: 'text.secondary', pr: 1 }}
                        aria-label="Dismiss alert"
                    >
                        ✕
                    </Typography>
                }
            >
                <Typography variant="body2" fontWeight={600}>
                    All files have been successfully processed for this reporting period.
                </Typography>
                <Typography variant="body2">
                    You will have until the end of the month to overwrite any files for this reporting period if required.
                </Typography>
            </Alert>

            {/* 3-tier summary cards */}
            <Grid container spacing={3} role="list" aria-label="Participation tier summary">
                <Grid item xs={12} md={4} role="listitem">
                    <TierSummaryCard
                        label="100% completion"
                        count={participationData.tiers[0].count}
                        percentage={participationData.tiers[0].percentage}
                        colour={TIER_COLOURS.full}
                        icon={
                            <CheckCircleOutlineRoundedIcon
                                sx={{ fontSize: 14, color: TIER_COLOURS.full }}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4} role="listitem">
                    <TierSummaryCard
                        label="Threshold completion"
                        count={participationData.tiers[1].count}
                        percentage={participationData.tiers[1].percentage}
                        colour={TIER_COLOURS.threshold}
                        icon={
                            <WarningAmberRoundedIcon
                                sx={{ fontSize: 14, color: TIER_COLOURS.threshold }}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4} role="listitem">
                    <TierSummaryCard
                        label="Below threshold"
                        count={participationData.tiers[2].count}
                        percentage={participationData.tiers[2].percentage}
                        colour={TIER_COLOURS.below}
                        icon={
                            <ErrorOutlineRoundedIcon
                                sx={{ fontSize: 14, color: TIER_COLOURS.below }}
                            />
                        }
                    />
                </Grid>
            </Grid>

            {/* Insight card — completion snapshot */}
            <InsightCard
                insightName="Participation Snapshot"
                title={
                    <>
                        <strong>{completionRate.toFixed(1)}%</strong> of enrolled families met at
                        least the minimum attendance threshold across{' '}
                        <strong>{participationData.totalFamilies}</strong> families in{' '}
                        {participationData.reportingPeriod}.
                    </>
                }
                description={`${participationData.tiers[0].count} families achieved 100% session completion, while ${participationData.tiers[2].count} families (${participationData.tiers[2].percentage.toFixed(1)}%) fell below the required threshold.`}
            />

            {/* 3-tier stacked bar chart */}
            <ChartCard
                chartName="Chart One"
                title={
                    <Typography variant="h5" fontWeight={700}>
                        Participation tier breakdown by quarter
                    </Typography>
                }
                subTitle={`${participationData.trend[0]?.period} – ${participationData.trend[participationData.trend.length - 1]?.period}`}
                chart={
                    <BarChart
                        aspectRatio={CHART_ASPECT_RATIO}
                        chartData={tierChartData}
                        optionsOverrides={{
                            scales: {
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Number of families',
                                        font: { weight: 'bold' },
                                    },
                                },
                            },
                        }}
                    />
                }
            />

            {/* ── Section: Situational Analysis ───────────────────────────── */}
            <Box sx={{ pt: 2 }}>
                <HeadingWithChips
                    heading="Situational Analysis"
                    chips={['SA', 'Population Context']}
                />
            </Box>

            {/* SA stat cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <SAStatCard
                        label="0–8 Year-Old Population"
                        value={saData.population0to8.count.toLocaleString()}
                        subtitle="children aged 0–8 in the service area"
                        changeLabel={saData.population0to8.changeLabel}
                        isPositive={saData.population0to8.changeLabel.startsWith('+')}
                        icon={
                            <ChildCareRoundedIcon
                                sx={{ fontSize: 14, color: 'rstoBlue._60' }}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SAStatCard
                        label="Developmental Vulnerability (AEDC DV1)"
                        value={`${saData.aedcDV1.percentage.toFixed(1)}%`}
                        subtitle={`${saData.aedcDV1.count.toLocaleString()} children developmentally vulnerable on one or more domains`}
                        changeLabel={saData.aedcDV1.changeLabel}
                        isPositive={saData.aedcDV1.changeLabel.startsWith('-')}
                        icon={
                            <GroupsRoundedIcon
                                sx={{ fontSize: 14, color: 'rstoBlue._60' }}
                            />
                        }
                    />
                </Grid>
            </Grid>

            {/* SA trend charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <ChartCard
                        chartName="Population Trend"
                        title={
                            <Typography variant="h6" fontWeight={700}>
                                0–8 year-old population over time
                            </Typography>
                        }
                        chart={
                            <LineChart
                                aspectRatio={TREND_ASPECT_RATIO}
                                chartData={populationTrendData}
                                optionsOverrides={{
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (context) =>
                                                    `${context.dataset.label}: ${Number(context.parsed.y).toLocaleString()}`,
                                            },
                                        },
                                    },
                                    scales: {
                                        y: {
                                            min: undefined,
                                            max: undefined,
                                            beginAtZero: false,
                                            ticks: {
                                                stepSize: undefined,
                                                callback: (value) => Number(value).toLocaleString(),
                                            },
                                            title: {
                                                display: true,
                                                text: 'Population',
                                                font: { weight: 'bold' },
                                            },
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ChartCard
                        chartName="AEDC DV1 Trend"
                        title={
                            <Typography variant="h6" fontWeight={700}>
                                Developmental vulnerability (DV1) over time
                            </Typography>
                        }
                        chart={
                            <LineChart
                                aspectRatio={TREND_ASPECT_RATIO}
                                chartData={aedcTrendData}
                                optionsOverrides={{
                                    scales: {
                                        y: {
                                            min: 0,
                                            max: 50,
                                            beginAtZero: false,
                                            ticks: {
                                                stepSize: 10,
                                            },
                                            title: {
                                                display: true,
                                                text: 'DV1 (%)',
                                                font: { weight: 'bold' },
                                            },
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </Grid>
            </Grid>

            {/* Indicator context accordion (matching existing pattern) */}
            <Accordion title="Indicator context" defaultExpanded={false}>
                <Stack spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>100% completion</strong> means the family attended every scheduled
                        session in the program for the reporting period.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Threshold completion</strong> means the family attended at least
                        the minimum number of sessions required by the program model to be
                        considered a meaningful dose.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Below threshold</strong> means the family did not attend enough
                        sessions to meet the program&apos;s minimum attendance requirement.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>AEDC DV1</strong> — Australian Early Development Census,
                        Developmentally Vulnerable on One or More Domain(s). This measures the
                        percentage of children who are developmentally vulnerable in at least one
                        of the five AEDC domains.
                    </Typography>
                </Stack>
            </Accordion>
        </Stack>
    );
};

export default PPServiceDashboard;
