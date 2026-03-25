import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack, Box, Skeleton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import InfoCard from './InfoCard';
import RstoTooltip, { RstoTooltipProps } from './RstoTooltip';

interface InsightCardProps {
    insightName?: string;
    title?: React.ReactNode;
    titleTooltip?: RstoTooltipProps;
    description?: React.ReactNode;
    icon?: React.ReactNode;
}

const InsightCard = ({
    insightName = 'Insight One',
    title,
    titleTooltip,
    description,
    icon,
}: InsightCardProps) => {
    return (
        <InfoCard sx={{ width: '100%', height: 'auto', flexGrow: 1, borderRadius: '8px' }}>
            <CardContent sx={{ padding: '24px' }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        {icon ? (
                            icon
                        ) : (
                            <LightbulbOutlinedIcon
                                sx={{ color: 'rstoBlue._60', width: '16px', height: '16px' }}
                            />
                        )}
                        <Typography
                            variant="overline"
                            sx={{
                                color: 'rstoBlue._60',
                                marginLeft: '8px',
                            }}
                        >
                            {insightName}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Box>
                        <Stack direction="row" alignItems="center">
                            <Typography
                                variant="h5"
                                color="rstoGray._90"
                                sx={{ fontWeight: '700', marginTop: '4px', marginBottom: '4px' }}
                            >
                                {title === undefined ? <Skeleton /> : title}
                            </Typography>
                            {titleTooltip && <RstoTooltip {...titleTooltip} variant="insight" />}
                        </Stack>
                        <Typography variant="body1" color="rstoGray._90">
                            {description}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </InfoCard>
    );
};

export default InsightCard;
