'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import HazardTape from './HazardTape';
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
      <div className="fixed top-0 inset-x-0 z-[60]">
        <HazardTape className="w-full h-1.5" />
      </div>

      <header
        className={`fixed top-1.5 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 lg:px-6">
          <div
            className={`relative bg-white border-2 border-slate-900 rounded-full transition-all duration-300 w-full min-w-0 ${
              scrolled
                ? 'shadow-[4px_4px_0_0_#0F172A]'
                : 'shadow-[6px_6px_0_0_#0F172A]'
            }`}
          >
            <div className="flex items-center justify-between pl-2 pr-2 lg:pl-4 lg:pr-4 py-2">

              {/* LOGO — slightly larger */}
              <Link href="/" className="group flex items-center gap-3 shrink-0">
                <div className="relative w-16 h-16 lg:w-14 lg:h-14 shrink-0 ml-3">
                  <Image
                    src="/logo.png"
                    alt="Trident Pressure Washing logo"
                    fill
                    sizes="80px"
                    className="object-contain group-hover:scale-105 transition-transform"
                    priority
                  />
                </div>
                <div className="leading-none hidden sm:block">
                  <div className="font-display text-lg lg:text-xl tracking-tight text-slate-900 uppercase">
                    TRIDENT
                  </div>
                  <div className="text-[8px] lg:text-[9px] tracking-[0.3em] text-slate-900/60 uppercase mt-0.5 font-bold">
                    PRESSURE · WASHING
                  </div>
                </div>
              </Link>

              {/* DESKTOP NAV LINKS */}
              <nav className="hidden lg:flex items-center">
                <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 border-2 border-slate-900">
                  {NAV.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-2 text-sm font-bold text-slate-900 hover:text-white transition-colors rounded-full overflow-hidden group"
                    >
                      <span
                        className="absolute inset-0 rounded-full transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                        style={{
                          background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)',
                        }}
                      />
                      <span className="relative">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* RIGHT SIDE */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-slate-900 text-sm font-bold text-white shadow-[0_0_15px_rgba(0,184,217,0.5)] hover:shadow-[0_0_25px_rgba(0,184,217,0.8)] transition-all"
                  style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="tabular">{SITE.phone}</span>
                </a>

                <Link
                  href="/#free-quote"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-slate-900 font-bold text-sm rounded-full border-2 border-slate-900 bg-yellow-400 shadow-[0_0_15px_rgba(255,214,10,0.5)] hover:shadow-[0_0_25px_rgba(255,214,10,0.8)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  Free Quote
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-full bg-yellow-400 border-2 border-slate-900 text-slate-900 flex items-center justify-center shadow-[2px_2px_0_0_#0F172A]"
                aria-label="Menu"
              >
                {open ? (
                  <X className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <Menu className="w-4 h-4" strokeWidth={3} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white pt-28 px-6 overflow-y-auto">
          <div className="absolute bottom-0 inset-x-0">
            <HazardTape className="w-full h-3" />
          </div>

          <nav className="flex flex-col gap-3">
            {NAV.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group relative font-display text-3xl text-slate-900 bg-white border-2 border-slate-900 rounded-2xl px-6 py-4 shadow-[4px_4px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_0_#0F172A] transition-all ${
                  i % 2 === 0 ? '-rotate-1' : 'rotate-1'
                }`}
              >
                {link.label}
                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00B8D9]" />
              </Link>
            ))}

            <a
              href={`tel:${SITE.phoneRaw}`}
              className="mt-4 flex items-center gap-2 px-6 py-4 rounded-2xl text-white font-bold shadow-[4px_4px_0_0_#0F172A] border-2 border-slate-900"
              style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-4 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 bg-yellow-400 shadow-[4px_4px_0_0_#0F172A]"
            >
              Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}