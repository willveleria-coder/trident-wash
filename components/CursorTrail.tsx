'use client';

import { useEffect, useRef, useState } from 'react';

interface Droplet {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function CursorTrail() {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const idRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Skip on touch / reduced motion / mobile
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (isTouch || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTimeRef.current < 40) return; // throttle ~25fps

      const last = lastPosRef.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 14) return; // require minimum movement
      }

      lastTimeRef.current = now;
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      const id = idRef.current++;
      const size = 6 + Math.random() * 14;
      const offsetX = (Math.random() - 0.5) * 8;
      const offsetY = (Math.random() - 0.5) * 8;

      setDroplets((prev) => [
        ...prev.slice(-25), // keep max 25 active
        { id, x: e.clientX + offsetX, y: e.clientY + offsetY, size },
      ]);

      // Auto-cleanup after animation completes
      setTimeout(() => {
        setDroplets((prev) => prev.filter((d) => d.id !== id));
      }, 1200);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ contain: 'layout paint' }}
    >
      {droplets.map((d) => (
        <span
          key={d.id}
          className="absolute trail-drop"
          style={{
            left: `${d.x}px`,
            top: `${d.y}px`,
            width: `${d.size}px`,
            height: `${d.size}px`,
          }}
        />
      ))}
      <style jsx>{`
        .trail-drop {
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.95),
            rgba(165, 243, 252, 0.6) 40%,
            rgba(34, 211, 238, 0.2) 80%
          );
          box-shadow:
            0 0 12px rgba(103, 232, 249, 0.6),
            inset -2px -2px 4px rgba(34, 211, 238, 0.3);
          animation: trail 1.2s ease-out forwards;
        }
        @keyframes trail {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.4);
          }
          15% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 30px)) scale(0.6);
          }
        }
      `}</style>
    </div>
  );
}
