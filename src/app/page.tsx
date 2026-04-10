'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield, Cpu, Factory, Leaf, Globe, Users,
  ChevronDown, ArrowRight, Zap, Target, TrendingUp,
  Building2, Lightbulb, GraduationCap, Calendar,
  MapPin, Star, Award, Rocket, Send,
  Gem, Droplets, Wifi, Swords, HeartPulse,
  Palette, Landmark, ChevronRight, ChevronLeft, X,
  BarChart3, Battery, Wheat, BrainCircuit, UserCircle2,
  FileDown, BookOpen,
  Sprout, Tractor, Package, Cloud, Fish,
  Flame, Sun, Network, Plane, Anchor, Satellite,
  Server, Database, Pill, Dna, Stethoscope, Activity,
  Wrench, Radar, Waves, Microscope, Atom
} from 'lucide-react';
import { useLang } from '@/components/providers/LanguageProvider';
import CardModal from '@/components/CardModal';
import { HeroBG } from '@/components/shared/HeroBG';
import CounterAnimation from '@/components/ui/CounterAnimation';

/* ═══ Summit Date Constant ═══ */
const SUMMIT_DATE = new Date('2026-10-15T09:00:00+07:00');

/* ═══ Countdown Hook ═══ */
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

/* ═══ Rich Data: 6 Strategic Pillars ═══ */
const pillars = [
  {
    icon: Shield,
    title: 'Ketahanan Nasional',
    titleEn: 'National Resilience',
    quote: 'Membangun Benteng Ekonomi yang Tak Tergoyahkan oleh Gejolak Global',
    quoteEn: 'Building an Economic Fortress Unshaken by Global Turbulence',
    desc: 'Memperkuat fondasi keamanan pangan, energi, dan pertahanan negara sebagai dasar kedaulatan bangsa.',
    descEn: 'Strengthening food security, energy, and national defense foundations as the basis of sovereignty.',
    details: [
      'Swasembada pangan strategis: beras, jagung, kedelai, gula',
      'Keamanan energi nasional melalui diversifikasi sumber',
      'Penguatan rantai pasok domestik untuk mengurangi ketergantungan impor',
      'Ketahanan terhadap gejolak ekonomi global dan fragmentasi rantai pasok',
    ],
    detailsEn: [
      'Strategic food self-sufficiency: rice, corn, soybean, sugar',
      'National energy security through source diversification',
      'Strengthening domestic supply chains to reduce import dependency',
      'Resilience against global economic shocks and supply chain fragmentation',
    ],
    color: '#EF4444',
    relatedSectors: ['Kedaulatan Pangan', 'Energi', 'Pertahanan'],
  },
  {
    icon: Cpu,
    title: 'Kedaulatan Ekonomi & Teknologi',
    titleEn: 'Economic & Tech Sovereignty',
    quote: 'Menguasai Teknologi Kunci agar Bangsa Tak Menjadi Penonton di Negeri Sendiri',
    quoteEn: 'Mastering Key Technologies So the Nation Doesn\'t Become a Spectator in Its Own Land',
    desc: 'Membangun kemandirian teknologi dan ekonomi digital Indonesia melalui penguasaan AI, semikonduktor, dan platform digital.',
    descEn: 'Building Indonesia\'s tech and digital economy independence through AI, semiconductors, and digital platforms.',
    details: [
      'Konsorsium AI Nasional untuk pengembangan Large Language Model lokal',
      'Inisiasi industri semikonduktor dan desain sirkuit terpadu (IC)',
      'Pusat Data Nasional Berdaulat yang aman dan independen',
      'Penetrasi serat optik 80% kecamatan (Giga City initiative)',
      'AI untuk efisiensi penerimaan negara dan layanan publik',
    ],
    detailsEn: [
      'National AI Consortium for local Large Language Model development',
      'Semiconductor industry initiation and integrated circuit (IC) design',
      'Sovereign National Data Center that is secure and independent',
      '80% fiber optic penetration across subdistricts (Giga City initiative)',
      'AI for government revenue efficiency and public services',
    ],
    color: '#3B82F6',
    relatedSectors: ['Digital & AI', 'Manufaktur', 'SDM & Riset'],
  },
  {
    icon: Factory,
    title: 'Kemandirian Struktural',
    titleEn: 'Structural Independence',
    quote: 'Dari Bangsa Pengekspor Bahan Mentah Menjadi Bangsa Pencipta Nilai Tambah',
    quoteEn: 'From a Raw Material Exporter to a Value-Creating Nation',
    desc: 'Reindustrialisasi dan penguatan rantai pasok industri nasional untuk mengatasi deindustrialisasi prematur.',
    descEn: 'Reindustrialization and strengthening national supply chains to overcome premature deindustrialization.',
    details: [
      'Target kontribusi manufaktur kembali ke >25% PDB (dari 19% saat ini)',
      'Integrasi rantai pasok nikel dari hulu ke baterai EV',
      'Revitalisasi industri mesin perkakas domestik',
      'Penguatan TKDN ketat di seluruh proyek strategis negara',
      'Hilirisasi mineral kritis: nikel, tembaga, bauksit, Logam Tanah Jarang',
    ],
    detailsEn: [
      'Target manufacturing contribution back to >25% GDP (from current 19%)',
      'Nickel supply chain integration from upstream to EV batteries',
      'Domestic machine tool industry revitalization',
      'Strict local content (TKDN) enforcement across strategic projects',
      'Critical mineral downstream: nickel, copper, bauxite, Rare Earth Elements',
    ],
    color: '#8B5CF6',
    relatedSectors: ['Hilirisasi Mineral', 'Manufaktur', 'Infrastruktur'],
  },
  {
    icon: Leaf,
    title: 'Keberlanjutan',
    titleEn: 'Sustainability',
    quote: 'Pertumbuhan yang Mewariskan Kemakmuran, Bukan Kerusakan',
    quoteEn: 'Growth that Bequeaths Prosperity, Not Destruction',
    desc: 'Pertumbuhan ekonomi yang harmonis dengan pelestarian lingkungan dan keadilan antargenerasi.',
    descEn: 'Economic growth in harmony with environmental preservation and intergenerational justice.',
    details: [
      'Pembangunan bursa karbon domestik dengan rekognisi global (potensi USD 100B+)',
      'Hilirisasi industri pengolahan sampah (Waste-to-Energy)',
      'Sertifikasi keberlanjutan untuk akses pasar ekspor (EU CBAM 2026)',
      'Mandatori B50-B100 biofuel berbasis kelapa sawit',
      'Implementasi smart grid nasional untuk energi terbarukan',
    ],
    detailsEn: [
      'Building domestic carbon exchange with global recognition (potential USD 100B+)',
      'Waste-to-Energy industry downstream processing',
      'Sustainability certification for export market access (EU CBAM 2026)',
      'B50-B100 palm oil-based biofuel mandate',
      'National smart grid implementation for renewable energy',
    ],
    color: '#10B981',
    relatedSectors: ['Energi Terbarukan', 'Ekonomi Hijau', 'Infrastruktur'],
  },
  {
    icon: Globe,
    title: 'Daya Saing Global',
    titleEn: 'Global Competitiveness',
    quote: 'Jika Ingin Bersinergi Secara Setara, Bersiaplah untuk Berkompetisi',
    quoteEn: 'If You Want to Synergize as Equals, Be Prepared to Compete',
    desc: 'Meningkatkan posisi Indonesia di pasar dan supply chain global dengan produk bernilai tinggi.',
    descEn: 'Elevating Indonesia\'s position in global markets and supply chains with high-value products.',
    details: [
      'Ekosistem baterai EV terintegrasi hulu ke hilir (potensi investasi USD 545B hingga 2040)',
      'Nation branding "Indonesianisme" untuk penetrasi pasar ritel global',
      'Produksi massal pesawat N219 untuk konektivitas dan prestise nasional',
      'Penurunan biaya logistik dari 23-25% PDB ke target 15%',
      'Integrasi transportasi logistik multimodal',
    ],
    detailsEn: [
      'Integrated upstream-downstream EV battery ecosystem (investment potential USD 545B by 2040)',
      'Nation branding "Indonesianisme" for global retail market penetration',
      'N219 aircraft mass production for connectivity and national prestige',
      'Logistics cost reduction from 23-25% GDP to target 15%',
      'Multimodal logistics transportation integration',
    ],
    color: '#F59E0B',
    relatedSectors: ['Industri Kreatif', 'Infrastruktur', 'Manufaktur'],
  },
  {
    icon: Users,
    title: 'Pengentasan Kesenjangan',
    titleEn: 'Inequality Reduction',
    quote: 'Pertumbuhan yang Tidak Meninggalkan Siapa Pun',
    quoteEn: 'Growth That Leaves No One Behind',
    desc: 'Memastikan pertumbuhan ekonomi bermanfaat bagi seluruh rakyat, dari Sabang sampai Merauke.',
    descEn: 'Ensuring economic growth benefits all citizens, from Sabang to Merauke.',
    details: [
      'Porsi kelas menengah menyusut dari 21.4% (2019) ke 17.3% (2024) — harus dipulihkan',
      'Revitalisasi SMK dan Politeknik untuk kesiapan Industri 4.0',
      'Program reverse brain drain untuk menarik talenta kembali',
      'Beasiswa strategis bidang AI, nuklir, dan dirgantara',
      'ITB Industrial Clinic: konsultasi gratis untuk UMKM manufaktur',
    ],
    detailsEn: [
      'Middle class share shrank from 21.4% (2019) to 17.3% (2024) — must be restored',
      'Vocational school and polytechnic revitalization for Industry 4.0 readiness',
      'Aggressive reverse brain drain program to attract talent back',
      'Strategic scholarships in AI, nuclear, and aerospace fields',
      'ITB Industrial Clinic: free consultation for manufacturing SMEs',
    ],
    color: '#14B8A6',
    relatedSectors: ['SDM & Riset', 'Pendidikan', 'Ekonomi Kreatif'],
  },
];

/* ═══ Rich Data: 8 Priority Sectors ═══ */
const sectors = [
  {
    icon: Zap,
    name: 'Energi & Transisi Energi',
    nameEn: 'Energy & Energy Transition',
    color: '#F59E0B',
    keyData: 'Geotermal 40% cadangan dunia',
    keyDataEn: '40% of world geothermal reserves',
    desc: 'Memastikan pasokan energi hijau yang terjangkau untuk kebangkitan manufaktur.',
    descEn: 'Ensuring affordable green energy supply for manufacturing revival.',
    ideas: [
      { id: 6, title: 'Pembangunan Kapasitas 100 GW PLTS', titleEn: '100 GW Solar Power Capacity', role: 'Backbone' },
      { id: 7, title: 'Optimalisasi Panas Bumi Sebagai Baseload Hijau', titleEn: 'Geothermal Optimization as Green Baseload', role: 'Defensive' },
      { id: 8, title: 'Mandatori B50-B100 Berbasis Kelapa Sawit', titleEn: 'B50-B100 Palm Oil-Based Biofuel Mandate', role: 'Defensive' },
      { id: 9, title: 'Virtual Gas Pipeline (Small LNG & ISO Tank)', titleEn: 'Virtual Gas Pipeline (Small LNG & ISO Tank)', role: 'Backbone' },
      { id: 10, title: 'Implementasi Smart Grid Nasional', titleEn: 'National Smart Grid Implementation', role: 'Backbone' },
    ],
  },
  {
    icon: Factory,
    name: 'Reindustrialisasi & Manufaktur',
    nameEn: 'Reindustrialization & Manufacturing',
    color: '#8B5CF6',
    keyData: 'Target manufaktur >25% PDB',
    keyDataEn: 'Target manufacturing >25% GDP',
    desc: 'Mengatasi hollow middle struktur industri dan mengembalikan kejayaan manufaktur.',
    descEn: 'Addressing the hollow middle of industrial structure and restoring manufacturing glory.',
    ideas: [
      { id: 31, title: 'Revitalisasi Industri Mesin Perkakas', titleEn: 'Machine Tool Industry Revitalization', role: 'Defensive' },
      { id: 32, title: 'Ekosistem Komponen Otomotif untuk EV', titleEn: 'Automotive Components Ecosystem for EV', role: 'Offensive' },
      { id: 33, title: 'Produksi Alat Mekanisasi Pertanian', titleEn: 'Agricultural Mechanization Equipment Production', role: 'Defensive' },
      { id: 34, title: 'Inisiasi Industri Semikonduktor Nasional', titleEn: 'National Semiconductor Industry Initiation', role: 'Image Leading' },
      { id: 35, title: 'Pusat Manufaktur Canggih Universitas', titleEn: 'University Advanced Manufacturing Centers', role: 'Backbone' },
    ],
  },
  {
    icon: Gem,
    name: 'Hilirisasi Mineral Strategis',
    nameEn: 'Strategic Mineral Downstream',
    color: '#EC4899',
    keyData: 'Investasi EV: USD 545B hingga 2040',
    keyDataEn: 'EV Investment: USD 545B by 2040',
    desc: 'Mengubah orientasi dari ekspor bahan mentah menjadi produk akhir bernilai tinggi.',
    descEn: 'Shifting from raw material exports to high-value finished products.',
    ideas: [
      { id: 1, title: 'Integrasi Rantai Pasok Nikel', titleEn: 'Nickel Supply Chain Integration', role: 'Offensive' },
      { id: 2, title: 'Penguasaan Teknologi Logam Tanah Jarang', titleEn: 'Rare Earth Elements Technology Mastery', role: 'Image Leading' },
      { id: 3, title: 'Standardisasi Produk Aluminium & Tembaga', titleEn: 'Aluminum & Copper Product Standardization', role: 'Defensive' },
      { id: 4, title: 'Insentif R&D Pengolahan Mineral Kritis', titleEn: 'Critical Mineral Processing R&D Incentives', role: 'Backbone' },
      { id: 5, title: 'Penataan Zonasi Kawasan Industri Hijau', titleEn: 'Green Industrial Zone Planning', role: 'Defensive' },
    ],
  },
  {
    icon: Wheat,
    name: 'Kedaulatan Pangan & Air',
    nameEn: 'Food & Water Sovereignty',
    color: '#22C55E',
    keyData: 'Impor gandum 100%, kedelai 97%',
    keyDataEn: 'Wheat import 100%, soybean 97%',
    desc: 'Mencapai swasembada pangan penuh dan modernisasi pertanian berskala masif.',
    descEn: 'Achieving full food self-sufficiency and massive-scale agricultural modernization.',
    ideas: [
      { id: 11, title: 'Ekspansi Lahan Panen 4 Juta Hektare', titleEn: '4 Million Hectare Harvest Land Expansion', role: 'Defensive' },
      { id: 12, title: 'Industrialisasi Sektor Kelautan', titleEn: 'Maritime Sector Industrialization', role: 'Offensive' },
      { id: 13, title: 'Pengembangan Benih Unggul Bioteknologi', titleEn: 'Biotech Superior Seed Development', role: 'Defensive' },
      { id: 14, title: 'Penguatan Logistik Rantai Dingin Solar', titleEn: 'Solar-Powered Cold Chain Logistics', role: 'Backbone' },
      { id: 15, title: 'Pemanfaatan AI Peringatan Dini Pertanian', titleEn: 'AI-Powered Agricultural Early Warning', role: 'Defensive' },
    ],
  },
  {
    icon: BrainCircuit,
    name: 'AI & Ekonomi Digital',
    nameEn: 'AI & Digital Economy',
    color: '#3B82F6',
    keyData: 'GMV USD 100B+, defisit 600K talent AI',
    keyDataEn: 'GMV USD 100B+, deficit 600K AI talent',
    desc: 'Mengamankan kedaulatan di era kecerdasan buatan dan memonetisasi aset ekologis.',
    descEn: 'Securing sovereignty in the AI era and monetizing ecological assets.',
    ideas: [
      { id: 16, title: 'Penetrasi Serat Optik 80% Kecamatan', titleEn: '80% Subdistrict Fiber Optic Penetration', role: 'Backbone' },
      { id: 17, title: 'Pusat Data Nasional Berdaulat', titleEn: 'Sovereign National Data Center', role: 'Backbone' },
      { id: 18, title: 'AI untuk Efisiensi Penerimaan Negara', titleEn: 'AI for Government Revenue Efficiency', role: 'Backbone' },
      { id: 19, title: 'AI Skrining Kesehatan Massal', titleEn: 'AI Mass Health Screening', role: 'Defensive' },
      { id: 20, title: 'Konsorsium AI Nasional untuk LLM Lokal', titleEn: 'National AI Consortium for Local LLM', role: 'Image Leading' },
    ],
  },
  {
    icon: Leaf,
    name: 'Ekonomi Hijau & Keberlanjutan',
    nameEn: 'Green Economy & Sustainability',
    color: '#10B981',
    keyData: 'Kredit karbon: USD 100B+',
    keyDataEn: 'Carbon credits: USD 100B+',
    desc: 'Monetisasi aset ekologis dan membangun industri berkelanjutan menghadapi CBAM EU 2026.',
    descEn: 'Monetizing ecological assets and building sustainable industry facing EU CBAM 2026.',
    ideas: [
      { id: 46, title: 'Bursa Karbon Domestik Rekognisi Global', titleEn: 'Globally Recognized Domestic Carbon Exchange', role: 'Offensive' },
      { id: 47, title: 'Hilirisasi Waste-to-Energy', titleEn: 'Waste-to-Energy Downstream', role: 'Backbone' },
      { id: 48, title: 'Sertifikasi Keberlanjutan Ekspor', titleEn: 'Export Sustainability Certification', role: 'Defensive' },
      { id: 49, title: 'Biodiversitas sebagai Aset Produktif', titleEn: 'Biodiversity as Productive Asset', role: 'Offensive' },
      { id: 50, title: 'Green Bond & Blended Finance Framework', titleEn: 'Green Bond & Blended Finance Framework', role: 'Backbone' },
    ],
  },
  {
    icon: Target,
    name: 'Infrastruktur & Konektivitas',
    nameEn: 'Infrastructure & Connectivity',
    color: '#F97316',
    keyData: 'Logistik 23-25% PDB → target 15%',
    keyDataEn: 'Logistics 23-25% GDP → target 15%',
    desc: 'Menurunkan biaya logistik secara drastis dan membangun konektivitas antarwilayah.',
    descEn: 'Drastically reducing logistics costs and building inter-regional connectivity.',
    ideas: [
      { id: 51, title: 'Integrasi Transportasi Logistik Multimodal', titleEn: 'Multimodal Logistics Transportation Integration', role: 'Backbone' },
      { id: 52, title: 'Pemerataan Palapa Ring & Giga City', titleEn: 'Palapa Ring & Giga City Equalization', role: 'Backbone' },
      { id: 53, title: 'IKN sebagai Smart City Blueprint', titleEn: 'IKN as Smart City Blueprint', role: 'Image Leading' },
      { id: 54, title: 'Pelabuhan Hub Internasional Strategis', titleEn: 'Strategic International Hub Ports', role: 'Offensive' },
      { id: 55, title: 'Elektrifikasi Transportasi Publik', titleEn: 'Public Transportation Electrification', role: 'Defensive' },
    ],
  },
  {
    icon: GraduationCap,
    name: 'SDM & Pendidikan Teknik',
    nameEn: 'HR & Technical Education',
    color: '#6366F1',
    keyData: 'Reverse brain drain & 600K AI talent gap',
    keyDataEn: 'Reverse brain drain & 600K AI talent gap',
    desc: 'Mencetak talenta engineer bertaraf global dan menghubungkan riset dengan industri.',
    descEn: 'Producing world-class engineer talent and connecting research with industry.',
    ideas: [
      { id: 41, title: 'Implementasi Akreditasi IABEE', titleEn: 'IABEE Accreditation Implementation', role: 'Backbone' },
      { id: 42, title: 'Program Matching Fund Riset Industri', titleEn: 'Industry Research Matching Fund Program', role: 'Backbone' },
      { id: 43, title: 'Revitalisasi SMK & Politeknik', titleEn: 'Vocational School & Polytechnic Revitalization', role: 'Backbone' },
      { id: 44, title: 'Modal Ventura Alumni ITB', titleEn: 'ITB Alumni Venture Capital', role: 'Backbone' },
      { id: 45, title: 'Beasiswa Strategis AI, Nuklir, Dirgantara', titleEn: 'Strategic AI, Nuclear, Aerospace Scholarships', role: 'Backbone' },
    ],
  },
];

