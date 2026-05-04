import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,
} from '@mui/material';

const meta: Meta<typeof Table> = {
    title: 'RSTO/Atoms/Table',
    component: Table,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
    { provider: 'Northern Family Services', type: 'Out-of-Home Care', cases: 142, rate: '87%', status: 'Active' },
    { provider: 'Coastal Child Support', type: 'Family Preservation', cases: 98, rate: '91%', status: 'Active' },
    { provider: 'Inland Youth Programs', type: 'Early Intervention', cases: 75, rate: '78%', status: 'Active' },
    { provider: 'Metro Foster Network', type: 'Out-of-Home Care', cases: 204, rate: '83%', status: 'Under Review' },
    { provider: 'Southern Care Alliance', type: 'Family Preservation', cases: 61, rate: '94%', status: 'Active' },
];

export const Default: Story = {
    render: () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Provider</TableCell>
                        <TableCell>Service Type</TableCell>
                        <TableCell align="right">Active Cases</TableCell>
                        <TableCell align="right">Completion Rate</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.provider} hover>
                            <TableCell>{row.provider}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell align="right">{row.cases}</TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ),
};

export const Dense: Story = {
    render: () => (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Provider</TableCell>
                        <TableCell>Service Type</TableCell>
                        <TableCell align="right">Active Cases</TableCell>
                        <TableCell align="right">Completion Rate</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.provider} hover>
                            <TableCell>{row.provider}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell align="right">{row.cases}</TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ),
};
