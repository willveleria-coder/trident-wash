'use client';

import { motion } from 'framer-motion';
import Counter from './Counter';
import SectionRipple from './SectionRipple';
import { STATS } from '@/lib/data';

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 bg-ink-900 overflow-hidden">
      <div className="absolute inset-0 water-mesh-soft" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/15 splash" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-sky-400/15 splash" />

      <SectionRipple originX={50} originY={50} color="rgba(103, 232, 249, 0.35)" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
              By the numbers
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-cream-50">
              Built on
              <br />
              <span className="italic gradient-text">repeat</span> business.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-cream-100/70 text-lg leading-relaxed max-w-md">
              Sunny started Trident in 2022. Most of our work today comes from
              referrals — the kind of growth that only happens when you do it right
              the first time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cyan-300/15 rounded-3xl overflow-hidden border border-cyan-300/20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-ink-900/90 backdrop-blur-sm p-8 lg:p-12 group hover:bg-ink-700 transition-colors duration-500"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300/80 mb-3">
                {stat.tag}
              </div>
              <div className="font-display text-6xl lg:text-7xl leading-none tracking-tightest text-cream-50 group-hover:text-cyan-300 transition-colors duration-500">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-4 text-sm text-cream-100/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
