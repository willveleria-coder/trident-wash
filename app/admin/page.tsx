'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, Clock, MessageSquare, CheckCircle, Lock,
  RefreshCw, Inbox, ChevronLeft, User, DollarSign, Droplets,
  LayoutDashboard, LayoutGrid, Calendar, Receipt, Search,
  Plus, X, FileText, CheckCircle2, Trash2, Edit3, CalendarDays,
} from 'lucide-react';

const PASSCODE = '4994';

const SUPABASE_URL = 'https://gitlqcrquqizuujaalcd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpdGxxY3JxdXFpenV1amFhbGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzY3MDIsImV4cCI6MjA5NDIxMjcwMn0.nKa-YBI3hg4bFFvqjeGG1DOFvSSQ7EzNh5AT-VY049Q';

const sb = {
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  },

  async getMeta(ids: string[]) {
    if (!ids.length) return {};
    const q = ids.map((id) => `id.eq.${id}`).join(',');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiry_meta?or=(${q})`, { headers: sb.headers });
    const rows: { id: string; status: string; notes: string; job_value: number | null; scheduled_date: string | null }[] = await res.json();
    return Object.fromEntries(rows.map((r) => [r.id, r]));
  },

  async upsertMeta(id: string, patch: { status?: string; notes?: string; job_value?: number; scheduled_date?: string }) {
    await fetch(`${SUPABASE_URL}/rest/v1/enquiry_meta`, {
      method: 'POST',
      headers: { ...sb.headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ id, ...patch }),
    });
  },

  async getInvoices() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/invoices?order=created_at.desc`, { headers: sb.headers });
    return res.json();
  },

  async upsertInvoice(inv: object) {
    await fetch(`${SUPABASE_URL}/rest/v1/invoices`, {
      method: 'POST',
      headers: { ...sb.headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(inv),
    });
  },

  async deleteInvoice(id: string) {
    await fetch(`${SUPABASE_URL}/rest/v1/invoices?id=eq.${id}`, {
      method: 'DELETE',
      headers: sb.headers,
    });
  },
};

// ─── LOCAL STORAGE HELPERS ────────────────────────────────────────────────────
const OVERRIDES_KEY = 'trident_crm_overrides';
const INVOICES_KEY  = 'trident_crm_invoices';

function loadOverrides(): Record<string, Partial<Enquiry>> {
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) ?? '{}'); } catch { return {}; }
}

function saveOverride(id: string, patch: Partial<Enquiry>) {
  const all = loadOverrides();
  all[id] = { ...all[id], ...patch };
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(all));
}

