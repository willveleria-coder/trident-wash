'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Phone, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import HazardTape from './HazardTape';
import { SITE } from '@/lib/data';

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,900;1,9..40,900&display=swap');

        @keyframes wave-flow-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
        }
        @keyframes wave-flow-mid {
          0%, 100% { transform: translateX(-10%); }
          50% { transform: translateX(-35%); }
        }
        @keyframes wave-flow-fast {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-50%); }
        }

        .hero-line-1 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 900;
          font-style: normal;
          /* stretch to fill viewport width */
          display: block;
          width: 100%;
          font-size: clamp(4.5rem, 23vw, 18rem);
          line-height: 0.88;
          letter-spacing: -0.03em;
          color: #0f172a;
        }

        .hero-line-2 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 900;
          font-style: italic;
          display: block;
          width: 100%;
          font-size: clamp(2rem, 12vw, 9.5rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #00B8D9 0%, #0EA5E9 50%, #00B8D9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section className="relative pt-24 lg:pt-28 pb-0" style={{ overflow: 'clip' }}>

        {/* ── BG PHOTO ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.72) 50%, rgba(236,254,255,0.35) 80%, rgba(103,232,249,0.12) 100%)',
            }}
          />
        </div>

        {/* ── WAVES ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ overflow: 'hidden' }}>
          <svg aria-hidden className="absolute bottom-0 left-0 h-[40%] pointer-events-none"
            style={{ width: '200%', animation: 'wave-flow-slow 18s ease-in-out infinite', willChange: 'transform' }}
            viewBox="0 0 2880 400" preserveAspectRatio="none">
            <path d="M0,200 C480,80 960,320 1440,200 C1920,80 2400,320 2880,200 L2880,400 L0,400 Z" fill="#0EA5E9" opacity="0.55" />
          </svg>
          <svg aria-hidden className="absolute bottom-0 left-0 h-[35%] pointer-events-none"
            style={{ width: '200%', animation: 'wave-flow-mid 12s ease-in-out infinite', willChange: 'transform' }}
            viewBox="0 0 2880 400" preserveAspectRatio="none">
            <path d="M0,250 C320,150 720,350 1200,250 C1680,150 2160,350 2880,250 L2880,400 L0,400 Z" fill="#22D3EE" opacity="0.6" />
          </svg>
          <svg aria-hidden className="absolute bottom-0 left-0 h-[28%] pointer-events-none"
            style={{ width: '200%', animation: 'wave-flow-fast 8s ease-in-out infinite', willChange: 'transform' }}
            viewBox="0 0 2880 400" preserveAspectRatio="none">
            <path d="M0,280 C240,200 600,380 960,280 C1320,200 1680,380 2040,280 C2400,200 2640,380 2880,280 L2880,400 L0,400 Z" fill="#67E8F9" opacity="0.7" />
          </svg>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-10 pt-8 lg:pt-14 pb-20 lg:pb-28 text-center">

          {/* PILLS */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6 lg:mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 shadow-[3px_3px_0_0_#0F172A]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-900" />
              </span>
              Live · Now booking
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-slate-900 text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 shadow-[3px_3px_0_0_#00B8D9]">
              <Sparkles className="w-3 h-3 text-[#00B8D9]" />
              4.8 · 50+ jobs
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B8D9] border-2 border-slate-900 text-[10px] tracking-[0.25em] uppercase font-bold text-white shadow-[3px_3px_0_0_#0F172A]">
              <Zap className="w-3 h-3" />
              Same-week start
            </span>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <span className="hero-line-1">Filth,</span>
            <span className="hero-line-2 relative inline-block w-full">
              meet your match.
              <svg
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%]"
                viewBox="0 0 400 8"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M2 5 Q 100 1, 200 4 T 398 3" stroke="#FFD60A" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* SUBHEADING */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-base sm:text-lg lg:text-xl text-slate-800 max-w-lg mx-auto leading-relaxed font-semibold"
          >
            Melbourne's most thorough exterior clean. Driveways that look poured yesterday. Roofs that look re-tiled. Guaranteed spotless.
          </motion.p>

          {/* MINI STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 flex justify-center gap-3"
          >
            <MiniStat value="100+" label="5-star jobs" color="yellow" />
            <MiniStat value="50+" label="Properties" color="white" />
            <MiniStat value="4.8★" label="Avg rating" color="cyan" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/#free-quote"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold rounded-full border-2 border-slate-900 shadow-[0_8px_30px_-4px_rgba(0,184,217,0.7)] hover:scale-[1.03] transition-transform text-base w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
            >
              Get a free quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-[4px_4px_0_0_#0F172A] text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
          </motion.div>

          {/* TRUST BAR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 hidden sm:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.15em] text-slate-700"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">4.8</span>
              <span>on Google</span>
            </div>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00B8D9]" />
              Fully insured
            </span>
            <span className="text-slate-400">·</span>
            <span>Police checked</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function MiniStat({ value, label, color }: { value: string; label: string; color: 'yellow' | 'white' | 'cyan' }) {
  const styles = {
    yellow: { box: 'bg-yellow-400 border-slate-900 shadow-[3px_3px_0_0_#0F172A]', number: 'text-slate-900', label: 'text-slate-900/70' },
    white:  { box: 'bg-white border-slate-900 shadow-[3px_3px_0_0_#FFD60A]',       number: 'text-slate-900', label: 'text-slate-500'    },
    cyan:   { box: 'bg-[#00B8D9] border-slate-900 shadow-[3px_3px_0_0_#FFD60A]',   number: 'text-white',     label: 'text-white/80'     },
  }[color];
  return (
    <div className={`rounded-2xl border-2 px-4 py-3 lg:px-5 lg:py-4 ${styles.box}`}>
      <div className={`font-display text-2xl lg:text-3xl leading-none tracking-tightest font-black ${styles.number} tabular`}>{value}</div>
      <div className={`text-[9px] tracking-[0.2em] uppercase mt-1.5 font-bold ${styles.label}`}>{label}</div>
    </div>
  );
}