'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Users,
  Mic,
  GraduationCap,
  Building2,
  Rocket,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Filter,
} from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  position: string;
  category: 'Pemerintah' | 'Industri' | 'Akademisi' | 'Future Leaders';
  sessionType: 'Keynote' | 'Panel' | 'Roundtable';
  bio: string;
  avatar: string;
}

const speakers: Speaker[] = [
  {
    id: '1',
    name: 'Dr. Ahmad Suryanto',
    position: 'Menteri Perindustrian',
    category: 'Pemerintah',
    sessionType: 'Keynote',
    bio: 'Pemimpin visioner dengan pengalaman lebih dari 20 tahun di sektor industri dan pemerintahan.',
    avatar: 'AS',
  },
  {
    id: '2',
    name: 'Prof. Siti Rahayu',
    position: 'Rektor ITB',
    category: 'Akademisi',
    sessionType: 'Keynote',
    bio: 'Akademisi terkemuka yang berkomitmen pada inovasi dan penelitian untuk Indonesia.',
    avatar: 'SR',
  },
  {
    id: '3',
    name: 'Budi Hartono',
    position: 'CEO PT Industri Nusantara',
    category: 'Industri',
    sessionType: 'Panel',
    bio: 'Entrepreneur sukses yang membangun ekosistem industri manufaktur berkelanjutan.',
    avatar: 'BH',
  },
  {
    id: '4',
    name: 'Dr. Maya Kartika',
    position: 'Direktur Bappenas',
    category: 'Pemerintah',
    sessionType: 'Panel',
    bio: 'Expert dalam perencanaan pembangunan dengan fokus pada transformasi struktural.',
    avatar: 'MK',
  },
  {
    id: '5',
    name: 'Reza Firmansyah',
    position: 'Founder TechNusantara',
    category: 'Future Leaders',
    sessionType: 'Panel',
    bio: 'Entrepreneur muda yang memimpin revolusi teknologi digital di Indonesia.',
    avatar: 'RF',
  },
  {
    id: '6',
    name: 'Prof. Hendra Wijaya',
    position: 'Dekan FTMD ITB',
    category: 'Akademisi',
    sessionType: 'Roundtable',
    bio: 'Akademisi berpengalaman dalam pengembangan material dan teknologi manufaktur.',
    avatar: 'HW',
  },
  {
    id: '7',
    name: 'Dewi Anggraini',
    position: 'VP Sustainability PT Pertamina',
    category: 'Industri',
    sessionType: 'Panel',
    bio: 'Pemimpin industri energi yang fokus pada transisi energi berkelanjutan.',
    avatar: 'DA',
  },
  {
    id: '8',
    name: 'Fajar Nugroho',
    position: 'Co-founder AgriTech ID',
    category: 'Future Leaders',
    sessionType: 'Roundtable',
    bio: 'Inovator di bidang pertanian teknologi untuk ketahanan pangan nasional.',
    avatar: 'FN',
  },
  {
    id: '9',
    name: 'Dr. Lina Marlina',
    position: 'Kepala BRIN',
    category: 'Pemerintah',
    sessionType: 'Keynote',
    bio: 'Pemimpin riset nasional yang mengintegrasikan sains untuk pembangunan Indonesia.',
    avatar: 'LM',
  },
  {
    id: '10',
    name: 'Arief Budiman',
    position: 'Managing Director McKinsey Indonesia',
    category: 'Industri',
    sessionType: 'Panel',
    bio: 'Konsultan strategis dengan expertise dalam transformasi ekonomi dan industri.',
    avatar: 'AB',
  },
  {
    id: '11',
    name: 'Sarah Putri',
    position: 'Youth Ambassador SDGs',
    category: 'Future Leaders',
    sessionType: 'Roundtable',
    bio: 'Aktivis muda yang menggerakkan generasi dalam agenda pembangunan berkelanjutan.',
    avatar: 'SP',
  },
  {
    id: '12',
    name: 'Prof. Wahyu Pramono',
    position: 'Guru Besar Ekonomi UI',
    category: 'Akademisi',
    sessionType: 'Panel',
    bio: 'Ekonom terkemuka dengan kontribusi signifikan dalam teori dan kebijakan ekonomi.',
    avatar: 'WP',
  },
];

const categories = ['Semua', 'Pemerintah', 'Industri', 'Akademisi', 'Future Leaders'] as const;
const sessionTypes = ['Semua', 'Keynote', 'Panel', 'Roundtable'] as const;

