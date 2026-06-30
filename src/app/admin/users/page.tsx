import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import AdminNav from '@/components/admin/AdminNav';
import UsersClient from '@/components/admin/UsersClient';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const session = await getSession();
  void session; // usado na verificação de role abaixo

  if (session.role !== 'super_admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8faff' }}>
        <AdminNav role={session.role} />
        <main style={{ padding: '60px 24px', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: 15 }}>Acesso restrito a administradores.</p>
        </main>
      </div>
    );
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true, role: true, church: true, createdAt: true },
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff' }}>
      <AdminNav role={session.role} />
      <main style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto' }}>
        <UsersClient
          users={users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))}
        />
      </main>
    </div>
  );
}
