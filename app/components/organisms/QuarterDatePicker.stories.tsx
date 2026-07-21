import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import QuarterDatePicker from './QuarterDatePicker';

dayjs.extend(quarterOfYear);

const meta: Meta<typeof QuarterDatePicker> = {
    title: 'RSTO/Organisms/QuarterDatePicker',
    component: QuarterDatePicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                    { id: 'focus-trap', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof QuarterDatePicker>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState(dayjs().startOf('quarter'));
        return <QuarterDatePicker value={value} onChange={setValue} />;
    },
};

export const WithMinMax: Story = {
    // Year nav is blocked outside the min/max window.
    render: () => {
        const [value, setValue] = useState(dayjs().startOf('quarter'));
        return (
            <QuarterDatePicker
                value={value}
                onChange={setValue}
                minDate={dayjs('2023-01-01').startOf('quarter')}
                maxDate={dayjs('2027-12-31').endOf('quarter')}
            />
        );
    },
};

export const WithDisabledQuarters: Story = {
    // Q1 and Q3 disabled — demonstrates shouldDisableQuarter callback.
    render: () => {
        const [value, setValue] = useState(dayjs().quarter(2).startOf('quarter'));
        return (
            <QuarterDatePicker
                value={value}
                onChange={setValue}
                shouldDisableQuarter={(date) => {
                    const q = date.quarter();
                    return q === 1 || q === 3;
                }}
            />
        );
    },
};

export const PastYear: Story = {
    // Seeded to a prior year to show year navigation from a non-current year.
    render: () => {
        const [value, setValue] = useState(dayjs('2024-04-01').startOf('quarter'));
        return <QuarterDatePicker value={value} onChange={setValue} />;
    },
};
