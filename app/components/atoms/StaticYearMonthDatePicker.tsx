import React from 'react';
import StyledStaticDatePicker from './StyledStaticDatePicker';
import { Dayjs } from 'dayjs';
import { SxProps, Theme } from '@mui/material';

export type YearMonthDatePickerProps = {
    defaultValue: Dayjs;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    sx?: SxProps<Theme>;
    onDateChange?: (date: Dayjs, view: 'month' | 'year') => void;
};

const StaticYearMonthDatePicker = ({ onDateChange, ...pickerProps }: YearMonthDatePickerProps) => {
    return (
        <StyledStaticDatePicker
            {...(pickerProps as any)}
            onMonthChange={(date: Dayjs) => onDateChange?.(date, 'month')}
            onYearChange={(date: Dayjs) => onDateChange?.(date, 'year')}
            slotProps={{ actionBar: { actions: [] } }}
            slots={{
                calendarHeader: undefined,
                toolbar: undefined,
            }}
            views={['month', 'year', 'month'] as any}
        />
    );
};

export default StaticYearMonthDatePicker;
