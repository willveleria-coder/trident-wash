/**
 * SAVE AS: app/services/[slug]/page.tsx
 *
 * Generates a real landing page per service at build time. These are the
 * pages that rank for "roof cleaning melbourne" etc — the homepage can only
 * realistically rank for one or two head terms.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Phone } from 'lucide-react';

import { SERVICES, AREAS, getService, SITE_URL, BUSINESS } from '@/lib/seo';
import { ServiceSchema, FaqSchema, BreadcrumbSchema } from '@/components/Schema';
import HeroContactForm from '@/components/HeroContactForm';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) return {};

  return {
    title: `${service.name} Melbourne | Fixed Price, Free Quote`,
    description: service.blurb,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} Melbourne | ${BUSINESS.name}`,
      description: service.blurb,
      url: `${SITE_URL}/services/${service.slug}`,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <ServiceSchema service={service} />
      <FaqSchema faqs={service.faqs} />
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />

      <article className="bg-white pb-20 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Breadcrumb — visible, not just schema. Google uses both. */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-[#00B8D9]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-[#00B8D9]">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{service.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {service.h1}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
                {service.intro}
              </p>

              {service.priceFrom && (
                <p className="mt-4 inline-block rounded-full border-2 border-slate-900 bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900">
                  From ${service.priceFrom} · fixed price, quoted before we start
                </p>
              )}

              {/* WHAT'S INCLUDED */}
              <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                What&rsquo;s included
              </h2>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-slate-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00B8D9]" strokeWidth={3} />
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>

              {/* FAQ — this is what earns the dropdown boxes in search results */}
              <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {service.name} questions
              </h2>
              <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                {service.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-display text-lg font-bold text-slate-900">{f.q}</dt>
                    <dd className="mt-2 leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>

              {/* AREAS — internal links are how ranking authority spreads */}
              <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {service.name} across Melbourne
              </h2>
              <p className="mt-3 text-slate-600">
                We cover metropolitan Melbourne and surrounding Victoria.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {AREAS.map((a) => (
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

              {/* RELATED SERVICES */}
              <h2 className="font-display mt-12 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Other services
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between rounded-2xl border-2 border-slate-900 bg-white px-5 py-4 font-bold text-slate-900 shadow-[4px_4px_0_0_#0F172A] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0F172A]"
                    >
                      {s.name}
                      <ArrowRight className="h-4 w-4 text-[#00B8D9] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* STICKY QUOTE FORM */}
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