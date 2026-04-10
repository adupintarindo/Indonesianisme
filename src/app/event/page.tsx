'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/shared/PageHero';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { Button } from '@/components/ui/Button';
import { speakers } from '@/data/speakers';
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
  Mic2,
  MessageSquare,
  Store,
  Palette,
  Timer,
  TrendingUp,
  Briefcase,
  Music,
  Frame,
  BookOpen,
  Building2,
  Clock,
  Search,
  X,
  UserCircle2,
  ChevronRight,
} from 'lucide-react';

const bmCategories = ['Semua', 'Pangan', 'Energi', 'Kesehatan', 'Teknologi', 'Industri'];

const bmCategoryConfig: Record<string, {
  label: string; accent: string; accentSoft: string;
  gradient: string; avatarGrad: string; glow: string;
}> = {
  Pangan:    { label: 'Pangan',    accent: '#059669', accentSoft: 'rgba(5,150,105,0.08)',   gradient: 'var(--color-bg-card)', avatarGrad: 'linear-gradient(135deg,#065f46,#34D399)', glow: 'rgba(5,150,105,0.10)'   },
  Energi:    { label: 'Energi',    accent: '#D97706', accentSoft: 'rgba(217,119,6,0.08)',   gradient: 'var(--color-bg-card)', avatarGrad: 'linear-gradient(135deg,#92400e,#FBBF24)', glow: 'rgba(217,119,6,0.10)'   },
  Kesehatan: { label: 'Kesehatan', accent: '#E11D48', accentSoft: 'rgba(225,29,72,0.08)',   gradient: 'var(--color-bg-card)', avatarGrad: 'linear-gradient(135deg,#9f1239,#FB7185)', glow: 'rgba(225,29,72,0.10)'   },
  Teknologi: { label: 'Teknologi', accent: '#2563EB', accentSoft: 'rgba(37,99,235,0.08)',   gradient: 'var(--color-bg-card)', avatarGrad: 'linear-gradient(135deg,#1e3a8a,#60A5FA)', glow: 'rgba(37,99,235,0.10)'   },
  Industri:  { label: 'Industri',  accent: '#7C3AED', accentSoft: 'rgba(124,58,237,0.08)', gradient: 'var(--color-bg-card)', avatarGrad: 'linear-gradient(135deg,#4c1d95,#A78BFA)', glow: 'rgba(124,58,237,0.10)'  },
};

