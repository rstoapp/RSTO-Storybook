import * as React from 'react';
import { Collapse, List } from '@mui/material';
import ExpandableListButton, { ExpandableListButtonProps } from './ExpandableListButton';
import NestedListButtonGroup, { NestedListButtonGroupProps } from './NestedListButtonGroup';
import { NestedListButtonProps } from './NestedListButton';

export interface NestedListSectionProps {
    open?: boolean;
    headerButton: ExpandableListButtonProps;
    nestedButtonGroups: NestedListButtonGroupProps[];
    onSelect?: (group: NestedListButtonGroupProps, button: NestedListButtonProps) => void;
}

/**
 * A collapsible section with an ExpandableListButton header controlling
 * visibility of its NestedListButtonGroups. Used in IndicatorDashboardNavigation.
 */
const NestedListSection = ({ open = false, headerButton, nestedButtonGroups, onSelect }: NestedListSectionProps) => {
    const [isOpen, setIsOpen] = React.useState(open);

    return (
        <List disablePadding>
            <ExpandableListButton
                {...headerButton}
                open={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            />
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {nestedButtonGroups.map((group, index) => (
                    <NestedListButtonGroup
                        key={group.title ?? index}
                        {...group}
                        onSelect={(button) => onSelect?.(group, button)}
                    />
                ))}
            </Collapse>
        </List>
    );
};

export default NestedListSection;
