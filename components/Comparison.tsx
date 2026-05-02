'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import WaterParticles from './WaterParticles';
import { COMPARISON } from '@/lib/data';

export default function Comparison() {
  return (
    <section className="relative py-24 lg:py-32 bg-ink-900 overflow-hidden">
      <div className="absolute inset-0 water-mesh-soft opacity-70" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-300/15 splash" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-sky-400/15 splash" />

      <WaterParticles density="subtle" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
            ◆ Side by side
          </div>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-cream-50 max-w-3xl mx-auto">
            See exactly what
            <br />
            <span className="italic gradient-text">makes us different.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-cyan-300/25 backdrop-blur-sm shadow-[0_0_60px_-12px_rgba(34,211,238,0.4)]"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-ink-700/90">
            <div className="p-5 lg:p-6 text-[10px] tracking-[0.3em] uppercase text-cream-100/60 font-mono">
              What you get
            </div>
            <div className="p-5 lg:p-6 bg-cyan-300 text-ink-900 text-center font-display text-xl tracking-tight">
              Trident
            </div>
            <div className="p-5 lg:p-6 text-center text-[10px] tracking-[0.3em] uppercase text-cream-100/60 font-mono">
              Typical
            </div>
          </div>

          {/* Body */}
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.4fr_1fr_1fr] items-center group transition-colors ${
                i % 2 === 0 ? 'bg-ink-800/80' : 'bg-ink-700/50'
              } hover:bg-cyan-300/10`}
            >
              <div className="p-5 lg:p-6 text-cream-50 text-sm lg:text-base">
                {row.feature}
              </div>
              <div className="p-5 lg:p-6 text-center bg-cyan-300/10">
                <Check className="w-5 h-5 text-cyan-300 inline-block" strokeWidth={3} />
              </div>
              <div className="p-5 lg:p-6 text-center text-cream-100/60 text-sm">
                {typeof row.typical === 'string' ? (
                  row.typical
                ) : (
                  <X className="w-5 h-5 inline-block" strokeWidth={2.5} />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
