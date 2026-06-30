import Link from 'next/link';
import { LogoutButton } from '@/components/LogoutButton';

interface Props {
  role?: string;
}

export default function AdminNav({ role }: Props) {
  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        height: 52,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#003D8F',
          letterSpacing: 0.5,
          marginRight: 24,
        }}
      >
        Jovens Inabaláveis
      </span>

      <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
        <NavLink href="/admin">Pré-cadastros</NavLink>
        {role === 'super_admin' && <NavLink href="/admin/users">Usuários</NavLink>}
      </nav>

      <LogoutButton />
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: '#374151',
        textDecoration: 'none',
        padding: '6px 12px',
        borderRadius: 6,
      }}
    >
      {children}
    </Link>
  );
}
