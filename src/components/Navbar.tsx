'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Menu, X, Sun, Moon, Globe, ChevronDown,
  Info, Calendar, Users, LayoutGrid, BookOpen,
  Image, MessageCircle, Ticket, Handshake, HelpCircle
} from 'lucide-react';
import { useTheme } from './providers/ThemeProvider';
import { useLang } from './providers/LanguageProvider';

const menuItems = [
  { key: 'nav.about', href: '/about', icon: Info },
  { key: 'nav.event', href: '/event', icon: Calendar },
  { key: 'nav.speakers', href: '/speakers', icon: Users },
  { key: 'nav.program', href: '/program', icon: LayoutGrid },
  { key: 'nav.topics', href: '/topics', icon: BookOpen },
  { key: 'nav.register', href: '/register', icon: Ticket },
  { key: 'nav.sponsorship', href: '/sponsorship', icon: Handshake },
  { key: 'nav.gallery', href: '/gallery', icon: Image },
  { key: 'nav.community', href: '/community', icon: MessageCircle },
  { key: 'nav.faq', href: '/faq', icon: HelpCircle },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card-dark shadow-lg'
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          background: 'var(--glass-bg)',
          borderBottom: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        } : undefined}
      >        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group no-underline">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                   style={{ background: 'var(--gradient-primary)', color: '#FFFFFF' }}>
                IN
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                  INDONESIANISME
                </h1>
                <p className="text-[10px] font-medium" style={{ color: 'var(--color-primary-light)' }}>
                  IA-ITB · 2026
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.slice(0, 7).map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline hover:no-underline"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary-light)';
                    e.currentTarget.style.background = 'var(--color-bg-card)';
                  }}                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all duration-200"
                style={{ color: 'var(--color-text-secondary)', background: 'var(--color-bg-card)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language Toggle */}
              <div className="hidden sm:flex items-center rounded-lg overflow-hidden"
                   style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}>
                <button
                  onClick={() => setLang('ID')}
                  className="px-3 py-1.5 text-xs font-bold transition-all duration-200"
                  style={{
                    background: lang === 'ID' ? 'var(--color-primary-light)' : 'transparent',
                    color: lang === 'ID' ? '#0A1628' : 'var(--color-text-secondary)',
                  }}
                >
                  ID
                </button>                <button
                  onClick={() => setLang('EN')}
                  className="px-3 py-1.5 text-xs font-bold transition-all duration-200"
                  style={{
                    background: lang === 'EN' ? 'var(--color-primary-light)' : 'transparent',
                    color: lang === 'EN' ? '#0A1628' : 'var(--color-text-secondary)',
                  }}
                >
                  EN
                </button>
              </div>

              {/* CTA */}
              <Link href="/register" className="hidden sm:inline-flex btn-primary text-sm px-4 py-2 no-underline hover:no-underline">
                {t('nav.register')}
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 lg:hidden overflow-y-auto"
              style={{ background: 'var(--color-bg-primary)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold" style={{ color: 'var(--color-primary-light)' }}>Menu</span>
                  <button onClick={() => setIsOpen(false)} style={{ color: 'var(--color-text-primary)' }}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all no-underline hover:no-underline"
                          style={{ color: 'var(--color-text-secondary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-bg-card)';
                            e.currentTarget.style.color = 'var(--color-primary-light)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                          }}
                        >
                          <Icon className="w-5 h-5" />
                          {t(item.key)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                {/* Mobile Controls */}
                <div className="mt-8 pt-6 space-y-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleTheme}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                      style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                    </button>
                    <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--glass-border)' }}>
                      <button
                        onClick={() => setLang('ID')}
                        className="px-4 py-3 text-sm font-bold"
                        style={{
                          background: lang === 'ID' ? 'var(--color-primary-light)' : 'var(--color-bg-card)',
                          color: lang === 'ID' ? '#0A1628' : 'var(--color-text-secondary)',
                        }}
                      >
                        ID
                      </button>
                      <button
                        onClick={() => setLang('EN')}
                        className="px-4 py-3 text-sm font-bold"
                        style={{
                          background: lang === 'EN' ? 'var(--color-primary-light)' : 'var(--color-bg-card)',
                          color: lang === 'EN' ? '#0A1628' : 'var(--color-text-secondary)',
                        }}
                      >
                        EN
                      </button>
                    </div>
                  </div>                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center btn-primary py-3 no-underline hover:no-underline"
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;