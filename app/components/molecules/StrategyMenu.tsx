import * as React from 'react';
import { Tab, Tabs, Typography } from '@mui/material';

export interface StrategyMenuItem {
    label: string;
    tag?: string;
}

export interface StrategyMenuProps {
    items: StrategyMenuItem[];
    selected: number;
    onClick: (item: StrategyMenuItem, index: number) => void;
}

/**
 * Tab-based strategy selector. Uses MUI Tabs styled via rstoTheme (orange
 * indicator, bold labels). Labels are rendered as h2 Typography so they appear
 * in the page heading hierarchy.
 */
const StrategyMenu = ({ items, selected, onClick }: StrategyMenuProps) => {
    return (
        <Tabs value={selected} onChange={(_, index) => onClick(items[index], index)}>
            {items.map((item, index) => (
                <Tab
                    key={item.tag ?? index}
                    label={<Typography variant="h2">{item.label}</Typography>}
                />
            ))}
        </Tabs>
    );
};

export default StrategyMenu;