const businessMatchingCompanies = [
  { id: 1,  abbr: 'PP', name: 'PT. Pangan Prima Nusantara',        category: 'Pangan',    day: 'Hari 1', time: '09.00–10.00 WIB', room: 'Ruang Pangan – Lt. 1' },
  { id: 2,  abbr: 'FI', name: 'PT. Freshland Indonesia',            category: 'Pangan',    day: 'Hari 1', time: '10.00–11.00 WIB', room: 'Ruang Pangan – Lt. 1' },
  { id: 3,  abbr: 'MA', name: 'PT. Majjama Argo Industri',          category: 'Pangan',    day: 'Hari 1', time: '11.00–12.00 WIB', room: 'Ruang Pangan – Lt. 1' },
  { id: 4,  abbr: 'GM', name: 'PT. Gapoktan Margo Sugih',           category: 'Pangan',    day: 'Hari 2', time: '09.00–10.00 WIB', room: 'Ruang Pangan – Lt. 1' },
  { id: 5,  abbr: 'SH', name: 'PT. Sinar Hijau Ventures',           category: 'Pangan',    day: 'Hari 2', time: '10.00–11.00 WIB', room: 'Ruang Pangan – Lt. 1' },
  { id: 6,  abbr: 'PB', name: 'PT. Pahala Bahari Seafood',          category: 'Pangan',    day: 'Hari 2', time: '11.00–12.00 WIB', room: 'Ruang Pangan – Lt. 1' },
  { id: 7,  abbr: 'PM', name: 'PT. Pertamina (Persero)',             category: 'Energi',    day: 'Hari 1', time: '09.00–10.00 WIB', room: 'Ruang Energi – Lt. 2' },
  { id: 8,  abbr: 'PL', name: 'PT. PLN (Persero)',                   category: 'Energi',    day: 'Hari 1', time: '10.00–11.00 WIB', room: 'Ruang Energi – Lt. 2' },
  { id: 9,  abbr: 'GG', name: 'PT. Gotion Green Energy Solutions',   category: 'Energi',    day: 'Hari 1', time: '11.00–12.00 WIB', room: 'Ruang Energi – Lt. 2' },
  { id: 10, abbr: 'TB', name: 'PT. Trimitra Buana Engineering',      category: 'Energi',    day: 'Hari 2', time: '09.00–10.00 WIB', room: 'Ruang Energi – Lt. 2' },
  { id: 11, abbr: 'EL', name: 'EVP Listrik Desa Indonesia',          category: 'Energi',    day: 'Hari 2', time: '10.00–11.00 WIB', room: 'Ruang Energi – Lt. 2' },
  { id: 12, abbr: 'BF', name: 'PT. Bio Farma (Persero)',             category: 'Kesehatan', day: 'Hari 1', time: '09.00–10.00 WIB', room: 'Ruang Kesehatan – Lt. 3' },
  { id: 13, abbr: 'BR', name: 'Biometrik Riset Indonesia',           category: 'Kesehatan', day: 'Hari 1', time: '10.00–11.00 WIB', room: 'Ruang Kesehatan – Lt. 3' },
  { id: 14, abbr: 'OO', name: 'PT. Otak Optimal Indonesia',          category: 'Kesehatan', day: 'Hari 2', time: '09.00–10.00 WIB', room: 'Ruang Kesehatan – Lt. 3' },
  { id: 15, abbr: 'BT', name: 'Brilyan Trimatra Utama',              category: 'Kesehatan', day: 'Hari 2', time: '10.00–11.00 WIB', room: 'Ruang Kesehatan – Lt. 3' },
  { id: 16, abbr: 'TI', name: 'PT. Teknindo Inovasi Bangsa',         category: 'Teknologi', day: 'Hari 1', time: '09.00–10.00 WIB', room: 'Ruang Teknologi – Lt. 4' },
  { id: 17, abbr: 'DI', name: 'PT. Digital Indonesia Raya',          category: 'Teknologi', day: 'Hari 1', time: '10.00–11.00 WIB', room: 'Ruang Teknologi – Lt. 4' },
  { id: 18, abbr: 'AI', name: 'PT. Artefak Intelijen',               category: 'Teknologi', day: 'Hari 2', time: '09.00–10.00 WIB', room: 'Ruang Teknologi – Lt. 4' },
  { id: 19, abbr: 'NS', name: 'PT. Nusantara Solusi Digital',        category: 'Teknologi', day: 'Hari 2', time: '10.00–11.00 WIB', room: 'Ruang Teknologi – Lt. 4' },
  { id: 20, abbr: 'KI', name: 'PT. Krakatau Industrial Estate',      category: 'Industri',  day: 'Hari 1', time: '09.00–10.00 WIB', room: 'Ruang Industri – Lt. 5' },
  { id: 21, abbr: 'MI', name: 'PT. Muara Industri Nusantara',        category: 'Industri',  day: 'Hari 2', time: '09.00–10.00 WIB', room: 'Ruang Industri – Lt. 5' },
  { id: 22, abbr: 'IP', name: 'PT. Industri Pupuk Kalimantan',       category: 'Industri',  day: 'Hari 3', time: '09.00–10.00 WIB', room: 'Ruang Industri – Lt. 5' },
];


