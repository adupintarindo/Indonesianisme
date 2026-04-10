'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Building2, Briefcase, Tag,
  MessageCircle, CheckCircle2, MapPin, CalendarDays,
  Users, Mic2, BookOpen, ArrowRight, Star, Shield,
  Zap, ChevronRight,
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  position: string;
  category: string;
  promoCode: string;
  termsAgreed: boolean;
}

const categories = [
  { value: 'umum', label: 'Umum' },
  { value: 'pelajar', label: 'Pelajar / Mahasiswa' },
  { value: 'delegasi', label: 'Delegasi Pemerintah' },
  { value: 'akademisi', label: 'Akademisi / Peneliti' },
  { value: 'media', label: 'Media & Jurnalis' },
];

const benefits = [
  { icon: Mic2, title: '80+ Pembicara Nasional', desc: 'Menteri, CEO, akademisi top Indonesia' },
  { icon: BookOpen, title: '9 Agenda Strategis', desc: 'Asta Cita: peta jalan Indonesia Emas 2045' },
  { icon: Users, title: '5.000+ Peserta', desc: 'Jejaring eksekutif, pemerintah, inovator' },
  { icon: Zap, title: 'Knowledge Platform', desc: 'Akses 80 Thought Papers & Policy Briefs' },
];

const stats = [
  { value: '5.000+', label: 'Peserta' },
  { value: '80+', label: 'Pembicara' },
  { value: '3', label: 'Hari' },
  { value: '9', label: 'Agenda' },
];

