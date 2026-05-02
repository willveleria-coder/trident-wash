'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '@/lib/data';

export default function Reviews() {
  return (
    <section className="relative py-24 lg:py-32 bg-cream-50 text-ink-900 overflow-hidden">
      {/* Decorative giant quote */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.04]">
        <Quote className="w-[600px] h-[600px] text-ink-900" strokeWidth={1} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <div className="text-xs tracking-[0.3em] uppercase text-teal-500 mb-4">
              ◆ The verdict
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest">
              What
              <br />
              Melbourne's
              <br />
              <span className="italic text-teal-500">saying.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="bg-ink-900 text-cream-50 rounded-2xl p-6 w-full">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>
              <div className="font-display text-3xl mb-1">5.0 rating</div>
              <div className="text-sm text-cream-100/60">
                Across 100+ Google reviews · verified
              </div>
            </div>
          </div>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className={`relative bg-cream-50 rounded-2xl p-7 border border-ink-900/10 hover:border-teal-500/40 transition-colors ${
                i === 1 ? 'lg:translate-y-8' : i === 4 ? 'lg:translate-y-8' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-teal-500 text-teal-500"
                    />
                  ))}
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-ink-900/40">
                  {r.date}
                </span>
              </div>

              <p className="text-ink-900/80 leading-relaxed text-[15px] mb-6">
                {r.body}
              </p>

              <div className="flex items-end justify-between pt-5 border-t border-ink-900/10">
                <div>
                  <div className="font-display text-xl leading-none">{r.name}</div>
                  <div className="text-xs text-ink-900/50 mt-1">{r.suburb}</div>
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-teal-500 text-right max-w-[40%]">
                  {r.service}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
