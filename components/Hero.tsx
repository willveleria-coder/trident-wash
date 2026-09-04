'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Phone, Shield } from 'lucide-react';
import Link from 'next/link';
import HazardTape from './HazardTape';
import { SITE } from '@/lib/data';
import HeroContactForm from './HeroContactForm';

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
          display: block;
          font-size: clamp(4.5rem, 17vw, 10rem);
          line-height: 0.84;
          letter-spacing: -0.038em;
          color: #0f172a;
        }

        .hero-line-2 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 900;
          font-style: italic;
          display: inline-block;
          font-size: clamp(2rem, 8vw, 4.7rem);
          line-height: 0.95;
          letter-spacing: -0.025em;
          background: linear-gradient(90deg, #00B8D9 0%, #0EA5E9 50%, #00B8D9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 1024px) {
          .hero-line-1 { font-size: clamp(5rem, 9.6vw, 9rem); }
          .hero-line-2 { font-size: clamp(2.2rem, 4.5vw, 4.2rem); }
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
          <svg aria-hidden className="absolute bottom-0 left-0 h-[30%] pointer-events-none"
            style={{ width: '200%', animation: 'wave-flow-slow 18s ease-in-out infinite', willChange: 'transform' }}
            viewBox="0 0 2880 400" preserveAspectRatio="none">
            <path d="M0,200 C480,80 960,320 1440,200 C1920,80 2400,320 2880,200 L2880,400 L0,400 Z" fill="#0EA5E9" opacity="0.55" />
          </svg>
          <svg aria-hidden className="absolute bottom-0 left-0 h-[26%] pointer-events-none"
            style={{ width: '200%', animation: 'wave-flow-mid 12s ease-in-out infinite', willChange: 'transform' }}
            viewBox="0 0 2880 400" preserveAspectRatio="none">
            <path d="M0,250 C320,150 720,350 1200,250 C1680,150 2160,350 2880,250 L2880,400 L0,400 Z" fill="#22D3EE" opacity="0.6" />
          </svg>
          <svg aria-hidden className="absolute bottom-0 left-0 h-[20%] pointer-events-none"
            style={{ width: '200%', animation: 'wave-flow-fast 8s ease-in-out infinite', willChange: 'transform' }}
            viewBox="0 0 2880 400" preserveAspectRatio="none">
            <path d="M0,280 C240,200 600,380 960,280 C1320,200 1680,380 2040,280 C2400,200 2640,380 2880,280 L2880,400 L0,400 Z" fill="#67E8F9" opacity="0.7" />
          </svg>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-10 pt-8 lg:pt-12 pb-28 sm:pb-32 lg:pb-40">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:gap-14 xl:gap-20">

            {/* ══════════ LEFT COLUMN ══════════ */}
            <div className="text-left">

              {/* HEADLINE */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative"
              >
                <span className="hero-line-1">Filth,</span>
                <span className="block mt-1.5">
                  <span className="hero-line-2 relative">
                    meet your match.
                    <svg
                      className="absolute -bottom-0.5 left-0 w-full"
                      viewBox="0 0 400 8"
                      preserveAspectRatio="none"
                      fill="none"
                      aria-hidden
                    >
                      <path d="M2 5 Q 100 1, 200 4 T 398 3" stroke="#FFD60A" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
              </motion.h1>

              {/* SUBHEADING */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 text-sm sm:text-base text-slate-800 max-w-md leading-relaxed font-semibold"
              >
                Melbourne's most thorough exterior clean. Driveways that look poured yesterday. Roofs that look re-tiled. Guaranteed spotless.
              </motion.p>

              {/* MINI STATS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-5 flex flex-wrap justify-start gap-2"
              >
                <MiniStat value="5★" label="Avg rating" color="yellow" />
                <MiniStat value="Fixed" label="Price always" color="white" />
                <MiniStat value="100%" label="Satisfaction" color="cyan" />
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-2.5"
              >
                <Link
                  href="#free-quote"
                  className="group inline-flex md:hidden items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-full border-2 border-slate-900 shadow-[0_6px_22px_-4px_rgba(0,184,217,0.7)] hover:scale-[1.03] transition-transform text-sm w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
                >
                  Get a free quote
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-[0_0_16px_rgba(255,214,10,0.55)] text-sm w-full sm:w-auto"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {SITE.phone}
                </a>
              </motion.div>

              {/* TRUST BAR */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="mt-5 hidden sm:flex flex-wrap items-center justify-start gap-x-3.5 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-slate-700"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">5.0</span>
                  <span>on Google</span>
                </div>
                <span className="text-slate-400">·</span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#00B8D9]" />
                  Insured
                </span>
                <span className="text-slate-400">·</span>
                <span>Police checked</span>
              </motion.div>
            </div>

            {/* ══════════ RIGHT COLUMN — FORM ══════════ */}
            <motion.div
              id="free-quote"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="w-full scroll-mt-28"
            >
              <HeroContactForm />
            </motion.div>

          </div>
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
    <div className={`rounded-xl border-2 px-3 py-2 ${styles.box}`}>
      <div className={`font-display text-lg leading-none tracking-tightest font-black ${styles.number} tabular`}>{value}</div>
      <div className={`text-[8px] tracking-[0.2em] uppercase mt-1 font-bold ${styles.label}`}>{label}</div>
    </div>
  );
}