import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { Dayjs } from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const StyledDatePicker = styled(DatePicker<Dayjs>)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: theme.palette.common.white,
        borderRadius: '6px',
        border: `2px solid ${theme.palette.rstoGray._40}`,
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            borderColor: theme.palette.rstoBlue._50,
        },
        '&.Mui-focused': {
            borderColor: theme.palette.rstoBlue._70,
            boxShadow: `0 0 0 1px ${theme.palette.rstoBlue._20}`,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiInputBase-input': {
            fontSize: '1rem',
            color: theme.palette.text.primary,
            cursor: 'pointer',
        },
    },
}));

export interface CIDatePickerProps extends DatePickerProps<Dayjs> {}

const CIDatePicker = ({ slotProps, ...props }: CIDatePickerProps) => {
    return (
        <StyledDatePicker
            {...props}
            format="DD/MM/YYYY"
            slots={{
                openPickerIcon: CalendarTodayIcon,
            }}
            slotProps={{
                openPickerIcon: {
                    sx: { fontSize: '1.5rem' },
                },
                ...slotProps,
                textField: {
                    ...slotProps?.textField,
                    placeholder: 'Select a date',
                    onClick: (e: React.MouseEvent) => {
                        const button = (e.currentTarget as HTMLElement).querySelector('button');
                        if (button && e.target !== button) button.click();
                    },
                    InputProps: { readOnly: true },
                },
            }}
        />
    );
};

export default CIDatePicker;
