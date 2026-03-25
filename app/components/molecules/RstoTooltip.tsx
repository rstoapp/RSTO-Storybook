'use client';
import * as React from 'react';
import { ClickAwayListener, IconButton, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ── Atoms ────────────────────────────────────────────────────────────────────

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

const TooltipIconButton = styled(IconButton)<IconButtonProps & { variant?: 'default' | 'insight' }>(
    ({ theme, variant = 'default' }) => ({
        '&:hover': {
            backgroundColor: 'transparent',
            color: variant === 'insight' ? theme.palette.rstoBlue._70 : theme.palette.rstoOrange._50,
        },
    })
);

// ── Types ─────────────────────────────────────────────────────────────────────

type CallToAction = { text: string; href: string; target?: string };

export type RstoTooltipProps = {
    content: { text: string; cta?: CallToAction };
    icon?: React.ReactNode;
    variant?: 'default' | 'insight';
};

// ── Component ─────────────────────────────────────────────────────────────────

const RstoTooltip = ({ content, icon, variant = 'default' }: RstoTooltipProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div>
                <HtmlTooltip
                    PopperProps={{
                        disablePortal: true,
                        modifiers: [{ name: 'offset', options: { offset: [0, -7] } }],
                    }}
                    placement="right-start"
                    onClose={() => setOpen(false)}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <Stack spacing={3}>
                            <Typography variant="body2" sx={{ lineHeight: '24px' }}>
                                {content.text}
                            </Typography>
                            {content.cta && (
                                <Button
                                    sx={{ padding: '14px 16px' }}
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
                                sx={{ fontSize: '16px', color: variant === 'insight' ? 'rstoBlue._50' : 'inherit' }}
                            />
                        )}
                    </TooltipIconButton>
                </HtmlTooltip>
            </div>
        </ClickAwayListener>
    );
};

export default RstoTooltip;
