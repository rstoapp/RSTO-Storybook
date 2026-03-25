import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import TitleWithSelectors, { TitleElement } from './TitleWithSelectors';

const meta: Meta<typeof TitleWithSelectors> = {
    title: 'RSTO/Molecules/TitleWithSelectors',
    component: TitleWithSelectors,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TitleWithSelectors>;

export const InlineSelector: Story = {
    name: 'Inline selector mid-title',
    render: () => {
        const [metric, setMetric] = useState('pct');
        const elements: TitleElement[] = [
            'Percentage of',
            {
                options: [
                    { label: 'appointments', value: 'pct' },
                    { label: 'enrolled clients', value: 'enrolled' },
                ],
                value: metric,
                onChange: setMetric,
            },
            'after 24 weeks gestation where women had a recorded measure of fundal height',
        ];
        return <TitleWithSelectors elements={elements} />;
    },
};

export const TextOnly: Story = {
    name: 'Text only (no selectors)',
    render: () => (
        <TitleWithSelectors elements={['12-Month Performance Trend']} />
    ),
};

export const MultipleSelectors: Story = {
    name: 'Multiple inline selectors',
    render: () => {
        const [metric, setMetric] = useState('pct');
        const [region, setRegion] = useState('metro');
        const elements: TitleElement[] = [
            {
                options: [
                    { label: 'Percentage', value: 'pct' },
                    { label: 'Count', value: 'count' },
                ],
                value: metric,
                onChange: setMetric,
            },
            'of appointments in',
            {
                options: [
                    { label: 'Metro', value: 'metro' },
                    { label: 'Regional', value: 'regional' },
                    { label: 'Rural', value: 'rural' },
                ],
                value: region,
                onChange: setRegion,
            },
        ];
        return <TitleWithSelectors elements={elements} />;
    },
};
