'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── tiny hook: fires once when el enters viewport ───────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`trident-faq-item ${open ? 'open' : ''}`}>
      <button className="trident-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="trident-faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="trident-faq-a">{a}</p>}
    </div>
  );
}

// ─── Process step card ────────────────────────────────────────────────────────
function ProcessCard({ step, title, desc, duration, index, visible }: {
  step: string; title: string; desc: string; duration?: string; index: number; visible: boolean;
}) {
  return (
    <div className="trident-process-card"
         style={{
           opacity: visible ? 1 : 0,
           transform: visible ? 'translateY(0)' : 'translateY(32px)',
           transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
         }}>
      <div className="trident-process-num">{step}</div>
      <div className="trident-process-body">
        <div className="trident-process-title">{title}</div>
        {duration && <div className="trident-process-duration">{duration}</div>}
        <p className="trident-process-desc">{desc}</p>
      </div>
    </div>
  );
}

// ─── Result row ───────────────────────────────────────────────────────────────
function ResultRow({ text, index, visible }: { text: string; index: number; visible: boolean }) {
  return (
    <div className="trident-result-row"
         style={{
           opacity: visible ? 1 : 0,
           transform: visible ? 'translateX(0)' : 'translateX(-20px)',
           transition: `opacity 0.45s ease ${index * 55}ms, transform 0.45s ease ${index * 55}ms`,
         }}>
      <span className="trident-tick">✓</span>
      <span>{text}</span>
    </div>
  );
}

// ─── Surface tag ─────────────────────────────────────────────────────────────
function SurfaceTag({ label }: { label: string }) {
  return <span className="trident-surface-tag">{label}</span>;
}

// ─── Warning row ─────────────────────────────────────────────────────────────
function WarningRow({ text }: { text: string }) {
  return (
    <div className="trident-warning-row">
      <span className="trident-warn-icon">⚠</span>
      <span>{text}</span>
    </div>
  );
}

// ─── Before / After card ──────────────────────────────────────────────────────
function BeforeAfterCard({ before, after }: { before: string; after: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="trident-ba-wrap" onClick={() => setFlipped(f => !f)}>
      <div className={`trident-ba-card ${flipped ? 'flipped' : ''}`}>
        <div className="trident-ba-front">
          <div className="trident-ba-label before">BEFORE</div>
          <p>{before}</p>
          <span className="trident-ba-hint">tap to flip →</span>
        </div>
        <div className="trident-ba-back">
          <div className="trident-ba-label after">AFTER</div>
          <p>{after}</p>
          <span className="trident-ba-hint">← tap to flip</span>
        </div>
      </div>
    </div>
  );
}

