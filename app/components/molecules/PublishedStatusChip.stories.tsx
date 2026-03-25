import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PublishedStatusChip from './PublishedStatusChip';

const meta: Meta<typeof PublishedStatusChip> = {
    title: 'RSTO/Molecules/PublishedStatusChip',
    component: PublishedStatusChip,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PublishedStatusChip>;

export const Published: Story = {
    args: { status: 'PUBLISHED' },
};

export const Draft: Story = {
    args: { status: 'DRAFT' },
};
