# PRD — Indonesianisme 2026 Website
**Platform**: Next.js 14+ App Router · IA-ITB  
**Last updated**: April 2026  
**Author**: Tim Digital Indonesianisme

---

## Overview

Website Indonesianisme 2026 adalah platform digital resmi untuk Forum Nasional Indonesianisme, yang diselenggarakan oleh Ikatan Alumni ITB (IA-ITB). Platform ini mendukung registrasi peserta, distribusi konten, verifikasi sertifikat, dan komunitas diskusi strategis.

**Tema**: *80 Gagasan IA-ITB untuk 8% Pertumbuhan Ekonomi Indonesia*

---

## Status Saat Ini (April 2026)

| Halaman | Status | Catatan |
|---------|--------|---------|
| `/` (Homepage) | ✅ Live | Countdown, speakers preview, program overview |
| `/about` | ✅ Live | IA-ITB slider, Misi & Visi |
| `/event` | ✅ Live | Category cards, panel sessions |
| `/speakers` | ✅ Live | Grid, belum ada halaman detail |
| `/program` | ✅ Live | Day tabs, session cards dengan bookmark |
| `/topics` | ✅ Live | 9 topik Asta Cita |
| `/register` | ✅ Live | Form UI lengkap, belum ada backend submission |
| `/sertifikat` | ✅ Live | Mock data, belum ada lookup real |
| `/gallery` | ✅ Live | Masonry grid, placeholder images |
| `/media` | ✅ Live | Press mentions, Instagram feed |
| `/community` | ✅ Live | Membership tiers, forum section |
| `/faq` | ✅ Live | Accordion dengan search |
| `/calendar` | ✅ Live | Calendar + list view |
| `/publications` | ✅ Live | Cards, filter by category |
| `/sponsorship` | ✅ Live | Tier cards |

---

## Fitur yang Direkomendasikan

### P0 — Critical (must-have sebelum launch event)

---

#### F-01: Form Registrasi Fungsional

**Problem**: Form di `/register` hanya UI — submit tidak mengirim data ke mana pun.

**User Story**: Sebagai calon peserta, saya ingin mendaftar dan mendapatkan konfirmasi email dengan nomor registrasi unik agar saya yakin pendaftaran berhasil.

**Acceptance Criteria**:
- [ ] Submit form mengirim data ke backend (API route `/api/register` atau Formspree)
- [ ] Validasi frontend: email format, required fields, phone format
- [ ] Validasi backend: cek duplikat email
- [ ] Post-submit: trigger email konfirmasi dengan nomor `IND2026-XXXX`
- [ ] Loading state pada tombol submit saat request berlangsung
- [ ] Error state dengan pesan jelas jika submission gagal

**Technical Approach**:
```
src/app/api/register/route.ts   ← Next.js API route
src/lib/email.ts                ← Resend / Nodemailer integration
src/lib/db.ts                   ← Supabase / Google Sheets append
```

**Dependencies**: Resend atau Formspree (email), Supabase atau Google Sheets (storage)

---

#### F-02: Verifikasi Sertifikat Real

**Problem**: `/sertifikat` menggunakan mock data hardcoded (`MOCK_PESERTA`, `MOCK_PEMBICARA`).

**User Story**: Sebagai peserta, saya ingin mengunduh sertifikat kehadiran resmi dengan nomor verifikasi unik.

**Acceptance Criteria**:
- [ ] Lookup berdasarkan ID peserta atau nama ke database real
- [ ] Jika ditemukan: tampilkan certificate preview, aktifkan tombol cetak/PDF
- [ ] PDF output: A4 landscape dengan watermark digital dan QR code verifikasi
- [ ] QR code mengarah ke URL publik `/verify/[id]` untuk validasi sertifikat

**Technical Approach**:
```
src/app/api/verify/[id]/route.ts   ← public verification endpoint
src/lib/certificate.ts             ← PDF generation (jsPDF + html2canvas)
```

---

### P1 — High Value (Q2 2026)

---

#### F-03: Live Search Global (Command Palette)

**Problem**: Tidak ada cara cepat menemukan speaker tertentu, sesi, atau topik dari navigasi.

**User Story**: Sebagai peserta, saya ingin mengetik nama speaker atau topik dan langsung mendapatkan hasil relevan dari seluruh halaman.

