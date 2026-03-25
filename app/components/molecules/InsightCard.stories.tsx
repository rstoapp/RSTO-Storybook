import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InsightCard from './InsightCard';

const meta: Meta<typeof InsightCard> = {
    title: 'RSTO/Molecules/InsightCard',
    component: InsightCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 420 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof InsightCard>;

export const Default: Story = {
    args: {
        insightName: 'Insight One',
        title: '84.2%',
        description: 'of children received their 12-month immunisation on time.',
    },
};

export const Loading: Story = {
    args: {
        insightName: 'Insight One',
        title: undefined,
        description: 'Title is loading — shows a Skeleton placeholder.',
    },
};

export const CustomLabel: Story = {
    args: {
        insightName: 'Key finding',
        title: '1 in 3',
        description: 'children are attending early childhood education.',
    },
};
