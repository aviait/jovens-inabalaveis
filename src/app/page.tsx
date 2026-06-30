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
  { period: 'MANHÃ', time: '09h – 12h', description: 'Abertura, louvor e as primeiras sessões de ensino.' },
  { period: 'TARDE', time: '14h – 17h', description: 'Continuação dos temas, perguntas e debate aberto.' },
  { period: 'NOITE', time: '19h – 21h30', description: 'Última sessão, oração e encerramento.' },
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
          className="nav-inner"
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
            href="/pre-cadastro"
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
            Pré-cadastro
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
          {/* badges */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(235,107,21,0.2)',
                border: '1px solid rgba(235,107,21,0.5)',
                borderRadius: 100,
                padding: '6px 18px',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: '#EB6B15', textTransform: 'uppercase', letterSpacing: 1 }}>
                2ª Edição
              </span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 100,
                padding: '5px 14px',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#EB6B15',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: '#FACAA5',
                  textTransform: 'uppercase',
                }}
              >
                22 de Agosto de 2026
              </span>
            </div>
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
            Um dia mergulhado na Palavra, ao lado de jovens que querem se firmar na fé.{' '}
            <strong style={{ color: '#FACAA5' }}>Gratuito e aberto a todos</strong>.
          </p>

          <div className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/pre-cadastro"
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
              Fazer meu pré-cadastro →
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
              Ver mais
            </a>
          </div>

          {/* info row */}
          <div
            className="hero-info-row"
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
        <a
          href="#sobre"
          className="scroll-hint"
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
            Role para baixo
          </span>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.25)', margin: '0 auto' }} />
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>↓</span>
        </a>
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
            Fé que não balança
            <br />quando o mundo empurra
          </h2>
          <p style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.9, marginBottom: 20 }}>
            Tem muita coisa no ar tentando convencer os jovens de que a fé cristã é ultrapassada, ingênua ou
            irrelevante. O <strong>Seminário Jovens Inabaláveis</strong> existe pra mostrar que não é bem assim
            — e pra te ajudar a saber o porquê você acredita no que acredita.
          </p>
          <p style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.9 }}>
            Em um dia inteiro, a gente vai entrar fundo em temas que a galera tem dúvida mas raramente discute
            na igreja. Você vai sair sabendo mais — e mais firme.
          </p>
          <div style={{ marginTop: 40, paddingTop: 36, borderTop: '1px solid #e5e7eb' }}>
            <SectionCTA label="Quero participar da 2ª edição →" />
          </div>
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
              Como vai ser o dia
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
          <div style={{ marginTop: 40, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <SectionCTA label="Quero participar da 2ª edição →" dark />
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
              Possíveis temas
            </h2>
            <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
              A grade ainda não está fechada. No pré-cadastro você vota nos temas que acha mais urgente — e a
              programação vai ser definida com base nisso.
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
          <div style={{ marginTop: 40, paddingTop: 36, borderTop: '1px solid #e5e7eb' }}>
            <SectionCTA label="Registrar meu interesse →" />
          </div>
        </div>
      </section>

      {/* ── 1ª EDIÇÃO ─────────────────────────────────────── */}
      <section style={{ background: '#001f4d', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          {/* Cabeçalho contextual */}
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
              Já rolou uma vez
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#FBFBFC', margin: '0 0 16px' }}>
              A 1ª edição foi incrível.
              <br />
              <span style={{ color: '#EB6B15' }}>A 2ª vai ser ainda maior.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#7290BA', margin: '0 auto', maxWidth: 600, lineHeight: 1.7 }}>
              Na primeira edição passamos um dia inteiro abordando{' '}
              <strong style={{ color: '#FACAA5' }}>cosmovisão cristã, saúde emocional, organização pessoal, finanças, vocação secular e vocação ministerial</strong>.
              {' '}Ficou tudo gravado — de graça, no YouTube. Cada turno tem a live completa e as partes separadas.
            </p>
          </div>

          {/* 3 blocos por turno */}
          {[
            {
              turno: 'Manhã',
              time: '09h – 12h',
              live: { videoId: '90Bv3QAjNPo', url: 'https://www.youtube.com/watch?v=90Bv3QAjNPo&t=1914s' },
              partes: [
                { label: 'Parte 1', videoId: 'TbsNadl45jA', url: 'https://www.youtube.com/watch?v=TbsNadl45jA&list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3&index=1' },
                { label: 'Parte 2', videoId: 'eAHTYnvxaKg', url: 'https://www.youtube.com/watch?v=eAHTYnvxaKg&list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3&index=2' },
              ],
            },
            {
              turno: 'Tarde',
              time: '14h – 17h',
              live: { videoId: 'dIxQOvfDYkg', url: 'https://www.youtube.com/live/dIxQOvfDYkg' },
              partes: [
                { label: 'Parte 1', videoId: 'sM5CExmx8F8', url: 'https://www.youtube.com/watch?v=sM5CExmx8F8&list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3&index=3' },
                { label: 'Parte 2', videoId: 'TM6bUyJAbEI', url: 'https://www.youtube.com/watch?v=TM6bUyJAbEI&list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3&index=4' },
              ],
            },
            {
              turno: 'Noite',
              time: '19h – 21h30',
              live: { videoId: 'aX-XU7l0ovQ', url: 'https://www.youtube.com/watch?v=aX-XU7l0ovQ&t=1343s' },
              partes: [
                { label: 'Parte 1', videoId: 'aqrmmsdB8XA', url: 'https://www.youtube.com/watch?v=aqrmmsdB8XA&list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3&index=5' },
                { label: 'Parte 2', videoId: '6wdwdXMHyNU', url: 'https://www.youtube.com/watch?v=6wdwdXMHyNU&list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3&index=6' },
              ],
            },
          ].map(({ turno, time, live, partes }) => (
            <div key={turno} style={{ marginBottom: 48 }}>
              {/* Título do turno */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div
                  style={{
                    background: '#EB6B15',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    padding: '4px 12px',
                    borderRadius: 6,
                    textTransform: 'uppercase',
                  }}
                >
                  {turno}
                </div>
                <span style={{ fontSize: 14, color: '#7290BA' }}>{time}</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* Live + Partes em grid */}
              <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}
              >
                {/* Card da live completa — destaque */}
                <VideoCard
                  url={live.url}
                  videoId={live.videoId}
                  label="Live Completa"
                  alt={`${turno} — Live completa · 1ª edição`}
                  featured
                />
                {/* Partes */}
                {partes.map((p) => (
                  <VideoCard
                    key={p.videoId}
                    url={p.url}
                    videoId={p.videoId}
                    label={p.label}
                    alt={`${turno} ${p.label} · 1ª edição`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Link playlist */}
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <a
              href="https://www.youtube.com/playlist?list=PLj0jt80zmmZ99eSRlIlbboTFIb2N7UQA3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.06)',
                color: '#FBFBFC',
                textDecoration: 'none',
                borderRadius: 8,
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Ver todos os vídeos da 1ª edição →
            </a>
          </div>

          <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#7290BA', margin: '0 0 16px' }}>
              Quer fazer parte da próxima edição?
            </p>
            <SectionCTA label="Fazer meu pré-cadastro →" dark />
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
            É só uma forma de saber quem tá animado e o que você quer ver lá.
            <br />Sem compromisso, sem taxa, sem nada — só clica e registra.
          </p>
          <Link
            href="/pre-cadastro"
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
            Fazer meu pré-cadastro →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ background: '#fff', borderTop: '1px solid #e8ecf5', padding: '48px 24px 32px' }}>
        {/* Realizado por */}
        <div
          style={{
            maxWidth: 700,
            margin: '0 auto 36px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2.5,
              color: '#9ca3af',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Uma realização de
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
              flexWrap: 'wrap',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-umadpb-blue.webp"
              alt="UMADPB — União da Mocidade da Assembleia de Deus na Paraíba"
              style={{ height: 56, width: 'auto' }}
            />
            <div
              style={{
                width: 1,
                height: 40,
                background: '#e5e7eb',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-adpb-blue.webp"
              alt="ADPB — Assembleia de Deus na Paraíba"
              style={{ height: 40, width: 'auto' }}
            />
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #f3f4f6',
            paddingTop: 24,
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>
            Seminário Jovens Inabaláveis · 22 de Agosto de 2026 · Evento gratuito e aberto a todos
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionCTA({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <Link
      href="/pre-cadastro"
      style={{
        display: 'inline-block',
        background: '#EB6B15',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: 10,
        padding: '14px 32px',
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: 0.3,
        boxShadow: dark ? '0 4px 20px rgba(235,107,21,0.4)' : '0 4px 16px rgba(235,107,21,0.25)',
      }}
    >
      {label}
    </Link>
  );
}

function VideoCard({
  url,
  videoId,
  label,
  alt,
  featured = false,
}: {
  url: string;
  videoId: string;
  label: string;
  alt: string;
  featured?: boolean;
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: featured ? '2px solid rgba(235,107,21,0.5)' : '1px solid rgba(255,255,255,0.08)',
          background: featured ? 'rgba(235,107,21,0.07)' : 'rgba(255,255,255,0.03)',
        }}
      >
        <div style={{ position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={alt}
            style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.28)',
            }}
          >
            <div
              style={{
                width: featured ? 60 : 48,
                height: featured ? 60 : 48,
                borderRadius: '50%',
                background: '#EB6B15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(235,107,21,0.5)',
              }}
            >
              <span style={{ fontSize: featured ? 22 : 17, marginLeft: 4 }}>▶</span>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: featured ? '#EB6B15' : 'rgba(0,0,0,0.6)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              padding: '3px 8px',
              borderRadius: 5,
              textTransform: 'uppercase',
              border: featured ? 'none' : '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {label}
          </div>
        </div>
        <div style={{ padding: '10px 14px' }}>
          <span style={{ fontSize: 12, color: featured ? '#EB6B15' : '#7290BA', fontWeight: 600 }}>
            Assistir no YouTube →
          </span>
        </div>
      </div>
    </a>
  );
}
