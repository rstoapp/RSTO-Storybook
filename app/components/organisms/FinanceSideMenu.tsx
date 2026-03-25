'use client';

import * as React from 'react';
import {
    Box,
    Button,
    Chip,
    Collapse,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
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

// ─── Types ────────────────────────────────────────────────────────────────────

export type RstoNavLeaf = {
    id: string;
    label: string;
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

export type RstoNavItem = {
    id: string;
    label: string;
    icon: React.ReactElement;
    children?: RstoNavChildItem[];
};

export type Environment = 'preview' | 'ci' | 'production';

const ENV_CONFIG: Record<Exclude<Environment, 'production'>, { label: string; color: 'warning' | 'info' }> = {
    preview: { label: 'Preview', color: 'warning' },
    ci:      { label: 'CI Planning', color: 'info' },
};

export type FinanceSideMenuProps = {
    brandName?: string;
    activeItemId?: string;
    onItemSelect?: (itemId: string) => void;
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
                    { id: 'quality-1', label: 'Are services meeting quality standards?' },
                    { id: 'quality-2', label: 'Staff qualifications and training' },
                ],
            },
            {
                id: 'quantity',
                label: 'Quantity',
                children: [
                    { id: 'quantity-1', label: 'Are there adequate antenatal care facilities?' },
                    { id: 'quantity-2', label: 'Service provider capacity' },
                ],
            },
            {
                id: 'participation',
                label: 'Participation',
                children: [
                    { id: 'participation-1', label: 'Community engagement levels' },
                    { id: 'participation-2', label: 'Enrolment and attendance rates' },
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

// ─── Connector helpers ─────────────────────────────────────────────────────────

const VerticalRail = ({ isFirst, isLast }: { isFirst: boolean; isLast: boolean }) => (
    <Box sx={{
        position: 'absolute',
        left: 10,
        top: isFirst ? '50%' : 0,
        bottom: isLast ? '50%' : 0,
        borderLeft: '1px solid',
        borderColor: 'rstoGray._60',
        zIndex: 0,
    }} />
);

const Elbow = () => (
    <Box sx={{
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 9,
        height: 7,
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        borderBottomLeftRadius: '3px',
        borderColor: 'rstoGray._60',
        zIndex: 0,
    }} />
);

// ─── Level-3 leaf: page link inside a sub-group ───────────────────────────────

const Level3LeafRow = ({
    leaf,
    selected,
    onClick,
    leafIndex,
    leafCount,
}: {
    leaf: RstoNavLeaf;
    selected: boolean;
    onClick: () => void;
    leafIndex: number;
    leafCount: number;
}) => (
    <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
            position: 'relative',
            borderRadius: '6px',
            minHeight: 32,
            pl: 2.8,
            pr: 1,
            py: 0.5,
            ml: 2.3,
            mb: 0.25,
            '&.Mui-selected': {
                backgroundColor: 'rstoOrange._10',
                borderLeft: '2px solid',
                borderLeftColor: 'rstoOrange._50',
                pl: 2.55,
            },
            '&.Mui-selected:hover': { backgroundColor: 'rstoOrange._10' },
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        <VerticalRail isFirst={leafIndex === 0} isLast={leafIndex === leafCount - 1} />
        <Elbow />
        <ListItemText
            primary={leaf.label}
            sx={{ position: 'relative', zIndex: 1 }}
            primaryTypographyProps={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                fontWeight: selected ? 500 : 400,
                color: 'rstoGray._90',
                lineHeight: 1.4,
            }}
        />
        {typeof leaf.badgeCount === 'number' && (
            <Chip
                size="small"
                label={leaf.badgeCount}
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: 18,
                    minWidth: 18,
                    '& .MuiChip-label': { px: 0.6, fontSize: 10, fontWeight: 700 },
                    bgcolor: 'rstoOrange._60',
                    color: 'rstoGray.white',
                    borderRadius: '10px',
                }}
            />
        )}
    </ListItemButton>
);