// ─── Why Us card ──────────────────────────────────────────────────────────────
function WhyCard({ title, desc, index, visible }: {
  title: string; desc: string; index: number; visible: boolean;
}) {
  return (
    <div className="trident-why-card"
         style={{
           opacity: visible ? 1 : 0,
           transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
           transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s ease ${index * 90}ms`,
         }}>
      <div className="trident-why-num">{String(index + 1).padStart(2, '0')}</div>
      <div className="trident-why-title">{title}</div>
      <p className="trident-why-desc">{desc}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ServicePageRedesign({ service }: { service: any }) {
  const [processRef, processVisible] = useInView();
  const [resultsRef, resultsVisible] = useInView();
  const [whyRef, whyVisible] = useInView();
  const [surfacesRef, surfacesVisible] = useInView();

  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <main className="trident-sp">

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: '#FFD60A' }}>
          {/* black diagonal hazard stripes */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(0,0,0,0.08) 0px,rgba(0,0,0,0.08) 10px,transparent 10px,transparent 24px)' }}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-black/50 text-sm font-bold mb-8 hover:text-black transition-colors"
            >
              ← All services
            </Link>

            <div className="text-[11px] tracking-[0.4em] uppercase text-black/60 font-bold mb-4">
              From {service.from !== 'POA' ? `$${service.from}` : 'POA'}
              {service.unit ? `/${service.unit}` : ''}
            </div>

            {service.badge && (
              <div className="inline-block bg-black text-yellow-400 text-[11px] font-black tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5">
                {service.badge}
              </div>
            )}

            <h1
              className="font-display font-black text-black text-5xl sm:text-7xl leading-none mb-4"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              {service.title}
            </h1>

            <p
              className="text-black/60 text-xl max-w-xl leading-relaxed mb-4"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s',
              }}
            >
              {service.tagline}
            </p>

            <p
              className="text-black/70 text-base max-w-xl leading-relaxed mb-10"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s',
              }}
            >
              {service.description}
            </p>

            <div
              className="flex gap-4 flex-wrap"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.34s, transform 0.7s ease 0.34s',
              }}
            >
              <Link
                href="/#free-quote"
                className="bg-black text-yellow-400 font-black px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] transition-all text-sm uppercase tracking-widest"
              >
                Get a free quote
              </Link>
              <a
                href="tel:+61430423564"
                className="border-2 border-black/30 text-black font-black px-8 py-4 rounded-xl hover:border-black/60 hover:bg-black/5 transition-all text-sm uppercase tracking-widest"
              >
                0430 423 564
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════ LONG DESCRIPTION ══════════════════ */}
        {service.longDescription && (
          <section className="trident-long-desc">
            <div className="trident-long-inner">
              <div className="trident-eyebrow">Overview</div>
              <div className="trident-long-text">
                {service.longDescription.trim().split('\n\n').map((para: string, i: number) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ SURFACES + WARNINGS ══════════════════ */}
        <section className="trident-surfaces-section" ref={surfacesRef as any}>
          <div className="trident-section-inner">
            <div className="trident-sw-grid">
              <div>
                <div className="trident-eyebrow cyan">Surfaces we clean</div>
                <h2 className="trident-section-h2">What we work on.</h2>
                <div className={`trident-surface-tags ${surfacesVisible ? 'ready' : ''}`}>
                  {service.surfaces.map((s: string, i: number) => (
                    <SurfaceTag key={i} label={s} />
                  ))}
                </div>
              </div>

              {service.warnings?.length > 0 && (
                <div className="trident-warnings-box">
                  <div className="trident-warnings-title">Good to know</div>
                  {service.warnings.map((w: string, i: number) => (
                    <WarningRow key={i} text={w} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════ PROCESS ══════════════════ */}
        <section className="trident-process-section" ref={processRef as any}>
          <div className="trident-section-inner">
            <div className="trident-eyebrow">The process</div>
            <h2 className="trident-section-h2">How we do it.</h2>
            <div className="trident-process-grid">
              {service.process.map((p: any, i: number) => (
                <ProcessCard key={p.step} {...p} index={i} visible={processVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ RESULTS ══════════════════ */}
        <section className="trident-results-section" ref={resultsRef as any}>
          <div className="trident-section-inner">
            <div className="trident-eyebrow cyan">What you get</div>
            <h2 className="trident-section-h2 light">The result.</h2>
            <div className="trident-results-grid">
              {service.results.map((r: string, i: number) => (
                <ResultRow key={i} text={r} index={i} visible={resultsVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ BEFORE / AFTER ══════════════════ */}
        {service.beforeAfter?.length > 0 && (
          <section className="trident-ba-section">
            <div className="trident-section-inner">
              <div className="trident-eyebrow">Transformations</div>
              <h2 className="trident-section-h2">Before &amp; after.</h2>
              <p className="trident-ba-hint-global">Tap a card to reveal the result</p>
              <div className="trident-ba-row">
                {service.beforeAfter.map((ba: any, i: number) => (
                  <BeforeAfterCard key={i} {...ba} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ WHY US ══════════════════ */}
        {service.whyUs?.length > 0 && (
          <section className="trident-why-section" ref={whyRef as any}>
            <div className="trident-section-inner">
              <div className="trident-eyebrow cyan">Why Trident</div>
              <h2 className="trident-section-h2 light">The difference.</h2>
              <div className="trident-why-grid">
                {service.whyUs.map((w: any, i: number) => (
                  <WhyCard key={i} {...w} index={i} visible={whyVisible} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ FAQs ══════════════════ */}
        <section className="trident-faq-section">
          <div className="trident-section-inner trident-faq-inner">
            <div>
              <div className="trident-eyebrow">Questions</div>
              <h2 className="trident-section-h2">Common questions.</h2>
              <p className="trident-faq-sub">
                Can't find your answer? Call us — we'll give you a straight answer.
              </p>
              <a
                href="tel:+61430423564"
                className="trident-btn-primary"
                style={{ display: 'inline-flex', marginTop: '1.5rem' }}
              >
                📞 Call now
              </a>
            </div>
            <div className="trident-faq-list">
              {service.faqs.map((f: any, i: number) => (
                <FaqItem key={i} q={f.q} a={f.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ RELATED SERVICES ══════════════════ */}
        {service.relatedSlugs?.length > 0 && (
          <section className="trident-related-section">
            <div className="trident-section-inner">
              <div className="trident-eyebrow">Also popular</div>
              <h2 className="trident-section-h2">Related services.</h2>
              <div className="trident-related-row">
                {service.relatedSlugs.map((slug: string) => (
                  <Link key={slug} href={`/services/${slug}`} className="trident-related-chip">
                    {slug.replace(/-/g, ' ')}
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ CTA ══════════════════ */}
<section className="py-20 px-6 relative overflow-hidden" style={{ background: '#FFD60A' }}>
  {/* same black diagonal stripes as hero */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(0,0,0,0.08) 0px,rgba(0,0,0,0.08) 10px,transparent 10px,transparent 24px)' }}
  />
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <div className="text-[11px] tracking-[0.4em] uppercase text-black/50 font-bold mb-4">Ready?</div>
    <h2 className="font-display font-black text-black text-5xl mb-6">Get a free quote.</h2>
    <p className="text-black/60 mb-10 max-w-md mx-auto">
      Send a couple of photos and we'll send back a fixed price — same day.
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        href="/#free-quote"
        className="inline-block bg-black text-yellow-400 font-black px-10 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] transition-all text-sm uppercase tracking-widest"
      >
        Get my free quote
      </Link>
      <a
        href="tel:+61430423564"
        className="border-2 border-black/30 text-black font-black px-10 py-5 rounded-xl hover:border-black/60 hover:bg-black/5 transition-all text-sm uppercase tracking-widest"
      >
        📞 0430 423 564
      </a>
    </div>
  </div>
</section>

      </main>
    </>
  );
}

// ─── ALL STYLES ───────────────────────────────────────────────────────────────
const CSS = `
.trident-sp {
  --ink:   #0D1F2D;
  --ink2:  #112233;
  --cyan:  #00B8D9;
  --yellow:#FFD60A;
  --slate: #F1F5F9;
  --muted: #64748B;
  --white: #FFFFFF;
  --border:#E2E8F0;
  --radius:1rem;
  --shadow-y: 4px 4px 0 0 var(--yellow);
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  color: var(--ink);
  background: var(--white);
  overflow-x: hidden;
}

.trident-section-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.trident-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-weight: 800;
  color: var(--yellow);
  margin-bottom: 0.6rem;
}
.trident-eyebrow.cyan { color: var(--cyan); }
.trident-section-h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--ink);
  margin: 0 0 2.5rem;
}
.trident-section-h2.light { color: var(--white); }

/* buttons */
.trident-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--yellow);
  color: var(--ink);
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: 2px solid var(--ink);
  box-shadow: var(--shadow-y);
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
}
.trident-btn-primary:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 var(--yellow);
}

