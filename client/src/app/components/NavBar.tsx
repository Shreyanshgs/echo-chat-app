'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
<nav className="sticky top-0 z-50 bg-[#23262a] text-[#f1e9e6] px-6 py-4 flex justify-between items-center shadow">
      <div className="text-4xl font-lecker" >Echo</div>
      <div className="text-4xl space-x-8 font-zain">
        <Link className="hover:text-[#DE8260]" href="/">Home</Link>
        <Link className="hover:text-[#DE8260]" href="/login">Login</Link>
        <Link className="hover:text-[#DE8260]" href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}