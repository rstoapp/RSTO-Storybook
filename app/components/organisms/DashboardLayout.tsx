import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// ── Styled ────────────────────────────────────────────────────────────────────

const StyledDashboard = styled(Box)({
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    width: '100%',
});

const IndexContainer = styled(Box)(({ theme }) => ({
    width: 288,
    flexShrink: 0,
    backgroundColor: theme.palette.common.white,
    minHeight: '100vh',
}));

const DashboardContent = styled(Box)({
    flexGrow: 1,
    minWidth: 0,
});

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DashboardLayoutProps {
    header?: React.ReactNode;
    indexMenu: React.ReactNode;
    children: React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Two-column layout shell for indicator dashboard pages.
 * Left column (288px fixed): IndicatorDashboardNavigation.
 * Right column (flex-grow): page header + content area.
 */
const DashboardLayout = ({ header, indexMenu, children }: DashboardLayoutProps) => {
    return (
        <StyledDashboard>
            <IndexContainer>{indexMenu}</IndexContainer>
            <DashboardContent>
                {header && <Box sx={{ mb: 3 }}>{header}</Box>}
                {children}
            </DashboardContent>
        </StyledDashboard>
    );
};

export default DashboardLayout;
