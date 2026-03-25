import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '@mui/material';
import RstoChip from './RstoChip';

const meta: Meta<typeof RstoChip> = {
    title: 'RSTO/Molecules/RstoChip',
    component: RstoChip,
    tags: ['autodocs'],
    args: {
        text: 'Label',
    },
    argTypes: {
        color: {
            control: 'select',
            options: ['default', 'primary', 'secondary'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof RstoChip>;

export const Default: Story = {
    args: { color: 'default', text: 'Default' },
};

export const Primary: Story = {
    args: { color: 'primary', text: 'Published' },
};

export const Secondary: Story = {
    args: { color: 'secondary', text: 'Draft' },
};

export const AllVariants: Story = {
    render: () => (
        <Stack direction="row" spacing={1}>
            <RstoChip text="Default" color="default" />
            <RstoChip text="Published" color="primary" />
            <RstoChip text="Draft" color="secondary" />
        </Stack>
    ),
};
