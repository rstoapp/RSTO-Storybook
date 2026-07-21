import * as React from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export interface DeleteButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
    label?: string;
}

const DeleteButton = ({ label = 'Delete', sx, ...buttonProps }: DeleteButtonProps) => (
    <Button
        variant="text"
        color="secondary"
        startIcon={<DeleteForeverOutlinedIcon />}
        sx={{
            color: 'rstoRed._50',
            '&:hover': { backgroundColor: 'rstoRed._10' },
            ...sx,
        }}
        {...buttonProps}
    >
        {label}
    </Button>
);

export default DeleteButton;
