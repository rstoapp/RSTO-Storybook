'use client';
import { Chart as ChartJS, ChartOptions, ChartDataset, registerables } from 'chart.js';
import BaseChart from './BaseChart';
import { ChartProps } from './BarChart';

ChartJS.register(...registerables);

const lineOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => `${context.dataset.label}: ${Number(context.parsed.y).toFixed(1)}%`,
            },
        },
    },
    elements: {
        point: { radius: 3, hitRadius: 15, hoverRadius: 6, borderWidth: 2 },
        line: { spanGaps: false, tension: 0, borderWidth: 2 },
    },
    scales: {
        x: {
            offset: true,
            stacked: true,
            grid: { drawOnChartArea: false, drawTicks: false },
            border: { width: 2, color: '#474747', z: 1 },
            ticks: { padding: 10, maxRotation: 45, minRotation: 45, font: { weight: 700 } },
        },
        y: {
            stacked: false,
            min: 0,
            max: 100,
            grid: { drawOnChartArea: true, drawTicks: false, offset: false, z: 5 },
            border: { display: false, dash: [5, 5] },
            ticks: {
                padding: 20,
                font: { weight: 700 },
                stepSize: 25,
                callback: (value) => value + '%',
            },
        },
    },
};

const LineChart = (props: ChartProps) => {
    const modifiedProps = { ...props };
    if (modifiedProps.chartData?.datasets) {
        modifiedProps.chartData.datasets = modifiedProps.chartData.datasets.map((dataset) => {
            const d = { ...dataset } as ChartDataset<'line', (number | null)[]>;
            d.pointRadius = 3;
            d.borderWidth = 2;
            d.tension = 0;
            d.spanGaps = false;
            d.showLine = true;
            if (d.data) {
                d.data = d.data.map((v) => (v === null ? 0 : v));
            }
            return d;
        });
    }
    return <BaseChart {...modifiedProps} options={lineOptions} type="line" sx={{ marginLeft: '-20px' }} />;
};

export default LineChart;
