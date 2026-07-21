import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { fn } from 'storybook/test';
import { Box } from '@mui/material';
import UploadFileCard from './UploadFileCard';

const meta = {
    title: 'RSTO/Molecules/UploadFileCard',
    component: UploadFileCard,
    tags: ['autodocs'],
    decorators: [(Story) => <Box sx={{ maxWidth: 700 }}><Story /></Box>],
    args: {
        title: 'Age',
        acceptedFileFormats: ['csv'],
        onUpload: fn(),
        onDeleteFile: fn(),
    },
    parameters: {
        layout: 'padded',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component:
                    'A card representing a single uploadable dataset. Shows the dataset title, accepted formats, any uploaded files, and an upload/uploading/overwrite button. Pass `published={true}` to hide all write controls.',
            },
        },
    },
} satisfies Meta<typeof UploadFileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Idle — no file uploaded',
    args: { status: 'idle' },
};

export const Uploading: Story = {
    name: 'Uploading — in progress',
    args: { status: 'uploading', uploadProgress: 60 },
};

export const Uploaded: Story = {
    name: 'Uploaded — overwrite available',
    args: {
        status: 'uploaded',
        files: [
            { id: '1', documentName: 'Age.csv', downloadUrl: '#' },
        ],
    },
};

export const Published: Story = {
    name: 'Published — read-only',
    args: {
        published: true,
        status: 'uploaded',
        files: [
            { id: '1', documentName: 'Age.csv', downloadUrl: '#' },
        ],
    },
};

export const MultipleDatasets: Story = {
    name: 'Multiple cards (stacked)',
    render: (args) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 700 }}>
            <UploadFileCard {...args} title="Age" status="idle" files={[]} />
            <UploadFileCard {...args} title="Gender" status="uploading" uploadProgress={45} files={[]} />
            <UploadFileCard {...args} title="Postcode" status="uploaded" files={[{ id: '1', documentName: 'Postcode.csv', downloadUrl: '#' }]} />
        </Box>
    ),
};
