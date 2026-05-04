'use client';
import { Chart as ChartJS, ChartOptions, ChartData, Plugin, registerables } from 'chart.js';
import merge from 'lodash/merge';
import BaseChart from './BaseChart';
import { AspectRatioProps } from './AspectRatio';
import { makeScales, makeLegend, makeTooltip, BASE_OPTIONS } from './default-chart-options';
import { SERIES_COLORS, hexAlpha } from './chart-theme';

ChartJS.register(...registerables);

export type MultiLineSeries = { name: string; data: number[] };

export type MultiLineChartProps = {
    data?: ChartData;
    options?: ChartOptions;
    isLoading?: boolean;
    aspectRatio?: AspectRatioProps;
    plugins?: Plugin[];
};

const multiLineDefaults: ChartOptions = {
    ...BASE_OPTIONS,
    elements: {
        line: { tension: 0.32, borderWidth: 1.8 },
        point: { radius: 3, hoverRadius: 5, borderWidth: 1.5 },
    },
    plugins: {
        legend: makeLegend(),
        tooltip: { ...makeTooltip(), mode: 'index', intersect: false } as ChartOptions['plugins'],
    },
    scales: makeScales(),
} as ChartOptions;

/**
 * Option A — Muted tonal family.
 * All lines from the Outback palette — no unrelated hues.
 */
export function mkMultiLineMuted(centresArr: MultiLineSeries[]) {
    return centresArr.map((c, i) => ({
        label: c.name,
        data: c.data,
        borderColor: SERIES_COLORS[i % SERIES_COLORS.length],
        backgroundColor: 'transparent',
        borderWidth: 1.8,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: SERIES_COLORS[i % SERIES_COLORS.length],
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1.5,
        tension: 0.32,
    }));
}

/**
 * Option B — Grey chorus + highlight (recommended default).
 * One bold highlighted line; all others recede to ghost grey.
 * Use when the user has a primary centre or cohort of interest.
 */
export function mkMultiLineFocus(centresArr: MultiLineSeries[], highlightIndex = 0) {
    const HIGHLIGHT_COLOR = '#D4844A'; // Amber 55
    return centresArr.map((c, i) => {
        const isHL = i === highlightIndex;
        return {
            label: c.name,
            data: c.data,
            borderColor: isHL ? HIGHLIGHT_COLOR : 'rgba(138,123,106,0.22)',
            backgroundColor: 'transparent',
            borderWidth: isHL ? 2.5 : 1,
            pointRadius: isHL ? 4 : 0,
            pointHoverRadius: isHL ? 6 : 3,
            pointBackgroundColor: HIGHLIGHT_COLOR,
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 1.5,
            tension: 0.32,
            order: isHL ? 0 : 1,
        };
    });
}

/**
 * Option C — End labels, no legend.
 * Graduated blues, suitable when the panel is wide and labels are short.
 * Pair with `plugins: { legend: { display: false } }` and inline end-point annotations.
 */
export function mkMultiLineGraduated(centresArr: MultiLineSeries[]) {
    const blues = ['#2E6878', '#5A9EAF', '#8BBFCC'];
    return centresArr.map((c, i) => ({
        label: c.name,
        data: c.data,
        borderColor: blues[i % blues.length],
        backgroundColor: hexAlpha(blues[i % blues.length], 0.04),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.32,
        fill: true,
    }));
}

const MultiLineChart = ({ data, options, isLoading, aspectRatio, plugins }: MultiLineChartProps) => {
    const combinedOptions = merge({}, multiLineDefaults, options);
    return (
        <BaseChart
            aspectRatio={aspectRatio}
            chartData={isLoading ? null : (data ?? null)}
            isLoading={isLoading}
            options={combinedOptions}
            type="line"
            plugins={plugins}
        />
    );
};

export default MultiLineChart;
