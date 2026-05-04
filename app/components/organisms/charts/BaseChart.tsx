import { Box, Skeleton } from '@mui/material';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTypeRegistry, Plugin } from 'chart.js';
import merge from 'lodash/merge';
import { BoxProps } from '@mui/system';
import AspectRatio, { AspectRatioProps } from './AspectRatio';
import { P, CHART_FONT_FAMILY, CHART_FONT_SIZES } from './chart-theme';

const DEFAULT_ASPECT_RATIO: AspectRatioProps = { width: 16, height: 9 };

const baseOptions: ChartOptions = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom' as const,
            align: 'start' as const,
            fullSize: true,
            labels: {
                boxWidth: 11,
                boxHeight: 11,
                padding: 14,
                color: P.shadow,
                font: { family: CHART_FONT_FAMILY, size: CHART_FONT_SIZES.legend },
            },
        },
    },
    animation: { duration: 500 },
    responsive: true,
    maintainAspectRatio: false,
};

type BaseChartProps = {
    aspectRatio?: AspectRatioProps;
    chartData?: ChartData | null;
    isLoading?: boolean;
    options: ChartOptions;
    type: keyof ChartTypeRegistry;
    optionsOverrides?: ChartOptions;
    plugins?: Plugin[];
} & BoxProps;

const BaseChart = ({ aspectRatio = DEFAULT_ASPECT_RATIO, chartData, isLoading, options, type, optionsOverrides, plugins, ...boxProps }: BaseChartProps) => {
    const combinedOptions = merge({}, baseOptions, options, optionsOverrides);
    const showSkeleton = isLoading || !chartData;
    return (
        <AspectRatio width={aspectRatio.width} height={aspectRatio.height}>
            {!showSkeleton ? (
                <Box {...boxProps} sx={{ position: 'relative', width: '100%', height: '100%', ...boxProps.sx }}>
                    <Chart type={type} data={chartData!} options={combinedOptions} plugins={plugins} />
                </Box>
            ) : (
                <Skeleton height="100%" variant="rectangular" />
            )}
        </AspectRatio>
    );
};

export default BaseChart;
export type { BaseChartProps };
