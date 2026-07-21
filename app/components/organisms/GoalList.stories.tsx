import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import GoalList from './GoalList';
import type { GoalData } from './GoalList';

const SAMPLE_GOALS: GoalData[] = [
    {
        id: 1,
        indicatorId: 'nqs_ql_1',
        indicatorTitle: 'NQS Quality Area 1',
        centreId: 'Centre A',
        baseline: 'Current curriculum documentation is inconsistent across rooms.',
        ifStatement: 'we implement a shared curriculum planning template',
        thenStatement: 'all rooms will use consistent documentation practices',
        soThatStatement: 'children receive equitable learning experiences across the service',
        createdByName: 'Sarah Mitchell',
        status: 'ongoing',
        createdDate: '2026-03-01',
        updatedDate: '2026-06-15',
        cycles: [
            { id: 1, name: 'Cycle 1 — Term 1', status: 'completed' },
            { id: 2, name: 'Cycle 2 — Term 2', status: 'ongoing' },
        ],
    },
    {
        id: 2,
        indicatorId: 'nqs_qn_3',
        indicatorTitle: 'Educator-to-child ratios',
        baseline: 'Staffing gaps during peak hours affect supervision quality.',
        ifStatement: 'we review and adjust rostering to address peak-hour gaps',
        thenStatement: 'educator-to-child ratios will meet NQS requirements at all times',
        soThatStatement: 'children are always adequately supervised and supported',
        createdByName: 'James Okafor',
        status: 'completed',
        createdDate: '2025-10-12',
        updatedDate: '2026-04-01',
        cycles: [{ id: 3, name: 'Cycle 1 — Term 4 2025', status: 'completed' }],
    },
    {
        id: 3,
        indicatorId: 'nqs_p_2',
        indicatorTitle: 'Family participation',
        centreId: 'Hub — All Centres',
        baseline: 'Family engagement events attract fewer than 20% of enrolled families.',
        ifStatement: 'we co-design family engagement opportunities with families',
        thenStatement: 'participation rates will increase by 30% within two terms',
        soThatStatement: "families feel valued as partners in their children's learning",
        createdByName: 'Priya Natarajan',
        status: 'inactive',
        createdDate: '2026-01-20',
        updatedDate: '2026-01-20',
    },
];

const meta = {
    title: 'RSTO/Organisms/GoalList',
    component: GoalList,
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
**GoalList** — the CI Planning goal list organism. Renders a stack of goal cards for a service
provider's CI strategy. Each card shows the indicator category, status, goal title (soThat statement),
if/then/so that body, and a footer with cycle count, creation date, and creator name.

Supports four states: **Loading** (spinner), **ErrorState** (alert + retry), **Empty** (placeholder),
and **Default** (populated list).

- Self-contained Storybook version — no MobX, no API hooks. Driven by \`goals: GoalData[]\` prop.
- Status colours: ongoing (blue), completed (green), inactive (grey).
- Category chips: Quality / Quantity / Participation / Other (derived from \`indicatorId\` suffix).
- \`onShowDetails\` controls visibility of the "Show details" button on each card.
                `,
            },
        },
    },
    args: {
        onShowDetails: fn(),
        onEditGoal: fn(),
        onRetry: fn(),
    },
} satisfies Meta<typeof GoalList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — three goals spanning all statuses and categories (Quality, Quantity, Participation). */
export const Default: Story = {
    args: {
        goals: SAMPLE_GOALS,
        loading: false,
    },
};

/** Loading — spinner shown while goals are being fetched. */
export const Loading: Story = {
    args: {
        goals: [],
        loading: true,
    },
};

/** ErrorState — fetch failure with retry button. */
export const ErrorState: Story = {
    args: {
        goals: [],
        loading: false,
        error: 'Failed to load goals. Please check your connection and try again.',
    },
};

/** Empty — no goals exist yet for this CI strategy. */
export const Empty: Story = {
    args: {
        goals: [],
        loading: false,
    },
};

/** SingleGoal — one card, no "Show details" button. */
export const SingleGoal: Story = {
    args: {
        goals: [SAMPLE_GOALS[0]],
        loading: false,
        onShowDetails: undefined,
    },
};

/** NoCycles — goals with no cycle data in the footer. */
export const NoCycles: Story = {
    args: {
        goals: SAMPLE_GOALS.map(({ cycles: _cycles, ...rest }) => rest),
        loading: false,
    },
};
