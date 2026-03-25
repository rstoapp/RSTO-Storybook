import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SideMenu from './SideMenu';
import { NavItem } from './SideMenu';

// ── Styled ────────────────────────────────────────────────────────────────────

const SIDE_MENU_WIDTH = 120;

const StyledPage = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.rstoGray._20,
}));

const PageContainer = styled(Box)({
    marginLeft: SIDE_MENU_WIDTH,
    flexGrow: 1,
    padding: '3rem',
    maxWidth: 1392,
});

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PageLayoutProps {
    navItems: NavItem[];
    children: React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * The outermost authenticated page shell. Renders the fixed SideMenu on the
 * left and a max-width content container on the right.
 *
 * In the production app the nav items and user info come from the MobX store.
 * Here they are prop-driven for Storybook use.
 */
const PageLayout = ({ navItems, children }: PageLayoutProps) => {
    return (
        <StyledPage>
            <Box sx={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100 }}>
                <SideMenu items={navItems} />
            </Box>
            <PageContainer>{children}</PageContainer>
        </StyledPage>
    );
};

export default PageLayout;
