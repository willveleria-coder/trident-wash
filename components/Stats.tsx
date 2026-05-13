'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Star, Shield, Sparkles, MapPin } from 'lucide-react';
import HazardTape from './HazardTape';

const STATS = [
  {
    value: 100,
    suffix: '+',
    label: 'Five-star reviews',
    tag: 'Google verified',
    icon: Star,
    variant: 'yellow-stamp',
  },
  {
    value: 850,
    suffix: '+',
    label: 'Properties cleaned',
    tag: 'Across Melbourne',
    icon: MapPin,
    variant: 'hazard-striped',
  },
  {
    value: 4.8,
    decimals: 1,
    suffix: '★',
    label: 'Average rating',
    tag: 'Every platform',
    icon: Sparkles,
    variant: 'neon-outline',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Satisfaction promise',
    tag: 'Or we come back',
    icon: Shield,
    variant: 'black-on-white',
  },
] as const;

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Soft Miami glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-yellow-300/15 blur-[80px]" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
            >
              <Sparkles className="w-3 h-3" />
              The receipts
            </motion.div>
            <h2 className="font-display text-5xl lg:text-8xl leading-[0.88] tracking-tightest text-slate-900">
              Built on
              <br />
              <span className="italic relative inline-block">
                <span
                  className="relative bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)',
                  }}
                >
                  repeat
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 5"
                    stroke="#FFD60A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              business.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="relative">
              {/* Stamp-style copy */}
              <div className="absolute -top-3 -left-3 -rotate-6 bg-slate-900 text-yellow-400 px-3 py-1 text-[9px] tracking-[0.3em] uppercase font-bold shadow-md">
                Verified
              </div>
              <p className="text-slate-600 text-lg leading-relaxed pt-6 border-l-4 border-yellow-400 pl-5">
                Sunny started Trident in 2022. Most of our work today comes from referrals — the only metric that proves you're doing it right.
              </p>
            </div>
          </div>
        </div>

        {/* STAT CARDS — four variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>

        {/* Bottom ticker bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <MiniBadge label="Police checked" />
          <MiniBadge label="Plant safe" />
          <MiniBadge label="Insured to $20m" />
          <MiniBadge label="ABN registered" />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   STAT CARD — four visual variants
   ────────────────────────────────────────────────────────── */
function StatCard({
  value,
  suffix = '',
  decimals = 0,
  label,
  tag,
  icon: Icon,
  variant,
  delay,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  tag: string;
  icon: any;
  variant: 'yellow-stamp' | 'hazard-striped' | 'neon-outline' | 'black-on-white';
  delay: number;
}) {
  const variants = {
    'yellow-stamp': {
      wrapper:
        'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
      number: 'text-slate-900',
      tag: 'bg-slate-900 text-yellow-400',
      label: 'text-slate-900/80',
      icon: 'bg-slate-900 text-yellow-400',
      rotation: '-rotate-1',
    },
    'hazard-striped': {
      wrapper:
        'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#00B8D9] overflow-hidden',
      number: 'text-slate-900',
      tag: 'bg-yellow-400 text-slate-900 border border-slate-900',
      label: 'text-slate-700',
      icon: 'bg-[#00B8D9] text-white',
      rotation: 'rotate-1',
    },
    'neon-outline': {
      wrapper:
        'bg-white border-2 border-[#00B8D9] shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
      number: 'text-[#00B8D9]',
      tag: 'bg-[#00B8D9] text-white',
      label: 'text-slate-700',
      icon: 'bg-yellow-400 text-slate-900',
      rotation: '-rotate-1',
    },
    'black-on-white': {
      wrapper:
        'bg-slate-900 border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
      number: 'text-white',
      tag: 'bg-yellow-400 text-slate-900',
      label: 'text-white/70',
      icon: 'bg-yellow-400 text-slate-900',
      rotation: 'rotate-1',
    },
  };

  const v = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className={`relative ${v.rotation} transition-all`}
    >
      <div
        className={`relative rounded-3xl p-6 lg:p-8 min-h-[260px] flex flex-col justify-between transition-all duration-200 ${v.wrapper}`}
      >
        {/* Hazard stripes for that variant */}
        {variant === 'hazard-striped' && (
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-3 opacity-90"
            style={{
              background: `repeating-linear-gradient(-45deg, #FFD60A 0, #FFD60A 12px, #0F172A 12px, #0F172A 24px)`,
            }}
          />
        )}

        {/* Top: tag pill + icon */}
        <div className="flex items-start justify-between mb-3">
          <span
            className={`text-[9px] tracking-[0.3em] uppercase font-bold px-2.5 py-1 rounded-full ${v.tag}`}
          >
            {tag}
          </span>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${v.icon}`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Big number */}
        <div
          className={`font-display text-6xl lg:text-7xl leading-none tracking-tightest tabular ${v.number}`}
        >
          <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
        </div>

        {/* Label */}
        <div
          className={`mt-3 text-sm lg:text-base font-medium ${v.label}`}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

/* Animated counter */
function AnimatedNumber({
  value,
  decimals = 0,
  suffix = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / 1600);
              const eased = 1 - Math.pow(1 - t, 4);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Mini trust badges along the bottom */
function MiniBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-white border-2 border-slate-900 rounded-full px-4 py-2.5 shadow-[3px_3px_0_0_#0F172A]">
      <span className="w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-slate-900 shrink-0" />
      <span className="text-xs lg:text-sm font-medium text-slate-900 uppercase tracking-wider truncate">
        {label}
      </span>
    </div>
  );
}