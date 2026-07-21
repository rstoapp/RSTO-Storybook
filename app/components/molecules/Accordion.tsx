import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import {
    AccordionDetails,
    AccordionSummary,
    Accordion as MuiAccordion,
    styled,
    Typography,
} from '@mui/material';
import * as React from 'react';

interface AccordionProps {
    title?: string;
    children?: React.ReactNode;
    defaultExpanded?: boolean;
}

const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    borderRadius: '8px',
    overflow: 'hidden',
    '&:first-of-type': { borderRadius: '8px' },
    '&:last-of-type': { borderRadius: '8px' },
    '&:before': {
        display: 'none',
    },
    '& .MuiAccordionSummary-root': {
        border: `2px solid ${theme.palette.rstoGray._40}`,
        borderRadius: '8px',
        padding: theme.spacing(3),
        minHeight: 'unset',
        transition: 'border-color 0.2s ease-in-out',
        '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.text.primary,
            transition: 'color 0.2s ease-in-out',
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
    },
    '& .MuiAccordionDetails-root': {
        padding: theme.spacing(3),
    },
    '&:not(.Mui-expanded):hover .MuiAccordionSummary-root': {
        borderColor: theme.palette.primary.main,
        '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.primary.main,
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
        },
    },
    '&.Mui-expanded .MuiAccordionSummary-root': {
        border: 'none',
        borderBottom: `2px solid ${theme.palette.rstoGray._40}`,
        borderRadius: '8px 8px 0 0',
    },
}));

const TitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const Accordion: React.FC<AccordionProps> = ({
    title = 'Indicator context',
    children,
    defaultExpanded = false,
}) => {
    return (
        <StyledAccordion defaultExpanded={defaultExpanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <TitleContainer>
                    <LibraryBooksOutlinedIcon sx={{ fontSize: 18 }} />
                    <Typography variant="h6" component="div" sx={{ lineHeight: '24px' }}>
                        {title}
                    </Typography>
                </TitleContainer>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </StyledAccordion>
    );
};

export default Accordion;
