import { db } from '@/lib/db';
import { MEAL_SCENARIO_LABELS, type MEAL_SCENARIOS } from '@/lib/schemas';
import { getSession } from '@/lib/session';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

function topOf(arr: string[]): string {
  const freq: Record<string, number> = {};
  for (const v of arr) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
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

  const topTopic = topOf(allTopics);
  const topSession = topOf(allSessions);
  const topChurch = topOf(allChurches);

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff' }}>
      <AdminNav role={session.role} />

      <main style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[
            { label: 'Pré-cadastros', value: String(submissions.length) },
            { label: 'Congregação mais ativa', value: topChurch, small: true },
            { label: 'Turno mais votado', value: topSession },
            { label: 'Tema mais pedido', value: topTopic, small: true },
          ].map(({ label, value, small }) => (
            <div
              key={label}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '20px 24px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,.04)',
              }}
            >
              <p style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>
                {label}
              </p>
              <p
                style={{
                  fontSize: small ? 16 : 28,
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
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #f3f4f6' }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111' }}>
              Pré-cadastros
              {isCongregacao && session.church && (
                <span style={{ marginLeft: 8, fontSize: 12, color: '#6b7280', fontWeight: 400 }}>
                  — {session.church}
                </span>
              )}
              <span style={{ marginLeft: 8, fontSize: 13, color: '#6b7280', fontWeight: 400 }}>
                ({submissions.length})
              </span>
            </h2>
          </div>

          {submissions.length === 0 ? (
            <p style={{ padding: '32px 24px', color: '#6b7280', margin: 0 }}>Nenhum pré-cadastro ainda.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['#', 'Nome', 'Nascimento', 'Igreja', 'Temas', 'Turnos', 'Refeição', 'Data'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '10px 14px',
                          borderBottom: '1px solid #e5e7eb',
                          fontWeight: 600,
                          textAlign: 'left',
                          color: '#374151',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr
                      key={s.id}
                      style={{ borderBottom: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}
                    >
                      <td style={td}>{submissions.length - i}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{s.fullName}</td>
                      <td style={td}>{s.birthDate.toLocaleDateString('pt-BR')}</td>
                      <td style={td}>{s.church}</td>
                      <td style={{ ...td, maxWidth: 240 }}>
                        {s.topics.slice(0, 2).join(', ')}
                        {s.topics.length > 2 && (
                          <span style={{ color: '#6b7280' }}> e mais {s.topics.length - 2}</span>
                        )}
                      </td>
                      <td style={td}>{s.freeMealSessions.join(', ')}</td>
                      <td style={td}>
                        {MEAL_SCENARIO_LABELS[s.mealScenario as (typeof MEAL_SCENARIOS)[number]]}
                      </td>
                      <td style={{ ...td, whiteSpace: 'nowrap', color: '#6b7280' }}>
                        {s.createdAt.toLocaleString('pt-BR')}
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
