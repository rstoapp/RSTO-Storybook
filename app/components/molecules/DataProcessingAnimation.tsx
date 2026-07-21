import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
    0%, 100% { height: 20%; }
    50% { height: 100%; }
`;

const BAR_DELAYS = ['0s', '0.12s', '0.24s', '0.36s'];

/**
 * Animated equalizer bars used in place of a static icon to indicate that
 * data is actively being processed. Drop in as the `icon` prop on
 * `DataProcessingAlert` for the "Processing Data" state.
 */
const DataProcessingAnimation = () => {
    return (
        <Box width="100%" height="100%" display="flex" alignItems="flex-end" justifyContent="center" gap="6px">
            {BAR_DELAYS.map((delay, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '15%',
                        borderRadius: '3px',
                        bgcolor: (theme) => theme.palette.rstoOrange._50,
                        animation: `${bounce} 1.1s ease-in-out infinite`,
                        animationDelay: delay,
                    }}
                />
            ))}
        </Box>
    );
};

export default DataProcessingAnimation;
