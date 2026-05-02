'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** how many bubbles to render */
  count?: number;
  /** density mode: 'subtle' | 'medium' | 'heavy' */
  density?: 'subtle' | 'medium' | 'heavy';
  className?: string;
}

interface Bubble {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function WaterParticles({
  count,
  density = 'medium',
  className = '',
}: Props) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const n = count ?? (density === 'heavy' ? 32 : density === 'medium' ? 20 : 12);
    const arr: Bubble[] = Array.from({ length: n }, () => ({
      left: Math.random() * 100,
      size: 4 + Math.random() * 22,
      duration: 8 + Math.random() * 14,
      delay: -Math.random() * 18,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setBubbles(arr);
  }, [count, density]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble animate-bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
