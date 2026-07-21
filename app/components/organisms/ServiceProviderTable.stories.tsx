import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ServiceProviderTable from './ServiceProviderTable';
import type { ServiceProvider } from './ServiceProviderTable';

const STRATEGIES_NQS = [
    { id: 's1', name: 'National Quality Standard', acronym: 'nqs' },
    { id: 's2', name: 'Child Development', acronym: 'cd' },
];

const SAMPLE_SERVICE_PROVIDERS: ServiceProvider[] = [
    {
        id: 'sp1',
        name: 'Sunshine Early Learning Centre',
        groupAlias: 'sunshine-elc',
        type: 'SERVICE_PROVIDER',
        strategies: [{ id: 's1', name: 'National Quality Standard', acronym: 'nqs' }],
    },
    {
        id: 'sp2',
        name: 'Riverdale Community Hub',
        groupAlias: 'riverdale-hub',
        type: 'COMMUNITY',
        strategies: STRATEGIES_NQS,
    },
    {
        id: 'sp3',
        name: 'Hillside Family Day Care',
        groupAlias: 'hillside-fdc',
        type: 'SERVICE_PROVIDER',
        strategies: [
            { id: 's1', name: 'National Quality Standard', acronym: 'nqs' },
            { id: 's3', name: 'Participation', acronym: 'p' },
        ],
    },
    {
        id: 'sp4',
        name: 'Northern Districts OSHC',
        groupAlias: 'northern-oshc',
        type: 'SERVICE_PROVIDER',
        strategies: [{ id: 's2', name: 'Child Development', acronym: 'cd' }],
    },
];

const COMMUNITY_PROVIDERS: ServiceProvider[] = [
    {
        id: 'c1',
        name: 'Greenfield Community Network',
        groupAlias: 'greenfield-cn',
        type: 'COMMUNITY',
        strategies: STRATEGIES_NQS,
    },
    {
        id: 'c2',
        name: 'Westside Family Support',
        groupAlias: 'westside-fs',
        type: 'COMMUNITY',
        strategies: [{ id: 's4', name: 'Family Engagement', acronym: 'fe' }],
    },
];

const meta = {
    title: 'RSTO/Organisms/ServiceProviderTable',
    component: ServiceProviderTable,
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
**ServiceProviderTable** — lists service providers with their type and strategies. Renders a
rounded-card-row table with separated rows (8px radius, #EFEFEF border).

Each row shows:
- **Name** — person icon + provider name
- **Type** — "Service Provider" or "Community"
- **Strategy** — comma-separated uppercase acronyms

Supports optional \`onRowClick\` for navigation. In rsto-app this triggers \`useRouter().push()\`;
in Storybook it is exposed as a Storybook action.
                `,
            },
        },
    },
    args: {
        onRowClick: fn(),
    },
} satisfies Meta<typeof ServiceProviderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — mixed SERVICE_PROVIDER and COMMUNITY types across four providers. */
export const Default: Story = {
    args: {
        serviceProviders: SAMPLE_SERVICE_PROVIDERS,
    },
};

/** ServiceProviders — all SERVICE_PROVIDER type rows. */
export const ServiceProviders: Story = {
    args: {
        serviceProviders: SAMPLE_SERVICE_PROVIDERS.filter((sp) => sp.type === 'SERVICE_PROVIDER'),
    },
};

/** Community — all COMMUNITY type rows. */
export const Community: Story = {
    args: {
        serviceProviders: COMMUNITY_PROVIDERS,
    },
};

/** Empty — no service providers in the list. */
export const Empty: Story = {
    args: {
        serviceProviders: [],
    },
};

/** WithRowClick — rows are clickable (pointer cursor visible on hover). */
export const WithRowClick: Story = {
    args: {
        serviceProviders: SAMPLE_SERVICE_PROVIDERS,
        onRowClick: fn(),
    },
};

/** SingleRow — one service provider for isolated layout review. */
export const SingleRow: Story = {
    args: {
        serviceProviders: [SAMPLE_SERVICE_PROVIDERS[0]],
    },
};
