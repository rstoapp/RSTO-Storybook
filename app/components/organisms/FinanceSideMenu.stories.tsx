import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FinanceSideMenu from './FinanceSideMenu';

const meta: Meta<typeof FinanceSideMenu> = {
    title: 'RSTO/Organisms/FinanceSideMenu',
    component: FinanceSideMenu,
    tags: ['autodocs'],
    argTypes: {
        navItems:     { control: false },
        utilityItems: { control: false },
        onItemSelect: { control: false },
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
type Story = StoryObj<typeof FinanceSideMenu>;

export const DashboardOpen: Story = {
    args: {
        activeItemId: 'quantity-1',
        defaultOpenIds: ['dashboard', 'quantity'],
    },
};

export const QualityExpanded: Story = {
    args: {
        activeItemId: 'quality-1',
        defaultOpenIds: ['dashboard', 'quality'],
    },
};

export const ParticipationExpanded: Story = {
    args: {
        activeItemId: 'participation-2',
        defaultOpenIds: ['dashboard', 'participation'],
    },
};

export const AllGroupsOpen: Story = {
    args: {
        activeItemId: 'quantity-1',
        defaultOpenIds: ['dashboard', 'quality', 'quantity', 'participation'],
    },
};

export const UploadActive: Story = {
    args: {
        activeItemId: 'upload',
        defaultOpenIds: [],
    },
};

export const SettingsOpen: Story = {
    args: {
        activeItemId: 'directory',
        defaultOpenIds: ['settings'],
    },
};

export const AllCollapsed: Story = {
    args: {
        activeItemId: 'ci-planning',
        defaultOpenIds: [],
    },
};

export const EnvPreview: Story = {
    name: 'Environment — Preview',
    args: {
        activeItemId: 'quantity-1',
        defaultOpenIds: ['dashboard', 'quantity'],
        environment: 'preview',
    },
};

export const EnvCI: Story = {
    name: 'Environment — CI Planning',
    args: {
        activeItemId: 'quantity-1',
        defaultOpenIds: ['dashboard', 'quantity'],
        environment: 'ci',
    },
};

export const EnvProduction: Story = {
    name: 'Environment — Production (no badge)',
    args: {
        activeItemId: 'quantity-1',
        defaultOpenIds: ['dashboard', 'quantity'],
        environment: 'production',
    },
};