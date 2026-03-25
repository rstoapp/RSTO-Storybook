import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '@mui/material';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuItem from './MenuItem';

const meta: Meta<typeof MenuItem> = {
    title: 'RSTO/Molecules/MenuItem',
    component: MenuItem,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ background: '#fff', padding: 24, width: 120, display: 'flex', justifyContent: 'center' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        icon: BarChartRoundedIcon,
        label: 'Data',
        href: '/dashboard',
        selected: false,
    },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
    args: { selected: false },
};

export const Selected: Story = {
    args: { selected: true },
};

export const AllItems: Story = {
    render: () => (
        <Stack spacing={2} alignItems="center">
            <MenuItem icon={BarChartRoundedIcon} label="Data" href="/dashboard" selected={true} />
            <MenuItem icon={UploadRoundedIcon} label="Upload" href="/upload" selected={false} />
            <MenuItem icon={LogoutRoundedIcon} label="Log out" href="/logout" selected={false} />
        </Stack>
    ),
};
