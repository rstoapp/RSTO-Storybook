import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Button } from '@mui/material';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DataProcessingAlert from './DataProcessingAlert';
import DataProcessingAnimation from './DataProcessingAnimation';

const meta: Meta<typeof DataProcessingAlert> = {
    title: 'RSTO/Molecules/DataStateViews',
    component: DataProcessingAlert,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box display="flex" justifyContent="center" alignItems="center" paddingTop="120px">
                <Story />
            </Box>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DataProcessingAlert>;

export const DataMissing: Story = {
    args: {
        title: 'Data missing',
        description: 'Data not provided or available for this indicator.',
        icon: (
            <AssignmentLateOutlinedIcon
                sx={{ color: (theme) => theme.palette.rstoOrange._50, width: '100%', height: '100%' }}
            />
        ),
        cta: (
            <Button color="primary" variant="contained" startIcon={<FileUploadOutlinedIcon />}>
                Upload data
            </Button>
        ),
    },
};

export const DataProcessing: Story = {
    args: {
        title: 'Processing Data',
        description: 'Your data is being processed.\nPlease check back later.',
        icon: <DataProcessingAnimation />,
    },
};
