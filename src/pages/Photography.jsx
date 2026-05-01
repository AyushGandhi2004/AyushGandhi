import { Link } from 'react-router-dom';

export function Photography() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        Photography — Coming Soon
      </p>
      <Link
        to="/"
        style={{
          color: '#A0A0A0',
          fontSize: '0.875rem',
          letterSpacing: '0.02em',
          fontFamily: 'var(--font-body)',
          position: 'relative',
          transition: 'color 0.25s ease',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
        onMouseLeave={(e) => (e.target.style.color = '#A0A0A0')}
      >
        ← Back to Portfolio
      </Link>
    </main>
  );
}
