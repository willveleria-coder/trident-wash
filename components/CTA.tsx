'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Sparkles, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import HazardTape from './HazardTape';
import { SITE } from '@/lib/data';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-40 bg-white text-slate-900 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/10 blur-[80px]" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="font-display text-[20vw] lg:text-[18vw] leading-none tracking-tightest text-slate-900/[0.04]">
          BOOK
        </div>
      </div>

      {/* Hazard tape top only — footer provides the bottom */}
      <div className="absolute top-0 inset-x-0">
        <HazardTape className="w-full h-2" />
      </div>

      {/* Decorative stamps */}
      <div className="absolute top-16 left-4 lg:left-12 -rotate-12 hidden md:block pointer-events-none">
        <div className="bg-yellow-400 text-slate-900 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#00B8D9]">
          Same-day quote
        </div>
      </div>
      <div className="absolute top-16 right-4 lg:right-12 rotate-12 hidden md:block pointer-events-none">
        <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#FFD60A]">
          No deposit
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-8 shadow-[4px_4px_0_0_#00B8D9]">
            <Sparkles className="w-3 h-3" />
            Your turn
          </div>

          {/* Heading */}
          <h2 className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest text-slate-900 mb-10">
            Get a quote
            <br />
            <span className="italic relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)',
                }}
              >
                in 2 minutes.
              </span>
              <svg
                className="absolute -bottom-3 left-0 w-full"
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

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-slate-600 max-w-xl mx-auto mb-12 leading-relaxed">
            Send a few photos. Tell us what's bothering you. We'll quote it the
            same day — and most of the time, we can be on site within the week.
          </p>

          {/* Star row */}
          <div className="flex items-center justify-center gap-1.5 mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-slate-500 text-xs tracking-[0.2em] uppercase font-bold ml-2">
              100+ five-star jobs
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-1.5 hover:translate-y-1.5 transition-all text-lg"
            >
              <Zap className="w-5 h-5" strokeWidth={2.5} />
              <span>Get my free quote</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-slate-900 font-bold rounded-2xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors text-lg"
            >
              <Phone className="w-5 h-5" strokeWidth={2.5} />
              {SITE.phone}
            </a>
          </div>

          {/* Small reassurance */}
          <p className="mt-8 text-slate-400 text-xs tracking-wider">
            Avg quote returned in 2 hours · No pressure · No deposit required
          </p>
        </motion.div>
      </div>
    </section>
  );
}