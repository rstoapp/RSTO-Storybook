import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FieldLabelAndTooltip from './FieldLabelAndTooltip';

const meta = {
    title: 'RSTO/Atoms/FieldLabelAndTooltip',
    component: FieldLabelAndTooltip,
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
**FieldLabelAndTooltip** — the canonical field/section label atom for CI Planning
forms, using the \`subtitle2\` type scale (14px/600) so every label in a form —
tooltipped or not — renders at the same size. Use it for **every** field or
section label in a form, not just the ones that need an explanation, so a form
never mixes this with a raw \`Typography\` label at a different size.

- \`label\`: the visible field name
- \`tooltip\`: optional tooltip content (any \`React.ReactNode\` — string, JSX, or
  multi-line via \`\\n\`). Omit it to render a plain label with no info icon —
  e.g. a section header that doesn't need an explanation.
- \`required\`: appends \`*\` to the label text when true

Tooltip is triggered on hover/focus of the info icon (MUI default).
                `,
            },
        },
    },
    args: {
        label: 'Focus area',
        tooltip: 'Select the area of practice this goal relates to.',
        required: false,
    },
    argTypes: {
        label: { control: 'text' },
        tooltip: { control: 'text' },
        required: { control: 'boolean' },
    },
} satisfies Meta<typeof FieldLabelAndTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — label with tooltip, not required. */
export const Default: Story = {};

/** Required — asterisk appended to label text. */
export const Required: Story = {
    args: { required: true },
};

/** Multi-line tooltip — tooltip body uses line breaks. */
export const MultiLineTooltip: Story = {
    args: {
        label: 'Improvement goal',
        tooltip: 'Describe the specific improvement you are targeting.\nBe measurable and time-bound where possible.',
    },
};

/** Long label — tests wrapping behaviour in tight layouts. */
export const LongLabel: Story = {
    args: {
        label: 'What evidence supports this priority?',
        tooltip: 'Reference data sources, observations, or staff feedback that informed this goal.',
        required: true,
    },
};

/** No tooltip — a plain section/field label with no info icon. Renders at the same size as the tooltipped variants, so it's safe to mix within one form. */
export const WithoutTooltip: Story = {
    args: {
        label: 'Centre',
        tooltip: undefined,
    },
};
