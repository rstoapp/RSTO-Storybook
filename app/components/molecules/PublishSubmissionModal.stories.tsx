import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import * as React from 'react';
import { useState } from 'react';
import PublishSubmissionModal from './PublishSubmissionModal';

const meta = {
    title: 'RSTO/Molecules/PublishSubmissionModal',
    component: PublishSubmissionModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
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
**PublishSubmissionModal** — confirmation modal for publishing a data submission.

Wraps \`CtaModal\` (which wraps \`RstoModal\` → MUI \`Modal\`) with fixed copy:
- Title: "Publish data?"
- Body: warning that all indicators for the period will be published and cannot be changed
- Confirm: "Publish data" (disabled while \`loading\`)
- Cancel: "Cancel"

### rsto-app note
In production, this component is \`observer\`-wrapped and reads from \`globalModalStore\` (open/close)
and \`usePublishSubmissionRecord\` (confirm action + loading state). The Storybook version removes
the MobX dependency — pass \`open\`, \`onClose\`, \`onConfirm\`, and \`loading\` directly.

### When to use
Triggered from the data submission upload page when the user clicks "Publish". The modal should be
destroyed (not just hidden) after close to reset loading state.
                `,
            },
        },
    },
    args: {
        open: true,
        onClose: fn(),
        onConfirm: fn(),
        loading: false,
    },
    argTypes: {
        open: { control: 'boolean' },
        loading: { control: 'boolean' },
    },
} satisfies Meta<typeof PublishSubmissionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — modal open, idle state. */
export const Default: Story = {};

/** Loading — confirm button disabled while publish action is in flight. */
export const Loading: Story = {
    args: { loading: true },
};

/** Interactive — open/close state managed locally; click Cancel or Confirm to dismiss. */
export const Interactive: Story = {
    name: 'Interactive (open/close)',
    render: () => {
        const [open, setOpen] = useState(true);
        const [loading, setLoading] = useState(false);

        const handleConfirm = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setOpen(false);
            }, 1500);
        };

        return (
            <>
                {!open && (
                    <button
                        style={{ margin: '2rem', padding: '0.5rem 1rem' }}
                        onClick={() => { setOpen(true); setLoading(false); }}
                    >
                        Re-open modal
                    </button>
                )}
                <PublishSubmissionModal
                    open={open}
                    onClose={() => setOpen(false)}
                    onConfirm={handleConfirm}
                    loading={loading}
                />
            </>
        );
    },
};
