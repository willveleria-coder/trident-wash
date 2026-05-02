'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { WaterSplash } from './WaterSplash';
import { SITE } from '@/lib/data';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-40 bg-gradient-to-br from-cyan-300 via-cyan-200 to-sky-300 text-ink-900 overflow-hidden">
      {/* Floating water splashes */}
      <WaterSplash
        variant="splash"
        color="rgba(255,255,255,0.4)"
        className="absolute top-10 left-10 w-32 h-32 animate-float"
      />
      <WaterSplash
        variant="droplet"
        color="rgba(255,255,255,0.3)"
        className="absolute bottom-20 right-20 w-24 h-32 animate-float-slow rotate-12"
      />
      <WaterSplash
        variant="splash"
        color="rgba(4,34,43,0.08)"
        className="absolute bottom-10 left-1/4 w-40 h-40 animate-float-slow"
      />
      <WaterSplash
        variant="droplet"
        color="rgba(255,255,255,0.35)"
        className="absolute top-1/3 right-10 w-20 h-28 animate-float -rotate-12"
      />

      {/* Decorative giant text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="font-display text-[20vw] lg:text-[18vw] leading-none tracking-tightest text-ink-900/[0.07]">
          BOOK
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs tracking-[0.3em] uppercase mb-6 opacity-70">
            ◆ Your turn
          </div>
          <h2 className="font-display text-6xl lg:text-9xl leading-[0.85] tracking-tightest mb-10">
            Get a quote
            <br />
            <span className="italic">in 2 minutes.</span>
          </h2>
          <p className="text-lg lg:text-xl text-ink-900/75 max-w-xl mx-auto mb-12 leading-relaxed">
            Send a few photos. Tell us what's bothering you. We'll quote it the
            same day — and most of the time, we can be on site within the week.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-ink-900 text-cream-50 font-medium rounded-full hover:scale-[1.02] transition-transform shadow-2xl"
            >
              <span>Get my quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-ink-900 text-ink-900 font-medium rounded-full hover:bg-ink-900 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
