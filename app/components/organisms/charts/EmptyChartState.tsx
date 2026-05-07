import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { P, CHART_FONT_FAMILY } from './chart-theme';

// ── Ghost chart illustrations ──────────────────────────────────────────────

function GhostBars() {
    const bars = [
        { x: 8,   heights: [28, 22, 18] },
        { x: 34,  heights: [36, 28, 14] },
        { x: 60,  heights: [20, 16, 10] },
        { x: 86,  heights: [40, 30, 18] },
        { x: 112, heights: [30, 24, 12] },
        { x: 138, heights: [44, 32, 20] },
    ];
    const barW = 20;
    const baseY = 90;
    return (
        <svg width="166" height="96" viewBox="0 0 166 96" fill="none" aria-hidden="true">
            {[30, 55, 80].map((y) => (
                <line key={y} x1="0" y1={y} x2="166" y2={y} stroke={P.sand} strokeWidth="1" strokeDasharray="3 2" />
            ))}
            {bars.map((bar, bi) => {
                let yOffset = baseY;
                return bar.heights.map((h, si) => {
                    yOffset -= h;
                    const opacity = 0.18 + si * 0.06;
                    return (
                        <rect
                            key={`${bi}-${si}`}
                            x={bar.x} y={yOffset} width={barW} height={h}
                            rx={si === bar.heights.length - 1 ? 3 : 0}
                            fill="#80A89C" opacity={opacity}
                        />
                    );
                }).reverse();
            })}
            <line x1="0" y1="90" x2="166" y2="90" stroke={P.sand} strokeWidth="1.5" />
        </svg>
    );
}

function GhostLines() {
    return (
        <svg width="166" height="96" viewBox="0 0 166 96" fill="none" aria-hidden="true">
            {[30, 55, 80].map((y) => (
                <line key={y} x1="0" y1={y} x2="166" y2={y} stroke={P.sand} strokeWidth="1" strokeDasharray="3 2" />
            ))}
            <polyline
                points="0,70 28,55 55,48 83,42 110,50 138,38 166,44"
                stroke="#80A89C" strokeWidth="2" fill="none" opacity="0.25"
                strokeLinecap="round" strokeLinejoin="round"
            />
            <polyline
                points="0,78 28,68 55,62 83,58 110,65 138,56 166,60"
                stroke="#5A9EAF" strokeWidth="2" fill="none" opacity="0.2"
                strokeLinecap="round" strokeLinejoin="round"
            />
            <line x1="0" y1="90" x2="166" y2="90" stroke={P.sand} strokeWidth="1.5" />
        </svg>
    );
}

// ── Component ──────────────────────────────────────────────────────────────

export type EmptyChartStateReason =
    | 'no-filters'
    | 'not-started'
    | 'loading-failed'
    | 'no-results';

interface EmptyChartStateProps {
    /** Semantic reason — controls default heading + body copy. */
    reason?: EmptyChartStateReason;
    /** Override the heading. Defaults to reason-appropriate copy. */
    heading?: string;
    /** Override the body copy. Defaults to reason-appropriate copy. */
    message?: string;
    /** Ghost illustration type. Defaults to 'bar'. */
    chartType?: 'bar' | 'line';
}

const DEFAULTS: Record<EmptyChartStateReason, { heading: string; message: string }> = {
    'no-filters': {
        heading: 'No data for this selection',
        message: 'This centre has no recorded results for the selected period. Try a different site or date range.',
    },
    'not-started': {
        heading: 'Reporting not yet started',
        message: 'This centre hasn\'t submitted data yet. Data will appear here once reporting begins.',
    },
    'loading-failed': {
        heading: 'Data unavailable right now',
        message: 'This information is still being processed. Check back shortly — it usually updates within a few minutes.',
    },
    'no-results': {
        heading: 'No matching results',
        message: 'There are no records for this combination. Try adjusting your filters.',
    },
};

const EmptyChartState = ({
    reason = 'no-filters',
    heading,
    message,
    chartType = 'bar',
}: EmptyChartStateProps) => {
    const defaults = DEFAULTS[reason];
    const resolvedHeading = heading ?? defaults.heading;
    const resolvedMessage = message ?? defaults.message;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '220px',
                px: 3,
                py: '28px',
                backgroundColor: P.linen,
                borderRadius: '8px',
                border: `1px dashed ${P.sand}`,
                textAlign: 'center',
                gap: '12px',
            }}
        >
            {/* Ghost illustration */}
            <Box sx={{ opacity: 0.6 }}>
                {chartType === 'line' ? <GhostLines /> : <GhostBars />}
            </Box>

            {/* Message */}
            <Box>
                <Typography
                    sx={{
                        fontFamily: CHART_FONT_FAMILY,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: P.earth,
                        lineHeight: 1.4,
                        mb: '6px',
                    }}
                >
                    {resolvedHeading}
                </Typography>
                <Typography
                    sx={{
                        fontFamily: CHART_FONT_FAMILY,
                        fontSize: '11.5px',
                        color: P.shadow,
                        lineHeight: 1.65,
                        maxWidth: '280px',
                    }}
                >
                    {resolvedMessage}
                </Typography>
            </Box>
        </Box>
    );
};

export default EmptyChartState;
export type { EmptyChartStateProps };

