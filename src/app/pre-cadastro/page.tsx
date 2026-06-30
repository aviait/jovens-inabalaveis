'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

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
  const [focusField, setFocusField] = useState<string | null>(null);

  const maxBirth = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 10);
    return d.toISOString().slice(0, 10);
  })();

  const birthDateValid = !!birthDate && birthDate <= maxBirth;

  function focusStyle(field: string): React.CSSProperties {
    return focusField === field
      ? { borderColor: '#003D8F', boxShadow: '0 0 0 3px rgba(0,61,143,0.12)' }
      : {};
  }

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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #001533 0%, #002d6b 55%, #003D8F 100%)',
      }}
    >
      {/* Barra de topo */}
      <div style={{ padding: '16px 24px' }}>
        <Link
          href="/"
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 13,
            textDecoration: 'none',
            letterSpacing: 0.2,
          }}
        >
          ← Voltar ao site
        </Link>
      </div>

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 16px 48px',
          minHeight: 'calc(100vh - 53px)',
        }}
      >
        {/* Cabeçalho de marca acima do card */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              display: 'inline-block',
              background: '#EB6B15',
              color: '#fff',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: 4,
              marginBottom: 10,
            }}
          >
            2ª Edição
          </div>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(22px, 5vw, 30px)',
              fontWeight: 900,
              margin: '0 0 6px',
              letterSpacing: -0.5,
              lineHeight: 1.2,
            }}
          >
            Jovens Inabaláveis
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, margin: 0 }}>
            22 de agosto de 2026 · Pré-cadastro de interesse
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            maxWidth: 620,
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            overflow: 'hidden',
          }}
        >
          {/* Faixa laranja de acento */}
          <div style={{ height: 4, background: 'linear-gradient(90deg, #EB6B15 0%, #f5932d 100%)' }} />

          <div style={{ padding: '32px 36px 40px' }}>
            {/* Barra de progresso */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
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
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.8,
                color: '#EB6B15',
                textTransform: 'uppercase',
                margin: '0 0 24px',
              }}
            >
              Etapa {step} de {TOTAL_STEPS}
            </p>

            {step === 1 && (
              <section>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#001d4d', margin: '0 0 4px' }}>
                  Quem é você?
                </h2>
                <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 24px', lineHeight: 1.6 }}>
                  Só estamos mapeando quem tá animado. Isso <strong>não</strong> é uma inscrição confirmada.
                </p>
                <label style={F.label}>
                  Nome Completo
                  <input
                    style={{ ...F.input, ...focusStyle('name') }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    onFocus={() => setFocusField('name')}
                    onBlur={() => setFocusField(null)}
                  />
                </label>
                <label style={F.label}>
                  Data de Nascimento
                  <input
                    style={{ ...F.input, ...focusStyle('birth'), colorScheme: 'light' }}
                    type="date"
                    value={birthDate}
                    min="1970-01-01"
                    max={maxBirth}
                    onChange={(e) => setBirthDate(e.target.value)}
                    onFocus={() => setFocusField('birth')}
                    onBlur={() => setFocusField(null)}
                  />
                  {birthDate && !birthDateValid && (
                    <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500, marginTop: 2 }}>
                      Deve ter pelo menos 10 anos.
                    </span>
                  )}
                </label>
                <ChurchCombobox value={church} onChange={setChurch} />
                <button
                  style={F.btn}
                  disabled={!fullName.trim() || !birthDateValid || !church.trim()}
                  onClick={() => setStep(2)}
                >
                  Próximo →
                </button>
              </section>
            )}

            {step === 2 && (
              <section>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#001d4d', margin: '0 0 8px' }}>
                  Quais temas você quer ver?
                </h2>
                <p style={{ fontSize: 14, color: '#4b5563', margin: '0 0 20px', lineHeight: 1.6 }}>
                  Esses são os temas possíveis. Marca até <strong>6</strong> que você acha mais importante ver
                  lá — sua resposta define o que vai ter na grade.{' '}
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
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#001d4d', margin: '0 0 8px' }}>
                  Disponibilidade
                </h2>
                <p style={{ fontSize: 14, color: '#4b5563', margin: '0 0 20px', lineHeight: 1.6 }}>
                  Se o almoço e jantar fossem 100%{' '}
                  <span style={{ color: '#EB6B15', fontWeight: 700 }}>de graça</span>, em quais turnos você
                  estaria presente?
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
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#001d4d', margin: '0 0 8px' }}>
                  Cenário Realista
                </h2>
                <p style={{ fontSize: 14, color: '#4b5563', margin: '0 0 20px', lineHeight: 1.6 }}>
                  Se precisar cobrar uma taxa pra cobrir custos, como isso te afeta?
                </p>
                {MEAL_SCENARIOS.map((scenario) => (
                  <label
                    key={scenario}
                    style={{
                      ...F.checkboxLabel,
                      background: mealScenario === scenario ? '#FFF4ED' : '#fafafa',
                      border: `1px solid ${mealScenario === scenario ? '#EB6B15' : '#e5e7eb'}`,
                      borderRadius: 8,
                      padding: '12px 14px',
                      marginBottom: 8,
                      transition: 'border-color 0.2s, background 0.2s',
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
                    {status === 'submitting' ? 'Enviando…' : 'Registrar interesse'}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ChurchCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = query.trim()
    ? CHURCHES.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
    : CHURCHES;

  const isCustom = query.trim() && !CHURCHES.some((c) => c.toLowerCase() === query.trim().toLowerCase());

  function select(option: string) {
    setQuery(option);
    onChange(option);
    setOpen(false);
  }

  function handleBlur() {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      // confirma valor digitado mesmo se não estiver na lista
      if (query.trim()) onChange(query.trim());
    }, 150);
  }

  function handleFocus() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#001d4d' }}>
        Congregação / Igreja Local
      </span>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          style={{
            ...F.input,
            paddingRight: 36,
            borderColor: open ? '#003D8F' : '#d1d5db',
            boxShadow: open ? '0 0 0 3px rgba(0,61,143,0.12)' : 'none',
            outline: 'none',
          }}
          value={query}
          placeholder="Buscar congregação…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(''); // invalida até selecionar
            setOpen(true);
          }}
        />
        {/* Ícone seta */}
        <span
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
            transition: 'transform 0.2s',
            color: '#6b7280',
            pointerEvents: 'none',
            fontSize: 14,
          }}
        >
          ▾
        </span>

        {open && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #d1d5db',
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 50,
              maxHeight: 240,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            } as React.CSSProperties}
          >
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault(); // evita blur antes do click
                    select(c);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontSize: 14,
                    color: value === c ? '#003D8F' : '#374151',
                    fontWeight: value === c ? 700 : 400,
                    background: value === c ? '#EEF2FF' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  {c}
                </button>
              ))
            ) : (
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 10px' }}>
                  Nenhuma congregação encontrada.
                </p>
                {isCustom && (
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      select(query.trim());
                    }}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#003D8F',
                      background: '#EEF2FF',
                      border: '1px solid #c0d4f5',
                      borderRadius: 6,
                      padding: '8px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    Usar &ldquo;{query.trim()}&rdquo;
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {value && !CHURCHES.some((c) => c === value) && (
        <span style={{ fontSize: 12, color: '#6b7280' }}>
          Congregação não listada — será salva como informada.
        </span>
      )}
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
    color: '#001d4d',
  },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontSize: 15,
    outline: 'none',
    marginTop: 2,
    width: '100%',
    minHeight: 46,
    boxSizing: 'border-box' as const,
    background: '#fff',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    color: '#111827',
    lineHeight: '1.5',
  },
  checkboxLabel: {
    display: 'flex' as const,
    alignItems: 'flex-start' as const,
    gap: 10,
    marginBottom: 10,
    fontSize: 14,
    cursor: 'pointer',
    lineHeight: 1.5,
    color: '#374151',
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
    boxShadow: '0 2px 12px rgba(235,107,21,0.3)',
  },
  btnSec: {
    background: 'transparent',
    color: '#003D8F',
    border: '1px solid #c0d4f5',
    borderRadius: 8,
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
  },
  nav: { display: 'flex' as const, gap: 12, marginTop: 28, justifyContent: 'flex-end' as const },
};
