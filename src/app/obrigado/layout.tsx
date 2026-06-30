import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Interesse Registrado',
  robots: { index: false, follow: false },
};

export default function ObrigadoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
