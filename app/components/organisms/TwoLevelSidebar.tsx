'use client';
import * as React from 'react';
import {
    Box,
    Collapse,
    IconButton,
    List,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import IconNavRail, { IconNavRailProps } from '../molecules/IconNavRail';
import ExpandableListButton from '../molecules/ExpandableListButton';
import IndicatorListItem from '../molecules/IndicatorListItem';

// ─── Detail panel section types ──────────────────────────────────────

export interface IndicatorItem {
    /** Short code, e.g. "QN1" */
    code: string;
    /** Full question / description */
    description: string;
}

export interface SidebarSection {
    /** Section label, e.g. "Quantity" */
    label: string;
    /** Optional leading icon for the section header */
    icon?: OverridableComponent<SvgIconTypeMap>;
    /** Whether the section starts expanded */
    defaultOpen?: boolean;
    /** Indicator items inside this section */
    items: IndicatorItem[];
}

// ─── TwoLevelSidebar props ──────────────────────────────────────────

export interface SelectorOption {
    label: string;
    value: string;
}

export interface TwoLevelSidebarProps {
    /** Props forwarded to the IconNavRail */
    navRailProps: IconNavRailProps;
    /** Title shown at the top of the detail panel (e.g. "DASHBOARD") */
    title: string;
    /** Selector dropdown options */
    selectorOptions: SelectorOption[];
    /** Currently selected dropdown value */
    selectorValue?: string;
    /** Callback when the selector value changes */
    onSelectorChange?: (value: string) => void;
    /** Placeholder for the search input */
    searchPlaceholder?: string;
    /** Expandable indicator sections */
    sections: SidebarSection[];
    /** Callback when an indicator is selected */
    onIndicatorSelect?: (sectionLabel: string, code: string) => void;
    /** Currently selected indicator code */
    selectedIndicator?: string;
    /** Whether the detail panel starts open (default true). Can also be controlled externally. */
    detailOpen?: boolean;
    /** Callback when the collapse/expand button is clicked */
    onToggleDetail?: () => void;
}

const DetailPanel = styled(Box)(({ theme }) => ({
    width: 316,
    height: '100%',
    backgroundColor: theme.palette.rstoGray.white,
    borderRadius: '0 14px 14px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 14,
    overflowY: 'auto',
}));

/**
 * A two-level sidebar combining a slim IconNavRail with a collapsible
 * detail panel. The detail panel contains a title, selector dropdown,
 * search field, and expandable indicator sections.
 *
 * The chevron button in the header toggles the detail panel between
 * expanded and collapsed (icon-rail-only) states. Works with internal
 * state by default, or can be controlled externally via detailOpen +
 * onToggleDetail.
 */
const TwoLevelSidebar = ({
    navRailProps,
    title,
    selectorOptions,
    selectorValue,
    onSelectorChange,
    searchPlaceholder = 'Search indicators...',
    sections,
    onIndicatorSelect,
    selectedIndicator,
    detailOpen: detailOpenProp,
    onToggleDetail,
}: TwoLevelSidebarProps) => {
    // Internal state — used when no external onToggleDetail is provided
    const [internalOpen, setInternalOpen] = React.useState(detailOpenProp ?? true);

    // Controlled vs uncontrolled: if onToggleDetail is provided, defer to the prop
    const isControlled = onToggleDetail !== undefined;
    const isDetailOpen = isControlled ? (detailOpenProp ?? true) : internalOpen;

    const handleToggle = () => {
        if (isControlled) {
            onToggleDetail?.();
        } else {
            setInternalOpen((prev) => !prev);
        }
    };

    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        sections.forEach((s) => {
            initial[s.label] = s.defaultOpen ?? true;
        });
        return initial;
    });

    const [searchTerm, setSearchTerm] = React.useState('');

    const toggleSection = (label: string) => {
        setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const filteredSections = React.useMemo(() => {
        if (!searchTerm) return sections;
        const lower = searchTerm.toLowerCase();
        return sections
            .map((section) => ({
                ...section,
                items: section.items.filter(
                    (item) =>
                        item.code.toLowerCase().includes(lower) ||
                        item.description.toLowerCase().includes(lower)
                ),
            }))
            .filter((section) => section.items.length > 0);
    }, [sections, searchTerm]);

    return (
        <Box sx={{ display: 'flex', height: '100%', flex: 1, minHeight: '100vh' }}>
            <IconNavRail
                {...navRailProps}
                onExpandClick={!isDetailOpen ? handleToggle : undefined}
            />

            {isDetailOpen && (
                <DetailPanel>
                    {/* Header */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ pl: '7px' }}>
                            {title}
                        </Typography>
                        <IconButton onClick={handleToggle} size="small" aria-label="Collapse sidebar">
                            <ChevronLeftIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Stack>

                    {/* Selector dropdown — only rendered when options are provided */}
                    {selectorOptions.length > 0 && (
                        <Select
                            value={selectorValue ?? ''}
                            onChange={(e: SelectChangeEvent<string>) => onSelectorChange?.(e.target.value)}
                            displayEmpty
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rstoGray._50',
                                },
                                '& .MuiSelect-select': {
                                    py: '10px',
                                },
                            }}
                        >
                            {selectorOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {option.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    )}

                    {/* Search */}
                    <TextField
                        size="small"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ fontSize: 16, color: 'rstoGray._70', mr: '4px' }} />,
                            sx: {
                                borderRadius: '8px',
                                backgroundColor: 'rstoGray._20',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rstoGray._60',
                                },
                            },
                        }}
                        fullWidth
                    />

                    {/* Sections */}
                    <List disablePadding>
                        {filteredSections.map((section, index) => (
                            <React.Fragment key={section.label}>
                                <Box sx={index > 0 ? { mt: 1 } : undefined}>
                                    <ExpandableListButton
                                        text={section.label}
                                        icon={section.icon}
                                        open={openSections[section.label] ?? false}
                                        onClick={() => toggleSection(section.label)}
                                    />
                                </Box>
                                <Collapse
                                    in={openSections[section.label] ?? false}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List disablePadding>
                                        {section.items.map((item) => (
                                            <IndicatorListItem
                                                key={item.code}
                                                code={item.code}
                                                description={item.description}
                                                selected={selectedIndicator === item.code}
                                                onClick={() =>
                                                    onIndicatorSelect?.(section.label, item.code)
                                                }
                                            />
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </List>
                </DetailPanel>
            )}
        </Box>
    );
};

export default TwoLevelSidebar;
