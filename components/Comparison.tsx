'use client';

import { motion } from 'framer-motion';
import { Check, X, Sparkles, Star, Zap } from 'lucide-react';
import HazardTape from './HazardTape';
import { COMPARISON } from '@/lib/data';

// Shared column definition — used on EVERY row so they always match
const COL = 'grid-cols-[1fr_auto_auto]';
const COL_WIDTHS = {
  feature: 'w-full',
  trident: 'w-28 lg:w-48 shrink-0',
  typical: 'w-28 lg:w-48 shrink-0',
};

export default function Comparison() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-yellow-300/20 blur-[80px]" />

      {/* Watermark */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          VS
        </div>
      </div>

      {/* Stamps */}
      <div className="absolute top-32 left-4 lg:left-12 -rotate-12 hidden md:block pointer-events-none">
        <div className="bg-yellow-400 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#0F172A]">
          ★ Receipts inside
        </div>
      </div>
      <div className="absolute top-44 right-4 lg:right-12 rotate-12 hidden md:block pointer-events-none">
        <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#0F172A]">
          No fluff · No spin
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
          >
            <Sparkles className="w-3 h-3" />
            Side by side
          </motion.div>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
            See exactly
            <br />
            what{' '}
            <span className="italic relative inline-block">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}>
                we do different.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Decorative stamp */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full border-4 border-slate-900 shadow-xl z-0 hidden lg:flex items-center justify-center rotate-12" aria-hidden>
            <div className="text-center leading-tight">
              <div className="text-[8px] tracking-[0.2em] font-bold uppercase text-slate-900/70">No</div>
              <div className="font-display text-lg leading-none">tricks</div>
            </div>
          </div>

          <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[10px_10px_0_0_#FFD60A] bg-white">
            <HazardTape className="w-full h-2" />

            {/* ── HEADER ROW ── */}
            <div className="flex border-b-2 border-slate-900">
              {/* Feature col */}
              <div className="flex-1 min-w-0 p-3 lg:p-7 bg-slate-900 flex items-center">
                <span className="text-[10px] lg:text-xs tracking-[0.3em] uppercase text-yellow-400 font-bold font-mono">
                  ◆ What you get
                </span>
              </div>
              {/* Trident col */}
              <div
                className="w-28 lg:w-48 shrink-0 p-4 lg:p-7 border-l-2 border-slate-900 text-center relative flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
              >
                <div className="absolute top-2 right-2 rotate-12 z-20">
                  <div className="bg-yellow-400 border-2 border-slate-900 px-2 py-0.5 rounded-full text-[9px] tracking-[0.2em] uppercase font-bold shadow-[2px_2px_0_0_#0F172A]">
                    ★ Us
                  </div>
                </div>
                <div className="font-display text-lg lg:text-3xl tracking-tight text-white">Trident</div>
                <div className="text-[8px] lg:text-[9px] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-white/80 font-bold mt-1 hidden sm:block">
                  The way it should be
                </div>
              </div>
              {/* Typical col */}
              <div className="w-28 lg:w-48 shrink-0 p-4 lg:p-7 border-l-2 border-slate-900 bg-slate-100 text-center flex flex-col items-center justify-center">
                <div className="font-display text-lg lg:text-3xl tracking-tight text-slate-400">Typical</div>
                <div className="text-[8px] lg:text-[9px] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-slate-400 font-bold mt-1 hidden sm:block">
                  The other guys
                </div>
              </div>
            </div>

            {/* ── BODY ROWS ── */}
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`flex items-stretch group transition-colors border-b border-slate-200 last:border-b-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                } hover:bg-yellow-50`}
              >
                {/* Feature */}
                <div className="flex-1 min-w-0 p-3 lg:p-6 text-slate-900 font-bold text-xs lg:text-base flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400 tabular shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-tight">{row.feature}</span>
                </div>
                {/* Trident — fixed width matches header */}
                <div className="w-28 lg:w-48 shrink-0 border-l-2 border-slate-900 bg-cyan-50 flex items-center justify-center p-3 lg:p-6">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0_0_#0F172A] group-hover:rotate-12 transition-transform shrink-0">
                    <Check className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-slate-900" strokeWidth={3.5} />
                  </div>
                </div>
                {/* Typical — fixed width matches header */}
                <div className="w-28 lg:w-48 shrink-0 border-l-2 border-slate-900 bg-slate-100 flex items-center justify-center p-3 lg:p-6">
                  {typeof row.typical === 'string' ? (
                    <span className="text-slate-500 text-[10px] lg:text-sm font-bold italic text-center leading-tight px-1">
                      {row.typical}
                    </span>
                  ) : (
                    <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-slate-400" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <HazardTape className="w-full h-2" />
          </div>
        </motion.div>

        {/* SUMMARY STATS */}
        <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-4 lg:gap-6">
          <SummaryStat number={COMPARISON.length} label="Things we do that they don't" variant="yellow" />
          <SummaryStat number="0" label="Hidden fees or surprise add-ons" variant="cyan" />
          <SummaryStat number="100%" label="Re-clean guarantee if not satisfied" variant="black" />
        </div>

        {/* CTA */}
        <div className="mt-10 lg:mt-14 text-center">
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-full border-2 border-slate-900 shadow-[5px_5px_0_0_#0F172A] hover:shadow-[0_0_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 transition-all"
            style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
          >
            <Zap className="w-4 h-4" strokeWidth={2.5} />
            See it for yourself — book a quote
          </a>
        </div>
      </div>
    </section>
  );
}

function SummaryStat({ number, label, variant }: { number: string | number; label: string; variant: 'yellow' | 'cyan' | 'black' }) {
  const styles = {
    yellow: { box: 'bg-yellow-400 border-slate-900 shadow-[5px_5px_0_0_#0F172A]', number: 'text-slate-900', label: 'text-slate-900/80', icon: <Star className="w-5 h-5 fill-slate-900" /> },
    cyan:   { box: 'bg-[#00B8D9] border-slate-900 shadow-[5px_5px_0_0_#FFD60A]',  number: 'text-white',     label: 'text-white/85',    icon: <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" /> },
    black:  { box: 'bg-slate-900 border-slate-900 shadow-[5px_5px_0_0_#FFD60A]',  number: 'text-yellow-400',label: 'text-white/85',    icon: <Check className="w-5 h-5 text-yellow-400" strokeWidth={3} /> },
  }[variant];
  return (
    <div className={`rounded-2xl border-2 p-6 ${styles.box}`}>
      <div className="flex items-center justify-between mb-3">
        {styles.icon}
        <span className={`text-[9px] tracking-[0.3em] uppercase font-bold ${styles.label}`}>The truth</span>
      </div>
      <div className={`font-display text-5xl lg:text-6xl leading-none tracking-tightest tabular ${styles.number}`}>{number}</div>
      <div className={`mt-3 text-sm font-bold ${styles.label}`}>{label}</div>
    </div>
  );
}