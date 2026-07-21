import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from '@mui/material';
import DataProcessingAnimation from './DataProcessingAnimation';
import DataProcessingAlert from './DataProcessingAlert';

const meta = {
    title: 'RSTO/Molecules/DataProcessingAnimation',
    component: DataProcessingAnimation,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box display="flex" justifyContent="center" alignItems="center" paddingTop="120px">
                <Story />
            </Box>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component:
                    'Animated equalizer bars shown in the icon slot of `DataProcessingAlert` to indicate that data is actively being processed, replacing a static icon.',
            },
        },
    },
} satisfies Meta<typeof DataProcessingAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standalone: Story = {
    render: () => (
        <Box width="48px" height="48px">
            <DataProcessingAnimation />
        </Box>
    ),
};

export const InContext: Story = {
    name: 'In context (DataProcessingAlert)',
    render: () => (
        <DataProcessingAlert
            title="Processing Data"
            description={'Your data is being processed.\nPlease check back later.'}
            icon={<DataProcessingAnimation />}
        />
    ),
};
