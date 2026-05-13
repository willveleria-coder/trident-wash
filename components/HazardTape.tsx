'use client';

interface Props {
  className?: string;
  /** Direction of stripes — diagonal default */
  angle?: number;
  /** Animate the stripes scrolling */
  animated?: boolean;
}

export default function HazardTape({
  className = '',
  angle = -45,
  animated = true,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `repeating-linear-gradient(
          ${angle}deg,
          #FFD60A 0,
          #FFD60A 24px,
          #0F172A 24px,
          #0F172A 48px
        )`,
        backgroundSize: animated ? '68px 68px' : 'auto',
        animation: animated ? 'hazard-scroll 3s linear infinite' : undefined,
      }}
    >
      <style jsx>{`
        @keyframes hazard-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 68px 0; }
        }
      `}</style>
    </div>
  );
}