'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import style from './nav-link.module.css';

const NavLink = ({ href, children }) => {
    const currentPath = usePathname();

    return (
        <Link href={href} className={currentPath == href ? style.active : undefined}>
            {children}
        </Link>
    )
}

export default NavLink;