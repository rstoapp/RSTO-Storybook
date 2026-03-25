import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SideMenu from './SideMenu';

const DATA_ONLY = [
    { icon: BarChartRoundedIcon, label: 'Data', href: '/dashboard' },
    { icon: LogoutRoundedIcon, label: 'Log out', href: '/logout' },
];

const WITH_UPLOAD = [
    { icon: BarChartRoundedIcon, label: 'Data', href: '/dashboard' },
    { icon: UploadRoundedIcon, label: 'Upload', href: '/upload' },
    { icon: LogoutRoundedIcon, label: 'Log out', href: '/logout' },
];

const meta: Meta<typeof SideMenu> = {
    title: 'RSTO/Organisms/SideMenu',
    component: SideMenu,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ height: '100vh', display: 'flex' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const StandardUser: Story = {
    name: 'Standard user (Data + Logout)',
    args: { items: DATA_ONLY },
    parameters: {
        nextjs: { navigation: { pathname: '/dashboard' } },
    },
};

export const AdminUser: Story = {
    name: 'Admin user (Data + Upload + Logout)',
    args: { items: WITH_UPLOAD },
    parameters: {
        nextjs: { navigation: { pathname: '/dashboard' } },
    },
};

export const UploadActive: Story = {
    name: 'Upload active',
    args: { items: WITH_UPLOAD },
    parameters: {
        nextjs: { navigation: { pathname: '/upload' } },
    },
};
