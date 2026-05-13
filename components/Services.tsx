'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Star, Phone, Zap } from 'lucide-react';
import HazardTape from './HazardTape';
import { SERVICES } from '@/lib/data';
import { SITE } from '@/lib/data';

// Per-service square metre pricing
const PRICING: Record<string, string> = {
  'pressure-washing': '$5/m²',
  'soft-washing': '$7/m²',
  'roof-cleaning': '$9/m²',
  'gutter-cleaning': '$8/lm',
  'solar-cleaning': '$12/panel',
  'window-cleaning': '$6/m²',
  'sealcoating': '$10/m²',
  'graffiti-removal': '$POA',
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Soft Miami glow accents */}
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px]" />

      {/* Massive watermark behind everything */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          SERVICES
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid lg:grid-cols-12 gap-10 mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
            >
              <Sparkles className="w-3 h-3" />
              The arsenal
            </motion.div>
            <h2 className="font-display text-5xl lg:text-8xl leading-[0.86] tracking-tightest text-slate-900">
              Eight ways
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)',
                  }}
                >
                  we hit clean.
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
          <div className="lg:col-span-4 flex items-end">
            <div className="relative">
              <div className="absolute -top-3 -left-3 -rotate-6 bg-[#00B8D9] text-white px-3 py-1 text-[9px] tracking-[0.3em] uppercase font-bold shadow-md border border-slate-900">
                Built for surface
              </div>
              <p className="text-slate-700 text-base lg:text-lg leading-relaxed pt-6 border-l-4 border-[#00B8D9] pl-5 font-medium">
                Every surface needs the right method. Pressure for hard. Soft wash for delicate. Chemical for biological. We pick the right one — every time.
              </p>
            </div>
          </div>
        </div>

        {/* HAZARD TAPE DIVIDER */}
        <div className="mb-10 lg:mb-14">
          <HazardTape className="w-full h-2" />
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={i}
              price={PRICING[service.slug] || '$POA'}
            />
          ))}
        </div>

        {/* PRICING NOTE — small text under grid */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs text-slate-500 tracking-wide">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            All prices are starting-from. Final quote based on condition, access, and total area.
          </span>
        </div>

        {/* STRONGER CTA BANNER */}
        <div className="mt-16 lg:mt-24 relative">
          {/* Decorative rotated stamps */}
          <div className="absolute -top-6 -left-2 lg:-left-6 -rotate-12 z-10 hidden md:block">
            <div className="bg-yellow-400 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-[3px_3px_0_0_#0F172A]">
              ★ Same-day quote
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 lg:-right-6 rotate-6 z-10 hidden md:block">
            <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-[3px_3px_0_0_#0F172A]">
              No deposit
            </div>
          </div>

          <div className="relative bg-slate-900 rounded-3xl border-2 border-slate-900 shadow-[10px_10px_0_0_#FFD60A] overflow-hidden">
            {/* Decorative hazard inside banner */}
            <div className="absolute top-0 inset-x-0">
              <HazardTape className="w-full h-1.5" />
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <HazardTape className="w-full h-1.5" />
            </div>

            <div className="p-8 lg:p-12 grid lg:grid-cols-12 gap-8 items-center">
              {/* LEFT — copy */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-yellow-400 text-[10px] tracking-[0.3em] uppercase font-bold">
                    50+ five-star jobs
                  </span>
                </div>
                <div className="font-display text-4xl lg:text-6xl tracking-tightest text-white leading-[0.92]">
                  Snap a photo.
                  <br />
                  <span className="italic text-yellow-400">Get your price.</span>
                  <br />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #67E8F9 0%, #22D3EE 100%)' }}>
                    Book the day.
                  </span>
                </div>
                <p className="mt-5 text-white/70 text-base lg:text-lg max-w-md leading-relaxed">
                  Send a couple of photos through and we'll send back a fixed quote — same day, every time.
                </p>
              </div>

              {/* RIGHT — buttons */}
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
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="group inline-flex items-center justify-between gap-3 px-6 py-5 bg-transparent text-white font-bold rounded-2xl border-2 border-white hover:bg-white hover:text-slate-900 transition-colors text-lg"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5" strokeWidth={2.5} />
                    Call {SITE.phone}
                  </span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </a>
                <div className="text-center text-xs text-white/50 tracking-wider mt-2">
                  Avg quote returned in 2 hours during business days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   SERVICE CARD — with price chip
   ────────────────────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
  price,
}: {
  service: any;
  index: number;
  price: string;
}) {
  const variants = [
    {
      wrapper:
        'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#00B8D9]',
      number: 'bg-[#00B8D9] text-white border-slate-900',
      title: 'text-slate-900',
      short: 'text-slate-600',
      arrow: 'text-slate-900 group-hover:bg-yellow-400',
      priceChip: 'bg-yellow-400 text-slate-900 border-slate-900',
      rotation: '-rotate-1',
    },
    {
      wrapper:
        'bg-[#00B8D9] border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
      number: 'bg-yellow-400 text-slate-900 border-slate-900',
      title: 'text-white',
      short: 'text-white/85',
      arrow: 'text-white group-hover:bg-yellow-400 group-hover:text-slate-900',
      priceChip: 'bg-white text-slate-900 border-slate-900',
      rotation: 'rotate-1',
    },
    {
      wrapper:
        'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
      number: 'bg-slate-900 text-yellow-400 border-slate-900',
      title: 'text-slate-900',
      short: 'text-slate-900/75',
      arrow: 'text-slate-900 group-hover:bg-[#00B8D9] group-hover:text-white',
      priceChip: 'bg-slate-900 text-yellow-400 border-slate-900',
      rotation: '-rotate-1',
    },
    {
      wrapper:
        'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
      number: 'bg-yellow-400 text-slate-900 border-slate-900',
      title: 'text-slate-900',
      short: 'text-slate-600',
      arrow: 'text-slate-900 group-hover:bg-[#00B8D9] group-hover:text-white',
      priceChip: 'bg-[#00B8D9] text-white border-slate-900',
      rotation: 'rotate-1',
    },
  ];

  const v = variants[index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className={`${v.rotation} transition-transform`}
    >
      <div
  className={`group relative block rounded-3xl p-6 lg:p-7 h-full min-h-[300px] transition-all duration-200 ${v.wrapper}`}
>
        {/* Top: number badge + arrow */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-display text-base font-bold ${v.number}`}
          >
            {service.number}
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:rotate-45 border-2 border-slate-900 ${v.arrow}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Body */}
        <div className="space-y-2 mb-4">
          <h3
            className={`font-display text-2xl lg:text-3xl leading-[1] tracking-tight ${v.title}`}
          >
            {service.title}
          </h3>
          <p className={`text-sm leading-relaxed ${v.short}`}>{service.short}</p>
        </div>

        {/* PRICE CHIP — bottom of card */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-2">
          <div
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border-2 font-bold text-sm tabular shadow-[2px_2px_0_0_rgba(15,23,42,0.5)] ${v.priceChip}`}
          >
            <span className="text-[9px] tracking-[0.2em] uppercase opacity-70 font-bold">
              From
            </span>
            <span>{price}</span>
          </div>
          <div className={`text-[9px] tracking-[0.2em] uppercase font-bold ${
            index % 4 === 1 ? 'text-white/70' : 'text-slate-500'
          }`}>
            See more →
          </div>
        </div>
      </div>
    </motion.div>
  );
}