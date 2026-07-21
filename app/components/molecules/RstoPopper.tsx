'use client';
import { Box, ClickAwayListener, Fade, Popper } from '@mui/material';
import React, { PropsWithChildren, ReactNode } from 'react';

type RstoPopperProps = {
    popperContent: ReactNode;
    placement: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const RstoPopper = ({
    popperContent,
    placement,
    children,
    open,
    setOpen,
}: PropsWithChildren<RstoPopperProps>) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Box aria-describedby={id} onClick={handleClick}>
                    {children}
                </Box>
                <Popper
                    id={id}
                    open={open}
                    placement={placement as any}
                    anchorEl={anchorEl}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box
                                sx={{
                                    boxShadow:
                                        '0px 12px 32px 0px #19191926, 0px 0px 1px 0px #1919194D',
                                    borderRadius: '4px',
                                }}
                            >
                                {popperContent}
                            </Box>
                        </Fade>
                    )}
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

export default RstoPopper;
