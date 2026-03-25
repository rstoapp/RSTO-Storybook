import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from '@mui/material';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DataProcessingAlert from './DataProcessingAlert';

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
        description: 'Data not provided or available for this indicator.\nPlease upload and check back later.',
        icon: (
            <AssignmentLateOutlinedIcon
                sx={{ color: (theme) => theme.palette.rstoOrange._50, width: '100%', height: '100%' }}
            />
        ),
    },
};

export const DataProcessing: Story = {
    args: {
        title: 'Processing Data',
        description: 'Your data is being processed.\nPlease check back later.',
        icon: (
            <HourglassEmptyOutlinedIcon
                sx={{ color: (theme) => theme.palette.rstoOrange._50, width: '100%', height: '100%' }}
            />
        ),
    },
};
