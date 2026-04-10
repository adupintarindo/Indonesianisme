'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Sun, Moon,
  Home, Info, Calendar, Users, LayoutGrid, BookOpen,
  Image, MessageCircle, Ticket, Handshake, HelpCircle, Award, Newspaper
} from 'lucide-react';
import { useTheme } from './providers/ThemeProvider';
import { useLang } from './providers/LanguageProvider';

const LANGUAGES = [
  { code: 'ID', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
] as const;

const menuItems = [
  { key: 'nav.home', href: '/', icon: Home },
  { key: 'nav.about', href: '/about', icon: Info },
  { key: 'nav.event', href: '/event', icon: Calendar },
  { key: 'nav.speakers', href: '/speakers', icon: Users },
  { key: 'nav.program', href: '/program', icon: LayoutGrid },
  { key: 'nav.topics', href: '/topics', icon: BookOpen },
  { key: 'nav.media', href: '/media', icon: Newspaper },
  { key: 'nav.register', href: '/register', icon: Ticket },
  { key: 'nav.sponsorship', href: '/sponsorship', icon: Handshake },
  { key: 'nav.gallery', href: '/gallery', icon: Image },
  { key: 'nav.community', href: '/community', icon: MessageCircle },
  { key: 'nav.faq', href: '/faq', icon: HelpCircle },
  { key: 'nav.sertifikat', href: '/sertifikat', icon: Award },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

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
              {menuItems.slice(0, 7).map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="px-3 py-2 rounded-lg text-sm transition-all duration-200 no-underline hover:no-underline"
                    style={{
                      color: active ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                      background: active ? 'rgba(59,130,246,0.10)' : 'transparent',
                      fontWeight: active ? '700' : '500',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--color-primary-light)';
                        e.currentTarget.style.background = 'var(--color-bg-card)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
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

              {/* Language Toggle — segmented pill */}
              <div
                className="hidden sm:flex rounded-lg overflow-hidden"
                style={{ border: '1px solid var(--glass-border)', background: 'var(--color-bg-card)' }}
              >
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all duration-200"
                    style={{
                      background: lang === l.code ? 'var(--color-primary)' : 'transparent',
                      color: lang === l.code ? '#ffffff' : 'var(--color-text-secondary)',
                    }}
                  >
                    <span className="text-sm leading-none">{l.flag}</span>
                    {l.code}
                  </button>
                ))}
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
                    const active = isActive(item.href);
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
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all no-underline hover:no-underline"
                          style={{
                            color: active ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                            background: active ? 'rgba(59,130,246,0.10)' : 'transparent',
                            fontWeight: active ? '700' : '500',
                            borderLeft: active ? '3px solid var(--color-primary-light)' : '3px solid transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.background = 'var(--color-bg-card)';
                              e.currentTarget.style.color = 'var(--color-primary-light)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--color-text-secondary)';
                            }
                          }}
                        >
                          <Icon
                            className="w-5 h-5 shrink-0"
                            style={{ color: active ? 'var(--color-primary-light)' : undefined }}
                          />
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
                      {LANGUAGES.map(l => (
                        <button
                          key={l.code}
                          onClick={() => setLang(l.code)}
                          className="flex items-center gap-1.5 px-4 py-3 text-sm font-bold"
                          style={{
                            background: lang === l.code ? 'var(--color-primary-light)' : 'var(--color-bg-card)',
                            color: lang === l.code ? '#0A1628' : 'var(--color-text-secondary)',
                          }}
                        >
                          <span className="text-base leading-none">{l.flag}</span>
                          {l.code}
                        </button>
                      ))}
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