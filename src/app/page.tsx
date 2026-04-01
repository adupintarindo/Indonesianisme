'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield, Cpu, Factory, Leaf, Globe, Users,
  ChevronDown, ArrowRight, Zap, Target, TrendingUp,
  Building2, Lightbulb, GraduationCap, Calendar,
  MapPin, Star, Award, Rocket, Send,
  Gem, Droplets, Wifi, Swords, HeartPulse,
  Palette, Landmark, ChevronRight, X,
  BarChart3, Battery, Wheat, BrainCircuit
} from 'lucide-react';
import { useLang } from '@/components/providers/LanguageProvider';
import CardModal from '@/components/CardModal';

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

/* ═══ Data: Speakers ═══ */
const speakers = [
  { name: 'Dr. Bambang Brodjonegoro', title: 'Ex-Menteri PPN/Bappenas', titleEn: 'Former Minister of National Planning', topic: 'Strategi Ekonomi', topicEn: 'Economic Strategy', img: 'https://picsum.photos/seed/spk1/300/300' },
  { name: 'Prof. Dwi Larso', title: 'Guru Besar ITB', titleEn: 'ITB Professor', topic: 'Inovasi & Teknologi', topicEn: 'Innovation & Technology', img: 'https://picsum.photos/seed/spk2/300/300' },
  { name: 'Dr. Mari Elka Pangestu', title: 'Ex-MD World Bank', titleEn: 'Former MD World Bank', topic: 'Perdagangan Global', topicEn: 'Global Trade', img: 'https://picsum.photos/seed/spk3/300/300' },
  { name: 'Ir. Budi Gunadi Sadikin', title: 'Praktisi Industri', titleEn: 'Industry Practitioner', topic: 'Reindustrialisasi', topicEn: 'Reindustrialization', img: 'https://picsum.photos/seed/spk4/300/300' },
  { name: 'Prof. Arief Anshory Yusuf', title: 'Ekonom UNPAD', titleEn: 'UNPAD Economist', topic: 'Keberlanjutan', topicEn: 'Sustainability', img: 'https://picsum.photos/seed/spk5/300/300' },
  { name: 'Dr. Rhenald Kasali', title: 'Guru Besar UI', titleEn: 'UI Professor', topic: 'Transformasi Digital', topicEn: 'Digital Transformation', img: 'https://picsum.photos/seed/spk6/300/300' },
];

/* ═══ Data: Events ═══ */
const events = [
  { date: '15 Apr 2026', title: 'Kick-off Indonesianisme 2026', titleEn: 'Indonesianisme 2026 Kick-off', location: 'Jakarta Convention Center', desc: 'Peluncuran resmi platform dan pembukaan pendaftaran summit.', descEn: 'Official platform launch and summit registration opening.', status: 'open', statusLabel: 'Pendaftaran Dibuka', statusLabelEn: 'Registration Open' },
  { date: '20-22 Mei 2026', title: 'Forum Strategi Ekonomi Nasional', titleEn: 'National Economic Strategy Forum', location: 'Kampus ITB, Bandung', desc: 'Seri diskusi mendalam tentang 80 gagasan strategis bersama pakar dan pembuat kebijakan.', descEn: 'In-depth discussion series on 80 strategic ideas with experts and policymakers.', status: 'soon', statusLabel: 'Segera', statusLabelEn: 'Coming Soon' },
  { date: '15-17 Okt 2026', title: 'Indonesianisme 2026 Summit', titleEn: 'Indonesianisme 2026 Summit', location: 'Jakarta International Expo', desc: 'Acara utama: keynote, panel, roundtable, youth forum, dan innovation showcase.', descEn: 'Main event: keynotes, panels, roundtables, youth forum, and innovation showcase.', status: 'soon', statusLabel: 'Acara Utama', statusLabelEn: 'Main Event' },
];

/* ═══ Data: Partners ═══ */
const partners = ['Bank Mandiri', 'Telkom Indonesia', 'Pertamina', 'PLN', 'BRI', 'Astra International', 'Semen Indonesia', 'Bukalapak', 'Tokopedia', 'GoTo Group', 'ITB', 'UI'];

