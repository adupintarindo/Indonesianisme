'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';

type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    category: 'Umum',
    question: 'Apa itu Indonesianisme?',
    answer: 'Indonesianisme adalah platform strategis nasional jangka panjang yang diluncurkan oleh Ikatan Alumni Institut Teknologi Bandung (IA-ITB) untuk menghubungkan pemikir, pembuat kebijakan, pemimpin industri, dan generasi penerus dalam membentuk pembangunan Indonesia menuju 2045.',
  },
  {
    category: 'Umum',
    question: 'Siapa penyelenggaranya?',
    answer: 'Ikatan Alumni Institut Teknologi Bandung (IA-ITB) dengan dukungan berbagai mitra strategis dari pemerintah, industri, dan akademisi.',
  },
  {
    category: 'Umum',
    question: 'Kapan dan dimana acara ini diadakan?',
    answer: 'Indonesianisme Summit 2026 akan diadakan pada Oktober 2026 di Jakarta, Indonesia, dalam format hybrid (onsite + online).',
  },
  {
    category: 'Umum',
    question: 'Apa tema utama Indonesianisme 2026?',
    answer: '"80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia: Reindustrialisasi, Kedaulatan Teknologi, dan Transformasi Struktural Menuju Kemandirian Bangsa"',
  },
  {
    category: 'Pendaftaran',
    question: 'Bagaimana cara mendaftar?',
    answer: 'Klik tombol "Daftar Sekarang" di halaman registrasi, pilih tier tiket, isi formulir, dan lakukan pembayaran.',
  },
  {
    category: 'Pendaftaran',
    question: 'Apa saja tier tiket yang tersedia?',
    answer: 'Early Bird (Rp 750.000), Regular (Rp 1.250.000), VIP (Rp 3.500.000), dan Pelajar (Rp 250.000).',
  },
  {
    category: 'Pendaftaran',
    question: 'Apakah bisa refund?',
    answer: 'Refund tersedia hingga 30 hari sebelum acara dengan potongan administrasi 10%. Setelah itu, tiket dapat ditransfer ke orang lain.',
  },
  {
    category: 'Pendaftaran',
    question: 'Apakah ada harga grup?',
    answer: 'Ya, untuk pendaftaran 10 orang atau lebih tersedia harga khusus. Hubungi tim kami melalui WhatsApp.',
  },
  {
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja?',
    answer: 'Transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, DANA), dan kartu kredit/debit (Visa, Mastercard).',
  },
  {
    category: 'Pembayaran',
    question: 'Apakah bisa cicilan?',
    answer: 'Tersedia cicilan 0% untuk kartu kredit tertentu. Detail akan ditampilkan saat checkout.',
  },
  {
    category: 'Pembayaran',
    question: 'Bagaimana mendapatkan invoice?',
    answer: 'Invoice otomatis dikirim ke email setelah pembayaran berhasil. Anda juga bisa mengunduhnya dari dashboard peserta.',
  },
  {
    category: 'Hari-H',
    question: 'Bagaimana dress code-nya?',
    answer: 'Business casual. Untuk Gala Dinner, formal attire.',
  },
  {
    category: 'Hari-H',
    question: 'Apakah ada live streaming?',
    answer: 'Ya, seluruh sesi keynote dan panel akan di-livestream untuk peserta online.',
  },
  {
    category: 'Hari-H',
    question: 'Bagaimana dengan parkir?',
    answer: 'Informasi parkir dan transportasi akan diinformasikan via email 1 minggu sebelum acara.',
  },
];

const categories = ['Umum', 'Pendaftaran', 'Pembayaran', 'Hari-H'];

type ExpandedCategory = {
  [key: string]: boolean;
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<ExpandedCategory>({});

  const filtered = faqItems.filter(
    item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = filtered.filter(item => item.category === cat);
    return acc;
  }, {} as Record<string, FAQItem[]>);

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
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang Indonesianisme Summit 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Cari pertanyaan atau jawaban..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-lg bg-deep-navy/50 border border-gold/30 text-pearl-white placeholder-warm-gray-light focus:outline-none focus:border-gold transition-all"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {categories.map((cat, catIdx) => {
            const items = grouped[cat];
            if (items.length === 0) return null;

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gold font-plus-jakarta mb-6 pb-4 border-b border-gold/30">
                  {cat}
                </h2>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {items.map((item, idx) => {
                      const itemKey = `${cat}-${idx}`;
                      const isExpanded = expandedItems[itemKey];

                      return (
                        <motion.div
                          key={itemKey}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="glass-card-dark overflow-hidden"
                        >
                          <button
                            onClick={() => toggleExpand(itemKey)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all"
                          >
                            <span className="font-plus-jakarta font-bold text-pearl-white">
                              {item.question}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-gold" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-gold/10"
                              >
                                <p className="px-6 py-4 text-warm-gray-light leading-relaxed">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
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
              Tidak menemukan jawaban?
            </h2>

            <p className="text-warm-gray-light mb-8 max-w-xl mx-auto">
              Tim kami siap membantu Anda. Hubungi kami melalui WhatsApp atau email untuk pertanyaan lebih lanjut.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/628123456789?text=Saya%20punya%20pertanyaan%20tentang%20Indonesianisme"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>

              <a
                href="mailto:info@indonesianisme.id"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-gold text-gold font-plus-jakarta font-bold rounded-lg hover:bg-gold/10 transition-all"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
