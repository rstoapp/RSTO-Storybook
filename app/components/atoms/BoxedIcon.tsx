import * as React from 'react';
import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';

/**
 * A 48×48 rounded container for icons. Used as a visual badge/icon wrapper
 * in cards and list items. Accepts all MUI Box props for colour customisation.
 */
const BoxedIcon = ({ children, ...boxProps }: React.PropsWithChildren<BoxProps>) => {
    return (
        <Box
            width={48}
            height={48}
            borderRadius={2}
            alignItems="center"
            justifyContent="center"
            display="flex"
            {...boxProps}
        >
            {children}
        </Box>
    );
};

export default BoxedIcon;
