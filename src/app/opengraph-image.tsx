import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#002d6b',
        position: 'relative',
      }}
    >
      {/* Faixa laranja de acento no topo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: '#EB6B15',
          display: 'flex',
        }}
      />

      {/* Texto decorativo de fundo */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          right: -20,
          fontSize: 320,
          fontWeight: 900,
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          display: 'flex',
        }}
      >
        JI
      </div>

      {/* Conteúdo central */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        {/* Badge edição */}
        <div
          style={{
            background: '#EB6B15',
            color: '#fff',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: 'uppercase',
            padding: '8px 24px',
            borderRadius: 6,
            marginBottom: 28,
            display: 'flex',
          }}
        >
          2ª EDIÇÃO
        </div>

        {/* Título principal */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#FBFBFC',
            lineHeight: 1,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>JOVENS</span>
          <span style={{ color: '#EB6B15' }}>INABALÁVEIS</span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#7290BA',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginTop: 12,
            display: 'flex',
          }}
        >
          Desmascarando Ideologias
        </div>

        {/* Info row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 48,
            alignItems: 'center',
          }}
        >
          {[
            { label: 'DATA', value: '22 AGO 2026' },
            { label: 'ACESSO', value: 'GRATUITO' },
            { label: 'FORMATO', value: 'DIA INTEIRO' },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                paddingLeft: i > 0 ? 40 : 0,
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: '#7290BA',
                  display: 'flex',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#FBFBFC',
                  display: 'flex',
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
