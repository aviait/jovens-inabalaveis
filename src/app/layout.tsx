import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import BackToTop from '@/components/BackToTop';
import StickyNav from '@/components/StickyNav';

export const metadata: Metadata = {
  title: 'Jovens Inabaláveis',
  description: 'Seminário Jovens Inabaláveis: Desmascarando Ideologias — 22/08/2026',
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
