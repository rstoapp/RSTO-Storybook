'use client';
import * as React from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(quarterOfYear);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface QuarterDatePickerProps {
    value: Dayjs;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    shouldDisableQuarter?: (date: Dayjs) => boolean;
    shouldDisableYear?: (year: number) => boolean;
    onChange: (date: Dayjs) => void;
}

// ── Styled ────────────────────────────────────────────────────────────────────

const PickerRoot = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    padding: '16px',
    width: 280,
    boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
}));

const QuarterButton = styled(Button)<{ ownerState: { selected: boolean; disabled: boolean } }>(
    ({ theme, ownerState }) => ({
        width: '100%',
        justifyContent: 'center',
        borderRadius: 6,
        padding: '10px 0',
        backgroundColor: ownerState.selected ? theme.palette.rstoBlue._70 : 'transparent',
        color: ownerState.selected
            ? theme.palette.common.white
            : ownerState.disabled
            ? theme.palette.text.disabled
            : theme.palette.text.primary,
        fontWeight: ownerState.selected ? 700 : 400,
        '&:hover': {
            backgroundColor: ownerState.selected
                ? theme.palette.rstoBlue._70
                : theme.palette.rstoBlue._10,
        },
    })
);

// ── Quarter labels ────────────────────────────────────────────────────────────

const QUARTERS: { label: string; months: string; q: number }[] = [
    { label: 'Q1', months: 'Jan · Feb · Mar', q: 1 },
    { label: 'Q2', months: 'Apr · May · Jun', q: 2 },
    { label: 'Q3', months: 'Jul · Aug · Sep', q: 3 },
    { label: 'Q4', months: 'Oct · Nov · Dec', q: 4 },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * A custom quarter-based date picker. Displays four quarter buttons for the
 * current year with prev/next year navigation. Snaps selection to the start of
 * the chosen quarter.
 *
 * In the production app this is store-connected; here it is fully prop-driven.
 */
const QuarterDatePicker = ({
    value,
    minDate,
    maxDate,
    shouldDisableQuarter,
    shouldDisableYear,
    onChange,
}: QuarterDatePickerProps) => {
    const [displayYear, setDisplayYear] = React.useState(value.year());

    const canGoPrev = !shouldDisableYear?.(displayYear - 1) &&
        (!minDate || dayjs(`${displayYear - 1}-01-01`).isAfter(minDate.subtract(1, 'year')));
    const canGoNext = !shouldDisableYear?.(displayYear + 1) &&
        (!maxDate || dayjs(`${displayYear + 1}-01-01`).isBefore(maxDate.add(1, 'year')));

    const handleQuarterClick = (q: number) => {
        const date = dayjs(`${displayYear}-01-01`).quarter(q).startOf('quarter');
        onChange(date);
    };

    return (
        <PickerRoot>
            {/* Year header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <IconButton size="small" onClick={() => setDisplayYear((y) => y - 1)} disabled={!canGoPrev}>
                    <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" fontWeight={700}>
                    {displayYear}
                </Typography>
                <IconButton size="small" onClick={() => setDisplayYear((y) => y + 1)} disabled={!canGoNext}>
                    <ChevronRightIcon fontSize="small" />
                </IconButton>
            </Stack>

            {/* Quarter rows */}
            <Stack spacing={0.5}>
                {QUARTERS.map(({ label, months, q }) => {
                    const date = dayjs(`${displayYear}-01-01`).quarter(q).startOf('quarter');
                    const isSelected = value.year() === displayYear && value.quarter() === q;
                    const isDisabled = shouldDisableQuarter?.(date) ||
                        (!!minDate && date.isBefore(minDate, 'month')) ||
                        (!!maxDate && date.isAfter(maxDate, 'month'));

                    return (
                        <QuarterButton
                            key={q}
                            ownerState={{ selected: isSelected, disabled: !!isDisabled }}
                            disabled={!!isDisabled}
                            onClick={() => handleQuarterClick(q)}
                            disableRipple={isSelected}
                        >
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', px: 1 }}>
                                <Typography variant="body2" fontWeight={700} sx={{ width: 28 }}>
                                    {label}
                                </Typography>
                                <Typography variant="caption" color="inherit" sx={{ opacity: 0.75 }}>
                                    {months}
                                </Typography>
                            </Stack>
                        </QuarterButton>
                    );
                })}
            </Stack>
        </PickerRoot>
    );
};

export default QuarterDatePicker;
