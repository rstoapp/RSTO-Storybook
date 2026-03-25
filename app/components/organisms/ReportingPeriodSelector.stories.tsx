import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { Stack, Typography } from '@mui/material';
import QuarterDatePicker from './QuarterDatePicker';
import ReportingPeriodSelector from './ReportingPeriodSelector';

dayjs.extend(quarterOfYear);

const meta: Meta = {
    title: 'RSTO/Organisms/ReportingPeriodSelector',
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

// ── QuarterDatePicker ─────────────────────────────────────────────────────────

export const PickerDefault: Story = {
    name: 'QuarterDatePicker — default',
    render: () => {
        const [value, setValue] = useState(dayjs('2025-07-01'));
        return (
            <Stack spacing={2} alignItems="flex-start">
                <QuarterDatePicker value={value} onChange={setValue} />
                <Typography variant="caption" color="text.secondary">
                    Selected: Q{value.quarter()} {value.year()}
                </Typography>
            </Stack>
        );
    },
};

export const PickerWithConstraints: Story = {
    name: 'QuarterDatePicker — with min/max dates',
    render: () => {
        const [value, setValue] = useState(dayjs('2025-07-01'));
        return (
            <Stack spacing={2} alignItems="flex-start">
                <QuarterDatePicker
                    value={value}
                    minDate={dayjs('2024-01-01')}
                    maxDate={dayjs('2025-09-30')}
                    onChange={setValue}
                />
                <Typography variant="caption" color="text.secondary">
                    Selected: Q{value.quarter()} {value.year()} · Range: Q1 2024 – Q3 2025
                </Typography>
            </Stack>
        );
    },
};

// ── ReportingPeriodSelector ───────────────────────────────────────────────────

export const SelectorDefault: Story = {
    name: 'ReportingPeriodSelector — trigger + popper',
    render: () => {
        const [value, setValue] = useState(dayjs('2025-07-01'));
        return (
            <Stack spacing={2} alignItems="flex-start" sx={{ pt: 4 }}>
                <ReportingPeriodSelector value={value} onChange={setValue} />
                <Typography variant="caption" color="text.secondary">
                    Selected: Q{value.quarter()} {value.year()}
                </Typography>
            </Stack>
        );
    },
};

export const SelectorConstrained: Story = {
    name: 'ReportingPeriodSelector — with date constraints',
    render: () => {
        const [value, setValue] = useState(dayjs('2025-07-01'));
        return (
            <Stack spacing={2} alignItems="flex-start" sx={{ pt: 4 }}>
                <ReportingPeriodSelector
                    value={value}
                    minDate={dayjs('2024-01-01')}
                    maxDate={dayjs('2025-09-30')}
                    onChange={setValue}
                />
                <Typography variant="caption" color="text.secondary">
                    Selected: Q{value.quarter()} {value.year()}
                </Typography>
            </Stack>
        );
    },
};
