import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { MEAL_SCENARIO_LABELS, type MEAL_SCENARIOS } from '@/lib/schemas';
import { getSession } from '@/lib/session';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();

  const submission = await db.submission.findUnique({ where: { id } });
  if (!submission) notFound();

  if (session.role === 'congregacao' && session.church && session.church !== submission.church) {
    notFound();
  }

  const mealLabel =
    MEAL_SCENARIO_LABELS[submission.mealScenario as (typeof MEAL_SCENARIOS)[number]] ??
    submission.mealScenario;

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff' }}>
      <AdminNav role={session.role} />
      <main style={{ padding: '32px 24px', maxWidth: 720, margin: '0 auto' }}>
        <Link
          href="/admin"
          style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}
        >
          ← Voltar
        </Link>

        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,.04)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ padding: '28px 32px', borderBottom: '1px solid #f3f4f6' }}>
            <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: '#003D8F' }}>
              {submission.fullName}
            </h1>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>
              Cadastrado em{' '}
              {submission.createdAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
            </span>
          </div>

          {/* Campos */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #f3f4f6' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px 32px',
              }}
            >
              <Field
                label="Data de nascimento"
                value={submission.birthDate.toLocaleDateString('pt-BR', {
                  timeZone: 'America/Sao_Paulo',
                })}
              />
              <Field label="Congregação" value={submission.church} />
              <Field label="Cenário de refeição" value={mealLabel} />
            </div>
          </div>

          {/* Temas */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #f3f4f6' }}>
            <p style={sectionTitle}>Temas de interesse</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {submission.topics.map((t) => (
                <span
                  key={t}
                  style={{
                    background: '#EEF2FF',
                    color: '#003D8F',
                    borderRadius: 16,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Turnos */}
          <div style={{ padding: '24px 32px' }}>
            <p style={sectionTitle}>Turnos com refeição</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {submission.freeMealSessions.map((s) => (
                <span
                  key={s}
                  style={{
                    background: '#f0fdf4',
                    color: '#166534',
                    border: '1px solid #bbf7d0',
                    borderRadius: 16,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: 14, color: '#111', fontWeight: 500 }}>{value}</p>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  margin: '0 0 12px',
  fontSize: 11,
  fontWeight: 600,
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};
