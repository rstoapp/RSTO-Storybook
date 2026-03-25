import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography } from '@mui/material';
import BarChart from './BarChart';
import LineChart from './LineChart';
import HorizontalBarChart from './HorizontalBarChart';
import ChartCard from './ChartCard';
import EmptyChartState from './EmptyChartState';

const ASPECT_RATIO = { width: 16, height: 9 };

// ── Shared mock data ────────────────────────────────────────────────────────

const YEARS = ['2019', '2020', '2021', '2022', '2023'];
const ORANGE = '#E07B39';
const BLUE = '#1B6CA8';
const GREEN = '#4D8613';

const barData = {
    labels: YEARS,
    datasets: [
        {
            label: 'Metro',
            data: [72, 75, 78, 81, 84],
            backgroundColor: ORANGE,
        },
        {
            label: 'Regional',
            data: [60, 63, 67, 70, 74],
            backgroundColor: BLUE,
        },
    ],
};

const lineData = {
    labels: YEARS,
    datasets: [
        {
            label: 'Immunisation coverage',
            data: [72, 75, 78, 81, 84],
            borderColor: ORANGE,
            backgroundColor: 'transparent',
        },
        {
            label: 'National average',
            data: [68, 70, 72, 74, 76],
            borderColor: BLUE,
            backgroundColor: 'transparent',
        },
    ],
};

const horizontalData = {
    labels: ['Under 1 year', '1–4 years', '5–14 years', '15–24 years'],
    datasets: [
        {
            label: 'Coverage',
            data: [84, 76, 65, 58],
            backgroundColor: [ORANGE, BLUE, GREEN, '#9C27B0'],
        },
    ],
};

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'RSTO/Organisms/Charts',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 700, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

// ── Stories ──────────────────────────────────────────────────────────────────

export const BarChartStory: StoryObj = {
    name: 'Bar Chart',
    render: () => (
        <ChartCard
            chartName="Chart one"
            title={<Typography variant="h5" fontWeight={700}>Immunisation coverage by region</Typography>}
            subTitle="Percentage of children immunised on time, 2019–2023"
            chart={<BarChart aspectRatio={ASPECT_RATIO} chartData={barData} />}
        />
    ),
};

export const LineChartStory: StoryObj = {
    name: 'Line Chart',
    render: () => (
        <ChartCard
            chartName="Chart two"
            title={<Typography variant="h5" fontWeight={700}>Coverage trend over time</Typography>}
            subTitle="Percentage, 2019–2023"
            chart={<LineChart aspectRatio={ASPECT_RATIO} chartData={lineData} />}
        />
    ),
};

export const HorizontalBarChartStory: StoryObj = {
    name: 'Horizontal Bar Chart',
    render: () => (
        <ChartCard
            chartName="Chart three"
            title={<Typography variant="h5" fontWeight={700}>Coverage by age group</Typography>}
            subTitle="Percentage of children immunised, 2023"
            chart={<HorizontalBarChart aspectRatio={ASPECT_RATIO} chartData={horizontalData} />}
        />
    ),
};

export const LoadingState: StoryObj = {
    name: 'Loading (no data)',
    render: () => (
        <ChartCard
            chartName="Chart one"
            title={<Typography variant="h5" fontWeight={700}>Immunisation coverage</Typography>}
            chart={<BarChart aspectRatio={ASPECT_RATIO} chartData={null} />}
        />
    ),
};

export const EmptyState: StoryObj = {
    name: 'Empty state',
    render: () => <EmptyChartState />,
};

export const EmptyStateCustomMessage: StoryObj = {
    name: 'Empty state — custom message',
    render: () => <EmptyChartState message="No data has been submitted for this reporting period." />,
};
