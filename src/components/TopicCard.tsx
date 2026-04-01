'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function TopicCard({
  icon: Icon,
  title,
  description,
}: TopicCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-card-dark p-6 hover:bg-itb-blue/30 transition-colors"
    >
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h3 className="font-plus-jakarta font-bold text-pearl-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-warm-gray-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
