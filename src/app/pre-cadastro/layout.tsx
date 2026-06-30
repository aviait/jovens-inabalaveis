import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pré-cadastro',
  description:
    'Registre seu interesse no Seminário Jovens Inabaláveis — 22 de agosto de 2026. Evento gratuito. Pré-cadastro sem compromisso.',
  openGraph: {
    title: 'Pré-cadastro — Jovens Inabaláveis 2ª Edição',
    description:
      'Registre seu interesse no Seminário Jovens Inabaláveis — 22 de agosto de 2026. Evento gratuito e aberto a todos.',
    url: 'https://jovensinabalaveis.aviait.com.br/pre-cadastro',
  },
};

export default function PreCadastroLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
