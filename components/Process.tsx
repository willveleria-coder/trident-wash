'use client';

import { motion } from 'framer-motion';
import SectionRipple from './SectionRipple';
import { PROCESS } from '@/lib/data';

export default function Process() {
  return (
    <section className="relative py-24 lg:py-32 bg-ink-900 overflow-hidden">
      <div className="absolute inset-0 water-mesh-soft opacity-60" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-300/12 splash" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-sky-400/12 splash" />

      <SectionRipple originX={50} originY={70} color="rgba(103, 232, 249, 0.3)" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <div className="text-xs tracking-[0.3em] uppercase text-cyan-300 mb-4">
              ◆ How it goes
            </div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tightest text-cream-50">
              No surprises.
              <br />
              <span className="italic gradient-text">No drama.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-cream-100/70 text-lg leading-relaxed">
              Quote to clean in under a week, most of the time. Here's the whole
              flow.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-cyan-300/15 border border-cyan-300/25 rounded-3xl overflow-hidden">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ink-900/95 backdrop-blur-sm p-8 lg:p-10 group hover:bg-ink-700 transition-colors duration-500 relative min-h-[280px]"
            >
              <div className="font-mono text-xs tracking-[0.2em] text-cyan-300 mb-8">
                STEP {step.step}
              </div>

              <h3 className="font-display text-3xl lg:text-4xl leading-tight text-cream-50 mb-4 tracking-tight group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-cream-100/70 text-sm leading-relaxed">
                {step.body}
              </p>

              {/* Connector line on desktop */}
              {i < PROCESS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-px w-3 h-px bg-cyan-300/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
