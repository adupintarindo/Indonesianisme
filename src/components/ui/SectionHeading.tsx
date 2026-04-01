'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  showGoldUnderline?: boolean;
  animated?: boolean;
}

export const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  showGoldUnderline = true,
  animated = true,
}: SectionHeadingProps) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!animated) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animated]);

  const containerClass = centered ? 'text-center max-w-2xl mx-auto' : '';

  const titleVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const subtitleVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const underlineVariants: Variants = {
    initial: { width: 0 },
    animate: { width: '100%' },
  };

  return (
    <div ref={ref} className={containerClass}>
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-pearl-white mb-4"
        variants={titleVariants}
        initial={animated ? 'initial' : 'animate'}
        animate={isInView ? 'animate' : 'initial'}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>

      {showGoldUnderline && (
        <motion.div
          className="h-1 bg-gradient-to-r from-gold to-teal mb-6"
          style={{
            marginLeft: centered ? 'auto' : 0,
            marginRight: centered ? 'auto' : 0,
          }}
          variants={underlineVariants}
          initial={animated ? 'initial' : 'animate'}
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        />
      )}

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-warm-gray-light"
          variants={subtitleVariants}
          initial={animated ? 'initial' : 'animate'}
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
