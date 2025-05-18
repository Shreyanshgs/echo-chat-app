'use client';

import { usePathname } from 'next/navigation'
import Navbar from './NavBar';

export default function NavbarWrapper() {
    const pathname = usePathname();
    const hideNavbar = pathname.startsWith('/messages');

    return !hideNavbar ? <Navbar /> : null;
}