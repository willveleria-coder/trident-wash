/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#04222B',
          800: '#062E3A',
          700: '#0A4250',
          600: '#0E5266',
        },
        teal: {
          900: '#0E5266',
          700: '#1A7F8E',
          500: '#2BB5C0',
          400: '#3FCFD9',
        },
        cyan: {
          500: '#06B6D4',
          400: '#22D3EE',
          300: '#67E8F9',
          200: '#A5F3FC',
          100: '#CFFAFE',
        },
        sky: {
          400: '#38BDF8',
          300: '#7DD3FC',
        },
        cream: {
          50: '#FBF7EE',
          100: '#F5EFE0',
          200: '#EDE3CC',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        bubble: 'bubble linear infinite',
        wave: 'wave 8s ease-in-out infinite',
        'wave-slow': 'wave 14s ease-in-out infinite',
        ripple: 'ripple 4s ease-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '15%': { opacity: '0.6' },
          '85%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100vh) scale(1.2)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-20px) translateY(-10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.5)', opacity: '0.6' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
