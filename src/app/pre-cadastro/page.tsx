'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const [step1Touched, setStep1Touched] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const churchRef = useRef<HTMLInputElement>(null);

  function focusStyle(field: string): React.CSSProperties {
    return focusField === field
      ? { borderColor: '#003D8F', boxShadow: '0 0 0 3px rgba(0,61,143,0.12)' }
      : {};
  }

  function handleBirthDateInput(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
    let masked = digits;
    if (digits.length > 4) {
      masked = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
    } else if (digits.length > 2) {
      masked = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    setBirthDate(masked);
  }

  const parsedBirth = (() => {
    const m = birthDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    const day = +(m[1] ?? '0'), month = +(m[2] ?? '0'), year = +(m[3] ?? '0');
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const d = new Date(year, month - 1, day);
    if (d.getDate() !== day || d.getMonth() !== month - 1 || d.getFullYear() !== year) return null;
    return d;
  })();

  const birthDateError = (() => {
    if (!parsedBirth || birthDate.length < 10) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (parsedBirth > now) return '👀 Você ainda não nasceu! Volta quando aparecer por aqui.';
    const ago100 = new Date(now);
    ago100.setFullYear(now.getFullYear() - 100);
    if (parsedBirth < ago100) return 'Hmm, mais de 100 anos? Confere a data aí.';
    const ago10 = new Date(now);
    ago10.setFullYear(now.getFullYear() - 10);
    if (parsedBirth > ago10) return 'Deve ter pelo menos 10 anos para participar.';
    return null;
  })();

  const birthDateValid = birthDate.length === 10 && !!parsedBirth && birthDateError === null;

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

    const [dd, mm, yyyy] = birthDate.split('/');
    const isoDate = `${yyyy}-${mm}-${dd}`;

    const payload: SubmissionInput = {
      fullName,
      birthDate: isoDate,
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
            borderTop: '4px solid #EB6B15',
          }}
        >

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
                    ref={nameRef}
                    style={{
                      ...F.input,
                      ...focusStyle('name'),
                      ...(step1Touched && !fullName.trim() ? { borderColor: '#dc2626' } : {}),
                    }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    onFocus={() => setFocusField('name')}
                    onBlur={() => setFocusField(null)}
                  />
                  {step1Touched && !fullName.trim() && (
                    <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500, marginTop: 2 }}>
                      Informe seu nome completo.
                    </span>
                  )}
                </label>
                <label style={F.label}>
                  Data de Nascimento
                  <input
                    ref={birthRef}
                    style={{
                      ...F.input,
                      ...focusStyle('birth'),
                      ...(step1Touched && !birthDateValid ? { borderColor: '#dc2626' } : {}),
                    }}
                    type="text"
                    inputMode="numeric"
                    value={birthDate}
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                    onChange={handleBirthDateInput}
                    onFocus={() => setFocusField('birth')}
                    onBlur={() => setFocusField(null)}
                  />
                  {step1Touched && !birthDateValid && !birthDateError && (
                    <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500, marginTop: 2 }}>
                      {birthDate.length === 0 ? 'Informe sua data de nascimento.' : 'Complete a data (DD/MM/AAAA).'}
                    </span>
                  )}
                  {birthDateError && (
                    <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500, marginTop: 2 }}>
                      {birthDateError}
                    </span>
                  )}
                </label>
                <ChurchCombobox
                  value={church}
                  onChange={setChurch}
                  touched={step1Touched}
                  inputRef={churchRef}
                />
                <button
                  style={{ ...F.btn, width: '100%', marginTop: 4 }}
                  onClick={() => {
                    setStep1Touched(true);
                    if (fullName.trim() && birthDateValid && church.trim()) {
                      setStep(2);
                      return;
                    }
                    if (!fullName.trim()) nameRef.current?.focus();
                    else if (!birthDateValid) birthRef.current?.focus();
                    else if (!church.trim()) churchRef.current?.focus();
                  }}
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

function ChurchCombobox({
  value,
  onChange,
  touched = false,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  touched?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const filtered = query.trim()
    ? CHURCHES.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()))
    : CHURCHES;

  const isCustom = !!(query.trim() && !CHURCHES.some((c) => c.toLowerCase() === query.trim().toLowerCase()));

  function select(option: string) {
    setQuery(option);
    onChange(option);
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function handleBlur() {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHighlightedIndex(-1);
      if (query.trim()) onChange(query.trim());
    }, 150);
  }

  function handleFocus() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { setOpen(true); setHighlightedIndex(0); return; }
      if (filtered.length > 0) setHighlightedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); setHighlightedIndex(filtered.length - 1); return; }
      if (filtered.length > 0) setHighlightedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      if (filtered.length > 0 && highlightedIndex >= 0 && highlightedIndex < filtered.length) {
        select(filtered[highlightedIndex]!);
      } else if (filtered.length > 0 && highlightedIndex === -1) {
        select(filtered[0]!);
      } else if (filtered.length === 0 && isCustom) {
        select(query.trim());
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      setHighlightedIndex(-1);
    }
  }

  useEffect(() => {
    if (highlightedIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[data-opt]');
    (items[highlightedIndex] as HTMLElement | undefined)?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#001d4d' }}>
        Congregação / Igreja Local
      </span>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          style={{
            ...F.input,
            paddingRight: 36,
            borderColor: open ? '#003D8F' : touched && !value.trim() ? '#dc2626' : '#d1d5db',
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
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange('');
            setOpen(true);
            setHighlightedIndex(-1);
          }}
        />
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
            ref={listRef}
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
              filtered.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  data-opt=""
                  onMouseDown={(e) => {
                    e.preventDefault();
                    select(c);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontSize: 14,
                    color: i === highlightedIndex || value === c ? '#003D8F' : '#374151',
                    fontWeight: i === highlightedIndex || value === c ? 700 : 400,
                    background: i === highlightedIndex ? '#EEF2FF' : value === c ? '#f0f4ff' : 'transparent',
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

      {touched && !value.trim() && (
        <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 500 }}>
          Informe sua congregação ou igreja local.
        </span>
      )}
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
    padding: '0 14px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontSize: 15,
    outline: 'none',
    marginTop: 2,
    width: '100%',
    height: 46,
    boxSizing: 'border-box' as const,
    background: '#fff',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    color: '#111827',
    lineHeight: '46px',
    WebkitAppearance: 'none' as const,
    appearance: 'none' as const,
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
