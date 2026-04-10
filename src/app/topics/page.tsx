'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroBG } from '@/components/shared/HeroBG';
import {
  Shield,
  Cpu,
  Factory,
  Leaf,
  Globe,
  Users,
  ChevronDown,
  Zap,
  Droplet,
  Pickaxe,
  Wrench,
  Sprout,
  Network,
  GraduationCap,
} from 'lucide-react';

interface Pillar {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  dataPoints: { label: string; value: string }[];
  accentColor?: string;
}

interface Sector {
  id: string;
  title: string;
  icon: React.ReactNode;
  stat: string;
  description: string;
  fullDescription: string;
  accentColor?: string;
}

const pillars: Pillar[] = [
  {
    id: 'national-resilience',
    title: 'Ketahanan Nasional',
    icon: <Shield className="w-8 h-8" />,
    description: 'Membangun benteng ekonomi terhadap guncangan global',
    details:
      'Membangun benteng ekonomi terhadap guncangan global. Meliputi ketahanan pangan, keamanan energi, stabilitas fiskal, ketahanan siber, dan rantai pasok strategis.',
    dataPoints: [
      { label: 'Fokus Utama', value: '5 Komponen Strategis' },
      { label: 'Prioritas', value: 'Stabilitas Ekonomi' },
    ],
    accentColor: '#E53935',
  },
  {
    id: 'economic-sovereignty',
    title: 'Kedaulatan Ekonomi & Teknologi',
    icon: <Cpu className="w-8 h-8" />,
    description: 'Menguasai teknologi kunci untuk kemajuan bangsa',
    details:
      'Menguasai teknologi kunci: semikonduktor, baterai, bioteknologi, AI, energi bersih. Bergerak dari ekstraksi sumber daya menuju penciptaan nilai.',
    dataPoints: [
      { label: 'Teknologi Kunci', value: '5 Area Fokus' },
      { label: 'Transformasi', value: 'Ekstraksi → Nilai Tambah' },
    ],
    accentColor: '#1565C0',
  },
  {
    id: 'structural-independence',
    title: 'Kemandirian Struktural',
    icon: <Factory className="w-8 h-8" />,
    description: 'Pergeseran menuju manufaktur dan inovasi',
    details:
      'Pergeseran dari ekspor komoditas mentah ke produk manufaktur dan inovatif. Kemandirian produksi, teknologi, finansial, dan intelektual.',
    dataPoints: [
      { label: 'Target', value: 'Produk Inovatif' },
      { label: 'Dimensi', value: '4 Kemandirian' },
    ],
    accentColor: '#F57C00',
  },
  {
    id: 'sustainability',
    title: 'Keberlanjutan',
    icon: <Leaf className="w-8 h-8" />,
    description: 'Transisi energi hijau dan ekonomi sirkular',
    details:
      'Transisi energi hijau, ekonomi sirkular, pemanfaatan biodiversitas bertanggung jawab. Indonesia sebagai "paru-paru dunia" dalam ekonomi hijau.',
    dataPoints: [
      { label: 'Status', value: 'Biodiversitas Tertinggi ke-2' },
      { label: 'Peran', value: 'Paru-paru Dunia' },
    ],
    accentColor: '#43A047',
  },
  {
    id: 'global-competitiveness',
    title: 'Daya Saing Global',
    icon: <Globe className="w-8 h-8" />,
    description: 'Membangun daya saing berbasis kualitas dan inovasi',
    details:
      'Membangun daya saing berbasis kualitas, inovasi, dan branding. Menavigasi fragmentasi perdagangan AS-China.',
    dataPoints: [
      { label: 'Basis', value: 'Kualitas & Inovasi' },
      { label: 'Tantangan', value: 'Fragmentasi Global' },
    ],
    accentColor: '#00838F',
  },
  {
    id: 'inequality-reduction',
    title: 'Pengentasan Kesenjangan',
    icon: <Users className="w-8 h-8" />,
    description: 'Pertumbuhan yang menguntungkan semua lapisan',
    details:
      'Pertumbuhan yang menguntungkan semua lapisan dan wilayah. Kelas menengah menurun dari 21.45% (2019) ke 17.33% (2024) — harus dipulihkan.',
    dataPoints: [
      { label: 'Penurunan Kelas Menengah', value: '4.12 poin persen' },
      { label: 'Target', value: 'Restorasi & Pertumbuhan' },
    ],
    accentColor: '#7B1FA2',
  },
];

