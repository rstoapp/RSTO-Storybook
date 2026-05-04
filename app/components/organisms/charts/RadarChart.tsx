'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeRadarScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

ChartJS.register(...registerables);

type RadarChartProps = {
    data?: ChartData;
    options?: ChartOptions;
    isLoading?: boolean;
    /** Defaults to 1:1 — radar charts render best square. */
    aspectRatio?: AspectRatioProps;
    plugins?: Plugin[];
};

const DEFAULT_ASPECT_RATIO: AspectRatioProps = { width: 1, height: 1 };

const radarDefaults = {
    ...BASE_OPTIONS,
    plugins: {
        legend: makeLegend(),
        tooltip: makeTooltip(),
    },
    scales: makeRadarScales(),
} as ChartOptions;

const RadarChart = ({ data, options, isLoading, aspectRatio = DEFAULT_ASPECT_RATIO, plugins }: RadarChartProps) => {
    const combinedOptions = merge({}, radarDefaults, options);
    return (
        <BaseChart
            aspectRatio={aspectRatio}
            chartData={isLoading ? null : (data ?? null)}
            isLoading={isLoading}
            options={combinedOptions}
            type="radar"
            plugins={plugins}
        />
    );
};

export default RadarChart;
export type { RadarChartProps };
