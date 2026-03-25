import * as React from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

export interface AlertSnackbarProps {
    open: boolean;
    autoHideDuration?: number;
    onClose: () => void;
    severity: AlertColor;
    children: React.ReactNode;
}

/**
 * MUI Snackbar + Alert combo positioned at the top-centre of the screen.
 * Used for all global feedback messages (success, error, warning, info).
 */
const AlertSnackbar = ({
    open,
    autoHideDuration = 4000,
    onClose,
    severity,
    children,
}: AlertSnackbarProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
