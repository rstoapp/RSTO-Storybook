'use client';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import RstoPopper from './RstoPopper';
import DatePickerToggleHeader, { ReportingPeriodFrequency } from '../atoms/DatePickerToggleHeader';
import StaticYearMonthDatePicker from '../atoms/StaticYearMonthDatePicker';
import QuarterDatePicker from '../organisms/QuarterDatePicker';

dayjs.extend(quarterOfYear);

export interface DatePickerPopperProps {
    frequency: ReportingPeriodFrequency;
    defaultValue: Dayjs;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    shouldDisableQuarter?: (date: Dayjs) => boolean;
    onDateChange?: (date: Dayjs) => void;
}

const DatePickerPopper = ({
    frequency,
    defaultValue,
    minDate,
    maxDate,
    shouldDisableQuarter,
    onDateChange,
}: DatePickerPopperProps) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(defaultValue);

    const handleMonthlySelect = (date: Dayjs, view: 'month' | 'year') => {
        setSelectedDate(date);
        onDateChange?.(date);
        if (view === 'month') setOpen(false);
    };

    const handleQuarterlySelect = (date: Dayjs) => {
        setSelectedDate(date);
        onDateChange?.(date);
        setOpen(false);
    };

    return (
        <RstoPopper
            placement="bottom-start"
            open={open}
            setOpen={setOpen}
            popperContent={
                <>
                    {frequency === 'MONTHLY' && (
                        <StaticYearMonthDatePicker
                            defaultValue={selectedDate}
                            minDate={minDate}
                            maxDate={maxDate}
                            sx={{ marginTop: '12px', borderRadius: '4px' }}
                            onDateChange={handleMonthlySelect}
                        />
                    )}
                    {frequency === 'QUARTERLY' && (
                        <QuarterDatePicker
                            value={selectedDate}
                            minDate={minDate}
                            maxDate={maxDate}
                            shouldDisableQuarter={shouldDisableQuarter}
                            onChange={handleQuarterlySelect}
                        />
                    )}
                </>
            }
        >
            <DatePickerToggleHeader
                date={selectedDate}
                frequency={frequency}
                open={open}
            />
        </RstoPopper>
    );
};

export default DatePickerPopper;
