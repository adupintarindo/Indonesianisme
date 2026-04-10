'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Target, Compass, BrainCircuit, Network, Users, BarChart3, Leaf, Landmark, Factory, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { HeroBG } from '@/components/shared/HeroBG';

const timelineEvents = [
  {
    year: 2013,
    title: 'Konsep Indonesianisme Diperkenalkan',
    description:
      'Kelahiran konsep Indonesianisme oleh Indonesian Alliance-ITB sebagai visi strategis jangka panjang untuk pembangunan Indonesia.',
    side: 'left',
  },
  {
    year: 2016,
    title: 'Indonesianisme Summit Pertama',
    description:
      'Konferensi pertama yang menghadirkan para pemikir, pembuat kebijakan, dan pemimpin industri untuk berdiskusi tentang arah strategis Indonesia.',
    side: 'right',
  },
  {
    year: 2017,
    title: 'Forum Industri Strategis',
    description:
      'Peluncuran forum khusus untuk mendiskusikan transformasi sektor-sektor prioritas ekonomi Indonesia.',
    side: 'left',
  },
  {
    year: 2021,
    title: 'I-Tech Forum Series',
    description:
      'Dimulainya serial forum tematik untuk mengeksplorasi peran teknologi dalam transformasi ekonomi nasional.',
    side: 'right',
  },
  {
    year: 2022,
    title: 'ReIndustrialisasi Indonesia Forum',
    description:
      'Forum khusus yang fokus pada strategi reindustrialisasi Indonesia untuk meningkatkan daya saing global.',
    side: 'left',
  },
  {
    year: 2026,
    title: 'Indonesianisme 2026 - Platform Digital Strategis Nasional',
    description:
      'Peluncuran platform digital komprehensif yang mengintegrasikan semua inisiatif menjadi gerakan nasional yang kohesif dan terukur.',
    side: 'right',
  },
];

const misiItems = [
  { title: 'Think Tank Terdepan', desc: 'Menciptakan solusi strategis berbasis riset untuk tantangan terbesar Indonesia.', icon: BrainCircuit, color: '#34D399', bg: 'rgba(52,211,153,0.18)' },
  { title: 'Solusi Terintegrasi', desc: 'Merancang ekosistem kebijakan yang menghubungkan seluruh pemangku kepentingan.', icon: Network, color: '#60A5FA', bg: 'rgba(96,165,250,0.18)' },
  { title: 'Kolaborasi Multi-Pihak', desc: 'Membangun koalisi pemerintah, industri, akademisi, dan masyarakat sipil.', icon: Users, color: '#FBBF24', bg: 'rgba(251,191,36,0.18)' },
  { title: 'Kebijakan Berbasis Bukti', desc: 'Menggunakan data dan riset mendalam untuk merekomendasikan kebijakan yang efektif.', icon: BarChart3, color: '#C084FC', bg: 'rgba(192,132,252,0.18)' },
  { title: 'Keberlanjutan Lingkungan', desc: 'Memastikan setiap inisiatif pertumbuhan selaras dengan kelestarian lingkungan hidup.', icon: Leaf, color: '#4ADE80', bg: 'rgba(74,222,128,0.18)' },
  { title: 'Jejaring Global Strategis', desc: 'Menghubungkan Indonesia dengan komunitas pemikir dan pembuat kebijakan terdepan di dunia.', icon: Globe, color: '#38BDF8', bg: 'rgba(56,189,248,0.18)' },
];

const coreValues = [
  {
    title: 'Kedaulatan',
    description: 'Mengambil keputusan strategis dengan mandiri berdasarkan kepentingan nasional',
    icon: Landmark,
    gFrom: '#1e3a8a',
    gTo: '#1d4ed8',
  },
  {
    title: 'Berdikari',
    description: 'Mengandalkan kekuatan internal dan sumber daya sendiri',
    icon: Target,
    gFrom: '#92400e',
    gTo: '#d97706',
  },
  {
    title: 'Kemandirian',
    description: 'Membangun ekonomi yang tidak bergantung pada faktor eksternal',
    icon: Compass,
    gFrom: '#7f1d1d',
    gTo: '#dc2626',
  },
  {
    title: 'Pertumbuhan Berkelanjutan',
    description: 'Menciptakan pertumbuhan ekonomi yang ramah lingkungan dan inklusif',
    icon: Leaf,
    gFrom: '#14532d',
    gTo: '#16a34a',
  },
  {
    title: 'Pengentasan Kesenjangan',
    description: 'Memastikan manfaat pertumbuhan tersebar di semua lapisan masyarakat',
    icon: Users,
    gFrom: '#0c4a6e',
    gTo: '#0284c7',
  },
  {
    title: 'Reindustrialisasi Terencana',
    description: 'Mengembangkan industri dengan strategi yang terukur dan terarah',
    icon: Factory,
    gFrom: '#1e1b4b',
    gTo: '#5b21b6',
  },
  {
    title: 'Orientasi Jangka Panjang',
    description: 'Berpikir jauh ke depan hingga tahun 2045 dan seterusnya',
    icon: Globe,
    gFrom: '#581c87',
    gTo: '#9333ea',
  },
];

