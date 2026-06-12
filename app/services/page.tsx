'use client'

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import HazardTape from '@/components/HazardTape';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  return (
    <main>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full bg-[#00B8D9]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[100px] pointer-events-none" />

        {/* Watermark */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            SERVICES
          </div>
        </div>

        {/* Decorative stamp */}
        <div className="absolute top-36 right-4 lg:right-12 rotate-12 hidden md:block pointer-events-none">
          <div className="bg-yellow-400 text-slate-900 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#00B8D9]">
            Full menu ★
          </div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-8 shadow-[4px_4px_0_0_#00B8D9]"
          >
            <Sparkles className="w-3 h-3" />
            Full menu
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display leading-[0.84] tracking-tightest text-slate-900 max-w-5xl"
          >
            <span className="block text-[14vw] lg:text-[9vw]">
              Every surface
            </span>
            <span className="block text-[12vw] lg:text-[7.5vw] italic relative inline-block mt-1">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 50%, #00B8D9 100%)',
                }}
              >
                has its method.
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-[80%]"
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

          {/* Sub copy + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 lg:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-medium max-w-xl border-l-4 border-[#00B8D9] pl-5">
              From driveways to rooftops — we tailor pressure, technique, and chemistry to the surface. No guesswork, no damage.
            </p>
            <Link
              href="/contact"
              className="shrink-0 group inline-flex items-center gap-3 px-7 py-4 bg-yellow-400 text-slate-900 font-bold rounded-full border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] hover:shadow-[0_0_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Get a free quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HAZARD TAPE DIVIDER ───────────────────────────────── */}
      <HazardTape className="w-full h-3" />

      {/* ── INTRO SECTION ─────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT — image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              {/* Yellow stamp behind */}
              <div
                aria-hidden
                className="absolute -top-4 -left-4 w-full h-full bg-yellow-400 rounded-3xl border-2 border-slate-900"
              />
              {/* Image card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[8px_8px_0_0_#00B8D9] aspect-[4/3]">
                <img
                  src="/service.png"
                  alt="Professional pressure washing a driveway in Melbourne"
                  className="w-full h-full object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 bg-yellow-400 border-2 border-slate-900 rounded-2xl px-4 py-3 shadow-[3px_3px_0_0_#0F172A]">
                  <div className="font-display text-2xl leading-none text-slate-900">50+</div>
                  <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-900/70 mt-1">Jobs completed</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B8D9] border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-white font-bold mb-6 shadow-[4px_4px_0_0_#FFD60A]">
                <Zap className="w-3 h-3" />
                Why it matters
              </div>

              <h2 className="font-display text-4xl lg:text-5xl leading-[0.9] tracking-tightest text-slate-900 mb-6">
                The right technique
                <br />
                <span className="italic relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                  >
                    protects your property.
                  </span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
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

              <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-medium mb-8 border-l-4 border-[#00B8D9] pl-5">
                Not every surface can handle the same pressure. Blasting a render wall like a concrete driveway will crack and pit it within months. We match PSI, nozzle angle, dwell time, and cleaning agents to what's actually in front of us — so you get a spotless result without hidden damage that shows up later.
              </p>

              {/* Trust chips */}
              <div className="space-y-3">
                {[
                  { icon: CheckCircle2, text: 'Soft wash for renders, roofs & painted surfaces' },
                  { icon: Shield, text: 'High-pressure only where the surface demands it' },
                  { icon: Sparkles, text: 'Eco-friendly detergents, plant-safe rinse every time' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-slate-900 shadow-[3px_3px_0_0_#FFD60A] font-bold text-sm text-slate-900"
                  >
                    <Icon className="w-4 h-4 text-[#00B8D9] shrink-0" strokeWidth={2.5} />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HAZARD TAPE ───────────────────────────────────────── */}
      <HazardTape className="w-full h-3" />

      {/* ── SERVICES COMPONENT ───────────────────────────────── */}
      <Services />

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <Process />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQ />

      <CTA />
      <Footer />
    </main>
  );
}