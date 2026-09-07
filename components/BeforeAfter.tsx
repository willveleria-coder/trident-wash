'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Sparkles, MoveHorizontal } from 'lucide-react';

/* ─────────── data ─────────── */

type Panel =
  | {
      kind: 'video';
      id: string;
      eyebrow: string;
      title: string;
      accent: string;
      beforeSrc: string;
      afterSrc: string;
      beforePoster: string;
      afterPoster: string;
    }
  | {
      kind: 'slider';
      id: string;
      eyebrow: string;
      title: string;
      accent: string;
      before: string;
      after: string;
    };

const PANELS: Panel[] = [
  {
    kind: 'video',
    id: 'solar',
    eyebrow: 'Solar panels',
    title: 'Same panels.',
    accent: 'One afternoon apart.',
    beforeSrc: '/before-after/solar-before.mp4',
    afterSrc: '/before-after/solar-after.mp4',
    beforePoster: '/before-after/solar-before-poster.jpg',
    afterPoster: '/before-after/solar-after-poster.jpg',
  },
  {
    kind: 'slider',
    id: 'house',
    eyebrow: 'Entry & render',
    title: 'Drag it.',
    accent: "Don't take our word for it.",
    before: '/before-after/house-before.jpg',
    after: '/before-after/house-after.jpg',
  },
  {
    kind: 'slider',
    id: 'driveway',
    eyebrow: 'Driveway',
    title: 'Years of staining.',
    accent: 'Gone in an afternoon.',
    before: '/before-after/driveway-before.jpg',
    after: '/before-after/driveway-after.jpg',
  },
];

/* ─────────── helpers ─────────── */

function useIsMobile(query = '(max-width: 639px)') {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return is;
}

/* ─────────── section ─────────── */

