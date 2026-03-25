import * as React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import RstoListItemButton from './RstoListItemButton';

export interface IndicatorListItemProps {
    /** Short indicator code displayed in the orange chip, e.g. "QN1", "QL2" */
    code: string;
    /** Description text displayed next to the chip */
    description: string;
    /** Whether this item is currently selected */
    selected?: boolean;
    /** Click handler */
    onClick?: () => void;
}

/**
 * A navigation list item that displays an inline orange indicator chip
 * (e.g. QN1, QL1, P1) followed by a description. Used inside expandable
 * sections of the TwoLevelSidebar detail panel.
 */
const IndicatorListItem = ({
    code,
    description,
    selected = false,
    onClick,
}: IndicatorListItemProps) => {
    return (
        <RstoListItemButton
            className="nested"
            selected={selected}
            onClick={onClick}
            sx={{ pl: '32px', py: '8px' }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Chip
                    label={code}
                    size="small"
                    sx={{
                        height: 'auto',
                        borderRadius: '4px',
                        backgroundColor: 'rstoOrange._10',
                        '& .MuiChip-label': {
                            px: '4px',
                            py: '2px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            lineHeight: '18px',
                            color: 'primary.main',
                        },
                    }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: '20px' }}>
                    {description}
                </Typography>
            </Box>
        </RstoListItemButton>
    );
};

export default IndicatorListItem;
