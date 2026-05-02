'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const TRANSFORMATIONS = [
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    suburb: 'Brighton',
    service: 'Driveway + sealcoating',
    date: 'This week',
  },
  {
    img: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=800&q=80',
    suburb: 'Hawthorn',
    service: 'Roof soft wash',
    date: 'Last week',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    suburb: 'Glen Waverley',
    service: 'House exterior',
    date: 'Last week',
  },
  {
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
    suburb: 'Bentleigh',
    service: 'Full property',
    date: '2 weeks ago',
  },
  {
    img: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&q=80',
    suburb: 'Doncaster',
    service: 'Patio + concrete',
    date: '2 weeks ago',
  },
  {
    img: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
    suburb: 'St Kilda',
    service: 'Render soft wash',
    date: '3 weeks ago',
  },
  {
    img: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&q=80',
    suburb: 'Box Hill',
    service: 'Solar panel array',
    date: '3 weeks ago',
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
    <section className="relative py-24 lg:py-32 bg-ink-900 border-t border-cyan-300/20 overflow-hidden">
      <div className="absolute inset-0 water-mesh-soft opacity-50" />
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-300/12 splash" />
      <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-sky-400/12 splash" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
              ◆ Recent work
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-cream-50">
              This month
              <br />
              <span className="italic gradient-text">across Melbourne.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-cream-50/20 text-cream-50 hover:bg-cyan-400 hover:text-ink-900 hover:border-cyan-300 transition-colors flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-cream-50/20 text-cream-50 hover:bg-cyan-400 hover:text-ink-900 hover:border-cyan-300 transition-colors flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroller — bleeds off the right edge intentionally */}
      <div className="overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex gap-5 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth pl-6 lg:pl-10 pr-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {TRANSFORMATIONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative shrink-0 w-[280px] lg:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={item.img}
                alt={`${item.service} in ${item.suburb}`}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />

              <div className="absolute top-4 left-4 bg-cream-50/95 backdrop-blur text-ink-900 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-medium">
                {item.date}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <div className="flex items-center gap-1.5 text-cyan-300 text-xs tracking-[0.2em] uppercase mb-2">
                  <MapPin className="w-3 h-3" />
                  {item.suburb}
                </div>
                <div className="font-display text-2xl lg:text-3xl text-cream-50 leading-tight">
                  {item.service}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="shrink-0 w-6 lg:w-10" aria-hidden />
        </div>
      </div>
    </section>
  );
}
