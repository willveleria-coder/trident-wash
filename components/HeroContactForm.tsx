'use client'

import { useState } from 'react'

const SERVICES = [
  'Driveway / Concrete',
  'Roof Cleaning',
  'House Wash',
  'Solar Panels',
  'Commercial',
  'Other',
]

export default function HeroContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    suburb: '',
    service: '',
    notes: '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg('Please add your name and phone number.')
      setStatus('error')
      return
    }
    if (!form.service && !form.notes.trim()) {
      setErrorMsg('Let us know what needs cleaning.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    // message is required by the API — always build something non-empty
    const message = [
      form.service ? `Service: ${form.service}` : null,
      form.notes.trim() || null,
    ]
      .filter(Boolean)
      .join('\n\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          name: form.name.trim(),
          phone: form.phone.trim(),
          suburb: form.suburb.trim() || undefined,
          message,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', phone: '', suburb: '', service: '', notes: '' })
    } catch {
      setErrorMsg('Something went wrong. Give us a call on 0430 423 564.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl border-2 border-[#0F1B2D] bg-white px-4 py-3 font-medium text-[#0F1B2D] placeholder-[#0F1B2D]/40 outline-none transition focus:border-[#29ABE2] focus:ring-4 focus:ring-[#29ABE2]/25'

  if (status === 'sent') {
    return (
      <div className="rounded-3xl border-4 border-[#0F1B2D] bg-white p-10 text-center shadow-[10px_10px_0_0_#0F1B2D]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0F1B2D] bg-[#FFD400] text-3xl font-black">
          ✓
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tight text-[#0F1B2D]">
          Request received
        </h3>
        <p className="mt-3 font-semibold text-[#0F1B2D]/70">
          We'll be in touch shortly — usually the same day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-bold uppercase tracking-wide text-[#29ABE2] underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border-4 border-[#0F1B2D] bg-white p-6 shadow-[10px_10px_0_0_#0F1B2D] sm:p-8">
      <div className="mb-6">
        <span className="inline-block rounded-full border-2 border-[#0F1B2D] bg-[#FFD400] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#0F1B2D]">
          Free · No obligation
        </span>
        <h3 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tight text-[#0F1B2D] sm:text-4xl">
          Get your quote
        </h3>
        <p className="mt-2 text-sm font-semibold text-[#0F1B2D]/60">
          Fixed price up front. Same-week start.
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputClass}
            style={{ fontSize: '16px' }}
            placeholder="Name *"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
          <input
            className={inputClass}
            style={{ fontSize: '16px' }}
            type="tel"
            inputMode="tel"
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>

        <input
          className={inputClass}
          style={{ fontSize: '16px' }}
          placeholder="Suburb"
          value={form.suburb}
          onChange={(e) => update('suburb', e.target.value)}
        />

        <select
          className={inputClass}
          style={{ fontSize: '16px' }}
          value={form.service}
          onChange={(e) => update('service', e.target.value)}
        >
          <option value="">What needs cleaning?</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <textarea
          className={`${inputClass} resize-none`}
          style={{ fontSize: '16px' }}
          rows={3}
          placeholder="Anything else we should know? (optional)"
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
        />

        {status === 'error' && (
          <p className="text-sm font-bold text-red-600">{errorMsg}</p>
        )}

        <button
          onClick={submit}
          disabled={status === 'sending'}
          className="w-full rounded-xl border-[3px] border-[#0F1B2D] bg-[#FFD400] px-6 py-4 text-lg font-black uppercase tracking-wide text-[#0F1B2D] shadow-[5px_5px_0_0_#0F1B2D] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send my request →'}
        </button>

        <p className="pt-1 text-center text-xs font-semibold text-[#0F1B2D]/50">
          Prefer to talk? Call{' '}
          <a href="tel:0430423564" className="underline underline-offset-2">
            0430 423 564
          </a>
        </p>
      </div>
    </div>
  )
}