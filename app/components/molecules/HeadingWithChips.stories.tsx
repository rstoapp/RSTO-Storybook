import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeadingWithChips from './HeadingWithChips';

const meta: Meta<typeof HeadingWithChips> = {
    title: 'RSTO/Molecules/HeadingWithChips',
    component: HeadingWithChips,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeadingWithChips>;

export const Default: Story = {
    args: {
        heading: 'How many women have fundal height recorded at each visit after 24 weeks?',
        chips: ['QL11', 'Quality Indicator 11'],
    },
};

export const WithTooltip: Story = {
    name: 'With tooltip',
    args: {
        heading: 'How many women have continuity of the same midwife?',
        headingTooltip: {
            content: {
                text: 'Continuity of care is associated with improved outcomes for mothers and babies.',
                cta: { text: 'Learn more', href: '#' },
            },
            variant: 'insight',
        },
        chips: ['QL1', 'Quality Indicator 1'],
    },
};

export const ManyChips: Story = {
    name: 'Many tags',
    args: {
        heading: 'Are there adequate antenatal care facilities?',
        chips: ['QN1', 'Quantity', 'Antenatal Care', 'Infrastructure'],
    },
};
