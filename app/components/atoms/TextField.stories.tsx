import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from '@mui/material';

const meta: Meta<typeof TextField> = {
    title: 'RSTO/Atoms/TextField',
    component: TextField,
    tags: ['autodocs'],
    args: {
        label: 'Label',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['outlined', 'filled', 'standard'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium'],
        },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        multiline: { control: 'boolean' },
        rows: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Outlined: Story = {
    args: { variant: 'outlined', placeholder: 'Enter value' },
};

export const Filled: Story = {
    args: { variant: 'filled', placeholder: 'Enter value' },
};

export const Standard: Story = {
    args: { variant: 'standard', placeholder: 'Enter value' },
};

export const WithHelperText: Story = {
    args: { variant: 'outlined', helperText: 'Enter a value between 1 and 100' },
};

export const Error: Story = {
    args: {
        variant: 'outlined',
        error: true,
        defaultValue: 'invalid input',
        helperText: 'This field is required',
    },
};

export const Disabled: Story = {
    args: { variant: 'outlined', disabled: true, defaultValue: 'Read-only value' },
};

export const Multiline: Story = {
    args: { variant: 'outlined', multiline: true, rows: 4, label: 'Notes', placeholder: 'Add notes...' },
};
