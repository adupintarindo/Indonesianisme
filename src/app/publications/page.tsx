'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Publication = {
  id: number;
  title: string;
  category: 'Thought Paper' | 'Policy Brief' | 'Berita' | 'Opini';
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
  featured?: boolean;
};

const publications: Publication[] = [
  {
    id: 1,
    title: 'Reindustrialisasi Indonesia: Strategi Menuju 8% Pertumbuhan',
    category: 'Thought Paper',
    date: '15 Mar 2026',
    excerpt: 'Analisis mendalam tentang strategi reindustrialisasi untuk mencapai target pertumbuhan ekonomi 8% di tahun 2026.',
    image: 'https://picsum.photos/600/400?random=30',
    readTime: '12 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Kedaulatan Energi: Memetakan Potensi Geotermal Nusantara',
    category: 'Policy Brief',
    date: '10 Mar 2026',
    excerpt: 'Laporan kebijakan tentang pemanfaatan potensi geotermal Indonesia untuk kemandirian energi nasional.',
    image: 'https://picsum.photos/600/400?random=31',
    readTime: '8 min',
  },
  {
    id: 3,
    title: '80 Gagasan: Ringkasan Eksekutif',
    category: 'Thought Paper',
    date: '5 Mar 2026',
    excerpt: 'Ringkasan komprehensif dari 80 gagasan strategis IA-ITB untuk transformasi ekonomi Indonesia.',
    image: 'https://picsum.photos/600/400?random=32',
    readTime: '15 min',
  },
  {
    id: 4,
    title: 'Hilirisasi Nikel: Pelajaran dari Model BODI',
    category: 'Policy Brief',
    date: '28 Feb 2026',
    excerpt: 'Evaluasi strategi hilirisasi nikel dan pembelajaran dari implementasi model BODI di industri mineral.',
    image: 'https://picsum.photos/600/400?random=33',
    readTime: '10 min',
  },
  {
    id: 5,
    title: 'Ketahanan Pangan di Tengah Disrupsi Global',
    category: 'Opini',
    date: '20 Feb 2026',
    excerpt: 'Perspektif atas tantangan ketahanan pangan Indonesia menghadapi volatilitas pasar global.',
    image: 'https://picsum.photos/600/400?random=34',
    readTime: '7 min',
  },
  {
    id: 6,
    title: 'Forum Energi Nasional: Rekam Jejak I-Tech',
    category: 'Berita',
    date: '15 Feb 2026',
    excerpt: 'Laporan kegiatan Forum Energi Nasional yang menampilkan kontribusi Institut Teknologi Bandung.',
    image: 'https://picsum.photos/600/400?random=35',
    readTime: '5 min',
  },
  {
    id: 7,
    title: 'Transformasi SDM untuk Indonesia Emas 2045',
    category: 'Thought Paper',
    date: '10 Feb 2026',
    excerpt: 'Strategi pengembangan sumber daya manusia untuk mendukung visi Indonesia Emas 2045.',
    image: 'https://picsum.photos/600/400?random=36',
    readTime: '11 min',
  },
  {
    id: 8,
    title: 'Indonesianisme Summit 2026: Apa yang Diharapkan',
    category: 'Berita',
    date: '5 Feb 2026',
    excerpt: 'Panduan lengkap tentang apa yang akan dihadirkan pada Indonesianisme Summit 2026 di Jakarta.',
    image: 'https://picsum.photos/600/400?random=37',
    readTime: '6 min',
  },
];

const categories = ['Semua', 'Thought Paper', 'Policy Brief', 'Berita', 'Opini'];

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Thought Paper': { bg: 'bg-gold/20', text: 'text-gold' },
  'Policy Brief': { bg: 'bg-teal/20', text: 'text-teal' },
  Berita: { bg: 'bg-sky-blue/20', text: 'text-sky-blue' },
  Opini: { bg: 'bg-itb-blue/20', text: 'text-itb-blue' },
};

export default function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filtered = publications.filter(
    pub => selectedCategory === 'Semua' || pub.category === selectedCategory
  );

  const featured = publications.find(p => p.featured);

  return (
    <div className="w-full min-h-screen bg-deep-navy">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-deep-navy to-deep-navy/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-pearl-white font-plus-jakarta mb-4">
              Publikasi & Wawasan Strategis
            </h1>
            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto">
              Jelajahi pemikiran mendalam, analisis kebijakan, dan wawasan strategis tentang pembangunan Indonesia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card-dark overflow-hidden rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="h-64 md:h-96 overflow-hidden">
                  <img
                    src={featured.image}
                    alt="Featured"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex gap-3 mb-4">
                    <span className={`text-xs font-plus-jakarta font-bold px-3 py-1 rounded ${categoryColors[featured.category].bg} ${categoryColors[featured.category].text}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-warm-gray-light px-3 py-1">
                      {featured.readTime}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-4">
                    {featured.title}
                  </h2>

                  <p className="text-warm-gray-light mb-6 leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-warm-gray-light">{featured.date}</span>
                    <button className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-plus-jakarta font-bold">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="py-8 border-b border-gold/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex gap-3 overflow-x-auto pb-2"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-plus-jakarta font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-deep-navy'
                    : 'bg-deep-navy border border-gold/30 text-gold hover:border-gold/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((pub, idx) => (
                <motion.div
                  key={pub.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card-dark overflow-hidden flex flex-col h-full group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <Download className="w-5 h-5 text-gold" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-plus-jakarta font-bold px-3 py-1 rounded ${categoryColors[pub.category].bg} ${categoryColors[pub.category].text}`}>
                        {pub.category}
                      </span>
                      <span className="text-xs text-warm-gray-light">{pub.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-pearl-white font-plus-jakarta mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                      {pub.title}
                    </h3>

                    <p className="text-warm-gray-light text-sm mb-4 line-clamp-2 flex-1">
                      {pub.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                      <span className="text-xs text-warm-gray-light">{pub.date}</span>
                      <button className="text-gold hover:text-gold-light transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-warm-gray-light">Tidak ada publikasi dalam kategori ini</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-deep-navy to-itb-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-6">
              Dapatkan Publikasi Terbaru
            </h2>

            <p className="text-warm-gray-light mb-8 max-w-xl mx-auto">
              Berlangganan newsletter kami untuk menerima publikasi dan wawasan strategis terbaru langsung ke inbox Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-pearl-white placeholder-warm-gray-light border border-gold/30 focus:outline-none focus:border-gold"
              />
              <button className="px-6 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors">
                Berlangganan
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