**Acceptance Criteria**:
- [ ] `Cmd+K` / `Ctrl+K` membuka command palette overlay
- [ ] Search real-time across: speakers, sessions, topics, FAQ
- [ ] Hasil dikategorikan (Speakers / Sesi / Topik / FAQ)
- [ ] Keyboard navigasi (arrow keys + Enter)
- [ ] ESC atau klik luar untuk tutup

**Technical Approach**:
```
src/components/ui/CommandPalette.tsx   ← overlay component
src/lib/search-index.ts               ← static index dari semua data
```
Library: `fuse.js` (fuzzy search, ~8KB) atau `flexsearch` (lebih cepat)

---

#### F-04: Personal Schedule Builder

**Problem**: Program page punya bookmark per sesi tapi tidak ada halaman agregasi jadwal personal.

**User Story**: Sebagai peserta, saya ingin menyimpan sesi yang akan saya hadiri dan mengekspornya sebagai reminder kalender.

**Acceptance Criteria**:
- [ ] Bookmark state persisten via `localStorage`
- [ ] Halaman `/my-schedule` menampilkan sesi tersimpan dengan timeline view
- [ ] Export ke `.ics` (iCalendar) untuk ditambahkan ke Google Calendar / Apple Calendar
- [ ] Share URL: `/my-schedule?sessions=id1,id2,id3`

**Technical Approach**:
```
src/app/my-schedule/page.tsx           ← aggregated schedule view
src/hooks/useBookmarks.ts              ← localStorage persistence hook
src/lib/ics.ts                         ← .ics file generator
```

---

#### F-05: Speaker Detail Pages

**Problem**: `/speakers` adalah grid tanpa halaman detail individual. Bio, topik, dan sesi per speaker tidak bisa diakses.

**User Story**: Sebagai peserta, saya ingin melihat profil lengkap pembicara termasuk bio, topik yang dibahas, dan sesi yang akan mereka isi.

**Acceptance Criteria**:
- [ ] Route `/speakers/[slug]` dengan halaman detail per speaker
- [ ] Konten: foto besar, bio lengkap, institusi, topik keahlian, social links
- [ ] Panel "Sesi yang Akan Diisi" (linked ke program page)
- [ ] Navigasi prev/next antar speaker
- [ ] SEO: `og:image`, `og:description`, proper `<title>`

**Technical Approach**:
```
src/app/speakers/[slug]/page.tsx       ← dynamic route
src/data/speakers.ts                   ← extend existing speaker data
```

---

#### F-06: Live Streaming Integration

**Problem**: Format acara hybrid (onsite + online) tapi tidak ada mekanisme akses streaming di website.

**User Story**: Sebagai peserta online, saya ingin menonton stream langsung acara dari halaman website tanpa perlu link eksternal terpisah.

**Acceptance Criteria**:
- [ ] Embed YouTube Live atau Zoom webinar di halaman event
- [ ] Tab "Saksikan Live" vs "Informasi Acara" untuk peserta online vs onsite
- [ ] Pre-event: countdown + "Stream dimulai pukul XX.XX"
- [ ] Post-event: embed recording dari YouTube (URL dapat diupdate dari env var)

**Technical Approach**:
```
NEXT_PUBLIC_STREAM_URL=https://youtube.com/live/xxx
src/app/event/StreamPlayer.tsx   ← conditional embed component
```

---

### P2 — Nice to Have (pasca-event atau untuk edisi berikutnya)

---

#### F-07: Countdown Reminder & Notifikasi

**Problem**: Tidak ada cara bagi peserta untuk mendapatkan reminder sesi tanpa meninggalkan website.

**User Story**: Sebagai peserta, saya ingin mendapat notifikasi browser 30 menit sebelum sesi yang saya simpan dimulai.

**Acceptance Criteria**:
- [ ] "Ingatkan saya" button di setiap session card
- [ ] Web Push API untuk browser notification
- [ ] Opsional: WhatsApp reminder via WhatsApp Business API

---

#### F-08: Q&A & Polling Interaktif

**Problem**: Tidak ada mekanisme interaksi real-time antara peserta dan pembicara selama sesi live.

**User Story**: Sebagai peserta, saya ingin mengirim pertanyaan untuk pembicara dan melihat pertanyaan yang paling di-upvote.

