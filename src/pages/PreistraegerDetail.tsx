import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Trophy, ArrowLeft, MapPin, Building2, Globe, ChevronRight } from 'lucide-react';
import { WINNERS } from '@/data/winners';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';
const NAVY = '#111D55';
const GOLD = '#EFBF04';
const BORDER = '#D0D5DD';
const GRAY = '#666666';
const BG_ALT = '#E4E2E3';

export default function PreistraegerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const winner = WINNERS.find(w => w.slug === slug);
  const isMobile = useIsMobile();

  if (!winner) return <Navigate to="/preistraeger" replace />;

  // Pick a second photo (offset from primary)
  const secondImg = winner.img.replace('w=800', 'w=900').replace('q=80', 'q=75');

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ width: '100%', height: '60vh', overflow: 'hidden', position: 'relative' }}>
        <img
          src={winner.img}
          alt={winner.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(3,9,58,0.82) 100%)' }} />
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${BORDER}`, padding: isMobile ? '16px 24px' : '16px 80px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link to="/preistraeger" style={{ fontFamily: FF, fontSize: 16, color: GOLD, textDecoration: 'none', fontWeight: 600 }}>
          Preisträger:innen
        </Link>
        <ChevronRight size={14} style={{ color: GRAY }} />
        <span style={{ fontFamily: FF, fontSize: 16, color: GRAY }}>{winner.name}</span>
      </div>

      {/* Header block */}
      <div style={{ padding: isMobile ? '32px 24px 28px' : '48px 80px 40px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: FF, fontSize: 11, fontWeight: 700, color: '#fff',
            background: NAVY, padding: '4px 14px', borderRadius: 999,
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            {winner.category}
          </span>
          <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: GOLD }}>
            {winner.year}
          </span>
          <span style={{ fontFamily: FF, fontSize: 15, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {winner.type}
          </span>
        </div>
        <h1 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.6rem, 5vw, 3rem)' : 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
          {winner.name}
        </h1>
        <p style={{ fontFamily: FB, fontSize: 18, color: GRAY, margin: 0, maxWidth: 640, lineHeight: 1.6 }}>
          {winner.shortDesc}
        </p>
      </div>

      {/* Content 2-col */}
      <div style={{ padding: isMobile ? '48px 24px' : '64px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 1fr', gap: isMobile ? 40 : 64 }}>
        {/* Left: Text */}
        <div>
          <h2 style={{ fontFamily: FF, fontSize: 18, fontWeight: 800, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 20 }}>
            Über das Unternehmen
          </h2>
          <p style={{ fontFamily: FB, fontSize: 18, color: '#333', lineHeight: 1.8, marginBottom: 40 }}>
            {winner.longDesc}
          </p>

          <h2 style={{ fontFamily: FF, fontSize: 18, fontWeight: 800, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 20 }}>
            Warum ausgezeichnet?
          </h2>
          <p style={{ fontFamily: FB, fontSize: 18, color: '#333', lineHeight: 1.8, marginBottom: 40 }}>
            Die Jury des Bayerischen Mittelstandspreises überzeugte {winner.name} durch außergewöhnliche Leistungen im Bereich <strong>{winner.category}</strong>. Das Unternehmen steht exemplarisch für die Stärken des bayerischen Mittelstands: unternehmerischen Mut, wertebasierte Führung und nachhaltige Wirkung weit über den eigenen Betrieb hinaus.
          </p>

          {/* Quote */}
          <div style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: 24, marginBottom: 40 }}>
            <p style={{ fontFamily: FB, fontStyle: 'italic', fontSize: 18, color: '#101828', lineHeight: 1.7, marginBottom: 12 }}>
              <span style={{ color: GOLD, fontSize: 28, lineHeight: 1, marginRight: 4, fontFamily: '"IBM Plex Sans"' }}>"</span>
              {winner.quote}
              <span style={{ color: GOLD, fontSize: 28, lineHeight: 1, marginLeft: 2, fontFamily: '"IBM Plex Sans"' }}>"</span>
            </p>
            <p style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: GRAY, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              — {winner.quotePerson}, {winner.quoteRole}
            </p>
          </div>
        </div>

        {/* Right: Photo + Info box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Photo */}
          <div style={{ borderRadius: 0, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="/gala-preistraeger.jpg" alt="Gala Preisverleihung" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.95)' }} />
          </div>

          {/* Kenndaten */}
          <div style={{ background: BG_ALT, borderLeft: `3px solid ${GOLD}`, padding: '20px 24px' }}>
            <h3 style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
              Auf einen Blick
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Kategorie', value: winner.category, icon: <Trophy size={14} style={{ color: GOLD }} /> },
                { label: 'Auszeichnung', value: winner.type, icon: <Trophy size={14} style={{ color: GOLD }} /> },
                { label: 'Jahr', value: String(winner.year), icon: null },
                { label: 'Standort', value: winner.location, icon: <MapPin size={14} style={{ color: GOLD }} /> },
                { label: 'Branche', value: winner.industry, icon: <Building2 size={14} style={{ color: GOLD }} /> },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: FF, fontSize: 11, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{row.label}</span>
                  <span style={{ fontFamily: FF, fontSize: 17, fontWeight: 700, color: '#101828', overflowWrap: 'anywhere' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Website button */}
          <a
            href={`https://${winner.website}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: FF, fontSize: 16, fontWeight: 700,
              color: '#101828', border: `2px solid ${NAVY}`,
              padding: '12px 20px', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              transition: 'all 0.2s', borderRadius: 0, overflowWrap: 'anywhere',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = '#fff'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = NAVY; }}
          >
            <Globe size={16} /> Website besuchen ↗
          </a>
        </div>
      </div>

      {/* Back link */}
      <div style={{ padding: isMobile ? '32px 24px 48px' : '32px 80px 64px', borderTop: `1px solid ${BORDER}` }}>
        <Link
          to="/preistraeger"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FF, fontSize: 17, fontWeight: 700, color: '#101828', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = GOLD)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = NAVY)}
        >
          <ArrowLeft size={16} /> Alle Preisträger
        </Link>
      </div>
    </div>
  );
}
