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
    useMediaQuery,
    useTheme,
} from '@mui/material';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'; // Dashboard
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';            // Submit Data
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';              // Directory
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';                        // Planning
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';                        // Resources
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';        // User Management (admin only)
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'; // Feedback
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';                // Settings
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';                    // Sign Out
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';   // Collapse sidebar
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';    // Expand sidebar

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

// ─── Variant colour schemes ───────────────────────────────────────────────────

export type SideNavVariant = 'service-provider' | 'community' | 'hub' | 'admin';

type NavColorScheme = {
    activeBg: string;
    activeBorder: string;
    activeText: string;
};

// Single universal colour scheme — all user types see the same active state
const activeScheme: NavColorScheme = {
    activeBg:     '#E8F2F4',  // rstoBlue._10 — sky tint
    activeBorder: '#2D6B7A',  // rstoBlue._70 — dusk teal (5.27:1 on bg, passes WCAG AA)
    activeText:   '#2D6B7A',  // rstoBlue._70 — dusk teal (5.27:1 on bg, passes WCAG AA)
};

// Kept for backward compat — all variants now resolve to the same scheme
const variantSchemes: Record<SideNavVariant, NavColorScheme> = {
    'service-provider': activeScheme,
    community:          activeScheme,
    hub:                activeScheme,
    admin:              activeScheme,
};

const defaultColorScheme: NavColorScheme = activeScheme;

const NavColorContext = React.createContext<NavColorScheme>(defaultColorScheme);

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
    ci:      { label: 'Testing Environment 1.0', color: 'info' },
};

export type AppSideMenuProps = {
    /** When set, uses preset nav items and colour scheme for the given user type. */
    variant?: SideNavVariant;
    orgName?: string;
    userName?: string;
    userEmail?: string;
    brandName?: string;
    activeItemId?: string;
    onItemSelect?: (itemId: string) => void;
    onLogout?: () => void;
    defaultOpenIds?: string[];
    navItems?: RstoNavItem[];
    utilityItems?: RstoNavItem[];
    environment?: Environment;
    /** Force the sidebar open regardless of viewport width. Useful for Storybook. */
    defaultExpanded?: boolean;
};

// ─── Default data ─────────────────────────────────────────────────────────────

const defaultNavItems: RstoNavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <SpaceDashboardOutlinedIcon sx={{ fontSize: 20 }} />,
    },
    { id: 'upload', label: 'Upload', icon: <FileUploadOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 'ci-planning', label: 'CI Planning', icon: <LoopOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 'resources', label: 'Resources', icon: <BookOutlinedIcon sx={{ fontSize: 20 }} /> },
];

const defaultUtilityItems: RstoNavItem[] = [
    { id: 'support', label: 'Support', icon: <SupportAgentOutlinedIcon sx={{ fontSize: 20 }} /> },
    {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsOutlinedIcon sx={{ fontSize: 20 }} />,
        children: [
            { id: 'directory', label: 'Directory' },
            { id: 'user-management', label: 'User Management' },
        ],
    },
];

// ─── Variant preset nav items ─────────────────────────────────────────────────

// ── Shared icon references for consistency ────────────────────────────────────
const NAV_ICONS = {
    dashboard:      <SpaceDashboardOutlinedIcon sx={{ fontSize: 20 }} />,
    submitData:     <FileUploadOutlinedIcon sx={{ fontSize: 20 }} />,
    directory:      <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />,
    planning:       <LoopOutlinedIcon sx={{ fontSize: 20 }} />,
    resources:      <BookOutlinedIcon sx={{ fontSize: 20 }} />,
    userManagement: <PersonSearchOutlinedIcon sx={{ fontSize: 20 }} />,
    feedback:       <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
    settings:       <SettingsOutlinedIcon sx={{ fontSize: 20 }} />,
};

