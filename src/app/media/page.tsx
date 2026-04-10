'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Download, ExternalLink, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { HeroBG } from '@/components/shared/HeroBG';

/* ─── Social Links ──────────────────────────────────────────────── */
const socialLinks = [
  {
    label: 'Instagram',
    handle: '@indonesianisme_id',
    followers: '12.4K',
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.20)',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'Indonesianisme IA-ITB',
    followers: '8.9K',
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
    border: 'rgba(10,102,194,0.20)',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    handle: 'Indonesianisme Official',
    followers: '5.2K',
    color: '#FF0000',
    bg: 'rgba(255,0,0,0.06)',
    border: 'rgba(255,0,0,0.18)',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45a2.78 2.78 0 00-1.95 1.97A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    handle: '@indonesianisme',
    followers: '18.7K',
    color: '#000000',
    bg: 'rgba(0,0,0,0.05)',
    border: 'rgba(0,0,0,0.15)',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    handle: '@indonesianisme',
    followers: '31.5K',
    color: '#010101',
    bg: 'rgba(1,1,1,0.05)',
    border: 'rgba(1,1,1,0.12)',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.26 8.26 0 004.83 1.54V7.11a4.85 4.85 0 01-1.06-.42z"/>
      </svg>
    ),
  },
];

/* ─── Blog Posts ────────────────────────────────────────────────── */
const blogPosts = [
  {
    id: 1,
    category: 'Thought Leadership',
    categoryColor: '#2563EB',
    title: 'Mengapa Reindustrialisasi Adalah Kunci Pertumbuhan 8%',
    excerpt: 'Analisis mendalam tentang bagaimana sektor manufaktur dapat mendorong Indonesia keluar dari middle-income trap dan mencapai target ambisius pertumbuhan ekonomi nasional.',
    author: 'Tim Riset IA-ITB',
    date: '20 Mar 2026',
    readTime: '8 min',
    image: 'https://picsum.photos/800/500?random=201',
    featured: true,
  },
  {
    id: 2,
    category: 'Kebijakan',
    categoryColor: '#059669',
    title: 'Hilirisasi Nikel: Pelajaran dari Model BODI untuk Komoditas Lain',
    excerpt: 'Evaluasi komprehensif strategi hilirisasi nikel dan implikasinya bagi sektor mineral kritis lain seperti tembaga, bauksit, dan timah.',
    author: 'Dr. Maya Kartika',
    date: '15 Mar 2026',
    readTime: '6 min',
    image: 'https://picsum.photos/600/400?random=202',
  },
  {
    id: 3,
    category: 'Analisis',
    categoryColor: '#D97706',
    title: 'Ketahanan Pangan 2045: Tiga Skenario dan Pilihan Strategis',
    excerpt: 'Peta jalan kebijakan ketahanan pangan nasional menghadapi disrupsi iklim dan volatilitas geopolitik global menuju Indonesia Emas.',
    author: 'Fajar Nugroho',
    date: '10 Mar 2026',
    readTime: '10 min',
    image: 'https://picsum.photos/600/400?random=203',
  },
  {
    id: 4,
    category: 'Inovasi',
    categoryColor: '#7C3AED',
    title: 'Kedaulatan Teknologi: Dari Konsumsi ke Produksi Digital',
    excerpt: 'Roadmap transformasi Indonesia dari pengguna teknologi asing menuju produsen solusi digital yang kompetitif di tingkat global.',
    author: 'Reza Firmansyah',
    date: '5 Mar 2026',
    readTime: '7 min',
    image: 'https://picsum.photos/600/400?random=204',
  },
  {
    id: 5,
    category: 'Energi',
    categoryColor: '#EA580C',
    title: 'Transisi Energi Berkeadilan: Jalan Tengah Indonesia',
    excerpt: 'Bagaimana Indonesia menyeimbangkan agenda transisi energi global dengan kebutuhan pembangunan ekonomi domestik yang masih membutuhkan energi terjangkau.',
    author: 'Dewi Anggraini',
    date: '28 Feb 2026',
    readTime: '9 min',
    image: 'https://picsum.photos/600/400?random=205',
  },
];

