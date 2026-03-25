import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IconNavRail from './IconNavRail';

const NAV_ITEMS = [
    { icon: DescriptionOutlinedIcon, label: 'Reports', id: 'reports' },
    { icon: CheckBoxOutlinedIcon, label: 'Tasks', id: 'tasks' },
    { icon: FolderOutlinedIcon, label: 'Files', id: 'files' },
    { icon: CalendarTodayOutlinedIcon, label: 'Calendar', id: 'calendar' },
    { icon: GroupOutlinedIcon, label: 'Team', id: 'team' },
    { icon: TrendingUpIcon, label: 'Analytics', id: 'analytics' },
    { icon: PublishOutlinedIcon, label: 'Upload', id: 'upload' },
];

const FOOTER_ITEMS = [
    { icon: SettingsOutlinedIcon, label: 'Settings', id: 'settings' },
];

const meta: Meta<typeof IconNavRail> = {
    title: 'RSTO/Molecules/IconNavRail',
    component: IconNavRail,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A slim vertical icon-only navigation rail with a logo, primary nav icons, and a footer section with settings and avatar.',
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ height: 800, display: 'flex' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        items: NAV_ITEMS,
        footerItems: FOOTER_ITEMS,
        selectedId: 'reports',
    },
};

export default meta;
type Story = StoryObj<typeof IconNavRail>;

export const Default: Story = {
    args: {},
};

export const NoSelection: Story = {
    name: 'No item selected',
    args: { selectedId: undefined },
};

export const AnalyticsSelected: Story = {
    name: 'Analytics selected',
    args: { selectedId: 'analytics' },
};
