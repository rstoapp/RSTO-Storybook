'use client';
import { Chart as ChartJS, ChartOptions, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart, { BaseChartProps } from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { ChartData, Plugin } from 'chart.js';

ChartJS.register(...registerables);

type ChartProps = {
    aspectRatio: AspectRatioProps;
    chartData?: ChartData | null;
    optionsOverrides?: ChartOptions;
    plugins?: Plugin[];
};

const barOptions: ChartOptions = {
    scales: {
        x: {
            offset: true,
            stacked: true,
            grid: { drawOnChartArea: false, drawTicks: false },
            border: { width: 2, color: '#474747', z: 1 },
            ticks: { padding: 10, maxRotation: 45, minRotation: 45, font: { weight: 700 } },
        },
        y: {
            stacked: true,
            grid: { drawOnChartArea: true, drawTicks: false, offset: false, z: 5 },
            border: { display: false, dash: [5, 5] },
            ticks: { precision: 0, padding: 20, font: { weight: 700 } },
        },
    },
};

const BarChart = ({ optionsOverrides, ...props }: ChartProps) => {
    const combinedOptions = merge({}, barOptions, optionsOverrides);
    return <BaseChart {...props} options={combinedOptions} type="bar" sx={{ marginLeft: '-20px' }} />;
};

export default BarChart;
export type { ChartProps };
