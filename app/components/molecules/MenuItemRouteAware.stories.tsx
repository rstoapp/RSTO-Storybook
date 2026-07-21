import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { Box } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuItemRouteAware from './MenuItemRouteAware';

const meta = {
    title: 'RSTO/Molecules/MenuItemRouteAware',
    component: MenuItemRouteAware,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
                <Story />
            </Box>
        ),
    ],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**MenuItemRouteAware** — route-aware navigation item for the RSTO app shell side menu.

Wraps \`MenuItem\` with \`usePathname()\` to auto-select when the current route matches \`href\`.
Also tracks a click flag so the item appears selected immediately on click (before route navigation resolves).

### Design tokens
- Idle: \`rstoGray._60\` icon, \`rstoGray._90\` label
- Hover: \`rstoBlue._10\` background, \`rstoBlue._20/_60\` icon
- Active/selected: \`rstoOrange._10\` background, \`rstoOrange._20/_50\` icon, bold label

### Props
- \`icon\`: MUI SvgIcon component (not an element)
- \`label\`: navigation label text
- \`href\`: route path — drives both the link and the selected state

### Storybook notes
\`@storybook/nextjs-vite\` mocks \`usePathname()\` automatically.
Use \`parameters.nextjs.navigation.pathname\` to control the mocked pathname per story.
                `,
            },
        },
        nextjs: {
            navigation: {
                pathname: '/other',
            },
        },
    },
    args: {
        icon: DashboardOutlinedIcon,
        label: 'Dashboard',
        href: '/dashboard',
        onClick: fn(),
    },
    argTypes: {
        icon: { control: false },
        label: { control: 'text' },
        href: { control: 'text' },
    },
} satisfies Meta<typeof MenuItemRouteAware>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — unselected, current route does not match href. */
export const Default: Story = {};

/** Active — route matches href, item renders in selected state. */
export const Active: Story = {
    name: 'Active (route match)',
    parameters: {
        nextjs: {
            navigation: {
                pathname: '/dashboard',
            },
        },
    },
};

/** Upload item — alternate icon and label. */
export const UploadItem: Story = {
    name: 'Upload item',
    args: {
        icon: UploadFileOutlinedIcon,
        label: 'Upload',
        href: '/upload',
    },
};

/** Side menu strip — four items rendered together showing the full nav context. */
export const SideMenuStrip: Story = {
    name: 'Side menu strip',
    parameters: {
        nextjs: {
            navigation: {
                pathname: '/reports',
            },
        },
    },
    render: (args) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '104px', p: 1 }}>
            <MenuItemRouteAware icon={DashboardOutlinedIcon} label="Dashboard" href="/dashboard" />
            <MenuItemRouteAware icon={UploadFileOutlinedIcon} label="Upload" href="/upload" />
            <MenuItemRouteAware icon={BarChartOutlinedIcon} label="Reports" href="/reports" />
            <MenuItemRouteAware icon={SettingsOutlinedIcon} label="Settings" href="/settings" />
        </Box>
    ),
};
