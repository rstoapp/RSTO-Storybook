import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import QualitativeNotesDrawer from './QualitativeNotesDrawer';
import type { QualitativeNote, NoteStrategy } from './QualitativeNotesDrawer';

const STRATEGIES: NoteStrategy[] = [
    { acronym: 'pp', label: 'Parenting Programs' },
    { acronym: 'ecec', label: 'Early Childhood Education and Care' },
];

const NOTES: QualitativeNote[] = [
    {
        id: 'note-1',
        type: 'facilitator',
        strategy: 'ecec',
        indicatorCategory: 'participation',
        authorName: 'Sarah Mitchell',
        createdDate: '2026-06-20',
        text: 'Families mentioned transport was the main barrier to attending the full 600 hours — worth testing a shuttle pilot next cycle.',
    },
    {
        id: 'note-2',
        type: 'observation',
        strategy: 'ecec',
        indicatorCategory: 'quality',
        authorName: 'James Okafor',
        createdDate: '2026-05-04',
        text: 'Educator-to-child ratio dipped during the 3–4pm handover window three times this term. Rostering review scheduled for July.',
    },
    {
        id: 'note-3',
        type: 'action',
        strategy: 'pp',
        authorName: 'Priya Nair',
        createdDate: '2026-04-11',
        text: 'Ran a co-design session with families to redesign the Triple P session times around school pickup.',
    },
];

const meta = {
    title: 'RSTO/Organisms/QualitativeNotesDrawer',
    component: QualitativeNotesDrawer,
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
**QualitativeNotesDrawer** — a three-view notes organism (list → detail → form),
aligned to the Derby Community Dashboard prototype's \`NotesDrawer\` direction and
composed entirely from the \`RstoDrawer\` molecule.

- **List view** — a Strategy / Type / Indicator filter row (Strategy and Indicator
  reuse the same taxonomy as \`GoalCreationDrawer\`: PP/ECEC strategies and
  Quality/Quantity/Participation indicator categories), a card per note, and a
  single "+ Add a note" footer button.
- **Note badge priority** — a note's \`indicatorCategory\` badge takes priority
  over its \`type\` badge when both are present, matching the prototype's
  \`getIndicatorType\` override behaviour.
- **Detail view** — swaps the header's static icon for a back-arrow \`IconButton\`
  and adds a delete action via \`headerActions\` — both features added to the
  \`RstoDrawer\` molecule specifically to support this pattern (see
  \`RSTO/Molecules/RstoDrawer\`, "With back navigation + header action").
- **Form view** — a full view swap (not an overlay): back arrow replaces the
  static icon, Cancel/Save become the footer, matching the prototype's
  full-panel-takeover add-note form.
- Escape-to-close and backdrop-click are inherited free from MUI \`Drawer\` —
  no hand-rolled keyboard handling needed (the prototype rolls its own since
  it isn't MUI-based).
- **Deliberately not ported** from the prototype: EPIS-initiative / CI-phase
  reference tags, chart-driven deep-linking (\`onNavigateToSection\`,
  \`jumpNoteId\`), and section-scoped pre-filtering (\`activeSection\`) — these are
  Derby-dashboard-specific integration points with no RSTO equivalent decided
  yet (see \`rsto-app-drawer-refactor-todo.md\`).
                `,
            },
        },
    },
    args: {
        open: true,
        onClose: fn(),
        notes: NOTES,
        strategies: STRATEGIES,
        onAddNote: fn(),
    },
} satisfies Meta<typeof QualitativeNotesDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
    name: 'No notes yet',
    args: {
        notes: [],
    },
};

export const NoteDetail: Story = {
    name: 'Detail view (back arrow + delete)',
    args: {
        initialView: 'detail',
        initialSelectedNoteId: 'note-1',
    },
};

export const AddNoteForm: Story = {
    name: 'Add-note form view',
    args: {
        initialView: 'form',
    },
};

export const Interactive: Story = {
    name: 'Interactive — filter, view, add, delete',
    render: (args) => {
        const [notes, setNotes] = useState(NOTES);
        return (
            <QualitativeNotesDrawer
                {...args}
                notes={notes}
                onAddNote={(note) => {
                    setNotes((prev) => [{ ...note, id: `note-${prev.length + 1}` }, ...prev]);
                }}
                onDeleteNote={(id) => {
                    setNotes((prev) => prev.filter((n) => n.id !== id));
                }}
            />
        );
    },
};

export const Saving: Story = {
    name: 'Saving state (form view)',
    args: {
        initialView: 'form',
        isSaving: true,
    },
};

export const NoStrategies: Story = {
    name: 'Without strategy taxonomy',
    args: {
        strategies: [],
        notes: NOTES.map((note) => ({
            id: note.id,
            type: note.type,
            indicatorCategory: note.indicatorCategory,
            authorName: note.authorName,
            createdDate: note.createdDate,
            text: note.text,
        })),
    },
};
