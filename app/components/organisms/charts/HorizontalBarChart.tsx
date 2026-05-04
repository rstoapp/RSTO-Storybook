'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeHorizontalScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { stackedTopRadiusPlugin, STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';

ChartJS.register(...registerables, stackedTopRadiusPlugin);

type HorizontalBarChartProps = {
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

/** Legacy alias kept for DynamicDashboard consumers. */
type ChartProps = HorizontalBarChartProps;

const horizontalDefaults = {
    ...BASE_OPTIONS,
    indexAxis: 'y' as const,
    _stackedTopRadius: STACKED_TOP_RADIUS,
    plugins: {
        legend: makeLegend(),
        tooltip: makeTooltip(),
    },
    scales: makeHorizontalScales({ stacked: true }),
} as ChartOptions;

const HorizontalBarChart = ({ data, chartData, options, optionsOverrides, isLoading, aspectRatio, plugins }: HorizontalBarChartProps) => {
    const resolvedData = data ?? chartData ?? null;
    const combinedOptions = merge({}, horizontalDefaults, options, optionsOverrides);
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

export default HorizontalBarChart;
export type { HorizontalBarChartProps, ChartProps };
