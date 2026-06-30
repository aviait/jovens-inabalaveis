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
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h1
          style={{ fontSize: 28, fontWeight: 900, color: '#003D8F', margin: '0 0 12px', letterSpacing: -0.5 }}
        >
          Inscrição realizada!
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', margin: '0 0 8px', lineHeight: 1.7 }}>
          Obrigado por se inscrever no{' '}
          <strong style={{ color: '#003D8F' }}>Seminário Jovens Inabaláveis</strong>.
        </p>
        <p style={{ fontSize: 15, color: '#6b7280', margin: '0 0 32px', lineHeight: 1.7 }}>
          Nos vemos em <span style={{ color: '#EB6B15', fontWeight: 700 }}>22 de agosto de 2026</span>.
          Compartilhe com seus amigos!
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
