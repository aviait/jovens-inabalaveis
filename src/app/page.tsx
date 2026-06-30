import Link from 'next/link';

const TOPICS_GRID = [
  { icon: '⚡', text: 'O que é uma ideologia e como ela afeta a fé' },
  { icon: '📖', text: 'A falácia do Materialismo Histórico' },
  { icon: '⚖️', text: 'A falácia do Relativismo Ético-Moral' },
  { icon: '🔍', text: 'A falácia da Ideologia de Gênero' },
  { icon: '✝️', text: 'A falácia da Teologia Progressista' },
  { icon: '🧠', text: 'A falácia do Humanismo' },
  { icon: '🌱', text: 'A falácia da Teoria Darwiniana' },
  { icon: '🎯', text: 'A falácia do Pragmatismo' },
  { icon: '🔭', text: 'A falácia do Ateísmo' },
  { icon: '🌌', text: 'A falácia da Teoria do Deísmo' },
  { icon: '💰', text: 'A falácia da Teologia da Prosperidade' },
  { icon: '🏆', text: 'A falácia do Triunfalismo' },
  { icon: '🛡️', text: 'O discernimento do cristão na atualidade' },
];

const SCHEDULE = [
  { period: 'MANHÃ', time: '09h – 12h', description: 'Abertura, adoração e primeira sessão de ensino.' },
  { period: 'TARDE', time: '14h – 17h', description: 'Sessões temáticas com debate e aprofundamento.' },
  { period: 'NOITE', time: '19h – 21h30', description: 'Encerramento, reflexão e compromisso de vida.' },
];

