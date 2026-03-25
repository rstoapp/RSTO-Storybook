import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Selector from './Selector';

const meta: Meta<typeof Selector> = {
    title: 'RSTO/Molecules/Selector',
    component: Selector,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Selector>;

const METRIC_OPTIONS = [
    { label: 'Percentage of appointments', value: 'pct' },
    { label: 'Number of appointments', value: 'count' },
    { label: 'Rolling 12-month average', value: 'avg' },
];

const PERIOD_OPTIONS = [
    { label: 'Q1 2025', value: 'q1-2025' },
    { label: 'Q2 2025', value: 'q2-2025' },
    { label: 'Q3 2025', value: 'q3-2025' },
];

export const WithValue: Story = {
    name: 'With selected value',
    render: () => {
        const [value, setValue] = useState('pct');
        return <Selector options={METRIC_OPTIONS} value={value} onChange={setValue} />;
    },
};

export const WithPlaceholder: Story = {
    name: 'With placeholder (no selection)',
    render: () => {
        const [value, setValue] = useState('');
        return (
            <Selector
                options={METRIC_OPTIONS}
                value={value}
                placeholder="Select a metric"
                onChange={setValue}
            />
        );
    },
};

export const PeriodSelector: Story = {
    name: 'Period selector',
    render: () => {
        const [value, setValue] = useState('q3-2025');
        return <Selector options={PERIOD_OPTIONS} value={value} onChange={setValue} />;
    },
};
