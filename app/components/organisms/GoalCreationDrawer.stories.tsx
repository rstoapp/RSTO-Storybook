import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Button } from '@mui/material';
import GoalCreationDrawer from './GoalCreationDrawer';
import type { GoalIndicator, GoalCentre } from './GoalCreationDrawer';

const QUALITY_INDICATORS: GoalIndicator[] = [
    { id: 'ecec_ql_1', title: 'QL1: Are we delivering quality programs?' },
];
const QUANTITY_INDICATORS: GoalIndicator[] = [
    { id: 'ecec_qn_1', title: 'QN1: Do we have enough places available?' },
];
const PARTICIPATION_INDICATORS: GoalIndicator[] = [
    { id: 'ecec_p_1', title: 'P1: Are families attending the required hours?' },
];
const CENTRES: GoalCentre[] = [
    { id: 'centre-a', name: 'Gowrie Victoria — Main Centre' },
    { id: 'centre-b', name: 'Gowrie Victoria — Annex' },
];
const QUALITY_AREAS = ['QA1', 'QA2', 'QA3', 'QA4', 'QA5', 'QA6', 'QA7'];

const meta = {
    title: 'RSTO/Organisms/GoalCreationDrawer',
    component: GoalCreationDrawer,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
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
**GoalCreationDrawer** — the CI Planning "Add goal" flow. A two-step organism
(indicator selection → goal definition) composed entirely from the
\`RstoDrawer\` molecule plus already-migrated atoms/molecules (\`RstoChip\`,
\`DropDownSelector\`, \`FieldLabelAndTooltip\`, \`RstoTextField\`, \`InfoCard\`).

- Self-contained Storybook version — no MobX, no API hooks. Indicators, centres,
  and quality areas are all passed as props; submission is reported via \`onSubmit\`.
- Step 1 groups indicators into collapsible Quality / Quantity / Participation
  sections and supports an optional strategy toggle (e.g. PP / ECEC) when a
  provider runs more than one CI strategy.
- Step 2 shows the selected indicator, a centre selector, an optional quality-area
  selector, and the baseline + IF/THEN/SO-THAT change statement fields.
- \`mode="edit"\` skips straight to step 2, changes the footer's Back button to a
  close action, and relabels the primary button "Update goal".
                `,
            },
        },
    },
    args: {
        open: true,
        onClose: fn(),
        onSubmit: fn(),
        qualityIndicators: QUALITY_INDICATORS,
        quantityIndicators: QUANTITY_INDICATORS,
        participationIndicators: PARTICIPATION_INDICATORS,
        centres: CENTRES,
    },
} satisfies Meta<typeof GoalCreationDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndicatorSelection: Story = {
    name: 'Step 1 — Indicator selection',
};

export const WithStrategyToggle: Story = {
    name: 'Step 1 — With strategy toggle (PP / ECEC)',
    render: (args) => {
        const [strategy, setStrategy] = useState('pp');
        return (
            <GoalCreationDrawer
                {...args}
                strategies={[
                    { acronym: 'pp', label: 'PP' },
                    { acronym: 'ecec', label: 'ECEC' },
                ]}
                selectedStrategy={strategy}
                onStrategyChange={setStrategy}
            />
        );
    },
};

export const GoalDefinitionStep: Story = {
    name: 'Step 2 — Goal definition',
    args: {
        initialIndicatorId: 'ecec_ql_1',
        qualityAreas: QUALITY_AREAS,
    },
    render: (args) => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Reopen drawer</Button>
                <GoalCreationDrawer
                    {...args}
                    open={open}
                    onClose={() => setOpen(false)}
                    mode="edit"
                />
            </>
        );
    },
};

export const EditMode: Story = {
    name: 'Edit existing goal',
    args: {
        mode: 'edit',
        initialIndicatorId: 'ecec_ql_1',
        qualityAreas: QUALITY_AREAS,
        initialFormData: {
            centreId: 'centre-a',
            qualityArea: 'QA1',
            baseline: '67% of children are tracking to attend 600+ hours per year.',
            ifStatement: 'we call parents who miss one session to understand barriers to continuing',
            thenStatement: 'parents will feel more comfortable sharing barriers and accepting support',
            soThatStatement: 'fewer families drop out and participation increases',
        },
    },
};

export const Submitting: Story = {
    name: 'Submitting state',
    args: {
        mode: 'edit',
        initialIndicatorId: 'ecec_ql_1',
        isSubmitting: true,
        initialFormData: {
            centreId: 'centre-a',
            baseline: '67% of children are tracking to attend 600+ hours per year.',
            ifStatement: 'we call parents who miss one session',
            thenStatement: 'parents will feel more comfortable sharing barriers',
            soThatStatement: 'fewer families drop out and participation increases',
        },
    },
};
