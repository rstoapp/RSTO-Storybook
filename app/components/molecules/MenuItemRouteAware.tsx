'use client';
import * as React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuItem from './MenuItem';
import type { MenuItemProps } from './MenuItem';

export type MenuItemRouteAwareProps = Omit<MenuItemProps, 'selected'>;

const MenuItemRouteAware = (props: MenuItemRouteAwareProps) => {
    const [clicked, setClicked] = useState(false);
    const pathname = usePathname();
    return (
        <MenuItem
            {...props}
            selected={clicked || pathname === props.href}
            onClick={() => setClicked(true)}
        />
    );
};

export default MenuItemRouteAware;