/* ═══ Data: Stats ═══ */
const stats = [
  { number: '80', labelId: 'Gagasan Strategis', labelEn: 'Strategic Ideas', icon: Lightbulb },
  { number: '16', labelId: 'Sektor Strategis', labelEn: 'Strategic Sectors', icon: Target },
  { number: '6', labelId: 'Pilar Filosofis', labelEn: 'Philosophical Pillars', icon: Award },
  { number: '5', labelId: 'Pilar Stakeholder', labelEn: 'Stakeholder Pillars', icon: Users },
];

/* ═══ Data: Platform Architecture ═══ */
const platformArch = [
  { icon: Landmark, title: 'Summit', titleEn: 'Summit', desc: 'Forum tahunan unggulan: keynote, panel diskusi, roundtable, dan youth forum.', descEn: 'Annual flagship forum: keynotes, panel discussions, roundtables, and youth forums.' },
  { icon: Users, title: 'Forum Series', titleEn: 'Forum Series', desc: 'Diskusi tematik sepanjang tahun tentang industri, energi, teknologi, dan tata kelola.', descEn: 'Year-round thematic discussions on industry, energy, technology, and governance.' },
  { icon: Lightbulb, title: 'Knowledge Platform', titleEn: 'Knowledge Platform', desc: 'Produksi thought paper, policy brief, dan laporan strategis berkualitas.', descEn: 'Producing quality thought papers, policy briefs, and strategic reports.' },
  { icon: Globe, title: 'Network', titleEn: 'Network', desc: 'Ekosistem penghubung pembuat kebijakan, industri, akademisi, dan profesional.', descEn: 'Ecosystem connecting policymakers, industry leaders, academics, and professionals.' },
  { icon: Rocket, title: 'Innovation Showcase', titleEn: 'Innovation Showcase', desc: 'Pameran inovasi Indonesia di bidang energi, digital, manufaktur, pangan, dan infrastruktur.', descEn: 'Showcasing Indonesian innovations in energy, digital, manufacturing, food, and infrastructure.' },
];

/* ═══ BODI Role Colors ═══ */
const bodiColors: Record<string, string> = {
  'Backbone': '#3B82F6',
  'Offensive': '#F59E0B',
  'Defensive': '#10B981',
  'Image Leading': '#EC4899',
};

