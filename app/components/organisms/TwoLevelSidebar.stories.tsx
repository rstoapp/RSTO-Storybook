import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import TwoLevelSidebar from './TwoLevelSidebar';

const NAV_ITEMS = [
    { icon: DashboardOutlinedIcon, label: 'Dashboard', id: 'dashboard' },
    { icon: FileUploadOutlinedIcon, label: 'Upload', id: 'upload' },
    { icon: BuildOutlinedIcon, label: 'CI Tool', id: 'ci-tool' },
    { icon: GridViewOutlinedIcon, label: 'Data View', id: 'data-view' },
];

const FOOTER_ITEMS = [
    { icon: AccountCircleOutlinedIcon, label: 'Profile', id: 'profile' },
    { icon: SettingsOutlinedIcon, label: 'Settings', id: 'settings' },
];

const SELECTOR_OPTIONS = [
    { label: 'ECEC', value: 'ecec' },
    { label: 'Parenting Programs', value: 'parenting' },
    { label: 'Antenatal Care', value: 'anc' },
];

const ECEC_SECTIONS = [
    {
        label: 'Quantity',
        icon: VisibilityOutlinedIcon,
        defaultOpen: true,
        items: [{ code: 'QN1', description: 'Are there enough ECEC places?' }],
    },
    {
        label: 'Quality',
        icon: GridViewOutlinedIcon,
        defaultOpen: true,
        items: [{ code: 'QL1', description: 'Are we delivering quality services?' }],
    },
    {
        label: 'Participation',
        icon: DescriptionOutlinedIcon,
        defaultOpen: true,
        items: [{ code: 'P1', description: 'Are we delivering quality services?' }],
    },
];

const ANC_SECTIONS = [
    {
        label: 'Quantity',
        icon: VisibilityOutlinedIcon,
        defaultOpen: false,
        items: [
            { code: 'QN1', description: 'Are there adequate antenatal care facilities?' },
        ],
    },
    {
        label: 'Quality',
        icon: GridViewOutlinedIcon,
        defaultOpen: true,
        items: [
            { code: 'QL1', description: 'How many women have continuity of the same midwife?' },
            { code: 'QL2', description: 'How many women have a complete record of routine test results?' },
            { code: 'QL3', description: 'How many women have blood pressure checked at each appointment?' },
            { code: 'QL4', description: 'How many women have their BMI calculated and recorded?' },
            { code: 'QL5', description: 'How many women are being asked about smoking?' },
            { code: 'QL6', description: 'How many women are being asked about alcohol consumption?' },
        ],
    },
    {
        label: 'Participation',
        icon: DescriptionOutlinedIcon,
        defaultOpen: false,
        items: [
            { code: 'P1', description: 'How many women are participating in antenatal care?' },
            { code: 'P2', description: 'How many women attend the recommended number of visits?' },
        ],
    },
];

const meta: Meta<typeof TwoLevelSidebar> = {
    title: 'RSTO/Organisms/TwoLevelSidebar',
    component: TwoLevelSidebar,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A two-level sidebar combining a slim IconNavRail with a collapsible detail panel. The detail panel contains a title, optional selector dropdown, search field, and expandable indicator sections.',
            },
        },
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '100vh', width: '100%', display: 'flex' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof TwoLevelSidebar>;

export const FigmaMatch: Story = {
    name: 'Figma match (no selector)',
    args: {
        navRailProps: {
            items: NAV_ITEMS,
            footerItems: FOOTER_ITEMS,
            selectedId: 'dashboard',
        },
        title: 'DASHBOARD',
        selectorOptions: [],
        searchPlaceholder: 'Search dashboard',
        sections: ECEC_SECTIONS,
    },
};

export const WithSelector: Story = {
    name: 'With service selector',
    args: {
        navRailProps: {
            items: NAV_ITEMS,
            footerItems: FOOTER_ITEMS,
            selectedId: 'dashboard',
        },
        title: 'DASHBOARD',
        selectorOptions: SELECTOR_OPTIONS,
        selectorValue: 'ecec',
        sections: ECEC_SECTIONS,
    },
};

export const AntenatalCare: Story = {
    name: 'Antenatal Care (many indicators)',
    args: {
        navRailProps: {
            items: NAV_ITEMS,
            footerItems: FOOTER_ITEMS,
            selectedId: 'dashboard',
        },
        title: 'DASHBOARD',
        selectorOptions: SELECTOR_OPTIONS,
        selectorValue: 'anc',
        sections: ANC_SECTIONS,
        selectedIndicator: 'QL2',
    },
};

export const DetailCollapsed: Story = {
    name: 'Detail panel collapsed',
    args: {
        navRailProps: {
            items: NAV_ITEMS,
            footerItems: FOOTER_ITEMS,
            selectedId: 'data-view',
        },
        title: 'DASHBOARD',
        selectorOptions: [],
        sections: ECEC_SECTIONS,
        detailOpen: false,
    },
};
