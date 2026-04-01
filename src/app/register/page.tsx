'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Tag,
  CheckSquare,
  MessageCircle,
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
  { value: 'pelajar', label: 'Pelajar/Mahasiswa' },
  { value: 'delegasi', label: 'Delegasi Pemerintah' },
  { value: 'akademisi', label: 'Akademisi' },
  { value: 'media', label: 'Media' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    position: '',
    category: '',
    promoCode: '',
    termsAgreed: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        institution: '',
        position: '',
        category: '',
        promoCode: '',
        termsAgreed: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-primary)',
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--gradient-hero)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="px-4 md:px-8 py-20 md:py-32"
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Daftar Sekarang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Bergabunglah dengan ribuan peserta dari kalangan eksekutif, pemerintah,
            dan akademisi untuk mendiskusikan masa depan Indonesia yang lebih baik
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 md:px-8 py-12 md:py-20 max-w-2xl mx-auto">
        {/* Registration Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card-dark rounded-2xl p-8 md:p-10 mb-8"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <h2
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Formulir Pendaftaran
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <motion.div
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <User size={16} style={{ color: 'var(--color-primary)' }} />
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Masukkan nama lengkap Anda"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="email@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              custom={2}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Phone size={16} style={{ color: 'var(--color-primary)' }} />
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+62 812 3456 7890"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            {/* Institution */}
            <motion.div
              custom={3}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Building2 size={16} style={{ color: 'var(--color-primary)' }} />
                Institusi / Perusahaan
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="Nama institusi atau perusahaan"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            {/* Position */}
            <motion.div
              custom={4}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Briefcase size={16} style={{ color: 'var(--color-primary)' }} />
                Jabatan
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Jabatan atau posisi Anda"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            {/* Category */}
            <motion.div
              custom={5}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Tag size={16} style={{ color: 'var(--color-primary)' }} />
                Kategori Peserta
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="">Pilih kategori...</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Promo Code */}
            <motion.div
              custom={6}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Tag size={16} style={{ color: 'var(--color-primary)' }} />
                Kode Promo (Opsional)
              </label>
              <input
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleInputChange}
                placeholder="Masukkan kode promo jika ada"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px rgba(245, 166, 35, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            {/* Terms Agreement */}
            <motion.div
              custom={7}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                paddingTop: '0.5rem',
              }}
            >
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                required
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  marginTop: '0.125rem',
                  cursor: 'pointer',
                  accentColor: 'var(--color-primary)',
                }}
              />
              <label
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  lineHeight: '1.4',
                }}
              >
                Saya setuju dengan syarat & ketentuan Indonesianisme 2026 dan
                menyetujui penggunaan data saya untuk keperluan pendaftaran
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={8}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              style={{ paddingTop: '1rem' }}
            >
              <motion.button
                whileHover={!submitted ? { scale: 1.02 } : {}}
                whileTap={!submitted ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!formData.termsAgreed || submitted}
                style={{
                  width: '100%',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.5rem',
                  background: formData.termsAgreed
                    ? 'var(--color-primary)'
                    : 'var(--color-bg-primary)',
                  color: formData.termsAgreed
                    ? 'var(--color-bg-primary)'
                    : 'var(--color-text-secondary)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: formData.termsAgreed ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  opacity: !formData.termsAgreed ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (formData.termsAgreed && !submitted) {
                    e.currentTarget.style.boxShadow =
                      '0 8px 20px rgba(245, 166, 35, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {submitted ? 'Pendaftaran Berhasil!' : 'Daftar Sekarang'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: '1rem',
            padding: '2rem',
          }}
        >
          <h3
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'var(--color-text-primary)',
              textAlign: 'center',
            }}
          >
            Butuh Bantuan?
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* WhatsApp Contact */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/62"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'var(--color-bg-primary)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.background = 'var(--color-bg-primary)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
            >
              <MessageCircle size={18} />
              WhatsApp Support
            </motion.a>

            {/* Email Contact */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:info@indonesianisme.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'var(--color-bg-primary)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.background = 'var(--color-bg-primary)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
            >
              <Mail size={18} />
              Email Support
            </motion.a>
          </div>

          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            Tim kami siap membantu Anda 24/7 untuk menjawab semua pertanyaan
            terkait pendaftaran
          </p>
        </motion.div>
      </div>
    </div>
  );
}
