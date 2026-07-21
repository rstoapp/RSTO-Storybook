import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import UserTable from './UserTable';
import type { User } from './UserTable';

const SEVEN_DAYS_AGO = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
const THREE_DAYS_AGO = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
const NINE_DAYS_AGO = new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString();

const ACTIVE_USER: User = {
    username: 'sarah.mitchell',
    email: 'sarah.mitchell@example.com',
    displayName: 'Sarah Mitchell',
    role: 'Service Provider',
    uiStatus: 'Active',
    status: 'CONFIRMED',
    enabled: true,
    created: THIRTY_DAYS_AGO,
    lastModified: SEVEN_DAYS_AGO,
    lastAccess: new Date(THREE_DAYS_AGO),
    groups: ['service-provider:sunshine-elc'],
};

const ADMIN_USER: User = {
    username: 'james.okafor',
    email: 'james.okafor@example.com',
    displayName: 'James Okafor',
    role: 'Admin',
    uiStatus: 'Active',
    status: 'CONFIRMED',
    enabled: true,
    created: THIRTY_DAYS_AGO,
    lastModified: SEVEN_DAYS_AGO,
    lastAccess: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    groups: ['rstoadmin'],
};

const VIEW_ONLY_USER: User = {
    username: 'priya.natarajan',
    email: 'priya.natarajan@example.com',
    displayName: 'Priya Natarajan',
    role: 'View Only',
    uiStatus: 'Active',
    status: 'CONFIRMED',
    enabled: true,
    created: THIRTY_DAYS_AGO,
    lastModified: THIRTY_DAYS_AGO,
    lastAccess: new Date(SEVEN_DAYS_AGO),
    groups: ['view-only:riverdale-hub'],
};

const INVITED_USER: User = {
    username: 'alex.chen',
    email: 'alex.chen@example.com',
    displayName: 'Alex Chen',
    role: 'Service Provider',
    uiStatus: 'Invited',
    status: 'FORCE_CHANGE_PASSWORD',
    enabled: true,
    created: THREE_DAYS_AGO,
    lastModified: THREE_DAYS_AGO,
    lastAccess: undefined,
    groups: ['service-provider:hillside-fdc'],
};

const EXPIRED_INVITE_USER: User = {
    username: 'riley.park',
    email: 'riley.park@example.com',
    displayName: 'Riley Park',
    role: 'Service Provider',
    uiStatus: 'Invited',
    status: 'FORCE_CHANGE_PASSWORD',
    enabled: true,
    created: NINE_DAYS_AGO,
    lastModified: NINE_DAYS_AGO,
    lastAccess: undefined,
    groups: ['service-provider:northern-oshc'],
};

const NO_GROUPS_USER: User = {
    username: 'morgan.lee',
    email: 'morgan.lee@example.com',
    displayName: 'Morgan Lee',
    role: 'View Only',
    uiStatus: 'Active',
    status: 'CONFIRMED',
    enabled: true,
    created: THIRTY_DAYS_AGO,
    lastModified: THIRTY_DAYS_AGO,
    lastAccess: new Date(SEVEN_DAYS_AGO),
    groups: [],
};

const meta = {
    title: 'RSTO/Organisms/UserTable',
    component: UserTable,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
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
**UserTable** — displays platform users with their access groups, status, invite date, and last access.

Renders a rounded-card-row table. Each row shows:
- **User** — person icon, display name, email
- **Access Groups** — chips with role-specific icons (admin=red, view-only=blue, service-provider=orange)
- **Status** — Active (green check), Invited (orange clock), Expired (red warning)
- **Invited on** — formatted creation date
- **Last Access** — relative (≤7 days) or absolute date
- **Actions** — three-dot menu with Edit, Re-invite (invited/expired only), Delete

Status rules:
- \`Invited\` invite older than 7 days → displayed as **Expired** with warning icon
- Re-invite menu item shown only for Invited or Expired users
                `,
            },
        },
    },
    args: {
        onEditUser: fn(),
        onDeleteUser: fn(),
        onReinviteUser: fn(),
    },
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — single active service provider user. */
export const Default: Story = {
    args: {
        users: [ACTIVE_USER],
        loading: false,
    },
};

/** MixedStatuses — active, invited, and expired invite users together. */
export const MixedStatuses: Story = {
    args: {
        users: [ACTIVE_USER, ADMIN_USER, VIEW_ONLY_USER, INVITED_USER, EXPIRED_INVITE_USER],
        loading: false,
    },
};

/** AdminUser — rstoadmin group chip with red manage-accounts icon. */
export const AdminUser: Story = {
    args: {
        users: [ADMIN_USER],
        loading: false,
    },
};

/** WithNoGroups — user assigned to no access groups shows "No Groups" chip. */
export const WithNoGroups: Story = {
    args: {
        users: [NO_GROUPS_USER],
        loading: false,
    },
};

/** ExpiredInvite — invite older than 7 days shown with Expired status and warning icon. */
export const ExpiredInvite: Story = {
    args: {
        users: [EXPIRED_INVITE_USER],
        loading: false,
    },
};

/** Loading — spinner shown while users are being fetched. */
export const Loading: Story = {
    args: {
        users: [],
        loading: true,
    },
};

/** Empty — no users in the table (renders empty table body). */
export const Empty: Story = {
    args: {
        users: [],
        loading: false,
    },
};
