'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SUBURBS } from '@/lib/data';

export default function SuburbMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-cream-50 text-ink-900 overflow-hidden">
      {/* Subtle cream-side splash accents */}
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-300/30 splash" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-sky-300/30 splash" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — copy */}
          <div className="lg:col-span-4">
            <div className="text-xs tracking-[0.3em] uppercase text-teal-700 mb-4">
              ◆ Coverage
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest mb-6">
              From the
              <br />
              CBD to the
              <br />
              <span className="italic text-teal-500">peninsula.</span>
            </h2>
            <p className="text-ink-700/80 text-lg leading-relaxed mb-8">
              We cover Melbourne metro and the Mornington Peninsula. If you're not
              sure if we're in your area — call us, we probably are.
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink-700/70 max-h-[260px] overflow-y-auto no-scrollbar pr-2">
              {SUBURBS.map((s) => (
                <div
                  key={s.name}
                  onMouseEnter={() => setHovered(s.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-default transition-colors ${
                    hovered === s.name ? 'text-teal-500 font-medium' : ''
                  }`}
                >
                  · {s.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right — map */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[4/5] lg:aspect-[5/4] rounded-3xl bg-gradient-to-br from-cyan-100/60 via-cream-50 to-sky-300/30 border border-teal-500/20 overflow-hidden shadow-[0_0_60px_-12px_rgba(43,181,192,0.3)]">
              {/* Decorative water shapes — replace grid with watercolour blobs */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <radialGradient id="bay" cx="35%" cy="80%" r="50%">
                    <stop offset="0%" stopColor="rgba(34, 211, 238, 0.5)" />
                    <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
                  </radialGradient>
                  <radialGradient id="port" cx="80%" cy="20%" r="40%">
                    <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
                    <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                  </radialGradient>
                </defs>

                {/* Bay water */}
                <ellipse cx="42" cy="78" rx="38" ry="22" fill="url(#bay)" />
                {/* Port wash */}
                <circle cx="80" cy="20" r="20" fill="url(#port)" />

                {/* Yarra river */}
                <path
                  d="M 5 50 Q 25 48, 40 52 T 70 50 Q 80 48, 95 45"
                  stroke="rgba(43, 181, 192, 0.5)"
                  strokeWidth="0.6"
                  fill="none"
                  strokeDasharray="1.5 1.5"
                />

                {/* CBD marker */}
                <circle cx="46" cy="48" r="0.8" fill="rgba(14, 82, 102, 0.7)" />
                <text
                  x="46"
                  y="46"
                  fontSize="2"
                  textAnchor="middle"
                  fill="rgba(14, 82, 102, 0.85)"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.2"
                >
                  CBD
                </text>
              </svg>

              {/* Pins */}
              {SUBURBS.map((suburb, i) => {
                const isHover = hovered === suburb.name;
                return (
                  <motion.div
                    key={suburb.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.025,
                      type: 'spring',
                    }}
                    onMouseEnter={() => setHovered(suburb.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${suburb.x}%`, top: `${suburb.y}%` }}
                  >
                    <div className="relative">
                      <span
                        className={`absolute inset-0 rounded-full bg-cyan-400 ${
                          isHover ? 'animate-ping' : ''
                        }`}
                        style={{ opacity: isHover ? 0.5 : 0 }}
                      />
                      <div
                        className={`relative w-3 h-3 rounded-full transition-all ${
                          isHover
                            ? 'bg-teal-500 scale-150 ring-4 ring-teal-500/30 shadow-[0_0_16px_rgba(43,181,192,0.8)]'
                            : 'bg-cyan-400 ring-2 ring-cream-50 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                        }`}
                      />
                    </div>
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap px-2 py-1 rounded text-[10px] font-medium tracking-wider uppercase transition-all ${
                        isHover
                          ? 'opacity-100 bg-ink-900 text-cream-50'
                          : 'opacity-0'
                      }`}
                    >
                      {suburb.name}
                    </div>
                  </motion.div>
                );
              })}

              {/* Counter pill */}
              <div className="absolute bottom-6 left-6 bg-ink-900 text-cream-50 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg">
                <MapPin className="w-4 h-4 text-cyan-300" />
                <div>
                  <div className="font-display text-2xl leading-none tabular">
                    {SUBURBS.length}+
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-cream-100/70">
                    Suburbs covered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
