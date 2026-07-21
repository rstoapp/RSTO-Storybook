import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DateLabelAndIcon from './DateLabelAndIcon';

const meta = {
    title: 'RSTO/Atoms/DateLabelAndIcon',
    component: DateLabelAndIcon,
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
**DateLabelAndIcon** — a compact date display atom pairing a calendar icon with a formatted date string.

Renders \`CalendarTodayIcon\` + \`Typography body2\` using \`theme.palette.text.secondary\`. Returns \`null\`
when no \`date\` is provided (safe to render conditionally).

Dates are formatted as \`en-AU\` locale with short month: e.g. \`15 Jul 2026\`.
                `,
            },
        },
    },
    args: {
        date: new Date('2026-07-15'),
        label: 'Created on',
    },
    argTypes: {
        date: { control: 'date' },
        label: { control: 'text' },
    },
} satisfies Meta<typeof DateLabelAndIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — "Created on" label with a sample date. */
export const Default: Story = {};

/** Custom label — "Updated on" variant. */
export const UpdatedOn: Story = {
    args: { label: 'Updated on' },
};

/** Published label — used on data submission cards. */
export const Published: Story = {
    args: { label: 'Published on', date: new Date('2026-01-31') },
};

/** No date — component returns null (renders nothing). */
export const NoDate: Story = {
    args: { date: undefined },
};
