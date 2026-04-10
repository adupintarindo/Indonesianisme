'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, Users, Printer, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { HeroBG } from '@/components/shared/HeroBG';

/* ─── Mock data (replace with real API / Google Sheets lookup) ─── */
const MOCK_PESERTA = [
  { id: 'IND2026-001', name: 'Dr. Ahmad Fauzi, M.T.', institution: 'Universitas Indonesia', category: 'Akademisi' },
  { id: 'IND2026-002', name: 'Budi Santoso, S.T.', institution: 'Kementerian Perindustrian', category: 'Delegasi Pemerintah' },
  { id: 'IND2026-003', name: 'Rina Wulandari', institution: 'Institut Teknologi Bandung', category: 'Pelajar/Mahasiswa' },
];

const MOCK_PEMBICARA = [
  { id: 'SPK-001', name: 'Prof. Dr. Ridwan Kamil, M.U.D.', institution: 'Ikatan Alumni ITB', topic: 'Reindustrialisasi dan Tata Ruang Nasional' },
  { id: 'SPK-002', name: 'Dr. Ir. Bambang Brodjonegoro', institution: 'Kementerian Riset dan Teknologi', topic: 'Kedaulatan Teknologi untuk Indonesia Emas' },
  { id: 'SPK-003', name: 'Indra Utoyo, M.B.A.', institution: 'Telkom Indonesia', topic: 'Transformasi Digital Industri Manufaktur' },
];

type TabType = 'peserta' | 'pembicara';
type StatusType = 'idle' | 'loading' | 'found' | 'notfound';

interface PesertaResult {
  type: 'peserta';
  id: string;
  name: string;
  institution: string;
  category: string;
}

interface PembicaraResult {
  type: 'pembicara';
  id: string;
  name: string;
  institution: string;
  topic: string;
}

type Result = PesertaResult | PembicaraResult;

