import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RstoLink from './RstoLink';

const meta = {
    title: 'RSTO/Atoms/RstoLink',
    component: RstoLink,
    tags: ['autodocs'],
    args: {
        text: 'Download transformed data',
        href: '#',
    },
} satisfies Meta<typeof RstoLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExternalLink: Story = {
    args: {
        text: 'View documentation',
        href: 'https://example.com',
        target: '_blank',
    },
};
