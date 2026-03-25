import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import RstoChip from './RstoChip';
import RstoTooltip, { RstoTooltipProps } from './RstoTooltip';

export interface HeadingWithChipsProps {
    heading: string;
    headingTooltip?: RstoTooltipProps;
    chips: string[];
}

/**
 * A page or section heading followed by a horizontal row of RstoChips.
 * Used on indicator pages to show the indicator title and associated category tags.
 */
const HeadingWithChips = ({ heading, headingTooltip, chips }: HeadingWithChipsProps) => {
    return (
        <Stack spacing={1}>
            <Stack direction="row" alignItems="center">
                <Typography variant="h5" fontWeight={700}>
                    {heading}
                </Typography>
                {headingTooltip && <RstoTooltip {...headingTooltip} />}
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1}>
                {chips.map((chip) => (
                    <RstoChip key={chip} text={chip} variant="outlined" />
                ))}
            </Stack>
        </Stack>
    );
};

export default HeadingWithChips;
