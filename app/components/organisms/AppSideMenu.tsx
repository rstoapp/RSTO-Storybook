'use client';

import * as React from 'react';
import {
    Box,
    Chip,
    Collapse,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RstoNavLeaf = {
    id: string;
    label: string;
    code?: string;      // e.g. "QL1" — when set, renders the code badge above the label
    badgeCount?: number;
};

export type RstoNavSubGroup = {
    id: string;
    label: string;
    children: RstoNavLeaf[];
};

/** A child of a top-level nav item: either a plain leaf or a collapsible sub-group */
export type RstoNavChildItem = RstoNavLeaf | RstoNavSubGroup;

const isSubGroup = (item: RstoNavChildItem): item is RstoNavSubGroup =>
    'children' in item && Array.isArray((item as RstoNavSubGroup).children);

// ─── Strategy index types (for embedding the INDEX panel inside the nav) ──────

export type RstoIndicatorSection = {
    id: string;
    label: string; // e.g. "Quantity" | "Quality" | "Participation"
    items: RstoNavLeaf[];
};

export type RstoStrategy = {
    id: string;
    label: string; // e.g. "ANC" | "ECEC"
    sections: RstoIndicatorSection[];
};

export type RstoNavItem = {
    id: string;
    label: string;
    icon: React.ReactElement;
    /** Standard flat/grouped children for a nav item */
    children?: RstoNavChildItem[];
    /** Strategy index panel — replaces `children` when set; embeds strategy tabs + indicator index directly in the side menu */
    strategyGroups?: RstoStrategy[];
};

export type Environment = 'preview' | 'ci' | 'production';

const ENV_CONFIG: Record<Exclude<Environment, 'production'>, { label: string; color: 'warning' | 'info' }> = {
    preview: { label: 'Preview', color: 'warning' },
    ci:      { label: 'CI Planning', color: 'info' },
};

export type AppSideMenuProps = {
    brandName?: string;
    activeItemId?: string;
    onItemSelect?: (itemId: string) => void;
    onLogout?: () => void;
    defaultOpenIds?: string[];
    navItems?: RstoNavItem[];
    utilityItems?: RstoNavItem[];
    environment?: Environment;
};

// ─── Default data ─────────────────────────────────────────────────────────────

const defaultNavItems: RstoNavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlinedIcon sx={{ fontSize: 16 }} />,
        children: [
            {
                id: 'quality',
                label: 'Quality',
                children: [
                    { id: 'quality-1', code: 'QL1', label: 'Are services meeting quality standards?' },
                    { id: 'quality-2', code: 'QL2', label: 'Staff qualifications and training' },
                ],
            },
            {
                id: 'quantity',
                label: 'Quantity',
                children: [
                    { id: 'quantity-1', code: 'QN1', label: 'Are there adequate antenatal care facilities?' },
                    { id: 'quantity-2', code: 'QN2', label: 'Service provider capacity' },
                ],
            },
            {
                id: 'participation',
                label: 'Participation',
                children: [
                    { id: 'participation-1', code: 'P1', label: 'Community engagement levels' },
                    { id: 'participation-2', code: 'P2', label: 'Enrolment and attendance rates' },
                ],
            },
        ],
    },
    { id: 'upload', label: 'Upload', icon: <FileUploadOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'ci-planning', label: 'CI Planning', icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'resources', label: 'Resources', icon: <FolderOutlinedIcon sx={{ fontSize: 16 }} /> },
];

const defaultUtilityItems: RstoNavItem[] = [
    { id: 'support', label: 'Support', icon: <SupportAgentOutlinedIcon sx={{ fontSize: 16 }} /> },
    {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsOutlinedIcon sx={{ fontSize: 16 }} />,
        children: [
            { id: 'directory', label: 'Directory' },
            { id: 'user-management', label: 'User Management' },
        ],
    },
];

// ─── Level-3 leaf: page link inside a sub-group ───────────────────────────────

// ─── Sub-nav item — renders code + label (indicator style) or label only ─────