// ─── Level-2 plain leaf: direct child with no sub-group (e.g. Settings > Directory) ──

const Level2LeafRow = ({
    child,
    selected,
    onClick,
    nestedIndex,
    nestedCount,
}: {
    child: RstoNavLeaf;
    selected: boolean;
    onClick: () => void;
    nestedIndex: number;
    nestedCount: number;
}) => (
    <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
            position: 'relative',
            borderRadius: '6px',
            minHeight: 34,
            pl: 3.2,
            pr: 1,
            py: 0.5,
            ml: 2.45,
            mb: 0.25,
            '&.Mui-selected': {
                backgroundColor: 'rstoOrange._10',
                pl: 3.2,
            },
            '&.Mui-selected:hover': { backgroundColor: 'rstoOrange._10' },
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        <VerticalRail isFirst={nestedIndex === 0} isLast={nestedIndex === nestedCount - 1} />
        <Elbow />
        <ListItemText
            primary={child.label}
            sx={{ position: 'relative', zIndex: 1 }}
            primaryTypographyProps={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                fontWeight: selected ? 500 : 400,
                color: 'rstoGray._90',
            }}
        />
        {typeof child.badgeCount === 'number' && (
            <Chip
                size="small"
                label={child.badgeCount}
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: 18,
                    minWidth: 18,
                    '& .MuiChip-label': { px: 0.6, fontSize: 10, fontWeight: 700 },
                    bgcolor: 'rstoOrange._60',
                    color: 'rstoGray.white',
                    borderRadius: '10px',
                }}
            />
        )}
    </ListItemButton>
);

// ─── Level-2 sub-group header (Quality / Quantity / Participation) ─────────────

const SubGroupHeaderRow = ({
    subGroup,
    open,
    onToggle,
    groupIndex,
    groupCount,
}: {
    subGroup: RstoNavSubGroup;
    open: boolean;
    onToggle: () => void;
    groupIndex: number;
    groupCount: number;
}) => (
    <ListItemButton
        onClick={onToggle}
        sx={{
            position: 'relative',
            borderRadius: '6px',
            minHeight: 34,
            pl: 3.2,
            pr: 1,
            py: 0.5,
            ml: 2.45,
            mb: 0.25,
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        {/* Rail: keep extending when open so leaves connect visually */}
        <VerticalRail isFirst={groupIndex === 0} isLast={groupIndex === groupCount - 1 && !open} />
        <Elbow />
        <ListItemText
            primary={subGroup.label}
            sx={{ position: 'relative', zIndex: 1 }}
            primaryTypographyProps={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: 'rstoGray.black',
            }}
        />
        {open
            ? <KeyboardArrowDownRoundedIcon sx={{ color: 'rstoGray._70', fontSize: 14, position: 'relative', zIndex: 1 }} />
            : <KeyboardArrowRightRoundedIcon sx={{ color: 'rstoGray._70', fontSize: 14, position: 'relative', zIndex: 1 }} />
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
    groupIndex,
    groupCount,
}: {
    subGroup: RstoNavSubGroup;
    selectedId: string;
    open: boolean;
    onToggle: () => void;
    onSelectLeaf: (id: string) => void;
    groupIndex: number;
    groupCount: number;
}) => (
    <>
        <SubGroupHeaderRow
            subGroup={subGroup}
            open={open}
            onToggle={onToggle}
            groupIndex={groupIndex}
            groupCount={groupCount}
        />
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ ml: 0.6 }}>
                {subGroup.children.map((leaf, idx) => (
                    <Level3LeafRow
                        key={leaf.id}
                        leaf={leaf}
                        selected={selectedId === leaf.id}
                        onClick={() => onSelectLeaf(leaf.id)}
                        leafIndex={idx}
                        leafCount={subGroup.children.length}
                    />
                ))}
            </List>
        </Collapse>
    </>
);

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
                backgroundColor: 'rstoOrange._50',
            },
            '&.Mui-selected:hover': { backgroundColor: 'rstoOrange._10' },
            '&:hover': { backgroundColor: 'rstoGray._40' },
        }}
    >
        <ListItemIcon sx={{ minWidth: 24, color: selected ? 'rstoOrange._50' : 'rstoGray._90' }}>
            {item.icon}
        </ListItemIcon>
        <ListItemText
            primary={item.label}
            primaryTypographyProps={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 14,
                fontWeight: selected ? 500 : 400,
                color: selected ? 'rstoOrange._50' : 'rstoGray.black',
            }}
        />
        {item.children && (
            open
                ? <KeyboardArrowDownRoundedIcon sx={{ color: selected ? 'rstoOrange._50' : 'rstoGray._70', fontSize: 16 }} />
                : <KeyboardArrowRightRoundedIcon sx={{ color: selected ? 'rstoOrange._50' : 'rstoGray._70', fontSize: 16 }} />
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
                selected={hasSelectedDescendant}
                open={open}
                onClick={onToggle}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pt: 0.25, ml: 0.6 }}>
                    {children.map((child, index) =>
                        isSubGroup(child) ? (
                            <SubGroupSection
                                key={child.id}
                                subGroup={child}
                                selectedId={selectedId}
                                open={openIds[child.id] ?? false}
                                onToggle={() => onToggleChild(child.id)}
                                onSelectLeaf={onSelectLeaf}
                                groupIndex={index}
                                groupCount={children.length}
                            />
                        ) : (
                            <Level2LeafRow
                                key={child.id}
                                child={child}
                                selected={selectedId === child.id}
                                onClick={() => onSelectLeaf(child.id)}
                                nestedIndex={index}
                                nestedCount={children.length}
                            />
                        )
                    )}
                </List>
            </Collapse>
        </>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────

