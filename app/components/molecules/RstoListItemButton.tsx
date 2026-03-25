import { ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styled MUI ListItemButton used as the base for all RSTO navigation list items.
 * Adds an orange left-border on the selected state and a gray border on hover
 * via the `.nested` class modifier.
 */
const RstoListItemButton = styled(ListItemButton)(({ theme }) => ({
    paddingTop: '6px',
    paddingBottom: '6px',
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&.nested': {
        borderLeft: '2px solid transparent',
        '&:hover': {
            borderLeftColor: theme.palette.rstoGray._40,
        },
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.rstoOrange._10,
        borderLeft: `2px solid ${theme.palette.rstoOrange._50}`,
        '&:hover': {
            backgroundColor: theme.palette.rstoOrange._10,
            borderLeftColor: theme.palette.rstoOrange._50,
        },
    },
}));

export default RstoListItemButton;
