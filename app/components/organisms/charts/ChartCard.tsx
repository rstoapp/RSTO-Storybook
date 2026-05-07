import BarChartIcon from '@mui/icons-material/BarChart';
import { Card, CardContent, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import RstoTooltip, { RstoTooltipProps } from '../../molecules/RstoTooltip';
export { default as FilterChip } from '../../molecules/FilterChip';
export type { FilterChipProps } from '../../molecules/FilterChip';
import { P, CHART_FONT_FAMILY } from './chart-theme';

interface ChartCardProps {
    chartName?: string;
    /** Override the eyebrow icon. Defaults to BarChartIcon. Pass with sx={{ width: '14px', height: '14px' }}. */
    icon?: React.ReactNode;
    /** Card title. Pass a plain string — ChartCard owns the Typography style. ReactNode accepted for complex titles. */
    title: React.ReactNode;
    titleTooltip?: RstoTooltipProps;
    /** Optional filter controls rendered below the title. Use FilterChip for the standard ghost-button chip. */
    filters?: React.ReactNode;
    chart: React.ReactNode;
    footer?: React.ReactNode;
}

const ChartCard = ({
    chartName = 'Chart One',
    icon,
    title,
    titleTooltip,
    filters,
    chart,
    footer,
}: ChartCardProps) => {
    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: '12px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: P.sand,
            }}
        >
            <CardContent
                sx={{
                    padding: '24px 24px 16px',
                    '&:last-child': { paddingBottom: '16px' },
                }}
            >
                {/* ── Header block ─────────────────────────────────────────── */}
                <Stack sx={{ pb: '12px' }} spacing={0}>

                    {/* Eyebrow row: icon + label | ⓘ */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: '4px', minHeight: '24px' }}
                    >
                        <Stack direction="row" alignItems="center" gap="4px">
                            {icon ?? (
                                <BarChartIcon sx={{ color: P.eyebrow, width: '14px', height: '14px' }} />
                            )}
                            <Typography
                                variant="overline"
                                sx={{
                                    color: P.eyebrow,
                                    fontFamily: CHART_FONT_FAMILY,
                                    fontWeight: 600,
                                    fontSize: '11px',
                                    lineHeight: 1,
                                    letterSpacing: '0.03em',
                                    textTransform: 'none',
                                }}
                            >
                                {chartName}
                            </Typography>
                        </Stack>

                        {titleTooltip && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: '-4px' }}>
                                <RstoTooltip placement="left-start" {...titleTooltip} />
                            </Box>
                        )}
                    </Stack>

                    {/* Title */}
                    <Typography
                        sx={{
                            fontFamily: CHART_FONT_FAMILY,
                            fontSize: '14px',
                            fontWeight: 600,
                            color: P.bark,
                            lineHeight: 1.4,
                        }}
                    >
                        {title}
                    </Typography>

                    {/* Filter row — ghost buttons, optically aligned with title */}
                    {filters && (
                        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', mt: '2px', ml: '-8px' }}>
                            {filters}
                        </Box>
                    )}
                </Stack>

                {/* ── Chart canvas ─────────────────────────────────────────── */}
                {chart}

                {/* ── Footer ───────────────────────────────────────────────── */}
                {footer}
            </CardContent>
        </Card>
    );
};

export default ChartCard;
