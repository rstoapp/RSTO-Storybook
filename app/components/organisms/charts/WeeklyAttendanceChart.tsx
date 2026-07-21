'use client';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import merge from 'lodash/merge';
import HeatmapChart from './HeatmapChart';
import { AspectRatioProps } from './AspectRatio';
import { makeScales, makeTooltip, makeLegend, BASE_OPTIONS } from './default-chart-options';
import { stackedTopRadiusPlugin, STACKED_TOP_RADIUS } from './stacked-top-radius-plugin';
import { HEATMAP_COLORS, HEATMAP_NAMES, hexAlpha } from './chart-theme';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables, stackedTopRadiusPlugin);

const DEFAULT_ASPECT_RATIO: AspectRatioProps = { width: 16, height: 7 };

const attendanceDefaults: ChartOptions = {
    ...BASE_OPTIONS,
    _stackedTopRadius: STACKED_TOP_RADIUS,
    plugins: {
        legend: makeLegend(),
        tooltip: makeTooltip(),
    },
    scales: makeScales({ stacked: true, rotateX: true }),
} as ChartOptions;

export type WeeklyAttendanceChartProps = {
    data?: ChartData;
    options?: ChartOptions;
    isLoading?: boolean;
    aspectRatio?: AspectRatioProps;
    plugins?: Plugin[];
};

/**
 * Build the 10-series weekly attendance stacked bar datasets.
 * attendanceData: array of 10 data arrays, bottom (30+ hrs) → top (Did not attend).
 * "Did not attend" always renders at 55% opacity per design spec.
 */
export function mkAttendanceDatasets(attendanceData: number[][], alpha = 0.92) {
    return HEATMAP_NAMES.map((name, i) => ({
        label: name,
        data: attendanceData[i],
        stack: 'main',
        backgroundColor: i === HEATMAP_NAMES.length - 1
            ? hexAlpha(HEATMAP_COLORS[i], 0.55)
            : hexAlpha(HEATMAP_COLORS[i], alpha),
        borderWidth: 0,
    }));
}

const WeeklyAttendanceChart = ({
    data,
    options,
    isLoading,
    aspectRatio = DEFAULT_ASPECT_RATIO,
    plugins,
}: WeeklyAttendanceChartProps) => {
    const combinedOptions = merge({}, attendanceDefaults, options);
    return (
        <HeatmapChart
            data={data}
            options={combinedOptions}
            isLoading={isLoading}
            aspectRatio={aspectRatio}
            plugins={plugins}
        />
    );
};

export default WeeklyAttendanceChart;