export default function SertifikatPage() {
  const [activeTab, setActiveTab] = useState<TabType>('peserta');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusType>('idle');
  const [result, setResult] = useState<Result | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setStatus('idle');
    setResult(null);
    setQuery('');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus('loading');
    setResult(null);

    setTimeout(() => {
      const q = query.toLowerCase().trim();
      if (activeTab === 'peserta') {
        const found = MOCK_PESERTA.find(
          (p) => p.id.toLowerCase() === q || p.name.toLowerCase().includes(q)
        );
        if (found) {
          setResult({ ...found, type: 'peserta' });
          setStatus('found');
        } else {
          setStatus('notfound');
        }
      } else {
        const found = MOCK_PEMBICARA.find(
          (p) => p.id.toLowerCase() === q || p.name.toLowerCase().includes(q)
        );
        if (found) {
          setResult({ ...found, type: 'pembicara' });
          setStatus('found');
        } else {
          setStatus('notfound');
        }
      }
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 3rem',
    borderRadius: '0.625rem',
    background: 'var(--color-bg-primary)',
    border: '1.5px solid var(--glass-border)',
    color: 'var(--color-text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #certificate-print-root { display: block !important; }
          #certificate-print-root * { display: revert !important; }
          @page { size: A4 landscape; margin: 0; }
        }
        #certificate-print-root { display: none; }
      `}</style>

      {/* ── Printable certificate (hidden on screen, visible only on print) ── */}
      <div id="certificate-print-root">
        {result && <CertificatePrint result={result} />}
      </div>

      {/* ── Screen UI ── */}
      <div style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 md:px-8 py-16 md:py-24">
          <HeroBG variant="dark" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6 no-underline hover:no-underline transition-colors"
              style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 500 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="flex items-center gap-4 mb-6">
              {/* Logo badge */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', boxShadow: '0 8px 24px rgba(59,130,246,0.35)' }}
              >
                IN
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary-light)' }}>
                  Indonesianisme 2026 · IA-ITB
                </p>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#fff', lineHeight: 1.2 }}>
                  Cetak Sertifikat Peserta
                </h1>
              </div>
            </div>

            <p style={{ color: 'rgba(209,213,219,0.8)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Masukkan ID Peserta, nama lengkap, atau nomor HP untuk mengambil sertifikat kehadiran Anda.
            </p>
          </div>
        </section>

        {/* ── Main Card ── */}
        <div className="px-4 md:px-8 py-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '1.25rem',
              overflow: 'hidden',
            }}
          >
            {/* Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--glass-border)' }}>
              {(['peserta', 'pembicara'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tab ? '#fff' : 'var(--color-text-secondary)',
                  }}
                >
                  {tab === 'peserta' ? <Users className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                  {tab === 'peserta' ? 'Peserta' : 'Pembicara'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleVerify}>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <Search
                    className="w-4 h-4"
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-muted)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ID Peserta, Nama Lengkap, atau Email"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || !query.trim()}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '0.625rem',
                    background: query.trim() ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                    color: query.trim() ? '#fff' : 'var(--color-text-muted)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: query.trim() && status !== 'loading' ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    'Verifikasi Data'
                  )}
                </button>
              </form>

              {/* Result area */}
              <AnimatePresence mode="wait">
                {status === 'notfound' && (
                  <motion.div
                    key="notfound"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      marginTop: '1.25rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: '#EF4444',
                    }}
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Data tidak ditemukan</p>
                      <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.125rem' }}>
                        Pastikan ID, nama, atau email yang dimasukkan sudah benar. Hubungi panitia jika masalah berlanjut.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === 'found' && result && (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ marginTop: '1.25rem' }}
                  >
                    {/* Success badge */}
                    <div
                      style={{
                        padding: '0.875rem 1.25rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(34,197,94,0.08)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#22C55E',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Data ditemukan — sertifikat siap dicetak</p>
                    </div>

                    {/* Preview card */}
                    <CertificatePreview result={result} />

                    {/* Print button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrint}
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        padding: '0.875rem',
                        borderRadius: '0.625rem',
                        background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
                      }}
                    >
                      <Printer className="w-4 h-4" />
                      Cetak / Simpan sebagai PDF
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Help text */}
              <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                Butuh bantuan?{' '}
                <a href="mailto:info@indonesianisme.id" style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}>
                  Hubungi panitia
                </a>
                {' '}atau kunjungi meja registrasi.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/* ─── Certificate Preview (screen) ────────────────────────────────── */
function CertificatePreview({ result }: { result: Result }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #1A3A6B 100%)',
        borderRadius: '0.875rem',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(59,130,246,0.3)',
      }}
    >
      {/* Corner deco */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '8rem', height: '8rem', background: 'rgba(59,130,246,0.08)', borderRadius: '0 0 0 100%' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg,#2563EB,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>IN</div>
        <div>
          <p style={{ color: 'rgba(147,197,253,0.9)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Indonesianisme 2026 · IA-ITB</p>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
            Sertifikat {result.type === 'peserta' ? 'Kehadiran Peserta' : 'Pembicara'}
          </p>
        </div>
      </div>

      <p style={{ color: 'rgba(209,213,219,0.7)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Diberikan kepada</p>
      <p style={{ color: '#DBEAFE', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>{result.name}</p>
      <p style={{ color: 'rgba(147,197,253,0.8)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{result.institution}</p>

      {result.type === 'peserta' ? (
        <span style={{ display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '999px', background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', color: '#93C5FD', fontSize: '0.75rem', fontWeight: 600 }}>
          {result.category}
        </span>
      ) : (
        <p style={{ color: 'rgba(209,213,219,0.7)', fontSize: '0.8rem', fontStyle: 'italic' }}>"{result.topic}"</p>
      )}

      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(59,130,246,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'rgba(147,197,253,0.7)', fontSize: '0.7rem' }}>Jakarta Convention Center · 15 Agustus 2026</p>
        <p style={{ color: 'rgba(147,197,253,0.7)', fontSize: '0.7rem', fontFamily: 'monospace' }}>{result.id}</p>
      </div>
    </div>
  );
}

/* ─── Certificate for Print (A4 Landscape) ────────────────────────── */
function CertificatePrint({ result }: { result: Result }) {
  return (
    <div
      style={{
        width: '297mm',
        height: '210mm',
        background: '#fff',
        fontFamily: 'Georgia, serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top gradient bar */}
      <div style={{ height: '12mm', background: 'linear-gradient(90deg, #1E3A5F 0%, #2563EB 60%, #3B82F6 100%)' }} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30mm', textAlign: 'center' }}>
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6mm' }}>
          <div style={{ width: '14mm', height: '14mm', borderRadius: '3mm', background: 'linear-gradient(135deg,#2563EB,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '5mm', fontFamily: 'Arial, sans-serif' }}>IN</div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '4mm', fontWeight: 700, color: '#1E3A5F', fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em' }}>INDONESIANISME 2026</p>
            <p style={{ margin: 0, fontSize: '2.5mm', color: '#4B5563', fontFamily: 'Arial, sans-serif' }}>Ikatan Alumni Institut Teknologi Bandung</p>
          </div>
        </div>

        <div style={{ width: '40mm', height: '0.3mm', background: '#D97706', marginBottom: '5mm' }} />

        <p style={{ margin: '0 0 3mm', fontSize: '3.5mm', color: '#6B7280', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
          Sertifikat {result.type === 'peserta' ? 'Kehadiran' : 'Pembicara'}
        </p>

        <p style={{ margin: '0 0 2mm', fontSize: '3mm', color: '#9CA3AF', fontFamily: 'Arial, sans-serif' }}>Diberikan kepada</p>

        <p style={{ margin: '0 0 3mm', fontSize: '9mm', fontWeight: 700, color: '#111827', fontStyle: 'italic', lineHeight: 1.1 }}>{result.name}</p>

        <p style={{ margin: '0 0 2mm', fontSize: '3.5mm', color: '#374151', fontFamily: 'Arial, sans-serif' }}>{result.institution}</p>

        {result.type === 'peserta' ? (
          <p style={{ margin: '0 0 4mm', fontSize: '3mm', color: '#6B7280', fontFamily: 'Arial, sans-serif' }}>
            Kategori: <strong>{result.category}</strong>
          </p>
        ) : (
          <p style={{ margin: '0 0 4mm', fontSize: '3.5mm', color: '#374151', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            "{result.topic}"
          </p>
        )}

        <p style={{ margin: '0 0 6mm', fontSize: '3mm', color: '#6B7280', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
          Atas {result.type === 'peserta' ? 'kehadirannya sebagai peserta' : 'kontribusinya sebagai pembicara'} dalam<br />
          <strong style={{ color: '#1E3A5F' }}>Forum Nasional Indonesianisme 2026</strong><br />
          Jakarta Convention Center, 15 Agustus 2026
        </p>

        <div style={{ width: '40mm', height: '0.2mm', background: '#E5E7EB', marginBottom: '5mm' }} />

        {/* Signatures */}
        <div style={{ display: 'flex', gap: '30mm', justifyContent: 'center' }}>
          {[
            { name: 'Prof. Dr. Reini D. Wirahadikusumah', title: 'Ketua Umum IA-ITB' },
            { name: 'Dr. Ir. Ganesha Wicaksana', title: 'Ketua Panitia Indonesianisme 2026' },
          ].map((sig) => (
            <div key={sig.name} style={{ textAlign: 'center', minWidth: '50mm' }}>
              <div style={{ width: '40mm', height: '8mm', borderBottom: '0.5mm solid #374151', margin: '0 auto 1.5mm' }} />
              <p style={{ margin: '0 0 0.5mm', fontSize: '2.8mm', fontWeight: 700, color: '#111827', fontFamily: 'Arial, sans-serif' }}>{sig.name}</p>
              <p style={{ margin: 0, fontSize: '2.5mm', color: '#6B7280', fontFamily: 'Arial, sans-serif' }}>{sig.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ height: '8mm', background: 'linear-gradient(90deg, #1E3A5F 0%, #2563EB 60%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10mm' }}>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '2.5mm', fontFamily: 'Arial, sans-serif' }}>indonesianisme.id</p>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '2mm', fontFamily: 'monospace' }}>ID: {result.id}</p>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '2.5mm', fontFamily: 'Arial, sans-serif' }}>80 Gagasan untuk 8% Pertumbuhan Ekonomi Indonesia</p>
      </div>
    </div>
  );
}
