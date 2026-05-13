'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, ArrowUpRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Transformations from '@/components/Transformations';
import HazardTape from '@/components/HazardTape';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const FEATURED = [
  {
    beforeSrc: 'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1200&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    title: 'Brighton driveway',
    desc: 'Three years of moss and oil, restored in a single afternoon.',
    variant: 'yellow' as const,
  },
  {
    beforeSrc: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    title: 'Hawthorn roof',
    desc: 'Soft-wash treatment killed lichen at the root. No high pressure, no broken tiles.',
    variant: 'cyan' as const,
  },
];

export default function GalleryPage() {
  return (
    <main className="bg-white">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-white overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px] pointer-events-none" />

        {/* Watermark */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            GALLERY
          </div>
        </div>

        {/* Decorative stamp */}
        <div className="absolute top-36 right-6 lg:right-16 rotate-12 hidden md:block pointer-events-none">
          <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#0F172A]">
            Real jobs ★
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
            The gallery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-slate-900"
          >
            Before, after,
            <br />
            <span className="italic relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
              >
                in awe.
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M2 8 Q 100 2, 200 6 T 398 5"
                  stroke="#FFD60A"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 text-slate-700 text-lg lg:text-xl max-w-xl mx-auto leading-relaxed font-medium"
          >
            Real properties. Real photos.{' '}
            <span className="font-bold">No stock images, no agency b-roll.</span> Every job
            below is from the last 30 days.
          </motion.p>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <div className="bg-yellow-400 border-2 border-slate-900 rounded-2xl px-5 py-3 shadow-[4px_4px_0_0_#0F172A] -rotate-1">
              <div className="font-display text-2xl leading-none text-slate-900">100+</div>
              <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-900/70 mt-1">
                Five-star jobs
              </div>
            </div>
            <div className="bg-[#00B8D9] border-2 border-slate-900 rounded-2xl px-5 py-3 shadow-[4px_4px_0_0_#FFD60A] rotate-1">
              <div className="font-display text-2xl leading-none text-white">50+</div>
              <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/80 mt-1">
                Properties cleaned
              </div>
            </div>
            <div className="bg-white border-2 border-slate-900 rounded-2xl px-5 py-3 shadow-[4px_4px_0_0_#0F172A] -rotate-1">
              <div className="font-display text-2xl leading-none text-slate-900">4.8★</div>
              <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-500 mt-1">
                Google rating
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HAZARD TAPE ── */}
      <HazardTape className="w-full h-2" />

      {/* ── FEATURED BEFORE/AFTER SLIDERS ── */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />

        {/* Watermark */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[18vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            DRAG
          </div>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
            >
              <Sparkles className="w-3 h-3" />
              Featured · Drag to reveal
            </motion.div>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
              The proof is
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                >
                  in the drag.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 400 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 8 Q 100 2, 200 6 T 398 5"
                    stroke="#FFD60A"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {FEATURED.map((f, i) => {
              const isYellow = f.variant === 'yellow';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={i === 1 ? 'lg:translate-y-8' : ''}
                >
                  {/* Slider */}
                  <div
                    className={`rounded-3xl border-2 border-slate-900 overflow-hidden ${
                      isYellow
                        ? 'shadow-[8px_8px_0_0_#FFD60A]'
                        : 'shadow-[8px_8px_0_0_#0F172A]'
                    }`}
                  >
                    <div className="relative aspect-[4/3]">
                      <BeforeAfterSlider
                        beforeSrc={f.beforeSrc}
                        afterSrc={f.afterSrc}
                        alt={f.title}
                      />
                    </div>
                  </div>

                  {/* Footer chip */}
                  <div
                    className={`mt-4 rounded-2xl border-2 border-slate-900 px-5 py-4 flex items-start justify-between gap-4 ${
                      isYellow
                        ? 'bg-yellow-400 shadow-[4px_4px_0_0_#0F172A]'
                        : 'bg-[#00B8D9] shadow-[4px_4px_0_0_#FFD60A]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-3.5 h-3.5 ${
                              isYellow
                                ? 'fill-slate-900 text-slate-900'
                                : 'fill-white text-white'
                            }`}
                          />
                        ))}
                      </div>
                      <h3
                        className={`font-display text-2xl leading-none ${
                          isYellow ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {f.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed max-w-xs ${
                          isYellow ? 'text-slate-900/75' : 'text-white/85'
                        }`}
                      >
                        {f.desc}
                      </p>
                    </div>
                    <div
                      className={`shrink-0 text-[9px] tracking-[0.2em] uppercase font-bold mt-1 ${
                        isYellow ? 'text-slate-900/60' : 'text-white/70'
                      }`}
                    >
                      ★ After
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HAZARD TAPE ── */}
      <HazardTape className="w-full h-2" />

      {/* ── TRANSFORMATIONS SCROLL SECTION ── */}
      <Transformations />

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="relative bg-slate-900 rounded-3xl border-2 border-slate-900 shadow-[10px_10px_0_0_#FFD60A] overflow-hidden">
            <div className="absolute top-0 inset-x-0">
              <HazardTape className="w-full h-1.5" />
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <HazardTape className="w-full h-1.5" />
            </div>

            <div className="p-8 lg:p-12 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-yellow-400 text-[10px] tracking-[0.3em] uppercase font-bold">
                    50+ five-star jobs
                  </span>
                </div>
                <div className="font-display text-4xl lg:text-6xl tracking-tightest text-white leading-[0.92]">
                  Like what
                  <br />
                  <span className="italic text-yellow-400">you see?</span>
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #67E8F9 0%, #22D3EE 100%)',
                    }}
                  >
                    Book the day.
                  </span>
                </div>
                <p className="mt-5 text-white/70 text-base lg:text-lg max-w-md leading-relaxed">
                  Send a couple of photos through and we'll send back a fixed quote — same day,
                  every time.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-between gap-3 px-6 py-5 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-yellow-400 shadow-[5px_5px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 transition-all text-lg"
                >
                  <span className="flex items-center gap-3">
                    <Zap className="w-5 h-5" strokeWidth={2.5} />
                    Get my free quote
                  </span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-between gap-3 px-6 py-5 bg-transparent text-white font-bold rounded-2xl border-2 border-white hover:bg-white hover:text-slate-900 transition-colors text-lg"
                >
                  <span>View all services</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </Link>
                <div className="text-center text-xs text-white/50 tracking-wider mt-1">
                  Avg quote returned in 2 hours during business days
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}