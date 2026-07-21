import * as React from 'react';
import { FormControl, MenuItem, Select, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

export interface SelectorOption {
    label: string;
    value: string;
}

export interface SelectorProps {
    options: SelectorOption[];
    onChange: (value: string) => void;
    value?: string;
    placeholder?: string;
    startIcon?: React.ReactNode;
    disableUnderline?: boolean;
}

const Selector = ({
    options,
    value,
    onChange,
    placeholder,
    startIcon,
    disableUnderline = false,
}: SelectorProps) => (
    <FormControl
        variant="standard"
        sx={{ '& .MuiSelect-select': { paddingTop: 0, display: 'flex', alignItems: 'center', gap: 1 } }}
    >
        <Select
            onChange={(event) => onChange(event.target.value as string)}
            value={value ?? options[0]?.value ?? ''}
            displayEmpty={!!placeholder}
            disableUnderline={disableUnderline}
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
                        <Typography variant="subtitle1" color="text.secondary">
                            {selectedOption?.label || String(selected)}
                        </Typography>
                    </Box>
                );
            }}
        >
            {placeholder && (
                <MenuItem value="" disabled>
                    <Typography variant="body1" color="text.secondary">{placeholder}</Typography>
                </MenuItem>
            )}
            {options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                    <Typography variant="subtitle1">{option.label}</Typography>
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default Selector;
