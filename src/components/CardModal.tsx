'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  accent?: string;
}

export const CardModal = ({ isOpen, onClose, children, title, accent }: CardModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            {title && (
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 rounded-t-2xl"
                   style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--glass-border)' }}>
                <h3 className="text-xl font-bold" style={{ color: accent || 'var(--color-primary)' }}>
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-card)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            {/* Body */}
            <div className={title ? 'p-6 pt-4' : 'p-6'}>
              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg transition-colors z-10"
                  style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-card)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CardModal;
