'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Star, Phone, Mail, MapPin, Clock, ArrowUpRight, Zap } from 'lucide-react';
import { SITE, SERVICES } from '@/lib/data';
import HazardTape from './HazardTape';

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 overflow-hidden">
      <HazardTape className="w-full h-2" />

      {/* MEGA TAGLINE */}
      <div className="bg-white relative overflow-hidden">
        <div className="absolute top-0 -left-32 w-[600px] h-[400px] rounded-full bg-[#00B8D9]/15 blur-[100px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="font-display text-[15vw] lg:text-[10vw] leading-[0.9] tracking-tightest text-slate-900">
            Cleaner.
            <br />
            <span
              className="italic bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
            >
              Sharper.
            </span>
            <span className="text-slate-300"> Trident.</span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/#free-quote"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-yellow-400 shadow-[5px_5px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 transition-all text-base"
            >
              <Zap className="w-5 h-5" strokeWidth={2.5} />
              Get a free quote
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-3 px-6 py-4 bg-transparent text-slate-900 font-bold rounded-2xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all text-base"
            >
              <Phone className="w-5 h-5" strokeWidth={2.5} />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* MAIN COLUMNS */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">

          {/* BRAND */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Trident Pressure Washing"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Premium exterior cleaning for Melbourne homes and commercial
              properties. Fully insured, obsessed with detail.
            </p>

            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/trident.wash/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center bg-white hover:bg-yellow-400 transition-all shadow-[2px_2px_0_0_#0F172A]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61560261844850#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center bg-white hover:bg-yellow-400 transition-all shadow-[2px_2px_0_0_#0F172A]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE.social.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Reviews"
                className="px-4 h-10 rounded-full border-2 border-slate-900 flex items-center gap-2 bg-white hover:bg-yellow-400 transition-all text-xs font-bold shadow-[2px_2px_0_0_#0F172A]"
              >
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                Reviews
              </a>
            </div>

            <div className="inline-flex items-center gap-3 bg-yellow-400 border-2 border-slate-900 rounded-2xl px-4 py-3 shadow-[3px_3px_0_0_#0F172A]">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-slate-900 text-slate-900" />
                ))}
              </div>
              <span className="text-xs text-slate-900 font-bold tracking-wide">
                5.0 · 100+ Google reviews
              </span>
            </div>
          </div>

          {/* SERVICES */}
          <div className="lg:col-span-2 lg:col-start-6">
            <div className="inline-flex px-3 py-1 bg-[#00B8D9] border-2 border-slate-900 rounded-full text-[9px] tracking-[0.25em] uppercase text-white font-bold mb-5 shadow-[2px_2px_0_0_#0F172A]">
              Services
            </div>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B8D9] group-hover:bg-yellow-400 transition-colors shrink-0" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="lg:col-span-2">
            <div className="inline-flex px-3 py-1 bg-yellow-400 border-2 border-slate-900 rounded-full text-[9px] tracking-[0.25em] uppercase text-slate-900 font-bold mb-5 shadow-[2px_2px_0_0_#0F172A]">
              Company
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'About us',      href: '/about' },
                { label: 'Gallery',       href: '/gallery' },
                { label: 'Blog',          href: '/blog' },
                { label: 'Contact',       href: '/contact' },
                { label: 'Free quote',    href: '/#filthometer' },
                { label: 'Privacy policy', href: '/privacy' },
                { label: 'Terms',         href: '/terms' },
                { label: 'Reviews',       href: '/#reviews' },
                { label: 'Our process',   href: '/#process' },
                { label: 'FAQ',           href: '/#faq' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:bg-[#00B8D9] transition-colors shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + SERVICE AREAS */}
          <div className="lg:col-span-3">
            <div className="inline-flex px-3 py-1 bg-slate-900 border-2 border-slate-900 rounded-full text-[9px] tracking-[0.25em] uppercase text-white font-bold mb-5 shadow-[2px_2px_0_0_#00B8D9]">
              Get in touch
            </div>

            <div className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#00B8D9] mb-6 space-y-3">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-2.5 text-slate-900 hover:text-[#00B8D9] transition-colors font-display text-xl tabular"
              >
                <div className="w-7 h-7 rounded-full bg-[#00B8D9] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-slate-500 hover:text-[#00B8D9] transition-colors text-sm break-all"
              >
                <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-slate-900" />
                </div>
                {SITE.email}
              </a>
              <div className="flex items-start gap-2.5 text-slate-500 text-sm">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-700" />
                </div>
                {SITE.location}
              </div>
              <div className="flex items-center gap-2.5 text-slate-500 text-sm">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-slate-700" />
                </div>
                {SITE.hours}
              </div>
            </div>

            <div className="inline-flex px-3 py-1 bg-[#00B8D9] border-2 border-slate-900 rounded-full text-[9px] tracking-[0.25em] uppercase text-white font-bold mb-4 shadow-[2px_2px_0_0_#0F172A]">
              Service areas
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Melbourne CBD', 'Hawthorn', 'Camberwell', 'Brighton',
                'Bayside', 'Glen Waverley', 'Mornington', 'Frankston',
                'Doncaster', 'Balwyn', 'Kew', 'Toorak',
              ].map((area) => (
                <span
                  key={area}
                  className="text-[10px] tracking-wide text-slate-700 bg-slate-100 border-2 border-slate-900 rounded-full px-2.5 py-1 font-bold shadow-[1px_1px_0_0_#0F172A]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-16 pt-8 border-t-2 border-slate-900 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} Trident Pressure Washing · ABN-registered · Fully insured
          </div>
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full font-bold text-[10px] tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00B8D9] animate-pulse" />
            Contact Us Today
          </div>
        </div>
      </div>

      <HazardTape className="w-full h-2" />
    </footer>
  );
}