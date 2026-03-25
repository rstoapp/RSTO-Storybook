import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export interface BarrierRowProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/**
 * An icon + bold title + secondary description row. Used in the Key Barriers,
 * Improvement Initiatives, and Emerging Themes panels on the service provider page.
 */
const BarrierRow = ({ icon, title, description }: BarrierRowProps) => (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box sx={{ mt: 0.25 }}>{icon}</Box>
        <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Box>
    </Stack>
);

export default BarrierRow;
