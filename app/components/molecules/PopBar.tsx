import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export interface PopBarProps {
    label: string;
    value: number;
    target: number;
}

/**
 * A labelled progress bar showing a percentage value against a target.
 * The bar colour switches between success (green) and warning (orange) based on
 * whether value meets target. A dashed vertical line marks the target position.
 */
const PopBar = ({ label, value, target }: PopBarProps) => {
    const isAbove = value >= target;
    return (
        <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">{label}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: isAbove ? 'success.main' : 'warning.main' }}
                    >
                        {value}%
                    </Typography>
                    {isAbove ? (
                        <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                    ) : (
                        <TrendingDownIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                    )}
                </Stack>
            </Stack>
            <Box sx={{ position: 'relative', height: 24, bgcolor: 'rstoGray._40', borderRadius: '4px', overflow: 'visible' }}>
                <Box
                    sx={{
                        width: `${value}%`,
                        height: '100%',
                        bgcolor: isAbove ? 'success.main' : 'warning.main',
                        borderRadius: '4px',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: -4,
                        bottom: -4,
                        left: `${target}%`,
                        width: '2px',
                        bgcolor: 'text.primary',
                        borderStyle: 'dashed',
                    }}
                />
            </Box>
        </Stack>
    );
};

export default PopBar;
