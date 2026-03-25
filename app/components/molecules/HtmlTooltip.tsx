import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(
    ({ className, children, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }}>
            {children}
        </Tooltip>
    )
)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        padding: 24,
        width: 320,
        boxShadow: '0px 12px 32px 0px #19191926, 0px 0px 1px 0px #1919194D',
    },
}));

export default HtmlTooltip;