export default function HomePage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#111' }}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(160deg, #002d6b 0%, #003D8F 55%, #004ab0 100%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* texto de fundo decorativo */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: -40,
            left: -20,
            fontSize: 'clamp(120px, 22vw, 280px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: -8,
            lineHeight: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          INABALÁVEIS
        </span>

        {/* nav */}
        <nav
          style={{
            padding: '20px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 3,
                color: '#7290BA',
                textTransform: 'uppercase',
              }}
            >
              Jovens Inabaláveis
            </span>
          </div>
          <Link
            href="/inscricao"
            style={{
              background: '#EB6B15',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 8,
              padding: '10px 22px',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            Inscrever-se
          </Link>
        </nav>

        {/* hero content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px 80px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(235,107,21,0.15)',
              border: '1px solid rgba(235,107,21,0.4)',
              borderRadius: 100,
              padding: '6px 16px',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#EB6B15',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                color: '#FACAA5',
                textTransform: 'uppercase',
              }}
            >
              22 de Agosto de 2026
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(42px, 10vw, 96px)',
              fontWeight: 900,
              color: '#FBFBFC',
              margin: '0 0 8px',
              letterSpacing: -2,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Jovens
            <br />
            <span style={{ color: '#EB6B15' }}>Inabaláveis</span>
          </h1>

          <h2
            style={{
              fontSize: 'clamp(16px, 3.5vw, 26px)',
              fontWeight: 400,
              color: '#7290BA',
              margin: '12px 0 0',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Desmascarando Ideologias
          </h2>

          <p
            style={{
              fontSize: 17,
              color: 'rgba(251,251,252,0.75)',
              maxWidth: 560,
              margin: '28px auto 40px',
              lineHeight: 1.8,
            }}
          >
            Um dia inteiro de aprendizado, comunhão e fortalecimento espiritual. Evento 100%{' '}
            <strong style={{ color: '#FACAA5' }}>gratuito e aberto a todos</strong>.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/inscricao"
              style={{
                background: '#EB6B15',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 10,
                padding: '16px 36px',
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 0.5,
                boxShadow: '0 4px 24px rgba(235,107,21,0.4)',
              }}
            >
              Quero me inscrever →
            </Link>
            <a
              href="#sobre"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#FBFBFC',
                textDecoration: 'none',
                borderRadius: 10,
                padding: '16px 36px',
                fontSize: 16,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Saiba mais
            </a>
          </div>

          {/* info row */}
          <div
            style={{ display: 'flex', gap: 32, marginTop: 56, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { label: 'Data', value: '22 AGO 2026' },
              { label: 'Duração', value: 'Dia inteiro' },
              { label: 'Acesso', value: 'Gratuito' },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    color: '#7290BA',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FBFBFC' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div
          style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
        >
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)', margin: '0 auto' }} />
        </div>
      </section>

      {/* ── SOBRE ─────────────────────────────────────────── */}
      <section id="sobre" style={{ background: '#FBFBFC', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              color: '#EB6B15',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Sobre o Seminário
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              color: '#003D8F',
              margin: '0 0 24px',
              lineHeight: 1.1,
            }}
          >
            Um encontro para fortalecer
            <br />a fé cristã
          </h2>
          <p style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.9, marginBottom: 20 }}>
            Vivemos em um tempo em que diversas ideologias desafiam os fundamentos da fé cristã. O{' '}
            <strong>Seminário Jovens Inabaláveis</strong> nasce do desejo de equipar jovens com conhecimento,
            discernimento e firmeza para permanecerem firmes diante das pressões culturais.
          </p>
          <p style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.9 }}>
            Ao longo de um dia inteiro, mergulharemos em temas centrais que tocam a cosmovisão cristã —
            identificando falácias, aprofundando o conhecimento bíblico e saindo mais preparados para viver e
            testemunhar a fé no cotidiano.
          </p>
        </div>
      </section>

      {/* ── PROGRAMAÇÃO ───────────────────────────────────── */}
      <section style={{ background: '#003D8F', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 3,
                color: '#EB6B15',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Programação
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: '#FBFBFC', margin: 0 }}>
              Um dia completo de aprendizado
            </h2>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}
          >
            {SCHEDULE.map((item) => (
              <div
                key={item.period}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  borderTop: '3px solid #EB6B15',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 3,
                    color: '#EB6B15',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  {item.period}
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#FBFBFC', marginBottom: 12 }}>
                  {item.time}
                </div>
                <p style={{ fontSize: 14, color: '#7290BA', lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMAS ─────────────────────────────────────────── */}
      <section id="temas" style={{ background: '#f8faff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 3,
                color: '#EB6B15',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Conteúdo
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 4vw, 40px)',
                fontWeight: 900,
                color: '#003D8F',
                margin: '0 0 12px',
              }}
            >
              Temas abordados
            </h2>
            <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
              Na inscrição, você ajuda a definir quais temas abordaremos com mais profundidade.
            </p>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}
          >
            {TOPICS_GRID.map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5, fontWeight: 500 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1ª EDIÇÃO ─────────────────────────────────────── */}
      <section style={{ background: '#001f4d', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 3,
                color: '#EB6B15',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              1ª Edição
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#FBFBFC', margin: 0 }}>
              Reveja o que aconteceu
            </h2>
            <p style={{ fontSize: 15, color: '#7290BA', marginTop: 12 }}>
              A primeira edição ficou gravada. Assista na íntegra e se prepare para a próxima.
            </p>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}
          >
            {[
              {
                label: 'MANHÃ',
                videoId: '90Bv3QAjNPo',
                url: 'https://www.youtube.com/watch?v=90Bv3QAjNPo&t=1914s',
              },
              {
                label: 'TARDE',
                videoId: 'dIxQOvfDYkg',
                url: 'https://www.youtube.com/live/dIxQOvfDYkg',
              },
              {
                label: 'NOITE',
                videoId: 'aX-XU7l0ovQ',
                url: 'https://www.youtube.com/watch?v=aX-XU7l0ovQ&t=1343s',
              },
            ].map(({ label, videoId, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={`Sessão da ${label}`}
                      style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.3)',
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: '#EB6B15',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ fontSize: 20, marginLeft: 3 }}>▶</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 18px', background: 'rgba(255,255,255,0.05)' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 2,
                        color: '#EB6B15',
                        textTransform: 'uppercase',
                      }}
                    >
                      {label}
                    </span>
                    <p style={{ color: '#FBFBFC', fontSize: 14, margin: '4px 0 0', fontWeight: 500 }}>
                      Assistir no YouTube →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a
              href="https://www.youtube.com/playlist?list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.08)',
                color: '#FBFBFC',
                textDecoration: 'none',
                borderRadius: 8,
                padding: '12px 28px',
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Ver playlist completa →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #002d6b 0%, #003D8F 100%)',
          padding: '100px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -30,
            right: -40,
            fontSize: 200,
            fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          ✝
        </span>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              color: '#EB6B15',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Participação gratuita
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 900,
              color: '#FBFBFC',
              margin: '0 0 20px',
              lineHeight: 1.1,
            }}
          >
            Venha ser <span style={{ color: '#EB6B15' }}>inabalável</span>
            <br />
            conosco!
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(251,251,252,0.7)', margin: '0 0 40px', lineHeight: 1.8 }}>
            Preencha o formulário de inscrição e nos ajude a organizar
            <br />o melhor seminário possível para você.
          </p>
          <Link
            href="/inscricao"
            style={{
              display: 'inline-block',
              background: '#EB6B15',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 10,
              padding: '18px 44px',
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 0.5,
              boxShadow: '0 4px 24px rgba(235,107,21,0.5)',
            }}
          >
            Fazer minha inscrição →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ background: '#001f4d', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#7290BA', margin: 0 }}>
          Seminário Jovens Inabaláveis · 22 de Agosto de 2026 · Evento gratuito e aberto a todos
        </p>
      </footer>
    </div>
  );
}
