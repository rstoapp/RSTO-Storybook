import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import BoxedIcon from './BoxedIcon';

const meta = {
    title: 'RSTO/Atoms/BoxedIcon',
    component: BoxedIcon,
    tags: ['autodocs'],
} satisfies Meta<typeof BoxedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <BoxedIcon>
            <DescriptionOutlinedIcon color="info" fontSize="large" />
        </BoxedIcon>
    ),
};

export const OrangeSurface: Story = {
    render: () => (
        <BoxedIcon sx={{ bgcolor: 'rstoOrange._10' }}>
            <BarChartOutlinedIcon sx={{ color: 'rstoOrange._70' }} fontSize="large" />
        </BoxedIcon>
    ),
};

export const BlueSurface: Story = {
    render: () => (
        <BoxedIcon sx={{ bgcolor: 'rstoBlue._10' }}>
            <FolderOutlinedIcon sx={{ color: 'rstoBlue._70' }} fontSize="large" />
        </BoxedIcon>
    ),
};
