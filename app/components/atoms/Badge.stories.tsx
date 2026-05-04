import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

const meta: Meta<typeof Badge> = {
    title: 'RSTO/Atoms/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'],
        },
        variant: {
            control: 'select',
            options: ['standard', 'dot'],
        },
        badgeContent: { control: 'number' },
        max: { control: 'number' },
        invisible: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    render: (args) => <Badge {...args}><MailIcon /></Badge>,
    args: { badgeContent: 4, color: 'primary' },
};

export const Dot: Story = {
    render: (args) => <Badge {...args}><NotificationsIcon /></Badge>,
    args: { variant: 'dot', color: 'error' },
};

export const ErrorCount: Story = {
    render: (args) => <Badge {...args}><MailIcon /></Badge>,
    args: { badgeContent: 3, color: 'error' },
};

export const MaxValue: Story = {
    render: (args) => <Badge {...args}><NotificationsIcon /></Badge>,
    args: { badgeContent: 150, max: 99, color: 'primary' },
};
