'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';
import { HeroBG } from '@/components/shared/HeroBG';

type MediaItem = {
  id: number;
  url: string;
  category: 'Foto' | 'Video';
  year: number;
  height: number;
};

const mediaItems: MediaItem[] = [
  { id: 1, url: 'https://picsum.photos/400/600?random=1', category: 'Foto', year: 2022, height: 600 },
  { id: 2, url: 'https://picsum.photos/600/300?random=2', category: 'Foto', year: 2022, height: 300 },
  { id: 3, url: 'https://picsum.photos/400/500?random=3', category: 'Foto', year: 2026, height: 500 },
  { id: 4, url: 'https://picsum.photos/600/400?random=4', category: 'Video', year: 2026, height: 400 },
  { id: 5, url: 'https://picsum.photos/400/600?random=5', category: 'Foto', year: 2017, height: 600 },
  { id: 6, url: 'https://picsum.photos/400/400?random=6', category: 'Foto', year: 2016, height: 400 },
  { id: 7, url: 'https://picsum.photos/600/350?random=7', category: 'Video', year: 2026, height: 350 },
  { id: 8, url: 'https://picsum.photos/400/500?random=8', category: 'Foto', year: 2022, height: 500 },
  { id: 9, url: 'https://picsum.photos/600/400?random=9', category: 'Foto', year: 2017, height: 400 },
  { id: 10, url: 'https://picsum.photos/400/550?random=10', category: 'Video', year: 2016, height: 550 },
  { id: 11, url: 'https://picsum.photos/600/380?random=11', category: 'Foto', year: 2026, height: 380 },
  { id: 12, url: 'https://picsum.photos/400/480?random=12', category: 'Foto', year: 2022, height: 480 },
];

const videoThumbnails = [
  { id: 'v1', url: 'https://picsum.photos/300/300?random=20' },
  { id: 'v2', url: 'https://picsum.photos/300/300?random=21' },
  { id: 'v3', url: 'https://picsum.photos/300/300?random=22' },
];

const categories = ['Semua', 'Foto', 'Video', '2016', '2017', '2022', '2026'];

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = mediaItems.filter(item => {
    if (selectedFilter === 'Semua') return true;
    if (selectedFilter === 'Foto') return item.category === 'Foto';
    if (selectedFilter === 'Video') return item.category === 'Video';
    return item.year === parseInt(selectedFilter);
  });

  const handleLightbox = (item: MediaItem) => {
    setLightboxItem(item);
    setLightboxIndex(filtered.indexOf(item));
  };

  const handleNextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filtered.length;
    setLightboxItem(filtered[nextIndex]);
    setLightboxIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxItem(filtered[prevIndex]);
    setLightboxIndex(prevIndex);
  };

  return (
    <div className="w-full min-h-screen bg-deep-navy">
      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
        <HeroBG variant="default" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-pearl-white font-plus-jakarta mb-4">
              Galeri Indonesianisme
            </h1>
            <p className="text-warm-gray-light text-lg max-w-2xl mx-auto">
              Jelajahi momen-momen penting dari kegiatan, forum, dan acara strategis Indonesianisme
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 z-40 bg-deep-navy/95 backdrop-blur border-b border-gold/10 py-6">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex gap-3 overflow-x-auto pb-2"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-lg font-plus-jakarta font-bold whitespace-nowrap transition-all ${
                  selectedFilter === cat
                    ? 'bg-gold text-deep-navy'
                    : 'bg-deep-navy border border-gold/30 text-gold hover:border-gold/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleLightbox(item)}
                  className="break-inside-avoid mb-6 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-lg h-full">
                    <motion.img
                      src={item.url}
                      alt={`Gallery ${item.id}`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {item.category === 'Video' && (
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                        <Play className="w-12 h-12 text-gold" fill="currentColor" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="inline-block px-3 py-1 bg-gold text-deep-navy rounded text-sm font-bold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-deep-navy/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-pearl-white font-plus-jakarta mb-12 text-center"
          >
            Video Unggulan
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoThumbnails.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={video.url}
                  alt={`Video ${idx + 1}`}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gold rounded-full flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 text-deep-navy ml-1" fill="currentColor" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={lightboxItem.url}
                alt="Lightbox"
                className="w-full h-auto rounded-lg"
              />

              {lightboxItem.category === 'Video' && (
                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-gold" fill="currentColor" />
                </div>
              )}

              {/* Navigation */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gold/20 hover:bg-gold/40 text-gold p-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gold/20 hover:bg-gold/40 text-gold p-2 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 bg-gold/20 hover:bg-gold/40 text-gold p-2 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Caption */}
              <div className="mt-4 text-center text-warm-gray-light">
                <p className="text-sm">
                  {lightboxItem.category} • {lightboxItem.year} • {lightboxIndex + 1} dari {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