const sectors: Sector[] = [
  {
    id: 'energy',
    title: 'Energi & Transisi Energi',
    icon: <Zap className="w-6 h-6" />,
    stat: '12%',
    description: 'Status pencapaian terbarukan dari target 23%',
    fullDescription:
      'Indonesia memiliki 40% cadangan geotermal dunia. Akselerasi transisi energi ke terbarukan adalah prioritas strategis untuk keberlanjutan dan keamanan energi.',
    accentColor: '#F57C00',
  },
  {
    id: 'technology',
    title: 'Teknologi & Kedaulatan Digital',
    icon: <Cpu className="w-6 h-6" />,
    stat: '5',
    description: 'Area fokus utama: AI, semikonduktor, infrastruktur data',
    fullDescription:
      'Industri 4.0, infrastruktur cloud, dan kepemilikan data nasional adalah komponen kritis untuk kedaulatan digital dan transformasi ekonomi.',
    accentColor: '#1565C0',
  },
  {
    id: 'food-security',
    title: 'Ketahanan Pangan & Air',
    icon: <Droplet className="w-6 h-6" />,
    stat: '100%',
    description: 'Impor gandum dan bawang putih dari luar',
    fullDescription:
      'Impor kritis meliputi gandum 100%, kedelai 97%, gula 70%, bawang putih 100%. Kemandirian pangan adalah isu keamanan nasional.',
    accentColor: '#43A047',
  },
  {
    id: 'mineral',
    title: 'Hilirisasi Mineral Strategis',
    icon: <Pickaxe className="w-6 h-6" />,
    stat: '82%',
    description: 'Ekspor nikel mentah ke China tanpa nilai tambah',
    fullDescription:
      'Nikel, tembaga, timah, rare earth. Hilirisasi mineral strategis akan menciptakan nilai tambah dan pekerjaan berkualitas.',
    accentColor: '#D32F2F',
  },
  {
    id: 'manufacturing',
    title: 'Manufaktur Strategis',
    icon: <Wrench className="w-6 h-6" />,
    stat: '19%',
    description: 'Kontribusi manufaktur turun dari 22% (2010)',
    fullDescription:
      'Peringatan deindustrialisasi. Penguatan manufaktur basis teknologi dan efisiensi adalah kunci pertumbuhan berkelanjutan.',
    accentColor: '#00838F',
  },
  {
    id: 'green-economy',
    title: 'Ekonomi Hijau & Biodiversitas',
    icon: <Sprout className="w-6 h-6" />,
    stat: '2',
    description: 'Peringkat biodiversitas tertinggi di dunia',
    fullDescription:
      'Indonesia memiliki biodiversitas tertinggi ke-2 dunia. Ekonomi hijau membuka peluang baru untuk pertumbuhan berkelanjutan dan konservasi.',
    accentColor: '#2E7D32',
  },
  {
    id: 'infrastructure',
    title: 'Infrastruktur Fisik & Digital',
    icon: <Network className="w-6 h-6" />,
    stat: '∞',
    description: 'Transportasi, konektivitas, jaringan digital',
    fullDescription:
      'Investasi infrastruktur adalah fondasi untuk konektivitas regional, efisiensi logistik, dan inklusi digital seluruh nusantara.',
    accentColor: '#7B1FA2',
  },
  {
    id: 'human-capital',
    title: 'Pengembangan SDM & Pendidikan',
    icon: <GraduationCap className="w-6 h-6" />,
    stat: '15-19%',
    description: 'NEET (pemuda tidak bekerja/sekolah)',
    fullDescription:
      'Investasi pendidikan berkualitas dan relevan industri adalah investasi terbaik untuk bonus demografi dan pertumbuhan jangka panjang.',
    accentColor: '#E53935',
  },
];

