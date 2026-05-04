import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppSideMenu, { RstoNavItem, RstoStrategy } from './AppSideMenu';

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

// ─── Strategy index embedded in the nav ───────────────────────────────────────

const ANC_STRATEGY: RstoStrategy = {
    id: 'anc',
    label: 'ANC',
    sections: [
        {
            id: 'anc-quantity',
            label: 'Quantity',
            items: [
                { id: 'anc-qn1', code: 'QN1', label: 'Are there adequate antenatal care facilities?' },
            ],
        },
        {
            id: 'anc-quality',
            label: 'Quality',
            items: [
                { id: 'anc-ql1', code: 'QL1', label: 'How many women have continuity of the same midwife?' },
                { id: 'anc-ql2', code: 'QL2', label: 'How many women have a complete record of routine test results?' },
                { id: 'anc-ql3', code: 'QL3', label: 'How many women have blood pressure checked at each appointment?' },
                { id: 'anc-ql4', code: 'QL4', label: 'How many women have their BMI calculated and recorded?' },
                { id: 'anc-ql5', code: 'QL5', label: 'How many women are being asked about smoking?' },
                { id: 'anc-ql6', code: 'QL6', label: 'How many women are being asked about alcohol consumption?' },
                { id: 'anc-ql16', code: 'QL16', label: 'How many women completed genetic screening for chromosomal abnormalities?' },
            ],
        },
        {
            id: 'anc-participation',
            label: 'Participation',
            items: [
                { id: 'anc-p1', code: 'P1A & P1B', label: 'How many women attended their first appointment in trimester one?' },
                { id: 'anc-p2', code: 'P2A & P2B', label: 'How many women attend the minimum recommended antenatal appointments?' },
            ],
        },
    ],
};

const ECEC_STRATEGY: RstoStrategy = {
    id: 'ecec',
    label: 'ECEC',
    sections: [
        {
            id: 'ecec-quantity',
            label: 'Quantity',
            items: [
                { id: 'ecec-qn1', code: 'QN1', label: 'Are there enough ECEC places?' },
            ],
        },
        {
            id: 'ecec-quality',
            label: 'Quality',
            items: [
                { id: 'ecec-ql1', code: 'QL1', label: 'Are we delivering quality services?' },
            ],
        },
        {
            id: 'ecec-participation',
            label: 'Participation',
            items: [
                { id: 'ecec-p1', code: 'P1 & P2', label: 'Are children attending the required amount of hours?' },
            ],
        },
    ],
};

const STRATEGY_NAV_ITEMS: RstoNavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlinedIcon sx={{ fontSize: 16 }} />,
        strategyGroups: [ANC_STRATEGY, ECEC_STRATEGY],
    },
    { id: 'upload',    label: 'Upload',    icon: <FileUploadOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'resources', label: 'Resources', icon: <FolderOutlinedIcon sx={{ fontSize: 16 }} /> },
];

const STRATEGY_UTILITY_ITEMS: RstoNavItem[] = [
    { id: 'support',  label: 'Support',  icon: <SupportAgentOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsOutlinedIcon sx={{ fontSize: 16 }} />, children: [
        { id: 'directory',        label: 'Directory' },
        { id: 'user-management',  label: 'User Management' },
    ]},
];

export const StrategyIndexEmbedded: Story = {
    name: 'Strategy + Index embedded (ANC active)',
    args: {
        navItems: STRATEGY_NAV_ITEMS,
        utilityItems: STRATEGY_UTILITY_ITEMS,
        activeItemId: 'anc-ql1',
        defaultOpenIds: ['dashboard'],
    },
};

export const StrategyIndexECECActive: Story = {
    name: 'Strategy + Index embedded (ECEC active)',
    args: {
        navItems: STRATEGY_NAV_ITEMS,
        utilityItems: STRATEGY_UTILITY_ITEMS,
        activeItemId: 'ecec-qn1',
        defaultOpenIds: ['dashboard'],
    },
};