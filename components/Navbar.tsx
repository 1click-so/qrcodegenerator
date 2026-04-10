'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: 'https://generatebarcode.io', label: 'Barcode Generator', external: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-lg border-b border-gray-200/40 px-6 lg:px-10">
      <nav className="max-w-[1400px] mx-auto h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="4" height="4" fill="white" />
              <rect x="11" y="1" width="4" height="4" fill="white" />
              <rect x="1" y="11" width="4" height="4" fill="white" />
              <rect x="7" y="7" width="2" height="2" fill="white" />
              <rect x="7" y="1" width="2" height="2" fill="white" />
              <rect x="1" y="7" width="2" height="2" fill="white" />
              <rect x="11" y="7" width="4" height="2" fill="white" />
              <rect x="7" y="11" width="2" height="4" fill="white" />
              <rect x="11" y="11" width="2" height="2" fill="white" />
              <rect x="14" y="11" width="1" height="1" fill="white" />
              <rect x="14" y="14" width="1" height="1" fill="white" />
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-charcoal">
            qrcode<span className="text-primary">generator</span>.to
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-softgray">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              className="hover:text-charcoal transition-colors inline-flex items-center gap-1.5"
            >
              {link.label}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-charcoal"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200/40 bg-paper/95 backdrop-blur-lg px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto py-4 flex flex-col gap-3">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                  onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-softgray hover:text-charcoal transition-colors py-2 inline-flex items-center gap-1.5"
              >
                {link.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
