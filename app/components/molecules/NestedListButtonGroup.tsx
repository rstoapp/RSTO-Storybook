import * as React from 'react';
import { List, Typography } from '@mui/material';
import NestedListButton, { NestedListButtonProps } from './NestedListButton';

export interface NestedListButtonGroupProps {
    title?: string;
    buttons: NestedListButtonProps[];
    onSelect?: (button: NestedListButtonProps) => void;
}

/**
 * Groups one or more NestedListButtons under an optional overline title.
 * Used to cluster related indicators within a collapsible section.
 */
const NestedListButtonGroup = ({ title, buttons, onSelect }: NestedListButtonGroupProps) => {
    return (
        <>
            {title && (
                <Typography
                    variant="overline"
                    sx={{ px: '22px', pt: 1, display: 'block', color: 'text.secondary' }}
                >
                    {title}
                </Typography>
            )}
            <List disablePadding>
                {buttons.map((button) => (
                    <NestedListButton
                        key={button.tag ?? button.title}
                        {...button}
                        onClick={() => onSelect?.(button)}
                    />
                ))}
            </List>
        </>
    );
};

export default NestedListButtonGroup;
