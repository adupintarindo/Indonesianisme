'use client';

import { motion } from 'framer-motion';
import { HeroBG } from '@/components/shared/HeroBG';
import {
  Shield, Cpu, Factory, Leaf, Zap, Droplet, Pickaxe,
  Network, GraduationCap, Heart, Palette, Building2, Recycle,
  CreditCard, Settings, Target, Star, Rocket, Landmark,
} from 'lucide-react';

// ── DATA ────────────────────────────────────────────────────────────────────

const pilarKarya = [
  {
    num: 1,
    name: 'Industrialisasi & Hilirisasi Strategis',
    icon: <Factory className="w-5 h-5" />,
    color: '#3B82F6',
    subtema: 'Penguatan basis industri melalui hilirisasi mineral, energi, pangan, teknologi, dan manufaktur',
    topics: [
      'Hilirisasi komoditas unggulan nasional',
      'Penguatan ekosistem industri dan rantai pasok',
    ],
  },
  {
    num: 2,
    name: 'Transisi & Ketahanan Energi',
    icon: <Zap className="w-5 h-5" />,
    color: '#F59E0B',
    subtema: 'Ketahanan energi melalui penguatan kapasitas energi domestik serta transformasi green energy',
    topics: [
      'Pengembangan energi terbarukan',
      'Penyelenggaraan mobilitas nasional',
    ],
  },
  {
    num: 3,
    name: 'Ketahanan Pangan & Air',
    icon: <Droplet className="w-5 h-5" />,
    color: '#10B981',
    subtema: 'Penguatan produktivitas, rantai nilai, dan pengelolaan sumber daya berkelanjutan',
    topics: [
      'Penguatan sistem pangan berkelanjutan',
      'Pengelolaan sumber daya air terpadu',
    ],
  },
  {
    num: 4,
    name: 'Transformasi Teknologi & Kedaulatan Digital',
    icon: <Cpu className="w-5 h-5" />,
    color: '#8B5CF6',
    subtema: 'Akselerasi adopsi teknologi dan artificial intelligence untuk meningkatkan daya saing industri',
    topics: [
      'Akselerasi transformasi digital',
      'Pemanfaatan AI dan data untuk produktivitas',
    ],
  },
];

const mesinSectors = [
  { num: '01', name: 'Energi & Transisi Energi', stat: 'Geotermal 40% cadangan dunia', icon: <Zap className="w-5 h-5" />, color: '#F59E0B' },
  { num: '02', name: 'Reindustrialisasi & Manufaktur', stat: 'Target manufaktur >25% PDB', icon: <Factory className="w-5 h-5" />, color: '#6366F1' },
  { num: '03', name: 'Hilirisasi Mineral Strategis', stat: 'Investasi EV: USD 545B hingga 2040', icon: <Pickaxe className="w-5 h-5" />, color: '#EC4899' },
  { num: '04', name: 'Kedaulatan Pangan & Air', stat: 'Impor gandum 100%, kedelai 97%', icon: <Droplet className="w-5 h-5" />, color: '#10B981' },
  { num: '05', name: 'AI & Ekonomi Digital', stat: 'GMV USD 100B+, defisit 600K talent AI', icon: <Cpu className="w-5 h-5" />, color: '#3B82F6' },
  { num: '06', name: 'Ekonomi Hijau & Keberlanjutan', stat: 'Kredit karbon: USD 100B+', icon: <Leaf className="w-5 h-5" />, color: '#14B8A6' },
  { num: '07', name: 'Infrastruktur & Konektivitas', stat: 'Logistik 23-25% PDB → target 15%', icon: <Network className="w-5 h-5" />, color: '#F97316' },
  { num: '08', name: 'SDM & Pendidikan Teknik', stat: 'Reverse brain drain & 600K AI talent gap', icon: <GraduationCap className="w-5 h-5" />, color: '#8B5CF6' },
];

const ekosistemSectors = [
  { name: 'Pertahanan & Alutsista', stat: 'TKDN alutsista meningkat', icon: <Shield className="w-5 h-5" />, color: '#3B82F6' },
  { name: 'Kesehatan & Farmasi', stat: 'Kemandirian farmasi nasional', icon: <Heart className="w-5 h-5" />, color: '#EF4444' },
  { name: 'Industri Kreatif & Branding', stat: 'Nation branding global', icon: <Palette className="w-5 h-5" />, color: '#A855F7' },
  { name: 'Danantara & SWF', stat: 'Konsolidasi aset USD 900B', icon: <Landmark className="w-5 h-5" />, color: '#F59E0B' },
  { name: 'Lingkungan & Air', stat: 'Restorasi DAS & desalinasi', icon: <Droplet className="w-5 h-5" />, color: '#06B6D4' },
  { name: 'Sampah & Ekonomi Sirkular', stat: 'PSEL 12 kota besar', icon: <Recycle className="w-5 h-5" />, color: '#22C55E' },
  { name: 'Keuangan Digital', stat: 'Inklusi keuangan pelosok', icon: <CreditCard className="w-5 h-5" />, color: '#3B82F6' },
  { name: 'Tata Kelola & UMKM', stat: 'Deregulasi & digitalisasi', icon: <Settings className="w-5 h-5" />, color: '#8B5CF6' },
];

