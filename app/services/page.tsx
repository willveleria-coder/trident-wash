import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES, AREAS } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Exterior Cleaning Services Melbourne | Pressure Washing & More',
  description:
    'Every exterior cleaning service we offer across Melbourne — pressure washing, roof soft washing, gutter cleaning, solar panels, render, windows and commercial.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <div className="bg-white pb-20 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Exterior cleaning services in Melbourne
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Everything we clean, from a single driveway to a full commercial
            forecourt. Each job is quoted at a fixed price before we start.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[5px_5px_0_0_#0F172A] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#0F172A]"
                >
                  <h2 className="font-display text-xl font-black text-slate-900">{s.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#00B8D9]">
                    {s.priceFrom ? `From $${s.priceFrom}` : 'Get a quote'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}