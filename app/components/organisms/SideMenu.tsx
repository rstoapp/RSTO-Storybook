'use client';
import { styled } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import MenuItem from '../molecules/MenuItem';

export type NavItem = {
    icon: OverridableComponent<SvgIconTypeMap>;
    label: string;
    href: string;
};

export type SideMenuProps = {
    items: NavItem[];
};

const StyledSideDiv = styled('div')(({ theme }) => ({
    background: theme.palette.rstoGray.white,
    position: 'relative',
    width: '120px',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 8px 16px 0px #0000001F',
    alignItems: 'center',

    '.menuList': {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',

        '> *:last-child': {
            marginTop: 'auto',
        },
    },
}));

const SideMenu = ({ items }: SideMenuProps) => {
    const pathname = usePathname();
    const [clicked, setClicked] = useState<string | null>(null);

    return (
        <StyledSideDiv>
            <div style={{ marginBottom: '4.5rem', fontWeight: 700, color: '#E07B39', fontSize: 18 }}>
                RSTO
            </div>
            <div className="menuList">
                {items.map((item) => (
                    <MenuItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        selected={clicked === item.href || pathname === item.href}
                        onClick={() => setClicked(item.href)}
                    />
                ))}
            </div>
        </StyledSideDiv>
    );
};

export default SideMenu;
