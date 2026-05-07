'use client';
import * as React from 'react';
import { ButtonBase } from '@mui/material';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { P, CHART_FONT_FAMILY } from '../organisms/charts/chart-theme';

export interface FilterChipProps {
    /** Label shown before the colon — e.g. "Site" → "Site: All sites". */
    label: string;
    /** Currently selected value. */
    value: string;
    /** Whether the associated dropdown is open. Controls background + colour state. */
    open?: boolean;
    /** If provided, renders as an interactive button. Omit for display-only use. */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * FilterChip — ghost-button filter pill for ChartCard and dashboard headers.
 *
 * Renders as a `ButtonBase` when `onClick` is supplied, or a static display
 * element when omitted. Hover and open states reveal a warm cream background.
 */
const FilterChip = ({ label, value, open = false, onClick }: FilterChipProps) => (
    <ButtonBase
        type="button"
        onClick={onClick}
        disableRipple
        aria-label={`Filter by ${label}: ${value}`}
        aria-expanded={onClick ? open : undefined}
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            px: '8px',
            py: '6px',
            borderRadius: '6px',
            background: open ? P.bone : 'transparent',
            cursor: onClick ? 'pointer' : 'default',
            fontFamily: CHART_FONT_FAMILY,
            fontSize: '11px',
            color: open ? P.ink : P.earth,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            transition: 'background 0.12s, color 0.12s',
            '&:hover': {
                background: P.bone,
                color: P.ink,
            },
        }}
    >
        <Box component="span" sx={{ fontWeight: 400 }}>{label}:</Box>
        <Box component="span" sx={{ color: P.earth, fontWeight: 600 }}>&nbsp;{value}</Box>
        <ArrowDropDownIcon aria-hidden="true" sx={{ fontSize: '16px', opacity: 0.6, ml: '-2px' }} />
    </ButtonBase>
);

export default FilterChip;
