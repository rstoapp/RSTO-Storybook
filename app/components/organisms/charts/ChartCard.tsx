import BarChartIcon from '@mui/icons-material/BarChart';
import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import RstoTooltip, { RstoTooltipProps } from '../../molecules/RstoTooltip';
import { P, CHART_FONT_FAMILY } from './chart-theme';

interface ChartCardProps {
    chartName?: string;
    /** Override the eyebrow icon. Defaults to BarChartIcon. Pass with sx={{ width: '14px', height: '14px' }}. */
    icon?: React.ReactNode;
    /** Card title. Pass a plain string — ChartCard owns the Typography style. ReactNode accepted for complex titles. */
    title: React.ReactNode;
    titleTooltip?: RstoTooltipProps;
    subTitle?: string;
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
    subTitle,
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
                        sx={{ mb: '4px' }}
                    >
                        <Stack direction="row" alignItems="center" gap="4px">
                            {icon ?? (
                                <BarChartIcon sx={{ color: P.o50, width: '14px', height: '14px' }} />
                            )}
                            <Typography
                                variant="overline"
                                sx={{
                                    color: P.o50,
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
                    {typeof title === 'string' ? (
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
                    ) : (
                        title
                    )}

                    {/* Subtitle */}
                    {subTitle && (
                        <Typography
                            sx={{
                                fontFamily: CHART_FONT_FAMILY,
                                fontSize: '11px',
                                color: P.shadow,
                                display: 'block',
                                mt: '4px',
                                lineHeight: 1.4,
                            }}
                        >
                            {subTitle}
                        </Typography>
                    )}

                    {/* Filter row — ghost buttons, optically aligned with title */}
                    {filters && (
                        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', mt: '8px', ml: '-8px' }}>
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

// ── FilterChip ────────────────────────────────────────────────────────────────
// Ghost-button filter pill — no border, no fill. Hover reveals a warm cream bg.
// Optically aligns with the card title via the container's ml: -6px.

interface FilterChipProps {
    label: string;
    value: string;
    open?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FilterChip = ({ label, value, open = false, onClick }: FilterChipProps) => (
    <ButtonBase
        type="button"
        onClick={onClick}
        disableRipple
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            px: '8px',
            py: '6px',
            borderRadius: '6px',
            background: open ? P.bone : 'transparent',
            cursor: onClick ? 'pointer' : 'default',
            fontFamily: CHART_FONT_FAMILY,
            fontSize: '11px',
            color: open ? P.ink : P.earth,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            transition: 'background 0.12s, color 0.12s',
            '&:hover': {
                background: P.bone,
                color: P.ink,
            },
        }}
    >
        <Box component="span" sx={{ color: open ? P.shadow : P.shadow, fontWeight: 400 }}>{label}:</Box>
        <Box component="span" sx={{ color: P.earth, fontWeight: 600 }}>&nbsp;{value}</Box>
        <Box component="span" sx={{ color: P.stone, fontSize: '10px', lineHeight: 1 }}>&nbsp;▾</Box>
    </ButtonBase>
);
