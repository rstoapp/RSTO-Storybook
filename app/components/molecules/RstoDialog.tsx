'use client';
import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export type RstoDialogProps = Omit<DialogProps, 'title'> & {
    title?: string;
    onClose: () => void;
    actions?: React.ReactNode;
};

const RstoDialog = ({ title, children, actions, onClose, ...props }: RstoDialogProps) => {
    return (
        <Dialog onClose={onClose} {...props}>
            <DialogTitle sx={{ pr: 6 }}>
                {title && <Typography variant="h6">{title}</Typography>}
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{ position: 'absolute', right: 12, top: 12 }}
                    aria-label="close"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
};

export default RstoDialog;
