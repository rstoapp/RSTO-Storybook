import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RstoTextField from './RstoTextField';

const meta = {
    title: 'RSTO/Atoms/RstoTextField',
    component: RstoTextField,
    tags: ['autodocs'],
    args: {
        label: 'Label',
        placeholder: 'Enter a value…',
    },
} satisfies Meta<typeof RstoTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: 'Some input value', onChange: () => {} },
};

export const Disabled: Story = {
    args: { disabled: true, value: 'Disabled field', onChange: () => {} },
};

export const Error: Story = {
    args: { error: true, helperText: 'This field is required' },
};

export const Multiline: Story = {
    args: {
        multiline: true,
        rows: 4,
        label: 'Notes',
        placeholder: 'Add your notes here…',
    },
};
