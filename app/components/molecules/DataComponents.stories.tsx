import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack, Typography } from '@mui/material';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import StatPill from './StatPill';
import PopBar from './PopBar';
import BarrierRow from './BarrierRow';
import RstoChip from './RstoChip';

/**
 * Stories for the three data-display molecules extracted from the
 * ServiceProvider page: StatPill, PopBar, and BarrierRow.
 */
const meta: Meta = {
    title: 'RSTO/Molecules/DataComponents',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ── StatPill ──────────────────────────────────────────────────────────────────

export const StatPillDefault: Story = {
    name: 'StatPill — plain',
    render: () => <StatPill label="ANC <14 WKS" value="71%" />,
};

export const StatPillWithBadge: Story = {
    name: 'StatPill — with chip badge',
    render: () => (
        <StatPill
            label="ANC <14 WKS"
            value="71%"
            badge={<RstoChip text="+3% vs prior 6mo" size="small" color="success" />}
        />
    ),
};

export const StatPillRow: Story = {
    name: 'StatPill — summary row',
    render: () => (
        <Stack direction="row" spacing={4} flexWrap="wrap">
            <StatPill label="ANC <14 WKS" value="71%" badge={<RstoChip text="+3% vs prior 6mo" size="small" color="success" />} />
            <StatPill label="Target" value="75%" badge={<Typography variant="caption" color="error">4 pts gap</Typography>} />
            <StatPill label="Enrolled" value="142" badge={<Typography variant="caption" color="text.secondary">pregnancies</Typography>} />
            <StatPill label="Community Avg" value="68%" badge={<RstoChip text="+3 pts above avg" size="small" color="success" />} />
        </Stack>
    ),
};

// ── PopBar ────────────────────────────────────────────────────────────────────

export const PopBarAboveTarget: Story = {
    name: 'PopBar — above target',
    render: () => (
        <PopBar label="Community" value={79} target={75} />
    ),
    decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const PopBarBelowTarget: Story = {
    name: 'PopBar — below target',
    render: () => (
        <PopBar label="Priority Population" value={58} target={75} />
    ),
    decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const PopBarGroup: Story = {
    name: 'PopBar — group',
    render: () => (
        <Stack spacing={3}>
            <PopBar label="Community" value={79} target={75} />
            <PopBar label="Priority Population" value={58} target={75} />
        </Stack>
    ),
    decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

// ── BarrierRow ────────────────────────────────────────────────────────────────

export const BarrierRowDefault: Story = {
    name: 'BarrierRow',
    render: () => (
        <BarrierRow
            icon={<DirectionsBusRoundedIcon sx={{ color: 'warning.main', fontSize: 18 }} />}
            title="Transport access for rural clients"
            description="Clients in outer suburbs struggle to attend clinic appointments — transport is the most cited barrier."
        />
    ),
};

export const BarrierRowGroup: Story = {
    name: 'BarrierRow — group',
    render: () => (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <WarningAmberRoundedIcon sx={{ color: 'warning.main', fontSize: 18 }} />
                <Typography variant="body2" fontWeight={700}>Key Barriers</Typography>
            </Stack>
            <BarrierRow
                icon={<DirectionsBusRoundedIcon sx={{ color: 'warning.main', fontSize: 18 }} />}
                title="Transport access for rural clients"
                description="Clients in outer suburbs struggle to attend clinic appointments — transport is the most cited barrier."
            />
            <BarrierRow
                icon={<ShieldRoundedIcon sx={{ color: 'warning.main', fontSize: 18 }} />}
                title="Cultural safety gaps in ANC delivery"
                description="Some cohorts report discomfort with current care models."
            />
        </Stack>
    ),
};
