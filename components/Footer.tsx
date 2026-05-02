'use client';

import Link from 'next/link';
import { Instagram, Facebook, Star } from 'lucide-react';
import { SITE, SERVICES } from '@/lib/data';
import { TridentMark } from './Nav';

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 text-cream-50 border-t border-cyan-300/10 overflow-hidden">
      {/* Mega tagline */}
      <div className="border-b border-cyan-300/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="font-display text-[15vw] lg:text-[10vw] leading-[0.9] tracking-tightest text-cream-50">
            Cleaner.
            <br />
            <span className="italic gradient-text">Sharper.</span>
            <span className="text-cream-50/30"> Trident.</span>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <TridentMark className="w-9 h-9 text-cyan-300" />
              <div className="leading-none">
                <div className="font-display text-xl tracking-tight">
                  Trident
                </div>
                <div className="text-[10px] tracking-[0.3em] text-cyan-300/70 uppercase mt-0.5">
                  Pressure Washing
                </div>
              </div>
            </Link>
            <p className="text-cream-100/60 text-sm leading-relaxed max-w-xs mb-6">
              Premium exterior cleaning for Melbourne homes and commercial
              properties. Owner-operated, fully insured, obsessed with detail.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-cream-50/15 flex items-center justify-center hover:bg-cyan-400 hover:text-ink-900 hover:border-cyan-300 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-cream-50/15 flex items-center justify-center hover:bg-cyan-400 hover:text-ink-900 hover:border-cyan-300 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE.social.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Reviews"
                className="px-4 h-10 rounded-full border border-cream-50/15 flex items-center gap-2 hover:bg-cyan-400 hover:text-ink-900 hover:border-cyan-300 transition-colors text-xs"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                Reviews
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 lg:col-start-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 mb-5">
              Services
            </div>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-cream-100/70 hover:text-cyan-300 transition-colors text-sm"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div className="lg:col-span-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 mb-5">
              Site
            </div>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-cream-100/70 hover:text-cyan-300 transition-colors text-sm">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream-100/70 hover:text-cyan-300 transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream-100/70 hover:text-cyan-300 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream-100/70 hover:text-cyan-300 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 mb-5">
              Get in touch
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="text-cream-50 hover:text-cyan-300 transition-colors font-display text-xl tabular"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-cream-100/70 hover:text-cyan-300 transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-cream-100/70">{SITE.location}</li>
              <li className="text-cream-100/70">{SITE.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-cream-50/10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-xs text-cream-100/40">
          <div>© {new Date().getFullYear()} Trident Pressure Washing · ABN-registered, fully insured</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Currently booking — 5 day response window
          </div>
        </div>
      </div>
    </footer>
  );
}
