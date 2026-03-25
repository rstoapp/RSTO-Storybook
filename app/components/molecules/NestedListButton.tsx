import * as React from 'react';
import { ListItemButtonProps, ListItemText, Typography } from '@mui/material';
import RstoListItemButton from './RstoListItemButton';

export interface NestedListButtonProps extends Omit<ListItemButtonProps, 'onClick'> {
    title: string;
    description: string;
    tag?: string;
    onClick?: () => void;
}

/**
 * A nested list item displaying a short indicator code (title) above a
 * description. Uses the left-border `.nested` state from RstoListItemButton.
 */
const NestedListButton = ({ title, description, tag, onClick, ...rest }: NestedListButtonProps) => {
    return (
        <RstoListItemButton className="nested" onClick={onClick} sx={{ pl: '22px' }} {...rest}>
            <ListItemText
                primary={
                    <Typography variant="overline" sx={{ lineHeight: 1.4, display: 'block' }}>
                        {title}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="text.primary">
                        {description}
                    </Typography>
                }
            />
        </RstoListItemButton>
    );
};

export default NestedListButton;
