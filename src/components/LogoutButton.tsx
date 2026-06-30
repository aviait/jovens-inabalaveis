'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: 6,
        padding: '6px 14px',
        cursor: 'pointer',
        fontSize: 13,
      }}
    >
      Sair
    </button>
  );
}