const bodiFramework = [
  { name: 'Backbone', count: 32, pct: 40, color: '#3B82F6', icon: <Building2 className="w-6 h-6" />, desc: 'Infrastruktur fundamental: digital, logistik, tata kelola, energi dasar' },
  { name: 'Defensive', count: 24, pct: 30, color: '#22C55E', icon: <Shield className="w-6 h-6" />, desc: 'Substitusi impor: pangan, kesehatan/farmasi, mesin perkakas' },
  { name: 'Offensive', count: 16, pct: 20, color: '#F59E0B', icon: <Rocket className="w-6 h-6" />, desc: 'Daya saing global: baterai EV, pariwisata, industri kreatif' },
  { name: 'Image Leading', count: 8, pct: 10, color: '#EC4899', icon: <Star className="w-6 h-6" />, desc: 'High-tech & prestise: dirgantara, pertahanan, AI, semikonduktor' },
];

const lensaStrategis = [
  {
    name: 'VRIO',
    sub: 'Value, Rarity, Imitability, Organization',
    color: '#3B82F6',
    icon: <Star className="w-7 h-7" />,
    desc: 'Identifikasi sumber keunggulan kompetitif berkelanjutan Indonesia di kancah global.',
  },
  {
    name: 'BODI',
    sub: 'Backbone, Offensive, Defensive, Image Leading',
    color: '#F59E0B',
    icon: <Target className="w-7 h-7" />,
    desc: 'Kategorisasi peran strategis setiap gagasan dalam portofolio pembangunan nasional.',
  },
  {
    name: 'VUCA',
    sub: 'Volatility, Uncertainty, Complexity, Ambiguity',
    color: '#10B981',
    icon: <Shield className="w-7 h-7" />,
    desc: 'Memastikan ketahanan gagasan menghadapi lingkungan geopolitik yang bergejolak.',
  },
];

// ── STAT COUNTER ─────────────────────────────────────────────────────────────

