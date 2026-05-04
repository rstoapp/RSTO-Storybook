'use client';
import * as React from 'react';
import { Alert, CardContent, Grid, Stack, Typography } from '@mui/material';

import {
    DashboardManifest,
    DashboardWidget,
    ChartWidget,
    HeadingWidget,
    InfoWidget,
    InsightWidget,
    StatRowWidget,
    WarningWidget,
} from '../../lib/dashboard-manifest';

import HeadingWithChips from '../molecules/HeadingWithChips';
import InsightCard from '../molecules/InsightCard';
import InfoCard from '../molecules/InfoCard';
import WarningCard from '../molecules/WarningCard';
import StatPill from '../molecules/StatPill';
import ChartCard from './charts/ChartCard';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import HorizontalBarChart from './charts/HorizontalBarChart';

// ── Aspect ratio used for all charts in dynamic dashboards ───────────────────
const CHART_ASPECT_RATIO = { width: 16, height: 9 };

// ── Individual widget renderers ───────────────────────────────────────────────

function renderHeading({ text, chips = [] }: HeadingWidget): React.ReactNode {
    return <HeadingWithChips heading={text} chips={chips} />;
}

function renderStatRow({ stats }: StatRowWidget): React.ReactNode {
    return (
        <Stack direction="row" flexWrap="wrap" gap={3} paddingY={1}>
            {stats.map((stat, i) => (
                <StatPill key={i} label={stat.label} value={stat.value} />
            ))}
        </Stack>
    );
}

function renderInsight({ insightName = 'Insight', title, description }: InsightWidget): React.ReactNode {
    return (
        <InsightCard
            insightName={insightName}
            title={title}
            description={description}
        />
    );
}

function renderInfo({ heading, body }: InfoWidget): React.ReactNode {
    return (
        <InfoCard sx={{ width: '100%' }}>
            <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                    {heading}
                </Typography>
                <Typography variant="body1" color="rstoGray._90">
                    {body}
                </Typography>
            </CardContent>
        </InfoCard>
    );
}

function renderWarning({ heading, body }: WarningWidget): React.ReactNode {
    return (
        <WarningCard sx={{ width: '100%' }}>
            <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                    {heading}
                </Typography>
                <Typography variant="body1" color="rstoGray._90">
                    {body}
                </Typography>
            </CardContent>
        </WarningCard>
    );
}

function renderChart({ chartType, chartName, title, subtitle, data }: ChartWidget): React.ReactNode {
    const chart = (() => {
        switch (chartType) {
            case 'bar':
                return <BarChart aspectRatio={CHART_ASPECT_RATIO} chartData={data} />;
            case 'line':
                return <LineChart aspectRatio={CHART_ASPECT_RATIO} chartData={data} />;
            case 'horizontal-bar':
                return <HorizontalBarChart aspectRatio={CHART_ASPECT_RATIO} chartData={data} />;
        }
    })();

    return (
        <ChartCard
            chartName={chartName}
            title={title}
            subTitle={subtitle}
            chart={chart}
        />
    );
}

// ── Widget dispatcher ─────────────────────────────────────────────────────────

function renderWidget(widget: DashboardWidget): React.ReactNode {
    switch (widget.type) {
        case 'heading':        return renderHeading(widget);
        case 'stat-row':       return renderStatRow(widget);
        case 'insight':        return renderInsight(widget);
        case 'info':           return renderInfo(widget);
        case 'warning':        return renderWarning(widget);
        case 'chart':          return renderChart(widget);
    }
}

// ── DynamicDashboard ──────────────────────────────────────────────────────────

export interface DynamicDashboardProps {
    /** The manifest produced by the AI, describing what to render. */
    manifest: DashboardManifest;
    /**
     * If provided, shown as a validation/render error instead of the dashboard.
     * Useful for surfacing AI output that failed `validateManifest`.
     */
    error?: string;
}

/**
 * Renders an AI-generated `DashboardManifest` into RSTO components.
 *
 * Each `manifest.rows` entry becomes an MUI Grid container row. Each widget
 * inside a row uses its `span` (1–12 grid columns) to control width — this is
 * what lets the AI control whether widgets sit side-by-side or stack full-width.
 *
 * Usage with AI:
 * 1. User asks a question.
 * 2. AI returns a `DashboardManifest` JSON.
 * 3. Call `validateManifest(raw)` to catch malformed output early.
 * 4. Pass the validated manifest to `<DynamicDashboard manifest={...} />`.
 *
 * @example
 * ```tsx
 * const manifest = validateManifest(aiResponse);
 * return <DynamicDashboard manifest={manifest} />;
 * ```
 */
const DynamicDashboard = ({ manifest, error }: DynamicDashboardProps) => {
    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                <Typography variant="body2" fontWeight={700}>Dashboard could not be rendered</Typography>
                <Typography variant="body2">{error}</Typography>
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {manifest.title && (
                <Stack spacing={0.5}>
                    <Typography variant="h4" fontWeight={700}>
                        {manifest.title}
                    </Typography>
                    {manifest.description && (
                        <Typography variant="body2" color="text.secondary">
                            {manifest.description}
                        </Typography>
                    )}
                </Stack>
            )}

            {manifest.rows.map((row, rowIndex) => (
                <Grid container spacing={3} key={rowIndex} alignItems="stretch">
                    {row.widgets.map((widget, widgetIndex) => (
                        <Grid
                            item
                            key={widgetIndex}
                            xs={12}
                            md={widget.span ?? 12}
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            {renderWidget(widget)}
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Stack>
    );
};

export default DynamicDashboard;
