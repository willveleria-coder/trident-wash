import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, Search } from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/seo';
import HazardTape from '@/components/HazardTape';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const popular = SERVICES.slice(0, 6);

  return (
    <main className="relative bg-white overflow-hidden">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Glow blobs */}
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full bg-[#00B8D9]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[100px] pointer-events-none" />

        {/* Watermark */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[26vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            404
          </div>
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-8 shadow-[4px_4px_0_0_#00B8D9]">
            <Search className="w-3 h-3" />
            Page not found
          </div>

          <h1 className="font-display leading-[0.85] tracking-tightest text-slate-900">
            <span className="block text-[15vw] lg:text-[9rem]">Nothing</span>
            <span className="block text-[11vw] lg:text-[6rem] italic relative inline-block mt-1">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 50%, #00B8D9 100%)',
                }}
              >
                to clean here.
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 8 Q 100 2, 200 6 T 398 5"
                  stroke="#FFD60A"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-10 text-slate-600 text-lg lg:text-xl leading-relaxed font-medium max-w-lg mx-auto">
            This page has been moved or never existed. Everything else is still
            where you left it.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-yellow-400 text-slate-900 font-bold rounded-full border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] hover:shadow-[0_0_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Back to home
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      <HazardTape className="w-full h-3" />

      {/* RECOVERY LINKS */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-3xl lg:text-4xl leading-none tracking-tightest text-slate-900 text-center">
            Looking for one of these?
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-center justify-between rounded-2xl border-2 border-slate-900 bg-white px-6 py-5 font-bold text-slate-900 shadow-[4px_4px_0_0_#0F172A] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_0_#0F172A]"
                >
                  {s.name}
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#00B8D9] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { href: '/services', label: 'All services' },
              { href: '/areas', label: 'Service areas' },
              { href: '/blog', label: 'Blog' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-block rounded-full border-2 border-slate-900 bg-white px-5 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-yellow-400"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}