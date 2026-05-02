'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import BeforeAfterSlider from './BeforeAfterSlider';
import WaterParticles from './WaterParticles';
import { WaterSplash } from './WaterSplash';
import { SITE } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Bright water mesh background */}
      <div className="absolute inset-0 water-mesh" />

      {/* Splash blobs — bigger, brighter, more of them */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-cyan-300/50 splash animate-wave-slow" />
      <div className="absolute top-1/4 -right-40 w-[800px] h-[800px] rounded-full bg-sky-300/45 splash animate-wave" />
      <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] rounded-full bg-cyan-200/40 splash animate-wave-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-100/25 splash" />

      {/* Rising bubbles — extra dense in the hero */}
      <WaterParticles count={45} />

      {/* Massive watermark display word */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.05]">
        <div className="font-display text-[28vw] leading-none tracking-tightest text-cream-50">
          TRIDENT
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-300/15 border border-cyan-300/40 text-xs tracking-[0.2em] text-cyan-200 uppercase mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
            </span>
            Booking now — Melbourne metro
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[12vw] sm:text-[10vw] lg:text-[7.5vw] leading-[0.9] tracking-tightest text-cream-50"
          >
            Filth, meet
            <br />
            <span className="italic gradient-text">your match.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg lg:text-xl text-cream-100/85 max-w-xl leading-relaxed"
          >
            Premium pressure & soft washing across Melbourne. Driveways that look
            poured yesterday. Roofs that look re-tiled. Done in a day, guaranteed
            spotless.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-300 text-ink-900 font-medium rounded-full overflow-hidden hover:scale-[1.02] transition-transform shadow-[0_0_40px_-8px_rgba(103,232,249,0.7)]"
            >
              <span className="relative z-10">Get a free quote</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-cream-50/30 text-cream-50 font-medium rounded-full hover:border-cyan-300 hover:text-cyan-300 transition-colors backdrop-blur-sm"
            >
              Call {SITE.phone}
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-[0.18em] text-cream-100/70"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-cyan-300" /> Fully insured
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-cyan-300" /> 5.0 on Google
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-300" /> Same-week starts
            </span>
          </motion.div>
        </div>

        {/* Right — before/after with floating badges */}
        <div className="lg:col-span-5 relative">
          {/* A floating droplet behind the image */}
          <WaterSplash
            variant="droplet"
            color="#67E8F9"
            className="absolute -top-12 -right-8 w-24 h-32 opacity-50 animate-float-slow rotate-12"
          />
          <WaterSplash
            variant="droplet"
            color="#A5F3FC"
            className="absolute -bottom-10 -left-8 w-20 h-28 opacity-40 animate-float -rotate-12"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glow-border bg-ink-700">
              <BeforeAfterSlider
                beforeSrc="https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=1200&q=80"
                afterSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
                alt="Driveway before and after pressure washing"
              />
            </div>

            {/* Floating sticker — rating */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -top-6 -left-6 lg:-left-12 bg-cream-50 text-ink-900 px-5 py-3 rounded-2xl shadow-2xl animate-float"
              style={{ animationDelay: '0s' }}
            >
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>
              <div className="font-display text-lg leading-none">100+ five-star jobs</div>
            </motion.div>

            {/* Floating sticker — drag hint */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="absolute -bottom-6 -right-2 lg:-right-8 bg-cyan-300 text-ink-900 px-4 py-3 rounded-2xl shadow-2xl animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">
                Drag me
              </div>
              <div className="font-display text-base leading-none">See the difference</div>
            </motion.div>

            {/* Floating sticker — quick quote */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute top-1/3 -right-4 lg:-right-10 bg-ink-700/90 backdrop-blur border border-cyan-300/40 text-cream-50 px-4 py-3 rounded-2xl shadow-2xl animate-float"
              style={{ animationDelay: '4s' }}
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300">
                Avg quote
              </div>
              <div className="font-display text-2xl leading-none">2 min</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
