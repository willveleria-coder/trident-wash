'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets } from 'lucide-react';
import Link from 'next/link';
import WaterParticles from './WaterParticles';
import SectionRipple from './SectionRipple';
import { FILTH_LEVELS, SURFACE_TYPES } from '@/lib/data';

export default function FilthOMeter() {
  const [surface, setSurface] = useState(SURFACE_TYPES[0]);
  const [filth, setFilth] = useState(2);
  const [size, setSize] = useState(1.0);

  const sizeOptions = [
    { label: 'Small', value: 0.7 },
    { label: 'Average', value: 1.0 },
    { label: 'Large', value: 1.4 },
    { label: 'Massive', value: 1.85 },
  ];

  const range = useMemo(() => {
    const filthMultiplier = FILTH_LEVELS[filth - 1].multiplier;
    const base = surface.base * filthMultiplier * size;
    const lo = Math.round((base * 0.92) / 10) * 10;
    const hi = Math.round((base * 1.18) / 10) * 10;
    return { lo, hi };
  }, [surface, filth, size]);

  const filthData = FILTH_LEVELS[filth - 1];

  return (
    <section className="relative py-24 lg:py-32 bg-ink-900 overflow-hidden">
      {/* Bright water mesh + splash blobs */}
      <div className="absolute inset-0 water-mesh-soft" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-400/25 splash animate-wave-slow" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-sky-400/20 splash animate-wave" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-300/8 splash" />

      {/* Rising bubbles */}
      <WaterParticles density="medium" />

      <SectionRipple originX={30} originY={50} color="rgba(34, 211, 238, 0.4)" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — pitch */}
          <div className="lg:col-span-5">
            <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
              ◆ Live estimate
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-cream-50 mb-6">
              The
              <br />
              <span className="italic gradient-text">Filth-O-Meter.</span>
            </h2>
            <p className="text-cream-100/80 text-lg leading-relaxed mb-8 max-w-md">
              Pick your surface. Slide it dirty. See your range. No forms, no
              waiting, no salespeople. Lock the actual price with a 2-minute call.
            </p>

            <div className="space-y-3 text-sm text-cream-100/70">
              <FeatureCheck>Real ranges based on real jobs</FeatureCheck>
              <FeatureCheck>Plant protection included</FeatureCheck>
              <FeatureCheck>Photo report on completion</FeatureCheck>
              <FeatureCheck>Re-clean if not satisfied</FeatureCheck>
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 text-cyan-300 hover:text-cream-50 transition-colors group"
            >
              <span className="border-b border-cyan-300/40 pb-1">Book this exact quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — the calculator */}
          <div className="lg:col-span-7">
            <div className="relative bg-gradient-to-br from-ink-700/90 to-ink-800/90 backdrop-blur-sm rounded-3xl border border-cyan-300/30 overflow-hidden shadow-[0_0_80px_-20px_rgba(34,211,238,0.5)]">
              {/* Inner glow accent */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-cyan-300/15 splash" />

              {/* Top — price display */}
              <div className="relative p-8 lg:p-10 border-b border-cyan-300/15">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300">
                    Estimated range
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cream-100/70">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                    </span>
                    Live
                  </div>
                </div>
                <motion.div
                  key={`${range.lo}-${range.hi}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-6xl lg:text-7xl leading-none tracking-tightest text-cream-50 tabular"
                >
                  ${range.lo}
                  <span className="gradient-text mx-2">–</span>${range.hi}
                </motion.div>
                <div className="mt-4 text-sm text-cream-100/70">
                  All-in fixed price · plants protected · photos included
                </div>
              </div>

              {/* Body — controls */}
              <div className="relative p-8 lg:p-10 space-y-8">
                {/* Surface */}
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-cream-100/60 mb-3">
                    Surface
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SURFACE_TYPES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSurface(s)}
                        className={`px-4 py-2.5 rounded-full text-sm transition-all ${
                          surface.id === s.id
                            ? 'bg-cyan-300 text-ink-900 shadow-[0_0_20px_-2px_rgba(103,232,249,0.6)]'
                            : 'bg-ink-900/60 text-cream-100/80 hover:bg-ink-900 hover:text-cream-50 border border-cyan-300/15'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-cream-100/60 mb-3">
                    Size
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSize(opt.value)}
                        className={`py-2.5 rounded-full text-sm transition-all ${
                          size === opt.value
                            ? 'bg-cyan-300 text-ink-900 shadow-[0_0_20px_-2px_rgba(103,232,249,0.6)]'
                            : 'bg-ink-900/60 text-cream-100/80 hover:bg-ink-900 hover:text-cream-50 border border-cyan-300/15'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filth slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs tracking-[0.2em] uppercase text-cream-100/60">
                      How dirty
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Droplets
                          key={i}
                          className={`w-3.5 h-3.5 transition-colors ${
                            i < filth ? 'text-cyan-300 fill-cyan-300/40' : 'text-cream-100/25'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={filth}
                    onChange={(e) => setFilth(parseInt(e.target.value))}
                    className="w-full filth-slider"
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <div className="font-display text-xl text-cyan-300">
                        {filthData.label}
                      </div>
                      <div className="text-xs text-cream-100/60 mt-0.5">
                        {filthData.desc}
                      </div>
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-cream-100/50 tabular">
                      Level {filth} / 5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filth-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: linear-gradient(
            to right,
            #67e8f9 0%,
            #67e8f9 ${(filth - 1) * 25}%,
            rgba(255, 255, 255, 0.12) ${(filth - 1) * 25}%,
            rgba(255, 255, 255, 0.12) 100%
          );
          border-radius: 4px;
          outline: none;
        }
        .filth-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #fbf7ee;
          border: 3px solid #67e8f9;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(103, 232, 249, 0.8), 0 0 60px rgba(103, 232, 249, 0.4);
          transition: transform 0.15s;
        }
        .filth-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .filth-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #fbf7ee;
          border: 3px solid #67e8f9;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(103, 232, 249, 0.8);
        }
      `}</style>
    </section>
  );
}

function FeatureCheck({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
      {children}
    </div>
  );
}
