'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-cream-50 text-ink-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <div className="text-xs tracking-[0.3em] uppercase text-teal-500 mb-4">
              ◆ The work
            </div>
            <h2 className="font-display text-5xl lg:text-8xl leading-[0.9] tracking-tightest">
              Eight ways
              <br />
              we make Melbourne
              <br />
              <span className="italic text-teal-500">look new again.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-ink-700/80 text-lg leading-relaxed">
              Every surface needs the right approach. Pressure for hard, soft for
              delicate, chemical for biological. We don't pick one method —
              we pick the right one.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/10 border border-ink-900/10">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative block bg-cream-50 hover:bg-ink-900 transition-colors duration-500 p-8 lg:p-10 h-full min-h-[320px]"
              >
                {/* Number + arrow */}
                <div className="flex items-start justify-between mb-12">
                  <span className="font-mono text-xs tracking-[0.2em] text-ink-900/40 group-hover:text-cyan-400 transition-colors">
                    {service.number} / 08
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-ink-900/30 group-hover:text-cyan-400 transition-all group-hover:rotate-45 duration-500" />
                </div>

                <div className="absolute bottom-8 lg:bottom-10 left-8 lg:left-10 right-8 lg:right-10">
                  <h3 className="font-display text-3xl lg:text-4xl leading-none tracking-tight text-ink-900 group-hover:text-cream-50 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-900/60 group-hover:text-cyan-400/80 transition-colors">
                    {service.short}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-12 flex justify-end">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-ink-900 hover:text-teal-500"
          >
            <span className="border-b border-ink-900/20 group-hover:border-teal-500 pb-1">
              All services & pricing
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
