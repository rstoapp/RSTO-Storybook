import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { rstoNeutral } from '../../theme/tokens';

const HtmlTooltip = styled(
    ({ className, children, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }}>
            {children}
        </Tooltip>
    )
)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.background.paper,
        color: rstoNeutral.earth,
        border: `1px solid ${rstoNeutral.sand}`,
        borderRadius: '8px',
        padding: '12px 16px',
        width: 240,
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        // Zero MUI's default 14px placement margins — gap is controlled
        // entirely by the Popper offset modifier in RstoTooltip.
        margin: 0,
        [`&.${tooltipClasses.tooltipPlacementLeft}`]:   { margin: 0 },
        [`&.${tooltipClasses.tooltipPlacementRight}`]:  { margin: 0 },
        [`&.${tooltipClasses.tooltipPlacementTop}`]:    { margin: 0 },
        [`&.${tooltipClasses.tooltipPlacementBottom}`]: { margin: 0 },
    },
}));

export default HtmlTooltip;
