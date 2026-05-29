import React from "react";

interface PartnerLogo {
  id: string;
  label: React.ReactNode;
}

interface PartnerTickerProps {
  logos: PartnerLogo[];
}

export function PartnerTicker({ logos }: PartnerTickerProps) {
  // Duplicate logos for seamless infinite loop
  const track = [...logos, ...logos];

  return (
    <div style={{ overflow: 'hidden', flex: 1, minWidth: 0, position: 'relative' }}>
      {/* fade edges */}
      <div style={{ position: 'absolute', inset: 0, left: 0, width: 32, background: 'linear-gradient(to right, rgba(5,26,135,0.6), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, right: 0, left: 'auto', width: 32, background: 'linear-gradient(to left, rgba(5,26,135,0.6), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', width: 'max-content' }}>
        {track.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 24px',
              color: '#fff',
              fontFamily: '"IBM Plex Sans", sans-serif',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              width: 140,
              flexShrink: 0,
              textAlign: 'center',
            }}
          >
            {logo.label}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
