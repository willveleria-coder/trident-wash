'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FilthOMeter from '@/components/FilthOMeter';
import HazardTape from '@/components/HazardTape';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/data';
import { Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', suburb: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.message) {
      setErrorMsg('Please fill in your name, phone and message.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', phone: '', suburb: '', message: '' });
    } catch {
      setErrorMsg('Something went wrong. Please try calling us directly.');
      setStatus('error');
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full bg-[#00B8D9]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[100px] pointer-events-none" />

        <div className="absolute top-[15%] left-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.04] flex justify-center">
          <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
            CONTACT
          </div>
        </div>

        <div className="absolute top-36 right-4 lg:right-12 rotate-6 hidden md:block pointer-events-none">
          <div className="bg-[#00B8D9] text-white border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#FFD60A]">
            Free quote ★
          </div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-8 shadow-[4px_4px_0_0_#00B8D9]"
          >
            <Sparkles className="w-3 h-3" />
            Free quote
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display leading-[0.84] tracking-tightest text-slate-900 max-w-5xl"
          >
            <span className="block text-[13vw] lg:text-[8.5vw]">Talk to us.</span>
            <span className="block text-[11vw] lg:text-[7vw] italic relative mt-1">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 50%, #00B8D9 100%)' }}
              >
                We don&apos;t bite.
              </span>
              <svg className="absolute -bottom-2 left-0 w-[80%]" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 lg:mt-14 text-slate-600 text-lg lg:text-xl leading-relaxed font-medium max-w-xl border-l-4 border-[#00B8D9] pl-5"
          >
            Send a message or give us a call — we&apos;ll get back to you within a few hours and have a quote ready same day.
          </motion.p>
        </div>
      </section>

      <HazardTape className="w-full h-3" />

      {/* ── CONTACT DETAILS + FORM ───────────────────────────── */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute top-0 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/15 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-[#00B8D9]/10 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            {/* LEFT — contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 min-w-0"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#00B8D9]">
                <Phone className="w-3 h-3" />
                Reach us directly
              </div>

              <h2 className="font-display text-4xl lg:text-5xl leading-[0.9] tracking-tightest text-slate-900 mb-8">
                Or just reach out
                <br />
                <span className="italic relative inline-block">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}
                  >
                    directly.
                  </span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                    <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              <div className="space-y-3 mb-8 w-full">
                <ContactRow icon={<Phone className="w-4 h-4" />} label="Call or text" value={SITE.phone} href={`tel:${SITE.phoneRaw}`} />
                <ContactRow icon={<Mail className="w-4 h-4" />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
                <ContactRow icon={<MapPin className="w-4 h-4" />} label="Service area" value={SITE.location} />
                <ContactRow icon={<Clock className="w-4 h-4" />} label="Hours" value={SITE.hours} />
              </div>

              <a
                href={`tel:${SITE.phoneRaw}`}
                className="group flex items-center justify-between gap-3 w-full px-5 py-4 bg-slate-900 text-white font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#FFD60A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  Call {SITE.phone}
                </span>
                <ArrowRight className="w-4 h-4 text-yellow-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 lg:col-start-7 min-w-0"
            >
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -top-3 -right-3 w-full h-full bg-yellow-400 rounded-3xl border-2 border-slate-900 hidden lg:block"
                />
                <div className="relative bg-slate-900 rounded-3xl border-2 border-slate-900 overflow-hidden">
                  <HazardTape className="w-full h-2" />

                  <div className="p-6 lg:p-8 space-y-5">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-yellow-400 font-bold mb-2">
                      ◆ Quote request
                    </div>

                    {/* SUCCESS STATE */}
                    {status === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 flex flex-col items-center text-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
                        </div>
                        <div className="font-display text-3xl text-white leading-tight">
                          Request sent!
                        </div>
                        <p className="text-white/60 text-sm max-w-xs">
                          We&apos;ll be in touch within a few hours with your quote. Talk soon! 👊
                        </p>
                        <button
                          onClick={() => setStatus('idle')}
                          className="mt-2 text-yellow-400 text-xs font-bold tracking-widest uppercase underline underline-offset-4"
                        >
                          Send another
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        <div>
                          <label className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold block mb-2">
                            Your name *
                          </label>
                          <input
                            type="text"
                            placeholder="Jane Smith"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold block mb-2">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              placeholder="0400 000 000"
                              value={form.phone}
                              onChange={(e) => update('phone', e.target.value)}
                              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 font-medium"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold block mb-2">
                              Suburb
                            </label>
                            <input
                              type="text"
                              placeholder="Brighton"
                              value={form.suburb}
                              onChange={(e) => update('suburb', e.target.value)}
                              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold block mb-2">
                            What needs cleaning? *
                          </label>
                          <textarea
                            rows={5}
                            placeholder="Driveway, house, roof… give us the details"
                            value={form.message}
                            onChange={(e) => update('message', e.target.value)}
                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 resize-none font-medium"
                          />
                        </div>

                        {status === 'error' && (
                          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={status === 'loading'}
                          className="group w-full flex items-center justify-between gap-3 px-6 py-4 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" strokeWidth={2.5} />
                            {status === 'loading' ? 'Sending…' : 'Send my quote request'}
                          </span>
                          <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </button>

                        <p className="text-[11px] text-white/30 text-center font-medium tracking-wide">
                          We reply within a few hours during business days.
                        </p>
                      </>
                    )}
                  </div>

                  <HazardTape className="w-full h-2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <HazardTape className="w-full h-3" />
      <FilthOMeter />
      <Footer />
    </main>
  );
}

function ContactRow({
  icon, label, value, href,
}: {
  icon: React.ReactNode; label: string; value: string; href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 group px-4 py-4 rounded-2xl border-2 border-slate-900 bg-white shadow-[3px_3px_0_0_#FFD60A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all overflow-hidden w-full">
      <div className="w-9 h-9 rounded-full bg-[#00B8D9] border-2 border-slate-900 text-white flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-0.5">{label}</div>
        <div className="font-display text-base text-slate-900 leading-none truncate">{value}</div>
      </div>
      {href && <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </div>
  );
  return href
    ? <a href={href} className="block w-full overflow-hidden">{content}</a>
    : <div className="w-full overflow-hidden">{content}</div>;
}