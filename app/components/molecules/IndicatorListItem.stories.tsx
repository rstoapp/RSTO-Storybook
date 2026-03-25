import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { List } from '@mui/material';
import IndicatorListItem from './IndicatorListItem';

const meta: Meta<typeof IndicatorListItem> = {
    title: 'RSTO/Molecules/IndicatorListItem',
    component: IndicatorListItem,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'An inline indicator chip (e.g. QN1) followed by a description. Used inside expandable sections of the TwoLevelSidebar detail panel.',
            },
        },
    },
    decorators: [
        (Story) => (
            <List disablePadding sx={{ width: 288 }}>
                <Story />
            </List>
        ),
    ],
    args: {
        code: 'QN1',
        description: 'Are there enough ECEC places?',
        selected: false,
    },
};

export default meta;
type Story = StoryObj<typeof IndicatorListItem>;

export const Default: Story = {
    args: {},
};

export const Selected: Story = {
    args: { selected: true },
};

export const MultipleItems: Story = {
    name: 'Multiple items in a list',
    render: () => (
        <>
            <IndicatorListItem code="QL1" description="How many women have continuity of the same midwife?" />
            <IndicatorListItem code="QL2" description="How many women have a complete record of routine test results?" selected />
            <IndicatorListItem code="QL3" description="How many women have blood pressure checked at each appointment?" />
        </>
    ),
};
