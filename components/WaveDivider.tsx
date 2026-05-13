'use client';

interface Props {
  /** Color of the section ABOVE the divider */
  fromColor?: string;
  /** Color of the section BELOW the divider */
  toColor?: string;
  /** Flip vertically */
  flip?: boolean;
  /** Height in px */
  height?: number;
  className?: string;
}

export default function WaveDivider({
  fromColor = '#FFFFFF',
  toColor = '#FFFFFF',
  flip = false,
  height = 90,
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
      {/* Back wave — cyan, slow */}
      <svg
        className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-wave-back"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C240,80 480,10 720,40 C960,70 1200,20 1440,40 C1680,60 1920,15 2160,40 C2400,65 2640,20 2880,40 L2880,0 L0,0 Z"
          fill="#00B8D9"
          fillOpacity="0.55"
        />
      </svg>

      {/* Front wave — fromColor, full */}
      <svg
        className="absolute inset-x-0 top-0 w-[200%] h-full animate-wave-front"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 C1680,90 1920,30 2160,60 C2400,90 2640,30 2880,60 L2880,0 L0,0 Z"
          fill={fromColor}
        />
      </svg>

      {/* Yellow accent stripe — catches the eye */}
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[200%] h-2 animate-wave-back"
        viewBox="0 0 2880 8"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,4 C240,2 480,6 720,4 C960,2 1200,6 1440,4 C1680,2 1920,6 2160,4 C2400,2 2640,6 2880,4"
          stroke="#FFD60A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <style jsx>{`
        @keyframes wave-back-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-front-anim {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-wave-back {
          animation: wave-back-anim 22s linear infinite;
        }
        .animate-wave-front {
          animation: wave-front-anim 14s linear infinite;
        }
      `}</style>
    </div>
  );
}