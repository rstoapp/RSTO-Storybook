'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

ChartJS.register(...registerables);

type LineChartProps = {
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

/** Legacy alias kept for DynamicDashboard / ServiceProvider consumers. */
type ChartProps = LineChartProps;

const lineDefaults: ChartOptions = {
    ...BASE_OPTIONS,
    elements: {
        line: { tension: 0.32, borderWidth: 2 },
        point: { radius: 4, hoverRadius: 6, borderWidth: 2 },
    },
    plugins: {
        legend: makeLegend(),
        tooltip: { ...makeTooltip(), mode: 'index', intersect: false } as ChartOptions['plugins'],
    },
    scales: makeScales(),
} as ChartOptions;

const LineChart = ({ data, chartData, options, optionsOverrides, isLoading, aspectRatio, plugins }: LineChartProps) => {
    const resolvedData = data ?? chartData ?? null;
    const combinedOptions = merge({}, lineDefaults, options, optionsOverrides);
    return (
        <BaseChart
            aspectRatio={aspectRatio}
            chartData={resolvedData}
            isLoading={isLoading}
            options={combinedOptions}
            type="line"
            plugins={plugins}
        />
    );
};

export default LineChart;
export type { LineChartProps, ChartProps };
