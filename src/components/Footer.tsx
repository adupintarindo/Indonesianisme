'use client';

import Link from 'next/link';
import { 
  Mail, MapPin, Phone, ArrowUpRight, Heart,
  Globe, Send
} from 'lucide-react';
import { useLang } from './providers/LanguageProvider';

const Footer = () => {
  const { t } = useLang();

  const aboutLinks = [
    { label: 'Tentang Indonesianisme', href: '/about' },
    { label: 'Visi & Misi', href: '/about#vision' },
    { label: 'Tim & Organisasi', href: '/about#team' },
    { label: 'FAQ', href: '/faq' },
  ];

  const programLinks = [
    { label: 'Event & Summit', href: '/event' },
    { label: 'Pembicara', href: '/speakers' },
    { label: 'Program & Agenda', href: '/program' },
    { label: '6 Pilar Strategis', href: '/topics' },    { label: 'Kalender', href: '/calendar' },
  ];

  const communityLinks = [
    { label: 'Bergabung', href: '/community' },
    { label: 'Galeri', href: '/gallery' },
    { label: 'Publikasi', href: '/publications' },
    { label: 'Media', href: '/media' },
    { label: 'Sponsorship', href: '/sponsorship' },
  ];

  return (
    <footer style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                   style={{ background: 'var(--gradient-primary)', color: '#FFFFFF' }}>
                IN
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  INDONESIANISME
                </h3>                <p className="text-xs font-medium" style={{ color: 'var(--color-primary-light)' }}>
                  IA-ITB · 2026
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {t('footer.desc')}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <Mail className="w-4 h-4" style={{ color: 'var(--color-primary-light)' }} />
                info@indonesianisme.id
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <MapPin className="w-4 h-4" style={{ color: 'var(--color-primary-light)' }} />
                Jakarta, Indonesia
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <Phone className="w-4 h-4" style={{ color: 'var(--color-primary-light)' }} />
                +62 21 xxxx xxxx
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
              {t('footer.about')}
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors no-underline hover:no-underline flex items-center gap-1 group"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Links */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
              {t('footer.program')}
            </h4>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors no-underline hover:no-underline flex items-center gap-1 group"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
              {t('footer.community')}
            </h4>
            <ul className="space-y-2.5">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors no-underline hover:no-underline flex items-center gap-1 group"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ borderTop: '1px solid var(--glass-border)' }}>
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
            &copy; 2026 Indonesianisme — Ikatan Alumni ITB. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs no-underline hover:no-underline"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-xs no-underline hover:no-underline"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;