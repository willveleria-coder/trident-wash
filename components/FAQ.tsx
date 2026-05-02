'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS } from '@/lib/data';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32 bg-cream-50 text-ink-900">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-teal-500 mb-4">
            ◆ Common questions
          </div>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest">
            Sensible answers
            <br />
            <span className="italic text-teal-500">to sensible questions.</span>
          </h2>
        </div>

        <div className="border-t border-ink-900/10">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="border-b border-ink-900/10"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-6 lg:py-8 flex items-center justify-between gap-6 text-left group"
              >
                <span className="font-display text-xl lg:text-2xl text-ink-900 leading-tight pr-4 group-hover:text-teal-500 transition-colors">
                  {faq.q}
                </span>
                <Plus
                  className={`w-5 h-5 shrink-0 text-teal-500 transition-transform duration-500 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pr-12 text-ink-700/80 leading-relaxed text-base lg:text-lg">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
