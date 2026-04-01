'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Download, Globe, Send } from 'lucide-react';

const instagramPosts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/300/300?random=${i + 40}`,
  likes: Math.floor(Math.random() * 5000) + 1000,
  comments: Math.floor(Math.random() * 500) + 50,
}));

const pressLogos = [
  'Kompas',
  'Tempo',
  'Detik',
  'Media Indonesia',
  'Bisnis',
  'Kontan',
];

const pressMentions = [
  {
    logo: 'https://via.placeholder.com/150x80?text=Kompas',
    headline: 'Indonesianisme: Platform Baru Gagasan Ekonomi Indonesia',
    date: '12 Mar 2026',
  },
  {
    logo: 'https://via.placeholder.com/150x80?text=Tempo',
    headline: 'Summit 2026: 80 Ide Menuju Pertumbuhan 8%',
    date: '10 Mar 2026',
  },
  {
    logo: 'https://via.placeholder.com/150x80?text=Detik',
    headline: 'IA-ITB Luncurkan Gerakan Pembangunan Berkelanjutan',
    date: '8 Mar 2026',
  },
  {
    logo: 'https://via.placeholder.com/150x80?text=Media+Indonesia',
    headline: 'Reindustrialisasi: Fokus Utama Indonesianisme 2026',
    date: '5 Mar 2026',
  },
  {
    logo: 'https://via.placeholder.com/150x80?text=Bisnis',
    headline: 'Kedaulatan Teknologi: Kunci Mandiri Indonesia',
    date: '1 Mar 2026',
  },
  {
    logo: 'https://via.placeholder.com/150x80?text=Kontan',
    headline: 'Ekonomi: Transformasi Struktural untuk Pertumbuhan',
    date: '25 Feb 2026',
  },
];

const socialLinks = [
  { icon: Globe, label: 'Instagram', color: 'hover:text-pink-500', url: '#' },
  { icon: Globe, label: 'LinkedIn', color: 'hover:text-blue-500', url: '#' },
  { icon: Globe, label: 'YouTube', color: 'hover:text-red-500', url: '#' },
  { icon: Globe, label: 'Twitter/X', color: 'hover:text-gray-400', url: '#' },
  { icon: Send, label: 'TikTok', color: 'hover:text-black', url: '#' },
];

export default function MediaPage() {
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
              Media & Sorotan
            </h1>
            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto">
              Ikuti perkembangan terbaru Indonesianisme di berbagai platform media
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Media Hub */}
      <section className="py-16 md:py-24 bg-deep-navy/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-8">
              Ikuti Kami di Media Sosial
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`p-4 rounded-full bg-deep-navy border-2 border-gold/30 text-gold transition-all ${social.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-12 text-center"
          >
            Instagram Feed
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {instagramPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={`Instagram post ${post.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-8">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <Heart className="w-6 h-6 fill-white" />
                      <span className="font-bold">{(post.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-bold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://instagram.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors"
            >
              <Globe className="w-5 h-5" />
              Kunjungi Instagram Kami
            </a>
          </div>
        </div>
        </section>

      {/* Media Kit Section */}
      <section className="py-16 md:py-24 bg-deep-navy/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-12 text-center"
          >
            Media Kit Indonesianisme
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card-dark p-8 md:p-12 text-center"
            >
              <p className="text-warm-gray-light mb-8">
                Akses semua aset brand Indonesianisme termasuk logo, panduan brand, dan foto pers dalam berbagai format.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors">
                  <Download className="w-5 h-5" />
                  Unduh Media Kit (ZIP)
                </button>

                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-plus-jakarta font-bold rounded-lg hover:bg-gold/10 transition-colors">
                  <Download className="w-5 h-5" />
                  Logo Set
                </button>

                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-plus-jakarta font-bold rounded-lg hover:bg-gold/10 transition-colors">
                  <Download className="w-5 h-5" />
                  Brand Guidelines
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-12 text-center"
          >
            Sorotan Pers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressMentions.map((mention, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card-dark p-6 flex flex-col"
              >
                <div className="mb-4 h-12 bg-warm-gray/20 rounded flex items-center px-4">
                  <span className="text-warm-gray-light font-plus-jakarta font-bold">
                    {pressLogos[idx] || 'Media Partner'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-pearl-white font-plus-jakarta mb-3 line-clamp-2">
                  {mention.headline}
                </h3>

                <p className="text-warm-gray-light text-sm mb-4 flex-1">
                  {mention.date}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-plus-jakarta font-bold text-sm"
                >
                  Baca Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Press */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-deep-navy to-itb-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-6">
              Hubungi Tim Media Kami
            </h2>

            <p className="text-warm-gray-light mb-8 max-w-xl mx-auto">
              Untuk pertanyaan pers, permintaan wawancara, atau informasi media lainnya, hubungi tim komunikasi kami.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:media@indonesianisme.id"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors"
              >
                Email Media
              </a>

              <a
                href="https://wa.me/628123456789"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-plus-jakarta font-bold rounded-lg hover:bg-gold/10 transition-colors"
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
