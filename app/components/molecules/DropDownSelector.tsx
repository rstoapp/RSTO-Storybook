'use client';
import * as React from 'react';
import { FormControl, MenuItem, Select, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

export interface DropDownOption {
    label: string;
    value: string;
}

export interface DropDownSelectorProps {
    options: DropDownOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    /** Optional icon rendered to the left of the selected label */
    startIcon?: React.ReactNode;
    /** Show a clear (×) button when a value is selected */
    allowClear?: boolean;
}

const StyledSelect = styled(Select)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: '6px',
    border: `2px solid ${theme.palette.rstoGray._40}`,
    transition: 'all 0.2s ease-in-out',
    padding: theme.spacing(1, 1.5),
    '&:hover': {
        borderColor: theme.palette.rstoBlue._50,
    },
    '&.Mui-focused': {
        borderColor: theme.palette.rstoBlue._70,
    },
    '& .MuiSelect-select': {
        paddingRight: '32px !important',
        paddingTop: 0,
        paddingBottom: 0,
    },
}));

/**
 * A styled dropdown selector with optional start icon, placeholder, and clear button.
 * Used in CI Planning filters and similar form surfaces.
 */
const DropDownSelector = ({
    options,
    value,
    onChange,
    placeholder,
    startIcon,
    allowClear = false,
}: DropDownSelectorProps) => {
    const handleClear = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onChange(null);
    };

    return (
        <FormControl
            variant="standard"
            fullWidth
            sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 } }}
        >
            <StyledSelect
                onChange={(event) => onChange(event.target.value as string)}
                value={value ?? ''}
                displayEmpty={!!placeholder}
                disableUnderline
                renderValue={(selected) => {
                    if (!selected && placeholder) {
                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {startIcon}
                                <Typography variant="body1" color="text.secondary">
                                    {placeholder}
                                </Typography>
                            </Box>
                        );
                    }
                    const selectedOption = options.find((o) => o.value === selected);
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                            {startIcon}
                            <Typography variant="body1" sx={{ fontWeight: 600 }} color="text.secondary">
                                {selectedOption?.label || String(selected)}
                            </Typography>
                            {allowClear && value && (
                                <IconButton
                                    size="small"
                                    onMouseDown={handleClear}
                                    sx={{
                                        padding: '2px',
                                        marginLeft: 'auto',
                                        marginRight: '-4px',
                                        '&:hover': { backgroundColor: 'rstoBlue._10' },
                                    }}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    );
                }}
            >
                {placeholder && (
                    <MenuItem value="" disabled>
                        <Typography variant="body1" color="text.secondary">{placeholder}</Typography>
                    </MenuItem>
                )}
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{option.label}</Typography>
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
};

export default DropDownSelector;
