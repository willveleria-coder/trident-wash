'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import HazardTape from './HazardTape';
import { FAQS } from '@/lib/data';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px]" />

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[20vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          FAQ
        </div>
      </div>

      <div className="absolute top-32 right-4 lg:right-12 rotate-6 hidden md:block pointer-events-none">
        <div className="bg-yellow-400 text-slate-900 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#00B8D9]">
          No jargon ★
        </div>
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#00B8D9]"
          >
            <Sparkles className="w-3 h-3" />
            Common questions
          </motion.div>

          <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
            Sensible answers
            <br />
            <span className="italic relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
              >
                to sensible questions.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="mb-0">
          <HazardTape className="w-full h-2" />
        </div>

        <div className="border-b-2 border-slate-900">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="border-t-2 border-slate-900">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-6 lg:py-7 flex items-center justify-between gap-6 text-left group"
              >
                <span
                  className={`font-display text-xl lg:text-2xl leading-tight pr-4 transition-colors duration-200 ${
                    open === i ? 'text-[#00B8D9]' : 'text-slate-900 group-hover:text-[#00B8D9]'
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`shrink-0 w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center transition-all duration-300 ${
                    open === i ? 'bg-yellow-400 rotate-45' : 'bg-white group-hover:bg-yellow-400'
                  }`}
                >
                  <Plus className="w-4 h-4 text-slate-900" strokeWidth={3} />
                </div>
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
                    <div className="pb-8 pr-14 text-slate-600 leading-relaxed text-base lg:text-lg border-l-4 border-[#00B8D9] pl-5 mb-2">
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