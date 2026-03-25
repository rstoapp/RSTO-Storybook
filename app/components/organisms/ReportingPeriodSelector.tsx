'use client';
import * as React from 'react';
import { Box, ClickAwayListener, Fade, IconButton, Paper, Popper, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import QuarterDatePicker, { QuarterDatePickerProps } from './QuarterDatePicker';

dayjs.extend(quarterOfYear);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ReportingPeriodSelectorProps
    extends Omit<QuarterDatePickerProps, 'onChange'> {
    onChange?: (date: Dayjs) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * A trigger button that opens a QuarterDatePicker in a popper. Displays the
 * currently selected quarter and year (e.g. "Q3 2025") with a calendar icon.
 *
 * In the production app this is connected to `reportingPeriodStore`; here it is
 * fully prop-driven for use in Storybook and design review.
 */
const ReportingPeriodSelector = ({
    value,
    minDate,
    maxDate,
    shouldDisableQuarter,
    shouldDisableYear,
    onChange,
}: ReportingPeriodSelectorProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(open ? null : event.currentTarget);
    };

    const handleChange = (date: Dayjs) => {
        onChange?.(date);
        setAnchorEl(null);
    };

    const label = `Q${value.quarter()} ${value.year()}`;

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box>
                {/* Trigger */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    onClick={handleToggle}
                    sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                    <CalendarMonthIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" fontWeight={600}>
                        {label}
                    </Typography>
                    {open ? (
                        <ExpandLessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    ) : (
                        <ExpandMoreIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    )}
                </Stack>

                {/* Popper */}
                <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition style={{ zIndex: 1300 }}>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={150}>
                            <Paper elevation={0}>
                                <QuarterDatePicker
                                    value={value}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    shouldDisableQuarter={shouldDisableQuarter}
                                    shouldDisableYear={shouldDisableYear}
                                    onChange={handleChange}
                                />
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export default ReportingPeriodSelector;
