import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import DatePickerPopper from './DatePickerPopper';

dayjs.extend(quarterOfYear);

const meta: Meta<typeof DatePickerPopper> = {
    title: 'RSTO/Molecules/DatePickerPopper',
    component: DatePickerPopper,
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
    args: {
        onDateChange: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof DatePickerPopper>;

export const Monthly: Story = {
    // Click the header to open the month/year picker. Selecting a month closes the popper.
    args: {
        frequency: 'MONTHLY',
        defaultValue: dayjs().startOf('month'),
    },
};

export const Quarterly: Story = {
    // Click the header to open the quarter picker. Selecting a quarter closes the popper.
    args: {
        frequency: 'QUARTERLY',
        defaultValue: dayjs().startOf('quarter'),
    },
};

export const MonthlyWithMinMax: Story = {
    args: {
        frequency: 'MONTHLY',
        defaultValue: dayjs('2025-07-01').startOf('month'),
        minDate: dayjs('2024-01-01'),
        maxDate: dayjs('2026-12-31'),
    },
};

export const QuarterlyWithMinMax: Story = {
    args: {
        frequency: 'QUARTERLY',
        defaultValue: dayjs('2025-04-01').startOf('quarter'),
        minDate: dayjs('2023-01-01'),
        maxDate: dayjs('2027-12-31'),
    },
};