export default function BeforeAfter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  useEffect(
    () =>
      smooth.on('change', (v) =>
        setActive(Math.min(PANELS.length - 1, Math.floor(v * PANELS.length)))
      ),
    [smooth]
  );

  return (
    <>
      <style>{`
                .ba-stack {
          --ba-h: min(56vh, 480px);
          --ba-gutter: 2rem;
        }
        @media (min-width: 640px) {
          .ba-stack { --ba-h: min(64vh, 620px); --ba-gutter: 4rem; }
        }
        @media (min-width: 1024px) {
          .ba-stack { --ba-h: min(68vh, 680px); }
        }

        /* 3:4 slider — fill the width, height follows */
        .ba-portrait {
          aspect-ratio: 3 / 4;
          width: min(calc(100vw - var(--ba-gutter)), calc(var(--ba-h) * 0.75));
          height: auto;
        }
        /* 9:16 single reel (mobile) — width leads so it isn't a sliver */
        .ba-reel {
          aspect-ratio: 9 / 16;
          width: calc(100vw - var(--ba-gutter));
          max-height: var(--ba-h);
          height: auto;
        }
        /* 9:16 side-by-side (desktop) */
        .ba-reel-pair {
          aspect-ratio: 9 / 16;
          width: min(calc(46vw - 1rem), calc(var(--ba-h) * 0.5625));
          height: auto;
        }
      `}</style>

      <div
        ref={wrapRef}
        className="relative bg-white"
        style={{ height: `${PANELS.length * 130}vh` }}
      >
        <div className="ba-stack sticky top-0 flex h-screen items-center justify-center overflow-hidden pt-12 sm:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(103,232,249,0.3) 0%, transparent 70%)',
            }}
          />

          {PANELS.map((panel, i) => (
            <Card
              key={panel.id}
              panel={panel}
              index={i}
              total={PANELS.length}
              progress={smooth}
              isActive={i === active}
            />
          ))}

          <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
            {PANELS.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full border-2 border-slate-900 transition-all duration-300 ${
                  i === active ? 'w-8 bg-yellow-400' : 'w-2 bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────── one stacked card ─────────── */

function Card({
  panel,
  index,
  total,
  progress,
  isActive,
}: {
  panel: Panel;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
}) {
  const isMobile = useIsMobile();

  const seg = 1 / total;
  const start = index * seg;
  const settled = start + seg * 0.2;   // arrives quickly
  const holdEnd = start + seg * 0.88;  // sits still for most of the segment
  const gone = start + seg * 0.99;     // clears just before the next settles

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const x = useTransform(
    progress,
    isFirst ? [0, 1] : [start, settled],
    isFirst ? ['0vw', '0vw'] : ['60vw', '0vw'],
    { clamp: true }
  );

  const opacity = useTransform(
    progress,
    isFirst
      ? [0, settled, holdEnd, gone]
      : isLast
      ? [start, settled, 1, 1]
      : [start, settled, holdEnd, gone],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
    { clamp: true }
  );

  const scale = useTransform(
    progress,
    isLast ? [start, settled, 1] : [start, settled, gone],
    isLast ? [1, 1, 1] : [1, 1, 0.96],
    { clamp: true }
  );

  return (
    <motion.div
      style={{ x, opacity, scale, zIndex: index + 1 }}
      className={`absolute flex flex-col items-center ${isActive ? '' : 'pointer-events-none'}`}
    >
      <div className="mb-3 px-4 text-center sm:mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-yellow-400 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-900 shadow-[3px_3px_0_0_#0F172A] sm:px-4 sm:py-1.5 sm:text-[10px]">
          <Sparkles className="h-3 w-3" />
          {panel.eyebrow}
        </span>

        <h2 className="font-display mt-3 whitespace-nowrap text-base font-black leading-[0.95] tracking-tight text-slate-900 sm:mt-4 sm:text-3xl lg:text-4xl">
          {panel.title} <span className="italic text-[#00B8D9]">{panel.accent}</span>
        </h2>
      </div>

      {panel.kind === 'video' ? (
        isMobile ? (
          <VideoCycle
            beforeSrc={panel.beforeSrc}
            afterSrc={panel.afterSrc}
            beforePoster={panel.beforePoster}
            afterPoster={panel.afterPoster}
            play={isActive}
          />
        ) : (
          <div className="flex items-stretch justify-center gap-4">
            {([
              ['Before', panel.beforeSrc, panel.beforePoster, 'dark'],
              ['After', panel.afterSrc, panel.afterPoster, 'gold'],
            ] as const).map(([label, src, poster, tone]) => (
              <div
                key={label}
                className="ba-reel-pair relative overflow-hidden rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0_0_#0F172A]"
              >
                <LoopingVideo src={src} poster={poster} label={label} play={isActive} />
                <span
                  className={`pointer-events-none absolute left-3 top-3 rounded-full border-2 border-slate-900 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] ${
                    tone === 'gold' ? 'bg-yellow-400 text-slate-900' : 'bg-slate-900 text-white'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )
      ) : (
        <Comparison before={panel.before} after={panel.after} label={panel.eyebrow} />
      )}
    </motion.div>
  );
}

/* ─────────── mobile video cycle ─────────── */

function VideoCycle({
  beforeSrc,
  afterSrc,
  beforePoster,
  afterPoster,
  play,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforePoster: string;
  afterPoster: string;
  play: boolean;
}) {
  const [phase, setPhase] = useState<'before' | 'after'>('before');
  const beforeRef = useRef<HTMLVideoElement>(null);
  const afterRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!play) setPhase('before');
  }, [play]);

  useEffect(() => {
    const showing = phase === 'before' ? beforeRef.current : afterRef.current;
    const hidden = phase === 'before' ? afterRef.current : beforeRef.current;
    hidden?.pause();
    if (!showing) return;
    if (play) {
      showing.currentTime = 0;
      showing.play().catch(() => {});
    } else {
      showing.pause();
    }
  }, [phase, play]);

  const isBefore = phase === 'before';

  return (
    <div className="ba-reel relative overflow-hidden rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0_0_#0F172A]">
      <video
        ref={beforeRef}
        src={beforeSrc}
        poster={beforePoster}
        muted
        playsInline
        preload="auto"
        onEnded={() => setPhase('after')}
        aria-label="Solar panels before cleaning"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: isBefore ? 1 : 0 }}
      />
      <video
        ref={afterRef}
        src={afterSrc}
        poster={afterPoster}
        muted
        playsInline
        preload="auto"
        onEnded={() => setPhase('before')}
        aria-label="Solar panels after cleaning"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: isBefore ? 0 : 1 }}
      />

      <span
        className={`pointer-events-none absolute left-3 top-3 rounded-full border-2 border-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
          isBefore ? 'bg-slate-900 text-white' : 'bg-yellow-400 text-slate-900'
        }`}
      >
        {isBefore ? 'Before' : 'After'}
      </span>

      <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {['before', 'after'].map((p) => (
          <span
            key={p}
            className={`h-1.5 rounded-full border border-slate-900 transition-all duration-300 ${
              p === phase ? 'w-6 bg-yellow-400' : 'w-1.5 bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────── drag slider ─────────── */

function Comparison({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(p => Math.max(0, p - step)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos(p => Math.min(100, p + step)); }
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="ba-portrait relative cursor-ew-resize select-none overflow-hidden rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0_0_#0F172A] sm:shadow-[10px_10px_0_0_#0F172A]"
      style={{ touchAction: 'pan-y' }}
    >
      <Image
        src={after}
        alt={`${label} after cleaning`}
        fill
        sizes="(max-width: 640px) 90vw, 520px"
        className="pointer-events-none object-cover"
        draggable={false}
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={`${label} before cleaning`}
          fill
          sizes="(max-width: 640px) 90vw, 520px"
          className="pointer-events-none object-cover"
          draggable={false}
        />
      </div>

      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full border-2 border-slate-900 bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity duration-200"
        style={{ opacity: pos > 16 ? 1 : 0 }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full border-2 border-slate-900 bg-yellow-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 transition-opacity duration-200"
        style={{ opacity: pos < 84 ? 1 : 0 }}
      >
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 bg-yellow-400"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      />

      <button
        type="button"
        role="slider"
        aria-label={`Compare before and after: ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-4 border-slate-900 bg-yellow-400 shadow-[0_4px_14px_rgba(0,0,0,0.35)] outline-none focus-visible:ring-4 focus-visible:ring-[#00B8D9]"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
      </button>

      <div
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-slate-900 bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 transition-opacity duration-500"
        style={{ opacity: touched ? 0 : 1 }}
      >
        ← Drag to compare →
      </div>
    </div>
  );
}

/* ─────────── looping video ─────────── */

function LoopingVideo({
  src,
  poster,
  label,
  play,
}: {
  src: string;
  poster: string;
  label: string;
  play: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (play) el.play().catch(() => {});
    else el.pause();
  }, [play]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`Solar panels ${label.toLowerCase()} cleaning`}
      className="h-full w-full object-cover"
    />
  );
}