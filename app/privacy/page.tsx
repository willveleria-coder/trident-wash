'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import HazardTape from '@/components/HazardTape';
import { SITE } from '@/lib/data';

const SECTIONS = [
  {
    title: 'What information we collect',
    body: `When you contact us through our website, call us, or request a quote, we may collect your name, phone number, email address, and property address. We only collect what we need to provide you with a quote or complete your job.`,
  },
  {
    title: 'How we use your information',
    body: `We use your information solely to respond to your enquiry, provide a quote, schedule and complete your job, and follow up to make sure you're happy with the result. We do not use your information for any other purpose.`,
  },
  {
    title: 'Who we share it with',
    body: `We do not sell, rent, or share your personal information with third parties for marketing purposes. Your details may be shared with subcontractors only where necessary to complete your job, and only under strict confidentiality.`,
  },
  {
    title: 'How we store your information',
    body: `Your information is stored securely and is only accessible to Trident staff who need it to do their job. We retain records for as long as is reasonably necessary for business and legal purposes, after which they are securely deleted.`,
  },
  {
    title: 'Cookies and website analytics',
    body: `Our website may use basic analytics tools to understand how visitors use the site (such as which pages are most popular). This data is aggregated and anonymous — it is not linked to any individual. We do not use advertising cookies or tracking pixels.`,
  },
  {
    title: 'Your rights',
    body: `You have the right to request access to the personal information we hold about you, ask us to correct it, or ask us to delete it. To make any of these requests, simply get in touch using the contact details below.`,
  },
  {
    title: 'Contact us about privacy',
    body: `If you have any questions about this privacy policy or how we handle your information, please contact us at ${SITE.email ?? 'hello@tridentwashing.com.au'} or call ${SITE.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <Nav />

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px] pointer-events-none" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
          <div className="font-display text-[16vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            PRIVACY
          </div>
        </div>

        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A]"
          >
            <Shield className="w-3 h-3" />
            Privacy policy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-8xl leading-[0.85] tracking-tightest text-slate-900"
          >
            Your data,
            <br />
            <span className="italic relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
              >
                handled right.
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
            className="bg-[#00B8D9] border-2 border-slate-900 rounded-3xl p-6 lg:p-8 shadow-[6px_6px_0_0_#FFD60A] mb-12 -rotate-1"
          >
            <p className="text-white text-base lg:text-lg leading-relaxed font-medium">
              Trident Pressure Washing is committed to protecting your privacy. We collect only what we need, use it only to do your job, and never sell it to anyone. Simple as that.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="bg-white border-2 border-slate-900 rounded-2xl p-6 lg:p-7 shadow-[4px_4px_0_0_#0F172A]"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center font-display text-sm text-slate-900">
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