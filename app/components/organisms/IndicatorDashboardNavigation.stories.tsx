import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import IndicatorDashboardNavigation from './IndicatorDashboardNavigation';

const meta: Meta<typeof IndicatorDashboardNavigation> = {
    title: 'RSTO/Organisms/IndicatorDashboardNavigation',
    component: IndicatorDashboardNavigation,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 288, background: '#fff', minHeight: '100vh' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof IndicatorDashboardNavigation>;

const ANC_SECTIONS = [
    {
        open: false,
        headerButton: { text: 'Quantity' },
        nestedButtonGroups: [
            {
                buttons: [
                    { title: 'QN1', description: 'Are there adequate antenatal care facilities?' },
                ],
            },
        ],
    },
    {
        open: true,
        headerButton: { text: 'Quality' },
        nestedButtonGroups: [
            {
                buttons: [
                    { title: 'QL1', description: 'How many women have continuity of the same midwife?' },
                    { title: 'QL2', description: 'How many women have a complete record of routine test results?' },
                    { title: 'QL3', description: 'How many women have blood pressure checked at each appointment?' },
                    { title: 'QL4', description: 'How many women have their BMI calculated and recorded?' },
                    { title: 'QL5', description: 'How many women are being asked about smoking?' },
                    { title: 'QL6', description: 'How many women are being asked about alcohol consumption?' },
                ],
            },
        ],
    },
    {
        open: false,
        headerButton: { text: 'Participation' },
        nestedButtonGroups: [
            {
                buttons: [
                    { title: 'P1', description: 'How many women are participating in antenatal care?' },
                    { title: 'P2', description: 'How many women attend the recommended number of visits?' },
                ],
            },
        ],
    },
];

export const Default: Story = {
    name: 'ANC index (Quality expanded)',
    args: {
        title: 'Index',
        sections: ANC_SECTIONS,
    },
};

export const AllCollapsed: Story = {
    name: 'All sections collapsed',
    args: {
        title: 'Index',
        sections: ANC_SECTIONS.map((s) => ({ ...s, open: false })),
    },
};

export const AllExpanded: Story = {
    name: 'All sections expanded',
    args: {
        title: 'Index',
        sections: ANC_SECTIONS.map((s) => ({ ...s, open: true })),
    },
};
