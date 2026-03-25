import { Box, Typography, useTheme } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

interface EmptyChartStateProps {
    message?: string;
}

const EmptyChartState = ({ message = 'No data available for this reporting period' }: EmptyChartStateProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                padding: theme.spacing(4),
                backgroundColor: theme.palette.grey[50],
                borderRadius: theme.shape.borderRadius,
                border: `1px dashed ${theme.palette.grey[300]}`,
            }}
        >
            <BarChartIcon sx={{ fontSize: '64px', color: theme.palette.grey[400], marginBottom: theme.spacing(2) }} />
            <Typography variant="body1" color={theme.palette.text.secondary} textAlign="center">
                {message}
            </Typography>
        </Box>
    );
};

export default EmptyChartState;
