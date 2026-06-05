import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Search, ChevronDown, ChevronRight, X, ArrowRight } from 'lucide-react';
import { WINNERS, CATEGORIES, YEARS } from '@/data/winners';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';
const NAVY = '#111D55';
const GOLD = '#EFBF04';
const BORDER = '#D0D5DD';
const GRAY = '#666666';
const BG_ALT = '#E4E2E3';

export default function Preistraeger() {
  const isMobile = useIsMobile();
  const [activeYear, setActiveYear] = useState(YEARS[0]); // default: most recent
  const [filterCategory, setFilterCategory] = useState('');
  const [search, setSearch] = useState('');
  const [mediaOnly, setMediaOnly] = useState(false);

  const filtered = useMemo(() => WINNERS.filter(w => {
    if (w.year !== activeYear) return false;
    if (filterCategory && w.category !== filterCategory) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (mediaOnly && !w.hasMedia) return false;
    return true;
  }), [activeYear, filterCategory, search, mediaOnly]);

  const reset = () => { setFilterCategory(''); setSearch(''); setMediaOnly(false); };
  const hasFilter = !!(filterCategory || search || mediaOnly);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ width: '100%', height: '50vh', overflow: 'hidden', position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
          alt="Preisverleihung"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(3,9,58,0.82) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.3), transparent)' }} />
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${BORDER}`, padding: isMobile ? '18px 24px' : '18px 80px' }}>
        <span style={{ fontFamily: FF, fontSize: 16, color: GOLD, fontWeight: 600, letterSpacing: '0.04em' }}>Preisträger:innen</span>
      </div>

      {/* Filter Section */}
      <div style={{ background: '#fff', padding: isMobile ? '32px 24px 24px' : '48px 80px 32px' }}>
        {/* #93: Headline entfernt – Seitenname steht bereits oben im Breadcrumb. */}

        {/* Year Tabs */}
        <div style={{ display: 'flex', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: 0, marginBottom: 32, borderBottom: `2px solid ${BORDER}`, overflowX: isMobile ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}>
          {YEARS.map(year => (
            <button
              key={year}
              onClick={() => { setActiveYear(year); reset(); }}
              style={{
                fontFamily: FF, fontSize: 16, fontWeight: 700,
                padding: isMobile ? '12px 20px' : '12px 32px',
                flexShrink: 0,
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeYear === year ? NAVY : GRAY,
                borderBottom: activeYear === year ? `2px solid ${GOLD}` : '2px solid transparent',
                marginBottom: -2,
                letterSpacing: '0.04em',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Filter Row */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 16, alignItems: 'stretch', marginBottom: 20, flexWrap: 'wrap' }}>
          <SelectControl
            value={filterCategory}
            onChange={setFilterCategory}
            placeholder="Preiskategorie …"
            options={CATEGORIES.map(c => ({ label: c, value: c }))}
            width={isMobile ? undefined : 280}
          />
          <SearchControl value={search} onChange={setSearch} />
        </div>

        {/* Toggle row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#101828' }}>
              Diese Erfolgsgeschichten müssen erzählt werden.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15 }}>💬</span>
              <span style={{ fontFamily: FF, fontSize: 15, color: GRAY }}>Mit Medienbeiträgen (Videos & Storys)</span>
              <button
                onClick={() => setMediaOnly(v => !v)}
                style={{
                  width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                  background: mediaOnly ? NAVY : BORDER,
                  position: 'relative', transition: 'background 0.2s',
                }}
              >
                <span style={{
                  position: 'absolute', top: 3, left: mediaOnly ? 20 : 3, width: 16, height: 16,
                  borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                }} />
              </button>
            </div>
          </div>
          {hasFilter && (
            <button
              onClick={reset}
              style={{ fontFamily: FF, fontSize: 16, color: GRAY, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = GRAY)}
            >
              <X size={14} /> Filter zurücksetzen
            </button>
          )}
        </div>
      </div>

      {/* Count bar */}
      <div style={{ padding: isMobile ? '12px 24px' : '12px 80px', background: BG_ALT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Trophy size={13} style={{ color: GOLD }} fill={GOLD} />
        <span style={{ fontFamily: FF, fontSize: 15, color: GRAY }}>
          <strong style={{ color: '#101828' }}>{activeYear}</strong> – {filtered.length} Preisträger:innen
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: isMobile ? '56px 24px' : '80px', textAlign: 'center', color: GRAY, fontFamily: FF }}>
          Keine Preisträger für diese Auswahl.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? undefined : 'repeat(4, 1fr)',
          gridAutoFlow: isMobile ? 'column' : undefined,
          gridTemplateRows: isMobile ? 'repeat(2, 1fr)' : undefined,
          gridAutoColumns: isMobile ? '74vw' : undefined,
          overflowX: isMobile ? 'auto' : undefined,
          scrollSnapType: isMobile ? 'x mandatory' : undefined,
          gap: isMobile ? 8 : 0,
          padding: isMobile ? '0 16px 8px' : 0,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}>
          {filtered.map(w => (
            <WinnerCard key={w.id} winner={w} />
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div style={{ padding: isMobile ? '48px 24px' : '64px 80px', borderTop: `1px solid ${BORDER}`, textAlign: 'center' }}>
        <p style={{ fontFamily: FF, fontSize: 17, color: GRAY, marginBottom: 20 }}>Werden Sie der nächste Preisträger.</p>
        <Link
          to="/teilnahme"
          style={{
            fontFamily: FF, fontSize: 16, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: '#101828', background: GOLD,
            padding: '15px 36px', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.15s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        >
          Jetzt kostenlos bewerben <ArrowRight size={14} />
        </Link>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : undefined, flexWrap: isMobile ? 'wrap' : 'nowrap', gap: 8 }}>
          <span style={{ width: 20, height: 1, background: 'rgba(239,191,4,0.3)', display: 'inline-block' }} />
          <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 11, color: 'rgba(16,24,40,0.4)' }}>Diese Arbeit unterstützen:</span>
          <Link
            to="/mitglied-werden"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(239,191,4,0.7)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderBottom: '1px solid rgba(239,191,4,0.3)',
              paddingBottom: 1,
              transition: 'color 0.15s, borderColor 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#EFBF04';
              (e.currentTarget as HTMLElement).style.borderBottomColor = '#EFBF04';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(239,191,4,0.7)';
              (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(239,191,4,0.3)';
            }}
          >
            Vereinsmitglied werden <ChevronRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── WinnerCard ───────────────────────────────────────────────────────────────

function WinnerCard({ winner }: { winner: import('@/data/winners').Winner }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  return (
    <Link
      to={`/preistraeger/${winner.slug}`}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', height: isMobile ? 260 : 340, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)', scrollSnapAlign: isMobile ? 'start' : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={winner.img}
        alt={winner.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
      />
      {/* base gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }} />
      {/* hover overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s' }} />

      {/* Text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '18px 22px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <Trophy size={12} style={{ color: GOLD, flexShrink: 0 }} fill={GOLD} />
          <span style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {winner.year} · {winner.type}
          </span>
        </div>
        <h3 style={{ fontFamily: FF, fontSize: 18, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {winner.name}
        </h3>
        <p style={{ fontFamily: FF, fontSize: 16, color: 'rgba(255,255,255,0.82)', margin: '4px 0 0', lineHeight: 1.3 }}>
          {winner.category}
        </p>

        {/* Pill button */}
        <div style={{
          marginTop: 12,
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: NAVY, color: '#fff',
          padding: '9px 18px', borderRadius: 999,
          fontSize: 16, fontWeight: 700, fontFamily: FF,
          textTransform: 'uppercase', letterSpacing: '0.06em',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.25s, transform 0.25s',
        }}>
          <Trophy size={14} /> Mehr erfahren
        </div>
      </div>
    </Link>
  );
}

// ── SelectControl ────────────────────────────────────────────────────────────

function SelectControl({ value, onChange, placeholder, options, width }: {
  value: string; onChange: (v: string) => void;
  placeholder: string; options: { label: string; value: string }[];
  width?: number;
}) {
  const active = !!value;
  return (
    <div style={{ position: 'relative', width: width ?? '100%', flexShrink: width ? 0 : 1 }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', height: 44, padding: '0 36px 0 14px',
          fontFamily: FF, fontSize: 16,
          border: `1px solid ${active ? NAVY : BORDER}`,
          color: active ? NAVY : GRAY,
          background: '#fff', borderRadius: 0,
          appearance: 'none', cursor: 'pointer', outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
        onBlur={e => (e.currentTarget.style.borderColor = active ? NAVY : BORDER)}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#101828' }} />
    </div>
  );
}

// ── SearchControl ────────────────────────────────────────────────────────────

function SearchControl({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Stichwortsuche …"
        style={{
          width: '100%', height: 44, padding: '0 40px 0 14px',
          fontFamily: FF, fontSize: 16,
          border: `1px solid ${BORDER}`, borderRadius: 0,
          background: '#fff', outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.15s', color: '#101828',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
        onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
      />
      <Search size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: GRAY }} />
    </div>
  );
}