const categoryMeta: Record<string, { color: string; icon: typeof Users }> = {
  Pemerintah: { color: '#3B82F6', icon: Building2 },
  Industri: { color: '#F59E0B', icon: Rocket },
  Akademisi: { color: '#10B981', icon: GraduationCap },
  'Future Leaders': { color: '#8B5CF6', icon: Sparkles },
};

const sessionTypeMeta: Record<string, { color: string; icon: typeof Mic }> = {
  Keynote: { color: '#F59E0B', icon: Mic },
  Panel: { color: '#3B82F6', icon: MessageSquare },
  Roundtable: { color: '#10B981', icon: Users },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface SpeakerCardProps {
  speaker: Speaker;
  isExpanded: boolean;
  onToggle: () => void;
}

const SpeakerCard = ({ speaker, isExpanded, onToggle }: SpeakerCardProps) => {
  const catMeta = categoryMeta[speaker.category] || { color: '#6366F1', icon: Users };
  const sessMeta = sessionTypeMeta[speaker.sessionType] || { color: '#6366F1', icon: Mic };
  const CatIcon = catMeta.icon;

  return (
    <motion.div
      variants={itemVariants}
      onClick={onToggle}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card-dark rounded-2xl cursor-pointer group relative overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Top accent bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${catMeta.color}, ${sessMeta.color})`,
        }}
      />

      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar with glow ring */}
        <motion.div
          className="relative mb-5"
          whileHover={{ scale: 1.08 }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-black"
            style={{
              background: `linear-gradient(135deg, ${catMeta.color}, ${sessMeta.color})`,
              color: '#FFFFFF',
              boxShadow: `0 0 24px ${catMeta.color}40`,
            }}
          >
            {speaker.avatar}
          </div>
          {/* Session type mini badge */}
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: sessMeta.color,
              boxShadow: `0 2px 8px ${sessMeta.color}60`,
              border: '2px solid var(--color-bg-card)',
            }}
          >
            {(() => {
              const SessIcon = sessMeta.icon;
              return <SessIcon className="w-3.5 h-3.5 text-white" />;
            })()}
          </div>
        </motion.div>

        {/* Name */}
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {speaker.name}
        </h3>

        {/* Position */}
        <p
          className="text-sm mb-4 min-h-[40px]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {speaker.position}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
            style={{
              background: `${catMeta.color}15`,
              color: catMeta.color,
              border: `1px solid ${catMeta.color}30`,
            }}
          >
            <CatIcon className="w-3 h-3" />
            {speaker.category}
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{
              background: `${sessMeta.color}15`,
              color: sessMeta.color,
              border: `1px solid ${sessMeta.color}30`,
            }}
          >
            {speaker.sessionType}
          </span>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="mt-2"
          style={{ color: catMeta.color }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Expanded bio */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-6 py-5 border-t"
              style={{
                borderColor: `${catMeta.color}20`,
                background: `${catMeta.color}05`,
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {speaker.bio}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('Semua');
  const [selectedSessionType, setSelectedSessionType] = useState<typeof sessionTypes[number]>('Semua');
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) => {
      const matchesSearch =
        speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speaker.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || speaker.category === selectedCategory;
      const matchesSessionType =
        selectedSessionType === 'Semua' || speaker.sessionType === selectedSessionType;
      return matchesSearch && matchesCategory && matchesSessionType;
    });
  }, [searchQuery, selectedCategory, selectedSessionType]);

  const statItems = [
    { number: '12+', label: 'Pembicara', color: '#3B82F6', icon: Users },
    { number: '3', label: 'Keynote Speaker', color: '#F59E0B', icon: Mic },
    { number: '4', label: 'Kategori', color: '#10B981', icon: GraduationCap },
    { number: '3', label: 'Format Sesi', color: '#8B5CF6', icon: MessageSquare },
  ];

  return (
    <div style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 md:py-28 overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--color-primary), transparent)',
              opacity: 0.2,
            }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [30, 0, 30] }}
            transition={{ duration: 22, repeat: Infinity }}
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, #8B5CF6, transparent)',
              opacity: 0.15,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-primary)' }}
            >
              Narasumber & Pembicara
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Para Pemikir dan Pemimpin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Tokoh-tokoh visioner dari pemerintah, industri, akademisi, dan generasi muda yang membentuk masa depan Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        style={{
          background: 'var(--gradient-section-alt)',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 md:px-8 py-10"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
          }}
        >
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card-dark group relative overflow-hidden cursor-pointer"
                style={{
                  background: 'var(--color-bg-card)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${stat.color}20`,
                      boxShadow: `0 0 14px ${stat.color}25`,
                    }}
                  >
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>
                  <span
                    className="font-bold text-xs px-2 py-0.5 rounded-md"
                    style={{ background: `${stat.color}15`, color: stat.color }}
                  >
                    {stat.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '40px',
                    fontWeight: '900',
                    lineHeight: '1',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}bb)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.number}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Search & Filter Container */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2
            className="text-3xl md:text-4xl font-black mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Temukan Pembicara
          </h2>
          <p
            className="text-base"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Filter berdasarkan kategori, jenis sesi, atau cari langsung
          </p>
        </motion.div>

        {/* Filter Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-dark rounded-2xl p-6 md:p-8 mb-8"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-3.5 w-5 h-5"
              style={{ color: 'var(--color-primary)', opacity: 0.6 }}
            />
            <input
              type="text"
              placeholder="Cari pembicara berdasarkan nama atau posisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl pl-12 pr-12 py-3.5 text-sm font-medium outline-none transition-all"
              style={{
                background: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                border: '2px solid var(--glass-border)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Filter size={14} />
                Kategori
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const meta = cat === 'Semua'
                    ? { color: 'var(--color-primary)' }
                    : { color: categoryMeta[cat]?.color || '#6366F1' };
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                      style={{
                        background: isActive ? `${meta.color}` : 'transparent',
                        color: isActive ? '#FFFFFF' : meta.color as string,
                        border: isActive ? 'none' : `1.5px solid ${meta.color}40`,
                        boxShadow: isActive ? `0 4px 12px ${meta.color}40` : 'none',
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session Type Filter */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Mic size={14} />
                Jenis Sesi
              </h3>
              <div className="flex flex-wrap gap-2">
                {sessionTypes.map((type) => {
                  const meta = type === 'Semua'
                    ? { color: '#6366F1' }
                    : { color: sessionTypeMeta[type]?.color || '#6366F1' };
                  const isActive = selectedSessionType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedSessionType(type)}
                      className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
                      style={{
                        background: isActive ? `${meta.color}` : 'transparent',
                        color: isActive ? '#FFFFFF' : meta.color,
                        border: isActive ? 'none' : `1.5px solid ${meta.color}40`,
                        boxShadow: isActive ? `0 4px 12px ${meta.color}40` : 'none',
                      }}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Counter */}
          <div
            className="mt-6 pt-4 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--glass-border)' }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Menampilkan{' '}
              <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                {filteredSpeakers.length}
              </span>{' '}
              dari {speakers.length} pembicara
            </p>
            {(selectedCategory !== 'Semua' || selectedSessionType !== 'Semua' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSelectedSessionType('Semua');
                  setSearchQuery('');
                }}
                className="text-sm font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-primary)' }}
              >
                <X size={14} />
                Reset Filter
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Speakers Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2
            className="text-2xl md:text-3xl font-black mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Daftar Pembicara
          </h2>
          <p
            className="text-base"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Klik kartu untuk melihat profil singkat
          </p>
        </motion.div>

        {filteredSpeakers.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredSpeakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                isExpanded={expandedSpeaker === speaker.id}
                onToggle={() =>
                  setExpandedSpeaker(expandedSpeaker === speaker.id ? null : speaker.id)
                }
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center rounded-2xl py-16"
            style={{
              background: 'var(--color-bg-card)',
              border: '2px dashed var(--glass-border)',
            }}
          >
            <Search
              size={48}
              style={{ color: 'var(--color-text-secondary)', opacity: 0.3, margin: '0 auto 16px' }}
            />
            <p
              className="text-lg font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Tidak ada pembicara yang sesuai dengan filter Anda
            </p>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #1565C0 0%, #7C3AED 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-10 right-10 w-32 h-32 rounded-full"
              style={{ background: 'rgba(255,255,255,0.5)', filter: 'blur(40px)' }}
            />
          </div>
          <div className="relative z-10 px-8 md:px-12 py-14">
            <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'white' }}>
              Ingin Menjadi Pembicara?
            </h3>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Kami membuka kesempatan bagi para ahli dan pemimpin untuk berbagi visi di Indonesianisme 2026.
            </p>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-lg font-bold text-lg"
              style={{ background: 'white', color: '#1565C0' }}
            >
              Daftar Sekarang
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
