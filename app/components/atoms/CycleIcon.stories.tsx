import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CycleIcon from './CycleIcon';

const meta = {
    title: 'RSTO/Atoms/CycleIcon',
    component: CycleIcon,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
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
**CycleIcon** — a semantic alias for MUI's \`AutorenewIcon\`, used throughout the CI Planning
feature to represent cycles and iterations.

Accepts all MUI \`SvgIconProps\`: \`fontSize\`, \`color\`, \`sx\`, \`aria-label\`, etc.
                `,
            },
        },
    },
} satisfies Meta<typeof CycleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — medium size, inheriting current colour. */
export const Default: Story = {};

/** Small — compact usage in tight layouts. */
export const Small: Story = {
    args: { fontSize: 'small' },
};

/** Large — prominent usage in headers or section labels. */
export const Large: Story = {
    args: { fontSize: 'large' },
};

/** Primary colour — using MUI palette colour prop. */
export const PrimaryColor: Story = {
    args: { color: 'primary' },
};

/** Custom token colour via sx — rstoBlue._70. */
export const TokenColor: Story = {
    args: { sx: { color: 'rstoBlue._70', fontSize: '2rem' } },
};
