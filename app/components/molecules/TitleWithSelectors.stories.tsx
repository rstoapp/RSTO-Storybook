import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import TitleWithSelectors from './TitleWithSelectors';

const YEAR_OPTIONS = [
    { label: '2024–25', value: '2024-25' },
    { label: '2023–24', value: '2023-24' },
    { label: '2022–23', value: '2022-23' },
];

const MEASURE_OPTIONS = [
    { label: 'Continuity of midwife', value: 'continuity' },
    { label: 'Antenatal visits', value: 'antenatal' },
    { label: 'Birth centre care', value: 'birth-centre' },
];

const meta = {
    title: 'RSTO/Molecules/TitleWithSelectors',
    component: TitleWithSelectors,
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
**TitleWithSelectors** — inline title composed of static text segments and dropdown \`Selector\` elements.

Renders a \`Stack\` of \`Typography\` (bold body1) and \`Selector\` (standard MUI Select) nodes that flow horizontally with 4px gap.
Used as a dynamic page title: "Showing **[Measure]** data for **[Year]**".

### Props
- \`elements\`: array of \`string\` (rendered as bold body1) or \`SelectorProps\` (rendered as an inline Selector)

### Selector props
- \`options\`: \`{ label, value }[]\`
- \`value\`: controlled selected value
- \`onChange\`: callback with the new string value
- \`placeholder\`: shown when no value is selected
- \`startIcon\`: optional ReactNode rendered before the selected label
- \`disableUnderline\`: hides the MUI standard underline (default: false)

### When to use
As the primary heading of a data dashboard view where the user can change the measure or reporting period inline, without navigating away.
                `,
            },
        },
    },
    args: {
        elements: ['Percentage of women who achieved continuity of midwife care'],
    },
    argTypes: {
        elements: { control: 'object' },
    },
} satisfies Meta<typeof TitleWithSelectors>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — text-only title, no selectors. */
export const Default: Story = {};

/** With selector — one inline year dropdown. */
export const WithSelector: Story = {
    name: 'With selector',
    render: () => {
        const [year, setYear] = useState('2024-25');
        return (
            <TitleWithSelectors
                elements={[
                    'Percentage of women who achieved continuity in',
                    { options: YEAR_OPTIONS, value: year, onChange: setYear },
                ]}
            />
        );
    },
};

/** Multiple selectors — measure and year inline. */
export const MultipleSelectors: Story = {
    name: 'Multiple selectors',
    render: () => {
        const [measure, setMeasure] = useState('continuity');
        const [year, setYear] = useState('2024-25');
        return (
            <TitleWithSelectors
                elements={[
                    'Showing',
                    { options: MEASURE_OPTIONS, value: measure, onChange: setMeasure },
                    'data for',
                    { options: YEAR_OPTIONS, value: year, onChange: setYear },
                ]}
            />
        );
    },
};

/** With placeholder — selector in empty/unset state. */
export const WithPlaceholder: Story = {
    name: 'With placeholder',
    render: () => {
        const [year, setYear] = useState('');
        return (
            <TitleWithSelectors
                elements={[
                    'Showing data for',
                    {
                        options: YEAR_OPTIONS,
                        value: year,
                        onChange: setYear,
                        placeholder: 'Select year',
                    },
                ]}
            />
        );
    },
};

/** With start icon — calendar icon before year selector value. */
export const WithStartIcon: Story = {
    name: 'With start icon',
    render: () => {
        const [year, setYear] = useState('2024-25');
        return (
            <TitleWithSelectors
                elements={[
                    'Quarterly results for',
                    {
                        options: YEAR_OPTIONS,
                        value: year,
                        onChange: setYear,
                        startIcon: <CalendarTodayOutlinedIcon sx={{ fontSize: '1rem' }} />,
                    },
                ]}
            />
        );
    },
};
