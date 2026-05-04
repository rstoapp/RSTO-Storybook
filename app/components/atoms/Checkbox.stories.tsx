import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const meta: Meta<typeof Checkbox> = {
    title: 'RSTO/Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium'],
        },
        disabled: { control: 'boolean' },
        defaultChecked: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: { color: 'primary' },
};

export const Checked: Story = {
    args: { defaultChecked: true, color: 'primary' },
};

export const Indeterminate: Story = {
    args: { indeterminate: true, color: 'primary' },
};

export const WithLabel: Story = {
    render: (args) => (
        <FormControlLabel control={<Checkbox {...args} />} label="I agree to the terms" />
    ),
    args: { defaultChecked: true, color: 'primary' },
};

export const Group: Story = {
    render: () => (
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Option A" />
            <FormControlLabel control={<Checkbox />} label="Option B" />
            <FormControlLabel control={<Checkbox disabled />} label="Option C (disabled)" />
        </FormGroup>
    ),
};

export const Disabled: Story = {
    args: { disabled: true, defaultChecked: true },
};