function loadInvoices(): Invoice[] | null {
  try {
    const raw = localStorage.getItem(INVOICES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveInvoices(invoices: Invoice[]) {
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
type QuoteDetails = {
  surface: string;
  size: string;
  filthLabel: string;
  filthLevel: number;
  lo: number;
  hi: number;
};

type Enquiry = {
  id: string;
  type: 'contact' | 'filth';
  name: string;
  phone: string;
  suburb: string;
  message: string;
  quoteDetails?: QuoteDetails | null;
  createdAt: string;
  read: boolean;
  status?: PipelineStatus;
  jobValue?: number;
  notes?: string;
  scheduledDate?: string;
};

type PipelineStatus = 'new' | 'called' | 'quoted' | 'booked';

type Invoice = {
  id: string;
  doctype: 'invoice' | 'quote';
  num: string;
  client: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
};

type NavSection = 'dashboard' | 'pipeline' | 'enquiries' | 'calendar' | 'invoices';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function HazardStripe({ className = '' }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        background:
          'repeating-linear-gradient(45deg, #FFD60A 0px, #FFD60A 18px, #0F172A 18px, #0F172A 36px)',
        flexShrink: 0,
      }}
    />
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

const AV_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
];

const PIPELINE_CONFIG: Record<PipelineStatus, { label: string; dot: string; badge: string }> = {
  new:    { label: 'New',    dot: 'bg-blue-500',    badge: 'bg-blue-100 text-blue-700' },
  called: { label: 'Called', dot: 'bg-amber-500',   badge: 'bg-amber-100 text-amber-700' },
  quoted: { label: 'Quoted', dot: 'bg-purple-500',  badge: 'bg-purple-100 text-purple-700' },
  booked: { label: 'Booked', dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
};

// ─── LOCK SCREEN ─────────────────────────────────────────────────────────────
function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [attempt, setAttempt] = useState(false);

  const tryUnlock = () => {
    if (input === PASSCODE) {
      onUnlock();
    } else {
      setShake(true); setAttempt(true); setInput('');
      setTimeout(() => { setShake(false); setAttempt(false); }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-yellow-300/30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#00B8D9]/20 blur-[80px] pointer-events-none" />
      <motion.div
        animate={shake ? { x: [-12, 12, -10, 10, -6, 6, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs relative z-10"
      >
        <div className="rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0_0_#FFD60A] overflow-hidden">
          <HazardStripe className="h-3" />
          <div className="bg-white px-6 pt-8 pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-slate-900 flex items-center justify-center shadow-[5px_5px_0_0_#00B8D9]">
                <Lock className="w-9 h-9 text-slate-900" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-center mb-8">
              <div className="text-[10px] tracking-[0.35em] uppercase text-[#00B8D9] font-bold mb-2">◆ Trident Pressure Washing</div>
              <div className="text-slate-900 font-black text-3xl tracking-tight leading-none">CRM</div>
            </div>
            <div className="mb-4">
              <label className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-bold block mb-2">Passcode</label>
              <input
                type="password"
                inputMode="numeric"
                placeholder="····"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
                className={`w-full rounded-xl px-4 py-4 text-slate-900 text-center text-3xl tracking-[0.6em] font-black focus:outline-none transition-colors placeholder:tracking-[0.2em] placeholder:text-slate-300 placeholder:text-2xl border-2 ${
                  attempt ? 'bg-red-50 border-red-400 text-red-600' : 'bg-slate-50 border-slate-200 focus:border-yellow-400'
                }`}
              />
              {attempt && <p className="text-red-500 text-xs text-center mt-2 font-bold tracking-wide">Wrong passcode. Try again.</p>}
            </div>
            <button
              onClick={tryUnlock}
              className="w-full bg-yellow-400 text-slate-900 font-black text-base py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all tracking-widest uppercase"
            >
              Unlock
            </button>
          </div>
          <HazardStripe className="h-3" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border-2 border-slate-900 bg-white overflow-hidden shadow-2xl"
          >
            <HazardStripe className="h-2" />
            <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b-2 border-slate-100">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">{title}</div>
              <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">{children}</div>
            <HazardStripe className="h-2" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-bold block mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full rounded-xl px-4 py-3 border-2 border-slate-200 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-none focus:border-yellow-400 transition-colors';
const selectCls = 'w-full rounded-xl px-4 py-3 border-2 border-slate-200 bg-slate-50 text-slate-900 font-medium text-sm focus:outline-none focus:border-yellow-400 transition-colors';

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: PipelineStatus }) {
  const cfg = PIPELINE_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── ENQUIRY DETAIL ───────────────────────────────────────────────────────────
function EnquiryDetail({
  e, onBack, onStatusChange, onNoteSave, onJobValueSave, onScheduleDateSave,
}: {
  e: Enquiry;
  onBack: () => void;
  onStatusChange: (id: string, status: PipelineStatus) => void;
  onNoteSave: (id: string, note: string) => void;
  onJobValueSave: (id: string, value: number) => void;
  onScheduleDateSave: (id: string, date: string) => void;
}) {
  const [note, setNote] = useState(e.notes ?? '');
  const [jobValueInput, setJobValueInput] = useState(e.jobValue ? String(e.jobValue) : '');
  const [schedDate, setSchedDate] = useState(e.scheduledDate ?? '');
  const [savedNote, setSavedNote] = useState(false);
  const [savedValue, setSavedValue] = useState(false);
  const [savedDate, setSavedDate] = useState(false);

  const handleSaveNote = () => {
    onNoteSave(e.id, note);
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 1500);
  };

  const handleSaveValue = () => {
    const v = parseFloat(jobValueInput);
    if (!isNaN(v) && v > 0) {
      onJobValueSave(e.id, v);
      setSavedValue(true);
      setTimeout(() => setSavedValue(false), 1500);
    }
  };

  const handleSaveDate = () => {
    onScheduleDateSave(e.id, schedDate);
    setSavedDate(true);
    setTimeout(() => setSavedDate(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-200 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 text-slate-900" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 rounded-full border ${
              e.type === 'filth' ? 'bg-[#00B8D9] text-white border-[#00B8D9]' : 'bg-yellow-400 text-slate-900 border-yellow-500'
            }`}>
              {e.type === 'filth' ? '$ Quote' : 'Contact'}
            </span>
            <div className="font-black text-slate-900 text-lg leading-none truncate">{e.name}</div>
          </div>
          <div className="text-slate-400 text-xs mt-0.5">{timeAgo(e.createdAt)}</div>
        </div>
        {e.read && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
      </div>

      <HazardStripe className="h-2" />

      <div className="flex-1 px-4 py-5 space-y-3 overflow-y-auto pb-32">
        {/* Identity */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 flex items-center gap-4 shadow-[4px_4px_0_0_#FFD60A]">
          <div className="w-14 h-14 rounded-full border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[3px_3px_0_0_#00B8D9] bg-yellow-400">
            <User className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-black text-slate-900 text-2xl leading-none">{e.name}</div>
            <div className="text-slate-400 text-xs mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />{formatDate(e.createdAt)}
            </div>
          </div>
        </div>

        {/* Pipeline status */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0_0_#0F172A]">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">Pipeline status</div>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(PIPELINE_CONFIG) as PipelineStatus[]).map((s) => {
              const cfg = PIPELINE_CONFIG[s];
              const active = (e.status ?? 'new') === s;
              return (
                <button
                  key={s}
                  onClick={() => onStatusChange(e.id, s)}
                  className={`py-2 rounded-xl text-xs font-black border-2 transition-all ${
                    active
                      ? 'bg-slate-900 text-yellow-400 border-slate-900 shadow-[2px_2px_0_0_#FFD60A]'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Call button */}
        <a
          href={`tel:${e.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-4 bg-slate-900 border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#FFD60A] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-[#00B8D9] border-2 border-white flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-bold mb-0.5">Tap to call</div>
            <div className="font-black text-white text-xl leading-none">{e.phone}</div>
          </div>
          <div className="text-yellow-400 text-sm font-black uppercase tracking-widest">Call →</div>
        </a>

        {/* Suburb */}
        {e.suburb !== '—' && (
          <div className="flex items-center gap-4 bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#00B8D9]">
            <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-slate-900 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-0.5">Suburb</div>
              <div className="font-black text-slate-900 text-xl leading-none">{e.suburb}</div>
            </div>
          </div>
        )}

        {/* Quote details */}
        {e.type === 'filth' && e.quoteDetails && (
          <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#FFD60A]">
            <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-yellow-400 font-bold mb-1">Estimated range</div>
                <div className="font-black text-white text-3xl leading-none">
                  ${e.quoteDetails.lo}<span className="text-yellow-400 mx-2">–</span>${e.quoteDetails.hi}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x-2 divide-slate-100 border-t-2 border-slate-100">
              <div className="px-4 py-3">
                <div className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-bold mb-0.5">Surface</div>
                <div className="font-black text-slate-900 text-sm">{e.quoteDetails.surface}</div>
              </div>
              <div className="px-4 py-3">
                <div className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-bold mb-0.5">Size</div>
                <div className="font-black text-slate-900 text-sm">{e.quoteDetails.size}</div>
              </div>
            </div>
            <div className="px-5 py-4 border-t-2 border-slate-100">
              <div className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-bold mb-2">Filth level</div>
              <div className="flex items-center justify-between">
                <div className="font-black text-slate-900 text-base">{e.quoteDetails.filthLabel}</div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Droplets key={i} className={`w-4 h-4 ${i < e.quoteDetails!.filthLevel ? 'text-[#00B8D9] fill-[#00B8D9]/30' : 'text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-[#00B8D9] transition-all" style={{ width: `${(e.quoteDetails.filthLevel / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Confirmed job value */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#FFD60A]">
          <div className="text-[10px] uppercase tracking-widest text-[#00B8D9] font-bold mb-3">Confirmed job value</div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black text-sm">$</span>
              <input
                type="number"
                placeholder="e.g. 480"
                value={jobValueInput}
                onChange={(e) => setJobValueInput(e.target.value)}
                className="w-full pl-7 pr-4 py-3 border-2 border-slate-200 bg-slate-50 rounded-xl text-slate-900 font-medium text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <button
              onClick={handleSaveValue}
              className={`px-4 py-3 rounded-xl border-2 font-black text-sm transition-all ${
                savedValue
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[3px_3px_0_0_#00B8D9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5'
              }`}
            >
              {savedValue ? '✓' : 'Save'}
            </button>
          </div>
          {e.jobValue && (
            <div className="mt-2 text-emerald-600 font-black text-sm">Current: ${e.jobValue.toLocaleString()}</div>
          )}
        </div>

        {/* Schedule date */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#00B8D9]">
          <div className="text-[10px] uppercase tracking-widest text-[#00B8D9] font-bold mb-3 flex items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5" />Schedule job date
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={schedDate}
              onChange={(e) => setSchedDate(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-slate-200 bg-slate-50 rounded-xl text-slate-900 font-medium text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <button
              onClick={handleSaveDate}
              className={`px-4 py-3 rounded-xl border-2 font-black text-sm transition-all ${
                savedDate
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[3px_3px_0_0_#00B8D9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5'
              }`}
            >
              {savedDate ? '✓' : 'Set'}
            </button>
          </div>
          {e.scheduledDate && (
            <div className="mt-2 text-slate-600 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Scheduled: {new Date(e.scheduledDate).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          )}
        </div>

        {/* Message */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00B8D9] font-bold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            {e.type === 'filth' ? 'Full message' : 'What they need'}
          </div>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">{e.message}</p>
        </div>

        {/* Notes */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0_0_#FFD60A]">
          <div className="text-[10px] uppercase tracking-widest text-[#00B8D9] font-bold mb-3">Notes</div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add notes about this lead..."
            rows={3}
            className="w-full rounded-xl px-4 py-3 border-2 border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
          />
          <button
            onClick={handleSaveNote}
            className={`mt-2 w-full py-2.5 rounded-xl border-2 font-black text-sm transition-all tracking-wider ${
              savedNote
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'bg-yellow-400 border-slate-900 text-slate-900 shadow-[3px_3px_0_0_#00B8D9] active:shadow-none active:translate-x-1 active:translate-y-1'
            }`}
          >
            {savedNote ? '✓ Saved' : 'Save notes'}
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
<div className="lg:relative lg:p-5 lg:border-t-2 lg:border-slate-100 fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-slate-200">
  <a
    href={`tel:${e.phone.replace(/\s/g, '')}`}
    className="flex items-center justify-center gap-3 w-full bg-yellow-400 text-slate-900 font-black text-xl py-5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
  >
    <Phone className="w-6 h-6" strokeWidth={2.5} />
    Call {e.name.split(' ')[0]}
  </a>
</div>
    </motion.div>
  );
}

// ─── ENQUIRY CARD ─────────────────────────────────────────────────────────────
function EnquiryCard({ e, idx, onSelect }: { e: Enquiry; idx: number; onSelect: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onSelect}
      className="w-full text-left active:scale-[0.98] transition-transform"
    >
      <div className={`rounded-2xl border-2 p-4 bg-white transition-all ${
        e.read ? 'border-slate-200 shadow-[3px_3px_0_0_#E2E8F0]' : 'border-slate-900 shadow-[4px_4px_0_0_#FFD60A]'
      }`}>
        <div className="flex items-start gap-3">
          {!e.read && <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-slate-900 shrink-0 mt-1.5" />}
          <div className={`w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center shrink-0 font-black text-xs ${AV_COLORS[idx % 5]}`}>
            {initials(e.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-black text-slate-900 text-base leading-none truncate">{e.name}</span>
              <span className="text-slate-400 text-xs shrink-0">{timeAgo(e.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="flex items-center gap-1 text-[#00B8D9] text-xs font-bold">
                <Phone className="w-3 h-3" />{e.phone}
              </span>
              {e.suburb !== '—' && (
                <span className="flex items-center gap-1 text-slate-400 text-xs">
                  <MapPin className="w-3 h-3" />{e.suburb}
                </span>
              )}
              {e.status && <StatusBadge status={e.status} />}
              {e.scheduledDate && (
                <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <CalendarDays className="w-3 h-3" />
                  {new Date(e.scheduledDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
            {e.type === 'filth' && e.quoteDetails && (
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[9px] tracking-[0.15em] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{e.quoteDetails.surface}</span>
                <span className="text-[9px] tracking-[0.15em] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{e.quoteDetails.size}</span>
                <span className="text-emerald-600 text-xs font-bold flex items-center gap-0.5">
                  <DollarSign className="w-3 h-3" />${e.jobValue ?? `${e.quoteDetails.lo}–${e.quoteDetails.hi}`}
                </span>
              </div>
            )}
            <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{e.message}</p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── PIPELINE COLUMN ─────────────────────────────────────────────────────────
// ─── PIPELINE ─────────────────────────────────────────────────────────────────
// 1. Replace the entire PipelineColumn function with this new one.
// 2. Replace the pipeline section in CRM (the {section === 'pipeline' && ...} block)
//    with the new render block at the bottom of this file.

// ── NEW PipelineColumn ────────────────────────────────────────────────────────
function PipelineColumn({
  status, enquiries, onSelect, onRefresh,
}: {
  status: PipelineStatus; enquiries: Enquiry[]; onSelect: (e: Enquiry) => void; onRefresh: () => void;
}) {
  const cfg   = PIPELINE_CONFIG[status];
  const total = enquiries.reduce((a, e) => a + (e.jobValue ?? e.quoteDetails?.hi ?? 0), 0);

  const dotColors: Record<PipelineStatus, string> = {
    new:    '#3b82f6',
    called: '#f59e0b',
    quoted: '#a855f7',
    booked: '#10b981',
  };
  const shadowColors: Record<PipelineStatus, string> = {
    new:    '#3b82f6',
    called: '#f59e0b',
    quoted: '#a855f7',
    booked: '#10b981',
  };

  return (
    <div className="flex flex-col rounded-2xl border-2 border-slate-900 bg-white overflow-hidden"
      style={{ boxShadow: `4px 4px 0 0 ${shadowColors[status]}` }}>

      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: dotColors[status] }} />
          <span className="font-black text-slate-900 text-sm">{cfg.label}</span>
          <span className="bg-slate-100 border border-slate-200 text-slate-500 text-[9px] font-black px-1.5 py-0.5 rounded-full">
            {enquiries.length}
          </span>
        </div>
        {total > 0 && (
          <span className="text-xs font-black text-emerald-600">${total.toLocaleString()}</span>
        )}
      </div>

      {/* Cards */}
      <div className="flex-1 p-2.5 space-y-2 min-h-[200px]">
        {enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
              <Plus className="w-4 h-4 text-slate-300" />
            </div>
            <div className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Empty</div>
          </div>
        ) : (
          enquiries.map((e) => (
            <button
              key={e.id}
              onClick={() => onSelect(e)}
              className="w-full text-left rounded-xl border-2 border-slate-200 bg-white p-3 hover:border-slate-900 hover:shadow-[3px_3px_0_0_#FFD60A] transition-all active:scale-[0.98] group"
            >
              {/* Name + type badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-black text-slate-900 text-sm leading-tight truncate flex-1">{e.name}</div>
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                  e.type === 'filth' ? 'bg-[#00B8D9]/10 text-[#00B8D9]' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {e.type === 'filth' ? 'Quote' : 'Contact'}
                </span>
              </div>

              {/* Suburb */}
              {e.suburb !== '—' && (
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-1.5">
                  <MapPin className="w-3 h-3 shrink-0" />{e.suburb}
                </div>
              )}

              {/* Scheduled date */}
              {e.scheduledDate && (
                <div className="flex items-center gap-1 text-emerald-600 text-xs mb-1.5 font-bold">
                  <CalendarDays className="w-3 h-3 shrink-0" />
                  {new Date(e.scheduledDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                </div>
              )}

              {/* Message preview */}
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-2">{e.message}</p>

              {/* Footer */}
<div className="flex items-center justify-between">
  <span className="text-[9px] text-slate-400 font-bold">{timeAgo(e.createdAt)}</span>
  <div className="flex items-center gap-2">
    {(e.jobValue || e.quoteDetails) && (
      <span className="text-emerald-600 text-xs font-black flex items-center gap-0.5">
        <DollarSign className="w-3 h-3" />
        {e.jobValue ?? `${e.quoteDetails!.lo}–${e.quoteDetails!.hi}`}
      </span>
    )}
    <button
      onClick={async (evt) => {
        evt.stopPropagation();
        if (!confirm(`Delete ${e.name}?`)) return;
        await fetch(`/api/contact?code=${PASSCODE}&id=${e.id}`, { method: 'DELETE' });
        onRefresh();
      }}
      className="w-6 h-6 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
    >
      <Trash2 className="w-3 h-3 text-red-500" />
    </button>
  </div>
</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// ── NEW pipeline render block ─────────────────────────────────────────────────
// Replace the {section === 'pipeline' && ( ... )} block in CRM with this:
//
// {section === 'pipeline' && (
//   <PipelineBoard enquiries={filteredEnquiries} onSelect={handleSelect} search={search} />
// )}
//
// And add this new PipelineBoard component above CRM:

function PipelineBoard({ enquiries, onSelect, search, onRefresh }: {
  enquiries: Enquiry[];
  onSelect: (e: Enquiry) => void;
  search: string;
  onRefresh: () => void;
}) {
  const [mobileTab, setMobileTab] = useState<PipelineStatus>('new');

  const totalValue = enquiries.reduce((a, e) => a + (e.jobValue ?? e.quoteDetails?.hi ?? 0), 0);
  const totalBooked = enquiries.filter((e) => e.status === 'booked').length;

  const byStatus = (s: PipelineStatus) => enquiries.filter((e) => (e.status ?? 'new') === s);

  const [showAddLead, setShowAddLead] = useState(false);
const [leadForm, setLeadForm] = useState({ name: '', phone: '', suburb: '', message: '', type: 'contact' as 'contact' | 'filth', status: 'new' as PipelineStatus });
const [submitting, setSubmitting] = useState(false);

const handleAddLead = async () => {
  if (!leadForm.name.trim() || !leadForm.phone.trim() || !leadForm.message.trim()) return;
  setSubmitting(true);
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: leadForm.name.trim(),
        phone: leadForm.phone.trim(),
        suburb: leadForm.suburb.trim() || '—',
        message: leadForm.message.trim(),
        type: leadForm.type,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`Failed to add lead: ${data.error ?? 'Unknown error'}`);
      return;
    }

    // Save pipeline status to meta using the same ID the API used (Date.now at time of insert)
    // We refetch first to find the new lead's ID, then upsert meta
    await onRefresh();

    // Small delay to let state settle, then find and update the new lead's status
    setTimeout(async () => {
      const refetchRes = await fetch(`/api/contact?code=${PASSCODE}`);
      const refetchData = await refetchRes.json();
      const newLead = (refetchData.enquiries ?? []).find(
        (e: Enquiry) => e.name === leadForm.name.trim() && e.phone === leadForm.phone.trim()
      );
      if (newLead && leadForm.status !== 'new') {
        await sb.upsertMeta(newLead.id, { status: leadForm.status });
        await onRefresh();
      }
    }, 500);

    setShowAddLead(false);
    setLeadForm({ name: '', phone: '', suburb: '', message: '', type: 'contact', status: 'new' });
  } catch (err) {
    alert(`Error: ${err}`);
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="space-y-4">

      {/* ── Summary bar ── */}
     {/* ── Summary bar + Add button ── */}
<div className="flex items-center gap-3">
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
    {(Object.keys(PIPELINE_CONFIG) as PipelineStatus[]).map((s) => {
      const cfg   = PIPELINE_CONFIG[s];
      const count = byStatus(s).length;
      const val   = byStatus(s).reduce((a, e) => a + (e.jobValue ?? e.quoteDetails?.hi ?? 0), 0);
      return (
        <div
          key={s}
          onClick={() => setMobileTab(s)}
          className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${
            mobileTab === s
              ? 'bg-slate-900 border-slate-900 shadow-[4px_4px_0_0_#FFD60A]'
              : 'bg-white border-slate-200 hover:border-slate-400'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <span className={`text-[9px] tracking-[0.2em] uppercase font-black ${mobileTab === s ? 'text-yellow-400' : 'text-slate-400'}`}>
              {cfg.label}
            </span>
          </div>
          <div className={`font-black text-2xl leading-none ${mobileTab === s ? 'text-white' : 'text-slate-900'}`}>{count}</div>
          {val > 0 && (
            <div className={`text-xs font-black mt-1 ${mobileTab === s ? 'text-emerald-400' : 'text-emerald-600'}`}>
              ${val.toLocaleString()}
            </div>
          )}
        </div>
      );
    })}
  </div>
  {/* Add lead button */}
  <button
    onClick={() => setShowAddLead(true)}
    className="shrink-0 flex items-center gap-2 bg-yellow-400 text-slate-900 font-black text-sm px-5 py-3 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all self-start"
  >
    <Plus className="w-4 h-4" strokeWidth={3} />
    <span className="hidden sm:inline">Add lead</span>
  </button>
</div>

{/* ── Add Lead Modal ── */}
<Modal open={showAddLead} onClose={() => setShowAddLead(false)} title="◆ Add new lead">
  <FieldGroup label="Full name *">
    <input className={inputCls} type="text" placeholder="Jane Smith"
      value={leadForm.name} onChange={(e) => setLeadForm((p) => ({ ...p, name: e.target.value }))} />
  </FieldGroup>
  <FieldGroup label="Phone *">
    <input className={inputCls} type="tel" placeholder="04XX XXX XXX"
      value={leadForm.phone} onChange={(e) => setLeadForm((p) => ({ ...p, phone: e.target.value }))} />
  </FieldGroup>
  <FieldGroup label="Suburb">
    <input className={inputCls} type="text" placeholder="Brighton"
      value={leadForm.suburb} onChange={(e) => setLeadForm((p) => ({ ...p, suburb: e.target.value }))} />
  </FieldGroup>
  <div className="grid grid-cols-2 gap-3">
    <FieldGroup label="Type">
      <select className={selectCls} value={leadForm.type} onChange={(e) => setLeadForm((p) => ({ ...p, type: e.target.value as 'contact' | 'filth' }))}>
        <option value="contact">Contact</option>
        <option value="filth">Quote request</option>
      </select>
    </FieldGroup>
    <FieldGroup label="Pipeline stage">
      <select className={selectCls} value={leadForm.status} onChange={(e) => setLeadForm((p) => ({ ...p, status: e.target.value as PipelineStatus }))}>
        <option value="new">New</option>
        <option value="called">Called</option>
        <option value="quoted">Quoted</option>
        <option value="booked">Booked</option>
      </select>
    </FieldGroup>
  </div>
  <FieldGroup label="Message / notes *">
    <textarea className={inputCls} rows={3} placeholder="What are they after?"
      value={leadForm.message} onChange={(e) => setLeadForm((p) => ({ ...p, message: e.target.value }))} />
  </FieldGroup>
  <button
    onClick={handleAddLead}
    disabled={submitting || !leadForm.name.trim() || !leadForm.phone.trim() || !leadForm.message.trim()}
    className="w-full bg-yellow-400 text-slate-900 font-black py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {submitting ? 'Adding…' : 'Add lead'}
  </button>
</Modal>

      {/* ── Desktop: 4-col kanban ── */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-3">
        {(Object.keys(PIPELINE_CONFIG) as PipelineStatus[]).map((s) => (
          <PipelineColumn
  key={s}
  status={s}
  enquiries={byStatus(s)}
  onSelect={onSelect}
  onRefresh={onRefresh}
/>
        ))}
      </div>

      {/* ── Mobile: tabbed single column ── */}
      <div className="lg:hidden">
        {/* Tab switcher */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {(Object.keys(PIPELINE_CONFIG) as PipelineStatus[]).map((s) => {
            const cfg = PIPELINE_CONFIG[s];
            const count = byStatus(s).length;
            const active = mobileTab === s;
            return (
              <button
                key={s}
                onClick={() => setMobileTab(s)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black whitespace-nowrap transition-all ${
                  active ? 'bg-slate-900 border-slate-900 text-yellow-400 shadow-[3px_3px_0_0_#FFD60A]' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                {cfg.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${active ? 'bg-yellow-400 text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active column */}
        <PipelineColumn
  status={mobileTab}
  enquiries={byStatus(mobileTab)}
  onSelect={onSelect}
  onRefresh={onRefresh}
/>
      </div>

      {/* ── No results ── */}
      {enquiries.length === 0 && search && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <Search className="w-8 h-8 text-slate-200" />
          <div className="text-slate-900 font-black text-lg">No results for "{search}"</div>
          <div className="text-slate-400 text-sm">Try a different name, suburb or phone number</div>
        </div>
      )}
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarView({ enquiries, onSelectEnquiry }: { enquiries: Enquiry[]; onSelectEnquiry: (e: Enquiry) => void }) {
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobForm, setJobForm] = useState({ title: '', client: '', suburb: '', date: '', notes: '' });
  const [jobs, setJobs] = useState<{ id: string; title: string; client: string; suburb: string; date: string; notes: string }[]>([]);
  const [savingJob, setSavingJob] = useState(false);
  const [editingJob, setEditingJob] = useState<typeof jobs[0] | null>(null);
 
  // Load manual jobs from Supabase enquiry_meta as a simple jobs list
  // We store them locally for now using localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('trident_calendar_jobs');
      if (stored) setJobs(JSON.parse(stored));
    } catch { /* empty */ }
  }, []);
 
  const saveJobs = (updated: typeof jobs) => {
    setJobs(updated);
    localStorage.setItem('trident_calendar_jobs', JSON.stringify(updated));
  };
 
  const handleAddJob = () => {
    if (!jobForm.title.trim() || !jobForm.date) return;
    setSavingJob(true);
    const newJob = { id: Date.now().toString(), ...jobForm };
    saveJobs([...jobs, newJob]);
    setJobForm({ title: '', client: '', suburb: '', date: '', notes: '' });
    setShowAddJob(false);
    setSavingJob(false);
  };
 
  const handleUpdateJob = () => {
  if (!editingJob || !jobForm.title.trim() || !jobForm.date) return;
  const updated = jobs.map((j) => j.id === editingJob.id ? { ...j, ...jobForm } : j);
  saveJobs(updated);
  setEditingJob(null);
  setJobForm({ title: '', client: '', suburb: '', date: '', notes: '' });
  setShowAddJob(false);
};

  const deleteJob = (id: string) => {
    saveJobs(jobs.filter((j) => j.id !== id));
  };
 
  const monthName = new Date(viewYear, viewMonth).toLocaleString('en-AU', { month: 'long', year: 'numeric' });
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
 
  // Combine enquiry scheduled dates + manual jobs
  const scheduledEnquiries = enquiries.filter((e) => {
    if (!e.scheduledDate) return false;
    const d = new Date(e.scheduledDate);
    return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
  });
 
  const monthJobs = jobs.filter((j) => {
    if (!j.date) return false;
    const d = new Date(j.date);
    return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
  });
 
  // Build day map
  const enquiriesByDay: Record<number, Enquiry[]> = {};
  scheduledEnquiries.forEach((e) => {
    const d = new Date(e.scheduledDate!).getDate();
    enquiriesByDay[d] = [...(enquiriesByDay[d] ?? []), e];
  });
 
  const jobsByDay: Record<number, typeof jobs> = {};
  monthJobs.forEach((j) => {
    const d = new Date(j.date).getDate();
    jobsByDay[d] = [...(jobsByDay[d] ?? []), j];
  });
 
  const hasEvents = (day: number) => (enquiriesByDay[day]?.length ?? 0) + (jobsByDay[day]?.length ?? 0) > 0;
 
  const selectedEnquiries = selectedDay ? (enquiriesByDay[selectedDay] ?? []) : [];
  const selectedJobs = selectedDay ? (jobsByDay[selectedDay] ?? []) : [];
 
  const upcomingAll = [
    ...enquiries
      .filter((e) => e.scheduledDate && new Date(e.scheduledDate) >= now)
      .map((e) => ({ type: 'enquiry' as const, date: new Date(e.scheduledDate!), label: e.name, sub: e.suburb, e })),
    ...jobs
      .filter((j) => j.date && new Date(j.date) >= now)
      .map((j) => ({ type: 'job' as const, date: new Date(j.date), label: j.title, sub: j.client || j.suburb, j })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 6);
 
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
    setSelectedDay(null);
  };
 
  return (
    <div className="space-y-4">
 
      {/* Desktop layout: calendar left, sidebar right */}
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-4">
 
        {/* ── CALENDAR ── */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#FFD60A]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-slate-100">
            <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="font-black text-slate-900 text-base">{monthName}</div>
            <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center rotate-180 hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
 
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-100">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
              <div key={d} className="text-center text-[10px] tracking-[0.1em] uppercase text-slate-400 font-bold py-2">{d}</div>
            ))}
          </div>
 
          {/* Days grid */}
          <div className="grid grid-cols-7">
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`o-${i}`} className="border-b border-r border-slate-50 lg:h-20 h-12" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear();
              const isSelected = selectedDay === day;
              const eCount = enquiriesByDay[day]?.length ?? 0;
              const jCount = jobsByDay[day]?.length ?? 0;
              const total = eCount + jCount;
 
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
onDoubleClick={() => {
  setSelectedDay(day);
  setJobForm((p) => ({ ...p, date: `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}` }));
  setShowAddJob(true);
}}
                  className={`border-b border-r border-slate-100 lg:h-28 h-14 p-2 flex flex-col items-start transition-all ${
                    isSelected ? 'bg-[#00B8D9]/10 ring-2 ring-inset ring-[#00B8D9]' :
isToday ? 'bg-yellow-50' :
'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mb-1 ${
                    isSelected ? 'bg-[#00B8D9] text-white' :
isToday ? 'bg-yellow-400 border-2 border-slate-900 text-slate-900' :
'text-slate-600'
                  }`}>
                    {day}
                  </div>
                  {/* Event dots — desktop shows mini labels */}
                  <div className="hidden lg:flex flex-col gap-0.5 w-full overflow-hidden">
                    {(enquiriesByDay[day] ?? []).slice(0, 2).map((e) => (
                      <div key={e.id} className="text-[9px] font-bold bg-[#00B8D9]/15 text-[#00B8D9] px-1 rounded truncate">{e.name}</div>
                    ))}
                    {(jobsByDay[day] ?? []).slice(0, 2).map((j) => (
                      <div key={j.id} className="text-[9px] font-bold bg-yellow-100 text-yellow-700 px-1 rounded truncate">{j.title}</div>
                    ))}
                    {total > 2 && <div className="text-[8px] text-slate-400 font-bold">+{total - 2} more</div>}
                  </div>
                  {/* Mobile: just dots */}
                  {total > 0 && (
                    <div className="lg:hidden flex gap-0.5 mt-auto">
                      {eCount > 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#00B8D9]" />}
                      {jCount > 0 && <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 border border-slate-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
 
          {/* Legend */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100">
  <div className="text-[9px] text-slate-300 font-bold">Double-click a day to add a job</div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
              <div className="w-2.5 h-2.5 rounded bg-yellow-400 border border-slate-900" />Today
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
              <div className="w-2.5 h-2.5 rounded bg-[#00B8D9]/20 border border-[#00B8D9]" />Enquiry
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
              <div className="w-2.5 h-2.5 rounded bg-yellow-100 border border-yellow-400" />Job
            </div>
          </div>
        </div>
 
        {/* ── SIDEBAR ── */}
        <div className="flex flex-col gap-3 mt-4 lg:mt-0">
 
          {/* Add job button */}
          <button
            onClick={() => setShowAddJob(true)}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-black text-sm py-3.5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add job to calendar
          </button>
 
          {/* Selected day panel */}
          {selectedDay && (selectedEnquiries.length > 0 || selectedJobs.length > 0) ? (
            <div className="bg-white border-2 border-[#00B8D9] rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#00B8D9]">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">
                  {new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' })}
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {selectedEnquiries.map((e) => (
                  <button key={e.id} onClick={() => onSelectEnquiry(e)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left">
                    <div className="w-2 h-2 rounded-full bg-[#00B8D9] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-slate-900 text-sm truncate">{e.name}</div>
                      <div className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{e.suburb}</div>
                    </div>
                    {e.status && <StatusBadge status={e.status} />}
                  </button>
                ))}
                {selectedJobs.map((j) => (
  <div key={j.id} className="flex items-center gap-3 px-4 py-3">
    <div className="w-2 h-2 rounded-full bg-yellow-400 border border-slate-900 shrink-0" />
    <button
      onClick={() => {
        setEditingJob(j);
        setJobForm({ title: j.title, client: j.client, suburb: j.suburb, date: j.date, notes: j.notes });
        setShowAddJob(true);
      }}
      className="flex-1 min-w-0 text-left hover:opacity-70 transition-opacity"
    >
      <div className="font-black text-slate-900 text-sm truncate">{j.title}</div>
      {j.client && <div className="text-slate-400 text-xs truncate">{j.client}</div>}
      {j.suburb && <div className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{j.suburb}</div>}
      <div className="text-[9px] text-[#00B8D9] font-bold mt-0.5">Tap to edit</div>
    </button>
    <button onClick={() => deleteJob(j.id)} className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors shrink-0">
      <Trash2 className="w-3 h-3 text-red-500" />
    </button>
  </div>
))}
              </div>
            </div>
          ) : selectedDay ? (
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-center">
              <div className="text-slate-300 text-xs font-bold">Nothing on {new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}</div>
            </div>
          ) : null}
 
          {/* Upcoming */}
          <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#FFD60A]">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">◆ Upcoming</div>
            </div>
            {upcomingAll.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
                <CalendarDays className="w-6 h-6 text-slate-200" />
                <div className="text-slate-400 text-xs font-bold">Nothing scheduled</div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {upcomingAll.map((item, i) => {
                  const isToday = item.date.toDateString() === now.toDateString();
                  return (
                    <div key={i}
                      onClick={() => item.type === 'enquiry' ? onSelectEnquiry(item.e) : undefined}
                      className={`flex items-center gap-3 px-4 py-3 ${item.type === 'enquiry' ? 'cursor-pointer hover:bg-slate-50' : ''} transition-colors`}
                    >
                      <div className={`w-10 h-10 rounded-xl border-2 flex flex-col items-center justify-center shrink-0 ${
                        isToday ? 'bg-yellow-400 border-slate-900' : 'bg-slate-900 border-slate-900'
                      }`}>
                        <div className={`font-black text-xs leading-none ${isToday ? 'text-slate-900' : 'text-yellow-400'}`}>{item.date.getDate()}</div>
                        <div className={`text-[8px] uppercase ${isToday ? 'text-slate-700' : 'text-white/50'}`}>{item.date.toLocaleString('en-AU', { month: 'short' })}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-slate-900 text-xs truncate">{item.label}</div>
                        {item.sub && <div className="text-slate-400 text-[10px] truncate">{item.sub}</div>}
                        {isToday && <div className="text-yellow-500 text-[9px] font-black uppercase tracking-wider">Today</div>}
                      </div>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${item.type === 'enquiry' ? 'bg-[#00B8D9]' : 'bg-yellow-400 border border-slate-400'}`} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
 
      {/* Add Job Modal */}
      <Modal open={showAddJob} onClose={() => { setShowAddJob(false); setEditingJob(null); setJobForm({ title: '', client: '', suburb: '', date: '', notes: '' }); }} title={editingJob ? '◆ Edit job' : '◆ Add job to calendar'}>
        <FieldGroup label="Job title *">
          <input className={inputCls} type="text" placeholder="e.g. Driveway wash — Brighton"
            value={jobForm.title} onChange={(e) => setJobForm((p) => ({ ...p, title: e.target.value }))} />
        </FieldGroup>
        <FieldGroup label="Date *">
          <input className={inputCls} type="date"
            value={jobForm.date} onChange={(e) => setJobForm((p) => ({ ...p, date: e.target.value }))} />
        </FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup label="Client name">
            <input className={inputCls} type="text" placeholder="Jane Smith"
              value={jobForm.client} onChange={(e) => setJobForm((p) => ({ ...p, client: e.target.value }))} />
          </FieldGroup>
          <FieldGroup label="Suburb">
            <input className={inputCls} type="text" placeholder="Brighton"
              value={jobForm.suburb} onChange={(e) => setJobForm((p) => ({ ...p, suburb: e.target.value }))} />
          </FieldGroup>
        </div>
        <FieldGroup label="Notes">
          <textarea className={inputCls} rows={2} placeholder="Any extra details..."
            value={jobForm.notes} onChange={(e) => setJobForm((p) => ({ ...p, notes: e.target.value }))} />
        </FieldGroup>
        <div className="flex gap-2">
  {editingJob && (
    <button
      onClick={() => { deleteJob(editingJob.id); setEditingJob(null); setShowAddJob(false); setJobForm({ title: '', client: '', suburb: '', date: '', notes: '' }); }}
      className="px-4 py-4 rounded-xl border-2 border-red-200 bg-red-50 text-red-500 font-black text-sm hover:bg-red-100 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )}
  <button
    onClick={editingJob ? handleUpdateJob : handleAddJob}
    disabled={savingJob || !jobForm.title.trim() || !jobForm.date}
    className="flex-1 bg-yellow-400 text-slate-900 font-black py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {editingJob ? 'Save changes' : 'Add to calendar'}
  </button>
</div>
      </Modal>
    </div>
  );
}

// ─── INVOICES ─────────────────────────────────────────────────────────────────
// Now receives invoices & setInvoices as props (lifted to CRM so dashboard can read them)
function InvoicesView({ invoices, setInvoices, enquiries }: {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  enquiries: Enquiry[];
}) {
  const [doctype, setDoctype] = useState<'all' | 'invoice' | 'quote' | 'overdue'>('all');
  const [showModal, setShowModal] = useState(false);
  const [newDoctype, setNewDoctype] = useState<'invoice' | 'quote'>('invoice');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
 
  const [form, setForm] = useState({
    client: '', email: '', phone: '', suburb: '',
    description: '', amount: '', status: 'pending', date: '',
    lineItems: [{ desc: '', qty: '1', rate: '' }] as { desc: string; qty: string; rate: string }[],
    notes: '', enquiryId: '',
  });
 
  const filtered = invoices.filter((inv) => {
    if (doctype === 'invoice') return inv.doctype === 'invoice';
    if (doctype === 'quote') return inv.doctype === 'quote';
    if (doctype === 'overdue') return inv.status === 'overdue';
    return true;
  });
 
  const totalInvoiced = invoices.filter((i) => i.doctype === 'invoice').reduce((a, i) => a + i.amount, 0);
  const totalPaid     = invoices.filter((i) => i.status === 'paid').reduce((a, i) => a + i.amount, 0);
  const totalPending  = invoices.filter((i) => i.status === 'pending').reduce((a, i) => a + i.amount, 0);
  const totalOverdue  = invoices.filter((i) => i.status === 'overdue').reduce((a, i) => a + i.amount, 0);
 
  const lineTotal = form.lineItems.reduce((a, li) => a + (parseFloat(li.qty) || 0) * (parseFloat(li.rate) || 0), 0);
 
  const statusStyles: Record<string, string> = {
    paid:    'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    overdue: 'bg-red-100 text-red-700',
  };
  const statusDot: Record<string, string> = {
    paid: 'bg-emerald-500', pending: 'bg-amber-500', overdue: 'bg-red-500',
  };
 
  const openNew = (dt: 'invoice' | 'quote') => {
    setNewDoctype(dt);
    setEditingId(null);
    setForm({ client: '', email: '', phone: '', suburb: '', description: '', amount: '', status: 'pending', date: '', lineItems: [{ desc: '', qty: '1', rate: '' }], notes: '', enquiryId: '' });
    setShowModal(true);
  };
 
  const openEdit = (inv: Invoice & { email?: string; phone?: string; suburb?: string; lineItems?: { desc: string; qty: string; rate: string }[]; notes?: string; enquiryId?: string }) => {
    setEditingId(inv.id);
    setNewDoctype(inv.doctype);
    setForm({
      client: inv.client, email: inv.email ?? '', phone: inv.phone ?? '', suburb: inv.suburb ?? '',
      description: inv.description, amount: String(inv.amount), status: inv.status, date: inv.date,
      lineItems: inv.lineItems ?? [{ desc: inv.description, qty: '1', rate: String(inv.amount) }],
      notes: inv.notes ?? '', enquiryId: inv.enquiryId ?? '',
    });
    setShowModal(true);
  };
 
  const addLineItem = () => setForm((p) => ({ ...p, lineItems: [...p.lineItems, { desc: '', qty: '1', rate: '' }] }));
  const removeLineItem = (i: number) => setForm((p) => ({ ...p, lineItems: p.lineItems.filter((_, idx) => idx !== i) }));
  const updateLineItem = (i: number, field: 'desc' | 'qty' | 'rate', val: string) => {
    setForm((p) => ({ ...p, lineItems: p.lineItems.map((li, idx) => idx === i ? { ...li, [field]: val } : li) }));
  };
 
  const handleSave = () => {
    if (!form.client.trim()) return;
    const amount = lineTotal || parseFloat(form.amount) || 0;
    const description = form.lineItems.map((li) => li.desc).filter(Boolean).join(', ') || form.description;
 
    if (editingId) {
      const existing = invoices.find((i) => i.id === editingId)!;
      const updated = { ...existing, client: form.client, description, amount, status: form.status as Invoice['status'], date: form.date || existing.date, email: form.email, phone: form.phone, suburb: form.suburb, lineItems: form.lineItems, notes: form.notes, enquiryId: form.enquiryId } as any;
      setInvoices((prev) => prev.map((inv) => inv.id === editingId ? updated : inv));
      sb.upsertInvoice(updated);
    } else {
      const invoiceCount = invoices.filter((i) => i.doctype === 'invoice').length;
      const quoteCount   = invoices.filter((i) => i.doctype === 'quote').length;
      const num = newDoctype === 'invoice' ? `INV-${String(invoiceCount + 1).padStart(3, '0')}` : `QTE-${String(quoteCount + 1).padStart(3, '0')}`;
      const newInv = { id: Date.now().toString(), doctype: newDoctype, num, client: form.client, description, amount, status: form.status as Invoice['status'], date: form.date || new Date().toISOString().slice(0, 10), email: form.email, phone: form.phone, suburb: form.suburb, lineItems: form.lineItems, notes: form.notes, enquiryId: form.enquiryId } as any;
      setInvoices((prev) => [...prev, newInv]);
      sb.upsertInvoice(newInv);
    }
    setShowModal(false);
    setEditingId(null);
  };
 
  const handleDownloadPDF = (inv: any) => {
  const items: { desc: string; qty: string; rate: string }[] = inv.lineItems ?? [{ desc: inv.description, qty: '1', rate: String(inv.amount) }];
  const subtotal = items.reduce((a, li) => a + (parseFloat(li.qty) || 0) * (parseFloat(li.rate) || 0), 0);
  const gst = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + gst;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${inv.num}</title>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 40px; color: #0f172a; }
    .header { background: #0f172a; color: white; padding: 32px; border-radius: 12px 12px 0 0; display: flex; justify-content: space-between; align-items: flex-start; }
    .logo-area { display: flex; align-items: center; gap: 16px; }
    .company-name { font-size: 22px; font-weight: 900; }
    .company-sub { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 2px; }
    .company-contact { font-size: 12px; color: #00B8D9; margin-top: 2px; }
    .doc-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 16px 20px; text-align: right; }
    .doc-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #00B8D9; }
    .doc-num { font-size: 28px; font-weight: 900; color: #FFD60A; margin-top: 4px; }
    .doc-date { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px; }
    .stripe { height: 6px; background: repeating-linear-gradient(45deg, #FFD60A 0px, #FFD60A 9px, #0f172a 9px, #0f172a 18px); }
    .body { border: 2px solid #0f172a; border-top: none; border-radius: 0 0 12px 12px; padding: 32px; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; }
    .box-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #00B8D9; font-weight: 700; margin-bottom: 10px; }
    .client-name { font-size: 18px; font-weight: 900; }
    .detail-row { display: flex; justify-content: space-between; font-size: 12px; padding: 3px 0; }
    .detail-label { color: #94a3b8; }
    .detail-val { font-weight: 700; }
    table { width: 100%; border-collapse: collapse; border: 2px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
    thead { background: #0f172a; }
    thead th { padding: 10px 14px; text-align: left; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.6); font-weight: 700; }
    thead th:not(:first-child) { text-align: right; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody td { padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    tbody td:not(:first-child) { text-align: right; }
    tfoot td { padding: 10px 14px; font-size: 12px; }
    tfoot .total-row td { font-size: 15px; font-weight: 900; background: #f1f5f9; }
    tfoot td:last-child { text-align: right; color: #00B8D9; }
    .deposit-bar { background: #0f172a; color: white; border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .deposit-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,215,10,0.6); font-weight: 700; }
    .deposit-amount { font-size: 22px; font-weight: 900; color: #FFD60A; }
    .tc { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 20px; }
    .tc ol { font-size: 11px; color: #64748b; line-height: 1.8; padding-left: 16px; margin: 8px 0 0; }
    @media print { body { padding: 0; } }
  </style></head><body>
  <div class="header">
    <div class="logo-area">
      <div>
        <div class="company-name">Trident Pressure Washing</div>
        <div class="company-sub">ABN: 24 687 320 994 · Melbourne, VIC</div>
        <div class="company-contact">contact@tridentwash.com.au · 0430 423 564</div>
      </div>
    </div>
    <div class="doc-box">
      <div class="doc-label">${inv.doctype === 'invoice' ? 'Invoice' : 'Quote'}</div>
      <div class="doc-num">#${inv.num.replace('INV-','').replace('QTE-','')}</div>
      <div class="doc-date">${new Date(inv.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </div>
  </div>
  <div class="stripe"></div>
  <div class="body">
    <div class="two-col">
      <div class="box">
        <div class="box-label">Prepared for</div>
        <div class="client-name">${inv.client}</div>
        ${inv.suburb ? `<div style="font-size:13px;color:#64748b;margin-top:2px">${inv.suburb}</div>` : ''}
        ${inv.email ? `<div style="font-size:13px;color:#00B8D9;margin-top:2px">${inv.email}</div>` : ''}
        ${inv.phone ? `<div style="font-size:13px;color:#64748b;margin-top:2px">${inv.phone}</div>` : ''}
      </div>
      <div class="box">
        <div class="box-label">${inv.doctype === 'invoice' ? 'Invoice' : 'Quote'} details</div>
        <div class="detail-row"><span class="detail-label">Date issued</span><span class="detail-val">${new Date(inv.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
        <div class="detail-row"><span class="detail-label">${inv.doctype === 'quote' ? 'Valid until' : 'Due date'}</span><span class="detail-val">${new Date(new Date(inv.date).getTime() + 30*24*60*60*1000).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
        <div class="detail-row"><span class="detail-label">Reference</span><span class="detail-val">${inv.num}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-val" style="text-transform:capitalize">${inv.status}</span></div>
      </div>
    </div>
    <table>
      <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
      <tbody>
        ${items.map((li) => `<tr><td>${li.desc || '—'}</td><td>${li.qty}</td><td>$${parseFloat(li.rate || '0').toLocaleString()}</td><td><strong>$${((parseFloat(li.qty)||0)*(parseFloat(li.rate)||0)).toLocaleString()}</strong></td></tr>`).join('')}
      </tbody>
      <tfoot>
        <tr><td colspan="3" style="text-align:right;color:#94a3b8">Subtotal (excl. GST)</td><td style="text-align:right">$${subtotal.toLocaleString()}</td></tr>
        <tr><td colspan="3" style="text-align:right;color:#94a3b8">GST (10%)</td><td style="text-align:right">$${gst.toLocaleString()}</td></tr>
        <tr class="total-row"><td colspan="3" style="text-align:right">Total (incl. GST)</td><td style="text-align:right;color:#00B8D9;font-size:18px">$${total.toLocaleString()}</td></tr>
      </tfoot>
    </table>
    <div class="deposit-bar">
      <div><div class="deposit-label">Deposit required on acceptance</div><div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px">50% deposit to confirm the booking</div></div>
      <div class="deposit-amount">50% — $${(total / 2).toLocaleString()}</div>
    </div>
    <div class="two-col">
      <div class="box">
        <div class="box-label">Payment method</div>
        <div style="font-weight:900;font-size:13px;margin-bottom:8px">Direct Deposit</div>
        ${[['Account name','Trident Pressure Washing'],['BSB','033-137'],['Account','783-916'],['Reference',inv.num]].map(([l,v]) => `<div class="detail-row"><span class="detail-label">${l}</span><span class="detail-val">${v}</span></div>`).join('')}
      </div>
      <div class="box">
        <div class="box-label">Payment schedule</div>
        ${[['Deposit','On acceptance','50%'],['Final payment','On completion','50%']].map(([p,d,a]) => `<div class="detail-row" style="padding:6px 0;border-bottom:1px solid #e2e8f0"><span style="font-weight:700;font-size:12px">${p}</span><span style="color:#94a3b8;font-size:12px">${d}</span><span style="font-weight:900;color:#00B8D9;font-size:12px">${a}</span></div>`).join('')}
      </div>
    </div>
    ${inv.notes ? `<div class="box" style="margin-bottom:20px"><div class="box-label">Notes</div><p style="font-size:13px;color:#475569;line-height:1.6;margin:0">${inv.notes}</p></div>` : ''}
    <div class="tc">
      <div class="box-label">Terms & conditions</div>
      <ol>
        <li>This ${inv.doctype} is valid for 30 days from the date of issue.</li>
        <li>A 50% deposit is required upon acceptance to confirm the booking.</li>
        <li>Remaining 50% is due upon satisfactory completion of works.</li>
        <li>All work is performed from ground level — no ladders, scissor lifts, or boom lifts.</li>
        <li>Please allow 2 to 6 days to complete the full scope of works if required.</li>
        <li>Accepted payment method: Direct Deposit only.</li>
      </ol>
    </div>
  </div>
  <script>window.onload = () => { window.print(); }</script>
  </body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) win.focus();
};
 
  const cycleStatus = (id: string) => {
    const cycle: Invoice['status'][] = ['pending', 'paid', 'overdue'];
    setInvoices((prev) => prev.map((inv) => {
      if (inv.id !== id) return inv;
      const updated = { ...inv, status: cycle[(cycle.indexOf(inv.status) + 1) % 3] };
      sb.upsertInvoice(updated);
      return updated;
    }));
  };
 
  const deleteInvoice = (id: string) => {
    if (confirm('Delete this record?')) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
      sb.deleteInvoice(id);
    }
  };
 
  // ── Invoice preview modal ──
  // ─── INVOICE PREVIEW ──────────────────────────────────────────────────────────
// Replace the entire `if (viewingInvoice)` block inside InvoicesView with this.
// Everything from `if (viewingInvoice) {` down to the closing `}` before `return (`

  if (viewingInvoice) {
    const inv = viewingInvoice as any;
    const items: { desc: string; qty: string; rate: string }[] = inv.lineItems ?? [{ desc: inv.description, qty: '1', rate: String(inv.amount) }];
    const subtotal = items.reduce((a, li) => a + (parseFloat(li.qty) || 0) * (parseFloat(li.rate) || 0), 0);
    const gst = Math.round(subtotal * 0.1 * 100) / 100;
    const total = subtotal + gst;

    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Back */}
        <button onClick={() => setViewingInvoice(null)}
          className="flex items-center gap-2 text-slate-500 font-black text-sm hover:text-slate-900 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to invoices
        </button>

        {/* ── INVOICE DOCUMENT ── */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[6px_6px_0_0_#FFD60A]">
<div className="bg-slate-900 px-4 pt-5 pb-5">
  <div className="flex items-start justify-between gap-3">
    {/* Company — left side */}
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <img src="/trident-logo.png" alt="Trident"
        className="w-12 h-12 sm:w-16 sm:h-16 object-contain shrink-0 drop-shadow-[0_0_12px_rgba(0,184,217,0.6)]" />
      <div className="min-w-0">
        <div className="font-black text-white text-base sm:text-xl leading-tight">Trident Pressure Washing</div>
        <div className="text-white/50 text-xs mt-0.5 leading-snug">ABN: 24 687 320 994 · Melbourne, VIC</div>
        <div className="text-[#00B8D9] text-xs mt-0.5 leading-snug break-all">contact@tridentwash.com.au · 0430 423 564</div>
      </div>
    </div>

    {/* Doc number box — right side */}
    <div className="bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-right shrink-0">
      <div className="text-[8px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold mb-1">
        {inv.doctype === 'invoice' ? 'Invoice' : 'Quote'}
      </div>
      <div className="font-black text-yellow-400 text-lg sm:text-2xl leading-none">#{inv.num.replace('INV-','').replace('QTE-','')}</div>
      <div className="text-white/40 text-[10px] mt-1">{new Date(inv.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      <div className={`mt-1.5 inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${statusStyles[inv.status]}`}>
        {inv.status}
      </div>
    </div>
  </div>
          </div>

          <HazardStripe className="h-1.5" />

          <div className="p-6 space-y-5">

            {/* Prepared for + Quote details — 2 col */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold mb-3">Prepared for</div>
                <div className="font-black text-slate-900 text-lg leading-tight">{inv.client}</div>
                {inv.suburb && <div className="text-slate-500 text-sm mt-0.5">{inv.suburb}</div>}
                {inv.email && <div className="text-[#00B8D9] text-sm mt-0.5">{inv.email}</div>}
                {inv.phone && <div className="text-slate-500 text-sm mt-0.5">{inv.phone}</div>}
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold mb-3">
                  {inv.doctype === 'invoice' ? 'Invoice' : 'Quote'} details
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'Date issued', value: new Date(inv.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) },
                    { label: inv.doctype === 'quote' ? 'Valid until' : 'Due date', value: new Date(new Date(inv.date).getTime() + 30*24*60*60*1000).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) },
                    { label: 'Reference', value: inv.num },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 text-xs">{row.label}</span>
                      <span className="font-black text-slate-900 text-xs">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line items table */}
            <div>
  <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-2">Service description</div>
  <div className="overflow-x-auto -mx-1 px-1">
  <div className="border-2 border-slate-200 rounded-xl overflow-hidden min-w-[420px]">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_60px_90px_90px] bg-slate-900 px-4 py-2.5">
                  {['Description', 'Qty', 'Rate', 'Amount'].map((h, i) => (
                    <div key={h} className={`text-[9px] tracking-[0.2em] uppercase text-white/60 font-bold ${i > 0 ? 'text-right' : ''}`}>{h}</div>
                  ))}
                </div>
                {/* Rows */}
                {items.map((li, i) => (
                  <div key={i} className={`grid grid-cols-[1fr_60px_90px_90px] px-4 py-3.5 ${i < items.length - 1 ? 'border-b border-slate-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <div className="font-bold text-slate-900 text-sm">{li.desc || '—'}</div>
                    <div className="text-right text-slate-500 text-sm">{li.qty}</div>
                    <div className="text-right text-slate-500 text-sm">${parseFloat(li.rate || '0').toLocaleString()}</div>
                    <div className="text-right font-black text-slate-900 text-sm">
                      ${((parseFloat(li.qty) || 0) * (parseFloat(li.rate) || 0)).toLocaleString()}
                    </div>
                  </div>
                ))}
                {/* Totals */}
                <div className="border-t-2 border-slate-200 bg-slate-50">
                  <div className="grid grid-cols-[1fr_90px] px-4 py-2 text-sm">
                    <div className="text-slate-400 text-right pr-4">Subtotal (excl. GST)</div>
                    <div className="text-right font-bold text-slate-700">${subtotal.toLocaleString()}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_90px] px-4 py-2 text-sm border-t border-slate-200">
                    <div className="text-slate-400 text-right pr-4">GST (10%)</div>
                    <div className="text-right font-bold text-slate-700">${gst.toLocaleString()}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_90px] px-4 py-3 border-t-2 border-slate-300 bg-slate-100">
                    <div className="text-right pr-4 font-black text-slate-900 text-base">Total (incl. GST)</div>
                    <div className="text-right font-black text-[#00B8D9] text-xl">${total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Deposit banner */}
            <div className="bg-slate-900 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-yellow-400/60 font-bold mb-0.5">Deposit required on acceptance</div>
                <div className="text-white/60 text-xs">50% deposit to confirm the booking</div>
              </div>
              <div className="font-black text-yellow-400 text-2xl shrink-0">50% — ${(total / 2).toLocaleString()}</div>
            </div>

            {/* Payment + Schedule — 2 col */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold mb-3">Payment method</div>
                <div className="font-black text-slate-900 text-sm mb-2">Direct Deposit</div>
                {[
                  { label: 'Account name', value: 'Trident Pressure Washing' },
                  { label: 'BSB', value: '033-137' },
                  { label: 'Account', value: '783-916' },
                  { label: 'Reference', value: inv.num },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-2 py-0.5">
                    <span className="text-slate-400 text-xs">{row.label}</span>
                    <span className="font-bold text-slate-900 text-xs">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold mb-3">Payment schedule</div>
                <div className="space-y-2">
                  {[
                    { payment: 'Deposit', due: 'On acceptance', pct: '50%' },
                    { payment: 'Final payment', due: 'On completion', pct: '50%' },
                  ].map((row) => (
                    <div key={row.payment} className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200 last:border-0">
                      <span className="font-bold text-slate-900 text-xs">{row.payment}</span>
                      <span className="text-slate-400 text-xs">{row.due}</span>
                      <span className="font-black text-[#00B8D9] text-xs">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            {inv.notes && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-2">Notes</div>
                <p className="text-slate-600 text-sm leading-relaxed">{inv.notes}</p>
              </div>
            )}

            {/* T&Cs */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-2">Terms & conditions</div>
              <ol className="text-slate-500 text-xs space-y-1 list-decimal list-inside leading-relaxed">
                <li>This {inv.doctype} is valid for 30 days from the date of issue.</li>
                <li>A 50% deposit is required upon acceptance to confirm the booking.</li>
                <li>Remaining 50% is due upon satisfactory completion of works.</li>
                <li>All work is performed from ground level — no ladders, scissor lifts, or boom lifts.</li>
                <li>Please allow 2 to 6 days to complete the full scope of works if required.</li>
                <li>Accepted payment method: Direct Deposit only.</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button onClick={() => {
  setViewingInvoice(null);
  setTimeout(() => openEdit(inv), 50);
}}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-black text-sm hover:border-slate-900 transition-all">
                <Edit3 className="w-4 h-4" />Edit
              </button>
              <button
  onClick={() => handleDownloadPDF(inv)}
  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 font-black text-sm bg-yellow-400 border-slate-900 text-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
>
  <FileText className="w-4 h-4" />Download PDF
</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <>
      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Invoiced', value: totalInvoiced, color: 'text-slate-900',   shadow: '#E2E8F0' },
          { label: 'Paid',     value: totalPaid,     color: 'text-emerald-600', shadow: '#10b981' },
          { label: 'Pending',  value: totalPending,  color: 'text-amber-600',   shadow: '#f59e0b' },
          { label: 'Overdue',  value: totalOverdue,  color: 'text-red-600',     shadow: '#ef4444' },
        ].map((s) => (
          <div key={s.label} className="bg-white border-2 border-slate-200 rounded-2xl p-3 sm:p-4"
            style={{ boxShadow: `3px 3px 0 0 ${s.shadow}` }}>
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400 font-bold mb-1">{s.label}</div>
            <div className={`font-black text-2xl ${s.color}`}>${s.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
 
      {/* ── FILTERS + ACTIONS ── */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'invoice', 'quote', 'overdue'] as const).map((f) => (
            <button key={f} onClick={() => setDoctype(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-black border-2 transition-all ${
                doctype === f ? 'bg-slate-900 border-slate-900 text-yellow-400' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => openNew('quote')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-slate-200 text-xs font-black text-slate-700 hover:border-slate-400 transition-all">
            <FileText className="w-3.5 h-3.5" />New quote
          </button>
          <button onClick={() => openNew('invoice')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-400 border-2 border-slate-900 text-xs font-black text-slate-900 shadow-[3px_3px_0_0_#00B8D9] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <Plus className="w-3.5 h-3.5" />New invoice
          </button>
        </div>
      </div>
 
      {/* ── LIST ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border-2 border-slate-200 rounded-2xl flex flex-col items-center justify-center py-16 gap-3">
          <Receipt className="w-8 h-8 text-slate-300" />
          <div className="text-slate-400 text-sm font-bold">No records yet</div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((inv) => {
            const extInv = inv as any;
            return (
              <div key={inv.id}
                className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 transition-all group"
                style={{ boxShadow: inv.status === 'paid' ? '3px 3px 0 0 #10b981' : inv.status === 'overdue' ? '3px 3px 0 0 #ef4444' : '3px 3px 0 0 #E2E8F0' }}
              >
                {/* Main row */}
                <div className="flex items-center gap-3 px-4 py-4">
                  {/* Status dot */}
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDot[inv.status]}`} />
 
                  {/* Doc number */}
                  <div className="font-black text-slate-400 text-xs w-16 shrink-0">{inv.num}</div>
 
                  {/* Client + desc */}
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setViewingInvoice(inv)}>
                    <div className="font-black text-slate-900 text-sm truncate">{inv.client}</div>
                    <div className="text-slate-400 text-xs truncate">{inv.description}</div>
                    {extInv.email && <div className="text-[#00B8D9] text-[10px] font-bold truncate">{extInv.email}</div>}
                  </div>
 
                  {/* Date */}
                  <div className="text-slate-400 text-xs shrink-0 hidden sm:block">
                    {new Date(inv.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </div>
 
                  {/* Amount */}
                  <div className="font-black text-slate-900 text-base shrink-0">${inv.amount.toLocaleString()}</div>
 
                  {/* Status badge — tap to cycle */}
                  <button onClick={() => cycleStatus(inv.id)}
                    className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 border border-transparent transition-all hover:scale-105 ${statusStyles[inv.status]}`}>
                    {inv.status}
                  </button>
                </div>
 
                {/* Action row — always visible on mobile, hover on desktop */}
                <div className="flex items-center gap-2 px-4 pb-3 lg:pb-0 lg:h-0 lg:overflow-hidden lg:group-hover:h-auto lg:group-hover:pb-3 transition-all">
                  <button onClick={() => setViewingInvoice(inv)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-black hover:bg-slate-200 transition-colors">
                    <FileText className="w-3 h-3" />View
                  </button>
                  <button onClick={() => { openEdit(extInv); }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-black hover:bg-slate-200 transition-colors">
                    <Edit3 className="w-3 h-3" />Edit
                  </button>
                  <button
  onClick={() => handleDownloadPDF(inv)}
  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-400 border border-slate-900 text-slate-900 text-xs font-black shadow-[2px_2px_0_0_#00B8D9] active:shadow-none transition-colors"
>
  <FileText className="w-3 h-3" />PDF
</button>
                  <button onClick={() => deleteInvoice(inv.id)}
                    className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-black hover:bg-red-100 transition-colors">
                    <Trash2 className="w-3 h-3" />Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
 
      {/* ── CREATE / EDIT MODAL ── */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditingId(null); }} title={`◆ ${editingId ? 'Edit' : 'New'} ${newDoctype}`}>
 
        {/* Link to enquiry */}
        {/* Link to enquiry */}
<FieldGroup label="Link to enquiry (optional)">
  <select className={selectCls} value={form.enquiryId} onChange={(e) => {
    const eq = enquiries.find((x) => x.id === e.target.value);
    setForm((p) => ({
      ...p, enquiryId: e.target.value,
      client: eq ? eq.name : p.client,
      phone: eq ? eq.phone : p.phone,
      suburb: eq ? eq.suburb : p.suburb,
    }));
  }}>
    <option value="">— none —</option>
    {enquiries.map((eq) => (
      <option key={eq.id} value={eq.id}>{eq.name} · {eq.suburb}</option>
    ))}
  </select>
</FieldGroup>

<div className="grid grid-cols-2 gap-3">
  <FieldGroup label="Client name *">
    <input className={inputCls} type="text" placeholder="Jane Smith"
      value={form.client} onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))} />
  </FieldGroup>
  <FieldGroup label="Email">
    <input className={inputCls} type="email" placeholder="jane@example.com"
      value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
  </FieldGroup>
</div>

<div className="grid grid-cols-2 gap-3">
  <FieldGroup label="Phone">
    <input className={inputCls} type="tel" placeholder="04XX XXX XXX"
      value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
  </FieldGroup>
  <FieldGroup label="Suburb">
    <input className={inputCls} type="text" placeholder="Brighton"
      value={form.suburb} onChange={(e) => setForm((p) => ({ ...p, suburb: e.target.value }))} />
  </FieldGroup>
</div>

<FieldGroup label="Date">
  <input className={inputCls} type="date" value={form.date}
    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
</FieldGroup>

{/* Line items */}
<div>
  <label className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-bold block mb-2">Line items</label>
  <div className="space-y-2">
    {form.lineItems.map((li, i) => (
      <div key={i} className="space-y-1.5">
        <input className={inputCls} placeholder={`Service description — e.g. Driveway pressure wash`}
          value={li.desc} onChange={(e) => updateLineItem(i, 'desc', e.target.value)} />
        <div className="flex gap-2">
          <div className="flex-1">
            <input className={inputCls} type="number" placeholder="Qty (e.g. 1)"
              value={li.qty} onChange={(e) => updateLineItem(i, 'qty', e.target.value)} />
          </div>
          <div className="flex-1">
            <input className={inputCls} type="number" placeholder="Rate e.g. 480"
              value={li.rate} onChange={(e) => updateLineItem(i, 'rate', e.target.value)} />
          </div>
          <div className="w-16 flex items-center justify-end">
            <div className="text-sm font-black text-slate-900">
              ${((parseFloat(li.qty) || 0) * (parseFloat(li.rate) || 0)).toLocaleString()}
            </div>
          </div>
          {form.lineItems.length > 1 && (
            <button onClick={() => removeLineItem(i)}
              className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors shrink-0">
              <X className="w-3.5 h-3.5 text-red-500" />
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
  <button onClick={addLineItem}
    className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#00B8D9] hover:text-slate-900 transition-colors">
    <Plus className="w-3.5 h-3.5" />Add line item
  </button>
  {lineTotal > 0 && (
    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>Subtotal (excl. GST)</span>
        <span className="font-bold">${lineTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>GST (10%)</span>
        <span className="font-bold">${(Math.round(lineTotal * 0.1 * 100) / 100).toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm border-t border-slate-200 pt-1 mt-1">
        <span className="font-black text-slate-900">Total (incl. GST)</span>
        <span className="font-black text-[#00B8D9] text-base">${(Math.round(lineTotal * 1.1 * 100) / 100).toLocaleString()}</span>
      </div>
    </div>
  )}
</div>

<FieldGroup label="Notes / payment terms">
  <textarea className={inputCls} rows={3}
    placeholder="e.g. 50% deposit required on acceptance. Final payment due on completion."
    value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
</FieldGroup>

<FieldGroup label="Status">
  <select className={selectCls} value={form.status}
    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
    <option value="pending">Pending</option>
    <option value="paid">Paid</option>
    <option value="overdue">Overdue</option>
  </select>
</FieldGroup>

<button onClick={handleSave} disabled={!form.client.trim()}
  className="w-full bg-yellow-400 text-slate-900 font-black py-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0_0_#00B8D9] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed">
  {editingId ? 'Save changes' : `Create ${newDoctype}`}
</button>
      </Modal>
    </>
  );
}

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV_ITEMS: { id: NavSection; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pipeline',  label: 'Pipeline',  icon: LayoutGrid },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox },
  { id: 'calendar',  label: 'Calendar',  icon: Calendar },
  { id: 'invoices',  label: 'Invoices',  icon: Receipt },
];

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
// ─── DASHBOARD ────────────────────────────────────────────────────────────────
// Replace your existing DashboardOverview function with this one.
// Logo file: /public/trident-logo.png

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
// Replace your existing DashboardOverview function with this.
// Logo: /public/trident-logo.png

function DashboardOverview({ enquiries, invoices, onSelectEnquiry }: {
  enquiries: Enquiry[];
  invoices: Invoice[];
  onSelectEnquiry: (e: Enquiry) => void;
}) {
  const now = new Date();
  const unread         = enquiries.filter((e) => !e.read).length;
  const totalQuote     = enquiries.filter((e) => e.type === 'filth').reduce((a, e) => a + (e.jobValue ?? e.quoteDetails?.hi ?? 0), 0);
  const booked         = enquiries.filter((e) => e.status === 'booked').length;
  const totalPaid      = invoices.filter((i) => i.status === 'paid').reduce((a, i) => a + i.amount, 0);
  const conversionRate = enquiries.length > 0 ? Math.round((booked / enquiries.length) * 100) : 0;

  const revMonths = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const label = d.toLocaleString('en-AU', { month: 'short' });
    const val = invoices
      .filter((inv) => inv.status === 'paid' && inv.doctype === 'invoice')
      .filter((inv) => { const id = new Date(inv.date); return id.getMonth() === d.getMonth() && id.getFullYear() === d.getFullYear(); })
      .reduce((a, inv) => a + inv.amount, 0);
    return { label, val };
  });
  const maxRev = Math.max(...revMonths.map((m) => m.val), 1);

  const upcoming = enquiries
    .filter((e) => e.scheduledDate && new Date(e.scheduledDate) >= now)
    .sort((a, b) => new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-3">

      {/* ══════════════════════════
          DESKTOP
      ══════════════════════════ */}
      <div className="hidden lg:flex lg:gap-3 lg:items-stretch">

        {/* ── LEFT COLUMN ── 220px wide, tight gap */}
        <div className="flex flex-col gap-2.5" style={{ width: 320, minWidth: 320 }}>

          {/* Revenue */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 border-2 border-slate-900 shadow-[4px_4px_0_0_#FFD60A] p-4">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg,#FFD60A 0px,#FFD60A 1px,transparent 1px,transparent 10px)' }} />
            <div className="relative z-10">
              <div className="text-[9px] tracking-[0.3em] uppercase text-yellow-400/60 font-bold mb-1">Total revenue</div>
              <div className="font-black text-2xl text-white leading-none">${totalPaid.toLocaleString()}</div>
              <div className="text-white/30 text-[10px] font-bold mt-1">Paid · all time</div>
            </div>
            <div className="absolute bottom-0 right-2 text-yellow-400/10 font-black text-5xl leading-none select-none pointer-events-none">$</div>
          </div>

          {/* Unread */}
          <div className={`relative overflow-hidden rounded-2xl border-2 p-4 transition-all ${
            unread > 0 ? 'bg-yellow-400 border-slate-900 shadow-[4px_4px_0_0_#0F172A]' : 'bg-white border-slate-200 shadow-[3px_3px_0_0_#E2E8F0]'
          }`}>
            <div className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1 text-slate-600">Unread</div>
            <div className={`font-black text-2xl leading-none ${unread > 0 ? 'text-slate-900' : 'text-slate-300'}`}>{unread}</div>
            <div className={`text-[10px] font-bold mt-1 ${unread > 0 ? 'text-slate-700' : 'text-slate-300'}`}>
              {unread > 0 ? 'Need attention' : 'All caught up'}
            </div>
            {unread > 0 && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-900 animate-pulse" />}
          </div>

          {/* Pipeline */}
          <div className="flex-1 bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#0F172A]">
            <div className="px-4 py-2.5 border-b border-slate-100">
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">◆ Pipeline</div>
            </div>
            <div className="p-3.5 space-y-2">
              {(Object.keys(PIPELINE_CONFIG) as PipelineStatus[]).map((s) => {
                const cfg   = PIPELINE_CONFIG[s];
                const count = enquiries.filter((e) => (e.status ?? 'new') === s).length;
                const val   = enquiries.filter((e) => (e.status ?? 'new') === s).reduce((a, e) => a + (e.jobValue ?? e.quoteDetails?.hi ?? 0), 0);
                const pct   = enquiries.length > 0 ? Math.round((count / enquiries.length) * 100) : 0;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                    <div className="w-11 text-xs font-black text-slate-600">{cfg.label}</div>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${cfg.dot}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs font-black text-slate-900 w-3 text-right">{count}</div>
                    {val > 0 ? <div className="text-[9px] font-black text-emerald-600 w-14 text-right">${val.toLocaleString()}</div> : <div className="w-14" />}
                  </div>
                );
              })}
              {enquiries.length === 0 && <div className="text-center py-1 text-slate-300 text-[10px] font-bold uppercase tracking-widest">No leads yet</div>}
            </div>
          </div>
        </div>

        {/* ── CENTRE HERO ── fills remaining space */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-2">

        {/* Welcome */}
<div className="text-center">
  <div className="text-[10px] tracking-[0.45em] uppercase text-[#00B8D9] font-bold mb-1">◆ Trident CRM</div>
  <div className="font-black text-slate-900 text-3xl leading-tight">Welcome back,</div>
  <div className="font-black text-5xl leading-none mb-3" style={{ color: '#00B8D9' }}>Sunny.</div>
  <div className="inline-block bg-slate-900 text-yellow-400 text-xs font-black px-6 py-3 rounded-full border-2 border-slate-900 shadow-[3px_3px_0_0_#FFD60A] tracking-widest uppercase">
    {now.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
  </div>
</div>

          {/* HUGE logo */}
<div className="relative flex items-center justify-center" style={{ width: 420, height: 420 }}>
  <style>{`
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.08); }
    }
    @keyframes glow-mid {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.12); }
    }
    @keyframes logo-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes ring-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes ring-spin-rev {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
  `}</style>

  {/* Outer pulsing glow */}
  <div className="absolute rounded-full" style={{
    inset: 0,
    background: 'radial-gradient(circle, rgba(0,184,217,0.28) 0%, rgba(0,184,217,0.1) 50%, transparent 72%)',
    filter: 'blur(24px)',
    animation: 'glow-pulse 3s ease-in-out infinite',
  }} />

  {/* Inner bright glow */}
  <div className="absolute rounded-full" style={{
    width: 280, height: 280,
    background: 'radial-gradient(circle, rgba(56,189,248,0.5) 0%, rgba(0,184,217,0.18) 50%, transparent 72%)',
    filter: 'blur(12px)',
    animation: 'glow-mid 3s ease-in-out infinite 0.5s',
  }} />

  {/* Rotating dashed ring */}
  <div className="absolute rounded-full" style={{
    width: 390, height: 390,
    border: '1px dashed rgba(0,184,217,0.25)',
    animation: 'ring-spin 12s linear infinite',
  }} />

  {/* Counter-rotating dotted ring */}
  <div className="absolute rounded-full" style={{
    width: 350, height: 350,
    border: '1px dotted rgba(0,184,217,0.15)',
    animation: 'ring-spin-rev 8s linear infinite',
  }} />

  {/* Floating logo */}
  <img
    src="/trident-logo.png"
    alt="Trident"
    style={{
      width: 380,
      height: 380,
      objectFit: 'contain',
      position: 'relative',
      zIndex: 10,
      filter: 'drop-shadow(0 0 40px rgba(0,184,217,0.9)) drop-shadow(0 0 80px rgba(0,184,217,0.45))',
      animation: 'logo-float 4s ease-in-out infinite',
    }}
  />
</div>
        </div>

        {/* ── RIGHT COLUMN ── 220px wide */}
        <div className="flex flex-col gap-2.5" style={{ width: 320, minWidth: 320 }}>

          {/* Booked */}
          <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-[3px_3px_0_0_#10b981] p-4">
            <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-1">Jobs booked</div>
            <div className="font-black text-2xl text-emerald-500 leading-none">{booked}</div>
            <div className="text-slate-400 text-[10px] font-bold mt-1">{conversionRate}% conversion</div>
          </div>

          {/* Pipeline value */}
          <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-[3px_3px_0_0_#00B8D9] p-4">
            <div className="text-[9px] tracking-[0.3em] uppercase text-slate-400 font-bold mb-1">Quote pipeline</div>
            <div className="font-black text-2xl text-[#00B8D9] leading-none">${totalQuote.toLocaleString()}</div>
            <div className="text-slate-400 text-[10px] font-bold mt-1">Potential value</div>
          </div>

          {/* Upcoming */}
          <div className="flex-1 bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#FFD60A]">
            <div className="px-4 py-2.5 border-b border-slate-100">
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">◆ Upcoming jobs</div>
            </div>
            {upcoming.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-24 gap-2 text-center px-4">
                <CalendarDays className="w-5 h-5 text-slate-200" />
                <div className="text-slate-400 text-xs font-bold">No jobs scheduled</div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {upcoming.map((e) => {
                  const d = new Date(e.scheduledDate!);
                  const isToday = d.toDateString() === now.toDateString();
                  return (
                    <button key={e.id} onClick={() => onSelectEnquiry(e)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left group">
                      <div className={`w-9 h-9 rounded-xl border-2 flex flex-col items-center justify-center shrink-0 ${
                        isToday ? 'bg-yellow-400 border-slate-900' : 'bg-slate-900 border-slate-900'
                      }`}>
                        <div className={`font-black text-xs leading-none ${isToday ? 'text-slate-900' : 'text-yellow-400'}`}>{d.getDate()}</div>
                        <div className={`text-[7px] uppercase ${isToday ? 'text-slate-700' : 'text-white/50'}`}>{d.toLocaleString('en-AU', { month: 'short' })}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-slate-900 text-xs truncate">{e.name}</div>
                        <div className="text-slate-400 text-[10px] flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 shrink-0" />{e.suburb}</div>
                      </div>
                      {isToday && <span className="text-[7px] font-black bg-yellow-400 text-slate-900 px-1.5 py-0.5 rounded-full border border-slate-900 shrink-0">TODAY</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          MOBILE
      ══════════════════════════ */}
      <div className="lg:hidden space-y-3">

        {/* Hero — same as desktop centre */}
<div className="flex flex-col items-center gap-3 py-4">
  <div className="text-center">
    <div className="text-[10px] tracking-[0.45em] uppercase text-[#00B8D9] font-bold mb-1">◆ Trident CRM</div>
    <div className="font-black text-slate-900 text-3xl leading-tight">Welcome back,</div>
    <div className="font-black text-5xl leading-none mb-3" style={{ color: '#00B8D9' }}>Sunny.</div>
    <div className="inline-block bg-slate-900 text-yellow-400 text-xs font-black px-6 py-3 rounded-full border-2 border-slate-900 shadow-[3px_3px_0_0_#FFD60A] tracking-widest uppercase">
      {now.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
    </div>
  </div>

  <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
    <style>{`
      @keyframes glow-pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
      @keyframes glow-mid   { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.12)} }
      @keyframes logo-float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
      @keyframes ring-spin     { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
      @keyframes ring-spin-rev { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
    `}</style>
    <div className="absolute rounded-full" style={{ inset:0, background:'radial-gradient(circle,rgba(0,184,217,0.28) 0%,rgba(0,184,217,0.1) 50%,transparent 72%)', filter:'blur(20px)', animation:'glow-pulse 3s ease-in-out infinite' }} />
    <div className="absolute rounded-full" style={{ width:200,height:200, background:'radial-gradient(circle,rgba(56,189,248,0.5) 0%,rgba(0,184,217,0.18) 50%,transparent 72%)', filter:'blur(10px)', animation:'glow-mid 3s ease-in-out infinite 0.5s' }} />
    <div className="absolute rounded-full" style={{ width:280,height:280, border:'1px dashed rgba(0,184,217,0.25)', animation:'ring-spin 12s linear infinite' }} />
    <div className="absolute rounded-full" style={{ width:255,height:255, border:'1px dotted rgba(0,184,217,0.15)', animation:'ring-spin-rev 8s linear infinite' }} />
    <img src="/trident-logo.png" alt="Trident" style={{ width:270, height:270, objectFit:'contain', position:'relative', zIndex:10, filter:'drop-shadow(0 0 30px rgba(0,184,217,0.9)) drop-shadow(0 0 60px rgba(0,184,217,0.45))', animation:'logo-float 4s ease-in-out infinite' }} />
  </div>
</div>

        {/* 2×2 stats */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-[3px_3px_0_0_#E2E8F0] p-4">
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400 font-bold mb-1">Revenue</div>
            <div className="font-black text-2xl text-slate-900 leading-none">${totalPaid.toLocaleString()}</div>
            <div className="text-slate-400 text-[9px] font-bold mt-0.5">All time</div>
          </div>
          <div className={`relative overflow-hidden rounded-2xl border-2 p-4 ${
            unread > 0 ? 'bg-yellow-400 border-slate-900 shadow-[3px_3px_0_0_#0F172A]' : 'bg-white border-slate-200 shadow-[3px_3px_0_0_#E2E8F0]'
          }`}>
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-600 font-bold mb-1">Unread</div>
            <div className={`font-black text-2xl leading-none ${unread > 0 ? 'text-slate-900' : 'text-slate-300'}`}>{unread}</div>
            <div className={`text-[9px] font-bold mt-0.5 ${unread > 0 ? 'text-slate-700' : 'text-slate-300'}`}>
              {unread > 0 ? 'Need attention' : 'All caught up'}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-[3px_3px_0_0_#10b981] p-4">
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400 font-bold mb-1">Booked</div>
            <div className="font-black text-2xl text-emerald-500 leading-none">{booked}</div>
            <div className="text-slate-400 text-[9px] font-bold mt-0.5">{conversionRate}% conversion</div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 shadow-[3px_3px_0_0_#00B8D9] p-4">
            <div className="text-[9px] tracking-[0.25em] uppercase text-slate-400 font-bold mb-1">Pipeline</div>
            <div className="font-black text-2xl text-[#00B8D9] leading-none">${totalQuote.toLocaleString()}</div>
            <div className="text-slate-400 text-[9px] font-bold mt-0.5">Potential value</div>
          </div>
        </div>

        {/* Pipeline bars */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#0F172A]">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">◆ Pipeline</div>
          </div>
          <div className="p-3.5 space-y-2">
            {(Object.keys(PIPELINE_CONFIG) as PipelineStatus[]).map((s) => {
              const cfg   = PIPELINE_CONFIG[s];
              const count = enquiries.filter((e) => (e.status ?? 'new') === s).length;
              const pct   = enquiries.length > 0 ? Math.round((count / enquiries.length) * 100) : 0;
              return (
                <div key={s} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                  <div className="w-11 text-xs font-black text-slate-600">{cfg.label}</div>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${cfg.dot}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs font-black text-slate-900 w-3 text-right">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0_0_#FFD60A]">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <div className="text-[9px] tracking-[0.3em] uppercase text-[#00B8D9] font-bold">◆ Upcoming jobs</div>
          </div>
          {upcoming.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
              <CalendarDays className="w-6 h-6 text-slate-200" />
              <div className="text-slate-400 text-xs font-bold">No jobs scheduled</div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcoming.map((e) => {
                const d = new Date(e.scheduledDate!);
                const isToday = d.toDateString() === now.toDateString();
                return (
                  <button key={e.id} onClick={() => onSelectEnquiry(e)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left">
                    <div className={`w-10 h-10 rounded-xl border-2 flex flex-col items-center justify-center shrink-0 ${
                      isToday ? 'bg-yellow-400 border-slate-900' : 'bg-slate-900 border-slate-900'
                    }`}>
                      <div className={`font-black text-xs leading-none ${isToday ? 'text-slate-900' : 'text-yellow-400'}`}>{d.getDate()}</div>
                      <div className={`text-[8px] uppercase ${isToday ? 'text-slate-700' : 'text-white/50'}`}>{d.toLocaleString('en-AU', { month: 'short' })}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-slate-900 text-sm truncate">{e.name}</div>
                      <div className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{e.suburb}</div>
                    </div>
                    {isToday && <span className="text-[8px] font-black bg-yellow-400 text-slate-900 px-1.5 py-0.5 rounded-full border border-slate-900">TODAY</span>}
                    {e.status && <StatusBadge status={e.status} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CRM ─────────────────────────────────────────────────────────────────
function CRM() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<Enquiry | null>(null);
  const [section, setSection]     = useState<NavSection>('dashboard');
  const [search, setSearch]       = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'contact' | 'filth' | 'unread'>('all');
  const [showSearch, setShowSearch] = useState(false);

  const defaultInvoices: Invoice[] = [
    { id: '1', doctype: 'invoice', num: 'INV-001', client: 'Sample Client', description: 'Driveway pressure wash', amount: 480, status: 'paid', date: '2025-05-01' },
    { id: '2', doctype: 'quote',   num: 'QTE-001', client: 'Another Client', description: 'House exterior + roof', amount: 950, status: 'pending', date: '2025-05-05' },
  ];

  // Invoices lifted here so Dashboard can read them
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadInvoices() ?? defaultInvoices);

  // Persist invoices to localStorage whenever they change
  useEffect(() => { saveInvoices(invoices); }, [invoices]);

  // Load invoices from Supabase on mount (overrides localStorage if data exists)
  useEffect(() => {
    sb.getInvoices().then((data) => { if (Array.isArray(data) && data.length) setInvoices(data); });
  }, []);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact?code=${PASSCODE}`);
      const data = await res.json();
      const raw: any[] = data.enquiries ?? [];
      const meta = await sb.getMeta(raw.map((e) => e.id));
      setEnquiries(raw.map((e) => ({
  ...e,
  createdAt: e.createdAt ?? e.created_at,
  status: (meta[e.id]?.status ?? 'new') as PipelineStatus,
  notes: meta[e.id]?.notes ?? '',
  jobValue: meta[e.id]?.job_value ?? undefined,
  scheduledDate: meta[e.id]?.scheduled_date ?? undefined,
})));
    } catch {
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  fetchEnquiries();
  const interval = setInterval(fetchEnquiries, 30000);
  return () => clearInterval(interval);
}, [fetchEnquiries]);

  const markRead = useCallback(async (id: string) => {
    await fetch(`/api/contact?code=${PASSCODE}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
    saveOverride(id, { read: true });
    setEnquiries((prev) => prev.map((x) => x.id === id ? { ...x, read: true } : x));
  }, []);

  const handleSelect = async (e: Enquiry) => {
    if (!e.read) await markRead(e.id);
    setSelected({ ...e, read: true });
  };

  const handleStatusChange = (id: string, status: PipelineStatus) => {
    sb.upsertMeta(id, { status });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
    setSelected((prev) => prev?.id === id ? { ...prev, status } : prev);
  };

  const handleNoteSave = (id: string, notes: string) => {
    sb.upsertMeta(id, { notes });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, notes } : e));
    setSelected((prev) => prev?.id === id ? { ...prev, notes } : prev);
  };

  const handleJobValueSave = (id: string, jobValue: number) => {
    sb.upsertMeta(id, { job_value: jobValue });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, jobValue } : e));
    setSelected((prev) => prev?.id === id ? { ...prev, jobValue } : prev);
  };

  const handleScheduleDateSave = (id: string, scheduledDate: string) => {
    sb.upsertMeta(id, { scheduled_date: scheduledDate });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, scheduledDate } : e));
    setSelected((prev) => prev?.id === id ? { ...prev, scheduledDate } : prev);
  };

  const unread = enquiries.filter((e) => !e.read).length;

  const filteredEnquiries = useMemo(() => {
    let list = enquiries;
    if (typeFilter === 'contact') list = list.filter((e) => e.type === 'contact');
    else if (typeFilter === 'filth') list = list.filter((e) => e.type === 'filth');
    else if (typeFilter === 'unread') list = list.filter((e) => !e.read);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((e) =>
        e.name.toLowerCase().includes(q) ||
        e.suburb.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q) ||
        e.phone.includes(q)
      );
    }
    return list;
  }, [enquiries, typeFilter, search]);

  // Detail view
 if (selected) {
  return (
    <AnimatePresence>
      <>
        {/* Desktop modal overlay */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="hidden lg:fixed lg:flex lg:inset-0 lg:z-50 lg:items-center lg:justify-center lg:p-8"
        style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-slate-900 bg-white shadow-2xl"
        >
          <EnquiryDetail
            e={selected}
            onBack={() => setSelected(null)}
            onStatusChange={handleStatusChange}
            onNoteSave={handleNoteSave}
            onJobValueSave={handleJobValueSave}
            onScheduleDateSave={handleScheduleDateSave}
          />
        </motion.div>
      </motion.div>

      {/* Mobile full page (unchanged) */}
      <div className="lg:hidden">
        <EnquiryDetail
          e={selected}
          onBack={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onNoteSave={handleNoteSave}
          onJobValueSave={handleJobValueSave}
          onScheduleDateSave={handleScheduleDateSave}
        />
      </div>
      </>
    </AnimatePresence>
  );
}

  const sectionTitles: Record<NavSection, string> = {
    dashboard: 'Dashboard',
    pipeline:  'Pipeline',
    enquiries: 'Enquiries',
    calendar:  'Calendar',
    invoices:  'Invoices & Quotes',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b-2 border-slate-200 px-4 py-3 flex items-center gap-3">
        <div className="font-black text-slate-900 text-base flex-1">{sectionTitles[section]}</div>

        {(section === 'enquiries' || section === 'pipeline') && (
          <>
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-yellow-400 transition-colors w-44"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => { setShowSearch((v) => !v); if (showSearch) setSearch(''); }}
              className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all ${showSearch ? 'bg-slate-900 border-slate-900' : 'bg-slate-100 border-slate-200'}`}
            >
              <Search className={`w-4 h-4 ${showSearch ? 'text-yellow-400' : 'text-slate-700'}`} />
            </button>
          </>
        )}

        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button
              onClick={() => { setSection('enquiries'); setTypeFilter('unread'); }}
              className="bg-yellow-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-slate-900 tracking-widest uppercase shadow-[2px_2px_0_0_#0F172A]"
            >
              {unread} new
            </button>
          )}
          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="w-9 h-9 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center active:scale-95 transition-transform"
          >
            <RefreshCw className={`w-4 h-4 text-slate-700 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <HazardStripe className="h-1.5" />

      {/* Content */}
      <div className="flex-1 p-4 lg:p-6 pb-28 overflow-y-auto">

        {section === 'dashboard' && (
          <DashboardOverview enquiries={enquiries} invoices={invoices} onSelectEnquiry={handleSelect} />
        )}

        {section === 'pipeline' && (
  <PipelineBoard enquiries={filteredEnquiries} onSelect={handleSelect} search={search} onRefresh={fetchEnquiries} />
)}

        {section === 'enquiries' && (
          <div>
            <div className="grid grid-cols-3 bg-white border-2 border-slate-200 rounded-2xl mb-4 overflow-hidden">
              {[
                { label: 'Total',  value: enquiries.length,           color: 'text-slate-900' },
                { label: 'Unread', value: unread,                     color: 'text-yellow-500' },
                { label: 'Read',   value: enquiries.length - unread,  color: 'text-emerald-600' },
              ].map((s, i) => (
                <div key={i} className={`py-4 text-center ${i < 2 ? 'border-r-2 border-slate-200' : ''}`}>
                  <div className={`font-black text-2xl leading-none ${s.color}`}>{s.value}</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              {([
                { id: 'all',     label: 'All' },
                { id: 'contact', label: 'Contact' },
                { id: 'filth',   label: 'Quotes' },
                { id: 'unread',  label: 'Unread' },
              ] as const).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTypeFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black border-2 transition-all ${
                    typeFilter === f.id
                      ? 'bg-slate-900 border-slate-900 text-yellow-400'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {f.label}
                  {f.id === 'unread' && unread > 0 && (
                    <span className="ml-1 bg-yellow-400 text-slate-900 text-[8px] px-1 rounded-full">{unread}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="text-[10px] tracking-[0.35em] uppercase text-[#00B8D9] font-bold mb-3">
              ◆ {typeFilter === 'contact' ? 'Contact enquiries' : typeFilter === 'filth' ? 'Quote requests' : typeFilter === 'unread' ? 'Unread enquiries' : 'All enquiries'} · newest first
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
                <div className="text-slate-400 text-sm font-bold">Loading…</div>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-[3px_3px_0_0_#E2E8F0]">
                  <Inbox className="w-7 h-7 text-slate-400" />
                </div>
                <div className="text-slate-900 font-black text-xl">Nothing here</div>
                <div className="text-slate-400 text-sm max-w-xs">
                  {search ? `No results for "${search}"` : "When enquiries come in they'll appear here."}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEnquiries.map((e, i) => (
                  <EnquiryCard key={e.id} e={e} idx={i} onSelect={() => handleSelect(e)} />
                ))}
              </div>
            )}
          </div>
        )}

        {section === 'calendar' && (
          <CalendarView enquiries={enquiries} onSelectEnquiry={handleSelect} />
        )}

        {section === 'invoices' && (
  <InvoicesView invoices={invoices} setInvoices={setInvoices} enquiries={enquiries} />
)}
      </div>

      <HazardStripe className="h-2" />

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-slate-200/80 md:bottom-5 md:border-0 md:bg-transparent md:backdrop-blur-none transition-all">
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-around px-2 pb-safe">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className="relative flex flex-col items-center gap-1 px-3 py-3 min-w-[60px]"
            >
              <div className={`relative flex items-center justify-center w-10 h-6 rounded-full transition-all ${section === id ? 'bg-slate-900' : ''}`}>
                <Icon className={`w-5 h-5 transition-colors ${section === id ? 'text-yellow-400' : 'text-slate-400'}`} strokeWidth={section === id ? 2.5 : 2} />
                {id === 'enquiries' && unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 border border-slate-900 text-slate-900 text-[8px] font-black rounded-full flex items-center justify-center">{unread}</span>
                )}
              </div>
              <span className={`text-[10px] font-bold ${section === id ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
            </button>
          ))}
        </div>

        {/* Desktop dock */}
        <div className="hidden md:flex justify-center">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = section === id;
              return (
                <button
                  key={id}
                  onClick={() => setSection(id)}
                  className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all group hover:bg-slate-100"
                >
                  <div className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all ${active ? 'bg-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'group-hover:bg-slate-100'}`}>
                    <Icon className={`w-5 h-5 transition-colors ${active ? 'text-yellow-400' : 'text-slate-500 group-hover:text-slate-700'}`} strokeWidth={active ? 2.5 : 2} />
                    {id === 'enquiries' && unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 border border-slate-900 text-slate-900 text-[8px] font-black rounded-full flex items-center justify-center">{unread}</span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold leading-none transition-colors ${active ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function CRMPage() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <LockScreen onUnlock={() => setAuthed(true)} />;
  return <CRM />;
}