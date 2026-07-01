import Link from 'next/link';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

function rankAll(arr: string[]): Array<{ label: string; count: number }> {
  const freq: Record<string, number> = {};
  for (const v of arr) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const session = await getSession();
  const isCongregacao = session.role === 'congregacao';
  const where = isCongregacao && session.church ? { church: session.church } : {};

  const submissions = await db.submission.findMany({
    where,
    select: { church: true, topics: true },
  });

  const isTemas = tipo === 'temas';
  const arr = isTemas
    ? submissions.flatMap((s) => s.topics)
    : submissions.map((s) => s.church);
  const items = rankAll(arr);
  const max = items[0]?.count ?? 1;

  const titulo = isTemas ? 'Ranking completo de Temas' : 'Ranking completo de Congregações';
  const subtotal = isTemas
    ? `${arr.length} voto${arr.length !== 1 ? 's' : ''}`
    : `${submissions.length} cadastro${submissions.length !== 1 ? 's' : ''}`;

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff' }}>
      <AdminNav role={session.role} />
      <main style={{ padding: '32px 24px', maxWidth: 800, margin: '0 auto' }}>
        <Link
          href="/admin"
          style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}
        >
          ← Voltar
        </Link>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#111' }}>{titulo}</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>{subtotal}</span>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            padding: '24px 28px',
            boxShadow: '0 1px 3px rgba(0,0,0,.04)',
          }}
        >
          {items.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: 14, margin: 0 }}>Nenhum dado ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(({ label, count }, i) => {
                const pct = Math.round((count / max) * 100);
                const isTop = i === 0;
                return (
                  <div key={label}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 5,
                        gap: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: isTop ? '#EB6B15' : '#9ca3af',
                            width: 18,
                            flexShrink: 0,
                            textAlign: 'right',
                          }}
                        >
                          {i + 1}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: '#374151',
                            fontWeight: isTop ? 700 : 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={label}
                        >
                          {label}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: isTop ? '#EB6B15' : '#003D8F',
                          flexShrink: 0,
                        }}
                      >
                        {count}
                      </span>
                    </div>
                    <div
                      style={{
                        background: '#f3f4f6',
                        borderRadius: 4,
                        height: 7,
                        overflow: 'hidden',
                        marginLeft: 25,
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          background: isTop ? '#EB6B15' : '#003D8F',
                          borderRadius: 4,
                          opacity: isTop ? 1 : Math.max(0.35, 1 - i * 0.06),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
