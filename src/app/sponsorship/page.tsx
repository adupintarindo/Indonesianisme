'use client';

import { useState } from 'react';
import { HeroBG } from '@/components/shared/HeroBG';
import { motion } from 'framer-motion';
import {
  Trophy,
  Award,
  Medal,
  Star,
  Crown,
  Sparkles,
  TrendingUp,
  Eye,
  Mic,
  Users,
  Globe,
  BarChart3,
  Download,
  MessageCircle,
  Mail,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';

interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  features: { name: string; included: boolean }[];
  tier: 'platinum' | 'gold' | 'silver' | 'other';
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: 'platinum',
    name: 'Platinum',
    price: 'Kontak untuk Harga',
    tier: 'platinum',
    features: [
      { name: 'Logo utama di semua materi', included: true },
      { name: 'Keynote introduction', included: true },
      { name: 'VIP access 10 orang', included: true },
      { name: 'Booth premium (6x3m)', included: true },
      { name: 'Featured di website & sosmed', included: true },
      { name: 'Speaking slot', included: true },
      { name: 'Logo di website & cetak', included: false },
      { name: 'Tiket VIP 5 orang', included: false },
      { name: 'Booth standar (3x3m)', included: false },
      { name: 'Tiket 3 orang', included: false },
      { name: 'Acknowledgment di program', included: false },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 'Kontak untuk Harga',
    tier: 'gold',
    features: [
      { name: 'Logo utama di semua materi', included: false },
      { name: 'Keynote introduction', included: false },
      { name: 'VIP access 10 orang', included: false },
      { name: 'Booth premium (6x3m)', included: false },
      { name: 'Featured di website & sosmed', included: false },
      { name: 'Speaking slot', included: false },
      { name: 'Logo di main stage', included: true },
      { name: 'Partisipasi panel', included: true },
      { name: 'VIP access 5 orang', included: true },
      { name: 'Booth standar (3x3m)', included: true },
      { name: 'Logo di website', included: true },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 'Kontak untuk Harga',
    tier: 'silver',
    features: [
      { name: 'Logo utama di semua materi', included: false },
      { name: 'Keynote introduction', included: false },
      { name: 'VIP access 10 orang', included: false },
      { name: 'Booth premium (6x3m)', included: false },
      { name: 'Featured di website & sosmed', included: false },
      { name: 'Speaking slot', included: false },
      { name: 'Logo di website & cetak', included: true },
      { name: 'Tiket 3 orang', included: true },
      { name: 'Acknowledgment di program', included: true },
      { name: 'Booth standar (3x3m)', included: false },
      { name: 'Logo di main stage', included: false },
    ],
  },
];

const otherPartners = [
  {
    id: 'knowledge',
    name: 'Knowledge Partner',
    icon: Globe,
    features: [
      'Co-branding pada publikasi',
      'Kolaborasi riset',
      'Logo di website',
    ],
  },
  {
    id: 'media',
    name: 'Media Partner',
    icon: Mic,
    features: ['Cross-promotion', 'Press coverage', 'Logo di website'],
  },
  {
    id: 'community',
    name: 'Community Partner',
    icon: Users,
    features: [
      'Community engagement',
      'Workshop collaboration',
      'Logo di website',
    ],
  },
];

const whyPartnerItems = [
  {
    title: 'Peserta Kunci',
    stat: '500+',
    description: 'Dari kalangan eksekutif, pemerintah, dan akademisi terkemuka Indonesia',
    icon: Crown,
    accentColor: '#F59E0B',
  },
  {
    title: 'Jangkauan Media',
    stat: '50M+',
    description: 'Reach media nasional & internasional, liputan digital, dan dokumentasi profesional',
    icon: Eye,
    accentColor: '#3B82F6',
  },
  {
    title: 'Brand Transformasi',
    stat: '#1',
    description: 'Identifikasi dengan gerakan IA-ITB dan transformasi nasional terbesar',
    icon: Sparkles,
    accentColor: '#8B5CF6',
  },
  {
    title: 'Peluang Speaking',
    stat: '3',
    description: 'Hari penuh platform untuk berbagi visi dan expertise Anda',
    icon: Mic,
    accentColor: '#10B981',
  },
  {
    title: 'ROI Terukur',
    stat: '100%',
    description: 'Analytics lengkap dan measurement framework untuk setiap investasi',
    icon: BarChart3,
    accentColor: '#E53935',
  },
  {
    title: 'Network Eksklusif',
    stat: '80+',
    description: 'Koneksi dengan decision makers, thought leaders, dan VIP stakeholders',
    icon: TrendingUp,
    accentColor: '#00838F',
  },
];

const faqItems = [
  {
    q: 'Apakah paket dapat dikustomisasi?',
    a: 'Ya, kami menyediakan paket khusus yang dapat disesuaikan dengan kebutuhan brand Anda. Hubungi tim kami untuk diskusi lebih lanjut.',
  },
  {
    q: 'Kapan deadline pendaftaran kemitraan?',
    a: 'Untuk memaksimalkan benefit, kami rekomendasikan pendaftaran sebelum 30 Juni 2026.',
  },
  {
    q: 'Apakah ada diskon untuk multiple sponsorships?',
    a: 'Kami menawarkan paket multi-tier dengan benefit tambahan. Hubungi tim partnership untuk penawaran khusus.',
  },
  {
    q: 'Berapa lama komitmen kemitraan?',
    a: 'Event ini berlangsung pada Q4 2026. Paket dapat disesuaikan untuk event tahunan berikutnya dengan terms khusus.',
  },
];

interface TierCardProps {
  tier: SponsorshipTier;
  isActive: boolean;
}

const TierCard = ({ tier, isActive }: TierCardProps) => {
  const getTierGradient = (tierType: string) => {
    switch (tierType) {
      case 'platinum':
        return 'linear-gradient(135deg, #F5A623 0%, #D4AF37 100%)';
      case 'gold':
        return 'linear-gradient(135deg, #F5A623 0%, #E09800 100%)';
      case 'silver':
        return 'linear-gradient(135deg, #00838F 0%, #006064 100%)';
      default:
        return 'linear-gradient(135deg, #1565C0 0%, #00838F 100%)';
    }
  };

  const getTierGlowColor = (tierType: string) => {
    switch (tierType) {
      case 'platinum':
        return 'rgba(245, 166, 35, 0.3)';
      case 'gold':
        return 'rgba(245, 166, 35, 0.2)';
      case 'silver':
        return 'rgba(0, 131, 143, 0.2)';
      default:
        return 'rgba(21, 101, 192, 0.2)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative h-full"
    >
      <div
        style={{
          boxShadow: `0 0 40px ${getTierGlowColor(tier.tier)}`,
          borderColor: 'var(--glass-border)',
        }}
        className="rounded-2xl overflow-hidden h-full flex flex-col border"
      >
        {/* Gradient Header */}
        <div
          style={{ background: getTierGradient(tier.tier) }}
          className="px-8 py-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: 'white' }} />
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-2">{tier.name}</h3>
            <p className="text-white/90 text-lg">{tier.price}</p>
          </div>
        </div>

        {/* Card Body */}
        <div
          className="flex-1 px-8 py-8"
          style={{ background: 'var(--color-bg-card)' }}
        >
          <div className="space-y-4">
            {tier.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex-shrink-0">
                  {feature.included ? (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      <CheckCircle
                        className="w-5 h-5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-5 h-5 border-2 rounded-full"
                      style={{
                        borderColor: 'var(--color-text-secondary)',
                        opacity: 0.3,
                      }}
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    feature.included ? '' : 'opacity-50'
                  }`}
                  style={{
                    color: feature.included
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {feature.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-8 py-6 border-t" style={{ borderColor: 'var(--glass-border)' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ background: 'var(--color-primary)' }}
            className="w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg"
          >
            Hubungi Kami
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const PartnerTypeCard = ({
  partner,
}: {
  partner: (typeof otherPartners)[0];
}) => {
  const Icon = partner.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass-card-dark rounded-xl p-8 h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className="p-3 rounded-lg"
          style={{
            background: 'var(--color-primary)',
            color: 'white',
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h4
          className="text-xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {partner.name}
        </h4>
      </div>
      <ul className="space-y-3">
        {partner.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: 'var(--color-primary)' }}
            />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const floatingSizes = [
  { w: 220, h: 180 },
  { w: 160, h: 200 },
  { w: 280, h: 140 },
  { w: 180, h: 240 },
  { w: 200, h: 160 },
];

const FloatingElement = ({
  delay,
  x,
  y,
  sizeIndex = 0,
}: {
  delay: number;
  x: string;
  y: string;
  sizeIndex?: number;
}) => {
  const size = floatingSizes[sizeIndex % floatingSizes.length];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15, y: [0, 20, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      <div
        className="rounded-full blur-3xl"
        style={{
          width: size.w,
          height: size.h,
          background: 'var(--color-primary)',
        }}
      />
    </motion.div>
  );
};

const PartnersMarquee = ({ logos, tier }: { logos: number[]; tier: string }) => {
  const extendedLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden rounded-lg">
      <motion.div
        className="flex gap-6"
        animate={{ x: [0, -50 * logos.length * 8] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {extendedLogos.map((i, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 rounded-lg p-6 flex items-center justify-center h-24 w-48 border"
            style={{
              background: 'var(--color-bg-card)',
              borderColor: 'var(--glass-border)',
            }}
          >
            <img
              src={`https://picsum.photos/200/100?random=${tier}-${i}`}
              alt={`${tier} partner ${i}`}
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FAQItem = ({ item, idx }: { item: (typeof faqItems)[0]; idx: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="glass-card-dark rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between"
      >
        <h4
          className="font-bold text-lg text-left"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {item.q}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: 'var(--color-primary)' }}
          />
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div
          className="px-8 py-6 border-t"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <p style={{ color: 'var(--color-text-secondary)' }}>{item.a}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SponsorshipPage() {
  const [expandedTier, setExpandedTier] = useState<string>('platinum');

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 md:py-32 overflow-hidden">
        <HeroBG variant="amber" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Crown className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-primary)' }}
            >
              Kemitraan Eksklusif 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Jadilah Mitra Strategis Indonesianisme 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Terhubung dengan pemimpin pikiran, pembuat kebijakan, dan innovator dalam gerakan transformasi Indonesia. Bangun brand presence Anda di platform yang paling berpengaruh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>500+ Peserta Premium</span>
            </div>
            <div className="hidden md:block w-px h-6" style={{ background: 'var(--glass-border)' }} />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>ROI Terukur</span>
            </div>
            <div className="hidden md:block w-px h-6" style={{ background: 'var(--glass-border)' }} />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Jangkauan Global</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Mengapa Bermitra dengan Kami?
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Akses ke platform eksklusif, jangkauan yang luas, dan dampak yang terukur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyPartnerItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.04, y: -6 }}
                className="glass-card-dark rounded-2xl overflow-hidden cursor-pointer group relative"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Hover gradient top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${item.accentColor}, transparent)`,
                  }}
                />

                <div className="p-6 flex flex-col h-full">
                  {/* Header: Icon with glow + title badge */}
                  <div className="flex items-start gap-3 mb-5">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${item.accentColor}25`,
                        color: item.accentColor,
                        boxShadow: `0 0 20px ${item.accentColor}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="font-bold text-sm leading-tight px-3 py-1 rounded-lg inline-block"
                        style={{
                          background: `${item.accentColor}15`,
                          color: item.accentColor,
                          fontWeight: '700',
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {/* BIG NUMBER */}
                  <div className="mb-3 flex-1">
                    <p
                      className="text-5xl md:text-6xl font-black leading-tight mb-3"
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}, ${item.accentColor}dd)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {item.stat}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Paket Kemitraan
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Pilih tier yang sesuai dengan visi dan anggaran brand Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sponsorshipTiers.map((tier) => (
            <div key={tier.id} onClick={() => setExpandedTier(tier.id)}>
              <TierCard tier={tier} isActive={expandedTier === tier.id} />
            </div>
          ))}
        </div>
      </section>

      {/* Other Partner Types */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Tipe Kemitraan Lainnya
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Peluang kerjasama khusus untuk berbagai industri dan sektor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherPartners.map((partner, idx) => (
            <PartnerTypeCard key={partner.id} partner={partner} />
          ))}
        </div>
      </section>

      {/* Current Partners Section */}
      <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Mitra Kami
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Organisasi terkemuka yang mendukung gerakan Indonesianisme
          </p>
        </motion.div>

        {/* Platinum Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Crown
              className="w-6 h-6"
              style={{ color: 'var(--color-primary)' }}
            />
            <h4
              className="text-2xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Platinum Partners
            </h4>
          </div>
          <PartnersMarquee logos={[1, 2, 3, 4]} tier="platinum" />
        </motion.div>

        {/* Gold Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award
              className="w-6 h-6"
              style={{ color: 'var(--color-primary)' }}
            />
            <h4
              className="text-2xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Gold Partners
            </h4>
          </div>
          <PartnersMarquee logos={[1, 2, 3, 4, 5, 6]} tier="gold" />
        </motion.div>

        {/* Silver Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Medal
              className="w-6 h-6"
              style={{ color: 'var(--color-primary)' }}
            />
            <h4
              className="text-2xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Silver Partners
            </h4>
          </div>
          <PartnersMarquee
            logos={[1, 2, 3, 4, 5, 6, 7, 8]}
            tier="silver"
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1565C0 0%, #00838F 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <FloatingElement delay={0} x="5%" y="10%" sizeIndex={3} />
            <FloatingElement delay={1} x="80%" y="70%" sizeIndex={4} />
          </div>

          <div className="relative z-10 px-8 md:px-12 py-16 md:py-20">
            <h3
              className="text-3xl md:text-5xl font-black mb-6"
              style={{ color: 'white' }}
            >
              Mari Bermitra untuk Dampak
            </h3>
            <p
              className="text-lg mb-8 max-w-2xl"
              style={{ color: 'rgba(255, 255, 255, 0.95)' }}
            >
              Hubungi tim partnership kami untuk mendiskusikan paket kustomisasi, benefit eksklusif, dan peluang kolaborasi strategis yang dapat disesuaikan dengan kebutuhan brand Anda.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:partnership@indonesianisme.com"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Proposal Lengkap
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/62"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:partnership@indonesianisme.com"
                className="px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Mail className="w-5 h-5" />
                Email
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 md:px-8 py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Pertanyaan Umum
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Temukan jawaban untuk pertanyaan kemitraan yang paling sering diajukan
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <FAQItem key={idx} item={item} idx={idx} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 md:px-8 py-16 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Siap untuk memulai?
          </h3>
          <p
            className="text-lg mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Tim kami siap membantu Anda menemukan paket kemitraan yang sempurna.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Hubungi Tim Partnership Kami
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
