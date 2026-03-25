import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import StrategyMenu from './StrategyMenu';

const meta: Meta<typeof StrategyMenu> = {
    title: 'RSTO/Molecules/StrategyMenu',
    component: StrategyMenu,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StrategyMenu>;

const STRATEGIES = [
    { label: 'Participation', tag: 'participation' },
    { label: 'Quantity', tag: 'quantity' },
    { label: 'Quality', tag: 'quality' },
];

const INDICATORS = [
    { label: 'Antenatal Care', tag: 'anc' },
    { label: 'Early Childhood', tag: 'ecec' },
    { label: 'Primary Prevention', tag: 'pp' },
];

export const Default: Story = {
    name: 'Three strategies',
    render: () => {
        const [selected, setSelected] = useState(0);
        return (
            <StrategyMenu
                items={STRATEGIES}
                selected={selected}
                onClick={(_, i) => setSelected(i)}
            />
        );
    },
};

export const SecondActive: Story = {
    name: 'Second item active',
    render: () => {
        const [selected, setSelected] = useState(1);
        return (
            <StrategyMenu
                items={STRATEGIES}
                selected={selected}
                onClick={(_, i) => setSelected(i)}
            />
        );
    },
};

export const IndicatorTabs: Story = {
    name: 'Indicator categories',
    render: () => {
        const [selected, setSelected] = useState(0);
        return (
            <StrategyMenu
                items={INDICATORS}
                selected={selected}
                onClick={(_, i) => setSelected(i)}
            />
        );
    },
};
