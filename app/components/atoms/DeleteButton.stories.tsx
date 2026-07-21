import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import DeleteButton from './DeleteButton';

const meta = {
    title: 'RSTO/Atoms/DeleteButton',
    component: DeleteButton,
    tags: ['autodocs'],
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
**DeleteButton** — destructive text button. MUI Button (\`variant="text"\`) with a trash icon and RSTO red styling.

### Design tokens
- Text color: \`rstoRed._50\`
- Hover background: \`rstoRed._10\` (very light red)
- Icon: \`DeleteForeverOutlinedIcon\`

### Props
Extends MUI \`ButtonProps\`, minus \`variant\` and \`color\` (fixed internally).
Pass \`label\` to override the button text (default: "Delete").

### When to use
Inline file/record deletion: inside \`UploadFileCard\` file rows, table rows, or any destructive single-action context.
For multi-select delete, consider a confirmation modal before triggering the action.
                `,
            },
        },
    },
    args: {
        onClick: fn(),
    },
    argTypes: {
        label: { control: 'text', description: 'Button label text' },
        disabled: { control: 'boolean' },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
    },
} satisfies Meta<typeof DeleteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — medium size, "Delete" label. */
export const Default: Story = {
    args: { label: 'Delete' },
};

/** Disabled state — pointer events removed, reduced opacity. */
export const Disabled: Story = {
    args: { label: 'Delete', disabled: true },
};

/** Custom label — e.g. for file or record deletion. */
export const WithCustomLabel: Story = {
    name: 'Custom label',
    args: { label: 'Remove file' },
};

/** Small size — for dense table rows or inline contexts. */
export const Small: Story = {
    args: { label: 'Delete', size: 'small' },
};
