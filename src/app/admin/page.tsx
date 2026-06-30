import { LogoutButton } from '@/components/LogoutButton';
import { db } from '@/lib/db';
import { MEAL_SCENARIO_LABELS, type MEAL_SCENARIOS } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const submissions = await db.submission.findMany({
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

  return (
    <main style={{ padding: 32, maxWidth: 1100, margin: '0 auto' }}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
          Inscrições — Seminário Jovens Inabaláveis ({submissions.length})
        </h1>
        <LogoutButton />
      </div>

      {submissions.length === 0 && <p style={{ color: '#6b7280' }}>Nenhuma inscrição ainda.</p>}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
              {[
                '#',
                'Nome',
                'Nascimento',
                'Igreja',
                'Temas',
                'Turnos (gratuito)',
                'Refeição',
                'Enviado em',
              ].map((h) => (
                <th
                  key={h}
                  style={{ padding: '10px 12px', borderBottom: '1px solid #e5e7eb', fontWeight: 600 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={td}>{submissions.length - i}</td>
                <td style={td}>{s.fullName}</td>
                <td style={td}>{s.birthDate.toLocaleDateString('pt-BR')}</td>
                <td style={td}>{s.church}</td>
                <td style={td}>{s.topics.join(', ')}</td>
                <td style={td}>{s.freeMealSessions.join(', ')}</td>
                <td style={td}>{MEAL_SCENARIO_LABELS[s.mealScenario as (typeof MEAL_SCENARIOS)[number]]}</td>
                <td style={td}>{s.createdAt.toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const td: React.CSSProperties = { padding: '10px 12px', verticalAlign: 'top' };
