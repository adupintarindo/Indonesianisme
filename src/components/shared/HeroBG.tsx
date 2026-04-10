'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type Variant = 'default' | 'blue' | 'purple' | 'amber' | 'dark';

interface HeroBGProps {
  variant?: Variant;
  /** Path to a real background image in /public (e.g. "/hero-bg.jpg") */
  imageSrc?: string;
  imageAlt?: string;
  /** Render a CSS-only venue/conference photo placeholder when no real image is available */
  photoPlaceholder?: boolean;
}

const palettes: Record<Variant, { orb1: string; orb2: string; orb3: string; orb4: string }> = {
  default: { orb1: '#3B82F6', orb2: '#8B5CF6', orb3: '#F59E0B', orb4: '#14B8A6' },
  blue:    { orb1: '#2563EB', orb2: '#3B82F6', orb3: '#6366F1', orb4: '#0EA5E9' },
  purple:  { orb1: '#8B5CF6', orb2: '#6366F1', orb3: '#3B82F6', orb4: '#EC4899' },
  amber:   { orb1: '#F59E0B', orb2: '#D97706', orb3: '#3B82F6', orb4: '#10B981' },
  dark:    { orb1: '#1E40AF', orb2: '#1D4ED8', orb3: '#0369A1', orb4: '#0F766E' },
};

