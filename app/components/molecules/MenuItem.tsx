import * as React from 'react';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

export interface MenuItemProps {
    icon: OverridableComponent<SvgIconTypeMap>;
    label: string;
    href: string;
    selected: boolean;
    onClick?: () => void;
}

const MenuItemWrapper = styled(Link)({
    textDecoration: 'none',
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: '12px',
    color: '#474747',        // rstoGray._90
    background: 'none',
    '& .iconWrapper': {
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        background: 'none',
        color: '#D1D1D1',    // rstoGray._60
    },
    '&:hover': {
        background: '#E8F2F4',  // rstoBlue._10
        '& .iconWrapper': {
            background: '#C3DDE2',  // rstoBlue._20
            color: '#4CAAC1',       // rstoBlue._60
        },
    },
    '&.selected, &:active': {
        background: '#FDF1E2',  // rstoOrange._10
        '& .iconWrapper': {
            background: '#F8D9B0',  // rstoOrange._20
            color: '#F28B2D',       // rstoOrange._50
        },
        '& .label': { fontWeight: '700' },
    },
});

const MenuItem = ({ icon: Icon, label, href, selected, onClick }: MenuItemProps) => (
    <MenuItemWrapper href={href} className={selected ? 'selected' : ''} onClick={onClick}>
        <div className="iconWrapper">
            <Icon sx={{ fontSize: '1.5rem', display: 'block' }} />
        </div>
        <Typography variant="caption" className="label">{label}</Typography>
    </MenuItemWrapper>
);

export default MenuItem;
