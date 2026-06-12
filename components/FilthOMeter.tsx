'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Droplets,
  Zap,
  Sparkles,
  CheckCircle2,
  Star,
  X,
  Send,
  Phone,
  User,
  MapPin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import HazardTape from './HazardTape';
import { FILTH_LEVELS, SURFACE_TYPES } from '@/lib/data';

function QuoteModal({
  onClose,
  quoteDetails,
}: {
  onClose: () => void;
  quoteDetails: {
    surface: string;
    size: string;
    filthLabel: string;
    filthLevel: number;
    lo: number;
    hi: number;
  };
}) {
  const [form, setForm] = useState({ name: '', phone: '', suburb: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setErrorMsg('Please enter your name and phone number.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          suburb: form.suburb || '—',
          type: 'filth',
          message: `Quote request via Filth-O-Meter:\n• Surface: ${quoteDetails.surface}\n• Size: ${quoteDetails.size}\n• Filth level: ${quoteDetails.filthLevel}/5 (${quoteDetails.filthLabel})\n• Estimated range: $${quoteDetails.lo}–$${quoteDetails.hi}`,
          quoteDetails,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Please call us directly.');
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border-2 border-slate-900 bg-slate-900 overflow-hidden shadow-2xl"
      >
        <HazardTape className="w-full h-2" />

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-yellow-400 font-bold mb-1">
                ◆ Filth-O-Meter Quote
              </div>
              <div className="font-black text-white text-xl leading-none">Lock in your price</div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-bold mb-1">Your estimate</div>
              <div className="font-black text-white text-2xl leading-none">
                ${quoteDetails.lo}
                <span className="text-yellow-400 mx-1.5">–</span>
                ${quoteDetails.hi}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] tracking-widest uppercase text-white/40 font-bold mb-1">For</div>
              <div className="text-white text-sm font-bold">{quoteDetails.surface}</div>
              <div className="text-white/50 text-xs">{quoteDetails.size} · Level {quoteDetails.filthLevel}/5</div>
            </div>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 flex flex-col items-center text-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
              </div>
              <div className="font-black text-white text-2xl">Request sent! 🎉</div>
              <p className="text-white/60 text-sm max-w-xs">
                We&apos;ll confirm your quote within a few hours. Talk soon!
              </p>
              <button onClick={onClose} className="mt-2 text-yellow-400 text-xs font-bold tracking-widest uppercase underline underline-offset-4">
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold block mb-2">
                  Your name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold block mb-2">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="tel"
                      placeholder="0400 000 000"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold block mb-2">
                    Suburb
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      placeholder="Brighton"
                      value={form.suburb}
                      onChange={(e) => update('suburb', e.target.value)}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-white/20 font-medium"
                    />
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="group w-full flex items-center justify-between gap-3 px-6 py-4 bg-yellow-400 text-slate-900 font-black rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                  {status === 'loading' ? 'Sending…' : 'Send my quote request'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[11px] text-white/30 text-center font-medium tracking-wide">
                We&apos;ll confirm within a few hours during business days.
              </p>
            </>
          )}
        </div>

        <HazardTape className="w-full h-2" />
      </motion.div>
    </motion.div>
  );
}

