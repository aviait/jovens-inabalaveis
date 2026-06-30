import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import BackToTop from '@/components/BackToTop';
import StickyNav from '@/components/StickyNav';

const BASE_URL = 'https://jovensinabalaveis.aviait.com.br';
const TITLE = 'Jovens Inabaláveis — Desmascarando Ideologias';
const DESCRIPTION =
  'Seminário gratuito · 22 de agosto de 2026 · Um dia inteiro de aprendizado, comunhão e fortalecimento espiritual para jovens e adolescentes.';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s | Jovens Inabaláveis',
  },
  description: DESCRIPTION,
  keywords: [
    'jovens inabaláveis',
    'seminário cristão',
    'desmascarando ideologias',
    'evento jovens',
    'evento cristão 2026',
    'jovens cristãos',
    'seminário gratuito',
    'agosto 2026',
  ],
  authors: [{ name: 'Jovens Inabaláveis' }],
  creator: 'Jovens Inabaláveis',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Jovens Inabaláveis',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Jovens Inabaláveis — 2ª Edição · Desmascarando Ideologias · 22 ago 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#003D8F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111' }}>
        <StickyNav />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
