import { Chip, ChipProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';

type RstoChipProps = ChipProps & { text: string };

const RstoChip = ({ text, ...chipProps }: RstoChipProps) => {
    return (
        <Chip
            {...chipProps}
            label={
                <Typography variant="caption" sx={{ fontWeight: '600' }}>
                    {text}
                </Typography>
            }
        />
    );
};

export default RstoChip;
