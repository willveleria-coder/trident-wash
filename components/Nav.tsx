'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { SITE } from '@/lib/data';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink-900/80 backdrop-blur-xl border-b border-cyan-300/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <TridentMark className="w-9 h-9 text-cyan-300 transition-transform group-hover:rotate-[-12deg]" />
            <div className="leading-none">
              <div className="font-display text-xl tracking-tight text-cream-50">
                Trident
              </div>
              <div className="text-[10px] tracking-[0.3em] text-cyan-300/70 uppercase mt-0.5">
                Pressure Washing
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-cream-100/80 hover:text-cyan-300 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex items-center gap-2 text-sm text-cream-50 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="tabular">{SITE.phone}</span>
            </a>
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 bg-cyan-400 text-ink-900 font-medium text-sm rounded-full hover:bg-cyan-300 transition-colors"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-cream-50 p-2"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden bg-ink-900/95 backdrop-blur-xl pt-24 px-6">
          <nav className="flex flex-col gap-6">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-cream-50 hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="mt-6 flex items-center gap-2 text-cream-100/80"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 bg-cyan-400 text-ink-900 font-medium rounded-full text-center"
            >
              Free Quote
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export function TridentMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylised trident */}
      <path
        d="M20 4v32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 12 C 8 18, 12 22, 20 22 C 28 22, 32 18, 32 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M8 12 V 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 12 V 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 22 V 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16 36 H 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
