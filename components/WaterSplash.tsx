interface Props {
  className?: string;
  variant?: 'splash' | 'droplet' | 'wave';
  color?: string;
}

export function WaterSplash({
  className = '',
  variant = 'splash',
  color = '#22D3EE',
}: Props) {
  if (variant === 'splash') {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M100 20 C 130 20, 160 40, 165 75 C 175 90, 180 115, 165 135 C 175 160, 145 175, 120 170 C 100 185, 75 180, 65 160 C 40 165, 20 145, 30 120 C 15 100, 25 75, 50 70 C 55 40, 75 20, 100 20 Z"
          fill={color}
          opacity="0.85"
        />
        {/* Highlight */}
        <ellipse cx="80" cy="60" rx="22" ry="14" fill="white" opacity="0.4" />
      </svg>
    );
  }

  if (variant === 'droplet') {
    return (
      <svg
        viewBox="0 0 100 130"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M50 5 C 50 5, 90 60, 90 90 C 90 113, 72 125, 50 125 C 28 125, 10 113, 10 90 C 10 60, 50 5, 50 5 Z"
          fill={color}
          opacity="0.9"
        />
        <ellipse cx="38" cy="70" rx="10" ry="18" fill="white" opacity="0.5" />
      </svg>
    );
  }

  // wave
  return (
    <svg
      viewBox="0 0 1440 120"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z"
        fill={color}
      />
    </svg>
  );
}
