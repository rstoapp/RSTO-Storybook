import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { List } from '@mui/material';
import ExpandableListButton from './ExpandableListButton';
import NestedListButton from './NestedListButton';
import NestedListButtonGroup from './NestedListButtonGroup';
import NestedListSection from './NestedListSection';

/**
 * Stories covering the four nav list building blocks:
 * ExpandableListButton → NestedListButton → NestedListButtonGroup → NestedListSection
 */
const meta: Meta = {
    title: 'RSTO/Molecules/NavList',
    tags: ['autodocs'],
    decorators: [(Story) => <List disablePadding sx={{ width: 288, bgcolor: 'background.paper' }}><Story /></List>],
};

export default meta;
type Story = StoryObj;

const QUALITY_BUTTONS = [
    { title: 'QL1', description: 'How many women have continuity of the same midwife?' },
    { title: 'QL2', description: 'How many women have a complete record of routine test results?' },
    { title: 'QL3', description: 'How many women have blood pressure checked at each appointment?' },
];

const QUANTITY_BUTTONS = [
    { title: 'QN1', description: 'Are there adequate antenatal care facilities?' },
];

// ── ExpandableListButton ──────────────────────────────────────────────────────

export const ExpandableCollapsed: Story = {
    name: 'ExpandableListButton — collapsed',
    render: () => <ExpandableListButton text="Quality" open={false} />,
};

export const ExpandableOpen: Story = {
    name: 'ExpandableListButton — expanded',
    render: () => <ExpandableListButton text="Quality" open={true} />,
};

// ── NestedListButton ──────────────────────────────────────────────────────────

export const NestedDefault: Story = {
    name: 'NestedListButton — default',
    render: () => (
        <NestedListButton
            title="QL1"
            description="How many women have continuity of the same midwife?"
        />
    ),
};

export const NestedSelected: Story = {
    name: 'NestedListButton — selected',
    render: () => (
        <NestedListButton
            title="QL1"
            description="How many women have continuity of the same midwife?"
            selected
        />
    ),
};

// ── NestedListButtonGroup ─────────────────────────────────────────────────────

export const ButtonGroup: Story = {
    name: 'NestedListButtonGroup',
    render: () => (
        <NestedListButtonGroup title="Indicators" buttons={QUALITY_BUTTONS} />
    ),
};

// ── NestedListSection ─────────────────────────────────────────────────────────

export const SectionCollapsed: Story = {
    name: 'NestedListSection — collapsed',
    render: () => (
        <NestedListSection
            open={false}
            headerButton={{ text: 'Quality' }}
            nestedButtonGroups={[{ buttons: QUALITY_BUTTONS }]}
        />
    ),
};

export const SectionExpanded: Story = {
    name: 'NestedListSection — expanded',
    render: () => (
        <NestedListSection
            open={true}
            headerButton={{ text: 'Quality' }}
            nestedButtonGroups={[{ buttons: QUALITY_BUTTONS }]}
        />
    ),
};

export const MultipleSections: Story = {
    name: 'Multiple sections',
    render: () => (
        <>
            <NestedListSection
                open={true}
                headerButton={{ text: 'Quantity' }}
                nestedButtonGroups={[{ buttons: QUANTITY_BUTTONS }]}
            />
            <NestedListSection
                open={true}
                headerButton={{ text: 'Quality' }}
                nestedButtonGroups={[{ buttons: QUALITY_BUTTONS }]}
            />
        </>
    ),
};
