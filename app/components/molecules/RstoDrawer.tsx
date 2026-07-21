'use client';
import * as React from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export type RstoDrawerProps = Omit<DrawerProps, 'anchor'> & {
    title?: string;
    /** Optional icon rendered to the left of the title. Can also be an interactive element (e.g. a back button) for multi-view drawers. */
    icon?: React.ReactNode;
    onClose: () => void;
    width?: number | string;
    /** Optional footer row (e.g. action buttons), rendered below a divider */
    footer?: React.ReactNode;
    /** Optional actions rendered in the header, before the close button (e.g. a delete icon in a detail view) */
    headerActions?: React.ReactNode;
};

const RstoDrawer = ({ title, icon, children, onClose, width = 400, footer, headerActions, ...props }: RstoDrawerProps) => {
    return (
        <Drawer
            anchor="right"
            onClose={onClose}
            sx={{ '& .MuiDrawer-paper': { maxWidth: '90vw' } }}
            {...props}
        >
            <Box sx={{ width, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 3, py: 2 }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {icon}
                        {title && <Typography variant="h4">{title}</Typography>}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ ml: 'auto' }}>
                        {headerActions}
                        <IconButton onClick={onClose} size="small" aria-label="close">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>
                <Divider />
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>{children}</Box>
                {footer && (
                    <>
                        <Divider />
                        <Box sx={{ p: 3 }}>{footer}</Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default RstoDrawer;
