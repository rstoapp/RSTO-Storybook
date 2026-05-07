import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: theme.palette.common.white,
        borderRadius: '6px',
        border: `2px solid ${theme.palette.rstoGray._40}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            borderColor: theme.palette.rstoBlue._50,
        },
        '&.Mui-focused': {
            borderColor: theme.palette.rstoBlue._70,
            boxShadow: `0 0 0 1px ${theme.palette.rstoBlue._20}`,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiInputBase-input': {
            fontSize: '1rem',
            '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 0.7,
            },
        },
    },
}));

export interface RstoTextFieldProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'outlined';
}

/**
 * RSTO-styled text field. Outlined variant only, with blue focus ring and
 * hover border. Wraps MUI TextField — all TextField props are supported.
 */
const RstoTextField = ({ variant = 'outlined', ...props }: RstoTextFieldProps) => {
    return <StyledTextField variant={variant} {...props} />;
};

export default RstoTextField;
