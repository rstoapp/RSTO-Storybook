import * as React from 'react';
import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import RstoModal from '../atoms/RstoModal';
import type { RstoModalProps } from '../atoms/RstoModal';

export type CtaModalProps = RstoModalProps & {
    title: string;
    body: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    disabled?: boolean;
};

const CtaModal = ({
    title,
    body,
    confirmText,
    cancelText,
    onCancel,
    onConfirm,
    disabled,
    ...rstoModalProps
}: CtaModalProps) => (
    <RstoModal {...rstoModalProps}>
        <Stack spacing={2}>
            <Typography variant="h5">
                {title}
            </Typography>
            <Typography>{body}</Typography>
            <Stack justifyContent="end" direction="row" spacing={2}>
                <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    onClick={onCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    size="large"
                    color="primary"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    {confirmText}
                </Button>
            </Stack>
        </Stack>
    </RstoModal>
);

export default CtaModal;
