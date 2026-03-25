import Card, { CardProps } from '@mui/material/Card';
import * as React from 'react';
import { PropsWithChildren } from 'react';

const InfoCard = ({ children, ...cardProps }: PropsWithChildren<CardProps>) => {
    return (
        <Card
            {...cardProps}
            sx={{
                backgroundColor: 'rstoBlue._10',
                borderColor: 'rstoBlue._30',
                borderRadius: 2,
                borderWidth: '2px',
                borderStyle: 'solid',
                ...cardProps.sx,
            }}
        >
            {children}
        </Card>
    );
};

export default InfoCard;