const SubNavItem = ({
    item,
    selected,
    onClick,
}: {
    item: RstoNavLeaf;
    selected: boolean;
    onClick: () => void;
}) => (
    <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
            borderRadius: '6px',
            minHeight: 34,
            pl: 2,
            pr: 1.5,
            py: 0.5,
            mb: 0.25,
            alignItems: item.code ? 'flex-start' : 'center',
            '&.Mui-selected': {
                backgroundColor: 'rstoOrange._10',
            },
            '&.Mui-selected:hover': { backgroundColor: 'rstoOrange._10' },
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        {item.code ? (
            <Box>
                <Typography sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'rstoOrange._70',
                    lineHeight: 1.3,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                }}>
                    {item.code}
                </Typography>
                <Typography sx={{
                    fontSize: 12,
                    fontWeight: selected ? 500 : 400,
                    color: 'rstoGray._90',
                    lineHeight: 1.4,
                }}>
                    {item.label}
                </Typography>
            </Box>
        ) : (
            <>
                <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: selected ? 500 : 400,
                        color: 'rstoGray._90',
                        lineHeight: 1.4,
                    }}
                />
                {typeof item.badgeCount === 'number' && (
                    <Chip
                        size="small"
                        label={item.badgeCount}
                        sx={{
                            height: 18,
                            minWidth: 18,
                            '& .MuiChip-label': { px: 0.6, fontSize: 10, fontWeight: 700 },
                            bgcolor: 'rstoOrange._70',
                            color: 'rstoGray.white',
                            borderRadius: '10px',
                        }}
                    />
                )}
            </>
        )}
    </ListItemButton>
);

// ─── Sub-group header (Quality / Quantity / Participation) ────────────────────

