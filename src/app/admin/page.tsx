import Link from 'next/link';
import { db } from '@/lib/db';
import { MEAL_SCENARIO_LABELS, type MEAL_SCENARIOS } from '@/lib/schemas';
import { getSession } from '@/lib/session';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

function topN(arr: string[], n: number): Array<{ label: string; count: number }> {
  const freq: Record<string, number> = {};
  for (const v of arr) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

function topOf(arr: string[]): string {
  return topN(arr, 1)[0]?.label ?? '—';
}

function BarChart({
  title,
  items,
  subtitle,
  accentFirst = false,
  verTodosHref,
}: {
  title: string;
  subtitle?: string;
  items: Array<{ label: string; count: number }>;
  accentFirst?: boolean;
  verTodosHref?: string;
}) {
  const max = items[0]?.count ?? 1;
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        padding: '24px 28px',
        boxShadow: '0 1px 3px rgba(0,0,0,.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111', flex: 1 }}>{title}</h2>
        {subtitle && <span style={{ fontSize: 12, color: '#9ca3af' }}>{subtitle}</span>}
        {verTodosHref && (
          <Link href={verTodosHref} style={{ fontSize: 12, color: '#003D8F', textDecoration: 'none', fontWeight: 600, flexShrink: 0 }}>
            Ver todos →
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <p style={{ color: '#9ca3af', fontSize: 14, margin: 0 }}>Nenhum dado ainda.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(({ label, count }, i) => {
            const pct = Math.round((count / max) * 100);
            const isTop = i === 0 && accentFirst;
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
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
                      opacity: isTop ? 1 : Math.max(0.35, 1 - i * 0.1),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default async function AdminPage() {
  const session = await getSession();
  const isCongregacao = session.role === 'congregacao';
  const where = isCongregacao && session.church ? { church: session.church } : {};

  const submissions = await db.submission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      createdAt: true,
      fullName: true,
      birthDate: true,
      church: true,
      topics: true,
      freeMealSessions: true,
      mealScenario: true,
    },
  });

  const allTopics = submissions.flatMap((s) => s.topics);
  const allSessions = submissions.flatMap((s) => s.freeMealSessions);
  const allChurches = submissions.map((s) => s.church);

  const top6Topics = topN(allTopics, 6);
  const sessionRanking = topN(allSessions, 10);
  const churchRanking = topN(allChurches, 10);

  const topTopic = topOf(allTopics);
  const topSession = topOf(allSessions);
  const topChurch = topOf(allChurches);

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff' }}>
      <AdminNav role={session.role} />

      <main style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Stat cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 16,
            marginBottom: 28,
          }}
        >
          {[
            { label: 'Pré-cadastros', value: String(submissions.length), big: true },
            { label: 'Congregação mais ativa', value: topChurch },
            { label: 'Turno mais votado', value: topSession },
            { label: 'Tema mais pedido', value: topTopic },
          ].map(({ label, value, big }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '18px 22px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,.04)',
                borderTop: '3px solid #003D8F',
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: '#6b7280',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  margin: '0 0 8px',
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: big ? 32 : 15,
                  fontWeight: 800,
                  color: '#003D8F',
                  margin: 0,
                  lineHeight: 1.2,
                  wordBreak: 'break-word',
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Gráficos — linha 1: temas + turnos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <BarChart
            title="Top 6 temas mais votados"
            subtitle={`${allTopics.length} voto${allTopics.length !== 1 ? 's' : ''}`}
            items={top6Topics}
            accentFirst
            verTodosHref="/admin/ranking?tipo=temas"
          />
          <BarChart
            title="Preferência por turno"
            subtitle={`${allSessions.length} resposta${allSessions.length !== 1 ? 's' : ''}`}
            items={sessionRanking}
          />
        </div>

        {/* Gráfico — linha 2: congregações (largura total) */}
        <div style={{ marginBottom: 24 }}>
          <BarChart
            title="Congregações com mais pré-cadastros"
            subtitle={`${submissions.length} cadastro${submissions.length !== 1 ? 's' : ''} no total`}
            items={churchRanking}
            accentFirst
            verTodosHref="/admin/ranking?tipo=congregacoes"
          />
        </div>

        {/* Tabela */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,.04)',
          }}
        >
          <div
            style={{
              padding: '18px 24px',
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111', flex: 1 }}>
              Pré-cadastros
              {isCongregacao && session.church && (
                <span style={{ marginLeft: 8, fontSize: 12, color: '#6b7280', fontWeight: 400 }}>
                  — {session.church}
                </span>
              )}
            </h2>
            <span
              style={{
                background: '#EEF2FF',
                color: '#003D8F',
                fontSize: 12,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 20,
              }}
            >
              {submissions.length}
            </span>
          </div>

          {submissions.length === 0 ? (
            <p style={{ padding: '32px 24px', color: '#6b7280', margin: 0, fontSize: 14 }}>
              Nenhum pré-cadastro ainda.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['#', 'Nome', 'Nascimento', 'Igreja', 'Temas', 'Turnos', 'Refeição', 'Data', ''].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            padding: '10px 14px',
                            borderBottom: '1px solid #e5e7eb',
                            fontWeight: 600,
                            textAlign: 'left',
                            color: '#374151',
                            whiteSpace: 'nowrap',
                            fontSize: 11,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                          }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr
                      key={s.id}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        background: i % 2 === 0 ? '#fff' : '#fafafa',
                      }}
                    >
                      <td style={td}>
                        <span style={{ color: '#9ca3af', fontWeight: 500, fontSize: 12 }}>
                          {submissions.length - i}
                        </span>
                      </td>
                      <td style={{ ...td, fontWeight: 600, color: '#111' }}>{s.fullName}</td>
                      <td style={{ ...td, color: '#6b7280' }}>
                        {s.birthDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                      </td>
                      <td style={{ ...td, color: '#374151' }}>{s.church}</td>
                      <td style={{ ...td, maxWidth: 220 }}>
                        <span style={{ color: '#374151' }}>{s.topics.slice(0, 2).join(', ')}</span>
                        {s.topics.length > 2 && (
                          <span
                            style={{
                              marginLeft: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              background: '#EEF2FF',
                              color: '#003D8F',
                              padding: '1px 6px',
                              borderRadius: 10,
                            }}
                          >
                            +{s.topics.length - 2}
                          </span>
                        )}
                      </td>
                      <td style={td}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {s.freeMealSessions.map((sess) => (
                            <span
                              key={sess}
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                background: '#f0fdf4',
                                color: '#166534',
                                padding: '2px 7px',
                                borderRadius: 10,
                                border: '1px solid #bbf7d0',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {sess}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ ...td, color: '#374151', maxWidth: 180, fontSize: 12 }}>
                        {MEAL_SCENARIO_LABELS[s.mealScenario as (typeof MEAL_SCENARIOS)[number]]}
                      </td>
                      <td style={{ ...td, whiteSpace: 'nowrap', color: '#9ca3af', fontSize: 11 }}>
                        {s.createdAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                      </td>
                      <td style={{ ...td, whiteSpace: 'nowrap' }}>
                        <Link
                          href={`/admin/submission/${s.id}`}
                          style={{ fontSize: 12, color: '#003D8F', textDecoration: 'none', fontWeight: 600 }}
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const td: React.CSSProperties = { padding: '10px 14px', verticalAlign: 'top' };
