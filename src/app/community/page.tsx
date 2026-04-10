'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Users, Lock, Zap } from 'lucide-react';
import { useState } from 'react';
import { HeroBG } from '@/components/shared/HeroBG';

const interestAreas = [
  'Energi',
  'Teknologi',
  'Pangan',
  'Mineral',
  'Manufaktur',
  'Ekonomi Hijau',
  'Infrastruktur',
  'SDM',
];

const membershipTiers = [
  {
    title: 'Anggota Umum',
    price: 'Gratis',
    features: [
      'Akses newsletter',
      'Update acara',
      'Forum diskusi dasar',
      'Akses perpustakaan publik',
    ],
    icon: Users,
    color: 'border-teal',
  },
  {
    title: 'Anggota IA-ITB',
    price: 'Eksklusif',
    features: [
      'Akses semua fitur dasar',
      'Webinar eksklusif',
      'Akses awal tiket',
      'Jaringan alumni',
      'Repository pengetahuan',
    ],
    icon: Lock,
    color: 'border-gold',
    featured: true,
  },
  {
    title: 'Mitra Strategis',
    price: 'Custom',
    features: [
      'Akses penuh',
      'Event networking',
      'Repository komprehensif',
      'Konsultasi strategis',
      'Branding partnership',
    ],
    icon: Zap,
    color: 'border-itb-blue',
  },
];

const testimonials = [
  {
    name: 'Dr. Arif Widodo',
    title: 'Direktur Riset',
    company: 'PT Teknologi Maju',
    text: 'Indonesianisme memberikan platform yang sangat dibutuhkan untuk dialog strategis tentang masa depan ekonomi Indonesia.',
    image: 'https://i.pravatar.cc/200?u=testimonial1',
  },
  {
    name: 'Siti Nurhaliza',
    title: 'Kepala Divisi Kebijakan',
    company: 'Kementerian Industri',
    text: 'Gagasan-gagasan yang dikumpulkan sangat konkret dan actionable untuk formulasi kebijakan nasional.',
    image: 'https://i.pravatar.cc/200?u=testimonial2',
  },
  {
    name: 'Budi Hartono',
    title: 'CEO',
    company: 'Startup Indonesia',
    text: 'Komunitas ini membuka peluang kolaborasi yang tidak terbatas dengan pemimpin industri dan pembuat keputusan.',
    image: 'https://i.pravatar.cc/200?u=testimonial3',
  },
];

export default function CommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [] as string[],
  });

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Terima kasih! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', interests: [] });
  };

  return (
    <div className="w-full min-h-screen bg-deep-navy">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
        <HeroBG variant="blue" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-pearl-white font-plus-jakarta mb-4">
              Bergabung dengan Komunitas Indonesianisme
            </h1>
            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto">
              Menjadi bagian dari gerakan pembangunan Indonesia bersama pemimpin pemikiran, industri, dan kebijakan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-deep-navy/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card-dark p-8 md:p-12 rounded-xl"
          >
            <div className="text-4xl md:text-5xl font-bold text-gold font-plus-jakarta mb-2">
              5,000+
            </div>
            <p className="text-warm-gray-light">
              Anggota komunitas aktif dan terus bertambah
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-dark p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-pearl-white font-plus-jakarta mb-8 text-center">
              Bergabung Sekarang
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-pearl-white font-plus-jakarta font-bold mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-deep-navy/50 border border-gold/30 text-pearl-white placeholder-warm-gray-light focus:outline-none focus:border-gold transition-all"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-pearl-white font-plus-jakarta font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-deep-navy/50 border border-gold/30 text-pearl-white placeholder-warm-gray-light focus:outline-none focus:border-gold transition-all"
                  placeholder="Masukkan email Anda"
                />
              </div>

              <div>
                <label className="block text-pearl-white font-plus-jakarta font-bold mb-4">
                  Area Minat
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestAreas.map(area => (
                    <label
                      key={area}
                      className="flex items-center gap-2 cursor-pointer p-3 rounded-lg bg-deep-navy/50 border border-gold/30 hover:border-gold/60 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(area)}
                        onChange={() => handleInterestToggle(area)}
                        className="w-4 h-4 rounded text-gold focus:ring-gold"
                      />
                      <span className="text-sm text-warm-gray-light">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors text-lg"
              >
                Bergabung Sekarang
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Community */}
      <section className="py-16 md:py-24 bg-deep-navy/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-dark p-8 md:p-12 text-center"
          >
            <MessageCircle className="w-16 h-16 text-gold mx-auto mb-6" />

            <h2 className="text-3xl font-bold text-pearl-white font-plus-jakarta mb-4">
              Komunitas WhatsApp Indonesianisme
            </h2>

            <p className="text-warm-gray-light mb-8 leading-relaxed">
              Bergabunglah dengan grup WhatsApp kami untuk diskusi real-time, berbagi update, networking, dan akses eksklusif ke webinar serta event komunitas.
            </p>

            <a
              href="https://chat.whatsapp.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Gabung Grup WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-pearl-white font-plus-jakarta mb-12 text-center"
          >
            Tingkat Keanggotaan
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`glass-card-dark border-2 p-8 rounded-xl flex flex-col h-full ${
                    tier.featured ? 'border-gold ring-2 ring-gold/30 scale-105' : `${tier.color}`
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-full text-sm">
                      Populer
                    </span>
                  )}

                  <Icon className={`w-8 h-8 mb-4 ${tier.featured ? 'text-gold' : 'text-teal'}`} />

                  <h3 className="text-2xl font-bold text-pearl-white font-plus-jakarta mb-2">
                    {tier.title}
                  </h3>

                  <p className={`text-xl font-bold mb-6 ${tier.featured ? 'text-gold' : 'text-teal'}`}>
                    {tier.price}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3 text-warm-gray-light">
                        <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-lg font-plus-jakarta font-bold transition-all ${
                    tier.featured
                      ? 'bg-gold text-deep-navy hover:bg-gold-light'
                      : 'border-2 border-gold/30 text-gold hover:border-gold/60'
                  }`}>
                    Pelajari Lebih Lanjut
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-deep-navy/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-pearl-white font-plus-jakarta mb-12 text-center"
          >
            Testimoni Anggota Komunitas
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card-dark p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-plus-jakarta font-bold text-pearl-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-warm-gray-light">
                      {testimonial.title} • {testimonial.company}
                    </p>
                  </div>
                </div>

                <p className="text-warm-gray-light leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-deep-navy to-itb-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-6">
              Siap Bergabung?
            </h2>

            <p className="text-warm-gray-light mb-8 max-w-xl mx-auto">
              Jadilah bagian dari gerakan pembangunan berkelanjutan Indonesia. Bersama-sama kita bentuk masa depan yang lebih baik.
            </p>

            <a
              href="#bergabung"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors text-lg"
            >
              Mulai Bergabung
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