/* LONG DESC */
.trident-long-desc {
  padding: 5rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.trident-long-inner {
  max-width: 760px;
  margin: 0 auto;
}
.trident-long-text p {
  font-size: 1.05rem;
  color: #374151;
  line-height: 1.8;
  margin-bottom: 1.4rem;
}
.trident-long-text p:last-child { margin-bottom: 0; }

/* SURFACES */
.trident-surfaces-section {
  padding: 5rem 1.5rem;
  background: var(--slate);
  border-bottom: 1px solid var(--border);
}
.trident-sw-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 720px) {
  .trident-sw-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
.trident-surface-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
.trident-surface-tag {
  display: inline-block;
  background: var(--white);
  border: 2px solid var(--border);
  color: var(--ink);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 0.9rem;
  border-radius: 100px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, background 0.2s;
}
.trident-surface-tag:hover { border-color: var(--cyan); background: rgba(0,184,217,0.05); }
.trident-surface-tags.ready .trident-surface-tag { opacity: 1; transform: translateY(0); }
.trident-surface-tags.ready .trident-surface-tag:nth-child(1) { transition-delay: 0ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(2) { transition-delay: 50ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(3) { transition-delay: 100ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(4) { transition-delay: 150ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(5) { transition-delay: 200ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(6) { transition-delay: 250ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(7) { transition-delay: 300ms; }
.trident-surface-tags.ready .trident-surface-tag:nth-child(8) { transition-delay: 350ms; }

.trident-warnings-box {
  background: var(--white);
  border: 2px solid #FDE68A;
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 3px 3px 0 0 #FCD34D;
}
.trident-warnings-title {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 900;
  color: #92400E;
  margin-bottom: 1rem;
}
.trident-warning-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.85rem;
  font-size: 0.85rem;
  color: #78350F;
  line-height: 1.5;
}
.trident-warning-row:last-child { margin-bottom: 0; }
.trident-warn-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 0.05rem; }

/* PROCESS */
.trident-process-section {
  padding: 5rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.trident-process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}
.trident-process-card {
  display: flex;
  gap: 1.25rem;
  background: var(--slate);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.trident-process-card:hover {
  border-color: var(--cyan);
  box-shadow: 3px 3px 0 0 var(--cyan);
}
.trident-process-num {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  font-weight: 900;
  color: var(--yellow);
  flex-shrink: 0;
  padding-top: 0.1rem;
  min-width: 2rem;
}
.trident-process-body { flex: 1; }
.trident-process-title {
  font-weight: 900;
  font-size: 0.95rem;
  color: var(--ink);
  margin-bottom: 0.3rem;
}
.trident-process-duration {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}
.trident-process-desc {
  font-size: 0.83rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
}

/* RESULTS */
.trident-results-section {
  padding: 5rem 1.5rem;
  background: var(--ink);
  position: relative;
  overflow: hidden;
}
.trident-results-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 18px,
    rgba(0,184,217,0.03) 18px,
    rgba(0,184,217,0.03) 20px
  );
  pointer-events: none;
}
.trident-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.85rem;
}
.trident-result-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  transition: background 0.2s, border-color 0.2s;
}
.trident-result-row:hover {
  background: rgba(0,184,217,0.08);
  border-color: rgba(0,184,217,0.3);
}
.trident-tick {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--yellow);
  border: 2px solid var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 900;
  color: var(--ink);
  flex-shrink: 0;
}

/* BEFORE / AFTER */
.trident-ba-section {
  padding: 5rem 1.5rem;
  background: var(--slate);
  border-bottom: 1px solid var(--border);
}
.trident-ba-hint-global {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 2rem;
  margin-top: -1.5rem;
}
.trident-ba-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.trident-ba-wrap {
  height: 220px;
  perspective: 1000px;
  cursor: pointer;
}
.trident-ba-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  border-radius: var(--radius);
}
.trident-ba-card.flipped { transform: rotateY(180deg); }
.trident-ba-front,
.trident-ba-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 2px solid var(--border);
}
.trident-ba-front {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: rgba(255,255,255,0.7);
}
.trident-ba-back {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
  color: rgba(255,255,255,0.85);
  transform: rotateY(180deg);
}
.trident-ba-label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
  display: inline-block;
  width: fit-content;
}
.trident-ba-label.before { background: rgba(255,214,10,0.15); color: var(--yellow); }
.trident-ba-label.after  { background: rgba(52,211,153,0.15); color: #34D399; }
.trident-ba-front p,
.trident-ba-back p { font-size: 0.88rem; line-height: 1.55; margin: 0 0 0.75rem; }
.trident-ba-hint { font-size: 0.7rem; opacity: 0.4; }

/* WHY US */
.trident-why-section {
  padding: 5rem 1.5rem;
  background: var(--ink2);
}
.trident-why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}
.trident-why-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  padding: 1.75rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s, background 0.25s;
}
.trident-why-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--cyan), var(--yellow));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.trident-why-card:hover::before { transform: scaleX(1); }
.trident-why-card:hover {
  border-color: rgba(0,184,217,0.25);
  background: rgba(0,184,217,0.05);
}
.trident-why-num {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  font-weight: 900;
  color: var(--cyan);
  margin-bottom: 0.85rem;
}
.trident-why-title {
  font-size: 1rem;
  font-weight: 900;
  color: var(--white);
  margin-bottom: 0.6rem;
}
.trident-why-desc {
  font-size: 0.84rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.65;
  margin: 0;
}

