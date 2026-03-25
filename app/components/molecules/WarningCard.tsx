import Card, { CardProps } from '@mui/material/Card';
import * as React from 'react';
import { PropsWithChildren } from 'react';

const WarningCard = ({ children, ...cardProps }: PropsWithChildren<CardProps>) => {
    return (
        <Card
            {...cardProps}
            sx={{
                backgroundColor: 'rstoOrange._10',
                borderColor: 'rstoOrange._20',
                borderRadius: 2,
                borderWidth: '1px',
                borderStyle: 'solid',
                ...cardProps.sx,
            }}
        >
            {children}
        </Card>
    );
};

export default WarningCard;
