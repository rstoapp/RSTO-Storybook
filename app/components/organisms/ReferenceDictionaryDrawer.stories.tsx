import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import ReferenceDictionaryDrawer from './ReferenceDictionaryDrawer';
import type { ReferenceTerm } from './ReferenceDictionaryDrawer';

const TERMS: ReferenceTerm[] = [
    { id: 'anc', short: 'ANC', full: 'Antenatal Care', category: 'Service', description: 'Healthcare provided to pregnant women during pregnancy, including routine check-ups, screening, and education to support healthy pregnancy outcomes.' },
    { id: 'ci', short: 'CI', full: 'Continuous Improvement', category: 'Program', description: 'A structured, ongoing process of reviewing data, identifying gaps, and taking targeted action to improve outcomes. Goals are set per indicator category — Quality, Quantity, and Participation — and reviewed each cycle.' },
    { id: 'ecec', short: 'ECEC', full: 'Early Childhood Education and Care', category: 'Service', description: 'Education and care services for children before school age, including long day care, family day care, kindergarten, and occasional care.' },
    { id: 'epis', short: 'EPIS', full: 'Early Years Partnership Information System', category: 'Data', description: 'The tracking system used to record and monitor action progress across a community plan’s phases: Exploration, Preparation, Implementation, and Sustainment.' },
    { id: 'nqf', short: 'NQF', full: 'National Quality Framework', category: 'Policy', description: 'A quality assurance framework for early childhood education and care in Australia, setting standards for service approval, assessment, and rating.' },
    { id: 'nqs', short: 'NQS', full: 'National Quality Standard', category: 'Policy', description: 'The benchmark within the NQF against which early childhood education and care services are assessed and rated, across seven Quality Areas (QA1–QA7).' },
    { id: 'pp', short: 'PP', full: 'Parenting Programs', category: 'Program', description: 'Structured programs supporting parents with knowledge, skills, and peer connection.' },
    { id: 'rag', short: 'RAG', full: 'Red / Amber / Green', category: 'Data', description: 'A three-level status scale used across CI Planning charts to show whether an indicator is on track, needs attention, or is below threshold.' },
];

const meta = {
    title: 'RSTO/Organisms/ReferenceDictionaryDrawer',
    component: ReferenceDictionaryDrawer,
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
**ReferenceDictionaryDrawer** — a read-only, searchable glossary panel composed
from the \`RstoDrawer\` molecule (no footer needed for a reference-only view).

Aligned to the Derby Community Dashboard prototype's \`ReferenceDrawer\` direction:

- **Collapsible rows** — each term shows its acronym + full name collapsed
  (name truncates with ellipsis); clicking expands a category tag + description.
  Only one term is expanded at a time.
- **Count pill** — the search field's end adornment shows the live filtered count.
- **Category filter** — a segmented control (not chips), each option showing a
  small coloured dot. Colours are assigned automatically from a fixed RSTO token
  palette (\`rstoBlue → rstoGreen → rstoOrange → rstoBrown → rstoGray\`, cycling by
  category order) rather than hard-coded per category name, so any taxonomy works.
- Still proves the molecule's minimal composition: header + scrollable content,
  no footer.
                `,
            },
        },
    },
    args: {
        open: true,
        onClose: fn(),
        terms: TERMS,
    },
} satisfies Meta<typeof ReferenceDictionaryDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCategory: Story = {
    name: 'Single category (no filter control)',
    args: {
        terms: TERMS.filter((t) => t.category === 'Program'),
    },
};

export const NoResults: Story = {
    name: 'Empty search result',
    args: {
        terms: [],
    },
};
