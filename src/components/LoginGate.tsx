import React, { useState } from 'react';

const SESSION_KEY = 'bmp_auth';
const VALID_USER = 'newedgebrand';
const VALID_PASS = 'n3wedg3br4nd2o26';

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

const FF = '"IBM Plex Sans", sans-serif';

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(isAuthenticated);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  if (authed) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === VALID_USER && pass === VALID_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
    } else {
      setError('Ungültige Zugangsdaten.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#111D55',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: FF,
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(#EFBF04 1px, transparent 1px), linear-gradient(90deg, #EFBF04 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Logo mark */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 64, height: 64,
          border: '2px solid #EFBF04',
          marginBottom: 20,
        }}>
          <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 22, color: '#EFBF04', letterSpacing: '0.05em' }}>BMP</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700 }}>
          Bayerischer Mittelstandspreis
        </div>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 380,
          padding: '40px 40px 36px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: shake ? 'bmp-shake 0.5s ease' : undefined,
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <div style={{ color: 'white', fontSize: 18, fontWeight: 300, marginBottom: 6, letterSpacing: '0.01em' }}>
            Zugang
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            Bitte melden Sie sich an, um fortzufahren.
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            Benutzername
          </label>
          <input
            type="text"
            value={user}
            onChange={e => { setUser(e.target.value); setError(''); }}
            autoComplete="username"
            style={{
              width: '100%', padding: '12px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${error ? '#e53e3e' : 'rgba(255,255,255,0.15)'}`,
              color: 'white', fontSize: 14, outline: 'none',
              fontFamily: FF, boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            Passwort
          </label>
          <input
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(''); }}
            autoComplete="current-password"
            style={{
              width: '100%', padding: '12px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${error ? '#e53e3e' : 'rgba(255,255,255,0.15)'}`,
              color: 'white', fontSize: 14, outline: 'none',
              fontFamily: FF, boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <div style={{ marginBottom: 16, color: '#fc8181', fontSize: 12 }}>{error}</div>
        )}

        <button
          type="submit"
          style={{
            width: '100%', padding: '14px',
            background: '#EFBF04', border: 'none', cursor: 'pointer',
            color: '#111D55', fontFamily: FF, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            transition: 'background 0.15s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EFBF04'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        >
          Anmelden
        </button>
      </form>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 32, color: 'rgba(255,255,255,0.2)', fontSize: 10, letterSpacing: '0.2em' }}>
        © {new Date().getFullYear()} New Edge Brand
      </div>

      <style>{`
        @keyframes bmp-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