/* ═══ Rich Data: 8 Supporting Sectors ═══ */
const supportingSectors = [
  {
    icon: Swords,
    name: 'Pertahanan & Alutsista',
    nameEn: 'Defense & Military Equipment',
    color: '#64748B',
    keyData: 'TKDN alutsista meningkat',
    keyDataEn: 'Defense TKDN increasing',
    ideas: [
      { id: 21, title: 'Produksi Massal Pesawat N219', titleEn: 'N219 Aircraft Mass Production', role: 'Image Leading' },
      { id: 22, title: 'Medium Tank Harimau & Kendaraan Taktis Ekspor', titleEn: 'Harimau Medium Tank & Tactical Vehicle Export', role: 'Offensive' },
      { id: 23, title: 'Teknologi Kapal Selam & Fregat via ToT', titleEn: 'Submarine & Frigate Tech via ToT', role: 'Image Leading' },
      { id: 24, title: 'Satelit Mikro Komunikasi Militer', titleEn: 'Military Communication Microsatellites', role: 'Image Leading' },
      { id: 25, title: 'Peningkatan TKDN Alutsista', titleEn: 'Defense Equipment TKDN Increase', role: 'Defensive' },
    ],
  },
  {
    icon: HeartPulse,
    name: 'Kesehatan & Farmasi',
    nameEn: 'Health & Pharmaceuticals',
    color: '#EF4444',
    keyData: 'Kemandirian farmasi nasional',
    keyDataEn: 'National pharmaceutical independence',
    ideas: [
      { id: 26, title: 'Pabrik Fraksionasi Plasma Darah', titleEn: 'Blood Plasma Fractionation Plant', role: 'Defensive' },
      { id: 27, title: 'Hilirisasi Fitofarmaka Global', titleEn: 'Global Phytopharmaca Downstream', role: 'Offensive' },
      { id: 28, title: 'Mandatori Alkes Lokal dalam JKN', titleEn: 'Local Medical Devices Mandate in JKN', role: 'Defensive' },
      { id: 29, title: 'Vaksin Nasional mRNA & Bioteknologi', titleEn: 'National mRNA & Biotech Vaccines', role: 'Image Leading' },
      { id: 30, title: 'Digitalisasi Rekam Medis Nasional', titleEn: 'National Digital Medical Records', role: 'Backbone' },
    ],
  },
  {
    icon: Palette,
    name: 'Industri Kreatif & Branding',
    nameEn: 'Creative Industry & Branding',
    color: '#D946EF',
    keyData: 'Nation branding global',
    keyDataEn: 'Global nation branding',
    ideas: [
      { id: 36, title: 'Nation Branding Indonesianisme Global', titleEn: 'Indonesianisme Global Nation Branding', role: 'Offensive' },
      { id: 37, title: 'Transformasi Fashion Merek Sendiri', titleEn: 'Own-Brand Fashion Transformation', role: 'Offensive' },
      { id: 38, title: 'Digitalisasi Pemasaran Kriya & Furnitur', titleEn: 'Craft & Furniture Digital Marketing', role: 'Offensive' },
      { id: 39, title: 'Pariwisata Berbasis Pengalaman', titleEn: 'Experience-Based Tourism', role: 'Offensive' },
      { id: 40, title: 'Pelindungan HAKI Agresif', titleEn: 'Aggressive IP Protection', role: 'Backbone' },
    ],
  },
  {
    icon: Landmark,
    name: 'Danantara & SWF',
    nameEn: 'Danantara & Sovereign Wealth',
    color: '#F59E0B',
    keyData: 'Konsolidasi aset USD 900B',
    keyDataEn: 'Asset consolidation USD 900B',
    ideas: [
      { id: 46, title: 'Konsolidasi Aset BUMN di Danantara', titleEn: 'BUMN Asset Consolidation under Danantara', role: 'Backbone' },
      { id: 47, title: 'Sekuritisasi Aset Negara Produktif', titleEn: 'Productive State Asset Securitization', role: 'Backbone' },
      { id: 48, title: 'Kemitraan Dana Abadi Global', titleEn: 'Global Endowment Fund Partnership', role: 'Offensive' },
      { id: 49, title: 'Restrukturisasi BUMN Merugi', titleEn: 'Loss-Making BUMN Restructuring', role: 'Backbone' },
      { id: 50, title: 'Danantara Penjamin Investasi Teknologi', titleEn: 'Danantara as Tech Investment Guarantor', role: 'Backbone' },
    ],
  },
  {
    icon: Droplets,
    name: 'Lingkungan & Air',
    nameEn: 'Environment & Water',
    color: '#06B6D4',
    keyData: 'Restorasi DAS & desalinasi',
    keyDataEn: 'Watershed restoration & desalination',
    ideas: [
      { id: 56, title: 'Bendungan Multifungsi Air & Listrik', titleEn: 'Multipurpose Water & Power Dams', role: 'Defensive' },
      { id: 57, title: 'Desalinasi Air Laut Efisien', titleEn: 'Efficient Seawater Desalination', role: 'Defensive' },
      { id: 58, title: 'Rehabilitasi DAS Kritis dengan AI', titleEn: 'AI-Based Critical Watershed Rehabilitation', role: 'Defensive' },
      { id: 59, title: 'Pemantauan Kualitas Air Real-time', titleEn: 'Real-time Water Quality Monitoring', role: 'Backbone' },
      { id: 60, title: 'Konservasi Keanekaragaman Hayati', titleEn: 'Biodiversity Conservation', role: 'Defensive' },
    ],
  },
  {
    icon: Battery,
    name: 'Sampah & Ekonomi Sirkular',
    nameEn: 'Waste & Circular Economy',
    color: '#84CC16',
    keyData: 'PSEL 12 kota besar',
    keyDataEn: 'Waste-to-Energy 12 major cities',
    ideas: [
      { id: 61, title: 'Fasilitas PSEL Waste-to-Energy', titleEn: 'Waste-to-Energy PSEL Facilities', role: 'Defensive' },
      { id: 62, title: 'Industri Daur Ulang Plastik', titleEn: 'Plastic Recycling Industry', role: 'Defensive' },
      { id: 63, title: 'Bioplastik Berbasis Singkong', titleEn: 'Cassava-Based Bioplastics', role: 'Defensive' },
      { id: 64, title: 'Kawasan Ekonomi Sirkular Terpadu', titleEn: 'Integrated Circular Economy Zones', role: 'Defensive' },
      { id: 65, title: 'Sampah Organik Menjadi Pupuk Cair', titleEn: 'Organic Waste to Liquid Fertilizer', role: 'Defensive' },
    ],
  },
  {
    icon: Wifi,
    name: 'Keuangan Digital',
    nameEn: 'Digital Finance',
    color: '#0EA5E9',
    keyData: 'Inklusi keuangan pelosok',
    keyDataEn: 'Rural financial inclusion',
    ideas: [
      { id: 66, title: 'Perbankan Digital hingga Pelosok', titleEn: 'Digital Banking to Rural Areas', role: 'Backbone' },
      { id: 67, title: 'Platform Pembiayaan Rantai Pasok BUMN', titleEn: 'BUMN Supply Chain Financing Platform', role: 'Backbone' },
      { id: 68, title: 'Blockchain Transparansi Subsidi Energi', titleEn: 'Blockchain for Energy Subsidy Transparency', role: 'Backbone' },
      { id: 69, title: 'Asuransi Nasional Aset Strategis', titleEn: 'National Strategic Asset Insurance', role: 'Backbone' },
      { id: 70, title: 'Bursa Karbon Nasional', titleEn: 'National Carbon Exchange', role: 'Offensive' },
    ],
  },
  {
    icon: Building2,
    name: 'Tata Kelola & UMKM',
    nameEn: 'Governance & SMEs',
    color: '#8B5CF6',
    keyData: 'Deregulasi & digitalisasi',
    keyDataEn: 'Deregulation & digitalization',
    ideas: [
      { id: 71, title: 'Satu Data Indonesia', titleEn: 'One Data Indonesia', role: 'Backbone' },
      { id: 72, title: 'Deregulasi Aturan Tumpang Tindih', titleEn: 'Overlapping Regulation Deregulation', role: 'Backbone' },
      { id: 73, title: 'AI Pengawasan Anggaran Anti-Korupsi', titleEn: 'AI Anti-Corruption Budget Oversight', role: 'Backbone' },
      { id: 76, title: 'Hilirisasi Produk Unggulan Daerah', titleEn: 'Regional Product Downstream Processing', role: 'Offensive' },
      { id: 78, title: 'KEK Berbasis Potensi Lokal', titleEn: 'Local Potential-Based Special Economic Zones', role: 'Offensive' },
    ],
  },
];

/* ═══ Data: Key Deliverables ═══ */
const deliverables = [
  { icon: '📖', title: 'Buku Putih Industrialisasi', titleEn: 'White Paper on Industrialization', spec: '300-400 halaman', specEn: '300-400 pages', timeline: 'Bulan 12' },
  { icon: '📋', title: '80 Policy Brief', titleEn: '80 Policy Briefs', spec: '2.000-3.000 kata/brief', specEn: '2,000-3,000 words/brief', timeline: 'Bulan 3-9' },
  { icon: '📊', title: '16 Kajian Sektoral', titleEn: '16 Sectoral Studies', spec: '10-15 halaman/sektor', specEn: '10-15 pages/sector', timeline: 'Bulan 3-6' },
  { icon: '🎙️', title: '24 Episode Podcast', titleEn: '24 Podcast Episodes', spec: 'Spotify, YouTube, Apple', specEn: 'Spotify, YouTube, Apple', timeline: 'Bulan 6-12' },
  { icon: '🎬', title: '8 Mini-Documentary', titleEn: '8 Mini-Documentaries', spec: '10-15 menit/video', specEn: '10-15 min/video', timeline: 'Bulan 7-10' },
  { icon: '📰', title: '20+ Artikel Opini', titleEn: '20+ Opinion Articles', spec: 'JP, Kompas, Bisnis Indonesia', specEn: 'JP, Kompas, Bisnis Indonesia', timeline: 'Bulan 2-10' },
];

/* ═══ Data: Penta-Helix Stakeholders ═══ */
const stakeholderPillars = [
  { icon: Landmark, title: 'Pemerintah', titleEn: 'Government', color: '#3B82F6', desc: 'Industrial policy yang koheren, procurement sebagai instrumen reindustrialisasi', descEn: 'Coherent industrial policy, procurement as reindustrialization instrument' },
  { icon: GraduationCap, title: 'Akademisi', titleEn: 'Academia', color: '#8B5CF6', desc: 'Reorientasi riset dari publish-oriented ke impact-oriented, kolaborasi universitas-industri', descEn: 'Reorienting research from publish-oriented to impact-oriented, university-industry collaboration' },
  { icon: Building2, title: 'Swasta', titleEn: 'Private Sector', color: '#10B981', desc: 'Investasi di manufaktur bernilai tambah, membangun merek nasional bersaing global', descEn: 'Investing in value-added manufacturing, building globally competitive national brands' },
  { icon: Users, title: 'Masyarakat Sipil', titleEn: 'Civil Society', color: '#F59E0B', desc: 'Mendorong gerakan Indonesianisme, mengawal transparansi dan akuntabilitas', descEn: 'Driving the Indonesianisme movement, ensuring transparency and accountability' },
  { icon: Send, title: 'Media', titleEn: 'Media', color: '#EC4899', desc: 'Mengangkat narasi positif industri nasional, mempromosikan profesi engineer', descEn: 'Elevating positive national industry narratives, promoting engineering profession' },
];

/* ═══ Data: Operational Roadmap 4 Phases ═══ */
const operationalRoadmap = [
  {
    phase: 1,
    title: 'Riset & Pemetaan',
    titleEn: 'Research & Mapping',
    period: 'Bulan 1–3',
    periodEn: 'Month 1–3',
    color: '#3B82F6',
    items: [
      'Pemetaan 80 gagasan strategis',
      'Identifikasi narasumber kunci per sektor',
      'Pengembangan kerangka analitis (VRIO, BODI, VUCA)',
      'Riset komparatif negara benchmark',
    ],
    itemsEn: [
      'Mapping 80 strategic ideas',
      'Identifying key resource persons per sector',
      'Developing analytical frameworks (VRIO, BODI, VUCA)',
      'Comparative research on benchmark countries',
    ],
  },
  {
    phase: 2,
    title: 'Produksi Konten',
    titleEn: 'Content Production',
    period: 'Bulan 3–6',
    periodEn: 'Month 3–6',
    color: '#8B5CF6',
    items: [
      'Penulisan 80 policy brief',
      'Produksi 16 kajian sektoral',
      'Wawancara mendalam & FGD pakar',
      'Drafting buku putih per pilar',
    ],
    itemsEn: [
      'Writing 80 policy briefs',
      'Producing 16 sectoral studies',
      'In-depth interviews & expert FGDs',
      'Drafting white paper per pillar',
    ],
  },
  {
    phase: 3,
    title: 'Diseminasi & Engagement',
    titleEn: 'Dissemination & Engagement',
    period: 'Bulan 6–9',
    periodEn: 'Month 6–9',
    color: '#10B981',
    items: [
      'Peluncuran 24 episode podcast',
      'Publikasi artikel opini di media nasional',
      'Produksi 8 mini-dokumenter sektoral',
      'Seri webinar & roundtable diskusi',
    ],
    itemsEn: [
      'Launching 24 podcast episodes',
      'Publishing opinion articles in national media',
      'Producing 8 sectoral mini-documentaries',
      'Webinar series & roundtable discussions',
    ],
  },
  {
    phase: 4,
    title: 'Konsolidasi & Summit',
    titleEn: 'Consolidation & Summit',
    period: 'Bulan 9–12',
    periodEn: 'Month 9–12',
    color: '#F59E0B',
    items: [
      'Finalisasi & peluncuran Buku Putih 300-400 halaman',
      'Indonesianisme 2026 Summit (Oktober)',
      'Penyerahan rekomendasi kebijakan ke pemerintah',
      'Pembentukan task force implementasi per sektor',
    ],
    itemsEn: [
      'Finalizing & launching 300-400 page White Paper',
      'Indonesianisme 2026 Summit (October)',
      'Submitting policy recommendations to government',
      'Forming per-sector implementation task forces',
    ],
  },
];

/* ═══ Data: Pilar Karya ═══ */
const pilarKarya = [
  {
    icon: Factory,
    title: 'Industrialisasi & Hilirisasi Strategis',
    subtema: 'Penguatan basis industri melalui hilirisasi mineral, energi, pangan, teknologi, dan manufaktur',
    topik: ['Hilirisasi komoditas unggulan nasional', 'Penguatan ekosistem industri dan rantai pasok'],
    color: '#3B82F6',
  },
  {
    icon: Zap,
    title: 'Transisi & Ketahanan Energi',
    subtema: 'Ketahanan energi melalui penguatan kapasitas energi domestik serta transformasi green energy',
    topik: ['Pengembangan energi terbarukan', 'Penyelenggaraan mobilitas nasional'],
    color: '#F59E0B',
  },
  {
    icon: Wheat,
    title: 'Ketahanan Pangan & Air',
    subtema: 'Penguatan produktivitas, rantai nilai, dan pengelolaan sumber daya berkelanjutan',
    topik: ['Penguatan sistem pangan berkelanjutan', 'Pengelolaan sumber daya air terpadu'],
    color: '#10B981',
  },
  {
    icon: BrainCircuit,
    title: 'Transformasi Teknologi & Kedaulatan Digital',
    subtema: 'Akselerasi adopsi teknologi dan artificial intelligence untuk meningkatkan daya saing industri',
    topik: ['Akselerasi transformasi digital', 'Pemanfaatan AI dan data untuk produktivitas'],
    color: '#8B5CF6',
  },
  {
    icon: TrendingUp,
    title: 'Penguatan Ekonomi & Daya Saing Usaha',
    subtema: 'Pertumbuhan ekonomi melalui peningkatan daya saing usaha pada pasar domestik dan global',
    topik: ['Peningkatan daya saing industri dan usaha', 'Eskalasi usaha berkelanjutan'],
    color: '#EF4444',
  },
  {
    icon: Landmark,
    title: 'Kepemimpinan & Reformasi Tata Kelola',
    subtema: 'Kepemimpinan kuat, tata kelola efektif, dan transparan yang didukung oleh SDM berkualitas',
    topik: ['Penguatan tata kelola dan kelembagaan', 'Pengembangan SDM dan kepemimpinan strategis'],
    color: '#14B8A6',
  },
];

/* ═══ Data: Speakers ═══ */
const featuredSpeaker = {
  name: 'Prabowo Subianto',
  title: 'Presiden Republik Indonesia',
  titleEn: 'President of the Republic of Indonesia',
  img: 'https://picsum.photos/seed/featured/400/400',
};

const speakers = [
  { name: 'Dr. Bambang Brodjonegoro', title: 'Ex-Menteri PPN/Bappenas', titleEn: 'Former Minister of National Planning', topic: 'Strategi Ekonomi', topicEn: 'Economic Strategy', img: 'https://picsum.photos/seed/spk1/300/300' },
  { name: 'Prof. Dwi Larso', title: 'Guru Besar ITB', titleEn: 'ITB Professor', topic: 'Inovasi & Teknologi', topicEn: 'Innovation & Technology', img: 'https://picsum.photos/seed/spk2/300/300' },
  { name: 'Dr. Mari Elka Pangestu', title: 'Ex-MD World Bank', titleEn: 'Former MD World Bank', topic: 'Perdagangan Global', topicEn: 'Global Trade', img: 'https://picsum.photos/seed/spk3/300/300' },
  { name: 'Ir. Budi Gunadi Sadikin', title: 'Praktisi Industri', titleEn: 'Industry Practitioner', topic: 'Reindustrialisasi', topicEn: 'Reindustrialization', img: 'https://picsum.photos/seed/spk4/300/300' },
  { name: 'Prof. Arief Anshory Yusuf', title: 'Ekonom UNPAD', titleEn: 'UNPAD Economist', topic: 'Keberlanjutan', topicEn: 'Sustainability', img: 'https://picsum.photos/seed/spk5/300/300' },
  { name: 'Dr. Rhenald Kasali', title: 'Guru Besar UI', titleEn: 'UI Professor', topic: 'Transformasi Digital', topicEn: 'Digital Transformation', img: 'https://picsum.photos/seed/spk6/300/300' },
  { name: 'Dr. Arifin Tasrif', title: 'Ex-Menteri ESDM RI', titleEn: 'Former Minister of Energy', topic: 'Transisi Energi', topicEn: 'Energy Transition', img: 'https://picsum.photos/seed/spk_en1/300/300' },
  { name: 'Prof. Yohanes Surya', title: 'Fisikawan & Pendiri TOFI', titleEn: 'Physicist & TOFI Founder', topic: 'Sains & Riset', topicEn: 'Science & Research', img: 'https://picsum.photos/seed/spk_sci1/300/300' },
  { name: 'Prof. Brian Yuliarto', title: 'Guru Besar Teknik Material ITB', titleEn: 'ITB Professor, Materials Engineering', topic: 'Material Maju', topicEn: 'Advanced Materials', img: 'https://picsum.photos/seed/spk_mat1/300/300' },
  { name: 'Dr. Lucia Rizka Andalusia', title: 'Kepala BPOM RI', titleEn: 'Head, National Food & Drug Agency', topic: 'Kemandirian Farmasi', topicEn: 'Pharmaceutical Independence', img: 'https://picsum.photos/seed/spk_hlt2/300/300' },
  { name: 'Prof. Rokhmin Dahuri', title: 'Guru Besar Kelautan IPB', titleEn: 'IPB Professor of Marine Sciences', topic: 'Kemaritiman', topicEn: 'Maritime', img: 'https://picsum.photos/seed/spk_mar2/300/300' },
  { name: 'Dr. Connie Rahakundini', title: 'Analis Pertahanan & Keamanan', titleEn: 'Defense & Security Analyst', topic: 'Pertahanan Nasional', topicEn: 'National Defense', img: 'https://picsum.photos/seed/spk_def2/300/300' },
  { name: 'Dr. Fahmi Radhi', title: 'Ekonom Pangan & Energi', titleEn: 'Food & Energy Economist', topic: 'Ketahanan Pangan', topicEn: 'Food Security', img: 'https://picsum.photos/seed/spk_pan3/300/300' },
  { name: 'Semuel A. Pangerapan', title: 'Dirjen Aptika Kominfo', titleEn: 'Director General, Digital Applications', topic: 'Kedaulatan Digital', topicEn: 'Digital Sovereignty', img: 'https://picsum.photos/seed/spk_dig2/300/300' },
  { name: 'Dr. Rachmat Kaimuddin', title: 'Deputi Koordinasi Infrastruktur', titleEn: 'Deputy for Infrastructure Coordination', topic: 'Hilirisasi & Industri', topicEn: 'Downstreaming & Industry', img: 'https://picsum.photos/seed/spk_ind3/300/300' },
];

/* ═══ Data: Events ═══ */
const events = [
  { date: '15 Apr 2026', title: 'Kick-off Indonesianisme 2026', titleEn: 'Indonesianisme 2026 Kick-off', location: 'Jakarta Convention Center', desc: 'Peluncuran resmi platform dan pembukaan pendaftaran summit.', descEn: 'Official platform launch and summit registration opening.', status: 'open', statusLabel: 'Pendaftaran Dibuka', statusLabelEn: 'Registration Open' },
  { date: '20-22 Mei 2026', title: 'Forum Strategi Ekonomi Nasional', titleEn: 'National Economic Strategy Forum', location: 'Kampus ITB, Bandung', desc: 'Seri diskusi mendalam tentang 80 gagasan strategis bersama pakar dan pembuat kebijakan.', descEn: 'In-depth discussion series on 80 strategic ideas with experts and policymakers.', status: 'soon', statusLabel: 'Segera', statusLabelEn: 'Coming Soon' },
  { date: '15-17 Okt 2026', title: 'Indonesianisme 2026 Summit', titleEn: 'Indonesianisme 2026 Summit', location: 'Jakarta International Expo', desc: 'Acara utama: keynote, panel, roundtable, youth forum, dan innovation showcase.', descEn: 'Main event: keynotes, panels, roundtables, youth forum, and innovation showcase.', status: 'soon', statusLabel: 'Acara Utama', statusLabelEn: 'Main Event' },
];

