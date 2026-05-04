'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';

ChartJS.register(...registerables);

type BarChartGroupProps = {
    data?: ChartData;
    options?: ChartOptions;
    isLoading?: boolean;
    aspectRatio?: AspectRatioProps;
    plugins?: Plugin[];
};

const barGroupDefaults: ChartOptions = {
    ...BASE_OPTIONS,
    plugins: {
        legend: makeLegend(),
        tooltip: makeTooltip(),
    },
    scales: makeScales({ stacked: false }),
} as ChartOptions;

const BarChartGroup = ({ data, options, isLoading, aspectRatio, plugins }: BarChartGroupProps) => {
    const combinedOptions = merge({}, barGroupDefaults, options);
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

export default BarChartGroup;
export type { BarChartGroupProps };