const SubNavGroupHeader = ({
    subGroup,
    open,
    onToggle,
}: {
    subGroup: RstoNavSubGroup;
    open: boolean;
    onToggle: () => void;
}) => (
    <ListItemButton
        onClick={onToggle}
        sx={{
            position: 'relative',
            borderRadius: '6px',
            minHeight: 34,
            pl: 2,
            pr: 1.5,
            py: 0.5,
            ml: 0,
            mb: 0.25,
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        <ListItemText
            primary={subGroup.label}
            sx={{ position: 'relative', zIndex: 1 }}
            primaryTypographyProps={{
                fontSize: 13,
                fontWeight: 600,
                color: 'rstoGray.black',
            }}
        />
        {open
            ? <KeyboardArrowDownRoundedIcon sx={{ color: 'rstoGray._80', fontSize: 14, position: 'relative', zIndex: 1 }} />
            : <KeyboardArrowRightRoundedIcon sx={{ color: 'rstoGray._80', fontSize: 14, position: 'relative', zIndex: 1 }} />
        }
    </ListItemButton>
);

// ─── Sub-group section: header + collapsible leaves ──────────────────────────

const SubGroupSection = ({
    subGroup,
    selectedId,
    open,
    onToggle,
    onSelectLeaf,
}: {
    subGroup: RstoNavSubGroup;
    selectedId: string;
    open: boolean;
    onToggle: () => void;
    onSelectLeaf: (id: string) => void;
}) => (
    <>
        <SubNavGroupHeader
            subGroup={subGroup}
            open={open}
            onToggle={onToggle}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
                {subGroup.children.map((leaf, idx) => (
                    <SubNavItem
                        key={leaf.id}
                        item={leaf}
                        selected={selectedId === leaf.id}
                        onClick={() => onSelectLeaf(leaf.id)}
                    />
                ))}
            </List>
        </Collapse>
    </>
);

// ─── Strategy index panel (strategy tabs + collapsible index sections) ────────

const StrategyIndexPanel = ({
    strategies,
    selectedItemId,
    onSelectItem,
}: {
    strategies: RstoStrategy[];
    selectedItemId: string;
    onSelectItem: (id: string) => void;
}) => {
    const initialStrategy =
        strategies.find((s) =>
            s.sections.some((sec) => sec.items.some((item) => item.id === selectedItemId))
        )?.id ?? strategies[0]?.id ?? '';

    const [activeStrategy, setActiveStrategy] = React.useState(initialStrategy);
    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() => {
        // Open the section that contains the selected item by default
        const init: Record<string, boolean> = {};
        strategies.forEach((s) =>
            s.sections.forEach((sec) => {
                if (sec.items.some((item) => item.id === selectedItemId)) {
                    init[sec.id] = true;
                }
            })
        );
        return init;
    });

    const currentStrategy = strategies.find((s) => s.id === activeStrategy);

    const toggleSection = (sectionId: string) =>
        setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));

    return (
        <Box sx={{ mt: 0.25 }}>
            {/* Strategy tab selector — only shown when there are multiple strategies */}
            {strategies.length > 1 && (
                <Box sx={{ px: 1.5, mb: 0.5 }}>
                    <Tabs
                        value={activeStrategy}
                        onChange={(_, v) => setActiveStrategy(v)}
                        variant="scrollable"
                        scrollButtons="auto"
                        TabIndicatorProps={{ sx: { height: 2, backgroundColor: 'rstoOrange._70' } }}
                        sx={{
                            minHeight: 30,
                            '& .MuiTab-root': {
                                minHeight: 30,
                                py: 0.25,
                                px: 1,
                                fontSize: 11,
                                fontWeight: 500,
                                minWidth: 0,
                                textTransform: 'none',
                                color: 'rstoGray._80',
                                '&.Mui-selected': { color: 'rstoOrange._70', fontWeight: 600 },
                            },
                        }}
                    >
                        {strategies.map((s) => (
                            <Tab key={s.id} label={s.label} value={s.id} />
                        ))}
                    </Tabs>
                    <Divider />
                </Box>
            )}

            {/* Indicator sections */}
            <List disablePadding sx={{ pt: 0.25 }}>
                {currentStrategy?.sections.map((section) => (
                    <React.Fragment key={section.id}>
                        <ListItemButton
                            onClick={() => toggleSection(section.id)}
                            sx={{
                                position: 'relative',
                                borderRadius: '6px',
                                minHeight: 34,
                                pl: 2,
                                pr: 1,
                                py: 0.5,
                                ml: 0,
                                mb: 0.25,
                                '&:hover': { backgroundColor: 'rstoGray._40' },
                            }}
                        >
                            <ListItemText
                                primary={section.label}
                                sx={{ position: 'relative', zIndex: 1 }}
                                primaryTypographyProps={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: 'rstoGray.black',
                                }}
                            />
                            {openSections[section.id]
                                ? <KeyboardArrowDownRoundedIcon sx={{ color: 'rstoGray._80', fontSize: 14 }} />
                                : <KeyboardArrowRightRoundedIcon sx={{ color: 'rstoGray._80', fontSize: 14 }} />
                            }
                        </ListItemButton>
                        <Collapse in={openSections[section.id] ?? false} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                {section.items.map((item) => (
                                    <SubNavItem
                                        key={item.id}
                                        item={item}
                                        selected={selectedItemId === item.id}
                                        onClick={() => onSelectItem(item.id)}
                                    />
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

// ─── Top-level nav row ────────────────────────────────────────────────────────

const TopLevelRow = ({
    item,
    selected,
    open,
    onClick,
}: {
    item: RstoNavItem;
    selected: boolean;
    open?: boolean;
    onClick: () => void;
}) => (
    <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
            borderRadius: '8px',
            minHeight: 44,
            px: 1.5,
            py: 0.75,
            mb: 0.25,
            position: 'relative',
            '&.Mui-selected': {
                backgroundColor: 'rstoOrange._10',
            },
            '&.Mui-selected::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 3,
                height: 16,
                borderRadius: '0 2px 2px 0',
                backgroundColor: 'rstoOrange._70',
            },
            '&.Mui-selected:hover': { backgroundColor: 'rstoOrange._10' },
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        <ListItemIcon sx={{ minWidth: 24, color: selected ? 'rstoOrange._70' : 'rstoGray._90' }}>
            {item.icon}
        </ListItemIcon>
        <ListItemText
            primary={item.label}
            primaryTypographyProps={{
                fontSize: 14,
                fontWeight: selected ? 500 : 400,
                color: selected ? 'rstoOrange._70' : 'rstoGray.black',
            }}
        />
        {(item.children || item.strategyGroups) && (
            open
                ? <KeyboardArrowDownRoundedIcon sx={{ color: selected ? 'rstoOrange._70' : 'rstoGray._80', fontSize: 16 }} />
                : <KeyboardArrowRightRoundedIcon sx={{ color: selected ? 'rstoOrange._70' : 'rstoGray._80', fontSize: 16 }} />
        )}
    </ListItemButton>
);

// ─── Nav group ────────────────────────────────────────────────────────────────

const NavGroup = ({
    item,
    selectedId,
    open,
    openIds,
    onToggle,
    onToggleChild,
    onSelectLeaf,
}: {
    item: RstoNavItem;
    selectedId: string;
    open: boolean;
    openIds: Record<string, boolean>;
    onToggle: () => void;
    onToggleChild: (id: string) => void;
    onSelectLeaf: (id: string) => void;
}) => {
    const children = item.children!;

    const hasSelectedDescendant = children.some((child) => {
        if (isSubGroup(child)) return child.children.some((l) => l.id === selectedId);
        return child.id === selectedId;
    });

    return (
        <>
            <TopLevelRow
                item={item}
                selected={hasSelectedDescendant || open}
                open={open}
                onClick={onToggle}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pt: 0.25 }}>
                    {children.map((child, index) =>
                        isSubGroup(child) ? (
                            <SubGroupSection
                                key={child.id}
                                subGroup={child}
                                selectedId={selectedId}
                                open={openIds[child.id] ?? false}
                                onToggle={() => onToggleChild(child.id)}
                                onSelectLeaf={onSelectLeaf}
                            />
                        ) : (
                            <SubNavItem
                                key={child.id}
                                item={child}
                                selected={selectedId === child.id}
                                onClick={() => onSelectLeaf(child.id)}
                            />
                        )
                    )}
                </List>
            </Collapse>
        </>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────

const AppSideMenu = ({
    brandName = 'RSTO',
    activeItemId = 'quantity-1',
    onItemSelect,
    onLogout,
    defaultOpenIds = ['dashboard', 'quantity'],
    navItems = defaultNavItems,
    utilityItems = defaultUtilityItems,
    environment,
}: AppSideMenuProps) => {
    const safeNavItems = Array.isArray(navItems) ? navItems : [];
    const safeUtilityItems = Array.isArray(utilityItems) ? utilityItems : [];

    const [collapsed, setCollapsed] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(activeItemId);
    const [openIds, setOpenIds] = React.useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        defaultOpenIds.forEach((id) => { init[id] = true; });
        return init;
    });

    React.useEffect(() => {
        setSelectedId(activeItemId);
    }, [activeItemId]);

    const selectItem = (itemId: string) => {
        setSelectedId(itemId);
        onItemSelect?.(itemId);
    };

    const toggleOpen = (id: string) => {
        setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const isItemActive = (item: RstoNavItem): boolean => {
        if (item.id === selectedId) return true;
        if (item.strategyGroups) {
            return item.strategyGroups.some((s) =>
                s.sections.some((sec) => sec.items.some((leaf) => leaf.id === selectedId))
            );
        }
        if (!item.children) return false;
        return item.children.some(child =>
            isSubGroup(child)
                ? child.children.some(l => l.id === selectedId)
                : child.id === selectedId
        );
    };

    const renderCollapsedItem = (item: RstoNavItem) => {
        const active = isItemActive(item);
        return (
            <ListItemButton
                key={item.id}
                selected={active}
                onClick={() => selectItem(item.id)}
                sx={{
                    borderRadius: '8px',
                    minHeight: 44,
                    justifyContent: 'center',
                    px: 0,
                    py: 0.75,
                    mb: 0.25,
                    position: 'relative',
                    '&.Mui-selected': { backgroundColor: 'rstoOrange._10' },
                    '&.Mui-selected::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 3,
                        height: 16,
                        borderRadius: '0 2px 2px 0',
                        backgroundColor: 'rstoOrange._70',
                    },
                    '&.Mui-selected:hover': { backgroundColor: 'rstoOrange._10' },
                    '&:hover': { backgroundColor: 'rstoGray._40' },
                }}
            >
                <Box sx={{ color: active ? 'rstoOrange._70' : 'rstoGray._90', display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                </Box>
            </ListItemButton>
        );
    };

    const renderItem = (item: RstoNavItem) => {
        if (item.strategyGroups) {
            const active = isItemActive(item);
            const open = openIds[item.id] ?? false;
            return (
                <React.Fragment key={item.id}>
                    <TopLevelRow
                        item={item}
                        selected={active || open}
                        open={open}
                        onClick={() => toggleOpen(item.id)}
                    />
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <StrategyIndexPanel
                            strategies={item.strategyGroups}
                            selectedItemId={selectedId}
                            onSelectItem={selectItem}
                        />
                    </Collapse>
                </React.Fragment>
            );
        }
        if (item.children) {
            return (
                <NavGroup
                    key={item.id}
                    item={item}
                    selectedId={selectedId}
                    open={openIds[item.id] ?? false}
                    openIds={openIds}
                    onToggle={() => toggleOpen(item.id)}
                    onToggleChild={toggleOpen}
                    onSelectLeaf={selectItem}
                />
            );
        }
        return (
            <TopLevelRow
                key={item.id}
                item={item}
                selected={selectedId === item.id}
                onClick={() => selectItem(item.id)}
            />
        );
    };

    if (collapsed) {
        return (
            <Paper
                elevation={0}
                square
                sx={{
                    width: 68,
                    height: '100vh',
                    overflowY: 'auto',
                    backgroundColor: 'rstoGray.white',
                    border: '1px solid',
                    borderColor: 'rstoGray._50',
                    px: 0.5,
                    py: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                }}
            >
                <Box sx={{ py: 1, mb: 2.5, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src="/rsto_logomark_fullcolour.svg"
                        alt={brandName}
                        style={{ width: 'auto', height: 32, display: 'block' }}
                    />
                </Box>

                <List disablePadding>{safeNavItems.map(renderCollapsedItem)}</List>

                <Divider sx={{ my: 0.75 }} />

                <List disablePadding>{safeUtilityItems.map(renderCollapsedItem)}</List>

                <Box sx={{ mt: 'auto', pt: 0.75 }}>
                    {onLogout && (
                        <>
                            <Divider sx={{ mb: 0.75 }} />
                            <ListItemButton
                                onClick={onLogout}
                                sx={{
                                    borderRadius: '8px',
                                    minHeight: 44,
                                    justifyContent: 'center',
                                    px: 0,
                                    py: 0.75,
                                    mb: 0.25,
                                    '&:hover': { backgroundColor: 'rstoGray._40' },
                                }}
                            >
                                <LogoutRoundedIcon sx={{ fontSize: 16, color: 'rstoGray._90' }} />
                            </ListItemButton>
                        </>
                    )}
                    <ListItemButton
                        onClick={() => setCollapsed(false)}
                        sx={{
                            borderRadius: '8px',
                            minHeight: 44,
                            justifyContent: 'center',
                            px: 0,
                            py: 0.75,
                            '&:hover': { backgroundColor: 'rstoGray._40' },
                        }}
                    >
                        <KeyboardDoubleArrowRightRoundedIcon sx={{ fontSize: 16, color: 'rstoGray._90' }} />
                    </ListItemButton>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            square
            sx={{
                width: 270,
                height: '100vh',
                overflowY: 'auto',
                backgroundColor: 'rstoGray.white',
                border: '1px solid',
                borderColor: 'rstoGray._50',
                px: 2.5,
                pt: 3,
                pb: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
            }}
        >
            <Box sx={{ px: 1.5, pt: 0, pb: 0, mb: 3.5 }}>
                <img
                    src="/rsto_logomark_fullcolour.svg"
                    alt={brandName}
                    style={{ width: 'auto', height: 64, display: 'block' }}
                />
            </Box>

            <List disablePadding>{safeNavItems.map(renderItem)}</List>

            <Divider sx={{ my: 0.75 }} />

            <List disablePadding>{safeUtilityItems.map(renderItem)}</List>

            <Box sx={{ mt: 'auto', pt: 0.75 }}>
                {onLogout && (
                    <>
                        <Divider sx={{ mb: 0.75 }} />
                        <ListItemButton
                            onClick={onLogout}
                            sx={{
                                borderRadius: '8px',
                                minHeight: 44,
                                px: 1.5,
                                py: 0.75,
                                mb: 0.25,
                                '&:hover': { backgroundColor: 'rstoGray._40' },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 24, color: 'rstoGray._90' }}>
                                <LogoutRoundedIcon sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Log out"
                                primaryTypographyProps={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: 'rstoGray.black',
                                }}
                            />
                        </ListItemButton>
                    </>
                )}
                {environment && environment !== 'production' && (
                    <Chip
                        label={ENV_CONFIG[environment].label}
                        color={ENV_CONFIG[environment].color}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1, fontWeight: 500, fontSize: 11 }}
                    />
                )}
                <ListItemButton
                    onClick={() => setCollapsed(true)}
                    sx={{
                        borderRadius: '8px',
                        minHeight: 44,
                        px: 1.5,
                        py: 0.75,
                        '&:hover': { backgroundColor: 'rstoGray._40' },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 24, color: 'rstoGray._90' }}>
                        <KeyboardDoubleArrowLeftRoundedIcon sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Collapse sidebar"
                        primaryTypographyProps={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: 14,
                            fontWeight: 400,
                            color: 'rstoGray.black',
                        }}
                    />
                </ListItemButton>
            </Box>
        </Paper>
    );
};

export default AppSideMenu;
