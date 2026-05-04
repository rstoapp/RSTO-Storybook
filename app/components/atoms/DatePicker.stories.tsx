import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

const meta: Meta<typeof DatePicker> = {
    title: 'RSTO/Atoms/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ pt: 2 }}>
                    <Story />
                </Box>
            </LocalizationProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState<Dayjs | null>(dayjs());
        return (
            <DatePicker
                label="Select date"
                value={value}
                onChange={(v) => setValue(v)}
            />
        );
    },
};

export const WithMinMax: Story = {
    render: () => {
        const [value, setValue] = useState<Dayjs | null>(dayjs());
        return (
            <DatePicker
                label="Reporting date"
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
        <DatePicker
            label="Date (read-only)"
            value={dayjs('2025-03-01')}
            onChange={() => {}}
            disabled
        />
    ),
};
