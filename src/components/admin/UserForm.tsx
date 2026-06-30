'use client';

import { useState } from 'react';
import { CHURCHES } from '@/lib/schemas';

interface Props {
  onDone: () => void;
}

export default function UserForm({ onDone }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('congregacao');
  const [church, setChurch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, church: church || null }),
    });

    if (res.ok) {
      onDone();
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { message?: string }).message ?? 'Erro ao criar usuário.');
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#f8faff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: '20px 24px',
        marginBottom: 20,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        alignItems: 'end',
      }}
    >
      <Field label="Nome">
        <input style={I} value={name} onChange={(e) => setName(e.target.value)} required />
      </Field>
      <Field label="E-mail">
        <input style={I} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Field>
      <Field label="Senha">
        <input style={I} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Field>
      <Field label="Papel">
        <select style={I} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="congregacao">Congregação</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </Field>
      {role === 'congregacao' && (
        <Field label="Congregação">
          <input
            list="churches-admin"
            style={I}
            value={church}
            onChange={(e) => setChurch(e.target.value)}
            placeholder="Selecione ou digite"
            required
          />
          <datalist id="churches-admin">
            {CHURCHES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </Field>
      )}

      {error && (
        <p style={{ gridColumn: '1 / -1', color: '#dc2626', fontSize: 13, margin: 0 }}>{error}</p>
      )}

      <div style={{ display: 'flex', gap: 8, gridColumn: '1 / -1' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#003D8F',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {loading ? 'Salvando…' : 'Criar usuário'}
        </button>
        <button
          type="button"
          onClick={onDone}
          style={{
            background: '#fff',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, fontWeight: 600, color: '#374151' }}>
      {label}
      {children}
    </label>
  );
}

const I: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  fontSize: 13,
  background: '#fff',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};
