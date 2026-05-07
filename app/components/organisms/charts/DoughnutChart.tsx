'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ChartOptions, ChartData, registerables } from 'chart.js';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { P, CHART_FONT_FAMILY } from './chart-theme';

ChartJS.register(...registerables);

type DoughnutChartProps = {
    data?: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
    isLoading?: boolean;
    aspectRatio?: AspectRatioProps;
    /** Label shown in the donut hole — typically the total count. */
    centerLabel?: { count: number | string; caption: string };
};

const doughnutDefaults: ChartOptions<'doughnut'> = {
    ...BASE_OPTIONS,
    cutout: '65%',
    layout: {
        padding: { bottom: 8 },
    },
    plugins: {
        legend: {
            ...makeLegend(),
            position: 'bottom',
        },
        tooltip: makeTooltip(),
    },
} as ChartOptions<'doughnut'>;

const DoughnutChart = ({ data, options, isLoading, aspectRatio = { width: 1, height: 1 }, centerLabel }: DoughnutChartProps) => {
    const mergedOptions: ChartOptions<'doughnut'> = { ...doughnutDefaults, ...options };

    return (
        <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <BaseChart
                aspectRatio={aspectRatio}
                chartData={data as ChartData ?? null}
                isLoading={isLoading}
                options={mergedOptions as ChartOptions}
                type="doughnut"
            />
            {centerLabel && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        // Legend is ~40px; offset center up within the arc area
                        bottom: 40,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: CHART_FONT_FAMILY,
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: P.ink,
                            lineHeight: 1.1,
                        }}
                    >
                        {centerLabel.count}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: CHART_FONT_FAMILY,
                            fontSize: '0.6875rem',
                            color: P.shadow,
                            mt: '2px',
                        }}
                    >
                        {centerLabel.caption}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DoughnutChart;
export type { DoughnutChartProps };
