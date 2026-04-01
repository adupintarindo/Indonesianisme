'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimeUnit {
  label: string;
  value: number;
}

export const CountdownTimer = () => {
  const [time, setTime] = useState<TimeUnit[]>([
    { label: 'Hari', value: 0 },
    { label: 'Jam', value: 0 },
    { label: 'Menit', value: 0 },
    { label: 'Detik', value: 0 },
  ]);

  useEffect(() => {
    const calculateCountdown = () => {
      // Event date: October 2026
      const eventDate = new Date('2026-10-15T08:00:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTime([
          { label: 'Hari', value: days },
          { label: 'Jam', value: hours },
          { label: 'Menit', value: minutes },
          { label: 'Detik', value: seconds },
        ]);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {time.map((unit, idx) => (
        <motion.div
          key={idx}
          className="glass-card-dark p-6 text-center"
          variants={itemVariants}
        >
          <div className="text-3xl md:text-4xl font-bold text-gold-light mb-2">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-pearl-white opacity-80 font-medium">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