export default function FilthOMeter() {
  const [surface, setSurface] = useState(SURFACE_TYPES[0]);
  const [filth, setFilth] = useState(2);
  const [size, setSize] = useState(1.0);
  const [showModal, setShowModal] = useState(false);

  const sizeOptions = [
    { label: 'Small', value: 0.7, m2: '~30 m²' },
    { label: 'Average', value: 1.0, m2: '~60 m²' },
    { label: 'Large', value: 1.4, m2: '~100 m²' },
    { label: 'Massive', value: 1.85, m2: '~150 m²' },
  ];

  const range = useMemo(() => {
    const filthMultiplier = FILTH_LEVELS[filth - 1].multiplier;
    const base = surface.base * filthMultiplier * size;
    const lo = Math.round((base * 0.92) / 10) * 10;
    const hi = Math.round((base * 1.18) / 10) * 10;
    return { lo, hi };
  }, [surface, filth, size]);

  const filthData = FILTH_LEVELS[filth - 1];
  const filthPct = ((filth - 1) / 4) * 100;
  const selectedSize = sizeOptions.find((o) => o.value === size) ?? sizeOptions[1];

  const quoteDetails = {
    surface: surface.label,
    size: selectedSize.label + ' ' + selectedSize.m2,
    filthLabel: filthData.label,
    filthLevel: filth,
    lo: range.lo,
    hi: range.hi,
  };

  return (
    <>
      <section
        id="free-quote"
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #67E8F9 0%, #22D3EE 50%, #06B6D4 100%)',
        }}
      >
        <div className="absolute top-10 -left-20 w-[500px] h-[500px] rounded-full bg-yellow-300/40 blur-[80px]" />
        <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] rounded-full bg-yellow-400/30 blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-white/30 blur-[80px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.08]">
          <div className="font-display text-[22vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">$$$</div>
        </div>

        {/* Decorative stamps — positioned so they don't overlap the calculator */}
        <div className="absolute top-32 left-4 lg:left-12 -rotate-12 hidden md:block pointer-events-none">
          <div className="bg-yellow-400 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#0F172A]">
            ★ Live · Real prices
          </div>
        </div>
        {/* Moved bottom-right stamp further out so it doesn't clip behind the calculator */}
        <div className="absolute bottom-8 right-4 lg:right-8 rotate-6 hidden md:block pointer-events-none">
          <div className="bg-slate-900 text-yellow-400 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#FFD60A]">
            No deposit · Quick quote
          </div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-12 lg:mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#0F172A] -rotate-2"
            >
              <Zap className="w-3 h-3" />
              Free quote · Calculator
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display leading-[0.85] tracking-tightest text-slate-900"
            >
              <div className="text-[15vw] lg:text-[10vw] -ml-2">The</div>
              <div className="text-[13vw] lg:text-[8.5vw] italic relative inline-block -mt-2 lg:-mt-4 ml-2 lg:ml-8">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #FFD60A 0%, #FFFFFF 50%, #FFD60A 100%)' }}
                >
                  Filth-O-Meter.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-lg lg:text-2xl text-slate-900/90 max-w-xl font-medium leading-snug"
            >
              Pick. Slide. Get your price. <span className="font-bold">No forms, no waiting.</span>
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* LEFT — feature chips */}
            <div className="lg:col-span-4 space-y-4 lg:pt-8">
              <FeatureChip icon={CheckCircle2} variant="white" rotation="-rotate-2">
                Real ranges based on real jobs
              </FeatureChip>
              <FeatureChip icon={Sparkles} variant="yellow" rotation="rotate-1">
                Plant protection included
              </FeatureChip>
              <FeatureChip icon={Star} variant="black" rotation="-rotate-1">
                Photo report on completion
              </FeatureChip>
              <FeatureChip icon={CheckCircle2} variant="white" rotation="rotate-2">
                Re-clean if not satisfied
              </FeatureChip>

              {/* Review card — updated to Will, Brighton */}
              <div className="hidden lg:block pt-4">
                <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[5px_5px_0_0_#FFD60A] -rotate-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-600">Recent quote</span>
                  </div>
                  <p className="text-sm text-slate-800 italic leading-snug">
                    &ldquo;Quoted $480 on the phone, paid $480 on the day. Exactly what they said.&rdquo;
                  </p>
                  <div className="text-[9px] tracking-[0.2em] uppercase font-bold text-slate-500 mt-2">— Will, Brighton</div>
                </div>
              </div>
            </div>

            {/* RIGHT — calculator */}
            <div className="lg:col-span-8 relative">
              <div className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 w-32 h-32 lg:w-44 lg:h-44 bg-yellow-400 rounded-full border-4 border-slate-900 shadow-2xl z-0" aria-hidden />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-3xl border-2 border-slate-900 shadow-[10px_10px_0_0_#0F172A] overflow-hidden">
                  <HazardTape className="w-full h-2" />

                  <div className="p-4 lg:p-6 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-yellow-400 font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                        </span>
                        Estimated range · Live
                      </div>
                      <div className="text-[9px] tracking-[0.2em] uppercase text-white/60 font-bold">{surface.label}</div>
                    </div>

                    <motion.div
                      key={`${range.lo}-${range.hi}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-4xl lg:text-6xl leading-none tracking-tightest tabular text-white"
                    >
                      ${range.lo}
                      <span className="text-yellow-400 mx-2">–</span>
                      <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #67E8F9 0%, #FFD60A 100%)' }}>
                        ${range.hi}
                      </span>
                    </motion.div>
                    <div className="mt-3 text-sm text-white/70 font-medium">
                      All-in fixed price · plants protected · photos included
                    </div>
                  </div>

                  <HazardTape className="w-full h-1.5" />

                  <div className="p-4 lg:p-6 space-y-4">
                    {/* SURFACE */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[9px] tracking-[0.25em] uppercase font-bold text-slate-700">◆ Surface</div>
                        <div className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-bold">Step 1</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {SURFACE_TYPES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSurface(s)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 border-slate-900 transition-all ${
                              surface.id === s.id
                                ? 'bg-[#00B8D9] text-white shadow-[2px_2px_0_0_#FFD60A]'
                                : 'bg-white text-slate-900 shadow-[2px_2px_0_0_#0F172A] hover:bg-yellow-100'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SIZE */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[9px] tracking-[0.25em] uppercase font-bold text-slate-700">◆ Size</div>
                        <div className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-bold">Step 2</div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
                        {sizeOptions.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => setSize(opt.value)}
                            className={`px-2 py-2 rounded-xl text-xs font-bold border-2 border-slate-900 transition-all flex flex-col items-center gap-0.5 ${
                              size === opt.value
                                ? 'bg-[#00B8D9] text-white shadow-[2px_2px_0_0_#FFD60A]'
                                : 'bg-white text-slate-900 shadow-[2px_2px_0_0_#0F172A] hover:bg-yellow-100'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span className={`text-[9px] tracking-wider font-medium ${size === opt.value ? 'text-white/80' : 'text-slate-500'}`}>
                              {opt.m2}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* FILTH SLIDER */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[9px] tracking-[0.25em] uppercase font-bold text-slate-700">◆ How dirty?</div>
                        <div className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-bold">Step 3 · Slide me</div>
                      </div>

                      <div className="relative mb-3">
                        <div
                          className="h-10 rounded-xl border-2 border-slate-900 overflow-hidden relative"
                          style={{
                            background: `linear-gradient(90deg, #67E8F9 0%, #67E8F9 ${filthPct * 0.25}%, #A8A29E ${filthPct * 0.55}%, #57534E ${filthPct * 0.8}%, #292524 ${filthPct}%, #F1F5F9 ${filthPct}%, #F1F5F9 100%)`,
                            transition: 'background 0.3s ease',
                          }}
                        >
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ left: `${filthPct}%`, width: `${100 - filthPct}%` }}
                          >
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute rounded-full bg-white/60"
                                style={{
                                  left: `${15 + i * 14}%`,
                                  top: `${20 + (i % 3) * 25}%`,
                                  width: `${3 + (i % 3) * 2}px`,
                                  height: `${3 + (i % 3) * 2}px`,
                                }}
                              />
                            ))}
                          </div>
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-yellow-400 border-x-2 border-slate-900"
                            style={{ left: `calc(${filthPct}% - 2px)` }}
                          />
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          step={1}
                          value={filth}
                          onChange={(e) => setFilth(parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-10 opacity-0 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() => setFilth(n)}
                            className={`w-7 h-7 rounded-full border-2 border-slate-900 font-bold text-xs transition-all ${
                              filth >= n ? 'bg-yellow-400 text-slate-900 shadow-[2px_2px_0_0_#0F172A]' : 'bg-white text-slate-400'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>

                      <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-between border-2 border-slate-900">
                        <div>
                          <div className="text-[9px] tracking-[0.2em] uppercase text-yellow-400 font-bold mb-0.5">Level {filth} of 5</div>
                          <div className="font-display text-xl text-white leading-none">{filthData.label}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Droplets key={i} className={`w-4 h-4 ${i < filth ? 'text-yellow-400 fill-yellow-400/40' : 'text-white/20'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1.5 italic">{filthData.desc}</div>
                    </div>

                    <button
                      onClick={() => setShowModal(true)}
                      className="group w-full flex items-center justify-between gap-3 px-5 py-4 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-1 hover:translate-y-1 transition-all text-base"
                    >
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4" strokeWidth={2.5} />
                        GET MY QUOTE — ${range.lo}–${range.hi}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <HazardTape className="w-full h-2" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes bubble-up {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(-8px); opacity: 1; }
          }
        `}</style>
      </section>

      <AnimatePresence>
        {showModal && (
          <QuoteModal
            quoteDetails={quoteDetails}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function FeatureChip({
  children, icon: Icon, variant, rotation,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  variant: 'white' | 'yellow' | 'black';
  rotation: string;
}) {
  const styles = {
    white: 'bg-white text-slate-900 shadow-[4px_4px_0_0_#0F172A]',
    yellow: 'bg-yellow-400 text-slate-900 shadow-[4px_4px_0_0_#0F172A]',
    black: 'bg-slate-900 text-yellow-400 shadow-[4px_4px_0_0_#FFD60A]',
  }[variant];

  const iconStyles = {
    white: 'text-[#00B8D9]',
    yellow: 'text-slate-900',
    black: 'text-yellow-400',
  }[variant];

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-slate-900 font-bold ${styles} ${rotation}`}>
      <Icon className={`w-5 h-5 shrink-0 ${iconStyles}`} strokeWidth={2.5} />
      <span className="text-sm lg:text-base">{children}</span>
    </div>
  );
}