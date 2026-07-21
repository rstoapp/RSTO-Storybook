import { styled } from '@mui/material/styles';
import { StaticDatePicker } from '@mui/x-date-pickers';

const StyledStaticDatePicker = styled(StaticDatePicker)(({ theme }) => ({
    '.MuiDateCalendar-root': {
        height: 'fit-content',
        '.MuiPickersYear-yearButton.Mui-selected': {
            backgroundColor: theme.palette.rstoBlue._70,
            color: theme.palette.rstoGray.white,
        },
        '.MuiPickersMonth-monthButton.Mui-selected': {
            backgroundColor: theme.palette.rstoBlue._70,
            color: theme.palette.rstoGray.white,
        },
        '.Mui-disabled': {
            color: theme.palette.rstoGray._80,
            fontWeight: 300,
        },
    },
}));

export default StyledStaticDatePicker;
