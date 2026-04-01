'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ID' | 'EN';

const translations: Record<string, Record<Lang, string>> = {
  'nav.about': { ID: 'Tentang', EN: 'About' },
  'nav.event': { ID: 'Event', EN: 'Event' },
  'nav.speakers': { ID: 'Pembicara', EN: 'Speakers' },
  'nav.program': { ID: 'Program', EN: 'Program' },
  'nav.topics': { ID: 'Topik', EN: 'Topics' },
  'nav.publications': { ID: 'Publikasi', EN: 'Publications' },
  'nav.gallery': { ID: 'Galeri', EN: 'Gallery' },
  'nav.community': { ID: 'Komunitas', EN: 'Community' },
  'nav.register': { ID: 'Daftar Sekarang', EN: 'Register Now' },
  'nav.faq': { ID: 'FAQ', EN: 'FAQ' },
  'nav.media': { ID: 'Media', EN: 'Media' },
  'nav.calendar': { ID: 'Kalender', EN: 'Calendar' },
  'nav.sponsorship': { ID: 'Sponsorship', EN: 'Sponsorship' },
  'hero.title': { ID: 'INDONESIANISME 2026', EN: 'INDONESIANISME 2026' },
  'hero.subtitle': { ID: '80 Gagasan untuk 8% Pertumbuhan Ekonomi Indonesia', EN: '80 Ideas for 8% Indonesian Economic Growth' },  'hero.tagline': { ID: 'Reindustrialisasi · Kedaulatan Teknologi · Transformasi Struktural', EN: 'Reindustrialization · Technology Sovereignty · Structural Transformation' },
  'hero.cta': { ID: 'Daftar Sekarang', EN: 'Register Now' },
  'hero.learn': { ID: 'Pelajari Lebih Lanjut', EN: 'Learn More' },
  'stats.ideas': { ID: 'Gagasan Strategis', EN: 'Strategic Ideas' },
  'stats.speakers': { ID: 'Pembicara', EN: 'Speakers' },
  'stats.sectors': { ID: 'Sektor Prioritas', EN: 'Priority Sectors' },
  'stats.pillars': { ID: 'Pilar Utama', EN: 'Main Pillars' },
  'about.title': { ID: 'Apa itu Indonesianisme?', EN: 'What is Indonesianisme?' },
  'about.p1': { ID: 'Indonesianisme adalah platform strategis nasional jangka panjang yang dibentuk oleh Ikatan Alumni ITB (IA-ITB) untuk menghubungkan para pemikir, pembuat kebijakan, dan pemimpin industri dalam merumuskan gagasan-gagasan transformatif bagi Indonesia.', EN: 'Indonesianisme is a long-term national strategic platform established by ITB Alumni Association (IA-ITB) to connect thinkers, policymakers, and industry leaders in formulating transformative ideas for Indonesia.' },
  'about.p2': { ID: 'Gerakan ini berfokus pada tiga pilar utama: reindustrialisasi terencana, kedaulatan teknologi, dan transformasi struktural ekonomi untuk mencapai pertumbuhan berkelanjutan sebesar 8% menuju tahun 2045.', EN: 'This movement focuses on three main pillars: planned reindustrialization, technology sovereignty, and structural economic transformation to achieve sustainable 8% growth towards 2045.' },
  'about.p3': { ID: 'Dengan melibatkan lebih dari 80 gagasan strategis dari berbagai sektor, Indonesianisme menciptakan dialog konstruktif antara akademisi, industri, dan pemerintah.', EN: 'By involving more than 80 strategic ideas from various sectors, Indonesianisme creates constructive dialogue between academia, industry, and government.' },
  'about.link': { ID: 'Kenali Lebih Dekat', EN: 'Learn More' },
  'speakers.title': { ID: 'Para Pemikir di Balik Gagasan', EN: 'The Thinkers Behind the Ideas' },
  'speakers.all': { ID: 'Lihat Semua Pembicara', EN: 'View All Speakers' },
  'pillars.title': { ID: '6 Pilar Strategis', EN: '6 Strategic Pillars' },
  'pillars.all': { ID: 'Jelajahi Semua Topik', EN: 'Explore All Topics' },  'events.title': { ID: 'Jadwal Kegiatan', EN: 'Event Schedule' },
  'events.all': { ID: 'Lihat Kalender Lengkap', EN: 'View Full Calendar' },
  'partners.title': { ID: 'Mitra Strategis', EN: 'Strategic Partners' },
  'partners.cta': { ID: 'Jadilah Mitra', EN: 'Become a Partner' },
  'newsletter.title': { ID: 'Bergabung dengan Gerakan Indonesianisme', EN: 'Join the Indonesianisme Movement' },
  'newsletter.desc': { ID: 'Dapatkan update terbaru tentang gagasan-gagasan strategis, acara, dan perkembangan gerakan.', EN: 'Get the latest updates on strategic ideas, events, and movement progress.' },
  'newsletter.placeholder': { ID: 'Masukkan email Anda', EN: 'Enter your email' },
  'newsletter.btn': { ID: 'Berlangganan', EN: 'Subscribe' },
  'newsletter.or': { ID: 'atau bergabung melalui:', EN: 'or join via:' },
  'newsletter.wa': { ID: 'Komunitas WhatsApp', EN: 'WhatsApp Community' },
  'footer.desc': { ID: 'Platform strategis nasional oleh Ikatan Alumni ITB untuk Indonesia Emas 2045.', EN: 'National strategic platform by ITB Alumni Association for Golden Indonesia 2045.' },
  'footer.about': { ID: 'Tentang', EN: 'About' },
  'footer.program': { ID: 'Program', EN: 'Program' },
  'footer.community': { ID: 'Komunitas', EN: 'Community' },
  'footer.privacy': { ID: 'Kebijakan Privasi', EN: 'Privacy Policy' },
  'footer.terms': { ID: 'Syarat & Ketentuan', EN: 'Terms & Conditions' },
  'footer.rights': { ID: 'Hak Cipta Dilindungi.', EN: 'All Rights Reserved.' },
  'theme.dark': { ID: 'Mode Gelap', EN: 'Dark Mode' },
  'theme.light': { ID: 'Mode Terang', EN: 'Light Mode' },
  'days': { ID: 'Hari', EN: 'Days' },
  'hours': { ID: 'Jam', EN: 'Hours' },
  'minutes': { ID: 'Menit', EN: 'Minutes' },
  'seconds': { ID: 'Detik', EN: 'Seconds' },
};
interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'ID',
  setLang: () => {},
  t: (key: string) => key,
});

export const useLang = () => useContext(LangContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ID');

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export default LanguageProvider;