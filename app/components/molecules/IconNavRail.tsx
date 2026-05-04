'use client';
import * as React from 'react';
import { Box, IconButton, Avatar, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

export interface IconNavItem {
    /** MUI icon component */
    icon: OverridableComponent<SvgIconTypeMap>;
    /** Tooltip / accessible label */
    label: string;
    /** Unique identifier for selection tracking */
    id: string;
}

export interface IconNavRailProps {
    /** Primary navigation items displayed in the main area */
    items: IconNavItem[];
    /** Footer items (e.g. settings) displayed above the avatar */
    footerItems?: IconNavItem[];
    /** Currently selected item id */
    selectedId?: string;
    /** Callback when an item is clicked */
    onSelect?: (id: string) => void;
    /** Callback when the expand button is clicked (shown when detail panel is collapsed) */
    onExpandClick?: () => void;
}

const RailContainer = styled(Box)(({ theme }) => ({
    width: 56,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.rstoGray.white,
    borderRight: `1px solid ${theme.palette.rstoGray._50}`,
    borderRadius: '14px 0 0 14px',
    paddingTop: 14,
    paddingBottom: 14,
}));

const NavIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
    width: 35,
    height: 35,
    borderRadius: 9,
    color: isSelected ? theme.palette.rstoOrange._70 : theme.palette.rstoGray._80,
    backgroundColor: isSelected ? theme.palette.rstoOrange._10 : 'transparent',
    '&:hover': {
        backgroundColor: isSelected
            ? theme.palette.rstoOrange._10
            : theme.palette.rstoGray._30,
    },
}));

/**
 * A slim vertical icon-only navigation rail. Displays a logo at the top,
 * primary nav icons in the middle, and optional footer icons + avatar at
 * the bottom.
 */
const IconNavRail = ({ items, footerItems = [], selectedId, onSelect, onExpandClick }: IconNavRailProps) => {
    return (
        <RailContainer>
            {/* Logo */}
            <Box sx={{ mb: 3, px: '4px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img
                    src="/rsto_logomark_fullcolour.svg"
                    alt="RSTO logo"
                    style={{ width: '100%', height: 'auto', maxWidth: 44 }}
                />
            </Box>

            {/* Expand button — visible when detail panel is collapsed */}
            {onExpandClick && (
                <>
                    <IconButton
                        onClick={onExpandClick}
                        size="small"
                        aria-label="Expand sidebar"
                        sx={{ mb: 1 }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Divider sx={{ width: '70%', mb: 1 }} />
                </>
            )}

            {/* Primary nav items */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {items.map((item) => (
                    <NavIconButton
                        key={item.id}
                        isSelected={selectedId === item.id}
                        onClick={() => onSelect?.(item.id)}
                        aria-label={item.label}
                    >
                        <item.icon sx={{ fontSize: 16 }} />
                    </NavIconButton>
                ))}
            </Box>

            {/* Footer items + avatar */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', marginTop: 'auto' }}>
                {footerItems.map((item) => (
                    <NavIconButton
                        key={item.id}
                        isSelected={selectedId === item.id}
                        onClick={() => onSelect?.(item.id)}
                        aria-label={item.label}
                    >
                        <item.icon sx={{ fontSize: 16 }} />
                    </NavIconButton>
                ))}
                <Avatar
                    sx={{
                        width: 28,
                        height: 28,
                        bgcolor: 'rstoGray._20',
                        border: '1px solid',
                        borderColor: 'rstoGray._80',
                    }}
                />
            </Box>
        </RailContainer>
    );
};

export default IconNavRail;