const ExpandablePillarCard = ({ pillar }: { pillar: Pillar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer"
    >
      <motion.div
        className="glass-card-dark rounded-xl p-6 hover:shadow-lg transition-all overflow-hidden"
        whileHover={{ scale: 1.02 }}
        style={{
          border: `1px solid var(--glass-border)`,
          background: 'var(--color-bg-card)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderLeft: `4px solid ${pillar.accentColor}`,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <motion.div
              className="mt-1 flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: `${pillar.accentColor}20`,
                color: pillar.accentColor,
              }}
            >
              {pillar.icon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {pillar.title}
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {pillar.description}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="flex-shrink-0 ml-2"
            style={{ color: pillar.accentColor }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6"
            style={{ borderTop: `1px solid ${pillar.accentColor}20` }}
          >
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {pillar.details}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillar.dataPoints.map((point) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg p-4"
                  style={{
                    background: `${pillar.accentColor}10`,
                    border: `1px solid ${pillar.accentColor}30`,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {point.label}
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: pillar.accentColor }}
                  >
                    {point.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const SectorCard = ({ sector }: { sector: Sector }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass-card-dark rounded-2xl cursor-pointer overflow-hidden group relative"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        background: 'var(--color-bg-card)',
        border: `1px solid var(--glass-border)`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Gradient top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${sector.accentColor}, transparent)`,
        }}
      />

      <div className="p-6 h-full flex flex-col">
        {/* Header: Icon and Title with colored badge */}
        <div className="flex items-start gap-3 mb-6">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `${sector.accentColor}25`,
              color: sector.accentColor,
              boxShadow: `0 0 20px ${sector.accentColor}30`,
            }}
          >
            {sector.icon}
          </motion.div>

          {/* Title with colored pill background */}
          <div className="flex-1 min-w-0">
            <h4
              className="font-bold text-sm leading-tight px-3 py-1 rounded-lg inline-block"
              style={{
                background: `${sector.accentColor}15`,
                color: sector.accentColor,
                fontWeight: '700',
              }}
            >
              {sector.title}
            </h4>
          </div>
        </div>

        {/* BIG ASS NUMBER - VERY PROMINENT */}
        <div className="mb-4 flex-1">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p
              className="text-5xl md:text-6xl font-black leading-tight mb-3"
              style={{
                color: sector.accentColor,
                background: `linear-gradient(135deg, ${sector.accentColor}, ${sector.accentColor}dd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {sector.stat}
            </p>
          </motion.div>

          {/* Description text */}
          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {sector.description}
          </p>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="flex justify-center pt-2"
          style={{ color: sector.accentColor }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t px-6 py-4"
          style={{
            borderTopColor: `${sector.accentColor}30`,
            background: `${sector.accentColor}05`,
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {sector.fullDescription}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Stat counter component
const StatCounter = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => {
  return (
    <motion.div
      className="glass-card-dark rounded-xl p-6 text-center flex flex-col items-center justify-center"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--glass-border)',
        minHeight: '140px',
      }}
      whileHover={{ y: -4 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p
          className="text-4xl md:text-5xl font-black mb-2"
          style={{
            color: 'var(--color-primary)',
            background: 'linear-gradient(135deg, var(--color-primary), #00838F)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {number}
        </p>
      </motion.div>
      <p
        className="text-sm font-semibold"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </p>
    </motion.div>
  );
};

export default function TopicsPage() {
  return (
    <div style={{ background: 'var(--color-bg-primary)' }}>
      {/* Hero Section with gradient mesh background */}
      <section className="relative px-4 md:px-8 py-20 md:py-32 overflow-hidden">
        <HeroBG variant="blue" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <span>6 Pilar Strategis</span>
            <span style={{ color: 'var(--color-primary)' }}> · </span>
            <span>8 Sektor Prioritas</span>
            <span style={{ color: 'var(--color-primary)' }}> · </span>
            <span>80 Gagasan</span>
            <br />
            <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
              untuk Indonesia Maju
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Menjelajahi dimensi strategis transformasi Indonesia menuju daya saing
            global dan kesejahteraan berkelanjutan
          </motion.p>

          {/* Stats counters below hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <StatCounter number="80" label="Gagasan" />
            <StatCounter number="16" label="Sektor" />
            <StatCounter number="6" label="Pilar" />
          </motion.div>
        </div>
      </section>

      {/* Strategic Pillars Section */}
      <section
        className="px-4 md:px-8 py-20 max-w-6xl mx-auto"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--gradient-section-alt))',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            6 Pilar Strategis
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Fondasi transformasi nasional untuk ketahanan, kedaulatan, dan daya
            saing global
          </p>
        </motion.div>

        <div className="space-y-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ExpandablePillarCard pillar={pillar} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Priority Sectors Section */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            8 Sektor Prioritas
          </h2>
          <p
            className="text-lg"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Area fokus dengan dampak multiplier tertinggi untuk transformasi
            ekonomi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <SectorCard sector={sector} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 80 Ideas CTA Section */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl p-8 md:p-16 text-center overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), #00838F)',
            boxShadow: '0 20px 60px rgba(21, 101, 192, 0.3)',
          }}
        >
          {/* Floating decorative elements */}
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'rgba(255, 255, 255, 0.5)', filter: 'blur(40px)' }}
          />
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'rgba(255, 255, 255, 0.5)', filter: 'blur(40px)' }}
          />

          <div className="relative z-10">
            <h3
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ color: 'white' }}
            >
              Jelajahi 80 Gagasan Transformasi
            </h3>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.95)' }}
            >
              Dari riset mendalam tentang kebijakan strategis hingga inisiatif
              komunitas lokal, temukan ide-ide yang akan membentuk masa depan
              Indonesia menuju kemakmuran berkelanjutan.
            </p>
            <motion.a
              href="/publications"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg inline-block"
              style={{
                background: 'white',
                color: 'var(--color-primary)',
              }}
            >
              Lihat Semua 80 Gagasan
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
