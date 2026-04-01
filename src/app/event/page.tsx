'use client';

import { motion } from 'framer-motion';
import { PageHero } from '@/components/shared/PageHero';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { Button } from '@/components/ui/Button';
import {
  Share2,
  MapPin,
  Calendar,
  Users,
  Zap,
  Book,
  Network,
  Lightbulb,
  Users2,
  BarChart3,
} from 'lucide-react';

const eventComponents = [
  {
    icon: Zap,
    title: 'Indonesianisme Summit',
    description: 'Flagship gathering dengan keynote speeches, panel diskusi strategis, dan networking eksklusif untuk para pemimpin industri dan pemerintah.',
  },
  {
    icon: BarChart3,
    title: 'Forum Series',
    description: 'Diskusi tematik sepanjang tahun yang membahas isu-isu strategis tentang reindustrialisasi dan transformasi ekonomi Indonesia.',
  },
  {
    icon: Book,
    title: 'Knowledge Platform',
    description: 'Platform penyajian strategic papers, policy briefs, dan riset mendalam untuk mendukung pengambilan keputusan strategis.',
  },
  {
    icon: Network,
    title: 'Network',
    description: 'Ekosistem yang menghubungkan semua stakeholder: pemerintah, industri, akademisi, dan generasi muda pemimpin Indonesia.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Showcase',
    description: 'Pameran teknologi dan kemampuan industri untuk menunjukkan kapabilitas inovasi dan produksi Indonesia global.',
  },
];

const sessionFormats = [
  { icon: Users2, title: 'Keynote Speeches', description: 'Pidato utama dari para pemimpin pemikiran' },
  {
    icon: BarChart3,
    title: 'Strategic Panel Discussions',
    description: 'Diskusi panel tentang isu-isu strategis nasional',
  },
  {
    icon: Zap,
    title: 'Executive Roundtables',
    description: 'Diskusi intensif dengan para eksekutif senior',
  },
  { icon: Users, title: 'Youth Forums', description: 'Forum khusus untuk generasi muda pemimpin' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function EventPage() {
  const handleShare = (platform: string) => {
    const eventUrl = typeof window !== 'undefined' ? window.location.href : '';
    const eventTitle = 'Indonesianisme 2026 Summit';
    const eventDescription =
      '80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia. Daftar sekarang!';

    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${eventTitle}\n${eventDescription}\n${eventUrl}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(eventUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(eventDescription)}\n${eventUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-deep-navy text-pearl-white">
      {/* Hero */}
      <PageHero
        title="Indonesianisme 2026"
        subtitle="Platform untuk 80 Gagasan IA-ITB tentang Pertumbuhan Ekonomi dan Transformasi Struktural Indonesia"
      />

      {/* Event Metadata Bar */}
      <section className="bg-itb-blue/20 backdrop-blur-md border-y border-gold/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="w-6 h-6 text-gold" />
              <div>
                <div className="text-sm text-pearl-white/60">Tanggal</div>
                <div className="font-semibold text-gold-light">Oktober 2026</div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MapPin className="w-6 h-6 text-gold" />
              <div>
                <div className="text-sm text-pearl-white/60">Lokasi</div>
                <div className="font-semibold text-gold-light">Jakarta, Indonesia</div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Zap className="w-6 h-6 text-gold" />
              <div>
                <div className="text-sm text-pearl-white/60">Format</div>
                <div className="font-semibold text-gold-light">Hybrid (Onsite + Online)</div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Users className="w-6 h-6 text-gold" />
              <div>
                <div className="text-sm text-pearl-white/60">Peserta</div>
                <div className="font-semibold text-gold-light">500+ Peserta</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">
            Menghitung Mundur Menuju Acara
          </h2>
          <p className="text-sky-blue text-lg">
            Waktu tersisa untuk bergabung dengan gerakan transformasi Indonesia
          </p>
        </motion.div>
        <CountdownTimer />
      </section>

      {/* Main Description */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          className="glass-card-dark p-8 md:p-12 border-l-4 border-gold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gold-light mb-6">Tema Utama</h3>
          <p className="text-lg leading-relaxed text-pearl-white/90">
            80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia: Reindustrialisasi, Kedaulatan
            Teknologi, dan Transformasi Struktural Menuju Kemandirian Bangsa
          </p>
        </motion.div>
      </section>

      {/* Event Components */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">
            Komponen Event
          </h2>
          <p className="text-sky-blue text-lg">
            Lima pilar utama yang membentuk ekosistem Indonesianisme
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {eventComponents.map((component, idx) => {
            const Icon = component.icon;
            return (
              <motion.div
                key={idx}
                className="glass-card-dark p-8 group hover:border-gold/30 transition-all duration-300"
                variants={itemVariants}
              >
                <Icon className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-pearl-white mb-3">{component.title}</h3>
                <p className="text-pearl-white/70 leading-relaxed">{component.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Session Formats */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">
            Format Sesi
          </h2>
          <p className="text-sky-blue text-lg">
            Berbagai format diskusi untuk memaksimalkan engagement
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sessionFormats.map((format, idx) => {
            const Icon = format.icon;
            return (
              <motion.div key={idx} className="glass-card-dark p-6 text-center" variants={itemVariants}>
                <Icon className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="font-bold text-pearl-white mb-2">{format.title}</h3>
                <p className="text-sm text-pearl-white/60">{format.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Venue Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">Lokasi Acara</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="glass-card-dark p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-warm-gray/20 rounded-lg w-full h-64 flex items-center justify-center mb-6">
              <div className="text-center text-pearl-white/50">
                <MapPin className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">Google Maps Placeholder</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card-dark p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-pearl-white mb-6">
              Jakarta Convention Center
            </h3>
            <div className="space-y-4 text-pearl-white/80 mb-8">
              <p>
                <span className="font-semibold text-gold">Alamat:</span>
                <br />
                Jalan Gatot Subroto, Jakarta 12960, Indonesia
              </p>
              <p>
                <span className="font-semibold text-gold">Telepon:</span>
                <br />
                +62 21 5794 1234
              </p>
              <p>
                <span className="font-semibold text-gold">Akses:</span>
                <br />
                Mudah diakses dengan transportasi umum dan privat
              </p>
            </div>
            <Button variant="accent" size="lg">
              Lihat di Google Maps
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Share Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">
            Bagikan Acara Ini
          </h2>
          <p className="text-sky-blue text-lg">
            Ajak teman dan rekan untuk bergabung dalam gerakan transformasi Indonesia
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { name: 'whatsapp', icon: '💬' },
            { name: 'linkedin', icon: '🔗' },
            { name: 'twitter', icon: '𝕏' },
            { name: 'email', icon: '📧' },
          ].map((social) => (
            <motion.button
              key={social.name}
              onClick={() => handleShare(social.name)}
              className="glass-card-dark px-6 py-3 hover:border-gold/30 transition-all duration-300 flex items-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Share2 className="w-5 h-5 text-gold" />
              <span className="capitalize text-pearl-white font-medium">{social.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="glass-card-dark p-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-6">
            Jangan Lewatkan Kesempatan Ini
          </h2>
          <p className="text-lg text-pearl-white/70 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan 500+ peserta untuk membahas masa depan ekonomi dan transformasi
            Indonesia menuju kemandirian bangsa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg">
              Daftar Sekarang
            </Button>
            <Button variant="secondary" size="lg">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
