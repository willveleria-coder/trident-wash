'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HazardTape from '@/components/HazardTape';

const POSTS = [
  {
    slug: 'pressure-washing-vs-soft-washing',
    title: 'Pressure washing vs soft washing — which one does your surface actually need?',
    excerpt: 'Using high pressure on the wrong surface can cause real damage. Here\'s how we decide which method to use, and why it matters for your property.',
    date: 'May 2025',
    readTime: '4 min read',
    tag: 'How-to',
    variant: 'yellow' as const,
  },
  {
    slug: 'how-often-should-you-clean-your-driveway',
    title: 'How often should you actually clean your driveway in Melbourne?',
    excerpt: 'Melbourne\'s weather is brutal on concrete and pavers. Oil, lichen, and tannin stains build up faster than you\'d think. Here\'s the honest answer.',
    date: 'April 2025',
    readTime: '3 min read',
    tag: 'Maintenance',
    variant: 'cyan' as const,
  },
  {
    slug: 'roof-cleaning-without-high-pressure',
    title: 'Why we never use high pressure on roofs — and what we do instead',
    excerpt: 'A pressure washer on a tiled roof is a one-way ticket to broken tiles and voided warranties. Soft wash is the only safe method. Here\'s why.',
    date: 'March 2025',
    readTime: '5 min read',
    tag: 'Roofs',
    variant: 'white' as const,
  },
  {
    slug: 'solar-panel-cleaning-worth-it',
    title: 'Does cleaning your solar panels actually make a difference to output?',
    excerpt: 'Dirty panels can lose 15–25% efficiency. We ran the numbers on a Glen Waverley install — here\'s what the before and after data showed.',
    date: 'February 2025',
    readTime: '4 min read',
    tag: 'Solar',
    variant: 'yellow' as const,
  },
  {
    slug: 'removing-lichen-from-concrete',
    title: 'The right way to remove lichen from concrete without it coming straight back',
    excerpt: 'Blasting lichen off with pressure alone doesn\'t kill the root. Six weeks later it\'s back. Here\'s the chemical treatment that actually works.',
    date: 'January 2025',
    readTime: '5 min read',
    tag: 'Concrete',
    variant: 'cyan' as const,
  },
  {
    slug: 'preparing-your-home-for-sale',
    title: 'The quickest way to add kerb appeal before listing your home',
    excerpt: 'Real estate agents agree — a clean exterior is worth more than almost any other pre-sale spend. Here\'s what to prioritise and in what order.',
    date: 'December 2024',
    readTime: '3 min read',
    tag: 'Tips',
    variant: 'white' as const,
  },
];

const variantStyles = {
  yellow: {
    card: 'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
    tag: 'bg-slate-900 text-yellow-400',
    title: 'text-slate-900',
    excerpt: 'text-slate-900/75',
    meta: 'text-slate-900/60',
    arrow: 'bg-slate-900 text-yellow-400',
    rotation: '-rotate-1',
  },
  cyan: {
    card: 'bg-[#00B8D9] border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
    tag: 'bg-yellow-400 text-slate-900',
    title: 'text-white',
    excerpt: 'text-white/85',
    meta: 'text-white/70',
    arrow: 'bg-white text-slate-900',
    rotation: 'rotate-1',
  },
  white: {
    card: 'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#00B8D9]',
    tag: 'bg-[#00B8D9] text-white',
    title: 'text-slate-900',
    excerpt: 'text-slate-600',
    meta: 'text-slate-500',
    arrow: 'bg-slate-900 text-white',
    rotation: '-rotate-1',
  },
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <Nav />

      {/* HERO */}
      <section className="relative pt-32 pb-24 bg-white overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px] pointer-events-none" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            BLOG
          </div>
        </div>

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
          >
            <Sparkles className="w-3 h-3" />
            From the truck · Tips & knowledge
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-slate-900"
          >
            Straight talk
            <br />
            <span className="italic relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
              >
                no fluff.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 text-slate-700 text-lg lg:text-xl max-w-xl mx-auto leading-relaxed font-medium"
          >
            Honest advice on exterior cleaning — what works, what doesn't, and what to watch out for.
          </motion.p>
        </div>
      </section>

      <HazardTape className="w-full h-2" />

      {/* POSTS GRID */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {POSTS.map((post, i) => {
              const s = variantStyles[post.variant];
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className={`${s.rotation} transition-transform`}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`group relative flex flex-col rounded-3xl p-6 lg:p-7 min-h-[320px] transition-all duration-200 ${s.card}`}
                  >
                    {/* Tag + read time */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase font-bold border-2 border-slate-900 ${s.tag}`}>
                        {post.tag}
                      </span>
                      <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${s.meta}`}>
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className={`font-display text-2xl lg:text-2xl leading-tight tracking-tight flex-1 ${s.title}`}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className={`mt-3 text-sm leading-relaxed ${s.excerpt}`}>
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className={`flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-bold ${s.meta}`}>
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <div className={`w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center transition-transform group-hover:rotate-45 ${s.arrow}`}>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}