import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import Selector, { SelectorProps } from './Selector';

export type TitleElement = string | SelectorProps;

export interface TitleWithSelectorsProps {
    elements: TitleElement[];
}

/**
 * Renders a row of mixed text strings and inline Selector dropdowns.
 * Used for chart titles where part of the title is user-selectable
 * (e.g. "Percentage of [metric ▾] by region").
 */
const TitleWithSelectors = ({ elements }: TitleWithSelectorsProps) => {
    return (
        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={0.5}>
            {elements.map((element, index) => {
                if (typeof element === 'string') {
                    return (
                        <Typography key={index} variant="body2" fontWeight={600}>
                            {element}
                        </Typography>
                    );
                }
                return <Selector key={index} {...element} />;
            })}
        </Stack>
    );
};

export default TitleWithSelectors;
