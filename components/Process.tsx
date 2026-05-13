'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import HazardTape from './HazardTape';
import { PROCESS } from '@/lib/data';

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/10 blur-[80px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/10 blur-[80px]" />

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[20vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          PROCESS
        </div>
      </div>

      <div className="absolute top-32 right-4 lg:right-12 rotate-12 hidden md:block pointer-events-none">
        <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#FFD60A]">
          4 steps only
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#00B8D9]"
            >
              <Sparkles className="w-3 h-3" />
              How it goes
            </motion.div>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
              No surprises.
              <br />
              <span className="italic relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                >
                  No drama.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-medium border-l-4 border-[#00B8D9] pl-5">
              Quote to clean in under a week, most of the time. Here's the whole flow.
            </p>
          </div>
        </div>

        <div className="mb-10 lg:mb-14">
          <HazardTape className="w-full h-2" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PROCESS.map((step, i) => {
            const styles = [
              {
                wrapper: 'bg-white border-2 border-slate-900 shadow-[6px_6px_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#00B8D9]',
                number: 'bg-[#00B8D9] text-white border-slate-900',
                title: 'text-slate-900',
                body: 'text-slate-600',
                rotation: '-rotate-1',
              },
              {
                wrapper: 'bg-yellow-400 border-2 border-slate-900 shadow-[6px_6px_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#0F172A]',
                number: 'bg-slate-900 text-yellow-400 border-slate-900',
                title: 'text-slate-900',
                body: 'text-slate-900/70',
                rotation: 'rotate-1',
              },
              {
                wrapper: 'bg-[#00B8D9] border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
                number: 'bg-yellow-400 text-slate-900 border-slate-900',
                title: 'text-slate-900',
                body: 'text-slate-900/75',
                rotation: '-rotate-1',
              },
              {
                wrapper: 'bg-slate-900 border-2 border-slate-900 shadow-[6px_6px_0_0_#FFD60A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#FFD60A]',
                number: 'bg-yellow-400 text-slate-900 border-slate-900',
                title: 'text-yellow-400',
                body: 'text-white/80',
                rotation: 'rotate-1',
              },
            ];
            const s = styles[i % 4];

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${s.rotation} transition-transform`}
              >
                <div className={`relative rounded-3xl p-6 lg:p-8 min-h-[280px] flex flex-col transition-all duration-200 ${s.wrapper}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-display text-base font-bold ${s.number}`}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {i < PROCESS.length - 1 && (
                      <div className="hidden lg:flex items-center justify-end absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                        <div className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center ${s.number}`}>
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-current opacity-50 mb-2">
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className={`font-display text-2xl lg:text-3xl leading-tight tracking-tight mb-3 ${s.title}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mt-auto ${s.body}`}>
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}