/* ═══ Data: Partners ═══ */
const partners = ['Bank Mandiri', 'Telkom Indonesia', 'Pertamina', 'PLN', 'BRI', 'Astra International', 'Semen Indonesia', 'Bukalapak', 'Tokopedia', 'GoTo Group', 'ITB', 'UI'];

/* ═══ Data: Asta Cita — 8 National Priority Research Fields ═══ */
const astaCitaFields = [
  {
    id: 1,
    name: 'Kedaulatan Pangan',
    nameEn: 'Food Security',
    icon: Wheat,
    color: '#22C55E',
    gFrom: '#14532d',
    gTo: '#16a34a',
    taglineId: 'Swasembada pangan dan modernisasi pertanian',
    taglineEn: 'Food self-sufficiency and agricultural modernization',
    descId: 'Riset ketahanan pangan berfokus pada pencapaian swasembada komoditas strategis—beras, jagung, kedelai, dan gula—melalui inovasi bioteknologi, mekanisasi pertanian, dan penguatan rantai pasok domestik untuk mengurangi ketergantungan impor.',
    descEn: 'Food security research focuses on achieving self-sufficiency in strategic commodities—rice, corn, soybean, and sugar—through biotechnology innovation, agricultural mechanization, and strengthening domestic supply chains to reduce import dependence.',
    factsId: ['Impor gandum 100% kebutuhan nasional (~4 juta ton/tahun)', 'Impor kedelai 70–97% kebutuhan nasional', 'El Niño 2023: defisit beras 2,8 juta ton', 'Pertanian: 13% PDB, 28% tenaga kerja'],
    factsEn: ['100% of wheat needs are imported (~4M tons/year)', '70–97% of soybean needs imported', 'El Niño 2023: 2.8M ton rice deficit', 'Agriculture: 13% GDP, 28% workforce'],
    focusId: ['Benih unggul bioteknologi tahan iklim', 'Mekanisasi dan digitalisasi pertanian skala kecil', 'Cold chain nasional untuk distribusi pangan', 'AI early warning system cuaca pertanian', 'Industrialisasi sektor kelautan dan perikanan'],
    focusEn: ['Climate-resilient biotech seed development', 'Smallholder farming mechanization & digitalization', 'National cold chain for food distribution', 'AI early warning for agricultural weather', 'Maritime and fisheries sector industrialization'],
    focusIcons: [Sprout, Tractor, Package, Cloud, Fish],
    speakers: [
      { name: 'Dr. Syahrul Yasin Limpo', title: 'Ex-Menteri Pertanian RI', titleEn: 'Former Minister of Agriculture', img: 'https://picsum.photos/seed/spk_pan1/300/300' },
      { name: 'Prof. Bungaran Saragih', title: 'Guru Besar IPB, Ex-Menteri', titleEn: 'IPB Professor, Former Minister', img: 'https://picsum.photos/seed/spk_pan2/300/300' },
      { name: 'Dr. Fahmi Radhi', title: 'Ekonom Pangan & Energi', titleEn: 'Food & Energy Economist', img: 'https://picsum.photos/seed/spk_pan3/300/300' },
    ],
  },
  {
    id: 2,
    name: 'Energi',
    nameEn: 'Energy',
    icon: Zap,
    color: '#F59E0B',
    gFrom: '#78350f',
    gTo: '#d97706',
    taglineId: 'Transisi menuju energi bersih dan berkeadilan',
    taglineEn: 'Transition toward clean and equitable energy',
    descId: 'Riset energi diarahkan untuk mengakselerasi transisi dari bahan bakar fosil ke energi terbarukan, memanfaatkan keunggulan komparatif Indonesia: geotermal 40% cadangan dunia, surya lebih dari 2.900 GWp, dan bioenergi berbasis sawit.',
    descEn: 'Energy research accelerates the transition from fossil fuels to renewable energy, leveraging Indonesia\'s comparative advantages: geothermal (40% of world reserves), solar (>2,900 GWp potential), and palm oil-based bioenergy.',
    factsId: ['Geotermal: 40% cadangan dunia (~29.500 MW), baru 10% terpakai', 'Target EBT 23% bauran energi 2025 (realisasi ~13%)', 'Subsidi energi fosil: Rp 502 triliun/tahun (2023)', 'Potensi PLTS: >2.900 GWp nasional'],
    factsEn: ['Geothermal: 40% of world reserves (~29,500 MW), only 10% used', 'Renewable target 23% energy mix 2025 (actual ~13%)', 'Fossil energy subsidies: IDR 502T/year (2023)', 'Solar potential: >2,900 GWp nationally'],
    focusId: ['Akselerasi geotermal sebagai baseload hijau', 'Kapasitas PLTS 100 GW nasional', 'Smart grid dan sistem penyimpanan energi baterai', 'Mandatori B50–B100 biofuel berbasis kelapa sawit', 'Virtual gas pipeline untuk kawasan non-pipa'],
    focusEn: ['Accelerating geothermal as green baseload', 'Building 100 GW national solar capacity', 'Smart grid and battery energy storage', 'B50–B100 palm oil biofuel mandate', 'Virtual gas pipeline for off-grid areas'],
    focusIcons: [Flame, Sun, Battery, Droplets, Network],
    speakers: [
      { name: 'Dr. Arifin Tasrif', title: 'Ex-Menteri ESDM RI', titleEn: 'Former Minister of Energy', img: 'https://picsum.photos/seed/spk_en1/300/300' },
      { name: 'Prof. Tumiran', title: 'Guru Besar Teknik Elektro UGM', titleEn: 'UGM Electrical Engineering Professor', img: 'https://picsum.photos/seed/spk_en2/300/300' },
      { name: 'Ir. Dadan Kusdiana', title: 'Dirjen EBTKE Kementerian ESDM', titleEn: 'Director General of Renewable Energy', img: 'https://picsum.photos/seed/spk_en3/300/300' },
    ],
  },
  {
    id: 3,
    name: 'Pertahanan',
    nameEn: 'Defense',
    icon: Shield,
    color: '#94A3B8',
    gFrom: '#1e293b',
    gTo: '#475569',
    taglineId: 'Kemandirian industri pertahanan nasional',
    taglineEn: 'National defense industry independence',
    descId: 'Riset pertahanan berfokus pada peningkatan kandungan lokal alutsista, penguasaan teknologi militer strategis, dan pembangunan industri pertahanan yang mandiri serta ekspansif ke pasar global.',
    descEn: 'Defense research focuses on increasing local content in military equipment, mastering strategic military technologies, and building a self-reliant defense industry capable of expanding into global markets.',
    factsId: ['Anggaran pertahanan: ~0,7% PDB (target 2% PDB)', 'TKDN alutsista rata-rata 30–40%', 'Ekspor alutsista: USD 280 juta (2023)', 'PT Dirgantara: kapasitas CN235/N219'],
    factsEn: ['Defense budget: ~0.7% GDP (target 2% GDP)', 'Defense equipment local content avg 30–40%', 'Defense equipment exports: USD 280M (2023)', 'PT Dirgantara: CN235/N219 capacity'],
    focusId: ['Produksi massal pesawat N219 untuk domestik dan ekspor', 'Medium tank Harimau dan kendaraan taktis', 'Teknologi kapal selam dan fregat via transfer teknologi', 'Satelit mikro komunikasi militer berdaulat', 'Sistem pertahanan siber nasional terintegrasi'],
    focusEn: ['N219 aircraft mass production for domestic & export', 'Harimau medium tank and tactical vehicle development', 'Submarine & frigate technology via tech transfer', 'Sovereign military communication microsatellites', 'Integrated national cyber defense systems'],
    focusIcons: [Plane, Swords, Anchor, Satellite, Shield],
    speakers: [
      { name: 'Letjen (Purn.) Agus Widjojo', title: 'Gubernur Lemhanas RI (2016–2021)', titleEn: 'Former Governor, National Resilience Institute', img: 'https://picsum.photos/seed/spk_def1/300/300' },
      { name: 'Dr. Connie Rahakundini', title: 'Analis Pertahanan & Keamanan', titleEn: 'Defense & Security Analyst', img: 'https://picsum.photos/seed/spk_def2/300/300' },
      { name: 'Ir. Gita Amperiawan', title: 'Direktur PT PINDAD (Persero)', titleEn: 'Director, PT PINDAD (Persero)', img: 'https://picsum.photos/seed/spk_def3/300/300' },
    ],
  },
  {
    id: 4,
    name: 'Digitalisasi: AI & Semikonduktor',
    nameEn: 'Digitalization: AI & Semiconductor',
    icon: BrainCircuit,
    color: '#3B82F6',
    gFrom: '#1e3a8a',
    gTo: '#2563eb',
    taglineId: 'Kedaulatan digital di era kecerdasan buatan',
    taglineEn: 'Digital sovereignty in the AI era',
    descId: 'Riset digitalisasi membangun kedaulatan Indonesia di ruang digital—dari infrastruktur data dan kecerdasan buatan hingga inisiasi industri semikonduktor nasional yang menjadi tulang punggung ekonomi digital masa depan.',
    descEn: 'Digitalization research builds Indonesia\'s sovereignty in the digital space—from data infrastructure and AI to the national semiconductor industry that will be the backbone of the future digital economy.',
    factsId: ['Ekonomi digital Indonesia: USD 100B+ GMV (2024)', 'Defisit talenta AI: 600.000 tenaga pada 2030', 'Penetrasi serat optik: baru 40% kecamatan', 'Impor semikonduktor: USD 6,5 miliar/tahun'],
    factsEn: ['Indonesia digital economy: USD 100B+ GMV (2024)', 'AI talent deficit: 600K experts by 2030', 'Fiber optic: only 40% of subdistricts covered', 'Semiconductor imports: USD 6.5B/year'],
    focusId: ['Konsorsium AI Nasional untuk Large Language Model lokal', 'Inisiasi industri semikonduktor dan desain IC nasional', 'Pusat Data Nasional Berdaulat yang aman dan independen', 'AI untuk efisiensi penerimaan negara dan layanan publik', 'Penetrasi serat optik 80% kecamatan (Giga City)'],
    focusEn: ['National AI Consortium for local LLM', 'National semiconductor & IC design industry initiation', 'Secure Sovereign National Data Center', 'AI for government revenue efficiency & public services', '80% subdistrict fiber optic penetration (Giga City)'],
    focusIcons: [BrainCircuit, Cpu, Server, Database, Wifi],
    speakers: [
      { name: 'Dr. Rhenald Kasali', title: 'Guru Besar UI, Pakar Transformasi Digital', titleEn: 'UI Professor, Digital Transformation Expert', img: 'https://picsum.photos/seed/spk_dig1/300/300' },
      { name: 'Semuel Abrijani Pangerapan', title: 'Dirjen Aptika Kominfo RI', titleEn: 'Director General, Digital Applications', img: 'https://picsum.photos/seed/spk_dig2/300/300' },
      { name: 'Prof. Dwi Handoko', title: 'Ketua Konsorsium AI Nasional ITB', titleEn: 'Head, ITB National AI Consortium', img: 'https://picsum.photos/seed/spk_dig3/300/300' },
    ],
  },
  {
    id: 5,
    name: 'Kesehatan',
    nameEn: 'Health',
    icon: HeartPulse,
    color: '#EF4444',
    gFrom: '#7f1d1d',
    gTo: '#dc2626',
    taglineId: 'Kemandirian farmasi dan kesehatan nasional',
    taglineEn: 'National pharmaceutical and health independence',
    descId: 'Riset kesehatan difokuskan pada kemandirian farmasi nasional, pengembangan vaksin berbasis mRNA, hilirisasi fitofarmaka, dan transformasi digital sistem kesehatan untuk memperkuat ketahanan nasional.',
    descEn: 'Health research focuses on national pharmaceutical independence, mRNA-based vaccine development, phytopharmaca downstream processing, and digital transformation of the health system to strengthen national resilience.',
    factsId: ['Impor bahan baku farmasi: 90% kebutuhan nasional', 'Pengeluaran kesehatan: 3,7% PDB (target WHO: 5%)', 'Defisit dokter spesialis: 30.000 tenaga (2024)', 'Alkes lokal: hanya memenuhi 10% kebutuhan JKN'],
    factsEn: ['Pharmaceutical raw material imports: 90% of national needs', 'Health spending: 3.7% GDP (WHO target: 5%)', 'Specialist doctor deficit: 30,000 (2024)', 'Local medical devices: meets only 10% of JKN needs'],
    focusId: ['Pabrik fraksionasi plasma darah nasional', 'Hilirisasi fitofarmaka untuk pasar global', 'Vaksin nasional mRNA dan bioteknologi generasi baru', 'Mandatori alat kesehatan lokal dalam JKN', 'AI skrining kesehatan massal berbasis data nasional'],
    focusEn: ['National blood plasma fractionation plant', 'Phytopharmaca downstream for global markets', 'National mRNA & next-gen biotech vaccines', 'Local medical device mandate in JKN', 'AI mass health screening from national data'],
    focusIcons: [Droplets, Pill, Dna, Stethoscope, Activity],
    speakers: [
      { name: 'Prof. Dr. Ali Ghufron Mukti', title: 'Direktur Utama BPJS Kesehatan', titleEn: 'President Director, BPJS Kesehatan', img: 'https://picsum.photos/seed/spk_hlt1/300/300' },
      { name: 'Dr. Lucia Rizka Andalusia', title: 'Kepala BPOM RI', titleEn: 'Head, National Food & Drug Agency', img: 'https://picsum.photos/seed/spk_hlt2/300/300' },
      { name: 'Prof. Amin Soebandrio', title: 'Pakar Virologi & Bioteknologi UI', titleEn: 'UI Virologist & Biotechnology Expert', img: 'https://picsum.photos/seed/spk_hlt3/300/300' },
    ],
  },
  {
    id: 6,
    name: 'Hilirisasi & Industrialisasi',
    nameEn: 'Downstreaming & Industrialization',
    icon: Factory,
    color: '#A78BFA',
    gFrom: '#3b0764',
    gTo: '#7c3aed',
    taglineId: 'Dari bahan mentah ke produk bernilai tinggi',
    taglineEn: 'From raw materials to high-value products',
    descId: 'Riset hilirisasi berfokus pada transformasi Indonesia dari eksportir bahan mentah menjadi pencipta nilai tambah—mulai dari nikel ke baterai EV, CPO ke oleokimia, hingga bauksit ke aluminium hilir.',
    descEn: 'Downstreaming research transforms Indonesia from a raw material exporter into a value creator—from nickel to EV batteries, CPO to oleochemicals, and bauxite to downstream aluminum.',
    factsId: ['Ekspor nikel olahan: USD 11,4 miliar (2024)', 'Target manufaktur >25% PDB (dari 19% 2024)', 'Investasi ekosistem EV: potensi USD 545B hingga 2040', 'Kapasitas HPAL: 240.000 ton MHP/tahun'],
    factsEn: ['Processed nickel exports: USD 11.4B (2024)', 'Manufacturing target >25% GDP (from 19% in 2024)', 'EV ecosystem investment: potential USD 545B by 2040', 'HPAL capacity: 240,000 tons MHP/year'],
    focusId: ['Integrasi rantai pasok nikel dari hulu ke baterai EV', 'Hilirisasi mineral kritis: bauksit, tembaga, logam tanah jarang', 'Revitalisasi industri mesin perkakas nasional', 'Kawasan industri hijau terintegrasi', 'Penguatan TKDN ketat di proyek strategis negara'],
    focusEn: ['Nickel supply chain integration to EV batteries', 'Critical mineral downstream: bauxite, copper, REE', 'National machine tool industry revitalization', 'Integrated green industrial zones', 'Strict local content enforcement in strategic projects'],
    focusIcons: [Battery, Gem, Wrench, Factory, Target],
    speakers: [
      { name: 'Dr. Bambang Brodjonegoro', title: 'Ex-Menteri PPN/Bappenas', titleEn: 'Former Minister of National Planning', img: 'https://picsum.photos/seed/spk1/300/300' },
      { name: 'Ir. Budi Gunadi Sadikin', title: 'Praktisi Industri & Perbankan', titleEn: 'Industry & Banking Practitioner', img: 'https://picsum.photos/seed/spk4/300/300' },
      { name: 'Dr. Rachmat Kaimuddin', title: 'Deputi Bidang Koordinasi Infrastruktur', titleEn: 'Deputy for Infrastructure Coordination', img: 'https://picsum.photos/seed/spk_ind3/300/300' },
    ],
  },
  {
    id: 7,
    name: 'Kemaritiman',
    nameEn: 'Maritime',
    icon: Globe,
    color: '#22D3EE',
    gFrom: '#0c4a6e',
    gTo: '#0891b2',
    taglineId: 'Mengoptimalkan potensi ekonomi maritim Indonesia',
    taglineEn: "Optimizing Indonesia's maritime economic potential",
    descId: 'Riset kemaritiman berfokus pada industrialisasi sektor kelautan dan perikanan, pengembangan hub pelabuhan internasional, dan pemanfaatan biodiversitas laut sebagai sumber daya ekonomi berkelanjutan.',
    descEn: 'Maritime research focuses on industrializing the marine and fisheries sector, developing international port hubs, and utilizing marine biodiversity as a sustainable economic resource.',
    factsId: ['Garis pantai: 99.093 km (terpanjang ke-4 dunia)', 'Potensi ekonomi kelautan: USD 1,33 triliun/tahun', 'Ekspor produk kelautan: USD 6,1 miliar (2023)', 'Kerugian IUU fishing: USD 3–4 miliar/tahun'],
    factsEn: ['Coastline: 99,093 km (4th longest in the world)', 'Marine economic potential: USD 1.33T/year', 'Marine product exports: USD 6.1B (2023)', 'IUU fishing losses: USD 3–4B/year'],
    focusId: ['Industrialisasi perikanan budidaya skala besar', 'Hub pelabuhan internasional strategis', 'Pemberantasan IUU fishing via teknologi pemantauan', 'Hilirisasi produk laut: surimi, fish oil, rumput laut', 'Konservasi terumbu karang dan ekosistem pesisir'],
    focusEn: ['Large-scale aquaculture industrialization', 'Strategic international port hubs', 'IUU fishing eradication via monitoring tech', 'Marine product downstream: surimi, fish oil, seaweed', 'Coral reef and coastal ecosystem conservation'],
    focusIcons: [Fish, Anchor, Radar, Package, Waves],
    speakers: [
      { name: 'Dr. Sakti Wahyu Trenggono', title: 'Menteri Kelautan & Perikanan RI', titleEn: 'Minister of Marine Affairs & Fisheries', img: 'https://picsum.photos/seed/spk_mar1/300/300' },
      { name: 'Prof. Rokhmin Dahuri', title: 'Guru Besar Kelautan IPB', titleEn: 'IPB Professor of Marine Sciences', img: 'https://picsum.photos/seed/spk_mar2/300/300' },
      { name: 'Capt. Arsjad Rasjid', title: 'Ketua Umum KADIN Indonesia', titleEn: 'Chairman, Indonesian Chamber of Commerce', img: 'https://picsum.photos/seed/spk_mar3/300/300' },
    ],
  },
  {
    id: 8,
    name: 'Material Maju & Manufaktur',
    nameEn: 'Advanced Materials & Manufacturing',
    icon: Gem,
    color: '#F472B6',
    gFrom: '#500724',
    gTo: '#be185d',
    taglineId: 'Inovasi material masa depan untuk industri global',
    taglineEn: 'Future material innovations for global industry',
    descId: 'Riset material maju diarahkan pada pengembangan material strategis—baterai solid-state, bioplastik, material komposit—yang menjadi komponen kritis industri masa depan dan membuka pasar ekspor bernilai tinggi bagi Indonesia.',
    descEn: 'Advanced materials research develops strategic materials—solid-state batteries, bioplastics, composite materials—that are critical components of future industries and open high-value export markets for Indonesia.',
    factsId: ['Pasar material baterai global: USD 250B+ pada 2030', 'Indonesia: penghasil nikel terbesar dunia', 'Komposit nasional: potensi 30% substitusi impor komponen', 'Bioplastik singkong: peluang ekspor USD 2B+'],
    factsEn: ['Global battery materials market: USD 250B+ by 2030', "Indonesia: world's largest nickel producer", 'National composites: 30% component import substitution potential', 'Cassava bioplastics: USD 2B+ export opportunity'],
    focusId: ['Material katoda LFP berbasis nikel lokal', 'Solid-state battery untuk kendaraan listrik generasi berikut', 'Komposit serat karbon untuk industri penerbangan', 'Bioplastik dari singkong dan produk agro-industri', 'Material semikonduktor untuk ekosistem chip nasional'],
    focusEn: ['LFP cathode material based on local nickel', 'Solid-state batteries for next-gen EVs', 'Carbon fiber composites for aviation industry', 'Bioplastics from cassava and agro-industrial products', 'Semiconductor materials for national chip ecosystem'],
    focusIcons: [Battery, Zap, Plane, Sprout, Cpu],
    speakers: [
      { name: 'Prof. Brian Yuliarto', title: 'Guru Besar Teknik Material ITB', titleEn: 'ITB Professor of Materials Engineering', img: 'https://picsum.photos/seed/spk_mat1/300/300' },
      { name: 'Dr. Veinardi Suendo', title: 'Peneliti Material Baterai ITB', titleEn: 'ITB Battery Materials Researcher', img: 'https://picsum.photos/seed/spk_mat2/300/300' },
      { name: 'Prof. Akhmad Herman Yuwono', title: 'Guru Besar Teknik Material UI', titleEn: 'UI Professor of Materials Engineering', img: 'https://picsum.photos/seed/spk_mat3/300/300' },
    ],
  },
  {
    id: 9,
    name: 'Sains Frontier',
    nameEn: 'Frontier Science',
    icon: Lightbulb,
    color: '#818CF8',
    gFrom: '#1e1b4b',
    gTo: '#4f46e5',
    taglineId: 'Fondasi sains dasar untuk daya saing jangka panjang',
    taglineEn: 'Fundamental science foundation for long-term competitiveness',
    descId: 'Riset sains frontier mencakup ilmu-ilmu dasar dan multidisiplin yang menjadi fondasi inovasi jangka panjang: fisika nuklir, bioteknologi, material kuantum, dan AI generatif—membangun kapasitas saintifik Indonesia di garis terdepan pengetahuan manusia.',
    descEn: "Frontier science encompasses foundational and multidisciplinary sciences as long-term innovation foundations: nuclear physics, biotechnology, quantum materials, and generative AI—building Indonesia's scientific capacity at the forefront of human knowledge.",
    factsId: ['Anggaran riset Indonesia: 0,3% PDB (Korea 4,8%, Israel 5,6%)', 'Publikasi sains: naik 300% dalam 10 tahun', 'Reaktor nuklir BATAN beroperasi sejak 1964 (perlu modernisasi)', 'Paten per juta penduduk: 2 (vs 3.000 Korea Selatan)'],
    factsEn: ['Indonesia research budget: 0.3% GDP (Korea 4.8%, Israel 5.6%)', 'Science publications: up 300% in 10 years', 'BATAN nuclear reactor operational since 1964 (needs modernization)', 'Patents per million: 2 (vs 3,000 South Korea)'],
    focusId: ['Fisika nuklir untuk energi dan riset medis lanjutan', 'Bioteknologi molekuler dan rekayasa genetika pertanian', 'Material kuantum dan superkonduktivitas suhu tinggi', 'Ilmu iklim dan pemodelan perubahan lingkungan', 'Matematika komputasi untuk AI dan sistem kompleks'],
    focusEn: ['Nuclear physics for energy and advanced medical research', 'Molecular biotechnology and agricultural genetic engineering', 'Quantum materials and high-temperature superconductivity', 'Climate science and environmental change modeling', 'Computational mathematics for AI and complex systems'],
    focusIcons: [Atom, Dna, Microscope, Cloud, BrainCircuit],
    speakers: [
      { name: 'Prof. Yohanes Surya', title: 'Fisikawan & Pendiri TOFI', titleEn: 'Physicist & Founder of TOFI', img: 'https://picsum.photos/seed/spk_sci1/300/300' },
      { name: 'Dr. Sri Widiyantoro', title: 'Ahli Geofisika & Seismologi ITB', titleEn: 'ITB Geophysics & Seismology Expert', img: 'https://picsum.photos/seed/spk_sci2/300/300' },
      { name: 'Prof. Endriatmo Soetarto', title: 'Guru Besar Ilmu Sosial & Lingkungan', titleEn: 'Professor of Social & Environmental Science', img: 'https://picsum.photos/seed/spk_sci3/300/300' },
    ],
  },
];

