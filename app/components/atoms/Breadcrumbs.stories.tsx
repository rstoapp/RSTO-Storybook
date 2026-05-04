import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const meta: Meta<typeof Breadcrumbs> = {
    title: 'RSTO/Atoms/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    argTypes: {
        maxItems: { control: 'number' },
        separator: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
    render: () => (
        <Breadcrumbs>
            <Link underline="hover" color="inherit" href="#">Home</Link>
            <Link underline="hover" color="inherit" href="#">Services</Link>
            <Typography color="text.primary">Service Provider</Typography>
        </Breadcrumbs>
    ),
};

export const CustomSeparator: Story = {
    render: () => (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" href="#">Dashboard</Link>
            <Link underline="hover" color="inherit" href="#">Indicators</Link>
            <Typography color="text.primary">Child Safety</Typography>
        </Breadcrumbs>
    ),
};

export const Collapsed: Story = {
    render: () => (
        <Breadcrumbs maxItems={2}>
            <Link underline="hover" color="inherit" href="#">Home</Link>
            <Link underline="hover" color="inherit" href="#">Services</Link>
            <Link underline="hover" color="inherit" href="#">Providers</Link>
            <Link underline="hover" color="inherit" href="#">Reports</Link>
            <Typography color="text.primary">Q1 2025</Typography>
        </Breadcrumbs>
    ),
};