export function HeroBG({ variant = 'default', imageSrc, imageAlt = 'Background', photoPlaceholder = false }: HeroBGProps) {
  const palette = palettes[variant];
  const isDark = variant === 'dark' || !!imageSrc || photoPlaceholder;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* ── Layer 0a: CSS photo placeholder (venue/conference look) ── */}
      {photoPlaceholder && !imageSrc && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 0,
            background: [
              'radial-gradient(ellipse 50% 35% at 50% 68%, rgba(192,139,42,0.22) 0%, transparent 55%)',
              'radial-gradient(ellipse 28% 22% at 22% 74%, rgba(255,155,35,0.10) 0%, transparent 50%)',
              'radial-gradient(ellipse 28% 22% at 78% 72%, rgba(255,155,35,0.09) 0%, transparent 50%)',
              'radial-gradient(ellipse 90% 55% at 50% 85%, rgba(20,50,110,0.35) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(8,20,60,0.55) 0%, transparent 65%)',
              'linear-gradient(180deg, #040c1e 0%, #081526 15%, #0e1f3a 28%, #13264a 42%, #0e1e3c 58%, #070f26 76%, #030a1a 100%)',
            ].join(', '),
          }}
        >
          {/* Architectural grid lines — suggest auditorium / venue perspective */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              {/* Horizontal seating rows */}
              <pattern id="seat-rows" x="0" y="0" width="1" height="26" patternUnits="userSpaceOnUse" patternTransform="scale(1,1)">
                <line x1="0" y1="25.5" x2="10000" y2="25.5" stroke="rgba(96,165,250,0.055)" strokeWidth="1" />
              </pattern>
              {/* Vertical perspective lines */}
              <linearGradient id="row-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="45%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.3" />
              </linearGradient>
              <mask id="row-mask">
                <rect width="100%" height="100%" fill="url(#row-fade)" />
              </mask>
            </defs>
            {/* Seat rows in lower 60% */}
            <rect x="0" y="40%" width="100%" height="60%" fill="url(#seat-rows)" mask="url(#row-mask)" />
            {/* Stage light cone — left */}
            <line x1="20%" y1="0%" x2="45%" y2="65%" stroke="rgba(255,200,100,0.05)" strokeWidth="60" />
            {/* Stage light cone — right */}
            <line x1="80%" y1="0%" x2="55%" y2="65%" stroke="rgba(255,200,100,0.04)" strokeWidth="60" />
            {/* Central stage glow */}
            <ellipse cx="50%" cy="67%" rx="18%" ry="5%" fill="rgba(220,170,60,0.12)" />
          </svg>

          {/* Specular light dots — simulates venue spotlights */}
          <div className="absolute" style={{ top: '58%', left: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 40, background: 'radial-gradient(ellipse, rgba(255,210,90,0.18) 0%, transparent 70%)', filter: 'blur(12px)' }} />
          <div className="absolute" style={{ top: '62%', left: '30%', transform: 'translate(-50%,-50%)', width: 120, height: 20, background: 'radial-gradient(ellipse, rgba(255,180,60,0.10) 0%, transparent 70%)', filter: 'blur(8px)' }} />
          <div className="absolute" style={{ top: '62%', left: '70%', transform: 'translate(-50%,-50%)', width: 120, height: 20, background: 'radial-gradient(ellipse, rgba(255,180,60,0.10) 0%, transparent 70%)', filter: 'blur(8px)' }} />
          <div className="absolute text-[10px] font-mono tracking-[0.3em] uppercase" style={{ bottom: 12, right: 16, color: 'rgba(96,165,250,0.18)', zIndex: 1 }}>Placeholder — ganti dengan foto venue</div>
        </div>
      )}

      {/* ── Layer 0b: Real image (when provided) ── */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          style={{ zIndex: 0 }}
        />
      )}

      {/* ── Layer 2: Base gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: isDark
            ? 'linear-gradient(150deg, #05091a 0%, #0c1a3b 40%, #071221 70%, #040813 100%)'
            : 'var(--gradient-hero)',
          ...(imageSrc && { opacity: 0.75 }),
        }}
      />

      {/* ── Layer 3: Image dark overlay (only when imageSrc is set) ── */}
      {imageSrc && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              'linear-gradient(to bottom, rgba(5,9,26,0.55) 0%, rgba(5,9,26,0.3) 45%, rgba(5,9,26,0.75) 100%)',
          }}
        />
      )}

      {/* ── Layer 4: Atmospheric depth radials ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 3,
          background: isDark
            ? [
                'radial-gradient(ellipse 70% 55% at 75% 15%, rgba(29,78,216,0.30) 0%, transparent 60%)',
                'radial-gradient(ellipse 55% 45% at 8% 85%, rgba(15,118,110,0.18) 0%, transparent 55%)',
                'radial-gradient(ellipse 50% 40% at 50% 55%, rgba(5,9,26,0.40) 0%, transparent 70%)',
              ].join(', ')
            : 'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(59,130,246,0.10) 0%, transparent 60%)',
        }}
      />

      {/* ── Layer 5: Aurora orbs ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          zIndex: 4,
          width: '55vw', height: '55vw', maxWidth: 700, maxHeight: 700,
          top: '-18%', left: '-10%',
          background: `radial-gradient(circle, ${palette.orb1}${isDark ? '38' : '28'} 0%, transparent 70%)`,
          filter: 'blur(120px)',
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          zIndex: 4,
          width: '50vw', height: '50vw', maxWidth: 640, maxHeight: 640,
          top: '-5%', right: '-15%',
          background: `radial-gradient(circle, ${palette.orb2}${isDark ? '2e' : '20'} 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -35, 20, 0], y: [0, 30, -15, 0], scale: [1.05, 1, 1.1, 1.05] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          zIndex: 4,
          width: '40vw', height: '40vw', maxWidth: 520, maxHeight: 520,
          bottom: '-10%', left: '20%',
          background: `radial-gradient(circle, ${palette.orb3}${isDark ? '22' : '18'} 0%, transparent 70%)`,
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, 25, -10, 0], y: [0, -20, 15, 0], scale: [0.95, 1.05, 1, 0.95] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          zIndex: 4,
          width: '45vw', height: '45vw', maxWidth: 580, maxHeight: 580,
          bottom: '-15%', right: '5%',
          background: `radial-gradient(circle, ${palette.orb4}${isDark ? '1e' : '16'} 0%, transparent 70%)`,
          filter: 'blur(110px)',
        }}
        animate={{ x: [0, -20, 30, 0], y: [0, 15, -25, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Layer 6: Noise / grain texture ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 5, opacity: isDark ? 0.055 : 0.025, mixBlendMode: 'overlay' }}
      >
        <filter id="noise-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-grain)" />
      </svg>

      {/* ── Layer 7: Dot grid ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 6, opacity: isDark ? 0.22 : 0.35 }}
      >
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={isDark ? '#60A5FA' : 'var(--color-primary)'} opacity="0.3" />
          </pattern>
          <radialGradient id="hero-fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={isDark ? '#05091a' : 'var(--color-bg-primary)'} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? '#05091a' : 'var(--color-bg-primary)'} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
        <rect width="100%" height="100%" fill="url(#hero-fade)" />
      </svg>

      {/* ── Layer 8: Floating vector shapes ── */}
      {/* Glass rectangle top-right */}
      <motion.div
        className="absolute rounded-2xl"
        style={{
          zIndex: 7,
          width: 180, height: 90, top: '12%', right: '8%',
          background: isDark ? 'rgba(29,78,216,0.08)' : 'var(--glass-bg)',
          border: `1px solid ${isDark ? 'rgba(96,165,250,0.15)' : 'var(--glass-border)'}`,
          backdropFilter: 'blur(12px)',
        }}
        animate={{ y: [0, -14, 0], rotate: [-2, 2, -2], opacity: isDark ? [0.5, 0.8, 0.5] : [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Glass rectangle bottom-left */}
      <motion.div
        className="absolute rounded-2xl"
        style={{
          zIndex: 7,
          width: 130, height: 60, bottom: '18%', left: '6%',
          background: isDark ? 'rgba(15,118,110,0.08)' : 'var(--glass-bg)',
          border: `1px solid ${isDark ? 'rgba(45,212,191,0.15)' : 'var(--glass-border)'}`,
          backdropFilter: 'blur(12px)',
        }}
        animate={{ y: [0, 16, 0], rotate: [3, -1, 3], opacity: isDark ? [0.4, 0.7, 0.4] : [0.35, 0.6, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      {/* Circle orb left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          zIndex: 7,
          width: 60, height: 60, top: '30%', left: '4%',
          border: `1.5px solid ${palette.orb1}${isDark ? '55' : '40'}`,
          background: `${palette.orb1}${isDark ? '12' : '08'}`,
        }}
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      {/* Small circle top-center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          zIndex: 7,
          width: 36, height: 36, top: '20%', left: '30%',
          border: `1.5px solid ${palette.orb2}${isDark ? '45' : '35'}`,
          background: `${palette.orb2}${isDark ? '0e' : '06'}`,
        }}
        animate={{ y: [0, 12, 0], scale: [1, 0.9, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* Rotated square bottom-right */}
      <motion.div
        className="absolute"
        style={{
          zIndex: 7,
          width: 90, height: 90, bottom: '25%', right: '12%',
          border: `1.5px solid ${palette.orb4}${isDark ? '40' : '30'}`,
          borderRadius: 18,
          transform: 'rotate(15deg)',
          background: `${palette.orb4}${isDark ? '0c' : '06'}`,
        }}
        animate={{ rotate: [15, 25, 15], y: [0, -10, 0], opacity: isDark ? [0.4, 0.75, 0.4] : [0.3, 0.65, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* Extra: thin diagonal line top-left to mid */}
      {isDark && (
        <svg
          className="absolute"
          style={{ zIndex: 7, top: '5%', left: '15%', opacity: 0.12 }}
          width="2" height="200"
        >
          <defs>
            <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="2" height="200" fill="url(#line-grad)" />
        </svg>
      )}
      {isDark && (
        <svg
          className="absolute"
          style={{ zIndex: 7, top: '10%', right: '22%', opacity: 0.08 }}
          width="2" height="160"
        >
          <rect width="2" height="160" fill="url(#line-grad)" />
        </svg>
      )}

      {/* ── Layer 9: Edge vignette (bottom fade to page bg) ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 8,
          background: isDark
            ? 'radial-gradient(ellipse 120% 50% at 50% 110%, #05091a 0%, transparent 55%)'
            : 'radial-gradient(ellipse 120% 80% at 50% 100%, var(--color-bg-primary) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
