import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CIDatePicker from './CIDatePicker';

const meta: Meta<typeof CIDatePicker> = {
    title: 'RSTO/Atoms/CIDatePicker',
    component: CIDatePicker,
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
    decorators: [
        (Story) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Story />
            </LocalizationProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof CIDatePicker>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState<Dayjs | null>(null);
        return <CIDatePicker label="Select date" value={value} onChange={(v) => setValue(v)} />;
    },
};

export const WithValue: Story = {
    // Format locked to DD/MM/YYYY. Click anywhere on the input row to open the calendar.
    render: () => {
        const [value, setValue] = useState<Dayjs | null>(dayjs('2025-07-15'));
        return <CIDatePicker label="Reporting date" value={value} onChange={(v) => setValue(v)} />;
    },
};

export const WithMinMax: Story = {
    render: () => {
        const [value, setValue] = useState<Dayjs | null>(dayjs());
        return (
            <CIDatePicker
                label="Reporting period"
                value={value}
                onChange={(v) => setValue(v)}
                minDate={dayjs().subtract(1, 'year')}
                maxDate={dayjs()}
            />
        );
    },
};

export const Disabled: Story = {
    render: () => (
        <CIDatePicker
            label="Date (read-only)"
            value={dayjs('2025-03-01')}
            onChange={() => {}}
            disabled
        />
    ),
};
