'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteUserButton from './DeleteUserButton';
import UserForm from './UserForm';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  church: string | null;
  createdAt: string;
}

interface Props {
  users: User[];
}

export default function UsersClient({ users }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  function refresh() {
    setShowForm(false);
    router.refresh();
  }

  const roleLabel = (r: string) => (r === 'super_admin' ? 'Super Admin' : 'Congregação');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111' }}>
          Usuários ({users.length})
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: '#003D8F',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '8px 18px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            + Novo usuário
          </button>
        )}
      </div>

      {showForm && <UserForm onDone={refresh} />}

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,.04)',
        }}
      >
        {users.length === 0 ? (
          <p style={{ padding: '24px', color: '#6b7280', margin: 0 }}>Nenhum usuário cadastrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Nome', 'E-mail', 'Papel', 'Congregação', 'Desde', ''].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 14px',
                      borderBottom: '1px solid #e5e7eb',
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#374151',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  style={{ borderBottom: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}
                >
                  <td style={td}>{u.name}</td>
                  <td style={{ ...td, color: '#6b7280' }}>{u.email}</td>
                  <td style={td}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        background: u.role === 'super_admin' ? '#003D8F' : '#f0f4ff',
                        color: u.role === 'super_admin' ? '#fff' : '#003D8F',
                      }}
                    >
                      {roleLabel(u.role)}
                    </span>
                  </td>
                  <td style={{ ...td, color: '#6b7280' }}>{u.church ?? '—'}</td>
                  <td style={{ ...td, color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={td}>
                    <DeleteUserButton userId={u.id} userName={u.name} onDone={refresh} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const td: React.CSSProperties = { padding: '10px 14px', verticalAlign: 'middle' };
