import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { useState } from 'react';
import GoalFilters from './GoalFilters';

const CENTRE_OPTIONS = [
    { label: 'Gowrie Victoria', value: 'gowrie-vic' },
    { label: 'Haileybury', value: 'haileybury' },
    { label: 'Monash Children', value: 'monash-children' },
];

const meta = {
    title: 'RSTO/Molecules/GoalFilters',
    component: GoalFilters,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**GoalFilters** — dual-filter bar for the Goals / CI Planning view.

Renders two inline \`Selector\` dropdowns side by side:
1. **Indicator filter** — \`FilterListIcon\` + options: All indicators / Quantity / Quality / Participation
2. **Centre filter** — \`LocationOnIcon\` + "All centres" + dynamic \`centreOptions\` prop

Both selectors use \`disableUnderline\` (no MUI standard underline) and are horizontally spaced with \`theme.spacing(2)\`.

### Props
- \`indicatorFilter\`: controlled value for the indicator selector
- \`onIndicatorChange\`: callback with new indicator value
- \`centreFilter\`: controlled value for the centre selector
- \`onCentreChange\`: callback with new centre value
- \`centreOptions?\`: additional centre options appended after "All centres" (default: \`[]\`)
                `,
            },
        },
    },
    args: {
        indicatorFilter: 'all',
        onIndicatorChange: fn(),
        centreFilter: 'all',
        onCentreChange: fn(),
    },
    argTypes: {
        centreOptions: { control: 'object' },
    },
} satisfies Meta<typeof GoalFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — both filters on "All", no centre options. */
export const Default: Story = {};

/** With centre options — service provider list populated. */
export const WithCentreOptions: Story = {
    name: 'With centre options',
    render: () => {
        const [indicator, setIndicator] = useState('all');
        const [centre, setCentre] = useState('all');
        return (
            <GoalFilters
                indicatorFilter={indicator}
                onIndicatorChange={setIndicator}
                centreFilter={centre}
                onCentreChange={setCentre}
                centreOptions={CENTRE_OPTIONS}
            />
        );
    },
};

/** Quality selected — indicator filter pre-set. */
export const QualitySelected: Story = {
    name: 'Quality selected',
    render: () => {
        const [indicator, setIndicator] = useState('quality');
        const [centre, setCentre] = useState('all');
        return (
            <GoalFilters
                indicatorFilter={indicator}
                onIndicatorChange={setIndicator}
                centreFilter={centre}
                onCentreChange={setCentre}
                centreOptions={CENTRE_OPTIONS}
            />
        );
    },
};

/** Centre selected — specific centre pre-set. */
export const CentreSelected: Story = {
    name: 'Centre selected',
    render: () => {
        const [indicator, setIndicator] = useState('all');
        const [centre, setCentre] = useState('haileybury');
        return (
            <GoalFilters
                indicatorFilter={indicator}
                onIndicatorChange={setIndicator}
                centreFilter={centre}
                onCentreChange={setCentre}
                centreOptions={CENTRE_OPTIONS}
            />
        );
    },
};
