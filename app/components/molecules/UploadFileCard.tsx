import * as React from 'react';
import { Button, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FileSelectButton from '../atoms/FileSelectButton';
import RstoLink from '../atoms/RstoLink';

// ── TransformedFile ───────────────────────────────────────────────────────────

export interface TransformedFileData {
    id: string;
    documentName?: string;
    downloadUrl?: string;
}

export interface TransformedFileProps {
    file: TransformedFileData;
    published?: boolean;
    onDeleteFile?: (id: string) => void;
    disableDelete?: boolean;
}

/**
 * A single uploaded file row — shows filename, optional download link, and a
 * delete action (hidden when `published`).
 */
export const TransformedFile = ({
    file,
    published,
    onDeleteFile,
    disableDelete,
}: TransformedFileProps) => (
    <Stack direction="row" spacing={1} alignItems="center">
        {file.documentName && (
            <Typography variant="caption" fontWeight={600}>
                {file.documentName}
            </Typography>
        )}
        {file.downloadUrl && (
            <RstoLink href={file.downloadUrl} download={file.documentName} text="Download transformed data" />
        )}
        {file.id && !published && (
            <Button
                variant="text"
                sx={{ display: 'block', padding: 0, '&:hover': { backgroundColor: 'transparent' } }}
                disabled={disableDelete}
                size="small"
                color="inherit"
                onClick={() => onDeleteFile?.(file.id)}
            >
                <Stack direction="row" color="rstoRed._60" alignItems="center" spacing={0.3}>
                    <DeleteForeverOutlinedIcon sx={{ height: 14, width: 14 }} />
                    <Typography variant="caption" fontWeight={600}>Delete</Typography>
                </Stack>
            </Button>
        )}
    </Stack>
);

// ── FileUploadButton ──────────────────────────────────────────────────────────

interface FileUploadButtonProps {
    text: string;
    acceptedFileTypes?: string[];
    onSelectFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadButton = ({ text, ...props }: FileUploadButtonProps) => (
    <FileSelectButton variant="outlined" size="medium" color="secondary" {...props}>
        <Typography variant="button" color="rstoGray._90" fontWeight={600}>{text}</Typography>
    </FileSelectButton>
);

// ── FileUploadingButton ───────────────────────────────────────────────────────

interface FileUploadingButtonProps {
    text?: string;
    uploadProgress?: number;
}

const FileUploadingButton = ({ text = 'Uploading…', uploadProgress }: FileUploadingButtonProps) => (
    <Button
        variant="outlined"
        size="medium"
        color="secondary"
        sx={{
            cursor: 'default',
            '&.MuiButtonBase-root:hover': { bgcolor: 'transparent', borderColor: 'rstoGray._60' },
        }}
        disableRipple
    >
        <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress variant={uploadProgress !== undefined ? 'determinate' : 'indeterminate'} value={uploadProgress} color="info" size={18} />
            <Typography variant="button" color="rstoGray._90" fontWeight={600}>{text}</Typography>
        </Stack>
    </Button>
);

// ── UploadFileCard ────────────────────────────────────────────────────────────

export type UploadStatus = 'idle' | 'uploading' | 'uploaded';

export interface UploadFileCardProps {
    /** Dataset / file category label */
    title: string;
    /** Accepted file extensions, e.g. ['csv'] */
    acceptedFileFormats: string[];
    /** Called with the selected File when the user picks one */
    onUpload?: (file: File) => void;
    /** Current upload state */
    status?: UploadStatus;
    /** 0–100 upload progress (only shown when status is 'uploading') */
    uploadProgress?: number;
    /** Already-uploaded files to display */
    files?: TransformedFileData[];
    /** Called with the file id when the user clicks Delete */
    onDeleteFile?: (id: string) => void;
    /** File ids currently being deleted (disables their delete button) */
    deletingFileIds?: string[];
    /** When true, hides upload and delete controls */
    published?: boolean;
}

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

/**
 * A card representing a single uploadable dataset. Displays the dataset name,
 * accepted formats, any already-uploaded files, and an upload/uploading button.
 *
 * States: idle (Upload file), uploading (progress spinner), uploaded (Overwrite file).
 */
const UploadFileCard = ({
    title,
    acceptedFileFormats,
    onUpload,
    status = 'idle',
    uploadProgress,
    files = [],
    onDeleteFile,
    deletingFileIds = [],
    published = false,
}: UploadFileCardProps) => {
    const formatsLabel = acceptedFileFormats.map((f) => f.toUpperCase()).join(', ');

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) onUpload?.(file);
    };

    const uploadButton =
        status === 'uploading' ? (
            <FileUploadingButton text="Uploading…" uploadProgress={uploadProgress} />
        ) : (
            <FileUploadButton
                text={status === 'uploaded' ? 'Overwrite file' : 'Upload file'}
                acceptedFileTypes={acceptedFileFormats}
                onSelectFile={handleSelectFile}
            />
        );

    return (
        <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ padding: '24px', '&:last-child': { paddingBottom: '24px' } }}>
                <Stack direction="row">
                    <Stack direction="row" spacing={2}>
                        <DescriptionOutlinedIcon fontSize="large" color="info" />
                        <Stack spacing={1}>
                            <Typography variant="h5" fontWeight={600}>{title}</Typography>
                            <Typography variant="body2" color="rstoGray._90">
                                Accepted file formats: {formatsLabel}
                            </Typography>
                            {files.length > 0 && (
                                <Stack spacing={1}>
                                    {files.map((file, i) => (
                                        <TransformedFile
                                            key={file.id + i}
                                            file={file}
                                            published={published}
                                            onDeleteFile={onDeleteFile}
                                            disableDelete={deletingFileIds.includes(file.id)}
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                    {!published && (
                        <Box marginLeft="auto">{uploadButton}</Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default UploadFileCard;