/* ═══ Data: Stats ═══ */
const stats = [
  {
    target: 80,
    suffix: '',
    categoryId: 'GAGASAN STRATEGIS',
    categoryEn: 'STRATEGIC IDEAS',
    labelId: 'Rekomendasi Kebijakan',
    labelEn: 'Policy Recommendations',
    descId: 'Gagasan riset dari anggota IA-ITB lintas sektor untuk mendorong 8% pertumbuhan ekonomi nasional.',
    descEn: 'Research ideas from IA-ITB members across sectors to drive 8% national economic growth.',
    icon: Lightbulb,
    color: '#3B6FD4',
    bg: 'rgba(59,111,212,0.08)',
  },
  {
    target: 16,
    suffix: '',
    categoryId: 'SEKTOR STRATEGIS',
    categoryEn: 'STRATEGIC SECTORS',
    labelId: 'Bidang Industri & Kebijakan',
    labelEn: 'Industry & Policy Areas',
    descId: 'Dari energi, pangan, dan manufaktur hingga ekonomi digital, kesehatan, dan pertahanan.',
    descEn: 'From energy, food, and manufacturing to digital economy, health, and defense.',
    icon: Target,
    color: '#0E9E74',
    bg: 'rgba(14,158,116,0.08)',
  },
  {
    target: 6,
    suffix: '',
    categoryId: 'PILAR FILOSOFIS',
    categoryEn: 'PHILOSOPHICAL PILLARS',
    labelId: 'Fondasi Gerakan',
    labelEn: 'Movement Foundation',
    descId: 'Landasan pemikiran Indonesianisme: ketahanan nasional, kedaulatan teknologi, hingga kemandirian peradaban.',
    descEn: 'Philosophical foundation: national resilience, tech sovereignty, and civilizational independence.',
    icon: Award,
    color: '#C08B2A',
    bg: 'rgba(192,139,42,0.08)',
  },
  {
    target: 5,
    suffix: '',
    categoryId: 'PILAR STAKEHOLDER',
    categoryEn: 'STAKEHOLDER PILLARS',
    labelId: 'Kelompok Pemangku Kepentingan',
    labelEn: 'Stakeholder Groups',
    descId: 'Pemerintah, industri, akademisi, investor, dan generasi muda — bergerak bersama dalam satu platform.',
    descEn: 'Government, industry, academia, investors, and youth — moving together on one platform.',
    icon: Users,
    color: '#9B4FD8',
    bg: 'rgba(155,79,216,0.08)',
  },
];

/* ═══ Data: Platform Architecture ═══ */
const platformArch = [
  { icon: Landmark, title: 'Summit', titleEn: 'Summit', desc: 'Forum tahunan unggulan: keynote, panel diskusi, roundtable, dan youth forum.', descEn: 'Annual flagship forum: keynotes, panel discussions, roundtables, and youth forums.' },
  { icon: Users, title: 'Forum Series', titleEn: 'Forum Series', desc: 'Diskusi tematik sepanjang tahun tentang industri, energi, teknologi, dan tata kelola.', descEn: 'Year-round thematic discussions on industry, energy, technology, and governance.' },
  { icon: Lightbulb, title: 'Knowledge Platform', titleEn: 'Knowledge Platform', desc: 'Produksi thought paper, policy brief, dan laporan strategis berkualitas.', descEn: 'Producing quality thought papers, policy briefs, and strategic reports.' },
  { icon: Globe, title: 'Network', titleEn: 'Network', desc: 'Ekosistem penghubung pembuat kebijakan, industri, akademisi, dan profesional.', descEn: 'Ecosystem connecting policymakers, industry leaders, academics, and professionals.' },
  { icon: Rocket, title: 'Innovation Showcase', titleEn: 'Innovation Showcase', desc: 'Pameran inovasi Indonesia di bidang energi, digital, manufaktur, pangan, dan infrastruktur.', descEn: 'Showcasing Indonesian innovations in energy, digital, manufacturing, food, and infrastructure.' },
];

/* ═══ Knowledge Platform Data ═══ */
type KnowledgeDoc = {
  id: number;
  type: 'Thought Paper' | 'Policy Brief';
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  date: string;
  readTime: string;
  authors: string;
  tags: string[];
  abstract: string;
  abstractEn: string;
  coverImg: string;
  pdfUrl: string;
  sections: { heading: string; headingEn: string; body: string; bodyEn: string }[];
};

