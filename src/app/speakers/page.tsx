'use client';

import { useState, useMemo } from 'react';
import { HeroBG } from '@/components/shared/HeroBG';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { speakers, type Speaker } from '@/data/speakers';
import {
  Search, X, Users, Mic, GraduationCap, Building2,
  Rocket, MessageSquare, Sparkles, Filter, Clock,
  ChevronRight, ChevronLeft, Calendar,
} from 'lucide-react';


/* ─── Featured Sessions Data ─── */
const featuredSessions = [
  {
    stage: 'Ganesha Bicara',
    type: 'Keynote',
    time: 'Hari 1  |  09.00 – 10.30',
    color: '#F59E0B',
    title: '80 Gagasan IA-ITB: Dari Riset Akademis Menjadi Kebijakan Nasional',
    speakers: [
      { name: 'Rektor Institut Teknologi Bandung', title: 'Institut Teknologi Bandung', initials: 'ITB' },
      { name: 'Kepala Bappenas', title: 'Kementerian PPN/Bappenas', initials: 'BP' },
    ],
    moderator: { name: 'Ketua Steering Committee', title: 'Indonesianisme 2026', initials: 'SC' },
    discussions: [
      { number: 1, title: 'Relevansi Riset', points: ['Seberapa jauh riset perguruan tinggi telah memengaruhi kebijakan industri Indonesia?', 'Apa hambatan struktural antara dunia akademis dan pengambil keputusan?'] },
      { number: 2, title: 'Agenda 80 Gagasan', points: ['Dari 80 gagasan IA-ITB, mana yang paling siap diimplementasikan dalam 3 tahun ke depan?', 'Bagaimana mekanisme adopsi gagasan dari forum ini ke dalam program pemerintah?'] },
      { number: 3, title: 'Menuju 8 Persen', points: ['Apakah target 8% pertumbuhan ekonomi realistis tanpa lompatan transformasi struktural?', 'Apa tiga kebijakan paling kritis yang harus dijalankan segera?'] },
    ],
  },
  {
    stage: 'Ganesha Diskusi',
    type: 'Panel',
    time: 'Hari 2  |  10.00 – 11.30',
    color: '#3B82F6',
    title: 'Reindustrialisasi Indonesia: Mimpi Besar atau Keniscayaan Ekonomi?',
    speakers: [
      { name: 'Menko Perekonomian RI', title: 'Kementerian Koordinator Perekonomian', initials: 'MK' },
      { name: 'CEO Holding Industri BUMN', title: 'Kementerian BUMN', initials: 'HI' },
      { name: 'Ekonom Senior', title: 'Center for Strategic & International Studies', initials: 'CS' },
    ],
    moderator: { name: 'Dosen Ekonomi ITB', title: 'Fakultas Ekonomi & Bisnis ITB', initials: 'EK' },
    discussions: [
      { number: 1, title: 'Diagnosis Struktural', points: ['Mengapa Indonesia masih terjebak dalam middle-income trap setelah dua dekade reformasi?', 'Sektor mana yang paling kritis untuk menopang reindustrialisasi jangka panjang?'] },
      { number: 2, title: 'Peran BUMN & Swasta', points: ['Bagaimana reposisi BUMN sebagai katalis industri, bukan sekadar entitas komersial?', 'Insentif apa yang diperlukan agar sektor swasta berani masuk ke industri berteknologi tinggi?'] },
      { number: 3, title: 'Rantai Nilai Global', points: ['Bagaimana Indonesia bisa naik ke posisi lebih tinggi dalam rantai nilai global komoditas?', 'Apakah hilirisasi cukup, atau perlu lompatan langsung ke industri manufaktur kompleks?'] },
    ],
  },
  {
    stage: 'Ganesha Diskusi',
    type: 'Panel',
    time: 'Hari 3  |  09.30 – 11.00',
    color: '#10B981',
    title: 'Kedaulatan Pangan 2045: Strategi Nasional di Tengah Krisis Iklim dan Geopolitik',
    speakers: [
      { name: 'Menteri Pertanian RI', title: 'Kementerian Pertanian', initials: 'MP' },
      { name: 'Direktur Eksekutif IFSR', title: 'Indonesia Food Security Review', initials: 'IF' },
      { name: 'Guru Besar Agribisnis IPB', title: 'Institut Pertanian Bogor', initials: 'IP' },
    ],
    moderator: { name: 'Peneliti Senior', title: 'Food & Agriculture Organization (FAO)', initials: 'FA' },
    discussions: [
      { number: 1, title: 'Kerentanan Sistem Pangan', points: ['Seberapa rentan ketahanan pangan Indonesia terhadap gangguan iklim ekstrem dan konflik geopolitik?', 'Di mana titik lemah terbesar dalam rantai pasok pangan nasional saat ini?'] },
      { number: 2, title: 'Strategi Hulu', points: ['Bagaimana mengembalikan daya tarik sektor pertanian bagi generasi muda produktif?', 'Teknologi pertanian apa yang paling relevan dan scalable untuk petani kecil Indonesia?'] },
      { number: 3, title: 'Politik & Anggaran', points: ['Apakah anggaran pertanian Indonesia sudah mencerminkan urgensi kedaulatan pangan?', 'Bagaimana membangun konsensus politik lintas pemerintahan untuk agenda jangka panjang ini?'] },
    ],
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

/* ─── Speaker Card ─── */
interface SpeakerCardProps {
  speaker: Speaker;
  onClick: () => void;
}

const SpeakerCard = ({ speaker, onClick }: SpeakerCardProps) => {
  const catMeta = categoryMeta[speaker.category] || { color: '#6366F1', icon: Users };
  const sessMeta = sessionTypeMeta[speaker.sessionType] || { color: '#6366F1', icon: Mic };
  const SessIcon = sessMeta.icon;
  const CatIcon = catMeta.icon;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="glass-card-dark cursor-pointer group overflow-hidden flex"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        borderRadius: '16px',
        minHeight: '148px',
      }}
    >
      {/* Top accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${catMeta.color}, ${sessMeta.color})` }}
      />

      {/* Photo */}
      <div className="w-28 shrink-0 relative overflow-hidden" style={{ minHeight: '148px' }}>
        <Image
          src={speaker.img}
          alt={speaker.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="112px"
        />
        {/* Category dot */}
        <div
          className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full ring-2 ring-black/30"
          style={{ background: catMeta.color }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
        <div>
          {/* Session + time */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: `${sessMeta.color}18`, color: sessMeta.color, border: `1px solid ${sessMeta.color}30` }}
            >
              <SessIcon size={9} />
              {speaker.sessionType}
            </span>
            <span
              className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}
            >
              <Clock size={9} />
              {speaker.sessionTime}
            </span>
          </div>

          {/* Name + position */}
          <h3
            className="text-sm font-bold leading-tight mb-0.5 line-clamp-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {speaker.name}
          </h3>
          <p
            className="text-[11px] mb-2 line-clamp-1"
            style={{ color: catMeta.color, fontWeight: 600 }}
          >
            {speaker.position}
          </p>

          {/* Bio */}
          <p
            className="text-[11px] leading-relaxed line-clamp-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {speaker.bio}
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1 mt-2 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: catMeta.color }}
        >
          Lihat Profil & Panel
          <ChevronRight size={11} />
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Speaker Modal ─── */
interface SpeakerModalProps {
  speaker: Speaker;
  allSpeakers: Speaker[];
  onClose: () => void;
}