const FinanceSideMenu = ({
    brandName = 'RSTO',
    activeItemId = 'quantity-1',
    onItemSelect,
    defaultOpenIds = ['dashboard', 'quantity'],
    navItems = defaultNavItems,
    utilityItems = defaultUtilityItems,
    environment,
}: FinanceSideMenuProps) => {
    const safeNavItems = Array.isArray(navItems) ? navItems : [];
    const safeUtilityItems = Array.isArray(utilityItems) ? utilityItems : [];

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

    const renderItem = (item: RstoNavItem) => {
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

    return (
        <Paper
            elevation={0}
            sx={{
                width: 270,
                minHeight: 780,
                borderRadius: 4,
                backgroundColor: 'rstoGray.white',
                border: '1px solid',
                borderColor: 'rstoGray._50',
                px: 2.5,
                py: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
            }}
        >
            <Box sx={{ px: 1.5, py: 1, mb: 2.5 }}>
                <img
                    src="/rsto_logomark_fullcolour.svg"
                    alt={brandName}
                    style={{ width: 'auto', height: 48, display: 'block' }}
                />
            </Box>

            <List disablePadding>{safeNavItems.map(renderItem)}</List>

            <Divider sx={{ my: 0.75 }} />

            <List disablePadding>{safeUtilityItems.map(renderItem)}</List>

            <Box sx={{ mt: 'auto', pt: 0.75 }}>
                {environment && environment !== 'production' && (
                    <Chip
                        label={ENV_CONFIG[environment].label}
                        color={ENV_CONFIG[environment].color}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1, fontWeight: 500, fontSize: 11 }}
                    />
                )}
                <Button
                    fullWidth
                    variant="text"
                    startIcon={<KeyboardDoubleArrowLeftRoundedIcon />}
                    sx={{
                        justifyContent: 'flex-start',
                        color: 'rstoGray._90',
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                >
                    Collapse sidebar
                </Button>
            </Box>
        </Paper>
    );
};

export default FinanceSideMenu;
