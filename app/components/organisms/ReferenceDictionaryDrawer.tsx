'use client';
import * as React from 'react';
import {
    Box,
    Stack,
    Typography,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RstoDrawer from '../molecules/RstoDrawer';
import RstoTextField from '../atoms/RstoTextField';

export interface ReferenceTerm {
    id: string;
    /** Acronym or short label, e.g. "ANC" */
    short: string;
    /** Expanded name, e.g. "Antenatal Care" */
    full: string;
    category: string;
    description: string;
}

export interface ReferenceDictionaryDrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    terms: ReferenceTerm[];
}

const ALL_CATEGORY = 'All';

/** Stable token-driven colour per category — cycles through the palette by category order, so any taxonomy works without hard-coding category names. */
const CATEGORY_PALETTE = [
    { dot: 'rstoBlue._60', text: 'rstoBlue._70', tint: 'rstoBlue._10' },
    { dot: 'rstoGreen._50', text: 'rstoGreen._60', tint: 'rstoGreen._10' },
    { dot: 'rstoOrange._50', text: 'rstoOrange._70', tint: 'rstoOrange._10' },
    { dot: 'rstoBrown._40', text: 'rstoBrown._60', tint: 'rstoBrown._10' },
    { dot: 'rstoGray._70', text: 'rstoGray._90', tint: 'rstoGray._30' },
] as const;

function useCategoryStyles(categories: string[]) {
    return React.useMemo(() => {
        const map = new Map<string, (typeof CATEGORY_PALETTE)[number]>();
        categories.forEach((category, i) => map.set(category, CATEGORY_PALETTE[i % CATEGORY_PALETTE.length]));
        return map;
    }, [categories]);
}

interface TermRowProps {
    term: ReferenceTerm;
    open: boolean;
    onToggle: () => void;
    categoryStyle: (typeof CATEGORY_PALETTE)[number];
}

const TermRow: React.FC<TermRowProps> = ({ term, open, onToggle, categoryStyle }) => (
    <Box sx={{ borderBottom: '1px solid', borderColor: 'rstoGray._40' }}>
        <Box
            component="button"
            onClick={onToggle}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.5,
                px: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ width: 56, flexShrink: 0 }}>
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: categoryStyle.dot,
                        flexShrink: 0,
                    }}
                />
                <Typography variant="caption" fontWeight={700} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {term.short}
                </Typography>
            </Stack>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    flex: 1,
                    lineHeight: 1.3,
                    whiteSpace: open ? 'normal' : 'nowrap',
                    overflow: open ? 'visible' : 'hidden',
                    textOverflow: open ? 'clip' : 'ellipsis',
                }}
            >
                {term.full}
            </Typography>

            <ChevronRightIcon
                fontSize="small"
                sx={{
                    flexShrink: 0,
                    opacity: 0.6,
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 150ms ease',
                }}
            />
        </Box>

        {open && (
            <Box sx={{ pb: 2, pl: '68px', pr: 0 }}>
                <Box
                    sx={{
                        display: 'inline-block',
                        bgcolor: categoryStyle.tint,
                        px: 0.875,
                        py: 0.25,
                        borderRadius: '4px',
                        mb: 0.875,
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{ color: categoryStyle.text, letterSpacing: '0.04em' }}
                    >
                        {term.category}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                    {term.description}
                </Typography>
            </Box>
        )}
    </Box>
);

const ReferenceDictionaryDrawer: React.FC<ReferenceDictionaryDrawerProps> = ({
    open,
    onClose,
    title = 'Reference dictionary',
    terms,
}) => {
    const [query, setQuery] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState(ALL_CATEGORY);
    const [openTerm, setOpenTerm] = React.useState<string | null>(null);

    const categories = React.useMemo(
        () => Array.from(new Set(terms.map((t) => t.category))),
        [terms]
    );
    const categoryStyles = useCategoryStyles(categories);

    const filteredTerms = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        return terms
            .filter((t) => activeCategory === ALL_CATEGORY || t.category === activeCategory)
            .filter((t) => !q || t.short.toLowerCase().includes(q) || t.full.toLowerCase().includes(q))
            .sort((a, b) => a.short.localeCompare(b.short));
    }, [terms, query, activeCategory]);

    return (
        <RstoDrawer
            open={open}
            onClose={onClose}
            title={title}
            icon={<MenuBookOutlinedIcon sx={{ fontSize: '2rem', color: 'rstoBlue._70' }} />}
            width={440}
        >
            <Stack spacing={1.5} sx={{ mb: 1.5 }}>
                <RstoTextField
                    fullWidth
                    size="small"
                    placeholder="Search acronyms…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Box
                                    sx={{
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'rstoGray._40',
                                        borderRadius: '5px',
                                        px: 0.75,
                                    }}
                                >
                                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                                        {filteredTerms.length}
                                    </Typography>
                                </Box>
                            </InputAdornment>
                        ),
                    }}
                />

                {categories.length > 1 && (
                    <ToggleButtonGroup
                        value={activeCategory}
                        exclusive
                        onChange={(_, value) => value && setActiveCategory(value)}
                        size="small"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <ToggleButton value={ALL_CATEGORY} sx={{ textTransform: 'none' }}>
                            All
                        </ToggleButton>
                        {categories.map((category) => (
                            <ToggleButton key={category} value={category} sx={{ textTransform: 'none', gap: 0.75 }}>
                                <Box
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor:
                                            activeCategory === category
                                                ? 'rstoGray.white'
                                                : categoryStyles.get(category)?.dot,
                                    }}
                                />
                                {category}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            </Stack>

            <Box>
                {filteredTerms.length === 0 && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center', py: 4, fontStyle: 'italic' }}
                    >
                        No terms match.
                    </Typography>
                )}
                {filteredTerms.map((term) => (
                    <TermRow
                        key={term.id}
                        term={term}
                        open={openTerm === term.id}
                        onToggle={() => setOpenTerm(openTerm === term.id ? null : term.id)}
                        categoryStyle={categoryStyles.get(term.category) ?? CATEGORY_PALETTE[0]}
                    />
                ))}
            </Box>
        </RstoDrawer>
    );
};

export default ReferenceDictionaryDrawer;
