import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Chip } from '@mui/material';

const meta: Meta<typeof DataGrid> = {
    title: 'RSTO/Organisms/DataGrid',
    component: DataGrid,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ width: '100%' }}>
                <Story />
            </Box>
        ),
    ],
    args: {
        rows,
        columns,
        autoHeight: true,
        disableRowSelectionOnClick: true,
    },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'provider', headerName: 'Provider', flex: 1, minWidth: 200 },
    { field: 'serviceType', headerName: 'Service Type', width: 180 },
    { field: 'cases', headerName: 'Active Cases', type: 'number', width: 130 },
    {
        field: 'completionRate',
        headerName: 'Completion Rate',
        width: 150,
        type: 'number',
        valueFormatter: (value: number) => `${value}%`,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 140,
        renderCell: (params) => (
            <Chip
                label={params.value}
                color={params.value === 'Active' ? 'success' : params.value === 'Under Review' ? 'warning' : 'default'}
                size="small"
            />
        ),
    },
];

const rows = [
    { id: 1, provider: 'Northern Family Services', serviceType: 'Out-of-Home Care', cases: 142, completionRate: 87, status: 'Active' },
    { id: 2, provider: 'Coastal Child Support', serviceType: 'Family Preservation', cases: 98, completionRate: 91, status: 'Active' },
    { id: 3, provider: 'Inland Youth Programs', serviceType: 'Early Intervention', cases: 75, completionRate: 78, status: 'Active' },
    { id: 4, provider: 'Metro Foster Network', serviceType: 'Out-of-Home Care', cases: 204, completionRate: 83, status: 'Under Review' },
    { id: 5, provider: 'Southern Care Alliance', serviceType: 'Family Preservation', cases: 61, completionRate: 94, status: 'Active' },
    { id: 6, provider: 'Eastern Support Services', serviceType: 'Early Intervention', cases: 89, completionRate: 72, status: 'Active' },
    { id: 7, provider: 'Regional Youth Network', serviceType: 'Out-of-Home Care', cases: 117, completionRate: 88, status: 'Active' },
    { id: 8, provider: 'Central Family Hub', serviceType: 'Family Preservation', cases: 43, completionRate: 96, status: 'Under Review' },
    { id: 9, provider: 'Western Communities', serviceType: 'Early Intervention', cases: 132, completionRate: 81, status: 'Active' },
    { id: 10, provider: 'Northside Foster Care', serviceType: 'Out-of-Home Care', cases: 58, completionRate: 89, status: 'Inactive' },
];

export const Default: Story = {};

export const WithPagination: Story = {
    args: {
        pageSizeOptions: [5, 10],
        initialState: { pagination: { paginationModel: { pageSize: 5 } } },
    },
};

export const Dense: Story = {
    args: { density: 'compact' },
};

export const WithCheckboxSelection: Story = {
    args: { checkboxSelection: true },
};
