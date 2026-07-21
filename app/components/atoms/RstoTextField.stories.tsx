import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import RstoTextField from './RstoTextField';

const meta = {
    title: 'RSTO/Atoms/RstoTextField',
    component: RstoTextField,
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
    },
    args: {
        label: 'Label',
        placeholder: 'Enter a value…',
    },
} satisfies Meta<typeof RstoTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
    args: { value: 'Some input value', onChange: fn() },
};

export const Disabled: Story = {
    args: { disabled: true, value: 'Disabled field', onChange: fn() },
};

export const Error: Story = {
    args: { error: true, helperText: 'This field is required' },
};

export const Multiline: Story = {
    args: {
        multiline: true,
        rows: 4,
        label: 'Notes',
        placeholder: 'Add your notes here…',
    },
};
