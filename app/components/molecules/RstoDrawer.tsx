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
    onClose: () => void;
    width?: number | string;
};

const RstoDrawer = ({ title, children, onClose, width = 400, ...props }: RstoDrawerProps) => {
    return (
        <Drawer anchor="right" onClose={onClose} {...props}>
            <Box sx={{ width, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 3, py: 2 }}
                >
                    {title && <Typography variant="h6">{title}</Typography>}
                    <IconButton onClick={onClose} size="small" sx={{ ml: 'auto' }} aria-label="close">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Stack>
                <Divider />
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>{children}</Box>
            </Box>
        </Drawer>
    );
};

export default RstoDrawer;
