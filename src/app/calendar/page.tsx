'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, X, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';
import { HeroBG } from '@/components/shared/HeroBG';

type CalendarEvent = {
  id: number;
  date: string;
  title: string;
  location: string;
  type: 'Webinar' | 'Forum' | 'Workshop' | 'Summit';
  startDate: Date;
  endDate: Date;
  isFeatured?: boolean;
};

const events: CalendarEvent[] = [
  {
    id: 1,
    date: '15 Apr 2026',
    title: 'Webinar: "Outlook Ekonomi Indonesia 2026–2030"',
    location: 'Online',
    type: 'Webinar',
    startDate: new Date(2026, 3, 15),
    endDate: new Date(2026, 3, 15),
  },
  {
    id: 2,
    date: '10 Mei 2026',
    title: 'Forum: "Energi & Transisi Energi"',
    location: 'Jakarta',
    type: 'Forum',
    startDate: new Date(2026, 4, 10),
    endDate: new Date(2026, 4, 10),
  },
  {
    id: 3,
    date: '5 Jun 2026',
    title: 'Workshop: "Digital Sovereignty Masterclass"',
    location: 'Bandung',
    type: 'Workshop',
    startDate: new Date(2026, 5, 5),
    endDate: new Date(2026, 5, 5),
  },
  {
    id: 4,
    date: '20 Jul 2026',
    title: 'Forum: "Ketahanan Pangan Nasional"',
    location: 'Surabaya',
    type: 'Forum',
    startDate: new Date(2026, 6, 20),
    endDate: new Date(2026, 6, 20),
  },
  {
    id: 5,
    date: '15 Agu 2026',
    title: 'Webinar: "Hilirisasi Mineral: Update 2026"',
    location: 'Online',
    type: 'Webinar',
    startDate: new Date(2026, 7, 15),
    endDate: new Date(2026, 7, 15),
  },
  {
    id: 6,
    date: '1 Sep 2026',
    title: 'Forum: "SDM & Pendidikan untuk Indonesia 2045"',
    location: 'Jakarta',
    type: 'Forum',
    startDate: new Date(2026, 8, 1),
    endDate: new Date(2026, 8, 1),
  },
  {
    id: 7,
    date: '15–17 Okt 2026',
    title: 'INDONESIANISME SUMMIT 2026',
    location: 'Jakarta',
    type: 'Summit',
    startDate: new Date(2026, 9, 15),
    endDate: new Date(2026, 9, 17),
    isFeatured: true,
  },
  {
    id: 8,
    date: '10 Nov 2026',
    title: 'Post-Summit: "Thought Paper Launch"',
    location: 'Online',
    type: 'Webinar',
    startDate: new Date(2026, 10, 10),
    endDate: new Date(2026, 10, 10),
  },
];

const typeConfig: Record<CalendarEvent['type'], { label: string; color: string; dot: string }> = {
  Webinar:  { label: 'Webinar',  color: 'rgba(20,184,166,0.12)',  dot: '#14B8A6' },
  Forum:    { label: 'Forum',    color: 'rgba(59,130,246,0.12)',  dot: '#3B82F6' },
  Workshop: { label: 'Workshop', color: 'rgba(99,102,241,0.12)',  dot: '#6366F1' },
  Summit:   { label: 'Summit',   color: 'rgba(245,158,11,0.15)',  dot: '#F59E0B' },
};

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

