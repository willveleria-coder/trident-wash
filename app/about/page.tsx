'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Stats from '@/components/Stats';
import HazardTape from '@/components/HazardTape';
import { motion } from 'framer-motion';
import { Award, Shield, Sparkles, Heart, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { SITE } from '@/lib/data';

const VALUES = [
  {
    icon: Award,
    title: 'Done right or done again',
    body: "If anything isn't up to standard, we come back. Every job, every time. No fine print.",
    style: {
      wrapper: 'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#00B8D9]',
      icon: 'bg-[#00B8D9] text-white',
      title: 'text-slate-900',
      body: 'text-slate-600',
      rotation: '-rotate-1',
    },
  },
  {
    icon: Shield,
    title: 'Fully insured, properly trained',
    body: 'Public Liability Insurance. Police-checked operators. Insurance certificates available on request.',
    style: {
      wrapper: 'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
      icon: 'bg-slate-900 text-yellow-400',
      title: 'text-slate-900',
      body: 'text-slate-900/70',
      rotation: 'rotate-1',
    },
  },
  {
    icon: Sparkles,
    title: 'The right method per surface',
    body: 'High pressure for hard. Soft wash for delicate. The wrong method etches concrete and forces water under render.',
    style: {
      wrapper: 'bg-[#00B8D9] border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
      icon: 'bg-yellow-400 text-slate-900',
      title: 'text-slate-900',
      body: 'text-slate-900/75',
      rotation: '-rotate-1',
    },
  },
  {
    icon: Heart,
    title: 'Real people. Proper service.',
    body: 'From the first call to the final rinse, we keep things straightforward, professional, and accountable.',
    style: {
      wrapper: 'bg-slate-900 border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
      icon: 'bg-yellow-400 text-slate-900',
      title: 'text-yellow-400',
      body: 'text-white/75',
      rotation: 'rotate-1',
    },
  },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full bg-[#00B8D9]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[100px] pointer-events-none" />

        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            ABOUT
          </div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-8 shadow-[4px_4px_0_0_#00B8D9]"
          >
            <Sparkles className="w-3 h-3" />
            The story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display leading-[0.84] tracking-tightest text-slate-900 max-w-5xl"
          >
            <span className="block text-[13vw] lg:text-[8.5vw]">Built on hard work,</span>
            <span className="block text-[11vw] lg:text-[7vw] italic relative inline-block mt-1">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 50%, #00B8D9 100%)',
                }}
              >
                a standard,
              </span>
            </span>
            <span className="block text-[13vw] lg:text-[8.5vw] mt-1 relative inline-block">
              and results.
              <svg
                className="absolute -bottom-2 left-0 w-[60%]"
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 lg:mt-14 text-slate-600 text-lg lg:text-xl leading-relaxed font-medium max-w-xl border-l-4 border-[#00B8D9] pl-5"
          >
            Built on trust, understanding and professionalism — you're not another number to us as a local business.
          </motion.p>
        </div>
      </section>

      <HazardTape className="w-full h-3" />

      {/* ── STORY SECTION ─────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute top-0 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div
                aria-hidden
                className="absolute -top-3 -left-3 w-full h-full bg-yellow-400 rounded-3xl border-2 border-slate-900"
              />
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[8px_8px_0_0_#00B8D9] aspect-[4/3]">
                <img
                  src="/about.png"
                  alt="Trident Pressure Washing operator at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-slate-900 border-2 border-slate-900 rounded-2xl px-4 py-3 shadow-[3px_3px_0_0_#FFD60A]">
                  <div className="font-display text-2xl leading-none text-yellow-400">Melbourne</div>
                  <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/70 mt-1">Locally owned & operated</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#00B8D9]">
                <Sparkles className="w-3 h-3" />
                The why
              </div>

              <h2 className="font-display text-4xl lg:text-5xl leading-[0.9] tracking-tightest text-slate-900 mb-6">
                Most pressure washing
                <br />
                <span className="italic relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                  >
                    looks clean.
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

              <div className="space-y-5 text-slate-600 text-base lg:text-lg leading-relaxed font-medium border-l-4 border-[#00B8D9] pl-5">
                <p>
                  But long-term results come down to the method, the equipment, and the care taken during the job.
                </p>
                <p>
                  At Trident, we focus on doing exterior cleaning properly — from the right nozzle for each surface, to biodegradable detergents, to photo documentation on every job.
                </p>
                <p>
                  We set up with the right gear — commercial grade machines, surface cleaners, soft-wash injectors, pure-water poles. Fully insured. Trained on every method.
                </p>
                <p className="font-bold text-slate-900">
                  Most of our work comes from referrals. That's the only metric that matters.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-between gap-3 px-5 py-3 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Get a free quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-colors shadow-[4px_4px_0_0_#0F172A]"
                >
                  <Phone className="w-4 h-4" />
                  {SITE.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <HazardTape className="w-full h-3" />

      {/* ── VALUES GRID ───────────────────────────────────────── */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />

        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[18vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            VALUES
          </div>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#00B8D9]"
              >
                <Sparkles className="w-3 h-3" />
                How we work
              </motion.div>

              <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
                Four things we
                <br />
                <span className="italic relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                  >
                    never compromise on.
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

            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-medium border-l-4 border-[#00B8D9] pl-5">
                These aren't marketing lines. They're the reasons clients come back — and send their neighbours.
              </p>
            </div>
          </div>

          <div className="mb-10 lg:mb-14">
            <HazardTape className="w-full h-2" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={v.style.rotation}
                >
                  <div
                    className={`relative rounded-3xl p-6 lg:p-8 min-h-[260px] flex flex-col transition-all duration-200 cursor-default ${v.style.wrapper}`}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center mb-6 ${v.style.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-current opacity-40 mb-2">
                      {String(i + 1).padStart(2, '0')} of 04
                    </div>

                    <h3 className={`font-display text-2xl lg:text-3xl leading-tight tracking-tight mb-3 ${v.style.title}`}>
                      {v.title}
                    </h3>

                    <p className={`text-sm leading-relaxed mt-auto ${v.style.body}`}>
                      {v.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <HazardTape className="w-full h-3" />

      <Stats />

      <CTA />
      <Footer />
    </main>
  );
}