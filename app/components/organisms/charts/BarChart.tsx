'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { stackedTopRadiusPlugin, STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

ChartJS.register(...registerables, stackedTopRadiusPlugin);

/** Simplified new API */
type BarChartProps = {
    data?: ChartData;
    options?: ChartOptions;
    isLoading?: boolean;
    aspectRatio?: AspectRatioProps;
    /** @deprecated use data instead */
    chartData?: ChartData | null;
    /** @deprecated use options instead */
    optionsOverrides?: ChartOptions;
    plugins?: Plugin[];
};

/** Legacy alias kept for DynamicDashboard / PPServiceDashboard consumers. */
type ChartProps = BarChartProps;

const barDefaults = {
    ...BASE_OPTIONS,
    _stackedTopRadius: STACKED_TOP_RADIUS,
    plugins: {
        legend: makeLegend(),
        tooltip: makeTooltip(),
    },
    scales: makeScales({ stacked: true }),
} as ChartOptions;

const BarChart = ({ data, chartData, options, optionsOverrides, isLoading, aspectRatio, plugins }: BarChartProps) => {
    const resolvedData = data ?? chartData ?? null;
    const combinedOptions = merge({}, barDefaults, options, optionsOverrides);
    return (
        <BaseChart
            aspectRatio={aspectRatio}
            chartData={resolvedData}
            isLoading={isLoading}
            options={combinedOptions}
            type="bar"
            plugins={plugins}
        />
    );
};

export default BarChart;
export type { BarChartProps, ChartProps };
