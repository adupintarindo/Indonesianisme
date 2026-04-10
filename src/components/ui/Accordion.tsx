'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setExpanded(prev => {
      if (!allowMultiple) {
        return { [idx]: !prev[idx] };
      }
      return { ...prev, [idx]: !prev[idx] };
    });
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = !!expanded[idx];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="glass-card-dark overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all"
            >
              <span className="font-plus-jakarta font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5 text-gold" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderTop: '1px solid var(--glass-border)' }}
                >
                  <p
                    className="px-6 py-4 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
