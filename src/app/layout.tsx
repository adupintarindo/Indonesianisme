import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Indonesianisme 2026 — Platform Strategis Nasional IA-ITB',
  description:
    '80 Gagasan untuk 8% Pertumbuhan Ekonomi Indonesia. Platform strategis nasional oleh Ikatan Alumni ITB untuk Indonesia Emas 2045.',
  keywords: [
    'Indonesianisme',
    'IA-ITB',
    'Reindustrialisasi',
    'Kedaulatan Teknologi',
    'Indonesia 2045',
    'ITB Alumni',
  ],
  openGraph: {
    title: 'Indonesianisme 2026 — 80 Gagasan untuk Indonesia Emas',
    description:
      'Platform strategis nasional oleh Ikatan Alumni ITB untuk menghubungkan pemikir, pembuat kebijakan, dan pemimpin industri.',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-theme="dark"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}