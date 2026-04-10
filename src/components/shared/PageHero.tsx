'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { HeroBG } from './HeroBG';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'blue' | 'purple' | 'amber' | 'dark';
  minHeight?: string;
  photoPlaceholder?: boolean;
}

export const PageHero = ({
  title,
  subtitle,
  children,
  variant = 'default',
  minHeight = '52vh',
  photoPlaceholder = false,
}: PageHeroProps) => {
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight }}
    >
      <HeroBG variant={variant} photoPlaceholder={photoPlaceholder} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-8 max-w-4xl py-20 md:py-28"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
          style={{ color: (variant === 'dark' || photoPlaceholder) ? '#f1f5f9' : 'var(--color-text-primary)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: (variant === 'dark' || photoPlaceholder) ? 'rgba(148,163,184,0.9)' : 'var(--color-text-secondary)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </motion.div>
    </div>
  );
};
