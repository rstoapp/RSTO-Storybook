'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export interface FileSelectButtonProps extends ButtonProps<'label'> {
    acceptedFileTypes?: string[];
    onSelectFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A MUI Button rendered as a `<label>` that triggers a hidden file input.
 * Accessible — no visible input element, keyboard operable.
 */
const FileSelectButton = ({
    children,
    acceptedFileTypes = [],
    onSelectFile,
    ...buttonProps
}: FileSelectButtonProps) => {
    const formattedFileTypes = acceptedFileTypes
        .map((type) => {
            let fileType = type.toLowerCase();
            if (!fileType.includes('/') && !fileType.startsWith('.')) {
                fileType = `.${fileType}`;
            }
            return fileType;
        })
        .join(',');

    return (
        <Button {...buttonProps} component="label" role={undefined} tabIndex={-1}>
            {children}
            <VisuallyHiddenInput onChange={onSelectFile} type="file" accept={formattedFileTypes} />
        </Button>
    );
};

export default FileSelectButton;
