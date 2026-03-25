'use client';
import { Chart as ChartJS, ChartOptions, LegendItem, registerables } from 'chart.js';
import BaseChart from './BaseChart';
import { ChartProps } from './BarChart';

ChartJS.register(...registerables);

const horizontalOptions: ChartOptions = {
    indexAxis: 'y' as const,
    plugins: {
        legend: {
            reverse: true,
            labels: {
                boxWidth: 20,
                generateLabels: (chart) => {
                    if (!chart.data.labels || !chart.data.datasets.length) return [];
                    const getColour = (i: number) => (chart.data.datasets[0].backgroundColor as string[])[i];
                    return (chart.data.labels as string[]).map((label, i): LegendItem => ({
                        text: label,
                        fillStyle: getColour(i),
                        strokeStyle: getColour(i),
                        hidden: false,
                        index: i,
                        fontColor: '#474747',
                    }));
                },
            },
        },
    },
    scales: {
        x: {
            min: 0,
            max: 100,
            ticks: { font: { weight: 700 }, stepSize: 25, callback: (v) => v + '%' },
            grid: { drawTicks: false },
        },
        y: {
            ticks: { display: false },
            grid: { drawTicks: false },
        },
    },
};

const HorizontalBarChart = (props: ChartProps) => (
    <BaseChart {...props} options={horizontalOptions} type="bar" sx={{ marginTop: '10px' }} />
);

export default HorizontalBarChart;