const roadmapPhases = [
  {
    period: '2026-2030',
    title: 'Konsolidasi & Akselerasi',
    points: [
      'Memperkuat fondasi reindustrialisasi',
      'Meningkatkan kapabilitas teknologi',
      'Memperluas jaringan stakeholder',
    ],
  },
  {
    period: '2031-2035',
    title: 'Transformasi Struktural',
    points: [
      'Perubahan signifikan dalam struktur ekonomi',
      'Peningkatan daya saing global',
      'Penguatan kedaulatan teknologi',
    ],
  },
  {
    period: '2036-2040',
    title: 'Konsolidasi Kemandirian',
    points: [
      'Menjadi pemain utama regional',
      'Ekonomi yang sepenuhnya mandiri',
      'Inovasi berkelanjutan',
    ],
  },
  {
    period: '2041-2045+',
    title: 'Kepemimpinan Global',
    points: [
      'Indonesia sebagai pemimpin regional',
      'Kontribusi signifikan pada ekonomi global',
      'Model pembangunan berkelanjutan',
    ],
  },
];

type TeamMember = { name: string; role: string; image: string };
type Committee = { id: string; label: string; color: string; members: TeamMember[] };

const committees: Committee[] = [
  {
    id: 'steering',
    label: 'Steering Committee',
    color: '#F59E0B',
    members: [
      { name: 'Dr. Bambang Permadi', role: 'Ketua Umum', image: 'https://i.pravatar.cc/200?u=team1' },
      { name: 'Prof. Eka Siswanto', role: 'Wakil Ketua – Ekonomi', image: 'https://i.pravatar.cc/200?u=team2' },
      { name: 'Ir. Joko Winarno', role: 'Wakil Ketua – Industri', image: 'https://i.pravatar.cc/200?u=team3' },
      { name: 'Dr. Siti Nurhaliza', role: 'Sekretaris Jenderal', image: 'https://i.pravatar.cc/200?u=team4' },
      { name: 'Prof. Rizal Fachri', role: 'Bendahara Umum', image: 'https://i.pravatar.cc/200?u=team13' },
      { name: 'Dr. Laila Fitria', role: 'Anggota Steering', image: 'https://i.pravatar.cc/200?u=team14' },
    ],
  },
  {
    id: 'program',
    label: 'Tim Program',
    color: '#3B82F6',
    members: [
      { name: 'Hendra Kusuma', role: 'Kepala Tim Program', image: 'https://i.pravatar.cc/200?u=team5' },
      { name: 'Dr. Maya Santoso', role: 'Kepala Riset & Data', image: 'https://i.pravatar.cc/200?u=team6' },
      { name: 'Andi Pratama', role: 'Koordinator Sesi Pleno', image: 'https://i.pravatar.cc/200?u=team15' },
      { name: 'Rini Setiawati', role: 'Koordinator Panel', image: 'https://i.pravatar.cc/200?u=team16' },
      { name: 'Budi Santosa', role: 'Koordinator Workshop', image: 'https://i.pravatar.cc/200?u=team17' },
      { name: 'Dewi Lestari', role: 'Analis Program', image: 'https://i.pravatar.cc/200?u=team18' },
      { name: 'Farhan Maulana', role: 'Koordinator Youth Forum', image: 'https://i.pravatar.cc/200?u=team19' },
    ],
  },
  {
    id: 'komunikasi',
    label: 'Tim Komunikasi',
    color: '#8B5CF6',
    members: [
      { name: 'Nadia Kusuma', role: 'Kepala Tim Komunikasi', image: 'https://i.pravatar.cc/200?u=team20' },
      { name: 'Reza Adrianto', role: 'Media Relations', image: 'https://i.pravatar.cc/200?u=team21' },
      { name: 'Sari Puspita', role: 'Social Media Manager', image: 'https://i.pravatar.cc/200?u=team22' },
      { name: 'Dimas Nugroho', role: 'Creative & Design', image: 'https://i.pravatar.cc/200?u=team23' },
      { name: 'Fitri Amalia', role: 'Content Writer', image: 'https://i.pravatar.cc/200?u=team24' },
      { name: 'Kevin Hartono', role: 'Videografer', image: 'https://i.pravatar.cc/200?u=team25' },
    ],
  },
  {
    id: 'teknologi',
    label: 'Tim Teknologi',
    color: '#10B981',
    members: [
      { name: 'Agus Setiawan', role: 'Kepala Tim Teknologi', image: 'https://i.pravatar.cc/200?u=team26' },
      { name: 'Citra Dewi', role: 'Lead Developer', image: 'https://i.pravatar.cc/200?u=team27' },
      { name: 'Irfan Hakim', role: 'UI/UX Designer', image: 'https://i.pravatar.cc/200?u=team28' },
      { name: 'Linda Wahyuni', role: 'Data Engineer', image: 'https://i.pravatar.cc/200?u=team29' },
      { name: 'Wahyu Pratama', role: 'IT Support', image: 'https://i.pravatar.cc/200?u=team30' },
    ],
  },
  {
    id: 'logistik',
    label: 'Tim Logistik & Acara',
    color: '#EF4444',
    members: [
      { name: 'Teguh Santoso', role: 'Kepala Tim Logistik', image: 'https://i.pravatar.cc/200?u=team31' },
      { name: 'Yuni Kartika', role: 'Koordinator Venue', image: 'https://i.pravatar.cc/200?u=team32' },
      { name: 'Bagas Wicaksono', role: 'Koordinator Transportasi', image: 'https://i.pravatar.cc/200?u=team33' },
      { name: 'Anita Rahayu', role: 'Koordinator Akomodasi', image: 'https://i.pravatar.cc/200?u=team34' },
      { name: 'Gilang Ramadhan', role: 'Koordinator Konsumsi', image: 'https://i.pravatar.cc/200?u=team35' },
      { name: 'Putri Handayani', role: 'Front Desk & Registrasi', image: 'https://i.pravatar.cc/200?u=team36' },
    ],
  },
  {
    id: 'kemitraan',
    label: 'Tim Kemitraan',
    color: '#F97316',
    members: [
      { name: 'Hana Pertiwi', role: 'Kepala Tim Kemitraan', image: 'https://i.pravatar.cc/200?u=team37' },
      { name: 'Doni Prasetyo', role: 'Sponsorship Manager', image: 'https://i.pravatar.cc/200?u=team38' },
      { name: 'Mira Sanjaya', role: 'Partnership Relations', image: 'https://i.pravatar.cc/200?u=team39' },
      { name: 'Taufik Hidayat', role: 'Business Development', image: 'https://i.pravatar.cc/200?u=team40' },
      { name: 'Zahra Nabilah', role: 'Alumni Network', image: 'https://i.pravatar.cc/200?u=team41' },
    ],
  },
];

