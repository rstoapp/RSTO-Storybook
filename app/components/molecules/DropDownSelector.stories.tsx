import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/material';
import DropDownSelector from './DropDownSelector';

const OPTIONS = [
    { label: 'Antenatal Care', value: 'antenatal' },
    { label: 'Postnatal Care', value: 'postnatal' },
    { label: 'Birth Services', value: 'birth' },
    { label: 'Early Childhood', value: 'early-childhood' },
];

const meta = {
    title: 'RSTO/Molecules/DropDownSelector',
    component: DropDownSelector,
    tags: ['autodocs'],
    decorators: [(Story) => <Box sx={{ width: 280 }}><Story /></Box>],
    args: {
        options: OPTIONS,
        value: null,
        onChange: () => {},
        placeholder: 'Select a service type',
    },
} satisfies Meta<typeof DropDownSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: 'antenatal' },
};

export const WithStartIcon: Story = {
    args: {
        startIcon: <FilterListIcon fontSize="small" />,
        placeholder: 'Filter by type',
    },
};

export const Clearable: Story = {
    args: {
        value: 'postnatal',
        allowClear: true,
    },
};
