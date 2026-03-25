import BarChartIcon from '@mui/icons-material/BarChart';
import { Card, CardContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import RstoTooltip, { RstoTooltipProps } from '../../molecules/RstoTooltip';

interface ChartCardProps {
    chartName?: string;
    title: React.ReactNode;
    titleTooltip?: RstoTooltipProps;
    subTitle?: string;
    chart: React.ReactNode;
    footer?: React.ReactNode;
    isJustified?: boolean;
}

const ChartCard = ({ chartName = 'Chart One', title, titleTooltip, subTitle, chart, footer, isJustified = false }: ChartCardProps) => {
    const justifyContent = isJustified ? 'space-between' : 'flex-start';
    return (
        <Card sx={{ borderRadius: '8px', borderWidth: '2px', borderStyle: 'solid' }} variant="outlined">
            <CardContent sx={{ padding: '24px' }}>
                <Stack>
                    <Stack spacing={0.5} paddingBottom="16px">
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                            <Stack direction="row" alignItems="center">
                                <BarChartIcon sx={{ color: 'rstoOrange._50', width: '16px', height: '16px', marginBottom: '3px' }} />
                                <Typography
                                    variant="overline"
                                    sx={{ color: 'rstoOrange._50', marginLeft: '8px' }}
                                >
                                    {chartName}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="flex-start" justifyContent={justifyContent}>
                            {title}
                            {titleTooltip && <RstoTooltip {...titleTooltip} />}
                        </Stack>
                        {subTitle && <Typography color="rstoGray._90" variant="caption">{subTitle}</Typography>}
                    </Stack>
                    {chart}
                    {footer}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ChartCard;