const SpeakerModal = ({ speaker: initialSpeaker, allSpeakers, onClose }: SpeakerModalProps) => {
  const [current, setCurrent] = useState(initialSpeaker);

  // Build unique panels list
  const panels = useMemo(() => {
    const map = new Map<string, { panelId: string; sessionName: string; sessionTime: string; members: Speaker[] }>();
    allSpeakers.forEach(s => {
      if (!map.has(s.panelId)) map.set(s.panelId, { panelId: s.panelId, sessionName: s.sessionName, sessionTime: s.sessionTime, members: [] });
      map.get(s.panelId)!.members.push(s);
    });
    return Array.from(map.values());
  }, [allSpeakers]);

  const [panelIdx, setPanelIdx] = useState(() => panels.findIndex(p => p.panelId === initialSpeaker.panelId));
  const activePanel = panels[panelIdx] ?? panels[0];
  const panelMates = activePanel.members.filter(s => s.id !== current.id);

  const catMeta = categoryMeta[current.category] || { color: '#6366F1', icon: Users };
  const sessMeta = sessionTypeMeta[current.sessionType] || { color: '#6366F1', icon: Mic };
  const CatIcon = catMeta.icon;
  const SessIcon = sessMeta.icon;

  const goPrevPanel = () => setPanelIdx(i => (i - 1 + panels.length) % panels.length);
  const goNextPanel = () => setPanelIdx(i => (i + 1) % panels.length);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      />

      {/* Modal wrapper — flexbox centering avoids conflict with framer-motion y transform */}
      <div
        key="modal-wrapper"
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto flex overflow-hidden w-full"
          style={{
            maxWidth: '960px',
            maxHeight: '88vh',
            borderRadius: '20px',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}
        >
        {/* ── Left: Profile ── */}
        <div className="flex-1 overflow-y-auto min-w-0">
          {/* Gradient top bar */}
          <div className="h-1.5 w-full shrink-0"
            style={{ background: `linear-gradient(90deg, ${catMeta.color}, ${sessMeta.color})` }} />

          <div className="p-6 md:p-8">
            {/* Close */}
            <button
              onClick={onClose}
              className="float-right ml-4 mb-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}
            >
              <X size={16} />
            </button>

            {/* Photo + identity */}
            <div className="flex gap-5 mb-5 items-start">
              <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden"
                style={{ outline: `2px solid ${catMeta.color}40`, outlineOffset: '3px' }}>
                <Image src={current.img} alt={current.name} width={80} height={96}
                  className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h2 className="text-xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {current.name}
                </h2>
                <p className="text-sm font-semibold mb-3" style={{ color: catMeta.color }}>
                  {current.position}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${catMeta.color}15`, color: catMeta.color, border: `1px solid ${catMeta.color}30` }}>
                    <CatIcon size={11} /> {current.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${sessMeta.color}15`, color: sessMeta.color, border: `1px solid ${sessMeta.color}30` }}>
                    <SessIcon size={11} /> {current.sessionType}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
              Profil
            </h4>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              {current.bio}
            </p>

            {/* Session */}
            <div className="rounded-xl p-4" style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--glass-border)' }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                Jadwal Sesi
              </h4>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${sessMeta.color}18`, color: sessMeta.color }}>
                  <SessIcon size={15} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    {current.sessionName}
                  </p>
                  <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    <Clock size={10} /> {current.sessionTime}
                    <span className="mx-0.5">·</span>
                    <Calendar size={10} /> 15–17 Oktober 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Panel Sidebar ── */}
        <div className="w-60 shrink-0 flex flex-col overflow-hidden"
          style={{ borderLeft: '1px solid var(--glass-border)', background: 'var(--color-bg-primary)' }}>

          {/* Panel nav header */}
          <div className="p-4 shrink-0" style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <button onClick={goPrevPanel}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:opacity-80 shrink-0"
                style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}>
                <ChevronLeft size={13} />
              </button>
              <div className="flex-1 px-2 text-center">
                <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Panel {panelIdx + 1} / {panels.length}
                </p>
                <p className="text-[11px] font-bold leading-tight line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
                  {activePanel.sessionName}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {activePanel.sessionTime}
                </p>
              </div>
              <button onClick={goNextPanel}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:opacity-80 shrink-0"
                style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Panelists list */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Pembicara Panel
            </p>
            <div className="space-y-2">
              {activePanel.members.map(p => {
                const pCat = categoryMeta[p.category] || { color: '#6366F1', icon: Users };
                const isActive = p.id === current.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => { setCurrent(p); setPanelIdx(panels.findIndex(pl => pl.panelId === p.panelId)); }}
                    className="w-full flex gap-3 items-center p-3 rounded-xl transition-all text-left"
                    style={{
                      background: isActive ? `${pCat.color}12` : 'var(--color-bg-card)',
                      border: `1px solid ${isActive ? pCat.color + '40' : 'var(--glass-border)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <div className="w-10 h-12 shrink-0 rounded-lg overflow-hidden"
                      style={{ outline: `1.5px solid ${pCat.color}${isActive ? '60' : '25'}`, outlineOffset: '1px' }}>
                      <Image src={p.img} alt={p.name} width={40} height={48}
                        className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight mb-0.5 line-clamp-1"
                        style={{ color: isActive ? pCat.color : 'var(--color-text-primary)' }}>
                        {p.name}
                      </p>
                      <p className="text-[10px] leading-tight line-clamp-1 font-semibold" style={{ color: pCat.color }}>
                        {p.position}
                      </p>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full mt-1"
                        style={{ background: `${pCat.color}15`, color: pCat.color }}>
                        {p.category}
                      </span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: pCat.color }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ─── Page ─── */
