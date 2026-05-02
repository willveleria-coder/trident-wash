'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

interface Props {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  className?: string;
  initial?: number;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  className = '',
  initial = 50,
}: Props) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClient = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const cx =
        'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClient(cx);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, updateFromClient]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/5] select-none cursor-ew-resize overflow-hidden ${className}`}
      onMouseDown={(e) => {
        setDragging(true);
        updateFromClient(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        updateFromClient(e.touches[0].clientX);
      }}
    >
      {/* AFTER (full background) */}
      <Image
        src={afterSrc}
        alt={`${alt} (after)`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        priority
      />
      {/* AFTER badge */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-300 text-ink-900 text-[10px] tracking-[0.3em] uppercase rounded-full font-medium z-20 shadow-[0_0_20px_rgba(103,232,249,0.6)]">
        After
      </div>

      {/* BEFORE (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div className="relative h-full" style={{ width: `${(100 / pos) * 100}%` }}>
          <Image
            src={beforeSrc}
            alt={`${alt} (before)`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* BEFORE badge */}
      <div
        className="absolute top-4 left-4 px-3 py-1 bg-ink-900/80 text-cream-50 text-[10px] tracking-[0.3em] uppercase rounded-full font-medium z-20"
        style={{ opacity: pos > 12 ? 1 : 0, transition: 'opacity 200ms' }}
      >
        Before
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-cream-50 shadow-[0_0_40px_rgba(103,232,249,0.9),0_0_80px_rgba(34,211,238,0.5)] z-10 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cream-50 border-2 border-cyan-300 flex items-center justify-center shadow-2xl pointer-events-auto cursor-ew-resize">
          <ChevronsLeftRight className="w-5 h-5 text-ink-900" />
        </div>
      </div>
    </div>
  );
}
