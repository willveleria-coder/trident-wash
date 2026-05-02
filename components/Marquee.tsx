'use client';

import { Asterisk } from 'lucide-react';

const ITEMS = [
  'Free quotes',
  'Fully insured',
  'Same-week starts',
  '5.0 on Google',
  'Soft wash specialists',
  'Police checked',
  'Plant-safe',
  '100+ five-star reviews',
  'Melbourne-wide',
  'Re-clean guarantee',
];

export default function Marquee() {
  return (
    <section className="relative bg-gradient-to-r from-cyan-300 via-cyan-200 to-sky-300 text-ink-900 overflow-hidden border-y border-ink-900/20">
      <div className="flex animate-marquee whitespace-nowrap py-5">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center mx-8 lg:mx-12 shrink-0">
            <span className="font-display text-2xl lg:text-3xl tracking-tight">
              {item}
            </span>
            <Asterisk className="w-5 h-5 ml-8 lg:ml-12" />
          </div>
        ))}
      </div>
    </section>
  );
}
