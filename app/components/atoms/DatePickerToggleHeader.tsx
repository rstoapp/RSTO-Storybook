import { ListItemButton, Stack, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React from 'react';
import { Dayjs } from 'dayjs';

export type ReportingPeriodFrequency = 'MONTHLY' | 'QUARTERLY';

type DatePickerToggleHeaderProps = {
    date: Dayjs;
    frequency: ReportingPeriodFrequency;
    open: boolean;
};

const DatePickerToggleHeader = ({ date, frequency, open }: DatePickerToggleHeaderProps) => {
    return (
        <ListItemButton>
            <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarTodayOutlinedIcon color="inherit" sx={{ fontSize: '1rem' }} />
                <Typography variant="subtitle2">
                    {frequency === 'QUARTERLY'
                        ? date.format('[Q]Q YYYY')
                        : date.format('MMM YYYY')}
                </Typography>
                {open ? <ExpandLess /> : <ExpandMore />}
            </Stack>
        </ListItemButton>
    );
};

export default DatePickerToggleHeader;
