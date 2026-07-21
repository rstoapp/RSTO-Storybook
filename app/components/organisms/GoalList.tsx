'use client';
import * as React from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RstoChip from '../molecules/RstoChip';
import CycleIcon from '../atoms/CycleIcon';
import DateLabelAndIcon from '../atoms/DateLabelAndIcon';

export type GoalStatus = 'ongoing' | 'completed' | 'inactive';

export interface GoalData {
    id: number;
    indicatorId: string;
    indicatorTitle?: string;
    centreId?: string;
    baseline: string;
    ifStatement: string;
    thenStatement: string;
    soThatStatement: string;
    createdByName: string;
    status: GoalStatus;
    createdDate: string;
    updatedDate: string;
    cycles?: Array<{ id: number; name: string; status: string }>;
}

export interface GoalListProps {
    goals: GoalData[];
    loading?: boolean;
    error?: string;
    onShowDetails?: (goalId: number) => void;
    onEditGoal?: (goal: GoalData) => void;
    onRetry?: () => void;
}

const getCategoryFromIndicatorId = (id: string): string => {
    const lower = id.toLowerCase();
    if (lower.includes('_ql')) return 'Quality';
    if (lower.includes('_qn')) return 'Quantity';
    if (lower.includes('_p')) return 'Participation';
    return 'Other';
};

// Fallback hex values matching rsto-app chipColors.ts
const STATUS_CHIP_COLORS: Record<GoalStatus, { bg: string; color: string }> = {
    ongoing: { bg: '#1976d2', color: '#fff' },
    completed: { bg: '#4caf50', color: '#fff' },
    inactive: { bg: '#757575', color: '#fff' },
};

interface GoalCardProps {
    goal: GoalData;
    onShowDetails?: (goalId: number) => void;
    onEditGoal?: (goal: GoalData) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onShowDetails, onEditGoal }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const statusColors = STATUS_CHIP_COLORS[goal.status] ?? STATUS_CHIP_COLORS.ongoing;
    const displayTitle = goal.soThatStatement || goal.indicatorTitle || goal.indicatorId.toUpperCase();
    const createdDate = goal.createdDate ? new Date(goal.createdDate) : undefined;

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <RstoChip text={getCategoryFromIndicatorId(goal.indicatorId)} size="small" />
                        <RstoChip
                            text={goal.status.toUpperCase()}
                            size="small"
                            sx={{ backgroundColor: statusColors.bg, color: statusColors.color }}
                        />
                        {goal.centreId && (
                            <RstoChip text={goal.centreId} size="small" variant="outlined" />
                        )}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0, ml: 1 }}>
                        {onShowDetails && (
                            <Button
                                variant="outlined"
                                size="small"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => onShowDetails(goal.id)}
                            >
                                Show details
                            </Button>
                        )}
                        <Button
                            variant="text"
                            size="small"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ minWidth: 0, p: 0.5 }}
                            aria-label="More actions"
                        >
                            <MoreVertOutlinedIcon fontSize="small" />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem
                                onClick={() => { onEditGoal?.(goal); setAnchorEl(null); }}
                                sx={{ fontSize: '0.875rem' }}
                            >
                                <EditIcon sx={{ mr: 1, fontSize: '1rem' }} />
                                Edit goal
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Box>

                <Typography variant="h3" sx={{ mb: 1.5 }}>
                    {displayTitle}
                </Typography>

                <Stack spacing={0.75} sx={{ mb: 2 }}>
                    <Typography variant="body2">
                        <strong>Baseline:</strong> {goal.baseline}
                    </Typography>
                    <Typography variant="body2">
                        <strong>If</strong> {goal.ifStatement}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Then</strong> {goal.thenStatement}
                    </Typography>
                    <Typography variant="body2">
                        <strong>So that</strong> {goal.soThatStatement}
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 1.5 }} />

                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    {goal.cycles && goal.cycles.length > 0 && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <CycleIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {goal.cycles.length} {goal.cycles.length === 1 ? 'cycle' : 'cycles'}
                            </Typography>
                        </Stack>
                    )}
                    <DateLabelAndIcon date={createdDate} label="Created on" />
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <PersonOutlineIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {goal.createdByName}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

const GoalList: React.FC<GoalListProps> = ({
    goals,
    loading = false,
    error,
    onShowDetails,
    onEditGoal,
    onRetry,
}) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                action={
                    onRetry ? (
                        <Button color="inherit" size="small" onClick={onRetry}>
                            Retry
                        </Button>
                    ) : undefined
                }
            >
                {error}
            </Alert>
        );
    }

    if (goals.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h3" color="text.secondary" gutterBottom>
                    No goals yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add a goal to start tracking your CI cycle progress.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {goals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    goal={goal}
                    onShowDetails={onShowDetails}
                    onEditGoal={onEditGoal}
                />
            ))}
        </Box>
    );
};

export default GoalList;