const ganeshaEvents = [
  {
    number: 1,
    icon: Mic2,
    name: 'Ganesha Bicara',
    type: 'Pleno',
    capacity: '500+ peserta',
    room: 'Aula Utama — Gedung Sabuga',
    schedule: 'Hari 1, 09.00 – 10.30 WIB',
    description:
      'Panggung utama yang diisi oleh para tamu penting dengan nuansa formal berbentuk forum satu arah. Menjadi panggung utama untuk menyampaikan gagasan strategis kepada seluruh peserta.',
    speakers: ['Presiden Republik Indonesia', 'Menteri Keuangan', 'Ketua IA ITB', 'Ketua Steering Committee'],
    hasSpeakers: true,
    imageSrc: 'https://picsum.photos/seed/keynote-hall-podium-conference/800/320',
    gradient: 'linear-gradient(135deg, #0d2a6e 0%, #1a4abf 50%, #0a1e54 100%)',
    accent: '#3B82F6',
  },
  {
    number: 2,
    icon: MessageSquare,
    name: 'Ganesha Diskusi',
    type: 'Diskusi Panel',
    capacity: '80 peserta (terbatas)',
    room: 'Ruang Panel A, B, C — Lt. 2',
    schedule: 'Hari 1–3, paralel sesi',
    description:
      'Sesi diskusi dengan pengaturan yang lebih intens melalui ruang tertutup dan audiens terbatas. Dikemas dengan 1 moderator dan 2–3 pembicara serta sesi pertanyaan audiens yang terbatas.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/panel-discussion-roundtable-speakers/800/320',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #0d9488 50%, #042f24 100%)',
    accent: '#14B8A6',
  },
  {
    number: 3,
    icon: Store,
    name: 'Ganesha Berkarya',
    type: 'Startup Fair',
    capacity: 'Open for all peserta',
    room: 'Hall Pameran — Lantai Dasar',
    schedule: 'Hari 1–3, 08.00 – 17.00 WIB',
    description:
      'Menampilkan hasil karya, inovasi, dan gagasan yang dikemas melalui booth. Menjadi media bagi para audiens untuk melihat, bertanya, dan berdiskusi secara bebas dan intensif.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/startup-exhibition-booth-innovation/800/320',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #431407 100%)',
    accent: '#F97316',
  },
  {
    number: 4,
    icon: Palette,
    name: 'Ganesha Berkreasi',
    type: 'Workshop',
    capacity: '30 peserta per sesi (ticketing)',
    room: 'Ruang Workshop — Lt. 3',
    schedule: 'Hari 2–3, sesi terjadwal',
    description:
      'Kegiatan workshop untuk meningkatkan pengetahuan, keahlian, atau kesenian. Diisi oleh trainer dan fasilitator relevan dengan audiens terbatas, sistem ticketing, dan ruangan tertutup.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/workshop-creative-craft-learning/800/320',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #2e1065 100%)',
    accent: '#A78BFA',
  },
  {
    number: 5,
    icon: Timer,
    name: 'Ganesha PechaKucha',
    type: 'Pitching Forum',
    capacity: '200 peserta undangan',
    room: 'Stage B — Gedung Utara',
    schedule: 'Hari 2, 14.00 – 17.00 WIB',
    description:
      'Format presentasi cepat dan ringkas dengan total waktu hanya 6 menit 40 detik. Media bagi para inovator mempresentasikan usaha atau gagasannya di hadapan judges dari pemerintah, investor, dan pengusaha.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/pitch-stage-spotlight-presentation/800/320',
    gradient: 'linear-gradient(135deg, #881337 0%, #e11d48 50%, #4c0519 100%)',
    accent: '#FB7185',
  },
  {
    number: 6,
    icon: TrendingUp,
    name: 'Ganesha Peluang',
    type: 'Business Matchmaking',
    capacity: 'By invitation only',
    room: 'Ruang VIP — Lt. 4',
    schedule: 'Hari 1–3, sesi 1 jam',
    description:
      'Memberikan ruang bagi para investor untuk mengobrol lebih intens dengan para pengusaha. Dikemas melalui ruangan tertutup untuk memfasilitasi penjajakan dan realisasi pendanaan.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/business-meeting-handshake-deal/800/320',
    gradient: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #052e16 100%)',
    accent: '#4ADE80',
  },
  {
    number: 7,
    icon: Briefcase,
    name: 'Ganesha Cari Kerja',
    type: 'Job Fair',
    capacity: 'Open for all — gratis',
    room: 'Atrium Utama — Gedung Barat',
    schedule: 'Hari 2–3, 09.00 – 16.00 WIB',
    description:
      'Mempertemukan penyedia kesempatan kerja dengan para pencari kerja. Dikemas dengan konsep booth, diperkuat talkshow intensif, dan pendaftaran langsung ke perusahaan.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/job-fair-career-hiring-recruiter/800/320',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #082f49 100%)',
    accent: '#38BDF8',
  },
  {
    number: 8,
    icon: Music,
    name: 'Pesta Rakyat Ganesha',
    type: 'Pesta Rakyat',
    capacity: 'Open untuk masyarakat umum',
    room: 'Lapangan Parkir Timur',
    schedule: 'Hari 3, 17.00 – 22.00 WIB',
    description:
      'Ruang hiburan yang berisikan konser seni, kuliner, usaha teman, dan perlombaan untuk anak-anak. Wajah meriah dari semangat Ganesha untuk seluruh lapisan masyarakat.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/concert-festival-crowd-celebration/800/320',
    gradient: 'linear-gradient(135deg, #713f12 0%, #d97706 40%, #ca8a04 80%, #713f12 100%)',
    accent: '#FBBF24',
  },
  {
    number: 9,
    icon: Frame,
    name: 'Pameran Ganesha',
    type: 'Exhibition',
    capacity: 'Open for all peserta',
    room: 'Galeri Seni — Gedung Selatan',
    schedule: 'Hari 1–3, sepanjang acara',
    description:
      'Ruang pameran yang menghadirkan hasil karya seni dan sains. Para artis dan saintis dapat menjelaskan tujuan dan karyanya langsung kepada para pengunjung.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/art-gallery-exhibition-modern/800/320',
    gradient: 'linear-gradient(135deg, #581c87 0%, #9333ea 50%, #3b0764 100%)',
    accent: '#C084FC',
  },
  {
    number: 10,
    icon: BookOpen,
    name: 'Pojok Nyaman Ganesha',
    type: 'Mini Perpus',
    capacity: 'Open untuk semua usia',
    room: 'Sudut Tenang — Lobi Lt. 1',
    schedule: 'Hari 1–3, sepanjang acara',
    description:
      'Ruang nyaman untuk beristirahat, membaca, belajar, dan bermain bagi anak-anak. Terdapat aktivitas bedah buku dan diskusi buku sebagai sarana literasi yang hidup.',
    hasSpeakers: false,
    imageSrc: 'https://picsum.photos/seed/library-books-reading-cozy/800/320',
    gradient: 'linear-gradient(135deg, #44403c 0%, #a16207 40%, #78350f 100%)',
    accent: '#D97706',
  },
];

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