**Acceptance Criteria**:
- [ ] Form kirim pertanyaan (nama opsional, pertanyaan required, max 280 char)
- [ ] Voting pertanyaan (upvote, 1 vote per session per user)
- [ ] Moderator view: approve/pin pertanyaan tertentu
- [ ] Real-time update via Supabase Realtime atau Pusher

---

#### F-09: Gallery Upload Capacity

**Problem**: Gallery saat ini statis dengan placeholder images.

**User Story**: Sebagai panitia, saya ingin mengupload foto event secara real-time selama acara berlangsung agar peserta dapat melihat dokumentasi langsung.

**Acceptance Criteria**:
- [ ] Admin upload interface (auth protected)
- [ ] Drag-and-drop multi-upload
- [ ] Auto-resize dan optimasi via Cloudinary
- [ ] Peserta dapat submit foto dengan hashtag (moderated before publish)

---

#### F-10: Media Kit Download Center

**Problem**: `/media` tidak menyediakan aset yang dapat didownload oleh media partner.

**User Story**: Sebagai jurnalis/media partner, saya ingin mendownload press kit lengkap (press release, logo, brand guideline) dalam satu tempat.

**Acceptance Criteria**:
- [ ] Grid media aset yang dapat difilter (Visual, Editorial, Video)
- [ ] Preview sebelum download
- [ ] Download as ZIP untuk multiple files
- [ ] Aset dikategorikan: Logo Pack, Press Release, Foto Resmi, Panduan Brand

---

#### F-11: Bilingual Content Management System

**Problem**: Semua terjemahan hardcoded di `LanguageProvider.tsx` (~65 keys). Konten speaker/topik/program tidak bisa diubah tanpa deploy ulang.

**User Story**: Sebagai tim konten, saya ingin memperbarui teks website (termasuk konten speaker dan topik) tanpa harus edit kode.

**Acceptance Criteria**:
- [ ] Headless CMS (Contentful, Sanity, atau Strapi) dengan field EN + ID
- [ ] Migrasi terjemahan dari `LanguageProvider.tsx` ke CMS
- [ ] ISR (Incremental Static Regeneration) untuk update konten tanpa full redeploy
- [ ] Fallback ke hardcoded strings jika CMS tidak tersedia

---

## Design System Reference

Website menggunakan design system berbasis CSS Custom Properties:

```
--color-primary         : Blue (#1D4ED8)
--color-secondary       : Gold (#D97706)
--color-text-primary    : Teks utama (adaptive dark/light)
--color-text-secondary  : Teks sekunder
--color-text-muted      : Placeholder, disabled
--color-bg-primary      : Background utama
--color-bg-card         : Card backgrounds
--glass-border          : Border untuk glass elements
--gradient-primary      : Linear gradient biru utama
```

Sector colors (untuk event categories):
```
--color-sector-pangan         : #34D399
--color-sector-energi         : #FBBF24
--color-sector-kesehatan      : #FB7185
--color-sector-teknologi      : #60A5FA
--color-sector-industri       : #A78BFA
--color-sector-infrastruktur  : #38BDF8
```

---

## Technical Constraints

- **Framework**: Next.js 14+ App Router — semua halaman baru harus menggunakan App Router conventions
- **Styling**: Tailwind CSS v4 + CSS Custom Properties — tidak boleh ada hardcoded hex colors di komponen baru
- **Components**: Wajib cek `src/components/ui/` sebelum membuat komponen baru (Button, Accordion, CountdownTimer, dll.)
- **Images**: Gunakan `next/image` untuk semua gambar — tidak boleh `<img>` tag langsung
- **I18n**: Semua teks user-facing harus melalui `useLang()` hook dengan key di `LanguageProvider.tsx`
- **Theming**: Semua halaman baru harus berfungsi di dark mode dan light mode

---

## Definition of Done

Setiap fitur dinyatakan selesai jika:
1. `npx tsc --noEmit` — exit 0, tidak ada TypeScript error
2. `npm run build` — berhasil tanpa compilation error
3. Visual check: dark mode + light mode di semua breakpoint (375px / 768px / 1280px)
4. Tidak ada hardcoded hex color di file yang dimodifikasi
5. Semua teks melalui i18n hook (`useLang()`)
