'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HazardTape from '@/components/HazardTape';
import { SITE } from '@/lib/data';

const SECTIONS = [
  {
    title: 'Quotes and pricing',
    body: `All quotes provided by Trident Pressure Washing are based on the information and photos supplied at the time of enquiry. Final pricing may vary if the actual condition, size, or access requirements of the property differ materially from what was described. We'll always let you know before we start if anything has changed.`,
  },
  {
    title: 'Booking and scheduling',
    body: `Bookings are confirmed once you have received written or verbal confirmation from us. We reserve the right to reschedule jobs due to weather conditions that would affect the quality or safety of the work. We will notify you as early as possible if this occurs and rebook at the earliest available time.`,
  },
  {
    title: 'Access and preparation',
    body: `You agree to provide safe and unobstructed access to the areas to be cleaned on the day of the job. This includes moving vehicles, unlocking gates, and ensuring pets are secured. If access cannot be provided and the job cannot proceed, a call-out fee may apply.`,
  },
  {
    title: 'Water and power supply',
    body: `Unless otherwise agreed, we require access to an on-site water supply (standard garden tap) and, where applicable, a standard 240V power outlet. If no supply is available you must notify us in advance so we can bring alternative equipment. Additional charges may apply.`,
  },
  {
    title: 'Surface conditions and pre-existing damage',
    body: `We take care to inspect surfaces before beginning work. Trident Pressure Washing is not liable for damage to surfaces that were already in a deteriorated condition prior to cleaning (including cracked tiles, spalling concrete, loose render, or failing sealants). We will point out any such conditions before starting.`,
  },
  {
    title: 'Payment terms',
    body: `Payment is due on completion of the job unless otherwise agreed in writing. We accept bank transfer, card, and cash. Overdue accounts may attract a late payment fee. For large or multi-day jobs, a deposit may be required to secure your booking.`,
  },
  {
    title: 'Satisfaction guarantee',
    body: `We stand behind our work. If you are not satisfied with the result, contact us within 48 hours of job completion and we will return to rectify the issue at no additional charge. This guarantee applies to the work completed and does not cover damage or staining that was pre-existing or outside our scope of work.`,
  },
  {
    title: 'Liability',
    body: `Trident Pressure Washing carries public liability insurance. Our liability is limited to the value of the services provided. We are not liable for indirect or consequential losses. Nothing in these terms limits any rights you have under Australian Consumer Law.`,
  },
  {
    title: 'Changes to these terms',
    body: `We may update these terms from time to time. The current version will always be available on this page. Continued use of our services after any changes constitutes acceptance of the updated terms.`,
  },
  {
    title: 'Contact',
    body: `For any questions about these terms, please contact us at ${SITE.email ?? 'hello@tridentwashing.com.au'} or call ${SITE.phone}. We're happy to clarify anything.`,
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white">
      <Nav />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px] pointer-events-none" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[16vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            TERMS
          </div>
        </div>

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
          >
            <FileText className="w-3 h-3" />
            Terms of service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-8xl leading-[0.85] tracking-tightest text-slate-900"
          >
            Plain English,
            <br />
            <span className="italic relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
              >
                no fine print.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 text-slate-600 text-base max-w-lg mx-auto leading-relaxed"
          >
            Last updated: May 2025
          </motion.p>
        </div>
      </section>

      <HazardTape className="w-full h-2" />

      {/* CONTENT */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[760px] mx-auto px-6 lg:px-10">
          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-yellow-400 border-2 border-slate-900 rounded-3xl p-6 lg:p-8 shadow-[6px_6px_0_0_#0F172A] mb-12 rotate-1"
          >
            <p className="text-slate-900 text-base lg:text-lg leading-relaxed font-medium">
              These are the terms that apply when you book Trident Pressure Washing. We've written them in plain language because we think that's the decent thing to do. If anything isn't clear, just ask.
            </p>
          </motion.div>

          {/* Sections — alternating white and slight accent */}
          <div className="space-y-5">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className={`border-2 border-slate-900 rounded-2xl p-6 lg:p-7 ${
                  i % 3 === 1
                    ? 'bg-slate-50 shadow-[4px_4px_0_0_#00B8D9]'
                    : 'bg-white shadow-[4px_4px_0_0_#0F172A]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center font-display text-sm ${
                    i % 3 === 1 ? 'bg-[#00B8D9] text-white' : 'bg-yellow-400 text-slate-900'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <h2 className="font-display text-xl lg:text-2xl text-slate-900 mb-3">
                      {s.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {s.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}