/* ─── News Items ────────────────────────────────────────────────── */
const newsItems = [
  {
    source: 'Kompas',
    category: 'Nasional',
    title: 'Indonesianisme Summit 2026 Targetkan 5.000 Peserta dari 34 Provinsi',
    excerpt: 'Forum nasional yang diselenggarakan IA-ITB ini menjadi platform strategis terbesar untuk merumuskan 80 gagasan pembangunan Indonesia.',
    date: '18 Mar 2026',
    url: '#',
    image: 'https://picsum.photos/400/250?random=301',
  },
  {
    source: 'Tempo',
    category: 'Ekonomi',
    title: 'IA-ITB Paparkan Peta Jalan Pertumbuhan 8%: Reindustrialisasi Jadi Kunci',
    excerpt: 'Ikatan Alumni ITB memaparkan 80 gagasan strategis yang diklaim mampu mendorong pertumbuhan ekonomi Indonesia ke level 8% per tahun.',
    date: '14 Mar 2026',
    url: '#',
    image: 'https://picsum.photos/400/250?random=302',
  },
  {
    source: 'Bisnis Indonesia',
    category: 'Industri',
    title: 'Forum Indonesianisme: Hilirisasi Jadi Agenda Utama Alumni ITB',
    excerpt: 'Strategi hilirisasi komoditas strategis dan reindustrialisasi manufaktur menjadi fokus utama forum nasional IA-ITB tahun 2026.',
    date: '10 Mar 2026',
    url: '#',
    image: 'https://picsum.photos/400/250?random=303',
  },
  {
    source: 'CNN Indonesia',
    category: 'Teknologi',
    title: 'Indonesianisme 2026: Kedaulatan Digital Masuk Agenda Strategis Nasional',
    excerpt: 'Transformasi digital dan kedaulatan teknologi menjadi salah satu dari sembilan agenda strategis Indonesianisme Summit 2026.',
    date: '6 Mar 2026',
    url: '#',
    image: 'https://picsum.photos/400/250?random=304',
  },
  {
    source: 'Media Indonesia',
    category: 'Pendidikan',
    title: 'Alumni ITB Gagas Platform Penghubung Riset Akademis dengan Kebijakan',
    excerpt: 'IA-ITB meluncurkan inisiatif untuk menjembatani gap antara hasil riset perguruan tinggi dengan perumusan kebijakan nasional.',
    date: '1 Mar 2026',
    url: '#',
    image: 'https://picsum.photos/400/250?random=305',
  },
  {
    source: 'Detik',
    category: 'Nasional',
    title: 'Menteri Hadiri Indonesianisme: Sinyal Dukungan Pemerintah untuk Forum Strategis',
    excerpt: 'Kehadiran sejumlah menteri Kabinet Merah Putih di Indonesianisme Summit 2026 menjadi sinyal kuat dukungan pemerintah terhadap forum ini.',
    date: '25 Feb 2026',
    url: '#',
    image: 'https://picsum.photos/400/250?random=306',
  },
];

