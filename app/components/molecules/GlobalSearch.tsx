'use client';
import * as React from 'react';
import {
    Box,
    ClickAwayListener,
    InputBase,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Popper,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { rstoNeutral, rstoBrown } from '../../theme/tokens';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SearchItem {
    id: string;
    /** Short indicator code, e.g. "QN1". Optional — plain nav items may omit it. */
    code?: string;
    /** Full label shown in results, e.g. "Are there enough ECEC places?" */
    label: string;
    /** Category path shown beneath the label, e.g. "Dashboard · Quantity" */
    category: string;
    /** Optional destination — passed back to onSelect for navigation. */
    href?: string;
}

export interface GlobalSearchProps {
    /** Flat list of all searchable items. Build from your nav/indicator structure. */
    items: SearchItem[];
    placeholder?: string;
    /** Called when the user clicks a result. Use for routing in the consuming page. */
    onSelect?: (item: SearchItem) => void;
    /** Input width. Defaults to 280px. */
    width?: number | string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function filterItems(items: SearchItem[], query: string): SearchItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter(
        (item) =>
            item.label.toLowerCase().includes(q) ||
            item.code?.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q),
    );
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * GlobalSearch — keyword search over a flat `SearchItem[]` index.
 *
 * Renders a rounded pill input. As the user types, a Popper dropdown shows
 * matching results filtered by label, code, and category. Clicking a result
 * calls `onSelect` and clears the input.
 *
 * **Usage:** Build the `items` array from your nav/indicator manifest and
 * wire `onSelect` to your router. The component is stateless with respect
 * to navigation — it only filters and notifies.
 */
const GlobalSearch = ({
    items,
    placeholder = 'Search',
    onSelect,
    width = 280,
}: GlobalSearchProps) => {
    const [query, setQuery] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const results = filterItems(items, query);
    const showDropdown = open && query.trim().length > 0;

    const handleSelect = (item: SearchItem) => {
        onSelect?.(item);
        setQuery('');
        setOpen(false);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width }}>
                {/* Input */}
                <Box
                    ref={anchorRef}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        px: '10px',
                        height: 36,
                        borderRadius: '18px',
                        border: '1px solid',
                        borderColor: open ? rstoBrown._60 : rstoNeutral.sand,
                        backgroundColor: rstoNeutral.paper,
                        transition: 'border-color 0.15s',
                        '&:hover': { borderColor: rstoNeutral.stone },
                    }}
                >
                    <SearchIcon sx={{ fontSize: 16, color: rstoNeutral.stone, flexShrink: 0 }} />
                    <InputBase
                        value={query}
                        placeholder={placeholder}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        inputProps={{ 'aria-label': placeholder, role: 'combobox', 'aria-expanded': showDropdown, 'aria-haspopup': 'listbox' }}
                        sx={{
                            flex: 1,
                            fontSize: 13,
                            fontFamily: '"Inter", sans-serif',
                            color: rstoNeutral.ink,
                            '& input::placeholder': { color: rstoNeutral.stone, opacity: 1 },
                        }}
                    />
                </Box>

                {/* Results dropdown */}
                <Popper
                    open={showDropdown}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    style={{ zIndex: 1300, width: anchorRef.current?.offsetWidth ?? width }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            mt: '4px',
                            borderRadius: '10px',
                            border: '1px solid',
                            borderColor: rstoNeutral.sand,
                            overflow: 'hidden',
                            maxHeight: 320,
                            overflowY: 'auto',
                        }}
                    >
                        {results.length === 0 ? (
                            <Box sx={{ px: 2, py: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    No results for &ldquo;{query}&rdquo;
                                </Typography>
                            </Box>
                        ) : (
                            <List dense disablePadding role="listbox">
                                {results.map((item) => (
                                    <ListItemButton
                                        key={item.id}
                                        role="option"
                                        onClick={() => handleSelect(item)}
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            borderBottom: '1px solid',
                                            borderColor: rstoNeutral.bone,
                                            '&:last-child': { borderBottom: 'none' },
                                            '&:hover': { backgroundColor: rstoNeutral.bone },
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                                    {item.code && (
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontSize: 10,
                                                                fontWeight: 700,
                                                                fontFamily: '"Inter", sans-serif',
                                                                color: rstoBrown._60,
                                                                letterSpacing: '0.04em',
                                                                textTransform: 'uppercase',
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {item.code}
                                                        </Typography>
                                                    )}
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontSize: 13,
                                                            fontFamily: '"Inter", sans-serif',
                                                            color: rstoNeutral.ink,
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        fontSize: 11,
                                                        fontFamily: '"Inter", sans-serif',
                                                        color: rstoNeutral.shadow,
                                                    }}
                                                >
                                                    {item.category}
                                                </Typography>
                                            }
                                            disableTypography
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export default GlobalSearch;
