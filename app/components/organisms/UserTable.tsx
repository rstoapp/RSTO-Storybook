'use client';
import * as React from 'react';
import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export type UserStatus = 'Active' | 'Invited' | 'Inactive';

export interface User {
    username: string;
    email: string;
    name?: string;
    status: string;
    enabled: boolean;
    created: string;
    lastModified: string;
    lastAccess?: Date;
    groups: string[];
    displayName: string;
    role: 'Admin' | 'View Only' | 'Service Provider';
    uiStatus: UserStatus;
    serviceProvider?: string;
}

export interface UserTableProps {
    users?: User[];
    loading?: boolean;
    onEditUser?: (user: User) => void;
    onDeleteUser?: (user: User) => void;
    onReinviteUser?: (user: User) => void;
}

// Hard-coded hex — avoids TS2339 on theme.palette.rstoGray (pre-existing Storybook pattern)
const BORDER = '#EFEFEF';   // rstoGray._40
const ROW_BG = '#FFFFFF';   // rstoGray.white

const formatLastAccess = (lastAccess: Date | null | undefined): string => {
    if (!lastAccess) return 'Never';
    const d = dayjs(lastAccess);
    const diffDays = dayjs().diff(d, 'day');
    return diffDays <= 7 ? d.fromNow() : d.format('DD MMM YYYY');
};

const getGroupIcon = (groupName: string): React.ReactElement | null => {
    if (groupName === 'rstoadmin') {
        return <ManageAccountsOutlinedIcon sx={{ mr: 0.5, fontSize: 16, color: '#E23636' }} />;
    }
    if (groupName.startsWith('view-only:')) {
        return <VisibilityIcon sx={{ mr: 0.5, fontSize: 16, color: '#4CAAC1' }} />;
    }
    if (groupName.startsWith('service-provider:')) {
        return <UploadOutlinedIcon sx={{ mr: 0.5, fontSize: 16, color: '#D87214' }} />;
    }
    return null;
};

const isInviteExpired = (user: User): boolean => {
    if (user.uiStatus !== 'Invited' || !user.created) return false;
    const daysDiff = (Date.now() - new Date(user.created).getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff > 7;
};

const getStatusDisplay = (user: User) => {
    if (isInviteExpired(user)) {
        return {
            status: 'Expired',
            icon: <WarningIcon sx={{ mr: 0.5, fontSize: 16, color: '#AF0303' }} />,
        };
    }
    switch (user.uiStatus) {
        case 'Active':
            return {
                status: 'Active',
                icon: <DoneOutlinedIcon sx={{ mr: 0.5, fontSize: 16, color: '#475F34' }} />,
            };
        case 'Invited':
            return {
                status: 'Invited',
                icon: <AccessTimeIcon sx={{ mr: 0.5, fontSize: 16, color: '#D87214' }} />,
            };
        default:
            return { status: user.uiStatus, icon: null };
    }
};

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

const UserTable: React.FC<UserTableProps> = ({
    users = [],
    loading = false,
    onEditUser,
    onDeleteUser,
    onReinviteUser,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

    const handleMenuClick = (e: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(e.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress />
                <Typography variant="body1" sx={{ ml: 2 }}>Loading users...</Typography>
            </Box>
        );
    }

    return (
        <TableContainer>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {['User', 'Access Groups', 'Status', 'Invited on', 'Last Access', 'Actions'].map((h) => (
                            <StyledTableHeadCell key={h}>
                                <Typography variant="subtitle2" color="#474747">{h}</Typography>
                            </StyledTableHeadCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {
                        const statusDisplay = getStatusDisplay(user);
                        return (
                            <React.Fragment key={user.username}>
                                <TableRow sx={ROW_SX}>
                                    <StyledTableCell>
                                        <Stack direction="row" spacing={2}>
                                            <Box color="#4CAAC1" display="flex" alignItems="center">
                                                <PersonOutlineIcon color="inherit" />
                                            </Box>
                                            <Stack>
                                                <Typography variant="h5">
                                                    {user.displayName}
                                                </Typography>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <EmailOutlinedIcon sx={{ fontSize: '14px', color: '#757575' }} />
                                                    <Typography variant="body2" color="#757575">
                                                        {user.email}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: '300px' }}>
                                            {user.groups.length > 0 ? (
                                                user.groups.map((group) => (
                                                    <Chip
                                                        key={group}
                                                        size="small"
                                                        label={
                                                            <Stack direction="row" alignItems="center" sx={{ maxWidth: '220px' }}>
                                                                {getGroupIcon(group)}
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap',
                                                                        maxWidth: '200px',
                                                                    }}
                                                                >
                                                                    {group}
                                                                </Typography>
                                                            </Stack>
                                                        }
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            backgroundColor: '#EAEAEA',
                                                            color: '#474747',
                                                            '& .MuiChip-label': { color: '#474747' },
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <Chip
                                                    label="No Groups"
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600,
                                                        backgroundColor: '#FCFCFC',
                                                        color: '#474747',
                                                        '& .MuiChip-label': { color: '#474747' },
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Stack direction="row" alignItems="center">
                                            {statusDisplay.icon}
                                            <Typography variant="body2" fontWeight={600}>
                                                {statusDisplay.status}
                                            </Typography>
                                        </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="body2" color="#757575">
                                            {user.created ? new Date(user.created).toLocaleDateString() : '-'}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography variant="body2" color="#757575">
                                            {formatLastAccess(user.lastAccess)}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleMenuClick(e, user)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow sx={{ height: '12px' }} />
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </StyledTable>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => { onEditUser?.(selectedUser!); handleMenuClose(); }}>
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                    Edit
                </MenuItem>
                {(selectedUser?.uiStatus === 'Invited' || (selectedUser && isInviteExpired(selectedUser))) && (
                    <MenuItem onClick={() => { onReinviteUser?.(selectedUser!); handleMenuClose(); }}>
                        <SendIcon sx={{ mr: 1, fontSize: 20 }} />
                        Re-invite
                    </MenuItem>
                )}
                <MenuItem onClick={() => { onDeleteUser?.(selectedUser!); handleMenuClose(); }}>
                    <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                    Delete
                </MenuItem>
            </Menu>
        </TableContainer>
    );
};

export default UserTable;
