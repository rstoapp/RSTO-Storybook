'use client';
import { styled } from '@mui/material';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

export type MenuItemProps = {
    icon: OverridableComponent<SvgIconTypeMap>;
    label: string;
    href: string;
    selected: boolean;
    onClick?: () => void;
};

const MenuItemWrapper = styled(NextLink)(({ theme }) => ({
    textDecoration: 'none',
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: '12px',
    color: theme.palette.rstoGray._90,
    background: 'none',

    '.iconWrapper': {
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        background: 'none',
        color: theme.palette.rstoGray._60,
    },

    '&:hover': {
        background: theme.palette.rstoBlue._10,
        '.iconWrapper': {
            background: theme.palette.rstoBlue._20,
            color: theme.palette.rstoBlue._60,
        },
    },

    '&.selected, &:active': {
        background: theme.palette.rstoOrange._10,
        '.iconWrapper': {
            background: theme.palette.rstoOrange._20,
            color: theme.palette.rstoOrange._50,
        },
        '.label': { fontWeight: '700' },
    },
}));

const MenuItem = ({ icon: Icon, label, href, selected, onClick }: MenuItemProps) => (
    <MenuItemWrapper href={href} className={selected ? 'selected' : ''} onClick={onClick}>
        <div className="iconWrapper">
            <Icon sx={{ fontSize: '1.5rem', display: 'block' }} />
        </div>
        <Typography variant="caption" className="label">
            {label}
        </Typography>
    </MenuItemWrapper>
);

export default MenuItem;
