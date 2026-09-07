/**
 * SAVE AS: app/areas/[slug]/page.tsx
 *
 * One page per suburb. These catch "pressure washing point cook" style
 * searches, which convert far better than city-wide terms because the
 * intent is already local.
 *
 * IMPORTANT: the `local` paragraph in lib/seo.ts is what makes each page
 * distinct. If every suburb page says the same thing with the name swapped,
 * Google treats them as doorway pages and can drop the lot. Keep them real.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Phone } from 'lucide-react';

import { AREAS, SERVICES, getArea, SITE_URL, BUSINESS } from '@/lib/seo';
import { FaqSchema, BreadcrumbSchema } from '@/components/Schema';
import HeroContactForm from '@/components/HeroContactForm';

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const area = getArea(params.slug);
  if (!area) return {};

  return {
    title: `Pressure Washing ${area.name} | Roof, Driveway & Gutter Cleaning`,
    description: `${area.blurb} Fixed price quotes, same-week starts, fully insured. Servicing ${area.name} and the surrounding ${area.region}.`,
    keywords: [
      `pressure washing ${area.name.toLowerCase()}`,
      `pressure cleaning ${area.name.toLowerCase()}`,
      `roof cleaning ${area.name.toLowerCase()}`,
      `gutter cleaning ${area.name.toLowerCase()}`,
      `driveway cleaning ${area.name.toLowerCase()}`,
      `exterior cleaning ${area.name.toLowerCase()}`,
    ],
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: `Pressure Washing ${area.name} | ${BUSINESS.name}`,
      description: area.blurb,
      url: `${SITE_URL}/areas/${area.slug}`,
      type: 'website',
    },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();

  const nearby = AREAS.filter((a) => a.region === area.region && a.slug !== area.slug).slice(0, 6);

  const faqs = [
    {
      q: `Do you service ${area.name}?`,
      a: `Yes — ${area.name} is inside our regular service area and we can usually start within the same week. ${area.local}`,
    },
    {
      q: `How much does pressure washing cost in ${area.name}?`,
      a: `Driveways typically run $180 to $450, gutter cleaning $150 to $300, and a full house wash from $350. We quote a fixed price up front rather than charging by the hour, so the number you agree to is the number you pay.`,
    },
    {
      q: `How quickly can you get to ${area.name}?`,
      a: `Most ${area.name} jobs are booked within the same week. Call ${BUSINESS.phone} or send a photo through the quote form and we will come back with a fixed price, usually the same day.`,
    },
  ];

  return (
    <>
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/areas' },
          { name: area.name, path: `/areas/${area.slug}` },
        ]}
      />

      <article className="bg-white pb-20 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-[#00B8D9]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/areas" className="hover:text-[#00B8D9]">Areas</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{area.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Pressure washing in {area.name}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
                {area.local}
              </p>

              <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
                We cover {area.name} and the wider {area.region} for driveways, roofs,
                gutters, solar panels, render and full house washes. Every job is quoted
                at a fixed price before we start, and we send before and after photos
                when we finish.
              </p>

              <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                What we clean in {area.name}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between rounded-2xl border-2 border-slate-900 bg-white px-5 py-4 font-bold text-slate-900 shadow-[4px_4px_0_0_#0F172A] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0F172A]"
                    >
                      <span>
                        {s.name}
                        <span className="sr-only"> in {area.name}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#00B8D9] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Common questions
              </h2>
              <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                {faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-display text-lg font-bold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>

              {nearby.length > 0 && (
                <>
                  <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Nearby suburbs
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {nearby.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/areas/${a.slug}`}
                          className="inline-block rounded-full border-2 border-slate-900 bg-white px-3.5 py-1.5 text-sm font-bold text-slate-900 transition-colors hover:bg-yellow-400"
                        >
                          {a.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <HeroContactForm />
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-yellow-400 px-6 py-3.5 font-bold text-slate-900 shadow-[4px_4px_0_0_#0F172A]"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}