/* FAQs */
.trident-faq-section {
  padding: 5rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.trident-faq-inner {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 800px) {
  .trident-faq-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
.trident-faq-sub {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.6;
}
.trident-faq-list { display: flex; flex-direction: column; gap: 0.6rem; }
.trident-faq-item {
  border: 2px solid var(--border);
  border-radius: 0.85rem;
  overflow: hidden;
  background: var(--white);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.trident-faq-item.open {
  border-color: var(--cyan);
  box-shadow: 2px 2px 0 0 var(--cyan);
}
.trident-faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.4;
}
.trident-faq-icon {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--cyan);
  flex-shrink: 0;
  width: 1.2rem;
  text-align: center;
}
.trident-faq-a {
  padding: 0.9rem 1.25rem 1.1rem;
  font-size: 0.84rem;
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
  border-top: 1px solid var(--border);
}

/* RELATED */
.trident-related-section {
  padding: 4rem 1.5rem;
  background: var(--slate);
  border-bottom: 1px solid var(--border);
}
.trident-related-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.trident-related-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--white);
  border: 2px solid var(--border);
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 800;
  padding: 0.65rem 1.2rem;
  border-radius: 100px;
  text-decoration: none;
  text-transform: capitalize;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.trident-related-chip:hover {
  border-color: var(--yellow);
  box-shadow: 2px 2px 0 0 var(--yellow);
  background: #FEFCE8;
}

/* MOBILE */
@media (max-width: 640px) {
  .trident-process-grid { grid-template-columns: 1fr; }
  .trident-results-grid { grid-template-columns: 1fr; }
  .trident-why-grid { grid-template-columns: 1fr; }
  .trident-ba-row { grid-template-columns: 1fr; }
  .trident-ba-wrap { height: 240px; }
  .trident-long-desc,
  .trident-surfaces-section,
  .trident-process-section,
  .trident-results-section,
  .trident-ba-section,
  .trident-why-section,
  .trident-faq-section,
  .trident-related-section { padding-top: 3.5rem; padding-bottom: 3.5rem; }
}
`;