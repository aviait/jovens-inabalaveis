'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(0,29,77,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#FBFBFC',
          letterSpacing: 0.3,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Jovens Inabaláveis — 22 ago 2026
      </span>

      <Link
        href="/pre-cadastro"
        style={{
          background: '#EB6B15',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 8,
          padding: '8px 20px',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.3,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          boxShadow: '0 2px 12px rgba(235,107,21,0.4)',
        }}
      >
        Pré-cadastro →
      </Link>
    </div>
  );
}