const waGroups = [
  { color: '#16A34A', bg: 'rgba(22,163,74,0.08)', topic: 'Kedaulatan Pangan', desc: 'Hilirisasi agri, ketahanan pangan', members: '~120 anggota' },
  { color: '#2563EB', bg: 'rgba(37,99,235,0.08)', topic: 'Reindustrialisasi', desc: 'Manufaktur, TKDN, industri hi-tech', members: '~95 anggota' },
  { color: '#EA580C', bg: 'rgba(234,88,12,0.08)', topic: 'Energi & EBT', desc: 'Transisi energi & kedaulatan EBT', members: '~88 anggota' },
  { color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', topic: 'Ekonomi Digital', desc: 'AI, fintech, transformasi digital', members: '~140 anggota' },
  { color: '#64748B', bg: 'rgba(100,116,139,0.08)', topic: 'Pertahanan & Geopolitik', desc: 'Alutsista, geopolitik nasional', members: '~60 anggota' },
  { color: '#DC2626', bg: 'rgba(220,38,38,0.08)', topic: 'Kesehatan & Farmasi', desc: 'Kemandirian farmasi, biotech', members: '~75 anggota' },
  { color: '#0891B2', bg: 'rgba(8,145,178,0.08)', topic: 'Lingkungan & Sirkular', desc: 'Ekonomi sirkular, karbon', members: '~55 anggota' },
  { color: '#9333EA', bg: 'rgba(147,51,234,0.08)', topic: 'Tata Kelola & UMKM', desc: 'Deregulasi, UMKM, e-gov', members: '~80 anggota' },
];

function InputField({
  icon: Icon, label, name, type = 'text', placeholder, value, onChange, required,
}: {
  icon: React.ElementType; label: string; name: string; type?: string;
  placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        className="flex items-center gap-1.5 mb-2 text-[11px] font-bold tracking-widest uppercase"
        style={{ color: focused ? 'var(--color-secondary)' : 'var(--color-text-secondary)' }}
      >
        <Icon size={11} />
        {label}
        {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '0.75rem 1rem', borderRadius: '0.625rem',
          background: focused ? 'rgba(245,158,11,0.04)' : 'var(--color-bg-secondary)',
          border: `1.5px solid ${focused ? 'rgba(245,158,11,0.55)' : 'var(--glass-border)'}`,
          color: 'var(--color-text-primary)', fontSize: '0.875rem', outline: 'none',
          transition: 'all 0.2s',
          boxShadow: focused ? '0 0 0 3px rgba(245,158,11,0.10)' : '0 1px 2px rgba(0,0,0,0.04)',
        }}
        className="placeholder:text-slate-400"
      />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-muted)' }}>
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--glass-border)' }} />
    </div>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', phone: '', institution: '',
    position: '', category: '', promoCode: '', termsAgreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ fullName: '', email: '', phone: '', institution: '', position: '', category: '', promoCode: '', termsAgreed: false });
      setSubmitted(false);
    }, 4000);
  };

  const isReady = formData.termsAgreed && !submitted;

  return (
    <div style={{ background: 'var(--color-bg-secondary)', minHeight: '100vh' }}>
      <div className="lg:grid lg:grid-cols-[420px_1fr] xl:grid-cols-[460px_1fr] lg:min-h-screen">

        {/* ═══ LEFT PANEL — Sticky sidebar (dark) ═══ */}
        <div
          className="relative lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col"
          style={{ background: 'linear-gradient(160deg, #0d1f3c 0%, #122444 45%, #0e1d38 75%, #091629 100%)' }}
        >
          {/* Aurora */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full" style={{ width: '85%', height: '65%', top: '-25%', left: '-20%', background: 'radial-gradient(circle, rgba(37,99,235,0.40) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            <div className="absolute rounded-full" style={{ width: '65%', height: '55%', bottom: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 65%)', filter: 'blur(70px)' }} />
            <div className="absolute rounded-full" style={{ width: '45%', height: '40%', top: '45%', right: '-5%', background: 'radial-gradient(circle, rgba(20,184,166,0.16) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
              <defs>
                <pattern id="reg-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#60A5FA" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#reg-dots)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full px-8 py-10 lg:py-12 overflow-y-auto">

            {/* Brand */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#05091a' }}>I</div>
                <span className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Indonesianisme 2026
                </span>
              </div>
            </motion.div>

            {/* Urgency badge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.30)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#EF4444' }} />
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#FCA5A5' }}>
                Pendaftaran Dibuka
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mb-8">
              <h1 className="font-black leading-[1.08] mb-4"
                style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', color: '#fff' }}>
                Jadilah Bagian dari<br />
                <span style={{ background: 'linear-gradient(90deg, #F59E0B 0%, #FCD34D 50%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Momentum Sejarah
                </span>
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 320 }}>
                Summit nasional terbesar untuk merumuskan strategi Indonesia menuju pertumbuhan 8% dan kedaulatan di semua sektor.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="grid grid-cols-4 gap-2 mb-8 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-black text-base leading-tight" style={{ color: '#F59E0B' }}>{s.value}</div>
                  <div className="text-[10px] leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
                    <b.icon size={14} style={{ color: '#F59E0B' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.90)' }}>{b.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="border-t mb-6" style={{ borderColor: 'rgba(255,255,255,0.09)' }} />

            {/* Event meta */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="space-y-2.5 mb-auto">
              {[
                { Icon: CalendarDays, text: 'Oktober 2026 · 3 Hari Penuh' },
                { Icon: MapPin, text: 'Jakarta Convention Center, Indonesia' },
                { Icon: Shield, text: 'Diselenggarakan oleh IA-ITB' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon size={13} style={{ color: '#F59E0B' }} />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.52)' }}>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="mt-6 p-4 rounded-2xl"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#F59E0B" style={{ color: '#F59E0B' }} />)}
              </div>
              <p className="text-xs leading-relaxed italic mb-2" style={{ color: 'rgba(255,255,255,0.58)' }}>
                "Forum paling strategis yang pernah saya hadiri. Koneksi dan insight yang didapat luar biasa."
              </p>
              <p className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.32)' }}>
                — Peserta Indonesianisme 2025
              </p>
            </motion.div>
          </div>
        </div>

        {/* ═══ RIGHT PANEL — Form + WA sidebar (LIGHT) ═══ */}
        <div
          className="lg:overflow-y-auto lg:h-screen"
          style={{ background: 'var(--color-bg-secondary)' }}
        >
          <div className="max-w-4xl mx-auto px-6 py-10 lg:py-12 lg:px-10">

            {/* Form header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-2" style={{ color: 'var(--color-primary)' }}>
                Formulir Pendaftaran
              </p>
              <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', color: 'var(--color-text-primary)' }}>
                Amankan Tempat Anda
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Isi data di bawah untuk mendaftar. Konfirmasi dikirim via email.
              </p>
            </motion.div>

            {/* Two-column: form | WA groups */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_268px] gap-6 items-start">

              {/* ── Form card ── */}
              <div className="rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.05)',
                }}>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success"
                      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-20 px-8">
                      <div className="w-16 h-16 rounded-full mb-5 flex items-center justify-center"
                        style={{ background: 'rgba(34,197,94,0.10)', border: '2px solid rgba(34,197,94,0.30)' }}>
                        <CheckCircle2 size={32} style={{ color: '#16A34A' }} />
                      </div>
                      <h3 className="text-xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>Pendaftaran Berhasil!</h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Cek email Anda untuk konfirmasi & detail selanjutnya.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                      {/* Section: Identitas */}
                      <div>
                        <SectionLabel>Informasi Pribadi</SectionLabel>
                        <div className="space-y-4">
                          <InputField icon={User} label="Nama Lengkap" name="fullName"
                            placeholder="Masukkan nama lengkap Anda"
                            value={formData.fullName} onChange={handleInputChange} required />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField icon={Mail} label="Email" name="email" type="email"
                              placeholder="email@example.com"
                              value={formData.email} onChange={handleInputChange} required />
                            <InputField icon={Phone} label="Nomor Telepon" name="phone" type="tel"
                              placeholder="+62 812 3456 7890"
                              value={formData.phone} onChange={handleInputChange} required />
                          </div>
                        </div>
                      </div>

                      {/* Section: Profil */}
                      <div>
                        <SectionLabel>Profil Peserta</SectionLabel>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField icon={Building2} label="Institusi / Perusahaan" name="institution"
                              placeholder="Nama institusi"
                              value={formData.institution} onChange={handleInputChange} />
                            <InputField icon={Briefcase} label="Jabatan" name="position"
                              placeholder="Jabatan Anda"
                              value={formData.position} onChange={handleInputChange} />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Category select */}
                            <div>
                              <label className="flex items-center gap-1.5 mb-2 text-[11px] font-bold tracking-widest uppercase"
                                style={{ color: selectFocused ? 'var(--color-secondary)' : 'var(--color-text-secondary)' }}>
                                <Tag size={11} />
                                Kategori Peserta <span style={{ color: '#EF4444' }}>*</span>
                              </label>
                              <select name="category" value={formData.category} onChange={handleInputChange} required
                                onFocus={() => setSelectFocused(true)} onBlur={() => setSelectFocused(false)}
                                style={{
                                  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.625rem',
                                  background: selectFocused ? 'rgba(245,158,11,0.04)' : 'var(--color-bg-secondary)',
                                  border: `1.5px solid ${selectFocused ? 'rgba(245,158,11,0.55)' : 'var(--glass-border)'}`,
                                  color: formData.category ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                                  fontSize: '0.875rem', outline: 'none',
                                  boxShadow: selectFocused ? '0 0 0 3px rgba(245,158,11,0.10)' : '0 1px 2px rgba(0,0,0,0.04)',
                                  transition: 'all 0.2s', appearance: 'none', cursor: 'pointer',
                                }}>
                                <option value="" style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}>Pilih kategori...</option>
                                {categories.map(cat => (
                                  <option key={cat.value} value={cat.value} style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)' }}>{cat.label}</option>
                                ))}
                              </select>
                            </div>
                            <InputField icon={Tag} label="Kode Promo (Opsional)" name="promoCode"
                              placeholder="Kode promo"
                              value={formData.promoCode} onChange={handleInputChange} />
                          </div>
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="rounded-xl p-4 cursor-pointer transition-all duration-200"
                        style={{
                          background: formData.termsAgreed ? 'rgba(245,158,11,0.06)' : 'var(--color-bg-secondary)',
                          border: `1.5px solid ${formData.termsAgreed ? 'rgba(245,158,11,0.35)' : 'var(--glass-border)'}`,
                        }}
                        onClick={() => setFormData(p => ({ ...p, termsAgreed: !p.termsAgreed }))}>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200"
                            style={{
                              background: formData.termsAgreed ? '#F59E0B' : 'transparent',
                              border: `2px solid ${formData.termsAgreed ? '#F59E0B' : 'var(--glass-border)'}`,
                            }}>
                            {formData.termsAgreed && <CheckCircle2 size={12} style={{ color: '#FFFFFF' }} />}
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            Saya setuju dengan{' '}
                            <span style={{ color: 'var(--color-secondary)' }}>syarat &amp; ketentuan</span>{' '}
                            Indonesianisme 2026 dan menyetujui penggunaan data saya untuk keperluan pendaftaran.
                          </p>
                        </div>
                      </div>

                      {/* Submit */}
                      <div>
                        <motion.button
                          type="submit"
                          disabled={!isReady}
                          whileHover={isReady ? { scale: 1.01 } : {}}
                          whileTap={isReady ? { scale: 0.98 } : {}}
                          className="w-full flex items-center justify-center gap-2.5 font-bold text-sm py-3.5 rounded-xl transition-all"
                          style={{
                            background: isReady ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'var(--color-bg-tertiary)',
                            color: isReady ? '#FFFFFF' : 'var(--color-text-muted)',
                            border: isReady ? 'none' : '1.5px solid var(--glass-border)',
                            cursor: isReady ? 'pointer' : 'not-allowed',
                            boxShadow: isReady ? '0 6px 24px rgba(245,158,11,0.30)' : 'none',
                            letterSpacing: '0.03em',
                          }}>
                          Daftar Sekarang
                          {isReady && <ArrowRight size={16} />}
                        </motion.button>

                        {/* Contact */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                          <a href="https://wa.me/62" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs no-underline opacity-60 hover:opacity-100 transition-opacity"
                            style={{ color: '#16A34A' }}>
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                          <span style={{ color: 'var(--color-text-muted)' }}>|</span>
                          <a href="mailto:info@indonesianisme.com"
                            className="flex items-center gap-1.5 text-xs no-underline opacity-60 hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--color-text-secondary)' }}>
                            <Mail size={12} /> Email Support
                          </a>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* ── WA Groups sidebar ── */}
              <motion.div
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="xl:sticky xl:top-8 rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                {/* Header */}
                <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>Grup Diskusi Topik</h3>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                    Komunitas aktif sebelum &amp; sesudah acara
                  </p>
                </div>

                {/* Group list */}
                <div className="p-3 space-y-1.5">
                  {waGroups.map((g, i) => (
                    <motion.a
                      key={i}
                      href="https://chat.whatsapp.com/invite"
                      target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.04 }}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline group transition-all duration-150"
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = g.bg;
                        e.currentTarget.style.border = `1px solid ${g.color}30`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.border = '1px solid transparent';
                      }}
                    >
                      {/* Color dot */}
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: g.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold leading-tight truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {g.topic}
                        </p>
                        <p className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>
                          {g.members}
                        </p>
                      </div>
                      <ChevronRight size={12} className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: g.color }} />
                    </motion.a>
                  ))}
                </div>

                {/* Footer note */}
                <div className="px-5 py-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <p className="text-[10px] text-center" style={{ color: 'var(--color-text-muted)' }}>
                    Link grup dikirim setelah pendaftaran dikonfirmasi
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