const variantNavItems: Record<SideNavVariant, RstoNavItem[]> = {
    // Service providers: manage their own data — no Directory (they are the directory entry)
    'service-provider': [
        { id: 'dashboard',   label: 'Dashboard',    icon: NAV_ICONS.dashboard  },
        { id: 'submit-data', label: 'Submit Data',  icon: NAV_ICONS.submitData },
        { id: 'planning',    label: 'Planning',     icon: NAV_ICONS.planning   },
        { id: 'resources',   label: 'Resources',    icon: NAV_ICONS.resources  },
    ],
    // Community facilitators: oversee multiple service providers
    community: [
        { id: 'dashboard', label: 'Dashboard', icon: NAV_ICONS.dashboard },
        { id: 'directory', label: 'Directory', icon: NAV_ICONS.directory },
        { id: 'planning',  label: 'Planning',  icon: NAV_ICONS.planning  },
        { id: 'resources', label: 'Resources', icon: NAV_ICONS.resources },
    ],
    // Hub coordinators: oversee providers, plan, access resources
    hub: [
        { id: 'directory', label: 'Directory', icon: NAV_ICONS.directory },
        { id: 'planning',  label: 'Planning',  icon: NAV_ICONS.planning  },
        { id: 'resources', label: 'Resources', icon: NAV_ICONS.resources },
    ],
    // RSTO admins: platform-wide access + user management
    admin: [
        { id: 'directory',       label: 'Directory',       icon: NAV_ICONS.directory      },
        { id: 'resources',       label: 'Resources',       icon: NAV_ICONS.resources      },
        { id: 'user-management', label: 'User Management', icon: NAV_ICONS.userManagement },
    ],
};

// Utility items are identical across all variants — Feedback + Settings always visible
const sharedUtilityItems: RstoNavItem[] = [
    { id: 'feedback', label: 'Feedback', icon: NAV_ICONS.feedback },
    { id: 'settings', label: 'Settings', icon: NAV_ICONS.settings },
];

