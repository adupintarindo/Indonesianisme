'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/shared/PageHero';
import { Button } from '@/components/ui/Button';
import {
  Clock,
  MapPin,
  Users,
  Bookmark,
  Calendar,
  Download,
  Filter,
  Dot,
  Zap,
} from 'lucide-react';

interface Session {
  id: string;
  time: string;
  duration: string;
  title: string;
  speaker?: string;
  room: string;
  track: 'Keynote' | 'Panel' | 'Workshop' | 'Networking';
  description: string;
  topics: string[];
}

const programData: Record<string, Session[]> = {
  day1: [
    {
      id: 'day1-1',
      time: '08:00',
      duration: '1 jam',
      title: 'Registrasi & Welcome Coffee',
      room: 'Grand Lobby',
      track: 'Networking',
      description: 'Pendaftaran peserta dan coffee break sambil berkenalan',
      topics: ['Registration'],
    },
    {
      id: 'day1-2',
      time: '09:00',
      duration: '30 menit',
      title: 'Pembukaan oleh Ketua IA-ITB',
      speaker: 'Prof. Bambang Parmanto',
      room: 'Main Hall',
      track: 'Keynote',
      description: 'Sambutan pembukaan dan visi Indonesia Aman untuk 2045',
      topics: ['Pembukaan', 'Visi Nasional'],
    },
    {
      id: 'day1-3',
      time: '09:30',
      duration: '1 jam',
      title: 'Keynote: "Visi Indonesia 2045 dan Transformasi Struktural"',
      speaker: 'Dr. Ahmad Suryanto, Menteri Perindustrian',
      room: 'Main Hall',
      track: 'Keynote',
      description:
        'Pembahasan mendalam tentang visi pembangunan ekonomi Indonesia menuju 8% pertumbuhan',
      topics: ['Ekonomi', 'Transformasi', 'Kemandirian Bangsa'],
    },
    {
      id: 'day1-4',
      time: '10:30',
      duration: '30 menit',
      title: 'Coffee Break',
      room: 'Grand Lobby',
      track: 'Networking',
      description: 'Break dan networking antar peserta',
      topics: ['Break'],
    },
    {
      id: 'day1-5',
      time: '11:00',
      duration: '1.5 jam',
      title: 'Panel: "Reindustrialisasi: Jalan Menuju 8% Pertumbuhan"',
      speaker: 'Moderator: Prof. Siti Rahayu (Rektor ITB), Panelist: Budi Hartono, Dr. Maya Kartika',
      room: 'Main Hall',
      track: 'Panel',
      description: 'Diskusi panel tentang strategi reindustrialisasi dan pertumbuhan ekonomi',
      topics: ['Reindustrialisasi', 'Pertumbuhan Ekonomi', 'Kebijakan Industri'],
    },
    {
      id: 'day1-6',
      time: '12:30',
      duration: '1 jam',
      title: 'Makan Siang & Networking',
      room: 'Dining Area',
      track: 'Networking',
      description: 'Istirahat makan siang dan kesempatan networking',
      topics: ['Lunch'],
    },
    {
      id: 'day1-7',
      time: '13:30',
      duration: '1.5 jam',
      title: 'Panel: "Kedaulatan Teknologi di Era Digital"',
      speaker:
        'Moderator: Dr. Lina Marlina (Kepala BRIN), Panelist: Reza Firmansyah, Arief Budiman',
      room: 'Main Hall',
      track: 'Panel',
      description: 'Pembahasan tentang kedaulatan teknologi dan transformasi digital Indonesia',
      topics: ['Teknologi', 'Digitalisasi', 'Keamanan Siber'],
    },
    {
      id: 'day1-8',
      time: '15:00',
      duration: '30 menit',
      title: 'Coffee Break',
      room: 'Grand Lobby',
      track: 'Networking',
      description: 'Break untuk refresh',
      topics: ['Break'],
    },
    {
      id: 'day1-9',
      time: '15:30',
      duration: '1.5 jam',
      title: 'Executive Roundtable: "Energi & Transisi Energi"',
      speaker: 'Facilitator: Dewi Anggraini, VP Sustainability PT Pertamina',
      room: 'Boardroom A',
      track: 'Panel',
      description: 'Diskusi intensif tentang energi berkelanjutan dan transisi energi Indonesia',
      topics: ['Energi', 'Keberlanjutan', 'Transisi Energi'],
    },
    {
      id: 'day1-10',
      time: '19:00',
      duration: '2 jam',
      title: 'Gala Dinner & Networking',
      room: 'Grand Ballroom',
      track: 'Networking',
      description: 'Makan malam gala dengan networking eksklusif antar stakeholder',
      topics: ['Dinner', 'Networking'],
    },
  ],
  day2: [
    {
      id: 'day2-1',
      time: '09:00',
      duration: '1.5 jam',
      title: 'Panel: "Ketahanan Pangan & Air"',
      speaker: 'Moderator: Prof. Hendra Wijaya, Panelist: Fajar Nugroho, Expert Panel',
      room: 'Main Hall',
      track: 'Panel',
      description: 'Diskusi tentang strategi ketahanan pangan dan sumber daya air berkelanjutan',
      topics: ['Pangan', 'Pertanian', 'Sumber Daya Air', 'Ketahanan'],
    },
    {
      id: 'day2-2',
      time: '10:30',
      duration: '30 menit',
      title: 'Coffee Break',
      room: 'Grand Lobby',
      track: 'Networking',
      description: 'Break dan networking',
      topics: ['Break'],
    },
    {
      id: 'day2-3',
      time: '11:00',
      duration: '1.5 jam',
      title: 'Panel: "Hilirisasi Mineral Strategis"',
      speaker: 'Moderator: Dr. Maya Kartika, Panelist: Industry Experts',
      room: 'Main Hall',
      track: 'Panel',
      description: 'Pembahasan tentang strategi hilirisasi mineral untuk nilai tambah maksimal',
      topics: ['Mineral', 'Industri Hilir', 'Kemandirian Sumber Daya'],
    },
    {
      id: 'day2-4',
      time: '12:30',
      duration: '1 jam',
      title: 'Makan Siang',
      room: 'Dining Area',
      track: 'Networking',
      description: 'Istirahat makan siang',
      topics: ['Lunch'],
    },
    {
      id: 'day2-5',
      time: '13:30',
      duration: '1.5 jam',
      title: 'Panel: "Manufaktur Strategis & Daya Saing"',
      speaker: 'Moderator: Budi Hartono, Panelist: Industry Leaders',
      room: 'Main Hall',
      track: 'Panel',
      description: 'Diskusi tentang manufaktur strategis untuk meningkatkan daya saing global',
      topics: ['Manufaktur', 'Daya Saing', 'Industri 4.0'],
    },
    {
      id: 'day2-6',
      time: '15:00',
      duration: '30 menit',
      title: 'Coffee Break',
      room: 'Grand Lobby',
      track: 'Networking',
      description: 'Break untuk refresh',
      topics: ['Break'],
    },
    {
      id: 'day2-7',
      time: '15:30',
      duration: '1.5 jam',
      title: 'Youth Forum: "Suara Generasi untuk Indonesia 2045"',
      speaker: 'Moderator: Sarah Putri, Youth Leaders',
      room: 'Room B',
      track: 'Panel',
      description: 'Forum eksklusif untuk generasi muda berbagi visi dan ide inovatif',
      topics: ['Generasi Muda', 'Inovasi', 'Kepemimpinan Masa Depan'],
    },
  ],
  day3: [
    {
      id: 'day3-1',
      time: '09:00',
      duration: '1.5 jam',
      title: 'Workshop: "Ekonomi Hijau & Biodiversitas"',
      speaker: 'Facilitator: Prof. Wahyu Pramono, Experts',
      room: 'Room A & B',
      track: 'Workshop',
      description: 'Workshop interaktif tentang ekonomi hijau dan konservasi biodiversitas',
      topics: ['Ekonomi Hijau', 'Biodiversitas', 'Keberlanjutan'],
    },
    {
      id: 'day3-2',
      time: '10:30',
      duration: '30 menit',
      title: 'Coffee Break',
      room: 'Grand Lobby',
      track: 'Networking',
      description: 'Break dan networking',
      topics: ['Break'],
    },
    {
      id: 'day3-3',
      time: '11:00',
      duration: '1.5 jam',
      title: 'Workshop: "SDM & Pendidikan untuk Transformasi"',
      speaker: 'Facilitator: Prof. Siti Rahayu, Education Experts',
      room: 'Room A & B',
      track: 'Workshop',
      description: 'Workshop tentang pengembangan SDM dan pendidikan untuk transformasi ekonomi',
      topics: ['SDM', 'Pendidikan', 'Transformasi', 'Kompetensi'],
    },
    {
      id: 'day3-4',
      time: '12:30',
      duration: '1 jam',
      title: 'Makan Siang',
      room: 'Dining Area',
      track: 'Networking',
      description: 'Istirahat makan siang',
      topics: ['Lunch'],
    },
    {
      id: 'day3-5',
      time: '13:30',
      duration: '1.5 jam',
      title: 'Innovation Showcase & Demo',
      room: 'Exhibition Hall',
      track: 'Networking',
      description: 'Pameran dan demonstrasi teknologi serta inovasi Indonesia',
      topics: ['Inovasi', 'Teknologi', 'Showcase'],
    },
    {
      id: 'day3-6',
      time: '15:00',
      duration: '1 jam',
      title: 'Closing Keynote: "Deklarasi Indonesianisme 2026"',
      speaker: 'Dr. Ahmad Suryanto & Panel Closing',
      room: 'Main Hall',
      track: 'Keynote',
      description: 'Keynote penutup dan deklarasi komitmen kolaboratif untuk Indonesia',
      topics: ['Penutupan', 'Deklarasi', 'Komitmen Bersama'],
    },
    {
      id: 'day3-7',
      time: '16:00',
      duration: '30 menit',
      title: 'Penutupan',
      room: 'Main Hall',
      track: 'Networking',
      description: 'Sesi penutupan dan terima kasih kepada semua peserta',
      topics: ['Penutupan'],
    },
  ],
};

