'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import HazardTape from './HazardTape';

type Job = {
  id: string;
  label: string;
  suburb: string;
  caption: string;
  before: string;
  after: string;
};

// Roof first, as requested. Add the roof pair to /public/before-after/
// and it will slot straight in.
const JOBS: Job[] = [
  {
    id: 'roof',
    label: 'Roof soft wash',
    suburb: 'Melbourne',
    caption: 'Moss and lichen killed at the root — no pressure near the tiles.',
    before: '/before-after/roof-before.jpg',
    after: '/before-after/roof-after.jpg',
  },
  {
    id: 'driveway',
    label: 'Driveway',
    suburb: 'Melbourne',
    caption: 'Years of black staining lifted out of the pavers.',
    before: '/before-after/driveway-before.jpg',
    after: '/before-after/driveway-after.jpg',
  },
  {
    id: 'house',
    label: 'Entry & render',
    suburb: 'Melbourne',
    caption: 'Pillars, path and render soft washed in a morning.',
    before: '/before-after/house-before.jpg',
    after: '/before-after/house-after.jpg',
  },
];

export default function BeforeAfter() {
  return (
    <section className="relative bg-white overflow-hidden">
      <HazardTape className="w-full h-2.5" />

      <div className="relative py-20 lg:py-28">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/12 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />

        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[20vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            PROOF
          </div>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]">
              <Sparkles className="w-3 h-3" />
              Real jobs · Real photos
            </div>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
              Drag the slider.
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                >
                  See it for yourself.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="mt-8 text-slate-700 text-base lg:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Same spot, same camera, same day.{' '}
              <span className="font-bold">No filters, no stock photos.</span>
            </p>
          </motion.div>

          {/* ROWS */}
          <div className="space-y-14 lg:space-y-20">
            {JOBS.map((job, i) => (
              <Row key={job.id} job={job} flip={i % 2 === 1} index={i} />
            ))}
          </div>
        </div>
      </div>

      <HazardTape className="w-full h-2.5" />
    </section>
  );
}

/* ─────────── one row ─────────── */

function Row({ job, flip, index }: { job: Job; flip: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
    >
      {/* SLIDER */}
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
        <Comparison before={job.before} after={job.after} label={job.label} />
      </div>

      {/* COPY */}
      <div className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B8D9] border-2 border-slate-900 text-[10px] tracking-[0.25em] uppercase text-white font-bold mb-5 shadow-[3px_3px_0_0_#0F172A]">
          0{index + 1} · {job.suburb}
        </div>

        <h3 className="font-display text-3xl lg:text-4xl leading-[0.95] tracking-tightest text-slate-900">
          {job.label}
        </h3>

        <p className="mt-4 text-slate-600 text-base leading-relaxed font-medium border-l-4 border-yellow-400 pl-4">
          {job.caption}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────── drag slider ─────────── */

function Comparison({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(p => Math.max(0, p - step)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos(p => Math.min(100, p + step)); }
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0_0_#0F172A]"
      style={{ touchAction: 'pan-y' }}
    >
      <Image
        src={after}
        alt={`${label} after cleaning`}
        fill
        sizes="(max-width: 1024px) 100vw, 800px"
        className="pointer-events-none object-cover"
        draggable={false}
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={`${label} before cleaning`}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="pointer-events-none object-cover"
          draggable={false}
        />
      </div>

      <span
        className="pointer-events-none absolute left-4 top-4 rounded-full border-2 border-slate-900 bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity duration-200"
        style={{ opacity: pos > 16 ? 1 : 0 }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-4 top-4 rounded-full border-2 border-slate-900 bg-yellow-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 transition-opacity duration-200"
        style={{ opacity: pos < 84 ? 1 : 0 }}
      >
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 bg-yellow-400"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      />

      <button
        type="button"
        role="slider"
        aria-label={`Compare before and after: ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-slate-900 bg-yellow-400 shadow-[0_4px_14px_rgba(0,0,0,0.35)] outline-none focus-visible:ring-4 focus-visible:ring-[#00B8D9]"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
      </button>

      <div
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-slate-900 bg-white/95 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 transition-opacity duration-500"
        style={{ opacity: touched ? 0 : 1 }}
      >
        ← Drag to compare →
      </div>
    </div>
  );
}