const variantUtilityItems: Record<SideNavVariant, RstoNavItem[]> = {
    'service-provider': sharedUtilityItems,
    community:          sharedUtilityItems,
    hub:                sharedUtilityItems,
    admin:              sharedUtilityItems,
    // Note: Sign Out is rendered separately by the component (not in utility items array)
};

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
}) => {
    const scheme = React.useContext(NavColorContext);
    return (
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
                backgroundColor: scheme.activeBg,
            },
            '&.Mui-selected:hover': { backgroundColor: scheme.activeBg },
            '&:hover': { backgroundColor: 'rstoNeutral.paper' },
        }}
    >
        {item.code ? (
            <Box>
                <Typography sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: scheme.activeText,
                    lineHeight: 1.3,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                }}>
                    {item.code}
                </Typography>
                <Typography sx={{
                    fontSize: 12,
                    fontWeight: selected ? 600 : 400,
                    color: 'rstoNeutral.shadow',
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
                        fontWeight: selected ? 600 : 400,
                        color: 'rstoNeutral.shadow',
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
                            bgcolor: scheme.activeBorder,
                            color: 'rstoGray.white',
                            borderRadius: '10px',
                        }}
                    />
                )}
            </>
        )}
    </ListItemButton>
    );
};

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
            '&:hover': { backgroundColor: 'rstoNeutral.paper' },
        }}
    >
        <ListItemText
            primary={subGroup.label}
            sx={{ position: 'relative', zIndex: 1 }}
            primaryTypographyProps={{
                fontSize: 13,
                fontWeight: 600,
                color: 'rstoNeutral.ink',
            }}
        />
        {open
            ? <KeyboardArrowDownIcon sx={{ color: 'rstoNeutral.shadow', fontSize: 14, position: 'relative', zIndex: 1 }} />
            : <KeyboardArrowRightIcon sx={{ color: 'rstoNeutral.shadow', fontSize: 14, position: 'relative', zIndex: 1 }} />
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
                                color: 'rstoNeutral.shadow',
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
                                '&:hover': { backgroundColor: 'rstoNeutral.paper' },
                            }}
                        >
                            <ListItemText
                                primary={section.label}
                                sx={{ position: 'relative', zIndex: 1 }}
                                primaryTypographyProps={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: 'rstoNeutral.ink',
                                }}
                            />
                            {openSections[section.id]
                                ? <KeyboardArrowDownIcon sx={{ color: 'rstoNeutral.shadow', fontSize: 14 }} />
                                : <KeyboardArrowRightIcon sx={{ color: 'rstoNeutral.shadow', fontSize: 14 }} />
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
}) => {
    const scheme = React.useContext(NavColorContext);
    return (
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
                backgroundColor: scheme.activeBg,
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
                backgroundColor: scheme.activeBorder,
            },
            '&.Mui-selected:hover': { backgroundColor: scheme.activeBg },
            '&:hover': { backgroundColor: 'rstoNeutral.paper' },
            gap: 1,
        }}
    >
        <ListItemIcon sx={{ minWidth: 0, color: selected ? scheme.activeText : 'rstoNeutral.shadow' }}>
            {item.icon}
        </ListItemIcon>
        <ListItemText
            primary={item.label}
            primaryTypographyProps={{
                fontFamily: '"Open Sans", sans-serif',
                fontSize: 14,
                fontWeight: selected ? 600 : 400,
                color: selected ? scheme.activeText : 'rstoNeutral.ink',
            }}
        />
        {(item.children || item.strategyGroups) && (
            open
                ? <KeyboardArrowDownIcon sx={{ color: selected ? scheme.activeText : 'rstoNeutral.shadow', fontSize: 16 }} />
                : <KeyboardArrowRightIcon sx={{ color: selected ? scheme.activeText : 'rstoNeutral.shadow', fontSize: 16 }} />
        )}
    </ListItemButton>
    );
};

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
    variant,
    orgName,
    userName,
    userEmail,
    brandName = 'RSTO',
    activeItemId = 'quantity-1',
    onItemSelect,
    onLogout,
    defaultOpenIds = ['dashboard', 'quantity'],
    navItems,
    utilityItems,
    environment,
    defaultExpanded = false,
}: AppSideMenuProps) => {
    const scheme = variant ? variantSchemes[variant] : defaultColorScheme;
    const resolvedNavItems = navItems ?? (variant ? variantNavItems[variant] : defaultNavItems);
    const resolvedUtilityItems = utilityItems ?? (variant ? variantUtilityItems[variant] : defaultUtilityItems);
    const logoutLabel = variant === 'community' ? 'Sign out' : 'Log out';
    const safeNavItems = Array.isArray(resolvedNavItems) ? resolvedNavItems : [];
    const safeUtilityItems = Array.isArray(resolvedUtilityItems) ? resolvedUtilityItems : [];

    const theme = useTheme();
    // Auto-collapse below md (900px). User can still expand/collapse manually.
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const [userCollapsed, setUserCollapsed] = React.useState<boolean | null>(null);
    const collapsed = defaultExpanded ? false : (userCollapsed !== null ? userCollapsed : isBelowMd);

    // Reset user override when crossing the md breakpoint
    React.useEffect(() => { setUserCollapsed(null); }, [isBelowMd]);
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
                    px: 1.5,
                    py: 0.75,
                    mb: 0.25,
                    position: 'relative',
                    '&.Mui-selected': { backgroundColor: scheme.activeBg },
                    '&.Mui-selected::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 3,
                        height: 16,
                        borderRadius: '0 2px 2px 0',
                        backgroundColor: scheme.activeBorder,
                    },
                    '&.Mui-selected:hover': { backgroundColor: scheme.activeBg },
                    '&:hover': { backgroundColor: 'rstoNeutral.paper' },
                }}
            >
                <Box sx={{ color: active ? scheme.activeText : 'rstoNeutral.shadow', display: 'flex', alignItems: 'center' }}>
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
            <NavColorContext.Provider value={scheme}>
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
                    px: 1.5,
                    py: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                }}
            >
                <Box sx={{ py: 1, mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <img
                        src="/rsto_logomark_fullcolour.svg"
                        alt={brandName}
                        style={{ width: 'auto', height: 32, display: 'block' }}
                    />
                </Box>

                <List disablePadding>{safeNavItems.map(renderCollapsedItem)}</List>

                <Box sx={{ mt: 'auto', pt: 1 }}>
                    <Divider sx={{ mb: 1 }} />
                    <List disablePadding>{safeUtilityItems.map(renderCollapsedItem)}</List>
                    {onLogout && (
                        <ListItemButton
                            onClick={onLogout}
                            sx={{
                                borderRadius: '8px',
                                minHeight: 44,
                                justifyContent: 'center',
                                px: 1.5,
                                py: 0.75,
                                mb: 0.25,
                                '&:hover': { backgroundColor: 'rstoNeutral.paper' },
                            }}
                        >
                            <LogoutOutlinedIcon sx={{ fontSize: 20, color: 'rstoNeutral.shadow' }} />
                        </ListItemButton>
                    )}
                    <ListItemButton
                        onClick={() => setUserCollapsed(false)}
                        sx={{
                            borderRadius: '8px',
                            minHeight: 44,
                            justifyContent: 'center',
                            px: 1.5,
                            py: 0.75,
                            '&:hover': { backgroundColor: 'rstoNeutral.paper' },
                        }}
                    >
                        <KeyboardDoubleArrowRightRoundedIcon sx={{ fontSize: 20, color: 'rstoNeutral.shadow' }} />
                    </ListItemButton>
                </Box>
            </Paper>
            </NavColorContext.Provider>
        );
    }

    return (
        <NavColorContext.Provider value={scheme}>
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
                px: 2,
                pt: 3,
                pb: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
            }}
        >
            <Box sx={{ pt: 0, pb: 0, mb: 3 }}>
                <img
                    src="/rsto_logomark_fullcolour.svg"
                    alt={brandName}
                    style={{ width: 'auto', height: 64, display: 'block' }}
                />
            </Box>

            <List disablePadding>{safeNavItems.map(renderItem)}</List>

            {/* Bottom section — env chip, divider, utility items + logout */}
            <Box sx={{ mt: 'auto', pt: 1 }}>
                {environment && environment !== 'production' && (
                    <Chip
                        label={ENV_CONFIG[environment].label}
                        color={ENV_CONFIG[environment].color}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1, fontWeight: 500, fontSize: 11, '& .MuiChip-label': { px: 1 } }}
                    />
                )}
                <Divider sx={{ my: 1 }} />
                <List disablePadding>{safeUtilityItems.map(renderItem)}</List>
                {onLogout && (
                    <ListItemButton
                        onClick={onLogout}
                        sx={{
                            borderRadius: '8px',
                            minHeight: 44,
                            px: 1.5,
                            py: 0.75,
                            mb: 0.25,
                            gap: 1,
                            '&:hover': { backgroundColor: 'rstoNeutral.paper' },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 0, color: 'rstoNeutral.shadow' }}>
                            <LogoutOutlinedIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={logoutLabel}
                            primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: 'rstoNeutral.ink',
                            }}
                        />
                    </ListItemButton>
                )}
                <ListItemButton
                    onClick={() => setUserCollapsed(true)}
                    sx={{
                        borderRadius: '8px',
                        minHeight: 44,
                        px: 1.5,
                        py: 0.75,
                        gap: 1,
                        '&:hover': { backgroundColor: 'rstoNeutral.paper' },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 0, color: 'rstoNeutral.shadow' }}>
                        <KeyboardDoubleArrowLeftRoundedIcon sx={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Collapse sidebar"
                        primaryTypographyProps={{
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: 14,
                            fontWeight: 400,
                            color: 'rstoNeutral.ink',
                        }}
                    />
                </ListItemButton>
            </Box>
        </Paper>
        </NavColorContext.Provider>
    );
};

export default AppSideMenu;
