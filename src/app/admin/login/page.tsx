'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { message?: string }).message ?? 'Credenciais inválidas.');
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #002d6b 0%, #003D8F 60%, #004ab0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Branding */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            color: '#EB6B15',
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}
        >
          Jovens Inabaláveis
        </p>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#FBFBFC', margin: 0, letterSpacing: -0.5 }}>
          Área Administrativa
        </h1>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#FBFBFC',
          borderRadius: 16,
          padding: '36px 32px',
          width: '100%',
          maxWidth: 380,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <label style={L.label}>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={L.input}
            placeholder="seu@email.com"
            required
            autoFocus
          />
        </label>

        <label style={{ ...L.label, marginBottom: 0 }}>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={L.input}
            placeholder="••••••••"
            required
          />
        </label>

        {error && (
          <p
            style={{
              color: '#dc2626',
              fontSize: 13,
              margin: '12px 0 0',
              padding: '8px 12px',
              background: '#fef2f2',
              borderRadius: 6,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 24,
            width: '100%',
            background: loading ? '#6b7280' : '#EB6B15',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 0.3,
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}

const L = {
  label: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 16,
  },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontSize: 14,
    outline: 'none',
    background: '#fff',
  },
};
