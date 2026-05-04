import { ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styled MUI ListItemButton used as the base for all RSTO navigation list items.
 * Adds an orange left-border on the selected state for top-level items only.
 * Apply the `.nested` class to suppress the border on sub-menu items.
 */
const RstoListItemButton = styled(ListItemButton)(({ theme }) => ({
    paddingTop: '10px',
    paddingBottom: '10px',
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.rstoOrange._10,
        '&:hover': {
            backgroundColor: theme.palette.rstoOrange._10,
        },
    },
    '&:not(.nested).Mui-selected': {
        borderLeft: `2px solid ${theme.palette.rstoOrange._50}`,
    },
}));

export default RstoListItemButton;
