'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Download } from 'lucide-react';
import { useState, useMemo } from 'react';

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
    title: 'Webinar: "Outlook Ekonomi Indonesia 2026-2030"',
    location: 'Online',
    type: 'Webinar',
    startDate: new Date(2026, 3, 15),
    endDate: new Date(2026, 3, 15),
  },
  {
    id: 2,
    date: '10 May 2026',
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
    date: '15 Aug 2026',
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
    date: '15-17 Oct 2026',
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

const typeColors = {
  Webinar: { bg: 'bg-teal/20', text: 'text-teal', dot: 'bg-teal' },
  Forum: { bg: 'bg-itb-blue/20', text: 'text-itb-blue', dot: 'bg-itb-blue' },
  Workshop: { bg: 'bg-sky-blue/20', text: 'text-sky-blue', dot: 'bg-sky-blue' },
  Summit: { bg: 'bg-gold/20', text: 'text-gold', dot: 'bg-gold' },
};

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: (number | null)[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
}

function getGoogleCalendarUrl(event: CalendarEvent) {
  const startDate = event.startDate.toISOString().split('T')[0].replace(/-/g, '');
  const endDate = event.endDate.toISOString().split('T')[0].replace(/-/g, '');
  const text = encodeURIComponent(event.title);
  const location = encodeURIComponent(event.location);
  const details = encodeURIComponent(`Bergabunglah dengan kami pada ${event.title}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  const calendarDays = useMemo(() => generateCalendarDays(year, month), [year, month]);

  const monthEvents = useMemo(() => {
    return events.filter(event => {
      return event.startDate.getFullYear() === year && event.startDate.getMonth() === month;
    });
  }, [year, month]);

  const dayToEventsMap = useMemo(() => {
    const map: Record<number, CalendarEvent[]> = {};
    monthEvents.forEach(event => {
      const day = event.startDate.getDate();
      if (!map[day]) map[day] = [];
      map[day].push(event);
    });
    return map;
  }, [monthEvents]);

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

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
              Kalender Kegiatan Indonesianisme
            </h1>
            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto">
              Jangan lewatkan acara, forum, dan webinar strategis kami sepanjang tahun 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="py-8 border-b border-gold/10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h2 className="text-xl font-plus-jakarta font-bold text-pearl-white">
            {monthName}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-plus-jakarta font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-gold text-deep-navy'
                  : 'border border-gold/30 text-gold hover:border-gold/60'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-plus-jakarta font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-gold text-deep-navy'
                  : 'border border-gold/30 text-gold hover:border-gold/60'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </section>

      {/* Calendar View */}
      {viewMode === 'grid' && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-card-dark p-8 rounded-xl"
            >
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={previousMonth}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-gold" />
                </button>

                <h2 className="text-2xl font-bold text-pearl-white font-plus-jakarta">
                  {monthName}
                </h2>

                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-gold" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                  <div key={day} className="text-center font-plus-jakarta font-bold text-gold text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => {
                  const dayEvents = day ? dayToEventsMap[day] || [] : [];
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                  return (
                    <div
                      key={idx}
                      className={`min-h-24 p-2 rounded-lg border transition-all cursor-pointer ${
                        day
                          ? isToday
                            ? 'bg-gold/10 border-gold'
                            : 'bg-deep-navy/30 border-gold/20 hover:border-gold/40'
                          : 'bg-transparent border-transparent'
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-plus-jakarta font-bold mb-1 ${isToday ? 'text-gold' : 'text-warm-gray-light'}`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`text-xs px-2 py-1 rounded w-full text-left line-clamp-1 ${typeColors[event.type].bg} ${typeColors[event.type].text} hover:opacity-80 transition-opacity`}
                              >
                                {event.type === 'Summit' ? '★ Summit' : event.type}
                              </button>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-warm-gray-light px-2">
                                +{dayEvents.length - 2} lainnya
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-6 justify-center">
              {Object.entries(typeColors).map(([type, colors]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                  <span className="text-sm text-warm-gray-light">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-6">
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-card-dark p-6 border-l-4 ${event.isFeatured ? 'border-gold' : typeColors[event.type].dot}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-plus-jakarta font-bold px-3 py-1 rounded ${typeColors[event.type].bg} ${typeColors[event.type].text}`}>
                          {event.type}
                        </span>
                        {event.isFeatured && (
                          <span className="text-sm font-plus-jakarta font-bold px-3 py-1 bg-gold/20 text-gold rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className={`font-plus-jakarta font-bold mb-3 ${event.isFeatured ? 'text-gold text-lg' : 'text-pearl-white'}`}>
                        {event.title}
                      </h3>

                      <div className="flex flex-col gap-2 text-warm-gray-light text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={getGoogleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-all whitespace-nowrap"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-plus-jakarta font-bold">Add to Calendar</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-card-dark max-w-xl w-full p-8 rounded-xl"
            >
              <div className="mb-4">
                <span className={`text-sm font-plus-jakarta font-bold px-3 py-1 rounded ${typeColors[selectedEvent.type].bg} ${typeColors[selectedEvent.type].text}`}>
                  {selectedEvent.type}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-pearl-white font-plus-jakarta mb-6">
                {selectedEvent.title}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="text-warm-gray-light">{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-warm-gray-light">{selectedEvent.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={getGoogleCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Add to Calendar
                </a>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 px-4 py-3 border-2 border-gold/30 text-gold font-plus-jakarta font-bold rounded-lg hover:border-gold/60 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscribe Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-deep-navy to-itb-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pearl-white font-plus-jakarta mb-6">
              Berlangganan Kalender Kami
            </h2>

            <p className="text-warm-gray-light mb-8 max-w-xl mx-auto">
              Dapatkan update terbaru tentang semua acara langsung ke kalender Anda.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-deep-navy font-plus-jakarta font-bold rounded-lg hover:bg-gold-light transition-colors text-lg"
            >
              <Download className="w-5 h-5" />
              Unduh iCalendar
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
