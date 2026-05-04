import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Chip, Stack, Typography } from '@mui/material';
import DashboardLayout from './DashboardLayout';
import IndicatorDashboardNavigation from './IndicatorDashboardNavigation';
import PageLayout from './PageLayout';

const meta: Meta = {
    title: 'RSTO/Organisms/Layouts',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

// ── Shared fixtures ───────────────────────────────────────────────────────────

const ANC_INDEX = (
    <IndicatorDashboardNavigation
        title="Index"
        sections={[
            {
                open: false,
                headerButton: { text: 'Quantity' },
                nestedButtonGroups: [{ buttons: [{ title: 'QN1', description: 'Are there adequate antenatal care facilities?' }] }],
            },
            {
                open: true,
                headerButton: { text: 'Quality' },
                nestedButtonGroups: [{
                    buttons: [
                        { title: 'QL1', description: 'How many women have continuity of the same midwife?' },
                        { title: 'QL2', description: 'How many women have a complete record of routine test results?' },
                        { title: 'QL3', description: 'How many women have blood pressure checked at each appointment?' },
                    ],
                }],
            },
        ]}
    />
);

const PlaceholderContent = ({ label }: { label: string }) => (
    <Box
        sx={{
            height: 300,
            border: '2px dashed',
            borderColor: 'rstoGray._40',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Typography variant="body2" color="text.disabled">{label}</Typography>
    </Box>
);

// ── DashboardLayout ───────────────────────────────────────────────────────────

export const Dashboard: Story = {
    name: 'DashboardLayout',
    render: () => (
        <DashboardLayout
            header={<Typography variant="h2">Antenatal Care</Typography>}
            indexMenu={ANC_INDEX}
        >
            <PlaceholderContent label="Indicator content area" />
        </DashboardLayout>
    ),
};

export const DashboardNoHeader: Story = {
    name: 'DashboardLayout — no header',
    render: () => (
        <DashboardLayout indexMenu={ANC_INDEX}>
            <PlaceholderContent label="Indicator content area" />
        </DashboardLayout>
    ),
};

// ── PageLayout ────────────────────────────────────────────────────────────────

export const ServiceProviderIndicatorPage: Story = {
    name: 'PageLayout — indicator title under service provider name',
    parameters: {
        nextjs: { navigation: { pathname: '/dashboard' } },
    },
    render: () => (
        <PageLayout>
            <Stack spacing={0.5} mb={3}>
                <Typography variant="h1">
                    MARYBOROUGH DISTRICT HEALTH SERVICE
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mt: 1 }}>
                    Are there adequate antenatal care facilities?
                </Typography>
                <Box>
                    <Chip
                        label="QN1 | Quantity Indicator 01"
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: '6px', fontSize: 12 }}
                    />
                </Box>
            </Stack>
            <PlaceholderContent label="Indicator content area" />
        </PageLayout>
    ),
};

export const Page: Story = {
    name: 'PageLayout (full shell)',
    parameters: {
        nextjs: { navigation: { pathname: '/dashboard' } },
    },
    render: () => (
        <PageLayout>
            <DashboardLayout
                header={<Typography variant="h2">Antenatal Care</Typography>}
                indexMenu={ANC_INDEX}
            >
                <PlaceholderContent label="Indicator content area" />
            </DashboardLayout>
        </PageLayout>
    ),
};
