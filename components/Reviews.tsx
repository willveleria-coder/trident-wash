'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import HazardTape from './HazardTape';
import { REVIEWS } from '@/lib/data';

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/10 blur-[80px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/10 blur-[80px]" />

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[20vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          REVIEWS
        </div>
      </div>

      <div className="absolute top-10 right-10 pointer-events-none opacity-[0.06]">
        <Quote className="w-64 h-64 text-yellow-400" strokeWidth={1} />
      </div>

      <div className="absolute top-32 right-4 lg:right-12 -rotate-12 hidden md:block pointer-events-none">
        <div className="bg-yellow-400 text-slate-900 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#00B8D9]">
          Verified ★
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
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
              The verdict
            </motion.div>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
              <span className="text-slate-900">What</span>
              <br />
              <span className="text-slate-900">Melbourne&apos;s</span>
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                >
                  saying.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="bg-yellow-400 border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_#00B8D9] -rotate-1">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                  ))}
                </div>
                <div className="font-display text-3xl lg:text-4xl leading-none tracking-tightest text-slate-900">5.0</div>
                <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-900/70 mt-2">Google rating</div>
              </div>
              <div className="bg-[#00B8D9] border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_#FFD60A] rotate-1">
                <div className="font-display text-3xl lg:text-4xl leading-none tracking-tightest text-white">30+</div>
                <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/80 mt-2">Verified reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 lg:mb-14">
          <HazardTape className="w-full h-2" />
        </div>

        {/* REVIEW SLIDESHOW */}
        <ReviewSlider />

        {/* BOTTOM CTA */}
        <div className="mt-16 lg:mt-24 relative">
          <div className="relative bg-white rounded-3xl border-2 border-slate-900 shadow-[10px_10px_0_0_#FFD60A] overflow-hidden">
            <div className="absolute top-0 inset-x-0"><HazardTape className="w-full h-1.5" /></div>
            <div className="absolute bottom-0 inset-x-0"><HazardTape className="w-full h-1.5" /></div>
            <div className="p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-500 ml-1">
                    5.0 · 30+ reviews
                  </span>
                </div>
                <div className="font-display text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
                  Join the list of happy customers.{' '}
                  <span className="italic text-[#00B8D9]">Book today.</span>
                </div>
              </div>
              <a
                href="/contact"
                className="group shrink-0 inline-flex items-center gap-3 px-6 py-4 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] hover:shadow-[0_0_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 transition-all text-base whitespace-nowrap"
              >
                Get a free quote
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── review slideshow ─────────── */

function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const set = () =>
      setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const pages = Math.max(1, Math.ceil(REVIEWS.length / perView));

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + pages) % pages),
    [pages]
  );

  // Auto-advance, pauses on hover so nobody loses their place mid-read
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % pages), 6000);
    return () => clearInterval(t);
  }, [pages, paused]);

  // Resizing can leave the index past the new page count
  useEffect(() => {
    if (index >= pages) setIndex(0);
  }, [pages, index]);

  const styles = [
    {
      wrapper: 'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9]',
      stars: 'fill-[#00B8D9] text-[#00B8D9]',
      body: 'text-slate-700',
      name: 'text-slate-900',
      meta: 'text-slate-500',
      service: 'text-[#00B8D9]',
      divider: 'border-slate-900/10',
      quote: 'text-yellow-400',
    },
    {
      wrapper: 'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A]',
      stars: 'fill-slate-900 text-slate-900',
      body: 'text-slate-900/80',
      name: 'text-slate-900',
      meta: 'text-slate-900/50',
      service: 'text-slate-900',
      divider: 'border-slate-900/20',
      quote: 'text-slate-900/20',
    },
    {
      wrapper: 'bg-[#00B8D9] border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A]',
      stars: 'fill-white text-white',
      body: 'text-white/90',
      name: 'text-white',
      meta: 'text-white/60',
      service: 'text-white',
      divider: 'border-white/20',
      quote: 'text-white/20',
    },
  ];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {Array.from({ length: pages }).map((_, page) => (
            <div key={page} className="w-full shrink-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-1 pb-3">
                {REVIEWS.slice(page * perView, page * perView + perView).map((r, j) => {
                  const s = styles[(page * perView + j) % 3];
                  return (
                    <div
                      key={r.name + j}
                      className={`relative rounded-3xl p-6 lg:p-7 h-full min-h-[260px] ${s.wrapper}`}
                    >
                      <div className={`absolute top-5 right-5 opacity-30 ${s.quote}`}>
                        <Quote className="w-8 h-8" strokeWidth={1.5} />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1">
                          {[...Array(r.rating)].map((_, k) => (
                            <Star key={k} className={`w-3.5 h-3.5 ${s.stars}`} />
                          ))}
                        </div>
                        <span className={`text-[10px] tracking-[0.2em] uppercase font-bold ${s.meta}`}>
                          {r.date}
                        </span>
                      </div>

                      <p className={`leading-relaxed text-[15px] mb-6 ${s.body}`}>{r.body}</p>

                      <div className={`flex items-end justify-between pt-4 border-t ${s.divider}`}>
                        <div>
                          <div className={`font-display text-xl leading-none ${s.name}`}>{r.name}</div>
                          <div className={`text-xs mt-1 ${s.meta}`}>{r.suburb}</div>
                        </div>
                        <div className={`text-[9px] tracking-[0.2em] uppercase font-bold text-right max-w-[45%] ${s.service}`}>
                          {r.service}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous reviews"
          className="w-12 h-12 rounded-full bg-white border-2 border-slate-900 text-slate-900 hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-[3px_3px_0_0_#0F172A] hover:shadow-[1px_1px_0_0_#0F172A] hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to review page ${i + 1}`}
              className={`h-2.5 rounded-full border-2 border-slate-900 transition-all ${
                i === index ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white hover:bg-slate-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next reviews"
          className="w-12 h-12 rounded-full border-2 border-slate-900 text-white transition-colors flex items-center justify-center shadow-[3px_3px_0_0_#0F172A] hover:shadow-[1px_1px_0_0_#0F172A] hover:translate-x-0.5 hover:translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)' }}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}