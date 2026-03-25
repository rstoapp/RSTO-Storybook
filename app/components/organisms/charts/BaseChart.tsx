import { Box, Skeleton } from '@mui/material';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions, ChartTypeRegistry, Plugin } from 'chart.js';
import merge from 'lodash/merge';
import { BoxProps } from '@mui/system';
import AspectRatio, { AspectRatioProps } from './AspectRatio';

const baseOptions: ChartOptions = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom' as const,
            align: 'start' as const,
            fullSize: true,
            labels: {
                boxWidth: 20,
                boxHeight: 8,
                padding: 16,
                color: '#474747',
            },
        },
    },
    animation: { duration: 500 },
    responsive: true,
    maintainAspectRatio: false,
};

type BaseChartProps = {
    aspectRatio: AspectRatioProps;
    chartData?: ChartData | null;
    options: ChartOptions;
    type: keyof ChartTypeRegistry;
    optionsOverrides?: ChartOptions;
    plugins?: Plugin[];
} & BoxProps;

const BaseChart = ({ aspectRatio, chartData, options, type, optionsOverrides, plugins, ...boxProps }: BaseChartProps) => {
    const combinedOptions = merge({}, baseOptions, options, optionsOverrides);
    return (
        <AspectRatio width={aspectRatio.width} height={aspectRatio.height}>
            {chartData ? (
                <Box {...boxProps} sx={{ position: 'relative', width: '100%', height: '100%', ...boxProps.sx }}>
                    <Chart type={type} data={chartData} options={combinedOptions} plugins={plugins} />
                </Box>
            ) : (
                <Skeleton height="100%" variant="rectangular" />
            )}
        </AspectRatio>
    );
};

export default BaseChart;
export type { BaseChartProps };
