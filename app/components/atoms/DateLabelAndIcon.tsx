import * as React from 'react';
import { Typography, useTheme, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export interface DateLabelAndIconProps {
    date?: Date;
    label?: string;
}

const formatDate = (date: Date): string =>
    date.toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' });

const DateLabelAndIcon: React.FC<DateLabelAndIconProps> = ({
    date,
    label = 'Created on',
}) => {
    const theme = useTheme();

    if (!date) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon
                sx={{ fontSize: '1rem', color: theme.palette.text.secondary }}
            />
            <Typography variant="body2" color={theme.palette.text.secondary}>
                {label} {formatDate(date)}
            </Typography>
        </Box>
    );
};

export default DateLabelAndIcon;
