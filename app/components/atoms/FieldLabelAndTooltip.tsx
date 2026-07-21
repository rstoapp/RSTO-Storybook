import * as React from 'react';
import { Box, BoxProps, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface FieldLabelAndTooltipProps {
    label: string;
    /** Omit to render a plain label with no info icon — e.g. a section header that needs no explanation */
    tooltip?: React.ReactNode;
    required?: boolean;
    /** Override the default `mb: 1` — e.g. pass `{ mb: 0 }` when nesting inside a `Stack` that already provides the label-to-field gap, to avoid doubling it */
    sx?: BoxProps['sx'];
}

const SectionLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const FieldLabelAndTooltip: React.FC<FieldLabelAndTooltipProps> = ({
    label,
    tooltip,
    required = false,
    sx,
}) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, ...sx }}>
        <SectionLabel variant="subtitle2">
            {label}
            {required && '*'}
        </SectionLabel>
        {tooltip && (
            <Tooltip
                title={
                    <Box component="span" sx={{ whiteSpace: 'pre-line' }}>
                        {tooltip}
                    </Box>
                }
            >
                <InfoOutlinedIcon sx={{ fontSize: '16px', color: 'text.secondary' }} />
            </Tooltip>
        )}
    </Box>
);

export default FieldLabelAndTooltip;
