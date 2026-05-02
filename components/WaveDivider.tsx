'use client';

interface Props {
  /** Color of the section ABOVE the divider (the wave shows the section below's bg through cutouts) */
  fromColor?: string;
  /** Color of the section BELOW */
  toColor?: string;
  /** Flip vertically — useful when transitioning from a light to dark section */
  flip?: boolean;
  /** Height of the wave area in px */
  height?: number;
  className?: string;
}

export default function WaveDivider({
  fromColor = '#04222B',
  toColor = '#FBF7EE',
  flip = false,
  height = 80,
  className = '',
}: Props) {
  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: `${height}px`,
        background: toColor,
        transform: flip ? 'rotate(180deg)' : undefined,
      }}
    >
      {/* Back wave (slower, more transparent) */}
      <svg
        className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-wave-divider-back"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C240,80 480,10 720,40 C960,70 1200,20 1440,40 C1680,60 1920,15 2160,40 C2400,65 2640,20 2880,40 L2880,0 L0,0 Z"
          fill={fromColor}
          fillOpacity="0.6"
        />
      </svg>

      {/* Front wave (faster, full opacity) */}
      <svg
        className="absolute inset-x-0 top-0 w-[200%] h-full animate-wave-divider-front"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 C1680,90 1920,30 2160,60 C2400,90 2640,30 2880,60 L2880,0 L0,0 Z"
          fill={fromColor}
        />
      </svg>

      <style jsx>{`
        @keyframes wave-back {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-front {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-wave-divider-back {
          animation: wave-back 22s linear infinite;
        }
        .animate-wave-divider-front {
          animation: wave-front 14s linear infinite;
        }
      `}</style>
    </div>
  );
}
