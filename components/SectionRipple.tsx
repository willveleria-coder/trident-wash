'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  color?: string;
  /** Where the ripple originates inside the section (percentage) */
  originX?: number;
  originY?: number;
}

export default function SectionRipple({
  className = '',
  color = 'rgba(103, 232, 249, 0.4)',
  originX = 50,
  originY = 50,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {active &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute rounded-full ripple-burst"
            style={{
              left: `${originX}%`,
              top: `${originY}%`,
              border: `2px solid ${color}`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      <style jsx>{`
        .ripple-burst {
          width: 60px;
          height: 60px;
          transform: translate(-50%, -50%) scale(0.3);
          opacity: 0;
          animation: ripple-burst 3.5s ease-out forwards;
        }
        @keyframes ripple-burst {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
