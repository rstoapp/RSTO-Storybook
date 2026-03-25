import * as React from 'react';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

export interface SelectorOption {
    label: string;
    value: string;
}

export interface SelectorProps {
    options: SelectorOption[];
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

/**
 * Generic dropdown selector used inline within chart titles and page headers.
 * Renders the selected label as a bold body2; shows placeholder text when no
 * value is selected.
 */
const Selector = ({ options, value, placeholder, onChange }: SelectorProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <Select
            value={value ?? ''}
            onChange={handleChange}
            displayEmpty
            variant="standard"
            disableUnderline
            renderValue={(selected) => {
                const match = options.find((o) => o.value === selected);
                return (
                    <Typography variant="body2" fontWeight={600}>
                        {match ? match.label : placeholder ?? ''}
                    </Typography>
                );
            }}
        >
            {placeholder && (
                <MenuItem value="" disabled>
                    {placeholder}
                </MenuItem>
            )}
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default Selector;