const iaItbSlides = [
  {
    img: 'https://picsum.photos/900/560?random=101',
    caption: 'Forum Strategi Nasional — Jakarta, 2022',
    tag: 'ReIndustrialisasi Indonesia Forum',
  },
  {
    img: 'https://picsum.photos/900/560?random=102',
    caption: 'Diskusi Multi-Stakeholder di Kampus ITB',
    tag: 'I-Tech Forum Series 2021',
  },
  {
    img: 'https://picsum.photos/900/560?random=103',
    caption: 'Indonesianisme Summit — Sesi Pembicara Kunci',
    tag: 'Indonesianisme Summit 2016',
  },
  {
    img: 'https://picsum.photos/900/560?random=104',
    caption: 'Panel Diskusi Kebijakan Industri Strategis',
    tag: 'Forum Industri Strategis 2017',
  },
];


export default function About() {
  const [expandedValue, setExpandedValue] = useState(0);
  const [activeCommittee, setActiveCommittee] = useState('steering');
  const [iaItbSlideIdx, setIaItbSlideIdx] = useState(0);
  const iaItbNext = useCallback(() => setIaItbSlideIdx((i) => (i + 1) % iaItbSlides.length), []);
  const iaItbPrev = useCallback(() => setIaItbSlideIdx((i) => (i - 1 + iaItbSlides.length) % iaItbSlides.length), []);
  useEffect(() => {
    const t = setInterval(iaItbNext, 4500);
    return () => clearInterval(t);
  }, [iaItbNext]);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] w-full flex flex-col items-center justify-center overflow-hidden">
        <HeroBG variant="blue" />
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-pearl-white font-plus-jakarta mb-4"
          >
            Tentang Indonesianisme
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-warm-gray-light max-w-3xl mx-auto"
          >
            Menghubungkan Gagasan, Kepemimpinan, dan Aksi untuk Masa Depan Indonesia
          </motion.p>
        </div>
      </section>

      {/* Story Section - Timeline */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-16 text-center">
            Perjalanan Indonesianisme
          </h2>

          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex gap-8">
                  {/* Timeline Line and Dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-gold rounded-full border-4 border-deep-navy z-10 relative" />
                    {idx < timelineEvents.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-gold to-transparent mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-12 flex-1">
                    <div className="glass-card-dark p-6">
                      <div className="inline-block mb-3 px-3 py-1 bg-gold/20 text-gold text-sm font-plus-jakarta font-bold rounded">
                        {event.year}
                      </div>
                      <h3 className="text-2xl font-plus-jakarta font-bold text-pearl-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-warm-gray-light leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* VISI — full-width dark gradient card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden mb-5 relative"
            style={{ background: 'linear-gradient(135deg, #071221 0%, #0f2d5c 55%, #0c4a3a 100%)' }}
          >
            {/* Glow orbs */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                 style={{ background: 'radial-gradient(circle, rgba(14,158,116,0.18), transparent 70%)', transform: 'translate(25%,-25%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                 style={{ background: 'radial-gradient(circle, rgba(59,111,212,0.15), transparent 70%)', transform: 'translate(-25%,25%)' }} />

            <div className="relative px-8 md:px-12 py-10 md:py-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                     style={{ background: 'rgba(14,158,116,0.2)', border: '1px solid rgba(14,158,116,0.4)' }}>
                  <Target className="w-5 h-5" style={{ color: '#4ADE80' }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#4ADE80' }}>Visi</span>
              </div>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed text-white max-w-3xl">
                Indonesia yang mandiri secara ekonomi dan teknologi, dengan pertumbuhan berkelanjutan sebesar{' '}
                <span className="font-black" style={{ color: '#4ADE80' }}>8% menuju 2045</span>
                , yang menjadi kontributor signifikan bagi stabilitas dan kemakmuran global.
              </p>
            </div>
          </motion.div>

          {/* MISI — header + mission grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
          >
            {/* Misi header */}
            <div className="px-8 md:px-10 py-6"
                 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                     style={{ background: 'rgba(59,111,212,0.2)', border: '1px solid rgba(59,111,212,0.4)' }}>
                  <Compass className="w-5 h-5 text-sky-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Misi</span>
              </div>
              <p className="text-sm leading-relaxed text-pearl-white/60 max-w-2xl">
                Menghubungkan para pemikir, pembuat kebijakan, dan pemimpin industri untuk merancang dan mengimplementasikan strategi transformasi ekonomi Indonesia.
              </p>
            </div>

            {/* Mission items */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
              {misiItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + idx * 0.06 }}
                    className="flex items-start gap-4 p-6 group transition-colors duration-200"
                    style={{ background: 'rgba(8,18,40,0.82)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(15,30,65,0.92)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(8,18,40,0.82)'; }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center mt-0.5"
                      style={{
                        background: item.bg,
                        border: `1px solid ${item.color}35`,
                        color: item.color,
                        boxShadow: `0 0 12px ${item.color}25`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.88)' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-3">
              7 Nilai Inti
            </h2>
            <p className="text-pearl-white/50 text-base max-w-xl mx-auto">
              Prinsip-prinsip fundamental yang mendasari setiap gagasan dan arah gerak Indonesianisme
            </p>
          </motion.div>

          {/* 6 cards in 3-column grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {coreValues.slice(0, 6).map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedValue(expandedValue === idx ? -1 : idx)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group h-52 sm:h-60"
                  style={{ background: `linear-gradient(135deg, ${value.gFrom} 0%, ${value.gTo} 100%)` }}
                >
                  {/* Noise texture */}
                  <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
                  {/* Ambient glow */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)' }}
                  />
                  {/* Icon placeholder — centered upper area */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%]">
                    <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Hover hint */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4 text-white/70" />
                  </div>
                  {/* Label + description bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
                  >
                    <p className="text-white font-bold text-sm sm:text-base leading-tight">{value.title}</p>
                    <p className="text-white/65 text-xs mt-0.5 leading-snug line-clamp-2">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 7th card — centered */}
          {coreValues[6] && (() => {
            const value = coreValues[6];
            const Icon = value.icon;
            return (
              <div className="flex justify-center mt-4 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedValue(expandedValue === 6 ? -1 : 6)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group h-52 sm:h-60 w-full sm:w-[calc(33.333%-0.67rem)]"
                  style={{ background: `linear-gradient(135deg, ${value.gFrom} 0%, ${value.gTo} 100%)` }}
                >
                  <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)' }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%]">
                    <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4 text-white/70" />
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
                  >
                    <p className="text-white font-bold text-sm sm:text-base leading-tight">{value.title}</p>
                    <p className="text-white/65 text-xs mt-0.5 leading-snug line-clamp-2">{value.description}</p>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* About IA-ITB */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #060f22 0%, #0c1e40 50%, #060f22 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,111,212,0.12), transparent 70%)',
              transform: 'translate(-35%, -50%)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(14,158,116,0.09), transparent 70%)',
              transform: 'translate(35%, 45%)',
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px w-12 bg-sky-400/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              Tentang Penyelenggara
            </span>
          </motion.div>

          {/* Main card — two-column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden grid lg:grid-cols-[5fr,7fr]"
            style={{
              background: 'rgba(15,35,75,0.55)',
              border: '1px solid rgba(96,165,250,0.22)',
              boxShadow: '0 0 0 1px rgba(96,165,250,0.06), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Left — Info panel */}
            <div
              className="relative p-8 md:p-10 flex flex-col"
              style={{ borderBottom: '1px solid rgba(96,165,250,0.10)', borderRight: '1px solid rgba(96,165,250,0.10)' }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-l-2xl"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 70% at 10% 20%, rgba(59,111,212,0.22), transparent 65%)',
                }}
              />

              {/* Logo / emblem */}
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(135deg, #1d4ed8, #0c4a6e)',
                    border: '1px solid rgba(96,165,250,0.3)',
                  }}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon
                      points="16,2 19.5,11 29,11 21.5,17 24.5,26 16,20.5 7.5,26 10.5,17 3,11 12.5,11"
                      fill="rgba(251,191,36,0.9)"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-plus-jakarta text-pearl-white leading-tight mb-1">
                  Indonesian Alliance-ITB
                </h2>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-sky-400">IA-ITB</p>
              </div>

              {/* Description */}
              <div className="flex-1 relative">
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  Institusi pemikiran strategis yang menjadi jembatan antara akademisi, industri, dan pemerintah — mengembangkan gagasan inovatif bagi pembangunan Indonesia jangka panjang.
                </p>
                <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Dengan jaringan global dan pemahaman mendalam konteks lokal, IA-ITB berkomitmen menghasilkan strategi <em>actionable</em> untuk akselerasi pertumbuhan ekonomi nasional. Indonesianisme 2026 adalah manifestasi komitmen tersebut.
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: '2013', label: 'Berdiri sejak' },
                    { num: '6+', label: 'Forum nasional' },
                    { num: '500+', label: 'Alumni terlibat' },
                    { num: '30+', label: 'Mitra strategis' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3"
                      style={{
                        background: 'rgba(30,60,120,0.45)',
                        border: '1px solid rgba(96,165,250,0.22)',
                      }}
                    >
                      <p className="text-lg font-black" style={{ color: '#60a5fa' }}>{s.num}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Photo slider */}
            <div className="flex flex-col" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Slide viewport */}
              <div className="relative overflow-hidden flex-1" style={{ minHeight: 280 }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={iaItbSlideIdx}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.42, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={iaItbSlides[iaItbSlideIdx].img}
                      alt={iaItbSlides[iaItbSlideIdx].caption}
                      fill
                      className="object-cover object-center"
                      style={{ filter: 'brightness(1.15) saturate(1.1)' }}
                    />
                    {/* Caption overlay */}
                    <div
                      className="absolute bottom-0 inset-x-0 px-6 py-5"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(5,9,26,0.75) 0%, rgba(5,9,26,0.25) 60%, transparent 100%)',
                      }}
                    >
                      <p className="text-sm font-semibold text-pearl-white leading-snug">
                        {iaItbSlides[iaItbSlideIdx].caption}
                      </p>
                      <p className="text-xs text-sky-400/80 mt-1">
                        {iaItbSlides[iaItbSlideIdx].tag}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Prev button */}
                <button
                  onClick={iaItbPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(5,9,26,0.72)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ChevronLeft className="w-4 h-4 text-pearl-white" />
                </button>

                {/* Next button */}
                <button
                  onClick={iaItbNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(5,9,26,0.72)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ChevronRight className="w-4 h-4 text-pearl-white" />
                </button>

                {/* Slide counter badge */}
                <div
                  className="absolute top-3 right-3 z-20 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(5,9,26,0.72)',
                    color: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  {iaItbSlideIdx + 1} / {iaItbSlides.length}
                </div>
              </div>

              {/* Dot indicators */}
              <div
                className="flex items-center justify-center gap-2 py-4 shrink-0"
                style={{ background: 'rgba(5,9,26,0.45)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {iaItbSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIaItbSlideIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === iaItbSlideIdx ? 20 : 6,
                      height: 6,
                      background:
                        i === iaItbSlideIdx ? '#38BDF8' : 'rgba(255,255,255,0.25)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap 2026-2045+ */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-16 text-center">
            Roadmap 2026-2045+
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              {roadmapPhases.map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-card-dark p-6"
                >
                  <div className="mb-4 pb-4 border-b border-gold/20">
                    <h4 className="text-lg font-plus-jakarta font-bold text-gold">
                      {phase.period}
                    </h4>
                  </div>

                  <h5 className="text-xl font-plus-jakarta font-bold text-pearl-white mb-4">
                    {phase.title}
                  </h5>

                  <ul className="space-y-3">
                    {phase.points.map((point, pidx) => (
                      <li
                        key={pidx}
                        className="flex gap-2 text-sm text-warm-gray-light"
                      >
                        <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team/Organizing Committee */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-4">
              Tim Penyelenggara
            </h2>
            <p className="text-warm-gray-light max-w-xl mx-auto">
              {committees.reduce((acc, c) => acc + c.members.length, 0)}+ orang dari berbagai latar belakang bersama membangun Indonesianisme 2026.
            </p>
          </div>

          {/* Committee Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {committees.map((c) => {
              const isActive = activeCommittee === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCommittee(c.id)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? c.color : 'transparent',
                    color: isActive ? '#0A0F1E' : c.color,
                    border: `1.5px solid ${isActive ? c.color : `${c.color}50`}`,
                  }}
                >
                  {c.label}
                  <span
                    className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.15)' : `${c.color}20`,
                      color: isActive ? '#0A0F1E' : c.color,
                    }}
                  >
                    {c.members.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Member Grid */}
          <AnimatePresence mode="wait">
            {committees.filter(c => c.id === activeCommittee).map((committee) => (
              <motion.div
                key={committee.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Committee label */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="h-px flex-1 opacity-20" style={{ background: committee.color }} />
                  <span
                    className="text-xs font-black uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                    style={{ background: `${committee.color}18`, color: committee.color, border: `1px solid ${committee.color}35` }}
                  >
                    {committee.label}
                  </span>
                  <div className="h-px flex-1 opacity-20" style={{ background: committee.color }} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {committee.members.map((member, idx) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.04 }}
                      className="group flex flex-col items-center text-center p-4 rounded-2xl cursor-default transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.background = `${committee.color}12`;
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${committee.color}35`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-offset-2 transition-all duration-200"
                        style={{ outline: `2px solid ${committee.color}60` }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-bold text-pearl-white leading-tight mb-1">
                        {member.name}
                      </p>
                      <p className="text-[11px] leading-tight" style={{ color: committee.color }}>
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* All-committees summary strip */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {committees.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCommittee(c.id)}
                className="flex items-center gap-2 text-xs transition-opacity"
                style={{ opacity: activeCommittee === c.id ? 1 : 0.45, color: c.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                {c.label} ({c.members.length})
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-deep-navy to-itb-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-6">
              Bergabung dengan Gerakan
            </h2>

            <p className="text-warm-gray-light mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari perjalanan untuk membangun Indonesia yang lebih mandiri, berkelanjutan, dan sejahtera untuk generasi mendatang.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gold text-gold font-plus-jakarta font-bold rounded-lg hover:bg-gold/10 transition-colors"
              >
                Jadilah Mitra
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
