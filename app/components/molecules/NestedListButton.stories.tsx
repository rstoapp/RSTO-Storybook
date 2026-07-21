import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { List } from '@mui/material';
import NestedListButton from './NestedListButton';

const meta = {
    title: 'RSTO/Molecules/NestedListButton',
    component: NestedListButton,
    tags: ['autodocs'],
    decorators: [(Story) => <List disablePadding sx={{ width: 280 }}><Story /></List>],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                    { id: 'focus-trap', enabled: true },
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
**NestedListButton** — indicator index navigation item. Renders a short indicator code (title) in overline style above a description line, using the left-border \`.nested\` selection state from \`RstoListItemButton\`.

### Selected state
Orange left border (\`rstoOrange._50\`) and light orange background (\`rstoOrange._10\`) when \`selected={true}\`.

### When to use
Inside a \`NestedListButtonGroup\` within a \`NestedListSection\` in the indicator dashboard side navigation. Not for standalone use — the \`List\` wrapper is required for correct MUI list semantics.
                `,
            },
        },
    },
    args: {
        title: 'QL1',
        description: 'Continuity of midwife across pregnancy and birth',
        onClick: fn(),
    },
    argTypes: {
        selected: { control: 'boolean' },
        disabled: { control: 'boolean' },
        tag: { control: 'text', description: 'Optional route/id tag (not rendered, used by parent for selection)' },
    },
} satisfies Meta<typeof NestedListButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Idle — unselected, no active indicator. */
export const Default: Story = {};

/** Selected — active indicator, orange left border and background. */
export const Selected: Story = {
    args: { selected: true },
};

/** Disabled — pointer events removed, reduced opacity. */
export const Disabled: Story = {
    args: { disabled: true },
};

/** Long content — wrapping title and description text. */
export const WithLongContent: Story = {
    name: 'Long content',
    args: {
        title: 'PERINATAL — Antenatal care',
        description: 'Percentage of women who attended at least 5 antenatal visits before 28 weeks gestation',
    },
};