const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: 1,
    type: 'Thought Paper',
    title: 'Reindustrialisasi Indonesia: Strategi Menuju Pertumbuhan 8%',
    titleEn: 'Indonesia\'s Reindustrialization: Strategy Toward 8% Growth',
    subtitle: 'Dari Deindustrialisasi Prematur menuju Ekosistem Manufaktur Berdaya Saing',
    subtitleEn: 'From Premature Deindustrialization to a Competitive Manufacturing Ecosystem',
    date: '15 Mar 2026',
    readTime: '12 mnt',
    authors: 'Tim Riset Indonesianisme · IA-ITB Chapter Jakarta',
    tags: ['Manufaktur', 'Pertumbuhan Ekonomi', 'Kebijakan Industri'],
    coverImg: 'https://picsum.photos/seed/kd-reindustri/800/420',
    pdfUrl: '#',
    abstract: 'Indonesia menghadapi paradoks: kekayaan sumber daya alam yang melimpah justru belum dikonversi menjadi nilai tambah manufaktur yang sepadan. Thought paper ini memetakan akar deindustrialisasi prematur, mengusulkan strategi reindustrialisasi berbasis rantai nilai domestik, dan menghitung potensi dampaknya terhadap target pertumbuhan 8%.',
    abstractEn: 'Indonesia faces a paradox: abundant natural resources have yet to be converted into commensurate manufacturing value added. This thought paper maps the roots of premature deindustrialization, proposes a reindustrialization strategy based on domestic value chains, and calculates its potential impact on the 8% growth target.',
    sections: [
      {
        heading: 'Diagnosis: Deindustrialisasi Prematur',
        headingEn: 'Diagnosis: Premature Deindustrialization',
        body: 'Kontribusi sektor manufaktur terhadap PDB Indonesia telah turun dari puncak 29% pada 2001 menjadi sekitar 18% pada 2024. Penurunan ini terjadi jauh sebelum Indonesia mencapai level pendapatan per kapita yang lazim mendahului peralihan ke sektor jasa — fenomena yang disebut deindustrialisasi prematur. Dampaknya nyata: penciptaan lapangan kerja formal melambat, produktivitas tenaga kerja stagnan, dan ketergantungan pada ekspor komoditas mentah semakin dalam.',
        bodyEn: 'The manufacturing sector\'s contribution to Indonesia\'s GDP has fallen from a peak of 29% in 2001 to around 18% in 2024. This decline occurred well before Indonesia reached the per-capita income level that typically precedes a shift to the service sector — a phenomenon called premature deindustrialization. The effects are tangible: formal job creation has slowed, labor productivity has stagnated, and dependence on raw commodity exports has deepened.',
      },
      {
        heading: 'Tiga Vektor Reindustrialisasi',
        headingEn: 'Three Reindustrialization Vectors',
        body: 'Pertama, hilirisasi mineral kritis (nikel, bauksit, tembaga) menjadi produk antara dan hilir bernilai tinggi. Kedua, industrialisasi pangan — mengubah ekspor CPO menjadi oleokimia, biodiesel, dan produk konsumen bermerek. Ketiga, manufaktur teknologi menengah-atas berbasis substitusi impor di sektor otomotif listrik, elektronik, dan alat kesehatan. Ketiga vektor ini saling memperkuat melalui kluster industri terintegrasi di kawasan ekonomi khusus.',
        bodyEn: 'First, downstream processing of critical minerals (nickel, bauxite, copper) into high-value intermediate and end products. Second, food industrialization — transforming CPO exports into oleochemicals, biodiesel, and branded consumer products. Third, medium-to-high-tech manufacturing based on import substitution in electric vehicles, electronics, and medical devices. These three vectors reinforce each other through integrated industrial clusters in special economic zones.',
      },
      {
        heading: 'Kalkulasi Dampak terhadap Target 8%',
        headingEn: 'Impact Calculation Toward the 8% Target',
        body: 'Simulasi model input-output menunjukkan bahwa realisasi penuh ketiga vektor dapat menambah 1,5–2,0 poin persentase terhadap pertumbuhan PDB per tahun selama periode 2026–2030. Dengan baseline pertumbuhan 5,2%, akumulasi reformasi struktural — termasuk investasi infrastruktur, perbaikan iklim usaha, dan pendalaman pasar modal — berpotensi mendorong pertumbuhan rata-rata ke kisaran 7,5–8,0% secara berkelanjutan.',
        bodyEn: 'Input-output model simulations show that full realization of all three vectors could add 1.5–2.0 percentage points to annual GDP growth during the 2026–2030 period. With a baseline growth of 5.2%, accumulated structural reforms — including infrastructure investment, improved business climate, and capital market deepening — have the potential to sustainably push average growth to the 7.5–8.0% range.',
      },
    ],
  },
  {
    id: 2,
    type: 'Policy Brief',
    title: 'Peta Jalan Kedaulatan Energi: Memanfaatkan Potensi Geotermal Nusantara',
    titleEn: 'Energy Sovereignty Roadmap: Harnessing the Nusantara\'s Geothermal Potential',
    subtitle: 'Rekomendasi Kebijakan untuk Akselerasi Pengembangan Panas Bumi 2026–2030',
    subtitleEn: 'Policy Recommendations for Accelerating Geothermal Development 2026–2030',
    date: '10 Mar 2026',
    readTime: '8 mnt',
    authors: 'Tim Energi Indonesianisme · ITB Energy Research Group',
    tags: ['Energi', 'Geotermal', 'Kedaulatan', 'EBT'],
    coverImg: 'https://picsum.photos/seed/kd-geotermal/800/420',
    pdfUrl: '#',
    abstract: 'Indonesia memiliki potensi geotermal terbesar kedua di dunia (~29 GW), namun baru memanfaatkan ~10% kapasitas tersebut. Policy brief ini mengidentifikasi hambatan struktural dan menawarkan tiga paket kebijakan konkret untuk mengakselerasi pengembangan geotermal sebagai tulang punggung transisi energi bersih Indonesia.',
    abstractEn: 'Indonesia holds the world\'s second-largest geothermal potential (~29 GW), yet only ~10% of that capacity has been developed. This policy brief identifies structural barriers and offers three concrete policy packages to accelerate geothermal development as the backbone of Indonesia\'s clean energy transition.',
    sections: [
      {
        heading: 'Situasi Saat Ini: Potensi vs. Realisasi',
        headingEn: 'Current Situation: Potential vs. Reality',
        body: 'Kapasitas terpasang geotermal Indonesia per 2024 baru mencapai 2.417 MW dari potensi 29.500 MW. Sebagian besar potensi berada di kawasan hutan lindung dan taman nasional, menciptakan konflik regulasi antara UU Panas Bumi dan UU Kehutanan. Tarif listrik geotermal juga belum kompetitif dibanding PLTU batu bara yang masih menerima subsidi implisit.',
        bodyEn: 'Indonesia\'s installed geothermal capacity as of 2024 is only 2,417 MW out of a potential 29,500 MW. Most of the potential lies within protected forests and national parks, creating regulatory conflicts between the Geothermal Law and the Forestry Law. Geothermal electricity tariffs are also not yet competitive compared to coal-fired power plants that still receive implicit subsidies.',
      },
      {
        heading: 'Tiga Paket Kebijakan',
        headingEn: 'Three Policy Packages',
        body: 'Paket 1 — Harmonisasi Regulasi: Amandemen PP No. 7/2010 untuk mengizinkan eksplorasi geotermal di hutan lindung dengan syarat zero-deforestation net. Paket 2 — Insentif Fiskal Bertarget: Pembebasan bea masuk peralatan pengeboran, tax holiday 10 tahun untuk proyek >100 MW, dan skema blended finance BUMN-swasta-multilateral. Paket 3 — Penguatan PTPLN sebagai Off-taker: Revisi formula tarif berbasis cost-plus dengan IRR guarantee 12% untuk menarik investasi asing langsung.',
        bodyEn: 'Package 1 — Regulatory Harmonization: Amend Government Regulation No. 7/2010 to allow geothermal exploration in protected forests with a net zero-deforestation requirement. Package 2 — Targeted Fiscal Incentives: Import duty exemption on drilling equipment, 10-year tax holiday for projects >100 MW, and a BUMN-private-multilateral blended finance scheme. Package 3 — Strengthening PLN as Off-taker: Revise the tariff formula to cost-plus with a 12% IRR guarantee to attract foreign direct investment.',
      },
      {
        heading: 'Target dan Indikator Keberhasilan',
        headingEn: 'Targets and Success Indicators',
        body: 'Dengan implementasi penuh ketiga paket, proyeksi kapasitas geotermal Indonesia dapat mencapai 8.000 MW pada 2030 dan 15.000 MW pada 2035 — setara pengurangan emisi CO₂ sebesar 60 juta ton per tahun. Indikator kunci: jumlah wilayah kerja panas bumi aktif, realisasi investasi tahunan, dan penurunan proporsi PLTU dalam bauran energi nasional.',
        bodyEn: 'With full implementation of all three packages, Indonesia\'s projected geothermal capacity can reach 8,000 MW by 2030 and 15,000 MW by 2035 — equivalent to a reduction of 60 million tons of CO₂ per year. Key indicators: number of active geothermal working areas, annual investment realization, and reduction in the proportion of coal in the national energy mix.',
      },
    ],
  },
  {
    id: 3,
    type: 'Thought Paper',
    title: '80 Gagasan untuk Indonesia 2045: Ringkasan Eksekutif',
    titleEn: '80 Ideas for Indonesia 2045: Executive Summary',
    subtitle: 'Agenda Transformasi Komprehensif dari Alumni ITB untuk Bangsa',
    subtitleEn: 'A Comprehensive Transformation Agenda from ITB Alumni for the Nation',
    date: '5 Mar 2026',
    readTime: '15 mnt',
    authors: 'Ikatan Alumni ITB · Bidang Kebijakan Publik',
    tags: ['Indonesia 2045', 'Transformasi', 'SDM', 'Inovasi'],
    coverImg: 'https://picsum.photos/seed/kd-80gagasan/800/420',
    pdfUrl: '#',
    abstract: 'Dokumen ini merangkum 80 gagasan strategis yang dikurasi dari ratusan alumnus ITB lintas angkatan dan disiplin ilmu. Gagasan-gagasan ini mencakup lima domain: reindustrialisasi, kedaulatan digital, ketahanan pangan, keuangan inklusif, dan reformasi tata kelola — membentuk cetak biru transformasi Indonesia menuju negara maju di 2045.',
    abstractEn: 'This document summarizes 80 strategic ideas curated from hundreds of ITB alumni across generations and disciplines. These ideas span five domains: reindustrialization, digital sovereignty, food security, inclusive finance, and governance reform — forming a transformation blueprint for Indonesia\'s path to developed-nation status by 2045.',
    sections: [
      {
        heading: 'Metodologi Kurasi',
        headingEn: 'Curation Methodology',
        body: 'Proses kurasi berlangsung selama 6 bulan, melibatkan 340 alumni dari 28 program studi ITB. Setiap gagasan divalidasi melalui dua putaran peer review dan satu sesi konsultasi dengan pemangku kepentingan pemerintah. Kriteria seleksi: (1) dampak terukur terhadap PDB atau kesejahteraan, (2) kelayakan implementasi dalam 5 tahun, (3) keunikan relatif terhadap kebijakan yang sudah ada.',
        bodyEn: 'The curation process lasted 6 months, involving 340 alumni from 28 ITB study programs. Each idea was validated through two rounds of peer review and one consultation session with government stakeholders. Selection criteria: (1) measurable impact on GDP or welfare, (2) implementation feasibility within 5 years, (3) uniqueness relative to existing policies.',
      },
      {
        heading: 'Kluster Gagasan Prioritas',
        headingEn: 'Priority Idea Clusters',
        body: 'Dari 80 gagasan, 15 diklasifikasikan sebagai "high-impact, quick-win" yang dapat dimulai dalam 12 bulan. Menonjol di antaranya: (1) pembentukan Indonesia Semiconductor Fund senilai US$2 miliar, (2) program guru STEM berbasis kampus yang melatih 50.000 guru/tahun, (3) skema kredit karbon bagi petani kecil yang menerapkan pertanian regeneratif, dan (4) reformasi tata niaga pupuk menuju subsidi langsung petani berbasis NIK.',
        bodyEn: 'Of the 80 ideas, 15 are classified as "high-impact, quick-wins" that can be started within 12 months. Standouts include: (1) establishing a US$2 billion Indonesia Semiconductor Fund, (2) a campus-based STEM teacher program training 50,000 teachers/year, (3) a carbon credit scheme for smallholder farmers adopting regenerative agriculture, and (4) fertilizer distribution reform toward direct farmer subsidies based on national ID.',
      },
      {
        heading: 'Jalan Menuju 2045',
        headingEn: 'The Road to 2045',
        body: 'Realisasi 80 gagasan ini secara kolektif diproyeksikan meningkatkan PDB per kapita dari USD 5.000 (2024) menuju USD 18.000–22.000 pada 2045, menempatkan Indonesia dalam kelompok negara berpendapatan tinggi. Namun keberhasilan bergantung pada satu prasyarat: konsistensi kebijakan lintas pemerintahan — sebuah tantangan kelembagaan yang harus dijawab oleh arsitektur tata kelola yang lebih kuat.',
        bodyEn: 'Collective realization of these 80 ideas is projected to increase GDP per capita from USD 5,000 (2024) toward USD 18,000–22,000 by 2045, placing Indonesia in the high-income country group. However, success depends on one prerequisite: policy consistency across administrations — an institutional challenge that must be met by a stronger governance architecture.',
      },
    ],
  },
  {
    id: 4,
    type: 'Policy Brief',
    title: 'Hilirisasi Nikel: Evaluasi Model BODI dan Implikasi Kebijakan',
    titleEn: 'Nickel Downstream Processing: BODI Model Evaluation and Policy Implications',
    subtitle: 'Pelajaran dari Implementasi 2020–2025 dan Agenda Perbaikan',
    subtitleEn: 'Lessons from 2020–2025 Implementation and an Improvement Agenda',
    date: '28 Feb 2026',
    readTime: '10 mnt',
    authors: 'Tim Industri Indonesianisme · Dept. Teknik Pertambangan ITB',
    tags: ['Nikel', 'Hilirisasi', 'Industri', 'Investasi'],
    coverImg: 'https://picsum.photos/seed/kd-nikel/800/420',
    pdfUrl: '#',
    abstract: 'Kebijakan larangan ekspor nikel mentah sejak 2020 telah menarik investasi smelter HPAL senilai >USD 10 miliar, namun menimbulkan debat baru: apakah Indonesia mendapatkan nilai tambah yang setimpal? Policy brief ini mengevaluasi model BODI (Backbone-Offensive-Defensive-Infrastructure) dalam konteks hilirisasi nikel dan merekomendasikan penyesuaian kebijakan untuk fase 2026–2030.',
    abstractEn: 'The ban on raw nickel exports since 2020 has attracted HPAL smelter investments exceeding USD 10 billion, yet has sparked a new debate: is Indonesia receiving commensurate added value? This policy brief evaluates the BODI (Backbone-Offensive-Defensive-Infrastructure) model in the context of nickel downstream processing and recommends policy adjustments for the 2026–2030 phase.',
    sections: [
      {
        heading: 'Apa yang Sudah Berhasil',
        headingEn: 'What Has Worked',
        body: 'Larangan ekspor berhasil memaksa perpindahan aktivitas pemrosesan ke dalam negeri. Per 2025, kapasitas HPAL Indonesia mencapai 240.000 ton nikel dalam Mixed Hydroxide Precipitate (MHP)/tahun, menjadikan Indonesia pemain utama dalam rantai pasok baterai kendaraan listrik global. Nilai ekspor produk nikel olahan meningkat dari USD 1,2 miliar (2019) menjadi USD 11,4 miliar (2024).',
        bodyEn: 'The export ban successfully forced the shift of processing activities onshore. By 2025, Indonesia\'s HPAL capacity reached 240,000 tons of nickel in Mixed Hydroxide Precipitate (MHP)/year, making Indonesia a major player in the global EV battery supply chain. Export value of processed nickel products increased from USD 1.2 billion (2019) to USD 11.4 billion (2024).',
      },
      {
        heading: 'Tantangan yang Belum Terpecahkan',
        headingEn: 'Unresolved Challenges',
        body: 'Tiga masalah struktural tersisa: (1) dominasi investor asing dalam kepemilikan smelter mencapai 78%, sehingga surplus nilai tambah mengalir keluar negeri melalui profit repatriation; (2) kandungan lokal komponen smelter masih rendah di 23%, jauh dari target 40%; (3) pencemaran lingkungan di Morowali dan Konawe belum ada mekanisme penyelesaian yang sistematis.',
        bodyEn: 'Three structural problems remain: (1) foreign investor dominance in smelter ownership at 78%, causing value-added surplus to flow out through profit repatriation; (2) local content in smelter components is still low at 23%, far from the 40% target; (3) environmental pollution in Morowali and Konawe has no systematic resolution mechanism.',
      },
      {
        heading: 'Rekomendasi Kebijakan 2026–2030',
        headingEn: 'Policy Recommendations 2026–2030',
        body: 'Empat rekomendasi utama: Pertama, wajibkan divestasi bertahap ke pihak Indonesia hingga minimal 40% kepemilikan pada 2028. Kedua, terapkan skema Local Content Acceleration Bond — smelter yang melampaui target TKDN mendapat kredit pajak. Ketiga, bentuk Indonesia Battery Corporation (IBC) sebagai integrator rantai nilai nikel–baterai–EV nasional. Keempat, tetapkan standar lingkungan berbasis science-based targets yang mengikat secara hukum.',
        bodyEn: 'Four key recommendations: First, mandate gradual divestiture to Indonesian parties to at least 40% ownership by 2028. Second, implement a Local Content Acceleration Bond scheme — smelters exceeding TKDN targets receive tax credits. Third, establish Indonesia Battery Corporation (IBC) as a national nickel–battery–EV value chain integrator. Fourth, establish science-based environmental standards that are legally binding.',
      },
    ],
  },
  {
    id: 5,
    type: 'Thought Paper',
    title: 'Transformasi SDM untuk Indonesia Emas 2045',
    titleEn: 'Human Capital Transformation for Golden Indonesia 2045',
    subtitle: 'Dari Bonus Demografi menuju Dividen Pengetahuan',
    subtitleEn: 'From Demographic Dividend to Knowledge Dividend',
    date: '10 Feb 2026',
    readTime: '11 mnt',
    authors: 'Tim SDM & Pendidikan Indonesianisme',
    tags: ['SDM', 'Pendidikan', 'Indonesia 2045', 'Inovasi'],
    coverImg: 'https://picsum.photos/seed/kd-sdm/800/420',
    pdfUrl: '#',
    abstract: 'Indonesia memiliki 68 juta penduduk usia 15–29 tahun, tetapi hanya 13% yang memiliki pendidikan tinggi. Transformasi sumber daya manusia adalah prasyarat mutlak untuk mengkonversi bonus demografi menjadi dividen pengetahuan. Thought paper ini menawarkan model ekosistem pendidikan-industri-riset terintegrasi yang mampu menghasilkan 1 juta talenta digital per tahun pada 2030.',
    abstractEn: 'Indonesia has 68 million people aged 15–29, yet only 13% hold a higher education degree. Human capital transformation is an absolute prerequisite for converting the demographic dividend into a knowledge dividend. This thought paper offers an integrated education-industry-research ecosystem model capable of producing 1 million digital talents per year by 2030.',
    sections: [
      {
        heading: 'Kesenjangan Kompetensi yang Mengancam',
        headingEn: 'The Threatening Competency Gap',
        body: 'Studi World Bank (2024) menemukan bahwa 67% lulusan SMK/PT Indonesia tidak memiliki kompetensi yang dibutuhkan industri teknologi dan manufaktur modern. Sementara itu, proyeksi McKinsey menunjukkan Indonesia akan membutuhkan 9 juta tenaga digital tambahan pada 2030. Gap ini — jika tidak segera ditutup — akan mengubah bonus demografi menjadi beban demografi.',
        bodyEn: 'A World Bank study (2024) found that 67% of Indonesian SMK/PT graduates lack the competencies required by the modern technology and manufacturing industry. Meanwhile, McKinsey projections show Indonesia will need 9 million additional digital workers by 2030. This gap — if not closed promptly — will transform the demographic dividend into a demographic burden.',
      },
      {
        heading: 'Model Ekosistem Triple Helix+',
        headingEn: 'Triple Helix+ Ecosystem Model',
        body: 'Proposisi utama adalah membangun 20 "Kluster Inovasi Industri-Kampus" (KIIK) yang menghubungkan perguruan tinggi teknik, BUMN, dan industri swasta dalam satu ekosistem riset-produksi. Setiap KIIK menargetkan 3 output: 500 paten/tahun, 50 startup deeptech, dan 10.000 lulusan siap industri. Model ini diadaptasi dari Fraunhofer Institute Jerman yang telah menghasilkan kontribusi ekonomi €55 miliar/tahun.',
        bodyEn: 'The main proposition is to build 20 "Industry-Campus Innovation Clusters" (KIIK) linking engineering universities, SOEs, and private industry in a single research-production ecosystem. Each KIIK targets 3 outputs: 500 patents/year, 50 deep-tech startups, and 10,000 industry-ready graduates. This model is adapted from Germany\'s Fraunhofer Institute, which has generated economic contributions of €55 billion/year.',
      },
      {
        heading: 'Implementasi dan Pendanaan',
        headingEn: 'Implementation and Financing',
        body: 'Investasi awal diperkirakan Rp 45 triliun selama 5 tahun, bersumber dari tiga jalur: (1) Rp 20 triliun dari APBN melalui redesain Dana Abadi Pendidikan, (2) Rp 15 triliun dari konsorsium industri dalam skema cost-sharing, (3) Rp 10 triliun dari pinjaman lunak multilateral (ADB, World Bank). Return on investment diproyeksikan 4:1 dalam 10 tahun melalui peningkatan produktivitas dan pajak penghasilan dari talenta yang dihasilkan.',
        bodyEn: 'Initial investment is estimated at IDR 45 trillion over 5 years, sourced from three channels: (1) IDR 20 trillion from the state budget through the Education Endowment Fund redesign, (2) IDR 15 trillion from an industry consortium under a cost-sharing scheme, (3) IDR 10 trillion from multilateral soft loans (ADB, World Bank). ROI is projected at 4:1 within 10 years through productivity gains and income taxes from the talent produced.',
      },
    ],
  },
  {
    id: 6,
    type: 'Policy Brief',
    title: 'Ketahanan Pangan di Tengah Disrupsi Iklim dan Geopolitik',
    titleEn: 'Food Security Amid Climate and Geopolitical Disruption',
    subtitle: 'Strategi Adaptasi Indonesia untuk Menghadapi Era Volatilitas Pangan Global',
    subtitleEn: 'Indonesia\'s Adaptation Strategy for the Era of Global Food Volatility',
    date: '20 Jan 2026',
    readTime: '9 mnt',
    authors: 'Tim Ketahanan Pangan Indonesianisme · IFSR',
    tags: ['Pangan', 'Ketahanan', 'Iklim', 'Geopolitik'],
    coverImg: 'https://picsum.photos/seed/kd-pangan/800/420',
    pdfUrl: '#',
    abstract: 'Tiga krisis simultan — perubahan iklim, fragmentasi geopolitik, dan lonjakan biaya input pertanian — telah mengubah lanskap ketahanan pangan global secara fundamental. Indonesia, sebagai importir bersih sejumlah komoditas strategis, menghadapi risiko volatilitas harga dan pasokan yang belum pernah ada sebelumnya. Policy brief ini merekomendasikan arsitektur ketahanan pangan berlapis yang mampu menyerap guncangan tersebut.',
    abstractEn: 'Three simultaneous crises — climate change, geopolitical fragmentation, and a surge in agricultural input costs — have fundamentally changed the global food security landscape. Indonesia, as a net importer of several strategic commodities, faces unprecedented price and supply volatility risks. This policy brief recommends a multi-layered food security architecture capable of absorbing these shocks.',
    sections: [
      {
        heading: 'Pemetaan Eksposur Risiko Indonesia',
        headingEn: 'Mapping Indonesia\'s Risk Exposure',
        body: 'Indonesia mengimpor 3–4 juta ton gandum/tahun (100% kebutuhan), 2 juta ton kedelai/tahun (70% kebutuhan), dan masih rentan terhadap deficit beras saat El Niño. Harga pupuk urea telah naik 180% sejak 2021 akibat krisis energi Eropa yang mengurangi produksi gas alam sebagai bahan baku. Setiap kenaikan 10% harga pangan global rata-rata memangkas konsumsi kalori 15 juta rumah tangga termiskin Indonesia sebesar 8%.',
        bodyEn: 'Indonesia imports 3–4 million tons of wheat/year (100% of needs), 2 million tons of soybeans/year (70% of needs), and remains vulnerable to rice deficits during El Niño events. Urea fertilizer prices have risen 180% since 2021 due to the European energy crisis reducing natural gas production as a feedstock. Every 10% rise in global food prices cuts caloric consumption of Indonesia\'s 15 million poorest households by an average of 8%.',
      },
      {
        heading: 'Arsitektur Ketahanan Berlapis',
        headingEn: 'Layered Resilience Architecture',
        body: 'Lapisan 1 — Buffer Stock Strategis: Tingkatkan kapasitas cadangan beras nasional dari 1 juta ton menjadi 3 juta ton melalui modernisasi gudang BULOG dan integrasi sistem cold chain. Lapisan 2 — Diversifikasi Sumber Impor: Untuk gandum, kurangi dependensi pada Ukraina/Rusia dengan mengembangkan kemitraan suplai jangka panjang (5–10 tahun) dengan Australia, Argentina, dan Kanada. Lapisan 3 — Substitusi Domestik Bertahap: Program 1 juta hektar sorgum dan 500.000 hektar singkong untuk mensubstitusi 20% impor gandum pada 2030.',
        bodyEn: 'Layer 1 — Strategic Buffer Stock: Increase national rice reserve capacity from 1 million tons to 3 million tons through modernization of BULOG warehouses and cold chain integration. Layer 2 — Import Source Diversification: For wheat, reduce dependence on Ukraine/Russia by developing long-term supply partnerships (5–10 years) with Australia, Argentina, and Canada. Layer 3 — Gradual Domestic Substitution: 1 million hectare sorghum and 500,000 hectare cassava programs to substitute 20% of wheat imports by 2030.',
      },
      {
        heading: 'Prioritas Anggaran dan Tata Kelola',
        headingEn: 'Budget Priorities and Governance',
        body: 'Anggaran ketahanan pangan perlu direstrukturisasi: kurangi subsidi pupuk tidak tepat sasaran (saat ini Rp 54 triliun/tahun) dan alihkan 40%-nya ke subsidi input presisi berbasis data (soil testing, smart irrigation). Bentuk Badan Koordinasi Ketahanan Pangan Nasional (BKKPN) yang mengintegrasikan Kementan, BAPANAS, BULOG, dan Kemendag di bawah satu otoritas pengambilan keputusan untuk menghilangkan silo kebijakan.',
        bodyEn: 'The food security budget needs restructuring: reduce poorly targeted fertilizer subsidies (currently IDR 54 trillion/year) and redirect 40% to data-based precision input subsidies (soil testing, smart irrigation). Establish a National Food Security Coordination Agency (BKKPN) integrating the Ministry of Agriculture, BAPANAS, BULOG, and Ministry of Trade under a single decision-making authority to eliminate policy silos.',
      },
    ],
  },
];

/* ═══ BODI Role Colors ═══ */
const bodiColors: Record<string, string> = {
  'Backbone': '#3B82F6',
  'Offensive': '#F59E0B',
  'Defensive': '#10B981',
  'Image Leading': '#EC4899',
};

/* ═══ Tokoh Quote Carousel ═══ */
const tokohQuotes = [
  {
    name: 'Agustin Perangin-Angin',
    role: { ID: 'Ketua Umum IA-ITB', EN: 'Chairman of IA-ITB' },
    imgSeed: 'agustin_iaitb',
    title: {
      ID: 'Peran Kritis Riset, Sains, dan Teknologi bagi Indonesia',
      EN: 'The Critical Role of Research, Science, and Technology for Indonesia',
    },
    body1: {
      ID: 'Target pertumbuhan ekonomi 8% tidak akan tercapai hanya dengan mengandalkan ekspor komoditas mentah. Indonesia harus bertransformasi menjadi ekonomi industri bernilai tambah tinggi — dan transformasi itu hanya bisa dipimpin oleh sumber daya manusia yang menguasai riset, sains, dan teknologi.',
      EN: 'The 8% growth target cannot be achieved by relying solely on raw commodity exports. Indonesia must transform into a high-value industrial economy — and that transformation can only be led by human resources who command research, science, and technology.',
    },
    body2: {
      ID: 'IA-ITB hadir bukan sekadar menghimpun alumni, melainkan menggerakkan mereka sebagai aktor perubahan. Melalui Indonesianisme 2026, kami mentransformasi 80 gagasan strategis lintas sektor menjadi rekomendasi kebijakan konkret yang siap dieksekusi oleh pemerintah, industri, dan masyarakat sipil.',
      EN: 'IA-ITB exists not merely to gather alumni, but to mobilize them as agents of change. Through Indonesianisme 2026, we transform 80 strategic ideas into concrete policy recommendations ready to be executed by government, industry, and civil society.',
    },
  },
  {
    name: 'Prof. Dr. Reini D. Wirahadikusumah',
    role: { ID: 'Rektor Institut Teknologi Bandung', EN: 'Rector, Bandung Institute of Technology' },
    imgSeed: 'reini_itb',
    title: {
      ID: 'Perguruan Tinggi sebagai Mesin Inovasi Nasional',
      EN: 'Universities as Engines of National Innovation',
    },
    body1: {
      ID: 'ITB telah menghasilkan ribuan insinyur dan ilmuwan yang tersebar di seluruh penjuru Indonesia dan dunia. Kini saatnya energi intelektual itu tidak hanya mengalir ke korporasi multinasional, tetapi juga diarahkan untuk memecahkan masalah-masalah fundamental bangsa.',
      EN: "ITB has produced thousands of engineers and scientists across Indonesia and the world. Now is the time for that intellectual energy to flow not only to multinationals, but to solve the nation's fundamental challenges.",
    },
    body2: {
      ID: 'Indonesianisme 2026 adalah momentum untuk menyatukan riset akademis dengan kebijakan industri. Sinergi ini adalah kunci untuk melompati Middle Income Trap dan menjadikan Indonesia pemain teknologi kelas dunia sebelum 2045.',
      EN: 'Indonesianisme 2026 is the momentum to unite academic research with industrial policy — the key to leaping the Middle Income Trap and making Indonesia a world-class technology player before 2045.',
    },
  },
  {
    name: 'Dr. Ir. Bambang Brodjonegoro',
    role: { ID: 'Mantan Menteri Riset & Teknologi RI', EN: 'Former Minister of Research & Technology' },
    imgSeed: 'bambang_brodjo',
    title: {
      ID: 'Reindustrialisasi Bukan Pilihan — Ia adalah Keharusan',
      EN: 'Reindustrialization is Not a Choice — It is an Imperative',
    },
    body1: {
      ID: 'Deindustrialisasi prematur yang terjadi di Indonesia sejak dekade lalu adalah ancaman nyata terhadap cita-cita Indonesia Emas 2045. Kontribusi manufaktur yang merosot dari 22% ke 19% PDB bukan sekadar angka statistik — ini sinyal bahwa kita sedang kehilangan daya ungkit ekonomi.',
      EN: 'Premature deindustrialization over the past decade is a real threat to Golden Indonesia 2045. Manufacturing declining from 22% to 19% of GDP is not just a statistic — it signals we are losing economic leverage.',
    },
    body2: {
      ID: 'Kita memiliki semua modal untuk membalikkan tren ini: sumber daya alam melimpah, bonus demografi yang belum teroptimalkan, dan konsolidasi kapital melalui Danantara. Yang dibutuhkan adalah keberanian kebijakan dan konsistensi implementasi.',
      EN: 'We have all the capital to reverse this trend: abundant natural resources, underutilized demographic dividends, and capital consolidation through Danantara. What is needed is policy courage and implementation consistency.',
    },
  },
  {
    name: 'Indra Utoyo',
    role: { ID: 'Komisaris Utama Telkom Indonesia · Alumni ITB', EN: 'President Commissioner, Telkom Indonesia · ITB Alumni' },
    imgSeed: 'indra_utoyo',
    title: {
      ID: 'Kedaulatan Digital adalah Pilar Ketahanan Nasional',
      EN: 'Digital Sovereignty is a Pillar of National Resilience',
    },
    body1: {
      ID: 'Indonesia memiliki ekonomi digital senilai lebih dari USD 100 miliar — namun sebagian besar nilai tersebut masih bocor ke infrastruktur dan platform asing. Kedaulatan digital bukan tentang isolasi, melainkan memastikan Indonesia menguasai lapisan-lapisan kritis dari ekosistem digital nasional.',
      EN: 'Indonesia has a digital economy worth over USD 100 billion — yet most of that value still leaks to foreign infrastructure and platforms. Digital sovereignty is not about isolation, but ensuring Indonesia controls the critical layers of its national digital ecosystem.',
    },
    body2: {
      ID: 'Dari cloud lokal, kecerdasan buatan nasional, hingga platform pembayaran digital yang berdaulat — semua ini harus menjadi prioritas bersama antara BUMN, swasta, dan pemerintah. Indonesianisme 2026 hadir untuk menyatukan visi tersebut menjadi aksi konkret.',
      EN: 'From local cloud, national AI, to sovereign digital payment platforms — all must become shared priorities between SOEs, private sector, and government. Indonesianisme 2026 unites that vision into concrete action.',
    },
  },
];

