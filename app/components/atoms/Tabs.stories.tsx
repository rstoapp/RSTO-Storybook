import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
    title: 'RSTO/Atoms/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'MUI Tabs styled via rstoTheme. The orange underline indicator and font weight are applied globally via the theme — no custom wrapper needed.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const STRATEGY_LABELS = ['Participation', 'Quantity', 'Quality'];
const INDICATOR_LABELS = ['Antenatal Care', 'Early Childhood', 'Primary Care'];

export const SingleActive: Story = {
    name: 'Single tab active',
    render: () => {
        const [value, setValue] = useState(0);
        return (
            <Tabs value={value} onChange={(_, v) => setValue(v)}>
                {STRATEGY_LABELS.map((label) => (
                    <Tab key={label} label={label} />
                ))}
            </Tabs>
        );
    },
};

export const SecondActive: Story = {
    name: 'Second tab active',
    render: () => {
        const [value, setValue] = useState(1);
        return (
            <Tabs value={value} onChange={(_, v) => setValue(v)}>
                {STRATEGY_LABELS.map((label) => (
                    <Tab key={label} label={label} />
                ))}
            </Tabs>
        );
    },
};

export const ManyTabs: Story = {
    name: 'Many tabs (scrollable)',
    render: () => {
        const [value, setValue] = useState(0);
        return (
            <Tabs value={value} onChange={(_, v) => setValue(v)} variant="scrollable" scrollButtons="auto">
                {INDICATOR_LABELS.concat(STRATEGY_LABELS).map((label) => (
                    <Tab key={label} label={label} />
                ))}
            </Tabs>
        );
    },
};