export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('Semua');
  const [selectedSessionType, setSelectedSessionType] = useState<typeof sessionTypes[number]>('Semua');
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter(s => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || s.category === selectedCategory;
      const matchesSessionType = selectedSessionType === 'Semua' || s.sessionType === selectedSessionType;
      return matchesSearch && matchesCategory && matchesSessionType;
    });
  }, [searchQuery, selectedCategory, selectedSessionType]);

  const statItems = [
    { number: '12+', label: 'Pembicara', color: '#3B82F6', icon: Users },
    { number: '4', label: 'Sesi Utama', color: '#F59E0B', icon: Mic },
    { number: '4', label: 'Kategori', color: '#10B981', icon: GraduationCap },
    { number: '3', label: 'Format', color: '#8B5CF6', icon: MessageSquare },
  ];

  return (
    <div style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="relative px-4 md:px-8 py-20 md:py-28 overflow-hidden">
        <HeroBG variant="purple" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
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
            Tokoh-tokoh visioner dari pemerintah, industri, akademisi, dan generasi muda. Klik profil untuk melihat sesi dan sesama panelis.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: 'var(--gradient-section-alt)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass-card-dark p-5 rounded-2xl group relative overflow-hidden"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: stat.color }} />
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                       style={{ background: `${stat.color}20` }}>
                    <Icon size={16} style={{ color: stat.color }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</span>
                </div>
                <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.number}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-dark rounded-2xl p-6 md:p-8"
          style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 w-4 h-4" style={{ color: 'var(--color-primary)', opacity: 0.6 }} />
            <input
              type="text"
              placeholder="Cari pembicara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl pl-11 pr-10 py-3 text-sm outline-none transition-all"
              style={{
                background: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                border: '1.5px solid var(--glass-border)',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-3.5" style={{ color: 'var(--color-text-muted)' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                <Filter size={11} /> Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => {
                  const color = cat === 'Semua' ? 'var(--color-primary)' : (categoryMeta[cat]?.color || '#6366F1');
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: isActive ? color : 'transparent',
                        color: isActive ? '#fff' : color as string,
                        border: `1.5px solid ${isActive ? color : `${color}40`}`,
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                <Mic size={11} /> Jenis Sesi
              </p>
              <div className="flex flex-wrap gap-2">
                {sessionTypes.map(type => {
                  const color = type === 'Semua' ? '#6366F1' : (sessionTypeMeta[type]?.color || '#6366F1');
                  const isActive = selectedSessionType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedSessionType(type)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: isActive ? color : 'transparent',
                        color: isActive ? '#fff' : color,
                        border: `1.5px solid ${isActive ? color : `${color}40`}`,
                      }}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Count + reset */}
          <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Menampilkan{' '}
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{filteredSpeakers.length}</span>
              {' '}dari {speakers.length} pembicara
            </p>
            {(selectedCategory !== 'Semua' || selectedSessionType !== 'Semua' || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory('Semua'); setSelectedSessionType('Semua'); setSearchQuery(''); }}
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: 'var(--color-primary)' }}
              >
                <X size={12} /> Reset
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Speaker Grid ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-24">
        <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Daftar Pembicara
        </h2>

        {filteredSpeakers.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredSpeakers.map((speaker, idx) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative"
              >
                <SpeakerCard
                  speaker={speaker}
                  onClick={() => setActiveSpeaker(speaker)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ background: 'var(--color-bg-card)', border: '2px dashed var(--glass-border)' }}
          >
            <Search size={40} style={{ color: 'var(--color-text-muted)', opacity: 0.3, margin: '0 auto 12px' }} />
            <p style={{ color: 'var(--color-text-muted)' }}>Tidak ada pembicara yang sesuai</p>
          </div>
        )}
      </section>

      {/* ── Sesi Unggulan ── */}
      <section
        className="max-w-6xl mx-auto px-4 md:px-8 py-20"
        style={{ borderTop: '1px solid var(--glass-border)' }}
      >
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F59E0B20, #3B82F620)' }}
            >
              <Mic size={18} style={{ color: '#F59E0B' }} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--color-primary)' }}>
              Sesi Unggulan
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Diskusi Terbaik Indonesia
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
            Sesi mendalam bersama pakar, pejabat, dan pemikir lintas sektor dalam format yang dirancang untuk menghasilkan gagasan konkret.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-6">
          {featuredSessions.map((session, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.14)',
              }}
            >
              {/* Top accent bar */}
              <div className="h-0.75 w-full" style={{ background: `linear-gradient(90deg, ${session.color}, ${session.color}44)` }} />

              {/* Header strip */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                style={{ background: `${session.color}0d`, borderBottom: '1px solid var(--glass-border)' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
                    style={{ background: `${session.color}22`, color: session.color, border: `1px solid ${session.color}44` }}
                  >
                    {session.stage}
                  </span>
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)', border: '1px solid var(--glass-border)' }}
                  >
                    {session.type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <Clock size={13} />
                  {session.time}
                </div>
              </div>

              {/* Body */}
              <div className="grid lg:grid-cols-[5fr_7fr]">

                {/* Left: Title + Speakers */}
                <div className="px-6 py-7 lg:border-r" style={{ borderColor: 'var(--glass-border)' }}>
                  <h3
                    className="text-base font-black leading-snug mb-7"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {session.title}
                  </h3>

                  {/* Speakers */}
                  <div className="space-y-3 mb-7">
                    {session.speakers.map((spk, si) => (
                      <div key={si} className="flex items-center gap-3">
                        <div
                          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black"
                          style={{
                            background: `${session.color}18`,
                            color: session.color,
                            border: `1.5px solid ${session.color}40`,
                          }}
                        >
                          {spk.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                            {spk.name}
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                            {spk.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Moderator */}
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--glass-border)' }}
                  >
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid var(--glass-border)' }}
                    >
                      {session.moderator.initials}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        Moderator
                      </p>
                      <p className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        {session.moderator.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Key Discussions */}
                <div className="px-6 py-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-5" style={{ color: session.color }}>
                    Key Discussions
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {session.discussions.map((disc) => (
                      <div
                        key={disc.number}
                        className="rounded-xl p-4"
                        style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--glass-border)' }}
                      >
                        {/* Number + title */}
                        <div className="flex items-start gap-2.5 mb-3">
                          <span
                            className="shrink-0 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center mt-0.5"
                            style={{ background: `${session.color}22`, color: session.color, border: `1px solid ${session.color}44` }}
                          >
                            {disc.number}
                          </span>
                          <p className="text-xs font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                            {disc.title}
                          </p>
                        </div>
                        {/* Points */}
                        <div className="space-y-2 pl-7">
                          {disc.points.map((pt, pi) => (
                            <p key={pi} className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                              {pt}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 md:px-8 py-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #1565C0 0%, #7C3AED 100%)' }}
        >
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

      {/* ── Modal ── */}
      {activeSpeaker && (
        <SpeakerModal
          speaker={activeSpeaker}
          allSpeakers={speakers}
          onClose={() => setActiveSpeaker(null)}
        />
      )}
    </div>
  );
}