function QuoteCarousel({ lang }: { lang: 'ID' | 'EN' }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((c) => (c - 1 + tokohQuotes.length) % tokohQuotes.length);
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setCurrent((c) => (c + 1) % tokohQuotes.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (idx: number) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const slide = tokohQuotes[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="overflow-hidden">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid md:grid-cols-[1fr_240px] gap-10 md:gap-14 items-center"
            >
              {/* ── Text ── */}
              <div>
                {/* Opening quote mark */}
                <div className="text-6xl font-serif leading-none mb-2 select-none"
                     style={{ color: 'var(--color-primary)', opacity: 0.25 }}>&ldquo;</div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-5"
                    style={{ color: 'var(--color-text-primary)' }}>
                  {slide.title[lang]}
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-relaxed"
                     style={{ color: 'var(--color-text-secondary)' }}>
                  <p>{slide.body1[lang]}</p>
                  <p>{slide.body2[lang]}</p>
                </div>
              </div>

              {/* ── Photo placeholder ── */}
              <div className="flex flex-col items-center gap-4">
                {/* Card */}
                <div
                  className="relative w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{
                    background: 'linear-gradient(160deg, var(--color-bg-tertiary) 0%, var(--color-bg-card) 100%)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.04]"
                       style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  {/* Person silhouette */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <UserCircle2
                      className="w-24 h-24 md:w-28 md:h-28"
                      style={{ color: 'var(--color-primary)', opacity: 0.18 }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-widest mt-1"
                          style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
                      Foto Pembicara
                    </span>
                  </div>
                  {/* Bottom gradient label */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-4"
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)' }}>
                    <p className="text-white text-xs font-bold leading-tight drop-shadow">{slide.name}</p>
                  </div>
                  {/* Index chip */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                       style={{ background: 'var(--color-primary)', color: '#fff', opacity: 0.85 }}>
                    {current + 1} / {tokohQuotes.length}
                  </div>
                </div>

                {/* Name + role below card */}
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {slide.name}
                  </p>
                  <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--color-text-secondary)', maxWidth: '14rem' }}>
                    {slide.role[lang]}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation: arrows + dots ── */}
        <div className="flex justify-center items-center gap-4 mt-8">
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--glass-border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {tokohQuotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  width: idx === current ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: idx === current ? 'var(--color-primary)' : 'var(--glass-border)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--glass-border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══ Component ═══ */
export default function Home() {
  const { lang, t } = useLang();
  const countdown = useCountdown(SUMMIT_DATE);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc | null>(null);
  const [knowledgeFilter, setKnowledgeFilter] = useState<'Semua' | 'Thought Paper' | 'Policy Brief'>('Semua');
  const [selectedAstaCita, setSelectedAstaCita] = useState<number | null>(null);
  const [selectedSpkPopup, setSelectedSpkPopup] = useState<{
    name: string; title: string; titleEn: string; img: string;
    fieldName: string; fieldNameEn: string; fieldColor: string; fieldGFrom: string; fieldGTo: string;
  } | null>(null);

  const closeSector = useCallback(() => setSelectedSector(null), []);
  const closePillar = useCallback(() => setSelectedPillar(null), []);
  const closeDoc = useCallback(() => setSelectedDoc(null), []);
  const closeAstaCita = useCallback(() => setSelectedAstaCita(null), []);
  const closeSpkPopup = useCallback(() => setSelectedSpkPopup(null), []);

  return (
    <div className="w-full overflow-hidden">

      {/* ═══════ EVENT HEADER STRIP ═══════ */}
      <section style={{ background: 'linear-gradient(135deg, #0d2a6e 0%, #1a3d8f 60%, #0f2060 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Metadata row */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-4 text-[13px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                {lang === 'ID' ? 'Oktober 2026' : 'October 2026'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {lang === 'ID'
                  ? 'Jakarta Convention Center, Jakarta, Indonesia'
                  : 'Jakarta Convention Center, Jakarta, Indonesia'}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-black uppercase leading-none tracking-tight mb-2"
              style={{ color: '#ffffff', fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
            >
              {lang === 'ID' ? 'INDONESIANISME 2026' : 'INDONESIANISME 2026'}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {lang === 'ID'
                ? '80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia'
                : '80 IA-ITB Ideas for 8% Indonesian Economic Growth'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="no-underline hover:no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:brightness-110"
                style={{ background: '#D4A017', color: '#fff' }}
              >
                {lang === 'ID' ? 'Cetak Sertifikat' : 'Print Certificate'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/event#business-matching"
                className="no-underline hover:no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-white/10"
                style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff' }}
              >
                {lang === 'ID' ? 'Business Matching' : 'Business Matching'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about"
                className="no-underline hover:no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-white/10"
                style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff' }}
              >
                {lang === 'ID' ? 'Booklet' : 'Booklet'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#05091a' }}>

        {/* ── HeroBG: dark atmospheric layers + vector elements ── */}
        {/* To use a real image: add imageSrc="/your-hero-image.jpg" */}
        <HeroBG variant="dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-24 lg:py-0 lg:min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full">

            {/* ── Left: Content ── */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', color: 'var(--color-primary-light)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-primary)' }} />
                {lang === 'ID' ? 'Platform Strategis Nasional · IA-ITB' : 'National Strategic Platform · IA-ITB'}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-bold tracking-tight leading-none mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">INDONESIAN</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl gradient-text">ISME 2026</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg font-semibold mb-3"
                style={{ color: 'var(--color-primary)' }}
              >
                {lang === 'ID'
                  ? '80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia'
                  : '80 IA-ITB Ideas for 8% Indonesian Economic Growth'}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm max-w-lg mb-10 leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {lang === 'ID'
                  ? 'Reindustrialisasi, Kedaulatan Teknologi, dan Kemandirian Ekonomi — Menuju Indonesia Berdaulat, Mandiri, dan Berkepribadian'
                  : 'Reindustrialization, Technology Sovereignty, and Economic Independence — Toward a Sovereign, Independent, and Distinguished Indonesia'}
              </motion.p>

              {/* Countdown strip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex gap-3 mb-10"
              >
                {[
                  { val: countdown.days, label: t('days') },
                  { val: countdown.hours, label: t('hours') },
                  { val: countdown.minutes, label: t('minutes') },
                  { val: countdown.seconds, label: t('seconds') },
                ].map((item, i) => (
                  <div key={i} className="glass-card-dark px-3 sm:px-5 py-3 text-center min-w-[60px] sm:min-w-[72px]">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono gradient-text">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-medium mt-0.5 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-3 items-start"
              >
                <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-sm no-underline hover:no-underline">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="btn-secondary inline-flex items-center gap-2 text-sm no-underline hover:no-underline">
                  {t('hero.learn')}
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Visual placeholder ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Main image placeholder */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
                   style={{ border: '1px solid var(--glass-border)', boxShadow: '0 40px 80px rgba(0,0,0,0.25)' }}>
                {/* Gradient fill as placeholder */}
                <div className="absolute inset-0"
                     style={{ background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)' }} />
                {/* Grid overlay on placeholder */}
                <div className="absolute inset-0 opacity-[0.06]"
                     style={{ backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                {/* Centered placeholder label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                       style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}>
                    <Rocket className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Event Hero Image</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>1600 × 1200px · JPG/WebP</p>
                </div>
                {/* Gradient overlay bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32"
                     style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }} />
              </div>

              {/* Floating card — Event Info */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 bottom-8 glass-card-dark p-4 rounded-2xl min-w-[180px]"
                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'var(--color-primary)', opacity: 0.9 }}>
                    <Calendar className="w-4 h-4" style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Tanggal</p>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Oktober 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Jakarta, Indonesia</p>
                </div>
              </motion.div>

              {/* Floating card — Stat */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-6 top-8 glass-card-dark p-4 rounded-2xl"
                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Gagasan Strategis</p>
                <p className="text-3xl font-bold gradient-text font-mono">80</p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>Lintas 6 Pilar Karya</p>
              </motion.div>

              {/* Floating chip — Speakers */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute right-4 bottom-16 glass-card-dark px-4 py-2.5 rounded-full flex items-center gap-2"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="w-6 h-6 rounded-full flex-shrink-0 border-2 overflow-hidden"
                         style={{ borderColor: 'var(--color-bg-card)', background: 'var(--color-bg-tertiary)' }}>
                      <div className="w-full h-full" style={{ background: `hsl(${n * 80},40%,60%)` }} />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                  {lang === 'ID' ? '500+ Peserta' : '500+ Attendees'}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
        </motion.div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Indonesianisme 2026 dalam Angka:' : 'Indonesianisme 2026 in Numbers:'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="overflow-hidden rounded-2xl flex flex-col cursor-default"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Colored category header */}
                  <div
                    className="px-4 py-2.5 flex items-center gap-2"
                    style={{ background: stat.color }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(255,255,255,0.9)' }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
                      {lang === 'ID' ? stat.categoryId : stat.categoryEn}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="px-4 pt-5 pb-5 flex flex-col gap-1 flex-1" style={{ background: stat.bg }}>
                    <CounterAnimation
                      target={stat.target}
                      suffix={stat.suffix}
                      duration={1600}
                      className="text-4xl sm:text-5xl font-black leading-none"
                      style={{ color: stat.color }}
                    />
                    <div className="text-xs font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>
                      {lang === 'ID' ? stat.labelId : stat.labelEn}
                    </div>
                    <p className="text-[11px] leading-relaxed mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {lang === 'ID' ? stat.descId : stat.descEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ TOKOH QUOTE CAROUSEL ═══════ */}
      <QuoteCarousel lang={lang} />

      {/* ═══════ THE GROWTH GAP — KEY CONTEXT ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
                {lang === 'ID' ? 'Mengapa Ini Penting' : 'Why This Matters'}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                {lang === 'ID' ? 'Menutup Gap Pertumbuhan 3%' : 'Closing the 3% Growth Gap'}
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'ID'
                  ? 'Pertumbuhan 8% adalah keharusan matematis untuk keluar dari Middle Income Trap sebelum jendela demografi tertutup pada 2035. PDB saat ini tertahan di 5.11% — dibutuhkan intervensi radikal. Kontribusi manufaktur terus merosot dari 22% (2010) ke 19% (2024), sementara fragmentasi rantai pasok global membuka peluang China+1 strategy.'
                  : '8% growth is a mathematical imperative to escape the Middle Income Trap before the demographic window closes in 2035. GDP is stuck at 5.11% — intervention is critical. Manufacturing contribution declined from 22% (2010) to 19% (2024), while global supply chain fragmentation opens China+1 strategy opportunities.'}
              </p>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'ID'
                  ? 'Indonesia memiliki modal fundamental berskala global: 285 juta penduduk, cadangan nikel #1 dunia, geotermal 40% cadangan global, ekonomi digital USD 100B+, dan konsolidasi modal via Danantara (USD 900B).'
                  : 'Indonesia has world-scale fundamental assets: 285 million people, #1 global nickel reserves, 40% of global geothermal reserves, USD 100B+ digital economy, and capital consolidation via Danantara (USD 900B).'}
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2 no-underline hover:no-underline">
                {t('about.link')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Key Data Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: TrendingUp, value: '5.1%', label: 'PDB Saat Ini', labelEn: 'Current GDP', sub: 'Target: 8.0%', color: '#EF4444' },
                { icon: Users, value: '285 Jt', label: 'Populasi', labelEn: 'Population', sub: 'Bonus Demografi', color: '#3B82F6' },
                { icon: Battery, value: '#1', label: 'Cadangan Nikel', labelEn: 'Nickel Reserves', sub: 'Global Leader', color: '#10B981' },
                { icon: BarChart3, value: '$900B', label: 'Danantara', labelEn: 'Danantara', sub: 'Super-Holding', color: '#F59E0B' },
              ].map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="glass-card-dark p-5 text-center cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                         style={{ background: `${v.color}15`, color: v.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: v.color }}>{v.value}</div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                      {lang === 'ID' ? v.label : v.labelEn}
                    </h4>
                    <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{v.sub}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ ASTA CITA — 8 NATIONAL PRIORITY RESEARCH FIELDS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              {lang === 'ID' ? 'Selaras dengan Asta Cita Pemerintah' : 'Aligned with the Government\'s Asta Cita'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Asta Cita: 8 Bidang Prioritas Riset Nasional' : 'Asta Cita: 8 National Priority Research Fields'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Klik setiap bidang untuk melihat fokus riset, data kunci, dan agenda strategis yang kami kembangkan.'
                : 'Click each field to explore research focus areas, key data, and strategic agenda we are developing.'}
            </p>
          </motion.div>

          {/* 4-column grid: 8 main cards + 1 centered */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {astaCitaFields.slice(0, 8).map((field, i) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedAstaCita(i)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group h-44 sm:h-52"
                  style={{
                    background: `linear-gradient(135deg, ${field.gFrom} 0%, ${field.gTo} 100%)`,
                  }}
                >
                  {/* Subtle noise texture layer */}
                  <div className="absolute inset-0 opacity-[0.08]"
                       style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
                  {/* Ambient radial — always on, brightens on hover */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)` }}
                  />
                  {/* Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex items-center justify-center">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Click hint */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4 text-white/80" />
                  </div>
                  {/* Label bar */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-3"
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
                    <p className="text-white font-semibold text-xs sm:text-sm leading-tight drop-shadow-sm">
                      {lang === 'ID' ? field.name : field.nameEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 9th card — Frontier Science — centered */}
          {astaCitaFields[8] && (() => {
            const field = astaCitaFields[8];
            const Icon = field.icon;
            return (
              <div className="flex justify-center mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedAstaCita(8)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group h-44 sm:h-52 w-full sm:w-[calc(25%-0.75rem)]"
                  style={{
                    background: `linear-gradient(135deg, ${field.gFrom} 0%, ${field.gTo} 100%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.08]"
                       style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)` }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex items-center justify-center">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-3"
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}>
                    <p className="text-white font-semibold text-xs sm:text-sm leading-tight drop-shadow-sm">
                      {lang === 'ID' ? field.name : field.nameEn}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Asta Cita Detail Modal */}
      <CardModal
        isOpen={selectedAstaCita !== null}
        onClose={closeAstaCita}
        title={selectedAstaCita !== null ? (lang === 'ID' ? astaCitaFields[selectedAstaCita].name : astaCitaFields[selectedAstaCita].nameEn) : ''}
        accent={selectedAstaCita !== null ? astaCitaFields[selectedAstaCita].color : undefined}
      >
        {selectedAstaCita !== null && (() => {
          const f = astaCitaFields[selectedAstaCita];
          const Icon = f.icon;
          return (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${f.gFrom}, ${f.gTo})` }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: f.color }}>
                    {lang === 'ID' ? f.taglineId : f.taglineEn}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'ID' ? f.descId : f.descEn}
              </p>

              {/* Key Facts */}
              <div className="mb-5 p-4 rounded-xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: f.color }}>
                  {lang === 'ID' ? 'Data & Fakta Kunci' : 'Key Data & Facts'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(lang === 'ID' ? f.factsId : f.factsEn).map((fact, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: f.color }} />
                      {fact}
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Focus — 2-column grid */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: f.color }}>
                  {lang === 'ID' ? 'Fokus Riset & Agenda Strategis' : 'Research Focus & Strategic Agenda'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(lang === 'ID' ? f.focusId : f.focusEn).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl text-sm"
                      style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', color: 'var(--color-text-primary)' }}
                    >
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-white mt-0.5"
                        style={{ background: f.color }}
                      >
                        {(() => { const Icon = f.focusIcons[i]; return <Icon className="w-3.5 h-3.5" />; })()}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers — 4-column grid, multi-row, clickable */}
              {'speakers' in f && Array.isArray(f.speakers) && f.speakers.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: f.color }}>
                    {lang === 'ID' ? 'Pembicara Terkait' : 'Related Speakers'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(f.speakers as { name: string; title: string; titleEn: string; img: string }[]).map((spk, si) => (
                      <button
                        key={si}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSpkPopup({
                            ...spk,
                            fieldName: f.name,
                            fieldNameEn: f.nameEn,
                            fieldColor: f.color,
                            fieldGFrom: f.gFrom,
                            fieldGTo: f.gTo,
                          });
                        }}
                        className="flex flex-col items-center text-center p-3 rounded-xl group transition-all duration-200 cursor-pointer w-full"
                        style={{ background: 'var(--color-bg-card)', border: `1px solid var(--glass-border)` }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = f.color + '50')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 transition-transform duration-200 group-hover:scale-105"
                          style={{ '--tw-ring-color': f.color + '40' } as React.CSSProperties}>
                          <img src={spk.img} alt={spk.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-semibold leading-tight mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                          {spk.name}
                        </p>
                        <p className="text-[10px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>
                          {lang === 'ID' ? spk.title : spk.titleEn}
                        </p>
                        <span className="mt-2 text-[9px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: f.color }}>
                          {lang === 'ID' ? 'Lihat Profil' : 'View Profile'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link
                  href="/topics"
                  onClick={closeAstaCita}
                  className="btn-primary inline-flex items-center gap-2 text-sm no-underline hover:no-underline"
                >
                  {lang === 'ID' ? 'Lihat Semua Topik & Gagasan' : 'View All Topics & Ideas'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })()}
      </CardModal>

      {/* ═══════ SPEAKER DETAIL POPUP ═══════ */}
      <CardModal
        isOpen={selectedSpkPopup !== null}
        onClose={closeSpkPopup}
        title={selectedSpkPopup?.name}
        accent={selectedSpkPopup?.fieldColor}
      >
        {selectedSpkPopup && (
          <div>
            {/* Gradient banner + floating avatar */}
            <div className="relative h-28 -mx-6 -mt-4 rounded-t-xl overflow-hidden mb-14">
              <div className="absolute inset-0"
                   style={{ background: `linear-gradient(135deg, ${selectedSpkPopup.fieldGFrom} 0%, ${selectedSpkPopup.fieldGTo} 100%)` }} />
              <div className="absolute inset-0 opacity-[0.07]"
                   style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4"
                     style={{ borderColor: 'var(--color-bg-secondary)', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
                  <img src={selectedSpkPopup.img} alt={selectedSpkPopup.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Name + title */}
            <div className="text-center mb-5">
              <h4 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {selectedSpkPopup.name}
              </h4>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'ID' ? selectedSpkPopup.title : selectedSpkPopup.titleEn}
              </p>
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${selectedSpkPopup.fieldColor}15`, color: selectedSpkPopup.fieldColor, border: `1px solid ${selectedSpkPopup.fieldColor}30` }}>
                {lang === 'ID' ? selectedSpkPopup.fieldName : selectedSpkPopup.fieldNameEn}
              </span>
            </div>

            {/* Bio placeholder */}
            <div className="p-4 rounded-xl mb-5"
                 style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: selectedSpkPopup.fieldColor }}>
                {lang === 'ID' ? 'Biografi' : 'Biography'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {lang === 'ID'
                  ? 'Biografi lengkap pembicara akan segera tersedia. Pantau terus halaman pembicara untuk profil detail, sesi, dan topik yang akan disampaikan.'
                  : 'Full speaker biography will be available soon. Stay tuned to the speakers page for detailed profiles, sessions, and topics to be presented.'}
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/speakers"
                onClick={closeSpkPopup}
                className="btn-primary inline-flex items-center gap-2 text-sm no-underline hover:no-underline"
              >
                {lang === 'ID' ? 'Lihat Semua Pembicara' : 'View All Speakers'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </CardModal>

      {/* ═══════ 8 PRIORITY SECTORS — INTERACTIVE ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              {lang === 'ID' ? '8 Sektor Prioritas — Mesin Pertumbuhan' : '8 Priority Sectors — Growth Engines'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Mesin Pertumbuhan Ekonomi' : 'Economic Growth Engines'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Klik setiap sektor untuk melihat 5 gagasan strategis beserta peran BODI.'
                : 'Click each sector to see 5 strategic ideas with their BODI framework roles.'}
            </p>
          </motion.div>

          {/* Row 1 — light cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {sectors.slice(0, 4).map((s, i) => {
              const Icon = s.icon;
              const num = String(i + 1).padStart(2, '0');
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSector(i)}
                  className="relative cursor-pointer group rounded-2xl p-5 overflow-hidden"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--glass-border)',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = s.color + '60';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${s.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  {/* Animated top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl"
                       style={{ background: s.color }} />

                  {/* Number badge */}
                  <span className="absolute top-4 right-4 text-xs font-bold tabular-nums"
                        style={{ color: 'var(--color-text-muted)', opacity: 0.45 }}>{num}</span>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                         style={{ background: `${s.color}15`, color: s.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 pr-5">
                      <p className="text-sm font-bold mb-1 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                        {lang === 'ID' ? s.name : s.nameEn}
                      </p>
                      <p className="text-xs font-medium leading-snug" style={{ color: s.color }}>
                        {lang === 'ID' ? s.keyData : s.keyDataEn}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between"
                       style={{ borderTop: '1px solid var(--glass-border)' }}>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${s.color}12`, color: s.color }}>
                      5 {lang === 'ID' ? 'Gagasan' : 'Ideas'}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                          style={{ color: s.color }}>
                      {lang === 'ID' ? 'Lihat' : 'Open'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2 — tinted colored cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.slice(4, 8).map((s, i) => {
              const Icon = s.icon;
              const num = String(i + 5).padStart(2, '0');
              return (
                <motion.div
                  key={i + 4}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.32 + i * 0.08 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSector(i + 4)}
                  className="relative cursor-pointer group rounded-2xl p-5 overflow-hidden"
                  style={{
                    background: `${s.color}10`,
                    border: `1px solid ${s.color}30`,
                    transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${s.color}1e`;
                    (e.currentTarget as HTMLElement).style.borderColor = s.color + '55';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${s.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${s.color}10`;
                    (e.currentTarget as HTMLElement).style.borderColor = s.color + '30';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  {/* Decorative bg orb */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                       style={{ background: s.color, filter: 'blur(24px)' }} />

                  {/* Number badge */}
                  <span className="absolute top-4 right-4 text-xs font-bold tabular-nums"
                        style={{ color: s.color, opacity: 0.5 }}>{num}</span>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                         style={{ background: `${s.color}22`, color: s.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 pr-5">
                      <p className="text-sm font-bold mb-1 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                        {lang === 'ID' ? s.name : s.nameEn}
                      </p>
                      <p className="text-xs font-medium leading-snug" style={{ color: s.color }}>
                        {lang === 'ID' ? s.keyData : s.keyDataEn}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between"
                       style={{ borderTop: `1px solid ${s.color}20` }}>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${s.color}20`, color: s.color }}>
                      5 {lang === 'ID' ? 'Gagasan' : 'Ideas'}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                          style={{ color: s.color }}>
                      {lang === 'ID' ? 'Lihat' : 'Open'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sector Detail Modal */}
      <CardModal
        isOpen={selectedSector !== null}
        onClose={closeSector}
        title={selectedSector !== null ? (lang === 'ID' ? sectors[selectedSector].name : sectors[selectedSector].nameEn) : ''}
        accent={selectedSector !== null ? sectors[selectedSector].color : undefined}
      >
        {selectedSector !== null && (() => {
          const s = sectors[selectedSector];
          return (
            <div>
              {/* Sector Overview */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: `${s.color}15`, color: s.color }}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: s.color }}>
                    {lang === 'ID' ? s.keyData : s.keyDataEn}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {lang === 'ID' ? s.desc : s.descEn}
                  </p>
                </div>
              </div>

              {/* BODI Legend */}
              <div className="flex flex-wrap gap-2 mb-5 p-3 rounded-xl" style={{ background: 'var(--color-bg-card)' }}>
                {Object.entries(bodiColors).map(([role, color]) => (
                  <span key={role} className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg"
                        style={{ background: `${color}15`, color }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    {role}
                  </span>
                ))}
              </div>

              {/* 5 Ideas */}
              <div className="space-y-3">
                {s.ideas.map((idea) => (
                  <div key={idea.id}
                       className="p-4 rounded-xl transition-all duration-200"
                       style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                            style={{ background: `${bodiColors[idea.role]}20`, color: bodiColors[idea.role] }}>
                        #{idea.id}
                      </span>
                      <div className="flex-1">
                        <h5 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                          {lang === 'ID' ? idea.title : idea.titleEn}
                        </h5>
                        <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${bodiColors[idea.role]}15`, color: bodiColors[idea.role] }}>
                          {idea.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-center">
                <Link href="/topics" onClick={closeSector}
                      className="btn-primary inline-flex items-center gap-2 text-sm no-underline hover:no-underline">
                  {lang === 'ID' ? 'Lihat Semua Sektor & Gagasan' : 'View All Sectors & Ideas'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })()}
      </CardModal>

      {/* ═══════ 6 STRATEGIC PILLARS — INTERACTIVE ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Kerangka Filosofis' : 'Philosophical Framework'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {t('pillars.title')}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Klik setiap pilar untuk melihat detail gagasan, sektor terkait, dan langkah implementasi.'
                : 'Click each pillar for detailed ideas, related sectors, and implementation steps.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPillar(idx)}
                  className="glass-card-dark p-6 cursor-pointer group relative overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ background: pillar.color }} />
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                       style={{ background: `radial-gradient(circle at 50% 0%, ${pillar.color}10 0%, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                         style={{ background: `${pillar.color}15`, color: pillar.color }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      {lang === 'ID' ? pillar.title : pillar.titleEn}
                    </h3>
                    <p className="text-xs italic mb-3" style={{ color: pillar.color }}>
                      &ldquo;{lang === 'ID' ? pillar.quote : pillar.quoteEn}&rdquo;
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {lang === 'ID' ? pillar.desc : pillar.descEn}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                         style={{ color: pillar.color }}>
                      {lang === 'ID' ? 'Lihat Detail' : 'View Details'} <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/topics" className="btn-primary inline-flex items-center gap-2 no-underline hover:no-underline">
              {t('pillars.all')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ PILAR KARYA ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>
                Abdi Karya Ganesha memajukan Indonesia
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Tema & Pilar Karya
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Abdi yang mencitrakan semangat diri untuk mewujudkan suatu karya nyata dalam membangun Indonesia menjadi negara yang{' '}
                <strong style={{ color: 'var(--color-text-primary)' }}>berdaulat, berdaya saing, dan berdikari</strong>.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-card-dark p-6 border-l-4"
              style={{ borderLeftColor: 'var(--color-primary)' }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Tema Utama</p>
              <p className="font-bold text-lg leading-snug mb-3" style={{ color: 'var(--color-text-primary)' }}>
                80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Reindustrialisasi, Kedaulatan Teknologi, dan Transformasi Struktural Menuju Kemandirian Bangsa
              </p>
            </motion.div>
          </div>

          {/* Column Headers */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 mb-3 px-1">
            {['Pilar Karya', 'Subtema', 'Topik Pembahasan'].map((h) => (
              <p key={h} className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{h}</p>
            ))}
          </div>

          {/* Pillar Rows */}
          <div className="space-y-3">
            {pilarKarya.map((pilar, idx) => {
              const Icon = pilar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="glass-card-dark rounded-2xl overflow-hidden grid lg:grid-cols-3 gap-0 group hover:border-opacity-60 transition-all duration-300"
                  style={{ borderColor: `${pilar.color}20` }}
                >
                  {/* Col 1: Pilar Name */}
                  <div
                    className="p-5 flex items-center gap-4"
                    style={{ background: `${pilar.color}10`, borderRight: `1px solid ${pilar.color}15` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${pilar.color}20`, color: pilar.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: pilar.color }}>
                        Pilar {idx + 1}
                      </p>
                      <h3 className="font-bold text-sm leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                        {pilar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Col 2: Subtema */}
                  <div className="p-5 flex items-center" style={{ borderRight: `1px solid ${pilar.color}10` }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {pilar.subtema}
                    </p>
                  </div>

                  {/* Col 3: Topik Pembahasan */}
                  <div className="p-5 flex flex-col justify-center gap-2">
                    {pilar.topik.map((topik, ti) => (
                      <div
                        key={ti}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg"
                        style={{ background: `${pilar.color}08`, borderLeft: `2px solid ${pilar.color}50` }}
                      >
                        <span
                          className="text-[10px] font-bold mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: `${pilar.color}20`, color: pilar.color }}
                        >
                          {ti + 1}
                        </span>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{topik}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/topics" className="btn-primary inline-flex items-center gap-2 no-underline hover:no-underline">
              Jelajahi Semua Topik
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pillar Detail Modal */}
      <CardModal
        isOpen={selectedPillar !== null}
        onClose={closePillar}
        title={selectedPillar !== null ? (lang === 'ID' ? pillars[selectedPillar].title : pillars[selectedPillar].titleEn) : ''}
        accent={selectedPillar !== null ? pillars[selectedPillar].color : undefined}
      >
        {selectedPillar !== null && (() => {
          const p = pillars[selectedPillar];
          return (
            <div>
              {/* Quote */}
              <div className="p-4 rounded-xl mb-5" style={{ background: `${p.color}08`, borderLeft: `3px solid ${p.color}` }}>
                <p className="text-sm italic font-medium" style={{ color: p.color }}>
                  &ldquo;{lang === 'ID' ? p.quote : p.quoteEn}&rdquo;
                </p>
              </div>

              {/* Description */}
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {lang === 'ID' ? p.desc : p.descEn}
              </p>

              {/* Key Initiatives */}
              <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {lang === 'ID' ? 'Inisiatif Kunci:' : 'Key Initiatives:'}
              </h4>
              <div className="space-y-2 mb-5">
                {(lang === 'ID' ? p.details : p.detailsEn).map((detail, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                       style={{ background: 'var(--color-bg-card)' }}>
                    <span className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                          style={{ background: `${p.color}15`, color: p.color }}>
                      {i + 1}
                    </span>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{detail}</p>
                  </div>
                ))}
              </div>

              {/* Related Sectors */}
              <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                {lang === 'ID' ? 'Sektor Terkait:' : 'Related Sectors:'}
              </h4>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.relatedSectors.map((sector, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}30` }}>
                    {sector}
                  </span>
                ))}
              </div>

              <div className="text-center">
                <Link href="/topics" onClick={closePillar}
                      className="btn-primary inline-flex items-center gap-2 text-sm no-underline hover:no-underline">
                  {lang === 'ID' ? 'Jelajahi Semua Pilar' : 'Explore All Pillars'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })()}
      </CardModal>

      {/* ═══════ 8 SUPPORTING SECTORS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header — split layout */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-secondary)' }}>
                {lang === 'ID' ? '8 Sektor Pendukung — 40 Gagasan' : '8 Supporting Sectors — 40 Ideas'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {lang === 'ID' ? 'Ekosistem Penunjang Pertumbuhan' : 'Growth Support Ecosystem'}
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Delapan sektor pendukung yang esensial untuk mendorong pertumbuhan holistik dan berkelanjutan.'
                : 'Eight supporting sectors essential for driving holistic and sustainable growth.'}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {supportingSectors.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl flex flex-col cursor-pointer"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full shrink-0 transition-all duration-300 group-hover:h-1.5" style={{ background: s.color }} />

                  <div className="p-5 flex flex-col flex-1 relative z-10">
                    {/* Icon + idea count row */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${s.color}18`, color: s.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded-full leading-none"
                        style={{ background: `${s.color}15`, color: s.color }}
                      >
                        {s.ideas.length} {lang === 'ID' ? 'gagasan' : 'ideas'}
                      </span>
                    </div>

                    {/* Sector name */}
                    <p className="text-sm font-bold leading-snug mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {lang === 'ID' ? s.name : s.nameEn}
                    </p>

                    {/* Key data */}
                    <p className="text-[11px] font-semibold mb-3 leading-tight" style={{ color: s.color }}>
                      {lang === 'ID' ? s.keyData : s.keyDataEn}
                    </p>

                    {/* Ideas preview — revealed on hover via max-h transition */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300 space-y-1.5">
                      {s.ideas.slice(0, 3).map((idea, ii) => (
                        <div key={ii} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full mt-[5px] shrink-0" style={{ background: s.color }} />
                          <p className="text-[10px] leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                            {lang === 'ID' ? idea.title : (idea.titleEn ?? idea.title)}
                          </p>
                        </div>
                      ))}
                      {s.ideas.length > 3 && (
                        <p className="text-[10px] pl-2.5 font-semibold" style={{ color: s.color }}>
                          +{s.ideas.length - 3} {lang === 'ID' ? 'lainnya' : 'more'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Glow overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 20% 10%, ${s.color}0d 0%, transparent 55%)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ PLATFORM ARCHITECTURE ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Arsitektur Platform' : 'Platform Architecture'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? '5 Komponen Terintegrasi' : '5 Integrated Components'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Indonesianisme 2026 bukan sekadar acara satu kali — ini adalah platform strategis jangka panjang dengan 5 komponen.'
                : 'Indonesianisme 2026 is not just a one-time event — it is a long-term strategic platform with 5 components.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {platformArch.map((comp, idx) => {
              const Icon = comp.icon;
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
              const c = colors[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card-dark p-5 text-center group"
                >
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                       style={{ background: `${c}15`, color: c }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {lang === 'ID' ? comp.title : comp.titleEn}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ID' ? comp.desc : comp.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ KNOWLEDGE PLATFORM ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              Knowledge Platform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Thought Papers &amp; Policy Briefs
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Analisis mendalam dan rekomendasi kebijakan dari para pemikir dan praktisi terbaik Indonesia.'
                : "In-depth analysis and policy recommendations from Indonesia's leading thinkers and practitioners."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {(['Semua', 'Thought Paper', 'Policy Brief'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setKnowledgeFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={knowledgeFilter === f
                  ? { background: 'var(--color-secondary)', color: '#fff', boxShadow: '0 0 16px rgba(20,184,166,0.3)' }
                  : { background: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }
                }
              >
                {f}
              </button>
            ))}
          </div>

          {(() => {
            const visible = knowledgeDocs.filter(d => knowledgeFilter === 'Semua' || d.type === knowledgeFilter);
            const featured = visible[0];
            const rest = visible.slice(1);
            if (!featured) return null;
            const isTP = featured.type === 'Thought Paper';
            return (
              <>
                <motion.div
                  key={`feat-${featured.id}-${knowledgeFilter}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedDoc(featured)}
                  className="glass-card-dark overflow-hidden mb-8 cursor-pointer group"
                  style={{ border: `1px solid ${isTP ? 'rgba(245,158,11,0.25)' : 'rgba(20,184,166,0.25)'}` }}
                  whileHover={{ scale: 1.005, y: -2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-1 flex items-center justify-center min-h-[140px]"
                      style={{ background: isTP ? 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))' : 'linear-gradient(135deg,rgba(20,184,166,0.12),rgba(13,148,136,0.06))' }}>
                      <div className="text-center px-6 py-6">
                        <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl font-black"
                          style={{ background: isTP ? 'rgba(245,158,11,0.2)' : 'rgba(20,184,166,0.2)', color: isTP ? '#F59E0B' : '#14B8A6' }}>
                          {isTP ? 'TP' : 'PB'}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest block"
                          style={{ color: isTP ? '#F59E0B' : '#14B8A6' }}>
                          {featured.type}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-4 p-7 md:p-9">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featured.tags.map(tag => (
                          <span key={tag} className="text-[11px] px-2 py-0.5 rounded font-medium"
                            style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--color-text-primary)' }}>
                        {lang === 'ID' ? featured.title : featured.titleEn}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        {lang === 'ID' ? featured.subtitle : featured.subtitleEn}
                      </p>
                      <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                        {lang === 'ID' ? featured.abstract : featured.abstractEn}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3 flex-wrap text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          <span>{featured.authors}</span>
                          <span>·</span>
                          <span>{featured.date}</span>
                          <span>·</span>
                          <span>{featured.readTime}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: isTP ? '#F59E0B' : '#14B8A6' }}>
                          {lang === 'ID' ? 'Baca Selengkapnya' : 'Read More'}
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {rest.map((doc, idx) => {
                      const tp = doc.type === 'Thought Paper';
                      return (
                        <motion.div
                          key={doc.id}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          onClick={() => setSelectedDoc(doc)}
                          className="glass-card-dark flex flex-col cursor-pointer group overflow-hidden relative"
                          style={{ border: `1px solid ${tp ? 'rgba(245,158,11,0.12)' : 'rgba(20,184,166,0.12)'}` }}
                          whileHover={{ y: -4, scale: 1.015 }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            style={{ background: tp ? 'linear-gradient(90deg,#F59E0B,#D97706)' : 'linear-gradient(90deg,#14B8A6,#0D9488)' }} />
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                style={{ background: tp ? 'rgba(245,158,11,0.12)' : 'rgba(20,184,166,0.12)', color: tp ? '#F59E0B' : '#14B8A6' }}>
                                {doc.type}
                              </span>
                              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{doc.readTime}</span>
                            </div>
                            <h4 className="text-base font-bold mb-2 leading-snug line-clamp-2"
                              style={{ color: 'var(--color-text-primary)' }}>
                              {lang === 'ID' ? doc.title : doc.titleEn}
                            </h4>
                            <p className="text-xs mb-4 leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--color-text-muted)' }}>
                              {lang === 'ID' ? doc.abstract : doc.abstractEn}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {doc.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded"
                                  style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="pt-4 flex items-center justify-between"
                              style={{ borderTop: '1px solid var(--color-border)' }}>
                              <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{doc.date}</span>
                              <span className="text-xs font-semibold flex items-center gap-1"
                                style={{ color: tp ? '#F59E0B' : '#14B8A6' }}>
                                {lang === 'ID' ? 'Baca' : 'Read'}
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </>
            );
          })()}

          <div className="mt-10 text-center">
            <Link href="/publications" className="btn-secondary inline-flex items-center gap-2 no-underline hover:no-underline">
              {lang === 'ID' ? 'Lihat Semua Publikasi' : 'View All Publications'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Knowledge Doc Modal ═══ */}
      <CardModal
        isOpen={!!selectedDoc}
        onClose={closeDoc}
        title={selectedDoc ? (lang === 'ID' ? selectedDoc.title : selectedDoc.titleEn) : ''}
        accent={selectedDoc?.type === 'Thought Paper' ? '#F59E0B' : '#14B8A6'}
      >
        {selectedDoc && (() => {
          const isTP = selectedDoc.type === 'Thought Paper';
          const accent = isTP ? '#F59E0B' : '#14B8A6';
          const accentBg = isTP ? 'rgba(245,158,11,0.08)' : 'rgba(20,184,166,0.08)';
          const accentBorder = isTP ? 'rgba(245,158,11,0.2)' : 'rgba(20,184,166,0.2)';
          return (
            <div>
              {/* ── Cover image ── */}
              <div className="relative -mx-6 -mt-4 mb-6 overflow-hidden" style={{ height: '200px' }}>
                <img
                  src={selectedDoc.coverImg}
                  alt={selectedDoc.title}
                  className="w-full h-full object-cover"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)' }} />
                {/* type badge on image */}
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm"
                    style={{ background: `${accent}CC`, color: '#fff' }}>
                    <BookOpen className="w-3 h-3" />
                    {selectedDoc.type}
                  </span>
                  <span className="text-xs px-2.5 py-1.5 rounded-full backdrop-blur-sm font-medium"
                    style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.85)' }}>
                    {selectedDoc.readTime}
                  </span>
                </div>
              </div>

              {/* ── Tags ── */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDoc.tags.map(tag => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded"
                    style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* ── Subtitle + meta ── */}
              <p className="text-sm font-semibold mb-1" style={{ color: accent }}>
                {lang === 'ID' ? selectedDoc.subtitle : selectedDoc.subtitleEn}
              </p>
              <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
                {selectedDoc.authors} · {selectedDoc.date}
              </p>

              {/* ── PDF download button ── */}
              <a
                href={selectedDoc.pdfUrl}
                download
                className="flex items-center gap-3 w-full p-4 rounded-xl mb-6 transition-all group/pdf"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: accent }}>
                  <FileDown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {lang === 'ID' ? 'Unduh PDF' : 'Download PDF'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ID' ? 'Dokumen lengkap tersedia untuk diunduh' : 'Full document available for download'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 group-hover/pdf:translate-x-1 transition-transform" style={{ color: accent }} />
              </a>

              {/* ── Abstract ── */}
              <div className="rounded-xl p-4 mb-6"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>
                  {lang === 'ID' ? 'Abstrak' : 'Abstract'}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {lang === 'ID' ? selectedDoc.abstract : selectedDoc.abstractEn}
                </p>
              </div>

              {/* ── Sections ── */}
              <div className="space-y-6">
                {selectedDoc.sections.map((sec, i) => (
                  <div key={i}>
                    <h4 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      {i + 1}. {lang === 'ID' ? sec.heading : sec.headingEn}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {lang === 'ID' ? sec.body : sec.bodyEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </CardModal>

      {/* ═══════ WORLD LEADING SPEAKERS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Narasumber' : 'Speakers'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Pembicara Kelas Dunia' : 'World Leading Speakers'}
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Menghadirkan para tokoh terdepan — pemimpin pemerintahan, akademisi, dan pelaku industri'
                : 'Inviting top-tier leaders from government, academia, and industry'}
            </p>
          </div>

          {/* Featured Speaker */}
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center group"
            >
              <div className="relative w-36 h-36 mx-auto mb-4">
                <div
                  className="w-full h-full rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    outline: '3px solid var(--color-primary)',
                    outlineOffset: '4px',
                    boxShadow: '0 0 32px color-mix(in srgb, var(--color-primary) 35%, transparent)',
                  }}
                >
                  <Image
                    src={featuredSpeaker.img}
                    alt={featuredSpeaker.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Keynote badge */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  Keynote
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 mt-2" style={{ color: 'var(--color-text-primary)' }}>
                {featuredSpeaker.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {lang === 'ID' ? featuredSpeaker.title : featuredSpeaker.titleEn}
              </p>
            </motion.div>
          </div>

          {/* Divider line */}
          <div className="flex items-center gap-4 mb-10 max-w-lg mx-auto">
            <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID' ? 'Pembicara Lainnya' : 'Featured Speakers'}
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--glass-border)' }} />
          </div>

          {/* Secondary Speakers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-12">
            {speakers.map((speaker, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="glass-card-dark p-4 text-center group"
              >
                <div
                  className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden transition-all duration-300 group-hover:outline-2 group-hover:outline-offset-2"
                  style={{ outlineColor: 'var(--color-primary)' } as React.CSSProperties}
                >
                  <Image src={speaker.img} alt={speaker.name} width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{speaker.name}</h4>
                <p className="text-[11px] mb-2 leading-tight" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'ID' ? speaker.title : speaker.titleEn}
                </p>
                <span
                  className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--color-bg-card)', color: 'var(--color-secondary)', border: '1px solid color-mix(in srgb, var(--color-secondary) 25%, transparent)' }}
                >
                  {lang === 'ID' ? speaker.topic : speaker.topicEn}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/speakers" className="btn-secondary inline-flex items-center gap-2 no-underline hover:no-underline">
              {t('speakers.all')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ EVENTS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              {lang === 'ID' ? 'Jadwal' : 'Schedule'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {t('events.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card-dark p-6 relative overflow-hidden group"
              >
                {idx === 2 && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-primary)' }} />
                )}
                {idx === 2 && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold"
                       style={{ background: 'var(--color-primary)', color: '#FFFFFF' }}>
                    HIGHLIGHT
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{event.date}</span>
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {lang === 'ID' ? event.title : event.titleEn}
                </h4>
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {lang === 'ID' ? event.desc : event.descEn}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{event.location}</span>
                </div>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: event.status === 'open' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                        color: event.status === 'open' ? '#10B981' : '#3B82F6',
                      }}>
                  {lang === 'ID' ? event.statusLabel : event.statusLabelEn}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/calendar" className="btn-secondary inline-flex items-center gap-2 no-underline hover:no-underline">
              {t('events.all')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ BODI FRAMEWORK VISUALIZATION ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Distribusi Portofolio' : 'Portfolio Distribution'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Kerangka BODI — 80 Gagasan' : 'BODI Framework — 80 Ideas'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Backbone', pct: '40%', count: 32, desc: 'Infrastruktur fundamental: digital, logistik, tata kelola, energi dasar', descEn: 'Fundamental infrastructure: digital, logistics, governance, basic energy', icon: Building2, color: '#3B82F6' },
              { role: 'Defensive', pct: '30%', count: 24, desc: 'Substitusi impor: pangan, kesehatan/farmasi, mesin perkakas', descEn: 'Import substitution: food, health/pharma, machine tools', icon: Shield, color: '#10B981' },
              { role: 'Offensive', pct: '20%', count: 16, desc: 'Daya saing global: baterai EV, pariwisata, industri kreatif', descEn: 'Global competitiveness: EV batteries, tourism, creative industry', icon: Rocket, color: '#F59E0B' },
              { role: 'Image Leading', pct: '10%', count: 8, desc: 'High-tech & prestise: dirgantara, pertahanan, AI, semikonduktor', descEn: 'High-tech & prestige: aerospace, defense, AI, semiconductors', icon: Star, color: '#EC4899' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card-dark p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: item.color }} />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                         style={{ background: `${item.color}15`, color: item.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold" style={{ color: item.color }}>{item.role}</h4>
                      <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{item.count} {lang === 'ID' ? 'gagasan' : 'ideas'}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-3" style={{ color: item.color }}>{item.pct}</div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full mb-3" style={{ background: 'var(--color-bg-card)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: item.pct, background: item.color }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {lang === 'ID' ? item.desc : item.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ TRIPLE-LENS ANALYSIS FRAMEWORK ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Kerangka Analisis' : 'Analysis Framework'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Tiga Lensa Strategis' : 'Three Strategic Lenses'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Setiap gagasan dianalisis melalui tiga lensa untuk memastikan ketajaman dan relevansi strategis.'
                : 'Every idea is analyzed through three lenses to ensure strategic sharpness and relevance.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { abbr: 'VRIO', full: 'Value, Rarity, Imitability, Organization', fullId: 'Value, Rarity, Imitability, Organization', desc: 'Identifikasi sumber keunggulan kompetitif berkelanjutan Indonesia di kancah global.', descEn: 'Identifying Indonesia\'s sustainable competitive advantage sources on the global stage.', color: '#3B82F6', icon: Star },
              { abbr: 'BODI', full: 'Backbone, Offensive, Defensive, Image Leading', fullId: 'Backbone, Offensive, Defensive, Image Leading', desc: 'Kategorisasi peran strategis setiap gagasan dalam portofolio pembangunan nasional.', descEn: 'Categorizing each idea\'s strategic role in the national development portfolio.', color: '#F59E0B', icon: Target },
              { abbr: 'VUCA', full: 'Volatility, Uncertainty, Complexity, Ambiguity', fullId: 'Volatility, Uncertainty, Complexity, Ambiguity', desc: 'Memastikan ketahanan gagasan menghadapi lingkungan geopolitik yang bergejolak.', descEn: 'Ensuring idea resilience against volatile geopolitical environments.', color: '#10B981', icon: Shield },
            ].map((lens, i) => {
              const Icon = lens.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="glass-card-dark p-6 text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                       style={{ background: `${lens.color}15`, color: lens.color }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: lens.color }}>{lens.abbr}</h3>
                  <p className="text-[11px] font-medium mb-3" style={{ color: 'var(--color-text-muted)' }}>{lens.full}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {lang === 'ID' ? lens.desc : lens.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ PENTA-HELIX STAKEHOLDER ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              {lang === 'ID' ? 'Kolaborasi Penta-Helix' : 'Penta-Helix Collaboration'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? '5 Pilar Kontribusi' : '5 Contribution Pillars'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Setiap sektor strategis memerlukan kontribusi terkoordinasi dari lima pilar pemangku kepentingan.'
                : 'Each strategic sector requires coordinated contributions from five stakeholder pillars.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stakeholderPillars.map((sh, i) => {
              const Icon = sh.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card-dark p-5 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                       style={{ background: `${sh.color}15`, color: sh.color }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {lang === 'ID' ? sh.title : sh.titleEn}
                  </h4>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {lang === 'ID' ? sh.desc : sh.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ DELIVERABLES ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Output Konkret' : 'Concrete Outputs'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Apa yang Dihasilkan' : 'What We Deliver'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card-dark p-5 text-center group"
              >
                <div className="text-3xl mb-3">{d.icon}</div>
                <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {lang === 'ID' ? d.title : d.titleEn}
                </h4>
                <p className="text-[11px] mb-1" style={{ color: 'var(--color-primary)' }}>
                  {lang === 'ID' ? d.spec : d.specEn}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{d.timeline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ OPERATIONAL ROADMAP ═══════ */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Peta Jalan Operasional' : 'Operational Roadmap'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? '4 Fase Menuju Summit' : '4 Phases to Summit'}
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              {lang === 'ID'
                ? 'Dari riset mendalam hingga konsolidasi nasional — perjalanan 12 bulan membangun blueprint industrialisasi Indonesia.'
                : 'From deep research to national consolidation — a 12-month journey building Indonesia\'s industrialization blueprint.'}
            </p>
          </div>

          {/* Timeline connector */}
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 rounded-full" style={{ background: 'var(--glass-border)' }} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {operationalRoadmap.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative"
                >
                  {/* Phase circle */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 relative z-10"
                      style={{ background: phase.color, boxShadow: `0 0 20px ${phase.color}40` }}
                    >
                      {phase.phase}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: phase.color }}>
                        {lang === 'ID' ? phase.period : phase.periodEn}
                      </p>
                      <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {lang === 'ID' ? phase.title : phase.titleEn}
                      </h4>
                    </div>
                  </div>
                  {/* Items */}
                  <div className="glass-card-dark p-4 space-y-2">
                    {(lang === 'ID' ? phase.items : phase.itemsEn).map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: phase.color }} />
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ VENUE ═══════ */}
      <section className="overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>

        {/* ── Cinematic Hero Banner ── */}
        <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/jcc-hero-wide/1600/700"
            alt="Jakarta Convention Center"
            fill
            className="object-cover object-center scale-105"
            style={{ filter: 'brightness(0.35)' }}
            priority
          />
          {/* Overlay gradients — stronger for legibility */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,9,26,0.96) 0%, rgba(5,9,26,0.82) 45%, rgba(5,9,26,0.45) 70%, rgba(5,9,26,0.15) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,9,26,0.98) 0%, rgba(5,9,26,0.6) 35%, transparent 60%)' }} />
          {/* Extra scrim behind the text block */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 80% at 0% 100%, rgba(5,9,26,0.75) 0%, transparent 70%)' }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 sm:px-10 max-w-7xl mx-auto left-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-secondary)', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                {t('venue.tag')}
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-none tracking-tight"
                style={{ color: '#ffffff', textShadow: '0 0 40px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.5)' }}>
                Jakarta<br />Convention Center
              </h2>
              <p className="text-base sm:text-lg mb-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
                {t('venue.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-secondary)' }} />
                  Senayan, Jakarta Pusat
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--color-accent-light)' }} />
                  15–17 Oktober 2026
                </span>
                <a
                  href="https://maps.google.com/?q=Jakarta+Convention+Center+Senayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold no-underline transition-all hover:brightness-110"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {t('venue.directions')}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '5.000+', label: lang === 'ID' ? 'Kapasitas Peserta' : 'Attendee Capacity', color: 'var(--color-primary)' },
              { value: '12+', label: lang === 'ID' ? 'Ruang Sesi' : 'Session Rooms', color: 'var(--color-secondary)' },
              { value: '3', label: lang === 'ID' ? 'Hari Penuh' : 'Full Days', color: 'var(--color-accent-light)' },
              { value: '80+', label: lang === 'ID' ? 'Pembicara' : 'Speakers', color: '#A78BFA' },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-center py-2"
              >
                <p className="text-2xl sm:text-3xl font-black mb-0.5" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Photo Grid + Map ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Photo mosaic: col 1–3 */}
            <div className="lg:col-span-3 grid grid-cols-2 grid-rows-2 gap-3" style={{ height: '480px' }}>
              {/* Big left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="row-span-2 relative overflow-hidden rounded-2xl group"
              >
                <Image src="https://picsum.photos/seed/jcc-main/700/900" alt="Main Hall"
                  fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="inline-block text-white text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg"
                    style={{ background: 'rgba(59,130,246,0.8)', backdropFilter: 'blur(4px)' }}>
                    Main Hall
                  </span>
                </div>
              </motion.div>
              {/* Top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl group"
              >
                <Image src="https://picsum.photos/seed/jcc-plenary/600/400" alt="Plenary Hall"
                  fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <span className="inline-block text-white text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-lg"
                    style={{ background: 'rgba(20,184,166,0.8)', backdropFilter: 'blur(4px)' }}>
                    Plenary Hall
                  </span>
                </div>
              </motion.div>
              {/* Bottom right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl group"
              >
                <Image src="https://picsum.photos/seed/jcc-lobby/600/400" alt="Lobby Area"
                  fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3">
                  <span className="inline-block text-white text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-lg"
                    style={{ background: 'rgba(245,158,11,0.8)', backdropFilter: 'blur(4px)' }}>
                    Lobby
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Map + Access: col 4–5 */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {/* Map */}
              <div className="rounded-2xl overflow-hidden flex-1" style={{ border: '1px solid var(--color-border)', minHeight: '300px' }}>
                <iframe
                  src="https://maps.google.com/maps?q=Jakarta+Convention+Center+Senayan&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px', display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jakarta Convention Center"
                />
              </div>

              {/* Access info */}
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'ID' ? 'Akses & Transportasi' : 'Access & Transport'}
                </p>
                {[
                  { icon: '🚇', label: lang === 'ID' ? 'MRT Istora Senayan (5 mnt jalan)' : 'MRT Istora Senayan (5 min walk)' },
                  { icon: '✈️', label: lang === 'ID' ? 'Bandara Soekarno-Hatta (35 km)' : 'Soekarno-Hatta Airport (35 km)' },
                  { icon: '🅿️', label: lang === 'ID' ? 'Parkir 3.000+ kendaraan' : '3,000+ vehicle parking' },
                  { icon: '🏨', label: lang === 'ID' ? '10+ hotel bintang 5 di sekitar venue' : '10+ 5-star hotels nearby' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span className="text-base w-5 shrink-0">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════ ORGANIZED BY + SPONSORS + MEDIA PARTNERS ═══════ */}
      <section className="section-padding" style={{ background: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* ── Organized By ── */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#9CA3AF' }}>
              {lang === 'ID' ? 'Diselenggarakan Oleh' : 'Organized By'}
            </p>
            <div className="w-10 h-0.5 mx-auto mb-10" style={{ background: '#D1D5DB' }} />
            <div className="flex flex-wrap items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#003F88', background: '#EFF6FF' }}>
                  <div className="text-center leading-tight">
                    <p className="text-sm font-black" style={{ color: '#003F88' }}>IA</p>
                    <p className="text-sm font-black" style={{ color: '#003F88' }}>ITB</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-center max-w-[110px] leading-tight" style={{ color: '#374151' }}>
                  Ikatan Alumni ITB
                </p>
              </div>
            </div>
          </div>

          <div className="border-t mb-14" style={{ borderColor: '#F3F4F6' }} />

          {/* ── Main Sponsor ── */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#9CA3AF' }}>Main Sponsor</p>
            <div className="w-10 h-0.5 mx-auto mb-10" style={{ background: '#D1D5DB' }} />
            <div className="flex justify-center">
              <div className="px-16 py-8 rounded-2xl border-2 border-dashed flex items-center justify-center min-w-[240px]" style={{ borderColor: '#BBF7D0', background: '#F0FDF4' }}>
                <p className="text-base font-bold tracking-wide" style={{ color: '#9CA3AF' }}>[ Main Sponsor ]</p>
              </div>
            </div>
          </div>

          <div className="border-t mb-14" style={{ borderColor: '#F3F4F6' }} />

          {/* ── Sponsored By ── */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#9CA3AF' }}>
              {lang === 'ID' ? 'Disponsori Oleh' : 'Sponsored By'}
            </p>
            <div className="w-10 h-0.5 mx-auto mb-10" style={{ background: '#D1D5DB' }} />
            <div className="flex flex-wrap justify-center gap-4">
              {['Sponsor A', 'Sponsor B', 'Sponsor C', 'Sponsor D', 'Sponsor E', 'Sponsor F'].map((name) => (
                <div key={name} className="px-8 py-5 rounded-xl border border-dashed flex items-center justify-center min-w-[130px]" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                  <p className="text-sm font-semibold" style={{ color: '#9CA3AF' }}>[ {name} ]</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mb-14" style={{ borderColor: '#F3F4F6' }} />

          {/* ── Supported By ── */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#9CA3AF' }}>
              {lang === 'ID' ? 'Didukung Oleh' : 'Supported By'}
            </p>
            <div className="w-10 h-0.5 mx-auto mb-10" style={{ background: '#D1D5DB' }} />
            <div className="flex flex-wrap justify-center gap-4">
              {['Pendukung A', 'Pendukung B', 'Pendukung C', 'Pendukung D'].map((name) => (
                <div key={name} className="px-8 py-4 rounded-xl border border-dashed flex items-center justify-center min-w-[120px]" style={{ borderColor: '#E5E7EB', background: '#F9FAFB' }}>
                  <p className="text-sm font-semibold" style={{ color: '#9CA3AF' }}>[ {name} ]</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mb-14" style={{ borderColor: '#F3F4F6' }} />

          {/* ── Media Partners ── */}
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#9CA3AF' }}>Media Partners</p>
            <div className="w-10 h-0.5 mx-auto mb-10" style={{ background: '#D1D5DB' }} />
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Kompas TV', 'Kompas.com', 'Tribunnews', 'Media Indonesia',
                'Metro TV', 'Kontan.co.id', 'CNN Indonesia', 'Pikiran Rakyat',
                'Bisnis Indonesia', 'Nat. Geographic ID',
              ].map((name) => (
                <div key={name} className="px-5 py-3 rounded-lg border flex items-center justify-center" style={{ borderColor: '#E5E7EB', background: '#F9FAFB', minWidth: '110px' }}>
                  <p className="text-xs font-bold" style={{ color: '#6B7280' }}>{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="text-center pt-8 border-t" style={{ borderColor: '#F3F4F6' }}>
            <Link href="/sponsorship" className="btn-primary inline-flex items-center gap-2 no-underline hover:no-underline">
              {t('partners.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'SUARA PARA PEMIMPIN' : 'VOICES OF LEADERS'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Apa Kata Mereka' : 'What They Say'}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              {lang === 'ID'
                ? 'Perspektif akademisi, industri, dan pemerintah tentang Indonesianisme 2026'
                : 'Perspectives from academia, industry, and government on Indonesianisme 2026'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Indonesianisme 2026 adalah momentum paling tepat untuk mempercepat reindustrialisasi. IA-ITB mampu menjembatani gagasan akademis dengan kebijakan nyata yang berdampak.',
                name: 'Prof. Dr. Bambang Riyanto',
                title: 'Guru Besar Teknik Industri, ITB',
                img: 'https://picsum.photos/seed/testimony-1/80/80',
                accent: '#3B82F6',
              },
              {
                quote: 'Forum ini membuktikan alumni ITB tidak hanya bicara di menara gading — mereka turun tangan merumuskan solusi konkret untuk pertumbuhan 8%.',
                name: 'Ir. Dewi Kartika Sari',
                title: 'Direktur Utama, PT Energi Nusantara',
                img: 'https://picsum.photos/seed/testimony-2/80/80',
                accent: '#10B981',
              },
              {
                quote: 'Hilirisasi mineral bukan sekadar isu ekonomi — ini soal kedaulatan nasional. Sangat mengapresiasi pendekatan 80 gagasan yang terstruktur dan berbasis data.',
                name: 'Dr. Fajar Kusuma, M.Sc.',
                title: 'Deputi Bidang Industri, Kementerian ESDM',
                img: 'https://picsum.photos/seed/testimony-3/80/80',
                accent: '#F59E0B',
              },
              {
                quote: 'Transformasi digital tanpa fondasi SDM yang kuat hanya akan menjadi slogan. Indonesianisme 2026 menjawab ini dengan roadmap yang holistik dan actionable.',
                name: 'Sarah Amelia Putri',
                title: 'Co-Founder & CEO, TechNusa Digital',
                img: 'https://picsum.photos/seed/testimony-4/80/80',
                accent: '#8B5CF6',
              },
              {
                quote: 'Ketahanan pangan adalah pertahanan nasional garis pertama. Sangat mengapresiasi Indonesianisme yang menempatkan kedaulatan pangan sebagai prioritas utama.',
                name: 'Dr. Ahmad Rifai, M.P.',
                title: 'Peneliti Senior, Badan Riset Pangan Nasional',
                img: 'https://picsum.photos/seed/testimony-5/80/80',
                accent: '#EC4899',
              },
              {
                quote: 'IA-ITB menunjukkan bahwa komunitas alumni bisa menjadi katalis perubahan kebijakan. Indonesianisme adalah model kolaborasi akademisi-industri-pemerintah yang patut dicontoh.',
                name: 'Prof. Ir. Hendra Wibisono',
                title: 'Rektor, Universitas Teknologi Bandung',
                img: 'https://picsum.photos/seed/testimony-6/80/80',
                accent: '#14B8A6',
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}
              >
                {/* Quote mark */}
                <div className="text-5xl font-black leading-none mb-4 select-none" style={{ color: item.accent, opacity: 0.25 }}>
                  &ldquo;
                </div>

                {/* Quote text */}
                <p className="text-sm leading-relaxed flex-1 italic" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.quote}
                </p>

                {/* Author */}
                <div
                  className="flex items-center gap-3 mt-6 pt-5"
                  style={{ borderTop: '1px solid var(--glass-border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden shrink-0"
                    style={{ border: `2px solid ${item.accent}30` }}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════ NEWSLETTER CTA ═══════ */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'var(--color-primary)', filter: 'blur(120px)' }} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Send className="w-10 h-10 mx-auto mb-6" style={{ color: 'var(--color-primary)' }} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              {t('newsletter.title')}
            </h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {t('newsletter.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-xl text-sm border-0 outline-none"
                style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--glass-border)' }}
              />
              <button className="btn-primary px-6 py-3 text-sm inline-flex items-center justify-center gap-2">
                {t('newsletter.btn')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {t('newsletter.or')}{' '}
              <a href="https://wa.me" className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                {t('newsletter.wa')}
              </a>
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
