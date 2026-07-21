'use client';
import * as React from 'react';
import {
    Box,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export type ServiceProviderType = 'SERVICE_PROVIDER' | 'COMMUNITY';

export interface Strategy {
    id: string;
    name: string;
    acronym: string;
}

export interface ServiceProvider {
    id: string;
    name: string;
    groupAlias: string;
    type: ServiceProviderType;
    strategies: Strategy[];
}

export interface ServiceProviderTableProps {
    serviceProviders: ServiceProvider[];
    onRowClick?: (sp: ServiceProvider) => void;
}

const mapTypeToDisplay = (type: ServiceProviderType): string => {
    switch (type) {
        case 'SERVICE_PROVIDER': return 'Service Provider';
        case 'COMMUNITY': return 'Community';
        default: return type;
    }
};

// Hard-coded hex — avoids TS2339 on theme.palette.rstoGray (pre-existing Storybook pattern)
const BORDER = '#EFEFEF';  // rstoGray._40
const ROW_BG = '#FFFFFF';  // rstoGray.white
const ICON_BLUE = '#4CAAC1'; // rstoBlue._60

const StyledTable = styled('table')(() => ({
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
}));

const StyledTableHeadCell = styled(TableCell)(() => ({
    border: 'none',
}));

const StyledTableCell = styled(TableCell)(() => ({
    borderTop: `1px solid ${BORDER}`,
    borderBottom: `1px solid ${BORDER}`,
}));

const ROW_SX = {
    background: ROW_BG,
    '& > td:first-of-type': {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        borderLeft: `1px solid ${BORDER}`,
    },
    '& > td:last-of-type': {
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        borderRight: `1px solid ${BORDER}`,
    },
} as const;

const ServiceProviderTable: React.FC<ServiceProviderTableProps> = ({
    serviceProviders,
    onRowClick,
}) => (
    <TableContainer>
        <StyledTable>
            <TableHead>
                <TableRow>
                    <StyledTableHeadCell>
                        <Typography variant="subtitle2" color="#474747">Name</Typography>
                    </StyledTableHeadCell>
                    <StyledTableHeadCell>
                        <Typography variant="subtitle2" color="#474747">Type</Typography>
                    </StyledTableHeadCell>
                    <StyledTableHeadCell>
                        <Typography variant="subtitle2" color="#474747">Strategy</Typography>
                    </StyledTableHeadCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {serviceProviders.map((sp, index) => (
                    <React.Fragment key={index}>
                        <TableRow
                            sx={{ ...ROW_SX, cursor: onRowClick ? 'pointer' : 'default' }}
                            onClick={() => onRowClick?.(sp)}
                        >
                            <StyledTableCell>
                                <Stack direction="row" spacing={2}>
                                    <Box color={ICON_BLUE} display="flex" alignItems="center">
                                        <PersonOutlineOutlinedIcon color="inherit" />
                                    </Box>
                                    <Typography variant="h5">{sp.name}</Typography>
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="body2" color="#474747">
                                    {mapTypeToDisplay(sp.type)}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography variant="body2" color="#474747">
                                    {sp.strategies.map((s) => s.acronym.toUpperCase()).join(', ')}
                                </Typography>
                            </StyledTableCell>
                        </TableRow>
                        <TableRow sx={{ height: '12px' }} />
                    </React.Fragment>
                ))}
            </TableBody>
        </StyledTable>
    </TableContainer>
);

export default ServiceProviderTable;
