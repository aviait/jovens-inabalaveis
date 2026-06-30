import Link from 'next/link';

export default function ObrigadoPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#003D8F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          background: '#FBFBFC',
          borderRadius: 16,
          padding: '48px 40px',
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h1
          style={{ fontSize: 28, fontWeight: 900, color: '#003D8F', margin: '0 0 12px', letterSpacing: -0.5 }}
        >
          Interesse registrado!
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', margin: '0 0 8px', lineHeight: 1.7 }}>
          Seu interesse no{' '}
          <strong style={{ color: '#003D8F' }}>Seminário Jovens Inabaláveis</strong> foi registrado.
        </p>
        <p style={{ fontSize: 15, color: '#6b7280', margin: '0 0 32px', lineHeight: 1.7 }}>
          Quando tiver novidade sobre o evento, você fica sabendo primeiro. Enquanto isso,{' '}
          <span style={{ color: '#EB6B15', fontWeight: 700 }}>chama seus amigos!</span>
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#003D8F',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
