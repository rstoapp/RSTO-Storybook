import * as React from 'react';
import { Box, Modal } from '@mui/material';

export interface RstoModalProps {
    open: boolean;
    onClose: () => void;
    width?: string;
    children?: React.ReactNode;
}

const RstoModal = ({ open, onClose, width = '480px', children }: RstoModalProps) => (
    <Modal
        open={open}
        onClose={() => onClose()}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <Box
            sx={{
                position: 'relative',
                width,
                maxWidth: '90vw',
                maxHeight: '90vh',
                bgcolor: 'rstoGray.white',
                padding: '24px',
                borderRadius: '8px',
                overflowY: 'auto',
            }}
        >
            {children}
        </Box>
    </Modal>
);

export default RstoModal;
