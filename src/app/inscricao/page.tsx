'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  CHURCHES,
  MEAL_SCENARIO_LABELS,
  MEAL_SCENARIOS,
  SESSIONS,
  TOPICS,
  type SubmissionInput,
} from '@/lib/schemas';

type Step = 1 | 2 | 3 | 4;
type Status = 'idle' | 'submitting' | 'error';

const TOTAL_STEPS = 4;

export default function FormPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [church, setChurch] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [freeMealSessions, setFreeMealSessions] = useState<string[]>([]);
  const [mealScenario, setMealScenario] = useState('');

  function toggleTopic(topic: string) {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : prev.length < 6 ? [...prev, topic] : prev,
    );
  }

  function toggleSession(session: string) {
    setFreeMealSessions((prev) =>
      prev.includes(session) ? prev.filter((s) => s !== session) : [...prev, session],
    );
  }

  async function handleSubmit() {
    setStatus('submitting');
    setErrorMessage('');

    const payload: SubmissionInput = {
      fullName,
      birthDate,
      church,
      topics: topics as SubmissionInput['topics'],
      freeMealSessions: freeMealSessions as SubmissionInput['freeMealSessions'],
      mealScenario: mealScenario as SubmissionInput['mealScenario'],
    };

    try {
      const res = await fetch('/api/v1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? 'Erro ao enviar.');
      }

      router.push('/obrigado');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#003D8F' }}>
      <div
        style={{
          background: '#002d6b',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Link href="/" style={{ color: '#7290BA', fontSize: 13, textDecoration: 'none' }}>
          ← Voltar ao início
        </Link>
      </div>

      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
          minHeight: 'calc(100vh - 53px)',
        }}
      >
        <div
          style={{
            background: '#FBFBFC',
            borderRadius: 16,
            padding: '40px 36px',
            maxWidth: 620,
            width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {([1, 2, 3, 4] as Step[]).map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: step >= s ? '#EB6B15' : '#e5e7eb',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#EB6B15',
              textTransform: 'uppercase',
              margin: '0 0 4px',
            }}
          >
            Etapa {step} de {TOTAL_STEPS}
          </p>

          {step === 1 && (
            <section>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#003D8F', margin: '0 0 24px' }}>
                Dados Pessoais
              </h1>
              <label style={F.label}>
                Nome Completo
                <input
                  style={F.input}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </label>
              <label style={F.label}>
                Data de Nascimento
                <input
                  style={F.input}
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </label>
              <label style={F.label}>
                Congregação / Igreja Local
                <input
                  list="churches-list"
                  style={F.input}
                  value={church}
                  onChange={(e) => setChurch(e.target.value)}
                  placeholder="Selecione ou digite sua congregação"
                  autoComplete="off"
                />
                <datalist id="churches-list">
                  {CHURCHES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
                {church.trim() && !CHURCHES.includes(church.trim().toUpperCase() as (typeof CHURCHES)[number]) && (
                  <span style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                    Congregação não listada — será salva como informada.
                  </span>
                )}
              </label>
              <button
                style={F.btn}
                disabled={!fullName.trim() || !birthDate || !church.trim()}
                onClick={() => setStep(2)}
              >
                Próximo →
              </button>
            </section>
          )}

          {step === 2 && (
            <section>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#003D8F', margin: '0 0 8px' }}>
                Escolha dos Temas
              </h1>
              <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 20px' }}>
                Selecione até <strong>6 temas</strong> que você considera mais urgentes.{' '}
                <span style={{ color: '#EB6B15', fontWeight: 700 }}>{topics.length}/6</span>
              </p>
              {TOPICS.map((topic) => (
                <label
                  key={topic}
                  style={{
                    ...F.checkboxLabel,
                    opacity: !topics.includes(topic) && topics.length >= 6 ? 0.4 : 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={topics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    disabled={!topics.includes(topic) && topics.length >= 6}
                    style={{ accentColor: '#EB6B15', width: 16, height: 16, flexShrink: 0 }}
                  />
                  {topic}
                </label>
              ))}
              <div style={F.nav}>
                <button style={F.btnSec} onClick={() => setStep(1)}>
                  ← Voltar
                </button>
                <button style={F.btn} disabled={topics.length === 0} onClick={() => setStep(3)}>
                  Próximo →
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#003D8F', margin: '0 0 8px' }}>
                Disponibilidade
              </h1>
              <p style={{ fontSize: 14, color: '#374151', margin: '0 0 20px', lineHeight: 1.6 }}>
                Se a alimentação (almoço e jantar) for 100%{' '}
                <span style={{ color: '#EB6B15', fontWeight: 700 }}>gratuita</span>, em quais turnos você
                participaria?
              </p>
              {SESSIONS.map((session) => (
                <label key={session} style={F.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={freeMealSessions.includes(session)}
                    onChange={() => toggleSession(session)}
                    style={{ accentColor: '#EB6B15', width: 16, height: 16, flexShrink: 0 }}
                  />
                  <span style={{ fontWeight: freeMealSessions.includes(session) ? 700 : 400 }}>
                    {session}
                  </span>
                </label>
              ))}
              <div style={F.nav}>
                <button style={F.btnSec} onClick={() => setStep(2)}>
                  ← Voltar
                </button>
                <button style={F.btn} disabled={freeMealSessions.length === 0} onClick={() => setStep(4)}>
                  Próximo →
                </button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#003D8F', margin: '0 0 8px' }}>
                Cenário Realista
              </h1>
              <p style={{ fontSize: 14, color: '#374151', margin: '0 0 20px', lineHeight: 1.6 }}>
                Caso seja necessário cobrar uma taxa, como isso afetaria sua presença?
              </p>
              {MEAL_SCENARIOS.map((scenario) => (
                <label
                  key={scenario}
                  style={{
                    ...F.checkboxLabel,
                    background: mealScenario === scenario ? '#FFF4ED' : 'transparent',
                    border: `1px solid ${mealScenario === scenario ? '#EB6B15' : '#e5e7eb'}`,
                    borderRadius: 8,
                    padding: '12px 14px',
                    marginBottom: 8,
                  }}
                >
                  <input
                    type="radio"
                    name="mealScenario"
                    value={scenario}
                    checked={mealScenario === scenario}
                    onChange={() => setMealScenario(scenario)}
                    style={{ accentColor: '#EB6B15', width: 16, height: 16, flexShrink: 0 }}
                  />
                  {MEAL_SCENARIO_LABELS[scenario]}
                </label>
              ))}

              {status === 'error' && (
                <p
                  style={{
                    color: '#dc2626',
                    fontSize: 14,
                    margin: '12px 0 0',
                    padding: '10px 14px',
                    background: '#fef2f2',
                    borderRadius: 8,
                  }}
                >
                  {errorMessage}
                </p>
              )}

              <div style={F.nav}>
                <button style={F.btnSec} onClick={() => setStep(3)}>
                  ← Voltar
                </button>
                <button
                  style={{ ...F.btn, opacity: !mealScenario || status === 'submitting' ? 0.6 : 1 }}
                  disabled={!mealScenario || status === 'submitting'}
                  onClick={handleSubmit}
                >
                  {status === 'submitting' ? 'Enviando…' : 'Enviar inscrição'}
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

const F = {
  label: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 6,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontSize: 15,
    outline: 'none',
    marginTop: 2,
  },
  checkboxLabel: {
    display: 'flex' as const,
    alignItems: 'flex-start' as const,
    gap: 10,
    marginBottom: 10,
    fontSize: 14,
    cursor: 'pointer',
    lineHeight: 1.5,
  },
  btn: {
    background: '#EB6B15',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 28px',
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  btnSec: {
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: 14,
  },
  nav: { display: 'flex' as const, gap: 12, marginTop: 28, justifyContent: 'flex-end' as const },
};
