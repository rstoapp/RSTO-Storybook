import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AppSideMenu from './AppSideMenu';

const meta: Meta<typeof AppSideMenu> = {
    title: 'RSTO/Organisms/AppSideMenu',
    component: AppSideMenu,
    tags: ['autodocs'],
    argTypes: {
        navItems:     { control: false },
        utilityItems: { control: false },
        onItemSelect: { control: false },
        onLogout:     { control: false },
    },
    args: {
        onLogout: () => alert('Log out clicked'),
        defaultExpanded: true,
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#e3e3e3',
                    padding: '2rem',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof AppSideMenu>;

export const EnvCI: Story = {
    name: 'Environment Chip',
    args: {
        variant: 'service-provider',
        activeItemId: 'dashboard',
        orgName: 'Gowrie Victoria',
        defaultOpenIds: [],
        environment: 'ci',
    },
};

// ─── Variant stories ──────────────────────────────────────────────────────────

export const ServiceProvider: Story = {
    name: 'Service Provider',
    parameters: {
        docs: { description: { story: 'Single organisation managing one strategy. Nav items: Data, Upload, Plan, Resources. Use the `activeItemId` control to preview different active states.' } },
    },
    args: {
        variant: 'service-provider',
        activeItemId: 'dashboard',
        defaultOpenIds: [],
    },
};

export const Community: Story = {
    name: 'Community',
    parameters: {
        docs: { description: { story: 'Community facilitator overseeing multiple service providers. Nav items: Dashboard, Directory, CI Planning, Resources. Directory replaces the former Service Providers item — same underlying view, consistent naming across all user types.' } },
    },
    args: {
        variant: 'community',
        activeItemId: 'dashboard',
        defaultOpenIds: [],
    },
};

export const Hub: Story = {
    name: 'Hub',
    parameters: {
        docs: { description: { story: 'Hub coordinator overseeing a collection of service providers. Nav items: Directory, Planning, Resources.' } },
    },
    args: {
        variant: 'hub',
        activeItemId: 'dashboard',
        defaultOpenIds: [],
    },
};

export const Admin: Story = {
    name: 'Admin',
    parameters: {
        docs: { description: { story: 'RSTO platform administrator. Nav items: Directory, Resources, User Management. Utility: Feedback, Settings, Log out. Active state uses teal to visually distinguish from the orange service-provider/hub variants.' } },
    },
    args: {
        variant: 'admin',
        activeItemId: 'directory',
        brandName: 'RSTO Admin',
        defaultOpenIds: [],
    },
};