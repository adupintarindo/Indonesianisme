'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export const PageHero = ({
  title,
  subtitle,
  backgroundImage,
  children,
}: PageHeroProps) => {
  return (
    <div
      className="relative w-full min-h-screen md:min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 to-deep-navy/95" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-8 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-pearl-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-sky-blue mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </motion.div>
    </div>
  );
};
