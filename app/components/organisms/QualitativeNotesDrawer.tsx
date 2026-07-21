'use client';
import * as React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RstoDrawer from '../molecules/RstoDrawer';
import RstoChip from '../molecules/RstoChip';
import RstoTextField from '../atoms/RstoTextField';
import DropDownSelector from '../molecules/DropDownSelector';
import FieldLabelAndTooltip from '../atoms/FieldLabelAndTooltip';

export type NoteType = 'observation' | 'facilitator' | 'action';
export type IndicatorCategory = 'quality' | 'quantity' | 'participation';

export interface NoteStrategy {
    acronym: string;
    label: string;
}

export interface QualitativeNote {
    id: string;
    type: NoteType;
    /** Strategy acronym this note relates to, e.g. 'pp' | 'ecec' — matches a `strategies` entry */
    strategy?: string;
    /** Indicator category this note relates to — takes badge priority over `type` when present */
    indicatorCategory?: IndicatorCategory;
    text: string;
    authorName: string;
    createdDate: string;
}

export interface QualitativeNotesDrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    notes: QualitativeNote[];
    /** Optional strategy list — enables the strategy filter and the add-note form's strategy field */
    strategies?: NoteStrategy[];
    onAddNote: (note: Omit<QualitativeNote, 'id'>) => void;
    onDeleteNote?: (id: string) => void;
    isSaving?: boolean;
    /** Open directly into the add-note form or a note's detail view — e.g. triggered by an "add note" action elsewhere in the app */
    initialView?: 'list' | 'form' | 'detail';
    /** Required when `initialView` is `'detail'` — which note to show */
    initialSelectedNoteId?: string;
}

type DrawerView = 'list' | 'form' | 'detail';
type TypeFilter = 'all' | NoteType;
type StrategyFilter = 'all' | string;
type IndicatorFilter = 'all' | IndicatorCategory;

const NOTE_TYPE_LABELS: Record<NoteType, string> = {
    observation: 'Observation',
    facilitator: 'Facilitator',
    action: 'Action',
};

const INDICATOR_LABELS: Record<IndicatorCategory, string> = {
    quality: 'Quality',
    quantity: 'Quantity',
    participation: 'Participation',
};

const TYPE_BADGE_STYLE: Record<NoteType, { bg: string; fg: string }> = {
    observation: { bg: 'rstoGray._30', fg: 'rstoGray._90' },
    facilitator: { bg: 'rstoBlue._10', fg: 'rstoBlue._70' },
    action: { bg: 'rstoOrange._10', fg: 'rstoOrange._70' },
};

const INDICATOR_BADGE_STYLE: Record<IndicatorCategory, { bg: string; fg: string }> = {
    quality: { bg: 'rstoBlue._10', fg: 'rstoBlue._70' },
    quantity: { bg: 'rstoGreen._10', fg: 'rstoGreen._60' },
    participation: { bg: 'rstoOrange._10', fg: 'rstoOrange._70' },
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Compact "Label: Value ▾" dropdown for the filter row — distinct from the larger form-field DropDownSelector */
function FilterMenu<T extends string>({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: T;
    options: { value: T; label: string }[];
    onChange: (value: T) => void;
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const current = options.find((o) => o.value === value)?.label ?? value;

    return (
        <>
            <Box
                component="button"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    py: 0.5,
                    px: 0.5,
                }}
            >
                <Typography variant="caption" fontWeight={500} color="text.secondary">
                    {label}:
                </Typography>
                <Typography variant="caption" fontWeight={700}>
                    {current}
                </Typography>
                <ExpandMoreIcon sx={{ fontSize: 14, opacity: 0.6 }} />
            </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === value}
                        onClick={() => {
                            onChange(option.value);
                            setAnchorEl(null);
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

interface NoteCardProps {
    note: QualitativeNote;
    strategies: NoteStrategy[];
    onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, strategies, onClick }) => {
    const badgeLabel = note.indicatorCategory ? INDICATOR_LABELS[note.indicatorCategory] : NOTE_TYPE_LABELS[note.type];
    const badgeStyle = note.indicatorCategory ? INDICATOR_BADGE_STYLE[note.indicatorCategory] : TYPE_BADGE_STYLE[note.type];
    const strategyLabel = strategies.find((s) => s.acronym === note.strategy)?.label;

    return (
        <Box
            component="button"
            onClick={onClick}
            sx={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: '1px solid',
                borderColor: 'rstoGray._40',
                borderRadius: '8px',
                p: 1.5,
                cursor: 'pointer',
                mb: 1.5,
                '&:hover': { borderColor: 'rstoBlue._50', bgcolor: 'rstoBlue._10' },
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 0.75 }}>
                <RstoChip
                    text={badgeLabel}
                    size="small"
                    sx={{ bgcolor: badgeStyle.bg, color: badgeStyle.fg, height: 20 }}
                />
                {strategyLabel && (
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        {strategyLabel}
                    </Typography>
                )}
            </Stack>
            <Typography variant="body2" sx={{ mb: 1 }}>
                {note.text}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Box
                    sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'rstoBlue._70',
                        color: 'rstoGray.white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        flexShrink: 0,
                    }}
                >
                    {getInitials(note.authorName)}
                </Box>
                <Typography variant="caption" color="text.secondary">
                    {note.authorName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
                    · {formatDate(note.createdDate)}
                </Typography>
            </Stack>
        </Box>
    );
};

