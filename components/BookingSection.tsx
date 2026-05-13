'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Star,
  Zap,
  ArrowRight,
  User,
  Mail,
  MessageSquare,
  Shield,
} from 'lucide-react';
import HazardTape from './HazardTape';
import { SITE, SERVICES } from '@/lib/data';

const TIME_SLOTS = [
  '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
];

// Simulate some slots being unavailable
const UNAVAILABLE = ['12:00 PM', '1:00 PM'];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

export default function BookingSection() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const calDays = getCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };
  const isSunday = (day: number) => new Date(viewYear, viewMonth, day).getDay() === 0;
  const isSelected = (day: number) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === viewMonth &&
    selectedDate?.getFullYear() === viewYear;
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  const selectDay = (day: number) => {
    if (isPast(day) || isSunday(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedTime(null);
  };

  const canProceedStep1 = selectedDate && selectedTime && selectedService;
  const canProceedStep2 = form.name && form.email && form.phone && form.address;

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(3);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white text-slate-900 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00B8D9]/15 blur-[80px]" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-300/20 blur-[80px]" />

      {/* Watermark */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.04]">
        <div className="font-display text-[18vw] leading-none tracking-tightest text-slate-900 whitespace-nowrap">
          BOOK
        </div>
      </div>

      {/* Decorative stamps */}
      <div className="absolute top-32 right-4 lg:right-12 rotate-6 hidden md:block pointer-events-none">
        <div className="bg-yellow-400 text-slate-900 border-2 border-slate-900 px-4 py-2 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-[4px_4px_0_0_#00B8D9]">
          7 days a week ★
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 border-2 border-slate-900 text-[10px] tracking-[0.3em] uppercase text-slate-900 font-bold mb-6 shadow-[4px_4px_0_0_#00B8D9]"
            >
              <Calendar className="w-3 h-3" />
              Book a job
            </motion.div>

            <h2 className="font-display text-5xl lg:text-7xl leading-[0.86] tracking-tightest text-slate-900">
              Pick a day.
              <br />
              <span className="italic relative inline-block">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #00B8D9 0%, #0EA5E9 100%)' }}>
                  We'll be there.
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q 100 2, 200 6 T 398 5" stroke="#FFD60A" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="space-y-3 w-full">
              {[
                { icon: Clock, text: 'Available 7am – 7pm, 7 days a week' },
                { icon: Zap, text: 'Same-day quotes · most jobs booked within the week' },
                { icon: Shield, text: 'Fully insured · owner-operated · no deposit' },
                { icon: Star, text: '4.8 rating across 100+ Google reviews' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#0F172A]">
                    <Icon className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <HazardTape className="w-full h-2 mb-10 lg:mb-14" />

        {/* STEP INDICATORS */}
        <div className="flex items-center gap-3 mb-10">
          {[
            { n: 1, label: 'Date & Service' },
            { n: 2, label: 'Your Details' },
            { n: 3, label: 'Confirmed' },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-slate-900 font-bold text-xs tracking-wide transition-all ${
                step === n ? 'bg-yellow-400 text-slate-900 shadow-[3px_3px_0_0_#0F172A]'
                : step > n ? 'bg-[#00B8D9] text-white shadow-[3px_3px_0_0_#0F172A]'
                : 'bg-white text-slate-400'
              }`}>
                {step > n ? <Check className="w-3 h-3" /> : <span>{n}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < 2 && <div className={`h-0.5 w-8 ${step > n ? 'bg-[#00B8D9]' : 'bg-slate-200'} transition-colors`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Calendar + Time + Service ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">

                {/* CALENDAR */}
                <div className="lg:col-span-5">
                  <div className="bg-white border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0_0_#00B8D9] overflow-hidden">
                    {/* Month nav */}
                    <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-900 bg-slate-900">
                      <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-slate-900 text-white flex items-center justify-center transition-all border border-white/20">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="font-display text-xl text-white tracking-tight">
                        {MONTHS[viewMonth]} {viewYear}
                      </div>
                      <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-slate-900 text-white flex items-center justify-center transition-all border border-white/20">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 border-b-2 border-slate-900">
                      {DAYS.map(d => (
                        <div key={d} className={`py-2 text-center text-[10px] tracking-[0.15em] uppercase font-bold ${d === 'Sun' ? 'text-slate-300' : 'text-slate-500'}`}>
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 p-3 gap-1">
                      {calDays.map((day, i) => {
                        if (!day) return <div key={`empty-${i}`} />;
                        const past = isPast(day);
                        const sun = isSunday(day);
                        const sel = isSelected(day);
                        const tod = isToday(day);
                        const disabled = past || sun;
                        return (
                          <button
                            key={day}
                            onClick={() => selectDay(day)}
                            disabled={disabled}
                            className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border-2 ${
                              sel
                                ? 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[2px_2px_0_0_#0F172A]'
                                : tod && !disabled
                                ? 'bg-[#00B8D9]/10 border-[#00B8D9] text-[#00B8D9]'
                                : disabled
                                ? 'border-transparent text-slate-200 cursor-not-allowed'
                                : 'border-transparent text-slate-700 hover:bg-yellow-50 hover:border-yellow-400'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div className="px-5 pb-4 flex items-center gap-4 text-[10px] text-slate-400 font-bold tracking-wide border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-400 border border-slate-900 inline-block" /> Selected</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block" /> Unavailable</span>
                    </div>
                  </div>

                  {/* Service picker */}
                  <div className="mt-5 bg-white border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0_0_#FFD60A] p-5">
                    <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      Service needed
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES.map(s => (
                        <button
                          key={s.slug}
                          onClick={() => setSelectedService(s.slug)}
                          className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                            selectedService === s.slug
                              ? 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[2px_2px_0_0_#0F172A]'
                              : 'border-slate-200 text-slate-600 hover:border-yellow-400 hover:bg-yellow-50'
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TIME SLOTS */}
                <div className="lg:col-span-4">
                  <div className="bg-white border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0_0_#FFD60A] overflow-hidden h-full">
                    <div className="px-6 py-4 border-b-2 border-slate-900 bg-yellow-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-900" />
                        <span className="font-display text-xl text-slate-900 tracking-tight">
                          {selectedDate
                            ? selectedDate.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' })
                            : 'Select a date first'}
                        </span>
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900/60 mt-1">
                        Available 7am – 7pm · Mon to Sat
                      </div>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const unavail = UNAVAILABLE.includes(slot);
                        const sel = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            disabled={!selectedDate || unavail}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-3 px-3 rounded-xl border-2 text-sm font-bold transition-all ${
                              sel
                                ? 'bg-[#00B8D9] border-slate-900 text-white shadow-[2px_2px_0_0_#0F172A]'
                                : unavail
                                ? 'border-slate-100 text-slate-200 line-through cursor-not-allowed bg-slate-50'
                                : !selectedDate
                                ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                                : 'border-slate-200 text-slate-700 hover:border-[#00B8D9] hover:bg-[#00B8D9]/10'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* SUMMARY CARD */}
                <div className="lg:col-span-3">
                  <div className="bg-slate-900 border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0_0_#FFD60A] p-6 sticky top-6">
                    <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-yellow-400 mb-5">
                      ◆ Your booking
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-900" />
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-bold">Date</div>
                          <div className="text-white font-bold text-sm mt-0.5">
                            {selectedDate
                              ? selectedDate.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
                              : <span className="text-white/30 italic">Not selected</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#00B8D9] flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-bold">Time</div>
                          <div className="text-white font-bold text-sm mt-0.5">
                            {selectedTime ?? <span className="text-white/30 italic">Not selected</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-bold">Service</div>
                          <div className="text-white font-bold text-sm mt-0.5">
                            {selectedService
                              ? SERVICES.find(s => s.slug === selectedService)?.title
                              : <span className="text-white/30 italic">Not selected</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Shield className="w-3.5 h-3.5 text-[#00B8D9]" />
                        No deposit required
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Star className="w-3.5 h-3.5 text-yellow-400" />
                        100% satisfaction guarantee
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Phone className="w-3.5 h-3.5 text-[#00B8D9]" />
                        We'll call to confirm within 2hrs
                      </div>
                    </div>

                    <button
                      onClick={() => canProceedStep1 && setStep(2)}
                      disabled={!canProceedStep1}
                      className={`mt-6 w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                        canProceedStep1
                          ? 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[3px_3px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-0.5 hover:translate-y-0.5'
                          : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      Next: Your details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Contact Details ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-7">
                  <div className="bg-white border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0_0_#00B8D9] p-6 lg:p-8">
                    <div className="font-display text-2xl text-slate-900 mb-6 tracking-tight">Your details</div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: 'name', label: 'Full name', icon: User, placeholder: 'Sunny Smith', type: 'text' },
                        { key: 'phone', label: 'Phone number', icon: Phone, placeholder: '0400 000 000', type: 'tel' },
                        { key: 'email', label: 'Email address', icon: Mail, placeholder: 'you@email.com', type: 'email', full: true },
                        { key: 'address', label: 'Property address', icon: MapPin, placeholder: '123 Main St, Melbourne VIC', type: 'text', full: true },
                      ].map(({ key, label, icon: Icon, placeholder, type, full }) => (
                        <div key={key} className={full ? 'sm:col-span-2' : ''}>
                          <label className="block text-[10px] tracking-[0.25em] uppercase font-bold text-slate-500 mb-2">{label}</label>
                          <div className="relative">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                              <Icon className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                              type={type}
                              placeholder={placeholder}
                              value={form[key as keyof typeof form]}
                              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-[#00B8D9] focus:outline-none transition-colors bg-white"
                            />
                          </div>
                        </div>
                      ))}

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] tracking-[0.25em] uppercase font-bold text-slate-500 mb-2">Additional notes (optional)</label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <textarea
                            placeholder="e.g. large driveway, two-storey roof, access via side gate..."
                            value={form.notes}
                            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-[#00B8D9] focus:outline-none transition-colors resize-none bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary + submit */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900 border-2 border-slate-900 rounded-3xl shadow-[6px_6px_0_0_#FFD60A] p-6">
                    <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-yellow-400 mb-4">◆ Booking summary</div>

                    <div className="bg-white/5 rounded-2xl p-4 space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Date</span>
                        <span className="text-white font-bold">
                          {selectedDate?.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Time</span>
                        <span className="text-white font-bold">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Service</span>
                        <span className="text-white font-bold">{SERVICES.find(s => s.slug === selectedService)?.title}</span>
                      </div>
                      <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
                        <span className="text-white/50">Deposit</span>
                        <span className="text-[#00B8D9] font-bold">$0 — none required</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-6">
                      {[
                        'Quote confirmed same day',
                        'We call to confirm within 2 hours',
                        '100% satisfaction guarantee',
                        'Fully insured, owner-operated',
                      ].map(t => (
                        <div key={t} className="flex items-center gap-2 text-xs text-white/60">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-slate-900" />
                          </div>
                          {t}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleSubmit}
                        disabled={!canProceedStep2}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${
                          canProceedStep2
                            ? 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[3px_3px_0_0_#00B8D9] hover:shadow-[0_0_0_0_#00B8D9] hover:translate-x-0.5 hover:translate-y-0.5'
                            : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                        }`}
                      >
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4" />Confirm booking request</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setStep(1)}
                        className="text-white/40 hover:text-white text-xs font-bold tracking-wide transition-colors text-center"
                      >
                        ← Back to date & time
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Shield className="w-3.5 h-3.5" />
                    Your info is never shared or sold. Ever.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Confirmed ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_#00B8D9]">
                <Check className="w-10 h-10 text-slate-900" strokeWidth={3} />
              </div>

              <div className="font-display text-4xl lg:text-6xl text-slate-900 tracking-tightest mb-4">
                You're booked in.
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                We've received your request for{' '}
                <strong>{selectedDate?.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>{' '}
                at <strong>{selectedTime}</strong>. Sunny will call you within 2 hours to confirm and answer any questions.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Phone, label: 'We\'ll call you', sub: 'Within 2 hours', color: 'bg-[#00B8D9]', textColor: 'text-white' },
                  { icon: Star, label: 'Quote confirmed', sub: 'Same day, always', color: 'bg-yellow-400', textColor: 'text-slate-900' },
                  { icon: Shield, label: 'No deposit', sub: 'Pay after the job', color: 'bg-slate-900', textColor: 'text-white' },
                ].map(({ icon: Icon, label, sub, color, textColor }) => (
                  <div key={label} className={`${color} border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_#0F172A]`}>
                    <Icon className={`w-6 h-6 mb-2 mx-auto ${textColor}`} />
                    <div className={`font-bold text-sm ${textColor}`}>{label}</div>
                    <div className={`text-xs mt-1 ${textColor} opacity-70`}>{sub}</div>
                  </div>
                ))}
              </div>

              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-slate-900 font-bold rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] hover:shadow-[0_0_0_0_#0F172A] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call us: {SITE.phone}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}