/* ═══ Component ═══ */
export default function Home() {
  const { lang, t } = useLang();
  const countdown = useCountdown(SUMMIT_DATE);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  const closeSector = useCallback(() => setSelectedSector(null), []);
  const closePillar = useCallback(() => setSelectedPillar(null), []);

  return (
    <div className="w-full overflow-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10" style={{ background: 'var(--color-primary)', filter: 'blur(100px)' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10" style={{ background: 'var(--color-primary)', filter: 'blur(120px)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style={{ background: 'var(--color-secondary)', filter: 'blur(150px)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)', color: 'var(--color-primary-light)' }}
          >
            <Rocket className="w-4 h-4" />
            {lang === 'ID' ? 'Platform Strategis Nasional oleh IA-ITB' : 'National Strategic Platform by IA-ITB'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            INDONESIANISME
            <span className="block gradient-text text-4xl sm:text-5xl md:text-6xl mt-2">2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-medium mb-3 max-w-3xl mx-auto"
            style={{ color: 'var(--color-primary)' }}
          >
            {lang === 'ID'
              ? '80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia'
              : '80 IA-ITB Ideas for 8% Indonesian Economic Growth'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {lang === 'ID'
              ? 'Reindustrialisasi, Kedaulatan Teknologi, dan Kemandirian Ekonomi — Menuju Indonesia Berdaulat, Mandiri, dan Berkepribadian'
              : 'Reindustrialization, Technology Sovereignty, and Economic Independence — Toward a Sovereign, Independent, and Distinguished Indonesia'}
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-12"
          >
            {[
              { val: countdown.days, label: t('days') },
              { val: countdown.hours, label: t('hours') },
              { val: countdown.minutes, label: t('minutes') },
              { val: countdown.seconds, label: t('seconds') },
            ].map((item, i) => (
              <div key={i} className="glass-card-dark px-4 sm:px-6 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px] text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono gradient-text">
                  {String(item.val).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-medium mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register" className="btn-primary inline-flex items-center gap-2 text-base no-underline hover:no-underline">
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2 text-base no-underline hover:no-underline">
              {t('hero.learn')}
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16"
          >
            <ChevronDown className="w-5 h-5 mx-auto" style={{ color: 'var(--color-text-muted)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card-dark p-6 text-center"
                >
                  <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.number}</div>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {lang === 'ID' ? stat.labelId : stat.labelEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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

      {/* ═══════ 8 PRIORITY SECTORS — INTERACTIVE ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              {lang === 'ID' ? '8 Sektor Prioritas — Mesin Pertumbuhan' : '8 Priority Sectors — Growth Engines'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Mesin Pertumbuhan Ekonomi' : 'Economic Growth Engines'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Klik setiap sektor untuk melihat 5 gagasan strategis beserta peran BODI (Backbone, Offensive, Defensive, Image Leading).'
                : 'Click each sector to see 5 strategic ideas with their BODI framework roles.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {sectors.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSector(i)}
                  className="glass-card-dark p-5 text-center cursor-pointer group relative overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                       style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}15 0%, transparent 70%)` }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                         style={{ background: `${s.color}15`, color: s.color }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {lang === 'ID' ? s.name : s.nameEn}
                    </p>
                    <p className="text-[10px] font-medium" style={{ color: s.color }}>
                      {lang === 'ID' ? s.keyData : s.keyDataEn}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                         style={{ color: 'var(--color-primary-light)' }}>
                      {lang === 'ID' ? 'Lihat 5 Gagasan' : 'See 5 Ideas'} <ChevronRight className="w-3 h-3" />
                    </div>
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
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
              {lang === 'ID' ? '8 Sektor Pendukung — 40 Gagasan' : '8 Supporting Sectors — 40 Ideas'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {lang === 'ID' ? 'Ekosistem Penunjang Pertumbuhan' : 'Growth Support Ecosystem'}
            </h2>
            <p className="text-sm max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ID'
                ? 'Delapan sektor pendukung yang esensial untuk mendorong pertumbuhan holistik dan berkelanjutan.'
                : 'Eight supporting sectors essential for driving holistic and sustainable growth.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {supportingSectors.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="glass-card-dark p-5 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                       style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}15 0%, transparent 70%)` }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                         style={{ background: `${s.color}15`, color: s.color }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {lang === 'ID' ? s.name : s.nameEn}
                    </p>
                    <p className="text-[10px] font-medium" style={{ color: s.color }}>
                      {lang === 'ID' ? s.keyData : s.keyDataEn}
                    </p>
                  </div>
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

      {/* ═══════ SPEAKERS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--gradient-section-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Narasumber' : 'Speakers'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {t('speakers.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
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
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-transparent transition-all group-hover:ring-2"
                     style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}>
                  <Image src={speaker.img} alt={speaker.name} width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{speaker.name}</h4>
                <p className="text-[11px] mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'ID' ? speaker.title : speaker.titleEn}
                </p>
                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-bg-card)', color: 'var(--color-secondary)' }}>
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

      {/* ═══════ PARTNERS ═══════ */}
      <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-primary)' }}>
              {lang === 'ID' ? 'Didukung Oleh' : 'Supported By'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {t('partners.title')}
            </h2>
          </div>
          <div className="overflow-hidden mb-10">
            <div className="flex gap-6 animate-marquee">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="flex-shrink-0 glass-card-dark px-8 py-6 min-w-[180px] flex items-center justify-center">
                  <span className="text-sm font-bold whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Link href="/sponsorship" className="btn-primary inline-flex items-center gap-2 no-underline hover:no-underline">
              {t('partners.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
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