const days = [
  { id: 'day1', label: 'Hari 1', subtitle: 'Pembukaan & Keynote' },
  { id: 'day2', label: 'Hari 2', subtitle: 'Panel & Diskusi' },
  { id: 'day3', label: 'Hari 3', subtitle: 'Workshop & Penutupan' },
];

const trackColorMap: Record<Session['track'], { hex: string; rgb: string }> = {
  Keynote: { hex: '#F59E0B', rgb: '245, 158, 11' },
  Panel: { hex: '#3B82F6', rgb: '59, 130, 246' },
  Workshop: { hex: '#10B981', rgb: '16, 185, 129' },
  Networking: { hex: '#8B5CF6', rgb: '139, 92, 246' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

interface SessionCardProps {
  session: Session;
  isSaved: boolean;
  onToggleSave: (sessionId: string) => void;
}

const SessionCard = ({ session, isSaved, onToggleSave }: SessionCardProps) => {
  const trackColor = trackColorMap[session.track];

  const handleDownloadICS = () => {
    const eventDate = new Date('2026-10-15');
    const [hours, minutes] = session.time.split(':');
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0);

    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);
    const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Indonesianisme//2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${session.id}@indonesianisme.id
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${session.title}
DESCRIPTION:${session.description}
LOCATION:${session.room}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.id}.ics`;
    a.click();
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative"
    >
      <div className="flex gap-6">
        {/* Timeline Line */}
        <div className="flex flex-col items-center pt-3">
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: trackColor.hex,
              border: `3px solid var(--color-bg-primary)`,
              boxShadow: `0 0 12px rgba(${trackColor.rgb}, 0.4)`,
            }}
          />
          <div
            style={{
              width: '2px',
              flex: '1',
              background: `linear-gradient(to bottom, ${trackColor.hex}40, transparent)`,
              minHeight: '60px',
              marginTop: '8px',
            }}
          />
        </div>

        {/* Card Content */}
        <div
          className="glass-card-dark flex-1 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'var(--color-bg-card)',
            borderLeft: `5px solid ${trackColor.hex}`,
            boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(${trackColor.rgb}, 0.1)`,
          }}
        >
          <div className="p-6">
            {/* Header: Time Badge & Duration */}
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  background: `${trackColor.hex}20`,
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  border: `1px solid ${trackColor.hex}40`,
                }}
              >
                <span
                  style={{ color: trackColor.hex, fontWeight: '700', fontSize: '14px' }}
                >
                  {session.time}
                </span>
              </div>
              <span
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '12px',
                  background: 'var(--glass-border)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                }}
              >
                {session.duration}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                color: 'var(--color-text-primary)',
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '12px',
                lineHeight: '1.4',
              }}
            >
              {session.title}
            </h3>

            {/* Speaker */}
            {session.speaker && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Users
                  size={16}
                  style={{ color: trackColor.hex, flexShrink: 0 }}
                />
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  {session.speaker}
                </span>
              </div>
            )}

            {/* Room/Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <MapPin
                size={16}
                style={{ color: trackColor.hex, flexShrink: 0 }}
              />
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                {session.room}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '14px',
              }}
            >
              {session.description}
            </p>

            {/* Topic Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {session.topics.map((topic: string, idx: number) => (
                <span
                  key={idx}
                  style={{
                    background: `${trackColor.hex}15`,
                    color: trackColor.hex,
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: `1px solid ${trackColor.hex}30`,
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--glass-border)', paddingTop: '14px' }}>
              <button
                onClick={() => onToggleSave(session.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: isSaved ? `${trackColor.hex}25` : 'var(--glass-border)',
                  color: isSaved ? trackColor.hex : 'var(--color-text-secondary)',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (isSaved) {
                    (e.currentTarget as HTMLButtonElement).style.background = `${trackColor.hex}35`;
                  } else {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isSaved) {
                    (e.currentTarget as HTMLButtonElement).style.background = `${trackColor.hex}25`;
                  } else {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                  }
                }}
                title={isSaved ? 'Hapus dari bookmark' : 'Tambah ke bookmark'}
              >
                <Bookmark
                  size={16}
                  fill={isSaved ? 'currentColor' : 'none'}
                />
                {isSaved ? 'Tersimpan' : 'Simpan'}
              </button>
              <button
                onClick={handleDownloadICS}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: 'var(--glass-border)',
                  color: 'var(--color-text-secondary)',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                }}
                title="Unduh ke kalender"
              >
                <Download size={16} />
                Unduh
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProgramPage() {
  const [selectedDay, setSelectedDay] = useState<string>('day1');
  const [selectedTrack, setSelectedTrack] = useState<Session['track'] | 'Semua'>('Semua');
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());

  const filteredSessions = useMemo(() => {
    const sessions = programData[selectedDay as keyof typeof programData] || [];
    if (selectedTrack === 'Semua') {
      return sessions;
    }
    return sessions.filter((s) => s.track === selectedTrack);
  }, [selectedDay, selectedTrack]);

  const handleToggleSave = (sessionId: string) => {
    const newSaved = new Set(savedSessions);
    if (newSaved.has(sessionId)) {
      newSaved.delete(sessionId);
    } else {
      newSaved.add(sessionId);
    }
    setSavedSessions(newSaved);
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedSessions', JSON.stringify(Array.from(newSaved)));
    }
  };

  return (
    <div style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      {/* Hero */}
      <PageHero
        title="Program & Jadwal Acara"
        subtitle="Alur lengkap acara Indonesianisme 2026 selama tiga hari penuh"
      />

      {/* Stats Bar */}
      <section style={{ background: 'var(--color-bg-primary)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '3',   label: 'Hari',       sublabel: 'Acara penuh', icon: Calendar, color: '#3B82F6' },
              { number: '24',  label: 'Sesi',        sublabel: 'Lintas jalur', icon: Clock,    color: '#F59E0B' },
              { number: '6',   label: 'Workshop',    sublabel: 'Interaktif',   icon: Zap,      color: '#10B981' },
              { number: '12+', label: 'Pembicara',   sublabel: 'Nasional & internasional', icon: Users, color: '#8B5CF6' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-2xl p-5 group cursor-default"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: `1px solid ${stat.color}20`,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Tinted corner glow */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
                       style={{ background: stat.color, opacity: 0.06, filter: 'blur(20px)' }} />
                  {/* Always-visible accent bar */}
                  <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl"
                       style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)`, opacity: 0.7 }} />

                  {/* Icon row */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                         style={{ background: `${stat.color}15` }}>
                      <Icon size={18} style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: stat.color }}>{stat.label}</p>
                      <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{stat.sublabel}</p>
                    </div>
                  </div>

                  {/* Number */}
                  <p className="text-5xl font-black leading-none"
                     style={{
                       background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}90 100%)`,
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                       backgroundClip: 'text',
                     }}>
                    {stat.number}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Day Tabs + Filter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-14 pb-6">
        <div className="flex flex-col items-center gap-6">

          {/* Day Selector — segmented control, centered */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex gap-2 p-1.5 rounded-2xl flex-wrap justify-center"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            }}
          >
            {days.map((day) => {
              const active = selectedDay === day.id;
              return (
                <motion.button
                  key={day.id}
                  onClick={() => { setSelectedDay(day.id); setSelectedTrack('Semua'); }}
                  whileHover={!active ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-7 py-3.5 rounded-xl text-center transition-all duration-250 cursor-pointer"
                  style={{
                    background: active ? 'var(--color-primary)' : 'transparent',
                    boxShadow: active ? '0 4px 18px rgba(59,130,246,0.35)' : 'none',
                    minWidth: '170px',
                  }}
                >
                  <p
                    className="text-sm font-bold leading-tight"
                    style={{ color: active ? '#fff' : 'var(--color-text-primary)' }}
                  >
                    {day.label}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: active ? 'rgba(255,255,255,0.72)' : 'var(--color-text-muted)' }}
                  >
                    {day.subtitle}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Divider + Track Filter row, centered */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex items-center justify-center gap-2.5 flex-wrap"
          >
            {/* Label */}
            <div
              className="flex items-center gap-1.5 pr-3"
              style={{ borderRight: '1px solid var(--glass-border)' }}
            >
              <Filter size={12} style={{ color: 'var(--color-text-muted)' }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Filter Jalur
              </span>
            </div>

            {/* Track pills */}
            {(['Semua', 'Keynote', 'Panel', 'Workshop', 'Networking'] as const).map((track) => {
              const trackHex = track === 'Semua' ? '#6366F1' : trackColorMap[track].hex;
              const active = selectedTrack === track;
              return (
                <motion.button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: active ? `${trackHex}18` : 'transparent',
                    color: active ? trackHex : 'var(--color-text-secondary)',
                    border: active
                      ? `1.5px solid ${trackHex}55`
                      : '1px solid var(--glass-border)',
                    boxShadow: active ? `0 2px 10px ${trackHex}22` : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.borderColor = `${trackHex}45`;
                      e.currentTarget.style.color = trackHex;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-opacity"
                    style={{ background: trackHex, opacity: active ? 1 : 0.45 }}
                  />
                  {track}
                </motion.button>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* Sessions Timeline */}
      <section
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '0 32px 96px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredSessions.length > 0 ? (
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredSessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    isSaved={savedSessions.has(session.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                style={{
                  textAlign: 'center',
                  padding: '64px 32px',
                  borderRadius: '16px',
                  border: '2px dashed var(--glass-border)',
                  background: 'var(--color-bg-card)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Zap
                  size={48}
                  style={{
                    color: 'var(--color-text-secondary)',
                    opacity: 0.3,
                    margin: '0 auto 16px',
                  }}
                />
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Tidak ada sesi untuk filter yang Anda pilih
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
