'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 24,
        zIndex: 100,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#EB6B15',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(235,107,21,0.45)',
        transition: 'opacity 0.2s',
      }}
    >
      ↑
    </button>
  );
}
