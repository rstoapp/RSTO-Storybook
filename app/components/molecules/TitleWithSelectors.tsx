import * as React from 'react';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Selector from './Selector';
import type { SelectorProps } from './Selector';

export type TitleWithSelectorsProps = {
    elements: Array<string | SelectorProps>;
};

const TitleWithSelectors = ({ elements }: TitleWithSelectorsProps) => (
    <Stack direction="row" flexWrap="wrap" gap="4px">
        {elements.map((item, index) => {
            if (typeof item === 'string') {
                return (
                    <Typography
                        key={index}
                        variant="body1"
                        sx={{ fontWeight: 600, width: 'max-content', whiteSpace: 'pre-wrap' }}
                    >
                        {item}
                    </Typography>
                );
            }
            return (
                <Box key={index}>
                    <Selector {...item} />
                </Box>
            );
        })}
    </Stack>
);

export default TitleWithSelectors;