function getGoogleCalendarUrl(event: CalendarEvent) {
  const fmt = (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${fmt(event.startDate)}/${fmt(event.endDate)}&location=${encodeURIComponent(event.location)}`;
}

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const year  = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthLabel = currentMonth.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  const calendarDays = useMemo(() => generateCalendarDays(year, month), [year, month]);

  const dayEventMap = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    events.forEach(ev => {
      if (ev.startDate.getFullYear() === year && ev.startDate.getMonth() === month) {
        const d = ev.startDate.getDate();
        (map[d] ??= []).push(ev);
      }
    });
    return map;
  }, [year, month]);

  const today = new Date();
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>

      {/* ── Hero ── */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-20 px-4">
        <HeroBG variant="purple" />
        <div className="relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-secondary)' }}>
              Jadwal Kegiatan
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Kalender 2026
            </h1>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Jangan lewatkan forum, webinar, dan summit strategis sepanjang tahun 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Controls ── */}
      <section className="max-w-4xl mx-auto px-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
        {/* Month nav */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth(new Date(year, month - 1))}
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-base font-bold w-40 text-center" style={{ color: 'var(--color-text-primary)' }}>
            {monthLabel}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(year, month + 1))}
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--glass-border)', background: 'var(--color-bg-card)' }}>
          {(['calendar', 'list'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-2 text-xs font-bold capitalize transition-all duration-200"
              style={{
                background: view === v ? 'var(--color-primary)' : 'transparent',
                color: view === v ? '#fff' : 'var(--color-text-secondary)',
              }}
            >
              {v === 'calendar' ? 'Kalender' : 'Daftar'}
            </button>
          ))}
        </div>
      </section>

      {/* ── Calendar View ── */}
      {view === 'calendar' && (
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--glass-border)', background: 'var(--color-bg-card)' }}
          >
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              {DAYS.map(d => (
                <div key={d} className="py-3 text-center text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-secondary)' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => {
                const evs = day ? (dayEventMap[day] ?? []) : [];
                const today_ = day ? isToday(day) : false;
                const hasEvent = evs.length > 0;
                const isLastRow = idx >= calendarDays.length - 7;

                return (
                  <div
                    key={idx}
                    onClick={() => hasEvent && setSelectedEvent(evs[0])}
                    className="relative p-2 md:p-3 min-h-18 transition-colors"
                    style={{
                      borderRight: (idx + 1) % 7 !== 0 ? '1px solid var(--glass-border)' : 'none',
                      borderBottom: !isLastRow ? '1px solid var(--glass-border)' : 'none',
                      cursor: hasEvent ? 'pointer' : 'default',
                      background: hasEvent ? 'rgba(255,255,255,0.02)' : 'transparent',
                    }}
                  >
                    {day && (
                      <>
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold mb-1"
                          style={{
                            background: today_ ? 'var(--color-primary)' : 'transparent',
                            color: today_ ? '#fff' : 'var(--color-text-secondary)',
                            fontWeight: today_ ? 700 : 400,
                          }}
                        >
                          {day}
                        </span>

                        {/* Event dots */}
                        {hasEvent && (
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {evs.slice(0, 3).map(ev => (
                              <span
                                key={ev.id}
                                className="block w-1.5 h-1.5 rounded-full"
                                style={{ background: typeConfig[ev.type].dot }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Event label — only on md+ */}
                        {hasEvent && (
                          <div className="hidden md:block mt-1 space-y-0.5">
                            {evs.slice(0, 1).map(ev => (
                              <span
                                key={ev.id}
                                className="block text-[10px] font-semibold px-1.5 py-0.5 rounded truncate"
                                style={{
                                  background: typeConfig[ev.type].color,
                                  color: typeConfig[ev.type].dot,
                                }}
                              >
                                {ev.type}
                              </span>
                            ))}
                            {evs.length > 1 && (
                              <span className="block text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                                +{evs.length - 1}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-5 justify-center">
            {Object.entries(typeConfig).map(([type, cfg]) => (
              <div key={type} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── List View ── */}
      {view === 'list' && (
        <section className="max-w-3xl mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {events.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="flex items-start gap-4 rounded-xl p-4 transition-colors"
                style={{
                  background: 'var(--color-bg-card)',
                  border: ev.isFeatured
                    ? `1px solid ${typeConfig.Summit.dot}40`
                    : '1px solid var(--glass-border)',
                }}
              >
                {/* Colored bar */}
                <div
                  className="shrink-0 w-1 self-stretch rounded-full"
                  style={{ background: typeConfig[ev.type].dot }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ background: typeConfig[ev.type].color, color: typeConfig[ev.type].dot }}
                    >
                      {ev.type}
                    </span>
                    {ev.isFeatured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
                        Utama
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold leading-snug mb-2"
                    style={{ color: ev.isFeatured ? typeConfig.Summit.dot : 'var(--color-text-primary)' }}>
                    {ev.title}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <Calendar className="w-3 h-3" />
                      {ev.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <MapPin className="w-3 h-3" />
                      {ev.location}
                    </span>
                  </div>
                </div>

                <a
                  href={getGoogleCalendarUrl(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 rounded-lg transition-colors"
                  style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
                  title="Tambah ke Google Calendar"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Event Detail Modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl p-6"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--glass-border)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                  style={{ background: typeConfig[selectedEvent.type].color, color: typeConfig[selectedEvent.type].dot }}
                >
                  {selectedEvent.type}
                </span>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 rounded-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-lg font-bold leading-snug mb-5"
                style={{ color: selectedEvent.isFeatured ? typeConfig.Summit.dot : 'var(--color-text-primary)' }}>
                {selectedEvent.title}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: typeConfig[selectedEvent.type].dot }} />
                  {selectedEvent.date}
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: typeConfig[selectedEvent.type].dot }} />
                  {selectedEvent.location}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={getGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Tambah ke Kalender
                </a>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