const roleConfig: Record<string, { label: string; color: string; bg: string }> = {
  pemerintah: { label: 'Pemerintah', color: '#3B6FD4', bg: 'rgba(59,111,212,0.12)' },
  akademisi:  { label: 'Akademisi',  color: '#9B4FD8', bg: 'rgba(155,79,216,0.12)' },
  industri:   { label: 'Industri',   color: '#C08B2A', bg: 'rgba(192,139,42,0.12)' },
  thinktank:  { label: 'Think Tank', color: '#0E9E74', bg: 'rgba(14,158,116,0.12)' },
  media:      { label: 'Media',      color: '#64748B', bg: 'rgba(100,116,139,0.12)' },
  moderator:  { label: 'Moderator',  color: '#E11D48', bg: 'rgba(225,29,72,0.10)'  },
  'future leaders': { label: 'Future Leaders', color: '#34D399', bg: 'rgba(52,211,153,0.12)' },
};

const panelSessions = [
  {
    id: 1,
    badge: 'GANESHA BICARA',
    badgeColor: '#C08B2A',
    type: 'Keynote',
    day: 'Hari 1',
    time: '09.00 – 10.30',
    coverImage: 'https://picsum.photos/seed/university-conference-lecture-podium/1200/460',
    title: '80 Gagasan IA-ITB: Dari Riset Akademis Menjadi Kebijakan Nasional',
    speakers: speakers.filter(s => s.panelId === 'keynote-1').map((s, i) => ({
      initials: s.avatar, name: s.name, org: s.position, role: s.category === 'Future Leaders' ? 'future leaders' : s.category.toLowerCase(),
      img: s.img, isModerator: i === 2,
    })),
    discussions: [
      { num: 1, title: 'Relevansi Riset', points: ['Seberapa jauh riset perguruan tinggi telah memengaruhi industri Indonesia?', 'Apa hambatan kolaborasi antara dunia riset dan pengambil keputusan?'] },
      { num: 2, title: 'Agenda 80 Gagasan', points: ['Dari 80 gagasan IA-ITB, mana yang paling siap diimplementasikan dalam 3 tahun ke depan?', 'Bagaimana mekanisme adopsi gagasan dari forum ini ke dalam program pemerintah?'] },
      { num: 3, title: 'Menuju 8 Persen', points: ['Apakah target 8% pertumbuhan ekonomi realistis tanpa transformasi struktural?', 'Apa tiga kebijakan prioritas yang harus dijalankan segera?'] },
    ],
  },
  {
    id: 2,
    badge: 'GANESHA DISKUSI',
    badgeColor: '#0E9E74',
    type: 'Panel',
    day: 'Hari 2',
    time: '10.00 – 11.30',
    coverImage: 'https://picsum.photos/seed/steel-factory-industrial-smokestack/1200/460',
    title: 'Reindustrialisasi Indonesia: Mimpi Besar atau Keniscayaan Ekonomi?',
    speakers: speakers.filter(s => s.panelId === 'panel-hilirisasi').map((s, i) => ({
      initials: s.avatar, name: s.name, org: s.position, role: s.category === 'Future Leaders' ? 'future leaders' : s.category.toLowerCase(),
      img: s.img, isModerator: i === 3,
    })),
    discussions: [
      { num: 1, title: 'Diagnosis Struktural', points: ['Mengapa Indonesia masih terjebak dalam middle-income trap setelah dua dekade reformasi?', 'Sektor mana yang paling kritis untuk reindustrialisasi jangka panjang?'] },
      { num: 2, title: 'Peran BUMN & Swasta', points: ['Bagaimana reposisi BUMN sebagai katalis industri, bukan sekadar entitas komersial?', 'Insentif apa yang diperlukan agar sektor swasta besar masuk ke industri berteknologi tinggi?'] },
      { num: 3, title: 'Rantai Nilai Global', points: ['Bagaimana Indonesia bisa naik posisi dalam rantai nilai global yang semakin kompleks?', 'Akuisisi teknologi cukup, atau perlu langsung ke manufaktur komponen kompleks?'] },
    ],
  },
  {
    id: 3,
    badge: 'GANESHA DISKUSI',
    badgeColor: '#0E9E74',
    type: 'Panel',
    day: 'Hari 3',
    time: '09.30 – 11.00',
    coverImage: 'https://picsum.photos/seed/green-rice-paddy-harvest-field/1200/460',
    title: 'Kedaulatan Pangan 2045: Strategi Nasional di Tengah Krisis Iklim dan Geopolitik',
    speakers: speakers.filter(s => s.panelId === 'panel-pangan').map((s, i) => ({
      initials: s.avatar, name: s.name, org: s.position, role: s.category === 'Future Leaders' ? 'future leaders' : s.category.toLowerCase(),
      img: s.img, isModerator: i === 3,
    })),
    discussions: [
      { num: 1, title: 'Kerentanan Sistem Pangan', points: ['Seberapa rentan ketahanan pangan Indonesia terhadap gangguan iklim ekstrem dan konflik geopolitik?', 'Di mana titik lemah terbesar dalam rantai pasok pangan nasional saat ini?'] },
      { num: 2, title: 'Strategi Hulu', points: ['Bagaimana mengembalikan daya tarik sektor pertanian bagi generasi muda produktif?', 'Teknologi pertanian apa yang paling relevan dan scalable untuk petani kecil Indonesia?'] },
      { num: 3, title: 'Politik & Anggaran', points: ['Apakah anggaran pertanian Indonesia sudah mencerminkan urgensi kedaulatan pangan?', 'Bagaimana membangun konsensus politik lintas pemerintahan untuk agenda jangka panjang ini?'] },
    ],
  },
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
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventNum, setSelectedEventNum] = useState<number | null>(null);
  const activeEvent = selectedEventNum !== null ? ganeshaEvents.find(e => e.number === selectedEventNum) ?? null : null;

  const filteredCompanies = businessMatchingCompanies.filter((c) => {
    const matchCat = activeCategory === 'Semua' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

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
        variant="dark"
        photoPlaceholder
        minHeight="60vh"
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

      {/* Rangkaian Acara */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">
            Rangkaian Acara
          </h2>
          <p className="text-sky-blue text-lg max-w-2xl mx-auto">
            10 format kegiatan yang dirancang untuk memaksimalkan dampak—dari panggung utama hingga ruang diskusi intim dan hiburan rakyat.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ganeshaEvents.map((event) => {
            const Icon = event.icon;
            return (
              <motion.button
                key={event.number}
                className="glass-card-dark group hover:border-gold/40 transition-all duration-300 text-left w-full cursor-pointer overflow-hidden flex flex-col"
                variants={itemVariants}
                onClick={() => setSelectedEventNum(event.number)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Image / gradient thumbnail */}
                <div className="relative w-full h-40 shrink-0 overflow-hidden">
                  {event.imageSrc ? (
                    <img src={event.imageSrc} alt={event.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.55) saturate(1.1)' }} />
                  ) : (
                    <div className="w-full h-full" style={{ background: event.gradient }} />
                  )}
                  {/* Overlay gradient — bottom fade */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                  {/* Number badge overlay — bottom left */}
                  <div className="absolute bottom-3 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/30" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
                    {event.number}
                  </div>
                  {/* Type badge overlay — top right */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(0,0,0,0.5)', color: event.accent, backdropFilter: 'blur(6px)', border: `1px solid ${event.accent}40` }}>
                    {event.type}
                  </div>
                  {/* Icon overlay — center */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-pearl-white leading-tight">{event.name}</h3>
                    <ChevronRight className="w-4 h-4 text-gold/40 shrink-0 group-hover:text-gold/80 transition-colors" />
                  </div>
                  <p className="text-pearl-white/65 text-sm leading-relaxed line-clamp-2 mb-3">{event.description}</p>
                  <div className="mt-auto flex items-center gap-1.5 text-xs" style={{ color: event.accent }}>
                    <span>{event.schedule}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* Ganesha Event Detail Modal */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEventNum(null)}
            />

            {/* Modal panel */}
            <motion.div
              className="relative w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl glass-card-dark border border-gold/20"
              style={{ boxShadow: '0 -8px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(192,139,42,0.15)' }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              {/* Hero image */}
              <div className="relative w-full h-52 rounded-t-3xl sm:rounded-t-2xl overflow-hidden">
                {activeEvent.imageSrc ? (
                  <img src={activeEvent.imageSrc} alt={activeEvent.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.5)' }} />
                ) : (
                  <div className="w-full h-full" style={{ background: activeEvent.gradient }} />
                )}
                {/* Gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${activeEvent.accent}22 0%, transparent 60%)` }} />
                {/* Event name overlaid bottom */}
                <div className="absolute bottom-4 left-5 right-14">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: activeEvent.accent }}>{activeEvent.type}</span>
                  <h2 className="text-xl font-black text-white leading-tight mt-0.5" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{activeEvent.name}</h2>
                </div>
                {/* Close button */}
                <button
                  onClick={() => setSelectedEventNum(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 border border-pearl-white/10 text-pearl-white/70 hover:text-pearl-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                {/* Event number badge */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm"
                  style={{ background: `${activeEvent.accent}25`, borderColor: `${activeEvent.accent}60`, color: activeEvent.accent, backdropFilter: 'blur(6px)' }}>
                  {activeEvent.number}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Meta info */}
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="flex items-center gap-3 text-sm text-pearl-white/70">
                    <Calendar className="w-4 h-4 text-gold shrink-0" />
                    <span>{activeEvent.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-pearl-white/70">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span>{activeEvent.room}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-pearl-white/70">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <span>{activeEvent.capacity}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-pearl-white/10 pt-4">
                  <p className="text-pearl-white/80 text-sm leading-relaxed">{activeEvent.description}</p>
                </div>

                {/* Speakers */}
                {activeEvent.hasSpeakers && activeEvent.speakers && (
                  <div className="border-t border-pearl-white/10 pt-4">
                    <p className="text-xs text-gold/80 font-semibold uppercase tracking-wider mb-3">Daftar Pembicara</p>
                    <div className="space-y-2.5">
                      {activeEvent.speakers.map((speaker, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-itb-blue/30 border border-gold/20 flex items-center justify-center">
                            <UserCircle2 className="w-6 h-6 text-gold/50" />
                          </div>
                          <span className="text-sm text-pearl-white/80">{speaker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Business Matching — Ganesha Peluang */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">
            Ganesha Peluang — Business Matching
          </h2>
          <p className="text-sky-blue text-lg max-w-2xl mx-auto">
            Penjajakan investasi dan kemitraan strategis lintas sektor untuk membangun ekosistem industri Indonesia
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pearl-white/40" />
            <input
              type="text"
              placeholder="Cari perusahaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-itb-blue/20 border border-gold/10 rounded-lg text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-gold/40 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {bmCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gold text-deep-navy font-semibold'
                    : 'bg-itb-blue/20 text-pearl-white/70 border border-gold/10 hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-pearl-white/50 text-sm mb-6">
          Menampilkan <span className="text-gold font-semibold">{filteredCompanies.length}</span> perusahaan
        </p>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredCompanies.map((company) => {
            const cfg = bmCategoryConfig[company.category];
            return (
              <motion.div
                key={company.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative overflow-hidden rounded-2xl cursor-default group"
                style={{ background: cfg.gradient, border: `1px solid var(--glass-border)`, borderTop: `3px solid ${cfg.accent}`, boxShadow: `0 2px 8px ${cfg.glow}` }}
              >
                {/* Top gradient bar */}
                

                {/* Glow orb */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
                     style={{ background: `radial-gradient(circle, ${cfg.accent}, transparent 70%)`, transform: 'translate(40%,-40%)' }} />

                <div className="relative p-5">
                  {/* Category badge */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                        style={{ background: cfg.accentSoft, color: cfg.accent, border: `1px solid ${cfg.accent}44` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.accent }} />
                    {cfg.label}
                  </span>

                  {/* Company */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-lg"
                         style={{ background: cfg.avatarGrad }}>
                      {company.abbr}
                    </div>
                    <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                      {company.name}
                    </h3>
                  </div>

                  {/* Schedule info */}
                  <div className="rounded-xl p-3 space-y-2" style={{ background: 'var(--color-bg-secondary)' }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.accent }} />
                      <span>{company.day} · Oktober 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.accent }} />
                      <span>{company.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <Building2 className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.accent }} />
                      <span>{company.room}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-16 text-pearl-white/40">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Tidak ada perusahaan yang sesuai filter.</p>
          </div>
        )}
      </section>

      {/* Agenda */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-4">Agenda</h2>
          <p className="text-sky-blue text-lg max-w-2xl mx-auto">
            Tiga hari penuh gagasan, diskusi, dan kolaborasi untuk masa depan Indonesia
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="min-w-160 grid grid-cols-3 gap-px bg-gold/15 border border-gold/20 rounded-xl overflow-hidden">

            {/* Day Headers */}
            <div className="bg-itb-blue px-4 py-5 text-center">
              <div className="text-gold font-bold text-sm uppercase tracking-widest">Hari 1</div>
              <div className="text-white/80 text-xs mt-1 font-medium">Oktober 2026</div>
            </div>
            <div className="bg-itb-blue px-4 py-5 text-center">
              <div className="text-gold font-bold text-sm uppercase tracking-widest">Hari 2</div>
              <div className="text-white/80 text-xs mt-1 font-medium">Oktober 2026</div>
            </div>
            <div className="bg-itb-blue px-4 py-5 text-center">
              <div className="text-gold font-bold text-sm uppercase tracking-widest">Hari 3</div>
              <div className="text-white/80 text-xs mt-1 font-medium">Oktober 2026</div>
            </div>

            {/* Shared: Pameran */}
            <div className="col-span-3 bg-pearl-white/5 px-6 py-3 text-center border-t border-gold/10">
              <span className="text-white/90 text-sm font-semibold tracking-wide">Pameran Ganesha</span>
            </div>

            {/* Row 1 */}
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Pembukaan</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Upacara Pembukaan</div>
              <div className="text-white/75 text-xs mt-1.5">Ketua Steering Committee & Ketua IA-ITB</div>
            </div>
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Bicara</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Keynote Speech</div>
              <div className="text-white/75 text-xs mt-1.5">Ketua IA-ITB</div>
            </div>
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Diskusi</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Panel Sesi 4 – 6</div>
              <div className="text-white/75 text-xs mt-1.5">Fintech, Kesehatan & Pendidikan</div>
            </div>

            {/* Row 2 */}
            <div className="bg-itb-blue/15 px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Bicara</div>
              <div className="text-pearl-white font-bold text-sm leading-snug">Keynote Speech</div>
              <div className="text-white/75 text-xs mt-1.5">Presiden Republik Indonesia</div>
            </div>
            <div className="bg-itb-blue/15 px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Diskusi</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Panel Sesi 1 – 3</div>
              <div className="text-white/75 text-xs mt-1.5">Reindustrialisasi, Pangan & Energi</div>
            </div>
            <div className="bg-itb-blue/15 px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Peluang</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Business Matchmaking 3 – 4</div>
              <div className="text-white/75 text-xs mt-1.5">Penjajakan investasi & kemitraan</div>
            </div>

            {/* Row 3 */}
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Bicara</div>
              <div className="text-pearl-white font-bold text-sm leading-snug">Keynote Speech</div>
              <div className="text-white/75 text-xs mt-1.5">8 Menteri Kabinet Merah Putih</div>
            </div>
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Berkreasi</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Workshop 1 – 3</div>
              <div className="text-white/75 text-xs mt-1.5">Sesi intensif, kapasitas terbatas</div>
            </div>
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Cari Kerja</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Job Fair</div>
              <div className="text-white/75 text-xs mt-1.5">Booth perusahaan & talkshow karier</div>
            </div>

            {/* Row 4 */}
            <div className="bg-itb-blue/15 px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Berkarya</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Startup Fair</div>
              <div className="text-white/75 text-xs mt-1.5">Inovasi & karya anak bangsa</div>
            </div>
            <div className="bg-itb-blue/15 px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Peluang</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Business Matchmaking 1 – 2</div>
              <div className="text-white/75 text-xs mt-1.5">Penjajakan investasi & kemitraan</div>
            </div>
            <div className="bg-itb-blue/15 px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Pojok Nyaman</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Pojok Nyaman Ganesha</div>
              <div className="text-white/75 text-xs mt-1.5">Baca, diskusi santai & literasi anak</div>
            </div>

            {/* Row 5 */}
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha PechaKucha</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Pitching Forum</div>
              <div className="text-white/75 text-xs mt-1.5">Presentasi 6 menit 40 detik</div>
            </div>
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Ganesha Berkreasi</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Workshop 4 – 6</div>
              <div className="text-white/75 text-xs mt-1.5">Sesi intensif, kapasitas terbatas</div>
            </div>
            <div className="bg-deep-navy px-4 py-5">
              <div className="text-xs text-gold/70 font-semibold uppercase tracking-wider mb-1.5">Pesta Rakyat</div>
              <div className="text-pearl-white font-semibold text-sm leading-snug">Pesta Rakyat Ganesha</div>
              <div className="text-white/75 text-xs mt-1.5">Konser seni, kuliner & perlombaan</div>
            </div>

            {/* Closing Row */}
            <div className="bg-itb-blue/10 px-4 py-3" />
            <div className="bg-itb-blue/10 px-4 py-3" />
            <div className="bg-itb-blue px-4 py-4 text-center">
              <div className="text-gold font-bold text-sm">Upacara Penutupan</div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Panel Sessions */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-3">Sesi Unggulan</h2>
          <p className="text-sky-blue text-lg">Keynote dan panel diskusi strategis bersama tokoh nasional</p>
        </motion.div>

        <div className="space-y-6">
          {panelSessions.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${session.badgeColor}35`, background: 'var(--color-bg-card)' }}
            >
              {/* ── Hero image with overlaid title ── */}
              <div className="relative h-52 sm:h-64 overflow-hidden">
                {/* Background image */}
                <img
                  src={(session as typeof session & { coverImage: string }).coverImage}
                  alt={session.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.65) saturate(1.15)' }}
                />
                {/* Gradient: left dark fade */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,9,26,0.82) 0%, rgba(5,9,26,0.40) 55%, rgba(5,9,26,0.10) 100%)' }} />
                {/* Gradient: bottom fade to card bg */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,9,26,0.88) 0%, rgba(5,9,26,0.25) 50%, transparent 70%)' }} />

                {/* Top-left: badge + type */}
                <div className="absolute top-4 left-5 flex items-center gap-2.5">
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
                    style={{ background: session.badgeColor + '25', color: session.badgeColor, border: `1.5px solid ${session.badgeColor}60` }}>
                    {session.badge}
                  </span>
                  <span className="px-2.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    {session.type}
                  </span>
                </div>

                {/* Top-right: day + time */}
                <div className="absolute top-4 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Clock className="w-3 h-3" style={{ color: session.badgeColor }} />
                  <span className="text-[11px] font-semibold text-pearl-white/80">{session.day} · {session.time}</span>
                </div>

                {/* Bottom: session title */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
                    {session.title}
                  </h3>
                </div>

                {/* Accent bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${session.badgeColor}, transparent 60%)` }} />
              </div>

              {/* ── Session body ── */}
              <div className="grid md:grid-cols-[2fr_3fr]" style={{ borderTop: '1px solid var(--glass-border)' }}>
                {/* Left: speakers */}
                <div className="p-6 pt-5" style={{ borderRight: '1px solid var(--glass-border)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: session.badgeColor }}>
                    Pembicara
                  </p>
                  <div className="space-y-4">
                    {session.speakers.map((sp, si) => {
                      const rc = roleConfig[sp.role] ?? roleConfig['akademisi'];
                      return (
                        <div key={si} className="flex items-center gap-3">
                          {/* Photo */}
                          <div className="relative shrink-0">
                            <img
                              src={sp.img}
                              alt={sp.name}
                              className="w-12 h-12 rounded-full object-cover"
                              style={{ border: `2px solid ${rc.color}55` }}
                            />
                            <span
                              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                              style={{ background: rc.bg, color: rc.color, border: `1px solid ${rc.color}44` }}
                            >
                              {sp.isModerator ? 'MODERATOR' : rc.label.toUpperCase()}
                            </span>
                          </div>
                          {/* Info */}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-tight truncate" style={{ color: 'var(--color-text-primary)' }}>{sp.name}</p>
                            <p className="text-xs leading-tight truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{sp.org}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: key discussions */}
                <div className="p-6 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-4"
                     style={{ color: session.badgeColor }}>Key Discussions</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {session.discussions.map((disc) => (
                      <div key={disc.num}
                           className="relative rounded-xl p-4 overflow-hidden"
                           style={{ background: 'var(--color-bg-primary)', border: `1px solid ${session.badgeColor}30` }}>
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                          style={{ background: `linear-gradient(90deg, ${session.badgeColor}, transparent)` }} />
                        {/* Number + title */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0"
                            style={{ background: `linear-gradient(135deg, ${session.badgeColor}, ${session.badgeColor}bb)`, color: '#fff' }}>
                            {disc.num}
                          </span>
                          <span className="text-xs font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>{disc.title}</span>
                        </div>
                        {/* Discussion points */}
                        <div className="space-y-2">
                          {disc.points.map((pt, pi) => (
                            <div key={pi} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: session.badgeColor }} />
                              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{pt}</p>
                            </div>
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
