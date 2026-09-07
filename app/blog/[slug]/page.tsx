import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock, Phone } from 'lucide-react';

import { POSTS, getPost, relatedPosts, formatDate } from '@/lib/posts';
import { getService, SITE_URL, BUSINESS } from '@/lib/seo';
import { FaqSchema, BreadcrumbSchema } from '@/components/Schema';
import HeroContactForm from '@/components/HeroContactForm';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [BUSINESS.name],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post);
  const service = post.service ? getService(post.service) : undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: BUSINESS.name, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    inLanguage: 'en-AU',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {post.faqs && <FaqSchema faqs={post.faqs} />}
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="bg-white pb-20 pt-28 lg:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-[#00B8D9]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All articles
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <span className="rounded-full border-2 border-slate-900 bg-yellow-400 px-3 py-1 text-slate-900">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {post.readMins} min read
                </span>
              </div>

              <h1 className="font-display mt-5 text-3xl font-black leading-[1.02] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-6 border-l-4 border-[#00B8D9] pl-5 text-lg leading-relaxed text-slate-700">
                {post.intro}
              </p>

              <div className="mt-10 space-y-10">
                {post.sections.map((section) => (
                  <section key={section.h}>
                    <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                      {section.h}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((p, i) => (
                        <p key={i} className="leading-relaxed text-slate-700">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {post.faqs && post.faqs.length > 0 && (
                <section className="mt-12">
                  <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Common questions
                  </h2>
                  <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                    {post.faqs.map((f) => (
                      <div key={f.q} className="py-5">
                        <dt className="font-display text-lg font-bold text-slate-900">{f.q}</dt>
                        <dd className="mt-2 leading-relaxed text-slate-600">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {service && (
                <div className="mt-12 rounded-3xl border-4 border-slate-900 bg-[#0B1B33] p-8 shadow-[8px_8px_0_0_#FFD60A]">
                  <h2 className="font-display text-2xl font-black tracking-tight text-white">
                    Need {service.name.toLowerCase()} in Melbourne?
                  </h2>
                  <p className="mt-3 leading-relaxed text-white/70">{service.blurb}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-900 bg-yellow-400 px-6 py-3 font-bold text-slate-900"
                    >
                      See {service.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`tel:${BUSINESS.phoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 font-bold text-white"
                    >
                      <Phone className="h-4 w-4" />
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
              )}

              {related.length > 0 && (
                <section className="mt-12">
                  <h2 className="font-display text-2xl font-black tracking-tight text-slate-900">
                    Keep reading
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="group flex h-full flex-col rounded-2xl border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0_0_#0F172A] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0F172A]"
                        >
                          <span className="font-display font-bold leading-snug text-slate-900">
                            {r.title}
                          </span>
                          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#00B8D9]">
                            Read
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <HeroContactForm />
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}