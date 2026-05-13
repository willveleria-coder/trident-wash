'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, MapPin, Sparkles, Star, Calendar } from 'lucide-react';
import HazardTape from './HazardTape';

const TRANSFORMATIONS = [
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    suburb: 'Brighton',
    service: 'Driveway + sealcoating',
    date: 'This week',
    variant: 'yellow',
    rotation: '-rotate-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=800&q=80',
    suburb: 'Hawthorn',
    service: 'Roof soft wash',
    date: 'Last week',
    variant: 'white',
    rotation: 'rotate-1',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    suburb: 'Glen Waverley',
    service: 'House exterior',
    date: 'Last week',
    variant: 'cyan',
    rotation: '-rotate-1',
  },
  {
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
    suburb: 'Bentleigh',
    service: 'Full property',
    date: '2 weeks ago',
    variant: 'white',
    rotation: 'rotate-2',
  },
  {
    img: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&q=80',
    suburb: 'Doncaster',
    service: 'Patio + concrete',
    date: '2 weeks ago',
    variant: 'yellow',
    rotation: '-rotate-1',
  },
  {
    img: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
    suburb: 'St Kilda',
    service: 'Render soft wash',
    date: '3 weeks ago',
    variant: 'white',
    rotation: 'rotate-1',
  },
  {
    img: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&q=80',
    suburb: 'Box Hill',
    service: 'Solar panel array',
    date: '3 weeks ago',
    variant: 'cyan',
    rotation: '-rotate-2',
  },
];

export default function Transformations() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative pt-0 pb-24 lg:pb-32 bg-white">
      {/* TOP hazard tape */}
        <HazardTape className="w-full h-2.5" />

      {/* Background accents */}
<div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px] pointer-events-none overflow-hidden" />
<div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px] pointer-events-none overflow-hidden" />

      {/* Watermark */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          FRESH
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 mb-12 lg:mb-16 pt-10 lg:pt-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="lg:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
            >
              <Sparkles className="w-3 h-3" />
              Recent work · This month
            </motion.div>

            <h2 className="font-display text-5xl lg:text-8xl leading-[0.86] tracking-tightest text-slate-900">
              Fresh from
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)',
                  }}
                >
                  Sunny's truck.
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

            <p className="mt-6 text-slate-700 text-base lg:text-lg max-w-xl leading-relaxed font-medium">
              Real properties. Real photos. <span className="font-bold">Updated weekly.</span> No stock images, no agency b-roll. Every transformation below is from the last 30 days.
            </p>
          </div>

          {/* CHUNKY arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full bg-white border-2 border-slate-900 text-slate-900 hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-[4px_4px_0_0_#0F172A] hover:shadow-[2px_2px_0_0_#0F172A] hover:translate-x-0.5 hover:translate-y-0.5"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border-2 border-slate-900 text-white transition-colors flex items-center justify-center shadow-[4px_4px_0_0_#0F172A] hover:shadow-[2px_2px_0_0_#0F172A] hover:translate-x-0.5 hover:translate-y-0.5"
              style={{
                background:
                  'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)',
              }}
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* SCROLLER */}
      <div className="overflow-x-hidden pt-8 pb-16">
        <div
          ref={scrollerRef}
          className="flex gap-6 lg:gap-7 overflow-x-auto no-scrollbar scroll-smooth pl-6 lg:pl-10 pr-6"
style={{ scrollSnapType: 'x mandatory', touchAction: 'pan-x' }}
        >
          {TRANSFORMATIONS.map((item, i) => (
            <TransformationCard key={i} item={item} index={i} />
          ))}
          <div className="shrink-0 w-6 lg:w-10" aria-hidden />
        </div>
      </div>

      {/* BOTTOM ticker — "more coming" */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 mt-8">
        <div className="bg-slate-900 rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400" />
            </div>
            <span className="text-white font-bold text-sm lg:text-base">
              <span className="text-yellow-400">12 jobs</span> booked in this week ·{' '}
              <span className="text-[#67E8F9]">7 properties</span> still to clean
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/60 font-bold">
            <Calendar className="w-3 h-3" />
            Updated every Friday
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   TRANSFORMATION CARD — polaroid sticker
   ────────────────────────────────────────────────────────── */
function TransformationCard({ item, index }: { item: any; index: number }) {
  const variants = {
    yellow: {
      wrapper:
        'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
      suburbChip: 'bg-slate-900 text-yellow-400',
      title: 'text-slate-900',
      meta: 'text-slate-900/70',
      dateChip: 'bg-white border border-slate-900 text-slate-900',
    },
    white: {
      wrapper:
        'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#00B8D9]',
      suburbChip: 'bg-[#00B8D9] text-white',
      title: 'text-slate-900',
      meta: 'text-slate-600',
      dateChip: 'bg-yellow-400 border border-slate-900 text-slate-900',
    },
    cyan: {
      wrapper:
        'bg-[#00B8D9] border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
      suburbChip: 'bg-yellow-400 text-slate-900',
      title: 'text-white',
      meta: 'text-white/85',
      dateChip: 'bg-white border border-slate-900 text-slate-900',
    },
  }[item.variant as 'yellow' | 'white' | 'cyan'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative shrink-0 w-[300px] lg:w-[360px] ${item.rotation} transition-transform`}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className={`rounded-3xl p-4 transition-all duration-200 ${variants.wrapper}`}>
        {/* PHOTO with overlay sticker */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-900">
          <Image
            src={item.img}
            alt={`${item.service} in ${item.suburb}`}
            fill
            sizes="360px"
            className="object-cover"
          />
          {/* AFTER stamp */}
          <div className="absolute top-3 right-3 bg-white border-2 border-slate-900 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 shadow-[2px_2px_0_0_#0F172A] rotate-6">
            ★ After
          </div>
          {/* Date stamp */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold shadow-[2px_2px_0_0_#0F172A] -rotate-3 ${variants.dateChip}`}>
            {item.date}
          </div>

          {/* Suburb pin at bottom of photo */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold">
            <MapPin className="w-3 h-3 text-yellow-400" strokeWidth={2.5} />
            {item.suburb}
          </div>
        </div>

        {/* CARD FOOTER */}
        <div className="px-2 pt-4 pb-2">
          <div className={`flex items-center gap-1 mb-2 ${variants.meta}`}>
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </div>
          <div className={`font-display text-2xl lg:text-2xl leading-tight tracking-tight ${variants.title}`}>
            {item.service}
          </div>
          <div className={`mt-1.5 text-[10px] tracking-[0.2em] uppercase font-bold ${variants.meta}`}>
            Job #{String(1247 + index).padStart(4, '0')} · Completed
          </div>
        </div>
      </div>
    </motion.div>
  );
}