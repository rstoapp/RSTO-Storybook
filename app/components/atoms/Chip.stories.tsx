import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chip } from '@mui/material';

const meta: Meta<typeof Chip> = {
    title: 'RSTO/Atoms/Chip',
    component: Chip,
    tags: ['autodocs'],
    args: {
        label: 'Status label',
    },
    argTypes: {
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
    args: { color: 'default', label: 'Default' },
};

export const Primary: Story = {
    args: { color: 'primary', label: 'Published' },
};

export const Secondary: Story = {
    args: { color: 'secondary', label: 'Draft' },
};