const QualitativeNotesDrawer: React.FC<QualitativeNotesDrawerProps> = ({
    open,
    onClose,
    title = 'Qualitative notes',
    notes,
    strategies = [],
    onAddNote,
    onDeleteNote,
    isSaving = false,
    initialView = 'list',
    initialSelectedNoteId,
}) => {
    const [view, setView] = React.useState<DrawerView>(initialView);
    const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(initialSelectedNoteId ?? null);

    const [typeFilter, setTypeFilter] = React.useState<TypeFilter>('all');
    const [strategyFilter, setStrategyFilter] = React.useState<StrategyFilter>('all');
    const [indicatorFilter, setIndicatorFilter] = React.useState<IndicatorFilter>('all');

    const [draftType, setDraftType] = React.useState<NoteType>('observation');
    const [draftStrategy, setDraftStrategy] = React.useState('');
    const [draftIndicator, setDraftIndicator] = React.useState('');
    const [draftText, setDraftText] = React.useState('');
    const [draftAuthor, setDraftAuthor] = React.useState('');

    const resetDraft = () => {
        setDraftType('observation');
        setDraftStrategy('');
        setDraftIndicator('');
        setDraftText('');
        setDraftAuthor('');
    };

    const handleClose = () => {
        setView('list');
        setSelectedNoteId(null);
        resetDraft();
        onClose();
    };

    const hasIndicatorNotes = notes.some((n) => n.indicatorCategory);

    const filteredNotes = notes
        .filter((n) => typeFilter === 'all' || n.type === typeFilter)
        .filter((n) => strategyFilter === 'all' || n.strategy === strategyFilter)
        .filter((n) => indicatorFilter === 'all' || n.indicatorCategory === indicatorFilter)
        .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

    const hasActiveFilters = typeFilter !== 'all' || strategyFilter !== 'all' || indicatorFilter !== 'all';

    const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null;

    const canSubmit = Boolean(draftText.trim() && draftAuthor.trim() && (strategies.length === 0 || draftStrategy));

    const handleSubmit = () => {
        if (!canSubmit) return;
        onAddNote({
            type: draftType,
            strategy: draftStrategy || undefined,
            indicatorCategory: (draftIndicator as IndicatorCategory) || undefined,
            text: draftText.trim(),
            authorName: draftAuthor.trim(),
            createdDate: new Date().toISOString(),
        });
        resetDraft();
        setView('list');
    };

    const handleDeleteSelected = () => {
        if (selectedNoteId) onDeleteNote?.(selectedNoteId);
        setView('list');
        setSelectedNoteId(null);
    };

    return (
        <RstoDrawer
            open={open}
            onClose={handleClose}
            title={view === 'form' ? 'Add a note' : view === 'detail' ? 'Note' : title}
            icon={
                view === 'list' ? (
                    <ForumOutlinedIcon sx={{ fontSize: '2rem', color: 'rstoBlue._70' }} />
                ) : (
                    <IconButton size="small" aria-label="Back to notes" onClick={() => setView('list')}>
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                )
            }
            headerActions={
                view === 'detail' && selectedNote ? (
                    <IconButton size="small" aria-label="Delete note" sx={{ color: 'rstoRed._60' }} onClick={handleDeleteSelected}>
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                ) : undefined
            }
            width={440}
            footer={
                view === 'list' ? (
                    <Stack direction="row" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => setView('form')}>
                            + Add a note
                        </Button>
                    </Stack>
                ) : view === 'form' ? (
                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                        <Button variant="outlined" color="secondary" onClick={() => setView('list')}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!canSubmit || isSaving}>
                            {isSaving ? 'Saving note...' : 'Save note'}
                        </Button>
                    </Stack>
                ) : undefined
            }
        >
            {view === 'list' && (
                <>
                    {(strategies.length > 0 || hasIndicatorNotes) && (
                        <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                            flexWrap="wrap"
                            sx={{ mb: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'rstoGray._40' }}
                        >
                            {strategies.length > 0 && (
                                <FilterMenu
                                    label="Strategy"
                                    value={strategyFilter}
                                    onChange={setStrategyFilter}
                                    options={[{ value: 'all', label: 'All' }, ...strategies.map((s) => ({ value: s.acronym, label: s.label }))]}
                                />
                            )}
                            <FilterMenu
                                label="Type"
                                value={typeFilter}
                                onChange={setTypeFilter}
                                options={[{ value: 'all', label: 'All' }, ...Object.entries(NOTE_TYPE_LABELS).map(([value, label]) => ({ value: value as NoteType, label }))]}
                            />
                            {hasIndicatorNotes && (
                                <FilterMenu
                                    label="Indicator"
                                    value={indicatorFilter}
                                    onChange={setIndicatorFilter}
                                    options={[{ value: 'all', label: 'All' }, ...Object.entries(INDICATOR_LABELS).map(([value, label]) => ({ value: value as IndicatorCategory, label }))]}
                                />
                            )}
                            {hasActiveFilters && (
                                <Button
                                    size="small"
                                    onClick={() => {
                                        setTypeFilter('all');
                                        setStrategyFilter('all');
                                        setIndicatorFilter('all');
                                    }}
                                    sx={{ ml: 'auto', minWidth: 0, fontWeight: 600 }}
                                >
                                    Clear
                                </Button>
                            )}
                        </Stack>
                    )}

                    {filteredNotes.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4, fontStyle: 'italic' }}>
                            No notes yet.
                        </Typography>
                    )}
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            strategies={strategies}
                            onClick={() => {
                                setSelectedNoteId(note.id);
                                setView('detail');
                            }}
                        />
                    ))}
                </>
            )}

            {view === 'form' && (
                <Stack spacing={2.5}>
                    <Stack spacing={1}>
                        <FieldLabelAndTooltip label="Note type" sx={{ mb: 0 }} />
                        <DropDownSelector
                            value={draftType}
                            onChange={(value) => setDraftType((value as NoteType) || 'observation')}
                            options={Object.entries(NOTE_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
                        />
                    </Stack>

                    {strategies.length > 0 && (
                        <Stack spacing={1}>
                            <FieldLabelAndTooltip label="Strategy area" sx={{ mb: 0 }} />
                            <DropDownSelector
                                value={draftStrategy}
                                onChange={(value) => setDraftStrategy(value || '')}
                                placeholder="Select a strategy…"
                                options={strategies.map((s) => ({ value: s.acronym, label: s.label }))}
                            />
                        </Stack>
                    )}

                    <Stack spacing={1}>
                        <FieldLabelAndTooltip label="Indicator (optional)" sx={{ mb: 0 }} />
                        <DropDownSelector
                            value={draftIndicator}
                            onChange={(value) => setDraftIndicator(value || '')}
                            placeholder="Select an indicator…"
                            allowClear
                            options={Object.entries(INDICATOR_LABELS).map(([value, label]) => ({ value, label }))}
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <FieldLabelAndTooltip
                            label="Note"
                            tooltip="Capture qualitative context — an observation, a conversation, or a reason behind a data point — alongside the quantitative record."
                            required
                            sx={{ mb: 0 }}
                        />
                        <RstoTextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Write your note here"
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            required
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <FieldLabelAndTooltip label="Your name" sx={{ mb: 0 }} />
                        <RstoTextField
                            fullWidth
                            placeholder="e.g. Jane Smith"
                            value={draftAuthor}
                            onChange={(e) => setDraftAuthor(e.target.value)}
                            required
                        />
                    </Stack>
                </Stack>
            )}

            {view === 'detail' && selectedNote && (
                <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <RstoChip
                            text={selectedNote.indicatorCategory ? INDICATOR_LABELS[selectedNote.indicatorCategory] : NOTE_TYPE_LABELS[selectedNote.type]}
                            size="small"
                            sx={
                                selectedNote.indicatorCategory
                                    ? { bgcolor: INDICATOR_BADGE_STYLE[selectedNote.indicatorCategory].bg, color: INDICATOR_BADGE_STYLE[selectedNote.indicatorCategory].fg }
                                    : { bgcolor: TYPE_BADGE_STYLE[selectedNote.type].bg, color: TYPE_BADGE_STYLE[selectedNote.type].fg }
                            }
                        />
                        {strategies.find((s) => s.acronym === selectedNote.strategy) && (
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                {strategies.find((s) => s.acronym === selectedNote.strategy)?.label}
                            </Typography>
                        )}
                    </Stack>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {selectedNote.text}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ pt: 1.5, borderTop: '1px solid', borderColor: 'rstoGray._40' }}
                    >
                        <Box
                            sx={{
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                bgcolor: 'rstoBlue._70',
                                color: 'rstoGray.white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                flexShrink: 0,
                            }}
                        >
                            {getInitials(selectedNote.authorName)}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
                            {selectedNote.authorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
                            {formatDate(selectedNote.createdDate)}
                        </Typography>
                    </Stack>
                </Stack>
            )}
        </RstoDrawer>
    );
};

export default QualitativeNotesDrawer;
