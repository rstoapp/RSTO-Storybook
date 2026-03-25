import * as React from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import RstoListItemButton from './RstoListItemButton';

export interface ExpandableListButtonProps {
    text: string;
    /** Optional leading icon displayed before the label */
    icon?: OverridableComponent<SvgIconTypeMap>;
    open?: boolean;
    onClick?: () => void;
}

/**
 * A list item button that shows an expand/collapse chevron icon.
 * Optionally accepts a leading icon for section categorisation.
 * Used as the header row of a NestedListSection.
 */
const ExpandableListButton = ({ text, icon: Icon, open = false, onClick }: ExpandableListButtonProps) => {
    return (
        <RstoListItemButton onClick={onClick} sx={{ pl: '12px', gap: '9px' }}>
            {Icon && (
                <ListItemIcon sx={{ minWidth: 'unset' }}>
                    <Icon sx={{ fontSize: 16, color: 'text.primary' }} />
                </ListItemIcon>
            )}
            <ListItemText primary={text} primaryTypographyProps={{ variant: 'body2', fontWeight: 400 }} />
            {open ? (
                <ExpandLessIcon sx={{ color: 'rstoOrange._50', fontSize: 20 }} />
            ) : (
                <ExpandMoreIcon sx={{ fontSize: 20 }} />
            )}
        </RstoListItemButton>
    );
};

export default ExpandableListButton;
