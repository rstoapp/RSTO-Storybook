import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const meta: Meta<typeof Radio> = {
    title: 'RSTO/Atoms/Radio',
    component: Radio,
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
    },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    render: () => (
        <FormControl>
            <FormLabel>Reporting period</FormLabel>
            <RadioGroup defaultValue="quarterly">
                <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                <FormControlLabel value="quarterly" control={<Radio />} label="Quarterly" />
                <FormControlLabel value="annual" control={<Radio />} label="Annual" />
            </RadioGroup>
        </FormControl>
    ),
};

export const Row: Story = {
    render: () => (
        <FormControl>
            <FormLabel>View</FormLabel>
            <RadioGroup defaultValue="summary" row>
                <FormControlLabel value="summary" control={<Radio />} label="Summary" />
                <FormControlLabel value="detail" control={<Radio />} label="Detail" />
                <FormControlLabel value="export" control={<Radio />} label="Export" />
            </RadioGroup>
        </FormControl>
    ),
};

export const WithDisabled: Story = {
    render: () => (
        <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup defaultValue="active">
                <FormControlLabel value="active" control={<Radio />} label="Active" />
                <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                <FormControlLabel value="archived" control={<Radio disabled />} label="Archived (unavailable)" />
            </RadioGroup>
        </FormControl>
    ),
};