/* ─── Instagram Posts ───────────────────────────────────────────── */
const instagramPosts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/300/300?random=${i + 40}`,
  likes: [3200, 1800, 4500, 2100, 5300, 1600, 2900, 3700, 2200][i],
  comments: [142, 87, 231, 95, 318, 64, 176, 203, 88][i],
}));

/* ─── Press Mentions ────────────────────────────────────────────── */
const pressMentions = [
  { source: 'Kompas',          headline: 'Indonesianisme: Platform Baru Gagasan Ekonomi Indonesia', date: '12 Mar 2026' },
  { source: 'Tempo',           headline: 'Summit 2026: 80 Ide Menuju Pertumbuhan 8%', date: '10 Mar 2026' },
  { source: 'Detik',           headline: 'IA-ITB Luncurkan Gerakan Pembangunan Berkelanjutan', date: '8 Mar 2026' },
  { source: 'Media Indonesia', headline: 'Reindustrialisasi: Fokus Utama Indonesianisme 2026', date: '5 Mar 2026' },
  { source: 'Bisnis',          headline: 'Kedaulatan Teknologi: Kunci Mandiri Indonesia', date: '1 Mar 2026' },
  { source: 'Kontan',          headline: 'Ekonomi: Transformasi Struktural untuk Pertumbuhan', date: '25 Feb 2026' },
];

export default function MediaPage() {
  return (
    <div className="w-full min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
        <HeroBG variant="dark" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-primary-light)' }}>
              Media & Komunikasi
            </p>
            <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Media &amp; Sorotan
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Berita, analisis, dan sorotan media tentang Indonesianisme 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Social Media Hub ─────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Ikuti Kami di Media Sosial
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Update terbaru, behind-the-scenes, dan diskusi strategis
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {socialLinks.map((s, idx) => (
              <motion.a
                key={idx}
                href={s.url}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl no-underline transition-all duration-200"
                style={{
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${s.border}`,
                  boxShadow: `0 2px 12px ${s.bg}`,
                  color: s.color,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.icon}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.label}</p>
                  <p className="text-[10px] mt-0.5 font-semibold" style={{ color: s.color }}>{s.followers}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Posts ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--color-primary)' }}>
                Blog &amp; Analisis
              </p>
              <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                Tulisan Terbaru
              </h2>
            </div>
            <a
              href="/publications"
              className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              Lihat semua <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Featured post */}
          {blogPosts.filter(p => p.featured).map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden mb-8 cursor-pointer group"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div className="grid md:grid-cols-[1fr_420px] gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, var(--color-bg-card))' }} />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start"
                    style={{ background: `${post.categoryColor}15`, color: post.categoryColor }}
                  >
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black leading-snug mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime} read</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Blog grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.filter(p => !p.featured).map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
              >
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                    style={{ background: `${post.categoryColor}15`, color: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold leading-snug mb-2 line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--color-primary)' }}>
                Sorotan Media
              </p>
              <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                Berita Terkini
              </h2>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.url}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl overflow-hidden no-underline group"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
              >
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Source badge */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
                    style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  >
                    {item.source}
                  </div>
                </div>
                <div className="p-5">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2.5"
                    style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-primary)' }}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{item.date}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                      Baca <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Feed ───────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: '#E1306C' }}>@indonesianisme_id</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--color-text-primary)' }}>Instagram Feed</h2>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 max-w-3xl mx-auto mb-8">
            {instagramPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group cursor-pointer rounded-xl overflow-hidden aspect-square"
              >
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6"
                       style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <span className="text-white flex items-center gap-1.5 text-sm font-bold">
                      <Heart className="w-5 h-5 fill-white" />{(post.likes / 1000).toFixed(1)}K
                    </span>
                    <span className="text-white flex items-center gap-1.5 text-sm font-bold">
                      <MessageCircle className="w-5 h-5" />{post.comments}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://instagram.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all"
              style={{ background: 'linear-gradient(135deg,#E1306C,#F77737,#FCAF45)', color: '#fff', boxShadow: '0 4px 16px rgba(225,48,108,0.30)' }}
            >
              Ikuti di Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Press Coverage ──────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--color-primary)' }}>Liputan Media</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--color-text-primary)' }}>Sorotan Pers</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pressMentions.map((mention, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
              >
                <div
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-black self-start"
                  style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}
                >
                  {mention.source}
                </div>
                <h3 className="text-sm font-bold leading-snug flex-1" style={{ color: 'var(--color-text-primary)' }}>
                  {mention.headline}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{mention.date}</span>
                  <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold no-underline" style={{ color: 'var(--color-primary)' }}>
                    Baca <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media Kit ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--color-primary)' }}>Press Room</p>
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Media Kit Indonesianisme
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Akses semua aset brand termasuk logo, panduan visual, foto pers, dan press release dalam satu paket.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'var(--gradient-primary)', color: '#fff', boxShadow: '0 4px 16px rgba(37,99,235,0.25)' }}
              >
                <Download className="w-4 h-4" />
                Unduh Media Kit (ZIP)
              </button>
              <button
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: '1px solid var(--glass-border)' }}
              >
                <Download className="w-4 h-4" />
                Logo &amp; Brand Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Press ────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Hubungi Tim Media Kami
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Untuk permintaan wawancara, press release, atau informasi media, hubungi tim komunikasi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:media@indonesianisme.id"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all"
                style={{ background: 'var(--gradient-primary)', color: '#fff' }}
              >
                Email Media
              </a>
              <a
                href="https://wa.me/628123456789"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all"
                style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--glass-border)' }}
              >
                WhatsApp Press
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
