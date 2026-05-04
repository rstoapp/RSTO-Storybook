'use client';
import * as React from 'react';
import { ClickAwayListener, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';
import { TooltipProps } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HtmlTooltip from './HtmlTooltip';
import { rstoNeutral, rstoOrange } from '../../theme/tokens';
const TooltipIconButton = styled(IconButton)<IconButtonProps & { variant?: 'default' | 'insight' }>(
    ({ theme, variant = 'default' }) => ({
        padding: '4px',
        color: variant === 'insight' ? theme.palette.rstoBlue._70 : rstoNeutral.sand,
        '&:hover': {
            backgroundColor: 'transparent',
            color: variant === 'insight' ? theme.palette.rstoBlue._70 : rstoOrange._50,
        },
    })
);

// ── Types ─────────────────────────────────────────────────────────────────────

type CallToAction = { text: string; href: string; target?: string };

export type RstoTooltipProps = {
    content: { text: string; cta?: CallToAction };
    icon?: React.ReactNode;
    variant?: 'default' | 'insight';
    placement?: TooltipProps['placement'];
};

// ── Component ─────────────────────────────────────────────────────────────────

const RstoTooltip = ({ content, icon, variant = 'default', placement = 'right-start' }: RstoTooltipProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <HtmlTooltip
                    PopperProps={{
                        modifiers: [
                            // offset: [skidding, distance]
                            // skidding=4 nudges tooltip down to align with the icon image
                            // (compensates for the 4px top padding on TooltipIconButton)
                            // distance=4 gives a tight spacing(0.5) gap
                            { name: 'offset',          options: { offset: [4, 4] } },
                            { name: 'flip',            options: { fallbackPlacements: ['right-start', 'left-start'] } },
                            { name: 'preventOverflow', options: { padding: 8 } },
                        ],
                    }}
                    placement={placement}
                    onClose={() => setOpen(false)}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <Stack spacing={1.5}>
                            <Typography sx={{ fontSize: '12px', lineHeight: 1.5, color: rstoNeutral.earth }}>
                                {content.text}
                            </Typography>
                            {content.cta && (
                                <Button
                                    sx={{ padding: '8px 12px' }}
                                    href={content.cta.href}
                                    target={content.cta.target}
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    {content.cta.text}
                                </Button>
                            )}
                        </Stack>
                    }
                >
                    <TooltipIconButton
                        disableRipple
                        onClick={() => setOpen((o) => !o)}
                        variant={variant}
                    >
                        {icon ?? (
                            <InfoOutlinedIcon
                                sx={{ fontSize: '16px', color: variant === 'insight' ? 'rstoBlue._70' : 'inherit' }}
                            />
                        )}
                    </TooltipIconButton>
                </HtmlTooltip>
            </div>
        </ClickAwayListener>
    );
};

export default RstoTooltip;
