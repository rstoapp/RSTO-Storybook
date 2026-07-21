import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Selector from './Selector';

const StyledFilters = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
}));

const INDICATOR_OPTIONS = [
    { label: 'All indicators', value: 'all' },
    { label: 'Quantity', value: 'quantity' },
    { label: 'Quality', value: 'quality' },
    { label: 'Participation', value: 'participation' },
];

export interface GoalFiltersProps {
    indicatorFilter: string;
    onIndicatorChange: (value: string) => void;
    centreFilter: string;
    onCentreChange: (value: string) => void;
    centreOptions?: Array<{ label: string; value: string }>;
}

const GoalFilters: React.FC<GoalFiltersProps> = ({
    indicatorFilter,
    onIndicatorChange,
    centreFilter,
    onCentreChange,
    centreOptions = [],
}) => (
    <StyledFilters>
        <Box sx={{ minWidth: '140px' }}>
            <Selector
                options={INDICATOR_OPTIONS}
                value={indicatorFilter}
                onChange={onIndicatorChange}
                startIcon={<FilterListIcon />}
                disableUnderline
            />
        </Box>
        <Box sx={{ minWidth: '120px' }}>
            <Selector
                options={[{ label: 'All centres', value: 'all' }, ...centreOptions]}
                value={centreFilter}
                onChange={onCentreChange}
                startIcon={<LocationOnIcon />}
                disableUnderline
            />
        </Box>
    </StyledFilters>
);

export default GoalFilters;
