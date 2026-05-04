'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { stackedTopRadiusPlugin, STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

ChartJS.register(...registerables, stackedTopRadiusPlugin);

type HeatmapChartProps = {
    data?: ChartData;
    options?: ChartOptions;
    isLoading?: boolean;
    aspectRatio?: AspectRatioProps;
    plugins?: Plugin[];
};

const heatmapDefaults = {
    ...BASE_OPTIONS,
    _stackedTopRadius: STACKED_TOP_RADIUS,
    plugins: {
        legend: makeLegend(),
        tooltip: makeTooltip(),
    },
    scales: makeScales({ stacked: true }),
} as ChartOptions;

const HeatmapChart = ({ data, options, isLoading, aspectRatio, plugins }: HeatmapChartProps) => {
    const combinedOptions = merge({}, heatmapDefaults, options);
    return (
        <BaseChart
            aspectRatio={aspectRatio}
            chartData={isLoading ? null : (data ?? null)}
            isLoading={isLoading}
            options={combinedOptions}
            type="bar"
            plugins={plugins}
        />
    );
};

export default HeatmapChart;
export type { HeatmapChartProps };