const StatCounter = ({ number, label }: { number: string; label: string }) => (
  <motion.div
    className="rounded-xl p-6 text-center flex flex-col items-center justify-center"
    style={{
      background: 'var(--color-bg-card)',
      border: '1px solid var(--glass-border)',
      minHeight: '130px',
    }}
    whileHover={{ y: -4 }}
  >
    <p
      className="text-4xl md:text-5xl font-black mb-2"
      style={{ color: 'var(--color-primary)' }}
    >
      {number}
    </p>
    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
      {label}
    </p>
  </motion.div>
);

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function TopicsPage() {
  return (
    <div style={{ background: 'var(--color-bg-primary)' }}>

      {/* ── Hero ── */}
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
            <span>80 Gagasan</span>
            <span style={{ color: 'var(--color-primary)' }}> · </span>
            <span>16 Sektor</span>
            <span style={{ color: 'var(--color-primary)' }}> · </span>
            <span>4 Pilar Karya</span>
            <br />
            <span style={{ fontSize: '0.78em', opacity: 0.75 }}>
              untuk 8% Pertumbuhan Ekonomi Indonesia
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Peta jalan transformasi Indonesia — dari Reindustrialisasi hingga Kedaulatan Teknologi — menuju Kemandirian Bangsa 2045
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <StatCounter number="80" label="Gagasan" />
            <StatCounter number="16" label="Sektor" />
            <StatCounter number="4" label="Pilar Karya" />
          </motion.div>
        </div>
      </section>

      {/* ── Tema & Pilar Karya ── */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">

        {/* Header split */}
        <div className="grid md:grid-cols-[1fr_380px] gap-10 mb-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#10B981' }}>
              ABDI KARYA GANESHA MEMAJUKAN INDONESIA
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Tema &amp; Pilar Karya
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Abdi yang mencitrakan semangat diri untuk mewujudkan suatu karya nyata dalam membangun Indonesia menjadi negara yang{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>berdaulat, berdaya saing, dan berdikari</strong>.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
              Tema Utama
            </p>
            <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
              80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Reindustrialisasi, Kedaulatan Teknologi, dan Transformasi Struktural Menuju Kemandirian Bangsa
            </p>
          </motion.div>
        </div>

        {/* Pillar table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--glass-border)' }}>
          {/* Header row */}
          <div
            className="hidden md:grid grid-cols-[220px_1fr_1fr] px-6 py-3 gap-0"
            style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--glass-border)' }}
          >
            {['PILAR KARYA', 'SUBTEMA', 'TOPIK PEMBAHASAN'].map(h => (
              <p key={h} className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                {h}
              </p>
            ))}
          </div>

          {pilarKarya.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr] gap-4 md:gap-0 px-6 py-5"
              style={{
                background: 'var(--color-bg-card)',
                borderBottom: i < pilarKarya.length - 1 ? '1px solid var(--glass-border)' : 'none',
              }}
            >
              {/* Pilar */}
              <div className="flex items-center gap-3 md:pr-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${p.color}18`, color: p.color }}
                >
                  {p.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: p.color }}>
                    PILAR {p.num}
                  </p>
                  <p className="text-sm font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                    {p.name}
                  </p>
                </div>
              </div>

              {/* Subtema */}
              <p className="text-sm leading-relaxed md:pr-6" style={{ color: 'var(--color-text-secondary)' }}>
                {p.subtema}
              </p>

              {/* Topics */}
              <div className="space-y-2">
                {p.topics.map((t, ti) => (
                  <div key={ti} className="flex items-start gap-2">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: `${p.color}18`, color: p.color }}
                    >
                      {ti + 1}
                    </span>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 8 Sektor Mesin Pertumbuhan ── */}
      <section className="px-4 md:px-8 py-20" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
              8 SEKTOR PRIORITAS — MESIN PERTUMBUHAN
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Mesin Pertumbuhan Ekonomi
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Klik setiap sektor untuk melihat 5 gagasan strategis beserta peran BODI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mesinSectors.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
                className="rounded-2xl p-5 cursor-pointer transition-shadow"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xl font-black" style={{ color: 'var(--color-text-muted)', opacity: 0.35 }}>
                    {s.num}
                  </span>
                </div>
                <h4 className="font-bold text-sm mb-1 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                  {s.name}
                </h4>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: s.color }}>
                  {s.stat}
                </p>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  5 Gagasan
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ekosistem Penunjang ── */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
              8 SEKTOR PENDUKUNG — 40 GAGASAN
            </p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--color-text-primary)' }}>
              Ekosistem Penunjang Pertumbuhan
            </h2>
          </div>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Delapan sektor pendukung yang esensial untuk mendorong pertumbuhan holistik dan berkelanjutan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ekosistemSectors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--glass-border)',
                borderTop: `3px solid ${s.color}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: s.color }}>5 gagasan</span>
                </div>
                <h4 className="font-bold text-sm mb-1 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                  {s.name}
                </h4>
                <p className="text-xs" style={{ color: s.color }}>{s.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Kerangka BODI ── */}
      <section className="px-4 md:px-8 py-20" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
              DISTRIBUSI PORTOFOLIO
            </p>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--color-text-primary)' }}>
              Kerangka BODI — 80 Gagasan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bodiFramework.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--glass-border)',
                  borderTop: `3px solid ${b.color}`,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${b.color}18`, color: b.color }}
                >
                  {b.icon}
                </div>
                <p className="font-bold text-lg" style={{ color: b.color }}>{b.name}</p>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{b.count} gagasan</p>
                <p className="text-4xl font-black mb-3" style={{ color: b.color }}>{b.pct}%</p>
                <div className="h-1.5 rounded-full mb-4" style={{ background: 'var(--glass-border)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tiga Lensa Strategis ── */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>
            KERANGKA ANALISIS
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Tiga Lensa Strategis
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Setiap gagasan dianalisis melalui tiga lensa untuk memastikan ketajaman dan relevansi strategis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lensaStrategis.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: `${l.color}18`, color: l.color }}
              >
                {l.icon}
              </div>
              <h3 className="text-3xl font-black mb-1" style={{ color: l.color }}>{l.name}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>{l.sub}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 md:px-8 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl p-8 md:p-16 text-center overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), #0891B2)',
            boxShadow: '0 20px 60px rgba(37, 99, 235, 0.25)',
          }}
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'white', filter: 'blur(40px)' }}
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'white', filter: 'blur(40px)' }}
          />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Jelajahi 80 Gagasan Transformasi
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.92)' }}>
              Dari riset mendalam tentang kebijakan strategis hingga inisiatif komunitas lokal, temukan ide-ide yang akan membentuk masa depan Indonesia menuju kemakmuran berkelanjutan.
            </p>
            <motion.a
              href="/publications"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl font-bold text-lg inline-block"
              style={{ background: 'white', color: 'var(--color-primary)' }}
            >
              Lihat Semua 80 Gagasan
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
