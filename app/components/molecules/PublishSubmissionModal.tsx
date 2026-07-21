import * as React from 'react';
import CtaModal from './CtaModal';

export interface PublishSubmissionModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

const PublishSubmissionModal = ({
    open,
    onClose,
    onConfirm,
    loading = false,
}: PublishSubmissionModalProps) => (
    <CtaModal
        open={open}
        onClose={onClose}
        title="Publish data?"
        body="All indicators for this reporting period will be published for this service provider. Once submitted, you will not be able to change any files."
        confirmText="Publish data"
        cancelText="Cancel"
        disabled={loading}
        onConfirm={onConfirm}
        onCancel={onClose}
    />
);

export default PublishSubmissionModal;
