'use client';
import * as React from 'react';
import { List, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Stack } from '@mui/system';
import NestedListSection, { NestedListSectionProps } from '../molecules/NestedListSection';
import { NestedListButtonGroupProps } from '../molecules/NestedListButtonGroup';
import { NestedListButtonProps } from '../molecules/NestedListButton';

export interface IndicatorDashboardNavigationProps {
    title: string;
    sections: NestedListSectionProps[];
    onSelect?: (
        section: NestedListSectionProps,
        group: NestedListButtonGroupProps,
        button: NestedListButtonProps
    ) => void;
}

/**
 * The left-hand INDEX panel on indicator dashboard pages. Renders a titled list
 * of collapsible NestedListSections (e.g. Quantity, Quality) each containing
 * groups of indicator nav items.
 */
const IndicatorDashboardNavigation = ({
    title,
    sections,
    onSelect,
}: IndicatorDashboardNavigationProps) => {
    return (
        <Stack sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ px: '24px', py: 2 }}>
                <FormatListBulletedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="overline">
                    {title}
                </Typography>
            </Stack>
            <List disablePadding>
                {sections.map((section, index) => (
                    <NestedListSection
                        key={section.headerButton.text ?? index}
                        {...section}
                        onSelect={(group, button) => onSelect?.(section, group, button)}
                    />
                ))}
            </List>
        </Stack>
    );
};

export default IndicatorDashboardNavigation;
