import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { Box } from '@mui/material';
import NestedListButtonGroup from './NestedListButtonGroup';
import type { NestedListButtonProps } from './NestedListButton';

const QUALITY_BUTTONS: NestedListButtonProps[] = [
    { title: 'QL1', description: 'Continuity of midwife across pregnancy and birth', tag: 'ql1' },
    { title: 'QL2', description: 'Complete routine antenatal records before birth', tag: 'ql2' },
    { title: 'QL3', description: 'Birth centre care for low-risk women', tag: 'ql3' },
];

const meta = {
    title: 'RSTO/Molecules/NestedListButtonGroup',
    component: NestedListButtonGroup,
    tags: ['autodocs'],
    decorators: [(Story) => <Box sx={{ width: 280 }}><Story /></Box>],
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
**NestedListButtonGroup** — clusters related indicator \`NestedListButton\`s under an optional overline group title.

### Props
- \`title\`: optional overline header (e.g. "Quality", "Equity")
- \`buttons\`: array of \`NestedListButtonProps\` — each has \`title\`, \`description\`, optional \`tag\` and \`selected\`
- \`onSelect\`: callback fired with the clicked button's props (selection state is managed by the parent)

### When to use
Inside a \`NestedListSection\` to group related indicators by theme. A single section can contain multiple groups.
                `,
            },
        },
    },
    args: {
        title: 'Quality',
        buttons: QUALITY_BUTTONS,
        onSelect: fn(),
    },
    argTypes: {
        title: { control: 'text' },
        buttons: { control: 'object' },
    },
} satisfies Meta<typeof NestedListButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — group title with three indicator buttons. */
export const Default: Story = {};

/** Without title — no overline group header, buttons only. */
export const WithoutTitle: Story = {
    name: 'Without title',
    args: { title: undefined },
};

/** With selection — second button marked active. */
export const WithSelection: Story = {
    name: 'With selection',
    args: {
        buttons: QUALITY_BUTTONS.map((btn, i) => ({ ...btn, selected: i === 1 })),
    },
};

/** Many buttons — longer list showing full group. */
export const ManyButtons: Story = {
    name: 'Many buttons',
    args: {
        buttons: [
            { title: 'QL1', description: 'Continuity of midwife across pregnancy and birth', tag: 'ql1' },
            { title: 'QL2', description: 'Complete routine antenatal records before birth', tag: 'ql2' },
            { title: 'QL3', description: 'Birth centre care for low-risk women', tag: 'ql3', selected: true },
            { title: 'QL4', description: 'Postnatal visit within 48 hours of discharge', tag: 'ql4' },
            { title: 'QL5', description: 'Newborn blood spot screening completed', tag: 'ql5' },
        ],
    },
};
