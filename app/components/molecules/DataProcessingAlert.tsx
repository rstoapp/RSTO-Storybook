import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';

interface DataProcessingAlertProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const DataProcessingAlert = ({ title, description, icon }: DataProcessingAlertProps) => {
    return (
        <Stack spacing={1} width="fit-content" alignItems="center" textAlign="center">
            <Box
                width="64px"
                height="64px"
                bgcolor="rstoOrange._10"
                borderRadius="8px"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box width="48px" height="48px">
                    {icon}
                </Box>
            </Box>
            <Typography variant="body1" fontWeight={600}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre' }}>
                {description}
            </Typography>
        </Stack>
    );
};

export default DataProcessingAlert;
