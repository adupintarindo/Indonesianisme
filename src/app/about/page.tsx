'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

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

const coreValues = [
  {
    title: 'Kedaulatan',
    description: 'Mengambil keputusan strategis dengan mandiri berdasarkan kepentingan nasional',
    icon: '🏛️',
  },
  {
    title: 'Berdikari',
    description: 'Mengandalkan kekuatan internal dan sumber daya sendiri',
    icon: '💪',
  },
  {
    title: 'Kemandirian',
    description: 'Membangun ekonomi yang tidak bergantung pada faktor eksternal',
    icon: '🎯',
  },
  {
    title: 'Pertumbuhan Berkelanjutan',
    description: 'Menciptakan pertumbuhan ekonomi yang ramah lingkungan dan inklusif',
    icon: '🌱',
  },
  {
    title: 'Pengentasan Kesenjangan',
    description: 'Memastikan manfaat pertumbuhan tersebar di semua lapisan masyarakat',
    icon: '🤝',
  },
  {
    title: 'Reindustrialisasi Terencana',
    description: 'Mengembangkan industri dengan strategi yang terukur dan terarah',
    icon: '🏭',
  },
  {
    title: 'Orientasi Jangka Panjang',
    description: 'Berpikir jauh ke depan hingga tahun 2045 dan seterusnya',
    icon: '🔮',
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

const team = [
  {
    name: 'Dr. Bambang Permadi',
    role: 'Ketua Umum',
    image: 'https://i.pravatar.cc/200?u=team1',
  },
  {
    name: 'Prof. Eka Siswanto',
    role: 'Wakil Ketua - Ekonomi',
    image: 'https://i.pravatar.cc/200?u=team2',
  },
  {
    name: 'Ir. Joko Winarno',
    role: 'Wakil Ketua - Industri',
    image: 'https://i.pravatar.cc/200?u=team3',
  },
  {
    name: 'Dr. Siti Nurhaliza',
    role: 'Kepala Tim Keberlanjutan',
    image: 'https://i.pravatar.cc/200?u=team4',
  },
  {
    name: 'Hendra Kusuma',
    role: 'Kepala Tim Teknologi',
    image: 'https://i.pravatar.cc/200?u=team5',
  },
  {
    name: 'Dr. Maya Santoso',
    role: 'Kepala Riset & Data',
    image: 'https://i.pravatar.cc/200?u=team6',
  },
];

export default function About() {
  const [expandedValue, setExpandedValue] = useState(0);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] w-full flex flex-col items-center justify-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg
            viewBox="0 0 1000 100"
            className="w-full h-auto absolute bottom-0 left-0"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q250,25 500,50 T1000,50 L1000,100 L0,100 Z"
              fill="oklch(0.23 0.15 264)"
            />
          </svg>
        </div>

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
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card-dark p-8"
            >
              <h3 className="text-3xl font-plus-jakarta font-bold text-gold mb-4">
                Visi
              </h3>
              <p className="text-warm-gray-light leading-relaxed">
                Indonesia yang mandiri secara ekonomi dan teknologi, dengan pertumbuhan berkelanjutan sebesar 8% menuju tahun 2045, yang menjadi kontributor signifikan bagi stabilitas dan kemakmuran global.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card-dark p-8"
            >
              <h3 className="text-3xl font-plus-jakarta font-bold text-gold mb-4">
                Misi
              </h3>
              <p className="text-warm-gray-light leading-relaxed">
                Menghubungkan para pemikir, pembuat kebijakan, dan pemimpin industri untuk merancang dan mengimplementasikan strategi reindustrialisasi, transformasi teknologi, dan perubahan struktural yang menciptakan pertumbuhan ekonomi inklusif dan berkelanjutan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-16 text-center">
            7 Nilai Inti
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setExpandedValue(expandedValue === idx ? -1 : idx)}
                className="glass-card-dark p-6 cursor-pointer hover:bg-itb-blue/30 transition-colors"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="text-xl font-plus-jakarta font-bold text-gold mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-warm-gray-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About IA-ITB */}
      <section className="relative py-16 md:py-24 bg-deep-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto glass-card-dark p-8"
          >
            <h2 className="text-4xl font-plus-jakarta font-bold text-pearl-white mb-6">
              Tentang Indonesian Alliance-ITB
            </h2>

            <p className="text-warm-gray-light leading-relaxed mb-4">
              Indonesian Alliance-ITB (IA-ITB) adalah institusi pemikiran strategis yang didirikan dengan mandato untuk mengembangkan gagasan-gagasan inovatif bagi pembangunan Indonesia jangka panjang. Berfungsi sebagai jembatan antara akademisi, industri, dan pemerintah, IA-ITB telah menjadi pusat dialog strategis untuk mengidentifikasi peluang dan tantangan pembangunan Indonesia.
            </p>

            <p className="text-warm-gray-light leading-relaxed mb-4">
              Dengan jaringan global yang luas dan pemahaman mendalam tentang konteks lokal Indonesia, IA-ITB berkomitmen untuk menghasilkan penelitian yang actionable dan strategi yang dapat diterapkan untuk akselerasi pertumbuhan ekonomi nasional.
            </p>

            <p className="text-warm-gray-light leading-relaxed">
              Indonesianisme 2026 adalah manifestasi dari komitmen IA-ITB untuk menciptakan platform kolaboratif yang mengintegrasikan berbagai perspektif dan keahlian dalam merumuskan arah strategis Indonesia untuk dekade-dekade mendatang.
            </p>
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
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-16 text-center">
            Tim Penyelenggara
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card-dark p-6 text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gold">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-plus-jakarta font-bold text-pearl-white text-lg mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-gold">{member.role}</p>
              </motion.div>
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
