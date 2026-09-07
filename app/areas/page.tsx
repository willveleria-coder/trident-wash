import type { Metadata } from 'next';
import Link from 'next/link';
import { AREAS } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Service Areas | Pressure Washing Across Melbourne & Victoria',
  description:
    'Suburbs we service across Melbourne and Victoria for pressure washing, roof cleaning, gutter cleaning and exterior washing. Same-week starts.',
  alternates: { canonical: '/areas' },
};

export default function AreasPage() {
  const regions = [...new Set(AREAS.map((a) => a.region))];

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/areas' },
        ]}
      />

      <div className="bg-white pb-20 pt-28 lg:pt-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Where we work
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            We cover metropolitan Melbourne and surrounding Victoria. If your
            suburb is not listed, call us anyway — we travel further than this
            list for larger jobs.
          </p>

          {regions.map((region) => (
            <section key={region} className="mt-10">
              <h2 className="font-display text-2xl font-black tracking-tight text-slate-900">
                {region}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {AREAS.filter((a) => a.region === region).map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="block rounded-xl border-2 border-slate-900 bg-white px-4 py-3 font-bold text-slate-900 shadow-[3px_3px_0_0_#0F172A] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#0F172A]"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}