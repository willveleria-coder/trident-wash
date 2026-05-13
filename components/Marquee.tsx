'use client';

import {
  Star,
  Shield,
  Zap,
  Sparkles,
  Droplets,
  CheckCircle2,
  MapPin,
  Award,
} from 'lucide-react';
import HazardTape from './HazardTape';

type Item = {
  text: string;
  variant: 'plain' | 'black-chip' | 'cyan-badge' | 'white-stamp';
  icon?: any;
};

const ROW_1: Item[] = [
  { text: 'Free quotes', variant: 'plain', icon: Zap },
  { text: 'Fully insured', variant: 'black-chip', icon: Shield },
  { text: 'Same-week starts', variant: 'plain', icon: Sparkles },
  { text: '4.8 on Google', variant: 'cyan-badge', icon: Star },
  { text: 'Soft wash specialists', variant: 'plain', icon: Droplets },
  { text: 'Police checked', variant: 'white-stamp', icon: CheckCircle2 },
  { text: 'Plant-safe methods', variant: 'plain', icon: Sparkles },
  { text: '50+ five-star reviews', variant: 'black-chip', icon: Star },
  { text: 'Melbourne-wide', variant: 'plain', icon: MapPin },
  { text: 'Re-clean guarantee', variant: 'cyan-badge', icon: Award },
];

const ROW_2: Item[] = [
  { text: 'No deposit required', variant: 'cyan-badge', icon: CheckCircle2 },
  { text: 'Owner-operated', variant: 'plain', icon: Award },
  { text: 'Fixed-price quotes', variant: 'black-chip', icon: Zap },
  { text: 'Photos before & after', variant: 'plain', icon: Sparkles },
  { text: '$20M public liability', variant: 'white-stamp', icon: Shield },
  { text: 'Pure-water poles', variant: 'plain', icon: Droplets },
  { text: 'ABN registered', variant: 'cyan-badge', icon: CheckCircle2 },
  { text: 'Roof & gutter combo', variant: 'plain', icon: Star },
  { text: 'Sealcoating available', variant: 'black-chip', icon: Sparkles },
  { text: 'Solar panel safe', variant: 'plain', icon: Droplets },
];

export default function Marquee() {
  return (
    <section className="relative bg-yellow-400 overflow-hidden hidden lg:block">
      {/* Top hazard stripe border */}
      <HazardTape className="w-full h-2.5" />

      {/* ROW 1 — scrolling LEFT (negative direction) */}
      <div className="relative border-y-2 border-slate-900 bg-yellow-400 py-5 overflow-hidden">
        <div className="flex animate-marquee-fast lg:animate-marquee whitespace-nowrap">
          {[...ROW_1, ...ROW_1, ...ROW_1].map((item, i) => (
            <MarqueeItem key={`r1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* ROW 2 — scrolling RIGHT (reverse) */}
      <div
        className="relative bg-slate-900 py-5 overflow-hidden border-b-2 border-slate-900"
        style={{ direction: 'rtl' }}
      >
        <div className="flex animate-marquee-fast lg:animate-marquee whitespace-nowrap" style={{ direction: 'ltr' }}>
          {[...ROW_2, ...ROW_2, ...ROW_2].map((item, i) => (
            <MarqueeItem key={`r2-${i}`} item={item} dark />
          ))}
        </div>
      </div>

      {/* Bottom hazard stripe */}
      <HazardTape className="w-full h-2.5" />
    </section>
  );
}

function MarqueeItem({ item, dark = false }: { item: Item; dark?: boolean }) {
  const Icon = item.icon;

  return (
    <div className="flex items-center gap-5 lg:gap-7 px-5 lg:px-7 shrink-0">
      {item.variant === 'plain' && (
        <span
          className={`font-display text-2xl lg:text-4xl tracking-tight flex items-center gap-3 ${
            dark ? 'text-yellow-400' : 'text-slate-900'
          }`}
        >
          {Icon && <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${dark ? 'text-yellow-400' : 'text-slate-900'}`} strokeWidth={2.5} />}
          {item.text}
        </span>
      )}

      {item.variant === 'black-chip' && (
        <span className="inline-flex items-center gap-2 bg-slate-900 text-yellow-400 px-4 py-2 rounded-full text-base lg:text-xl font-bold tracking-tight border-2 border-yellow-400">
          {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />}
          {item.text}
        </span>
      )}

      {item.variant === 'cyan-badge' && (
        <span
          className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-base lg:text-xl font-bold tracking-tight border-2 border-slate-900"
          style={{
            background: 'linear-gradient(135deg, #00B8D9 0%, #0EA5E9 100%)',
          }}
        >
          {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-300" strokeWidth={2.5} />}
          {item.text}
        </span>
      )}

      {item.variant === 'white-stamp' && (
        <span className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full text-base lg:text-xl font-bold tracking-tight border-2 border-slate-900">
          {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#00B8D9]" strokeWidth={2.5} />}
          {item.text}
        </span>
      )}

      {/* Divider star */}
      <Star
        className={`w-4 h-4 lg:w-5 lg:h-5 ${
          dark ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-900 text-slate-900'
        }`}
      />
    </div>
  );
}