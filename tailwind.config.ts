import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': 'oklch(0.23 0.15 264)',
        'itb-blue': 'oklch(0.45 0.18 253)',
        'sky-blue': 'oklch(0.65 0.12 247)',
        'gold': 'oklch(0.75 0.19 70)',
        'gold-light': 'oklch(0.85 0.15 70)',
        'gold-dark': 'oklch(0.60 0.25 65)',
        'teal': 'oklch(0.55 0.16 200)',
        'teal-light': 'oklch(0.70 0.10 190)',
        'pearl-white': 'oklch(0.98 0.01 0)',
        'warm-gray': 'oklch(0.35 0.04 70)',
        'warm-gray-light': 'oklch(0.60 0.03 70)',
      },
      fontFamily: {
        'plus-jakarta': ['var(--font-plus-jakarta, system-ui)', 'sans-serif'],
        'inter': ['var(--font-inter, system-ui)', 'sans-serif'],
        'jetbrains-mono': ['var(--font-jetbrains-mono, monospace)', 'monospace'],
      },
      fontSize: {
        'xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'sm': 'clamp(0.875rem, 1.1vw, 1rem)',
        'base': 'clamp(1rem, 1.3vw, 1.125rem)',
        'lg': 'clamp(1.125rem, 1.5vw, 1.375rem)',
        'xl': 'clamp(1.375rem, 1.8vw, 1.75rem)',
        '2xl': 'clamp(1.75rem, 2.2vw, 2.25rem)',
        '3xl': 'clamp(2.25rem, 2.8vw, 3rem)',
        '4xl': 'clamp(3rem, 3.5vw, 4rem)',
        '5xl': 'clamp(3.75rem, 4.5vw, 5rem)',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'fade-up': 'fade-up 500ms ease-out',
        'slide-in-left': 'slide-in-left 300ms ease-out',
        'slide-in-right': 'slide-in-right 300ms ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave-animation 1s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-left': {
          'from': {
            opacity: '0',
            transform: 'translateX(-40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(218, 160, 50, 0.7)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 0 10px rgba(218, 160, 50, 0)',
          },
        },
        'wave-animation': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1280px',
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '20px',
        'xl': '40px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
