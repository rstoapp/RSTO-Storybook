import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export interface StatPillProps {
    label: string;
    value: string;
    badge?: React.ReactNode;
}

/**
 * An inline stat display: a trending icon, uppercase label, bold value, and an
 * optional badge (typically an RstoChip or small Typography). Used in the
 * insight summary row beneath InsightCard.
 */
const StatPill = ({ label, value, badge }: StatPillProps) => (
    <Stack direction="row" alignItems="center" spacing={1}>
        <TrendingUpIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
        <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 700, fontSize: 10 }}
        >
            {label}
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 12 }}>
            {value}
        </Typography>
        {badge}
    </Stack>
);

export default StatPill;
