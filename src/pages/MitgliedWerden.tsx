import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Users, Star, Eye, Heart } from 'lucide-react';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';
import MembershipWizard from '@/components/membership/MembershipWizard';

const NAVY = '#111D55';
const GOLD = '#EFBF04';
const CREAM = '#EFE5E3';
const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';
const BLUE = '#4A8FC9';

// ── Benefit card with hover accent line ──────────────────────────────────────

function BenefitCard({
  icon,
  title,
  body,
  isLast,
  isMobile = false,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  isLast: boolean;
  isMobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        padding: isMobile ? '28px 24px' : '40px 36px',
        borderRight: isLast || isMobile ? 'none' : '1px solid rgba(3,9,58,0.08)',
        borderBottom: isMobile && !isLast ? '1px solid rgba(3,9,58,0.08)' : undefined,
        borderTop: `3px solid ${hovered ? GOLD : 'transparent'}`,
        transition: 'border-top-color 0.25s, background 0.25s',
        cursor: 'default',
        background: hovered ? 'rgba(3,9,58,0.02)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ marginBottom: 20 }}>{icon}</div>
      <div
        style={{
          fontFamily: FF,
          fontSize: 16,
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.07em',
          color: '#101828',
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FB,
          fontSize: 18,
          color: 'rgba(16,24,40,0.55)',
          lineHeight: 1.7,
        }}
      >
        {body}
      </div>
    </div>
  );
}

// ── Beitragsrechner ───────────────────────────────────────────────────────────

const BEITRAGS_TIERS = [
  { label: 'bis 10',    annual: 480 },
  { label: 'bis 20',    annual: 600 },
  { label: 'bis 50',    annual: 900 },
  { label: 'bis 100',   annual: 1200 },
  { label: 'bis 250',   annual: 2400 },
  { label: 'bis 1.000', annual: 3600 },
];
const BEITRAGS_VAT = 0.19;
const BEITRAGS_ADMISSION = 500;

function formatEurLocal(n: number) {
  return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function BeitragsrechnerSection({ isMobile }: { isMobile: boolean }) {
  const [selected, setSelected] = useState('');
  const [tableOpen, setTableOpen] = useState(false);

  const tier = BEITRAGS_TIERS.find(t => t.label === selected);
  const annualNet = tier?.annual ?? 0;
  const annualGross = annualNet * (1 + BEITRAGS_VAT);
  const admissionGross = BEITRAGS_ADMISSION * (1 + BEITRAGS_VAT);
  const today = new Date();
  const monthsLeft = 12 - today.getMonth();
  const anteilig = annualGross / 12 * monthsLeft + admissionGross;

  return (
    <section style={{ background: CREAM, position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
      <MunichSkylineBg />
      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '48px 24px' : '80px' }}>
        <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.32em', color: BLUE, display: 'block', marginBottom: 16 }}>
          Mitgliedsbeitrag
        </span>
        <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.03, margin: '0 0 20px' }}>
          IHR BEITRAG.
        </h2>
        <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 48 }} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left: dropdown + result */}
          <div>
            <label style={{ display: 'block', fontFamily: FF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(16,24,40,0.5)', marginBottom: 10 }}>
              Anzahl Mitarbeiter wählen
            </label>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: '#fff',
                border: `2px solid ${selected ? GOLD : 'rgba(16,24,40,0.15)'}`,
                borderRadius: 8,
                fontFamily: FF,
                fontSize: 16,
                fontWeight: 600,
                color: selected ? '#101828' : 'rgba(16,24,40,0.4)',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23EFBF04' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                transition: 'border-color 0.2s',
              }}
            >
              <option value="">Bitte wählen…</option>
              {BEITRAGS_TIERS.map(t => (
                <option key={t.label} value={t.label}>{t.label} Mitarbeiter</option>
              ))}
            </select>

            {/* Result card */}
            <div style={{
              marginTop: 24,
              background: NAVY,
              borderRadius: 12,
              padding: '24px 28px',
              opacity: selected ? 1 : 0,
              transform: selected ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: selected ? 'auto' : 'none',
            }}>
              <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: GOLD, marginBottom: 18 }}>
                Beitragsübersicht
              </div>
              {[
                ['Jahresbeitrag (netto)', formatEurLocal(annualNet)],
                ['Jahresbeitrag (19 % MwSt.)', formatEurLocal(annualGross)],
                ['Aufnahmegebühr (brutto)', formatEurLocal(admissionGross)],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: FF }}>{l}</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontFamily: FF }}>{v}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(239,191,4,0.3)', margin: '14px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                <span style={{ color: GOLD, fontWeight: 700, fontFamily: FF }}>Gesamt Jahr 1 (anteilig)</span>
                <span style={{ color: GOLD, fontWeight: 900, fontFamily: FF, fontSize: 18 }}>{formatEurLocal(anteilig)}</span>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: FF, lineHeight: 1.5 }}>
                * Anteilig ab nächstem Monatsersten bis 31.12. des laufenden Jahres. Ab dem Folgejahr gilt der volle Jahresbeitrag.
              </div>
            </div>

            <a
              href="#mitglied-formular"
              style={{
                display: 'block',
                marginTop: 20,
                background: GOLD,
                color: '#101828',
                fontFamily: FF,
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '14px 28px',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: 4,
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#FFD130';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = GOLD;
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Jetzt Mitglied werden →
            </a>
          </div>

          {/* Right: Staffeltabelle */}
          <div>
            <button
              onClick={() => setTableOpen(!tableOpen)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                border: '1px solid rgba(16,24,40,0.12)',
                borderBottom: tableOpen ? 'none' : '1px solid rgba(16,24,40,0.12)',
                borderRadius: tableOpen ? '8px 8px 0 0' : 8,
                padding: '14px 18px',
                cursor: 'pointer',
                fontFamily: FF,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#101828',
              }}
            >
              Vollständige Beitragsstaffel
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: tableOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                <path d="M2 4l5 5 5-5" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            {tableOpen && (
              <div style={{ background: '#fff', border: '1px solid rgba(16,24,40,0.12)', borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FF }}>
                  <thead>
                    <tr style={{ background: NAVY }}>
                      <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Mitarbeiter</th>
                      <th style={{ padding: '12px 18px', textAlign: 'right', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Netto / Jahr</th>
                      <th style={{ padding: '12px 18px', textAlign: 'right', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Brutto / Jahr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BEITRAGS_TIERS.map((t, i) => (
                      <tr key={t.label} style={{ background: i % 2 === 0 ? 'rgba(239,191,4,0.04)' : '#fff', borderBottom: '1px solid rgba(16,24,40,0.06)' }}>
                        <td style={{ padding: '12px 18px', fontSize: 14, color: '#101828', fontWeight: selected === t.label ? 700 : 400 }}>{t.label}</td>
                        <td style={{ padding: '12px 18px', fontSize: 14, textAlign: 'right', color: 'rgba(16,24,40,0.6)' }}>{formatEurLocal(t.annual)}</td>
                        <td style={{ padding: '12px 18px', fontSize: 14, textAlign: 'right', fontWeight: 600, color: selected === t.label ? NAVY : '#101828' }}>{formatEurLocal(t.annual * (1 + BEITRAGS_VAT))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: '10px 18px', fontSize: 11, color: 'rgba(16,24,40,0.4)', fontFamily: FF, borderTop: '1px solid rgba(16,24,40,0.06)' }}>
                  Zzgl. einmalige Aufnahmegebühr {formatEurLocal(BEITRAGS_ADMISSION * (1 + BEITRAGS_VAT))} (brutto) im ersten Jahr. Alle Angaben inkl. 19 % MwSt.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PDF Download Section — editorial split strip ──────────────────────────────

function PDFDownloadSection({ isMobile }: { isMobile: boolean }) {
  const [hover, setHover] = useState<'online' | 'pdf' | null>(null);

  return (
    <section style={{
      background: CREAM,
      borderTop: '1px solid rgba(16,24,40,0.08)',
      borderBottom: '1px solid rgba(16,24,40,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gold top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${GOLD} 0%, rgba(239,191,4,0.3) 60%, transparent 100%)` }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr',
        minHeight: isMobile ? undefined : 140,
      }}>
        {/* Left — online */}
        <a
          href="#mitglied-formular"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            padding: isMobile ? '32px 24px' : '40px 52px',
            textDecoration: 'none',
            background: hover === 'online' ? 'rgba(17,29,85,0.04)' : 'transparent',
            transition: 'background 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHover('online')}
          onMouseLeave={() => setHover(null)}
        >
          {/* Number */}
          <div style={{
            flexShrink: 0,
            fontFamily: FF,
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            fontWeight: 900,
            color: hover === 'online' ? GOLD : 'rgba(16,24,40,0.08)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            transition: 'color 0.3s ease',
            userSelect: 'none',
          }}>
            01
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: FF,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: BLUE,
              marginBottom: 8,
            }}>
              Online
            </div>
            <div style={{
              fontFamily: FF,
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#101828',
              marginBottom: 6,
            }}>
              Antrag digital ausfüllen
            </div>
            <div style={{
              fontFamily: FB,
              fontSize: 13,
              color: 'rgba(16,24,40,0.45)',
              lineHeight: 1.6,
            }}>
              In wenigen Schritten direkt auf dieser Seite
            </div>
          </div>

          {/* Arrow */}
          <div style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            border: `1px solid ${hover === 'online' ? GOLD : 'rgba(16,24,40,0.15)'}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
            background: hover === 'online' ? GOLD : 'transparent',
            transform: hover === 'online' ? 'translateX(4px)' : 'none',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke={hover === 'online' ? NAVY : 'rgba(16,24,40,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>

        {/* Divider */}
        {!isMobile && (
          <div style={{ background: 'rgba(16,24,40,0.08)', position: 'relative' }}>
            {/* Gold dot at center */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 6,
              height: 6,
              background: GOLD,
              borderRadius: '50%',
            }} />
          </div>
        )}

        {/* Right — PDF */}
        <a
          href="/aufnahmeantrag-bmp.pdf"
          download
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            padding: isMobile ? '32px 24px' : '40px 52px',
            textDecoration: 'none',
            background: hover === 'pdf' ? 'rgba(17,29,85,0.04)' : 'transparent',
            borderTop: isMobile ? '1px solid rgba(16,24,40,0.08)' : 'none',
            transition: 'background 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHover('pdf')}
          onMouseLeave={() => setHover(null)}
        >
          {/* Number */}
          <div style={{
            flexShrink: 0,
            fontFamily: FF,
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            fontWeight: 900,
            color: hover === 'pdf' ? GOLD : 'rgba(16,24,40,0.08)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            transition: 'color 0.3s ease',
            userSelect: 'none',
          }}>
            02
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: FF,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: BLUE,
              marginBottom: 8,
            }}>
              Per Post
            </div>
            <div style={{
              fontFamily: FF,
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#101828',
              marginBottom: 6,
            }}>
              PDF herunterladen
            </div>
            <div style={{
              fontFamily: FB,
              fontSize: 13,
              color: 'rgba(16,24,40,0.45)',
              lineHeight: 1.6,
            }}>
              Antrag ausdrucken und unterschrieben einsenden
            </div>
          </div>

          {/* Download icon */}
          <div style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            border: `1px solid ${hover === 'pdf' ? GOLD : 'rgba(16,24,40,0.15)'}`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
            background: hover === 'pdf' ? GOLD : 'transparent',
            transform: hover === 'pdf' ? 'translateY(2px)' : 'none',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke={hover === 'pdf' ? NAVY : 'rgba(16,24,40,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  { q: 'Wer kann Mitglied werden?', a: 'Mitglied können natürliche und juristische Personen werden, die die Ziele des BMP e.V. unterstützen. Dazu zählen Unternehmen jeder Rechtsform, Verbände, Institutionen sowie Einzelpersonen.' },
  { q: 'Wie hoch ist der Mitgliedsbeitrag?', a: 'Der Jahresbeitrag richtet sich nach der Anzahl Ihrer Mitarbeiter und liegt zwischen 480 € und 3.600 € netto. Hinzu kommt eine einmalige Aufnahmegebühr von 500 € netto. Alle Beträge zzgl. 19 % MwSt.' },
  { q: 'Wie läuft das Aufnahmeverfahren ab?', a: 'Nach Eingang Ihres Antrags wird dieser in der nächsten Vorstandssitzung beraten. Sie erhalten innerhalb von 5 Werktagen eine Eingangsbestätigung. Die formelle Aufnahme erfolgt durch Beschluss des Vorstands.' },
  { q: 'Wie wird der Beitrag eingezogen?', a: 'Der Mitgliedsbeitrag wird jährlich per SEPA-Lastschrift eingezogen. Im ersten Jahr wird der Beitrag anteilig ab dem nächsten Monatsersten bis Jahresende berechnet.' },
  { q: 'Wie kann ich die Mitgliedschaft kündigen?', a: 'Die Mitgliedschaft kann mit einer Frist von einem Jahr zum Jahresende schriftlich gekündigt werden. Die Kündigung ist an den Vorstand des BMP e.V. zu richten.' },
  { q: 'Welche Rechte habe ich als Mitglied?', a: 'Als Mitglied haben Sie Stimmrecht in der Mitgliederversammlung, können Anträge stellen und aktiv an der Vereinsarbeit teilnehmen. Sie erhalten Zugang zu Events, dem Mitgliedernetzwerk und allen Publikationen.' },
  { q: 'Kann ich den Beitrag von der Steuer absetzen?', a: 'Da es sich um einen Förderbeitrag an einen gemeinnützigen Verein handelt, ist der Mitgliedsbeitrag in der Regel als Betriebsausgabe absetzbar. Bitte sprechen Sie dazu mit Ihrem Steuerberater.' },
];

function FAQSection({ isMobile }: { isMobile: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ background: CREAM, padding: isMobile ? '48px 24px' : '80px' }}>
      <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.32em', color: BLUE, display: 'block', marginBottom: 16 }}>
        Häufige Fragen
      </span>
      <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.03, margin: '0 0 20px' }}>
        FAQ.
      </h2>
      <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 48 }} />

      <div style={{ maxWidth: 800 }}>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(16,24,40,0.1)' }}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: 16,
              }}
            >
              <span style={{
                fontFamily: FF,
                fontSize: 16,
                fontWeight: openIdx === i ? 700 : 600,
                color: openIdx === i ? NAVY : '#101828',
                transition: 'color 0.2s',
                lineHeight: 1.4,
              }}>
                {item.q}
              </span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ flexShrink: 0, transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
              >
                <path d="M3 5l5 5 5-5" stroke={openIdx === i ? GOLD : 'rgba(16,24,40,0.4)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openIdx === i && (
              <div style={{
                padding: '0 0 20px',
                fontFamily: FB,
                fontSize: 17,
                color: 'rgba(16,24,40,0.6)',
                lineHeight: 1.8,
                borderLeft: `3px solid ${GOLD}`,
                paddingLeft: 20,
                marginLeft: 2,
              }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Quote card ────────────────────────────────────────────────────────────────

function QuoteCard({
  quote,
  initials,
  name,
  role,
}: {
  quote: string;
  initials: string;
  name: string;
  role: string;
}) {
  return (
    <div
      style={{
        background: CREAM,
        padding: '32px',
        borderTop: `3px solid ${GOLD}`,
        display: 'flex',
        flexDirection: 'column' as const,
      }}
    >
      <p
        style={{
          fontFamily: FB,
          fontSize: 18,
          fontStyle: 'italic',
          color: 'rgba(16,24,40,0.7)',
          lineHeight: 1.75,
          margin: '0 0 24px',
          flex: 1,
        }}
      >
        "{quote}"
      </p>
      <div style={{ width: 32, height: 1, background: GOLD, marginBottom: 20 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            background: NAVY,
            color: GOLD,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FF,
            fontSize: 16,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <div
            style={{
              fontFamily: FF,
              fontSize: 16,
              fontWeight: 700,
              color: '#101828',
              marginBottom: 2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: FB,
              fontSize: 16,
              color: 'rgba(16,24,40,0.45)',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
            }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const MitgliedWerden: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="animate-fade-in">

      {/* ── SECTION 1 — Minimal Header ──────────────────────────────────────── */}
      <header
        style={{
          background: NAVY,
          padding: isMobile ? '16px 24px' : '18px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(239,191,4,0.25)',
        }}
      >
        <span
          style={{
            fontFamily: FF,
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: GOLD,
          }}
        >
          BMP 2026
        </span>
        <Link
          to="/"
          style={{
            fontFamily: FF,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <ArrowLeft size={12} />
          Zurück zur Website
        </Link>
      </header>

      {/* ── SECTION 2 — Hero ────────────────────────────────────────────────── */}
      <section
        style={{
          background: NAVY,
          padding: isMobile ? '64px 24px 48px' : '100px 80px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <img
          src="/images/mitglied-hero.jpg"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Dark overlay so text remains readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,29,85,0.92) 0%, rgba(17,29,85,0.75) 55%, rgba(17,29,85,0.45) 100%)' }} />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
            alignItems: 'center',
            gap: isMobile ? 40 : 60,
          }}
        >
          {/* Left col */}
          <div style={{ maxWidth: 760 }}>
            <span
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: GOLD,
                display: 'block',
                marginBottom: 24,
              }}
            >
              Vereinsmitgliedschaft
            </span>
            <h1
              style={{
                fontFamily: FF,
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                margin: '0 0 28px',
              }}
            >
              DEIN WEG ZU UNS.
            </h1>
            <div style={{ width: 48, height: 3, background: GOLD, marginBottom: 28 }} />
            <p
              style={{
                fontFamily: FB,
                fontSize: 18,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: 520,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Der Bayerische Mittelstandspreis lebt vom Engagement seiner Mitglieder.
              Als Teil des Vereins gestaltest du aktiv mit, wer ausgezeichnet wird — und warum.
            </p>
          </div>

          {/* Right col — typographic stat block */}
          {!isMobile && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                paddingRight: 16,
              }}
            >
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 72,
                    fontWeight: 900,
                    color: GOLD,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  120+
                </div>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: 4,
                  }}
                >
                  Mitglieder
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  height: 1,
                  background: 'rgba(255,255,255,0.1)',
                  margin: '32px 0',
                }}
              />

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  20+
                </div>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: 4,
                  }}
                >
                  Jahre
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  height: 1,
                  background: 'rgba(255,255,255,0.1)',
                  margin: '32px 0',
                }}
              />

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  500 €
                </div>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: 4,
                  }}
                >
                  Aufnahme
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gold bottom gradient rule */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.3), transparent)`,
          }}
        />
      </section>

      {/* ── SECTION 3 — Benefit cards ───────────────────────────────────────── */}
      <section style={{ background: CREAM, position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: isMobile ? '48px 24px' : '80px 80px 72px',
          }}
        >
          <span
            style={{
              fontFamily: FF,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              color: BLUE,
              display: 'block',
              marginBottom: 16,
            }}
          >
            Deine Vorteile
          </span>
          <h2
            style={{
              fontFamily: FF,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#101828',
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              lineHeight: 1.03,
              margin: '0 0 20px',
            }}
          >
            WAS DU GEWINNST.
          </h2>
          <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 48 }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              borderTop: '1px solid rgba(3,9,58,0.1)',
            }}
          >
            <BenefitCard
              icon={<Users size={24} color={NAVY} strokeWidth={1.5} />}
              title="Netzwerk"
              body="Direkter Zugang zu Jury-Mitgliedern, Partnern und Entscheidern aus dem bayerischen Mittelstand."
              isLast={false}
              isMobile={isMobile}
            />
            <BenefitCard
              icon={<Star size={24} color={NAVY} strokeWidth={1.5} />}
              title="Gestaltung"
              body="Bringe deine Expertise in die Kriterien des Awards ein und forme aktiv mit, wer ausgezeichnet wird."
              isLast={false}
              isMobile={isMobile}
            />
            <BenefitCard
              icon={<Eye size={24} color={NAVY} strokeWidth={1.5} />}
              title="Sichtbarkeit"
              body="Als Vereinsmitglied wirst du im BMP-Ökosystem sichtbar — auf Events, in Publikationen und online."
              isLast={false}
              isMobile={isMobile}
            />
            <BenefitCard
              icon={<Heart size={24} color={NAVY} strokeWidth={1.5} />}
              title="Wirkung"
              body="Leiste einen konkreten Beitrag für den bayerischen Mittelstand und die Menschen dahinter."
              isLast={true}
              isMobile={isMobile}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — Über den Verein ─────────────────────────────────────── */}
      <section
        style={{
          background: '#fff',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '45% 55%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left col */}
        <div style={{ padding: isMobile ? '48px 24px' : '80px 64px' }}>
          <span
            style={{
              fontFamily: FF,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              color: BLUE,
              display: 'block',
              marginBottom: 20,
            }}
          >
            Der Verein
          </span>
          <h2
            style={{
              fontFamily: FF,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 900,
              color: '#101828',
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              lineHeight: 1.03,
              margin: '0 0 20px',
            }}
          >
            WER WIR SIND.
          </h2>
          <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 32 }} />
          <p
            style={{
              fontFamily: FB,
              fontSize: 18,
              color: 'rgba(16,24,40,0.55)',
              lineHeight: 1.85,
              margin: '0 0 20px',
            }}
          >
            Der Bayerische Mittelstandspreis e.V. ist ein gemeinnütziger Verein, der seit über
            zwei Jahrzehnten die Exzellenz im bayerischen Mittelstand fördert und sichtbar macht.
          </p>
          <p
            style={{
              fontFamily: FB,
              fontSize: 18,
              color: 'rgba(16,24,40,0.55)',
              lineHeight: 1.85,
              margin: '0 0 40px',
            }}
          >
            Unsere Mitglieder sind Unternehmer:innen, Wissenschaftler:innen, Verbände und
            Einzelpersonen — verbunden durch das Ziel, den Mittelstand als Rückgrat der
            bayerischen Wirtschaft zu stärken.
          </p>
          <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 16 }} />
          <span
            style={{
              fontFamily: FB,
              fontSize: 17,
              color: 'rgba(16,24,40,0.5)',
              letterSpacing: '0.05em',
            }}
          >
            Bayerischer Mittelstandspreis e.V., eingetragener gemeinnütziger Verein
          </span>
        </div>

        {/* Right col */}
        <div
          style={{
            padding: isMobile ? '0 24px 48px' : '80px 64px',
            borderLeft: isMobile ? 'none' : '1px solid rgba(16,24,40,0.08)',
            borderTop: isMobile ? '1px solid rgba(16,24,40,0.08)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {[
            {
              num: '01',
              label: 'Gemeinnützig',
              body: 'Alle Aktivitäten dienen ausschließlich dem Vereinszweck',
            },
            {
              num: '02',
              label: 'Ehrenamtlich',
              body: 'Vorstand und Jury arbeiten ohne Vergütung',
            },
            {
              num: '03',
              label: 'Transparent',
              body: 'Jahresbericht und Satzung öffentlich einsehbar',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '0 16px',
                padding: '20px 0',
                borderBottom: '1px solid rgba(16,24,40,0.08)',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  fontFamily: FF,
                  fontSize: 10,
                  fontWeight: 700,
                  color: GOLD,
                  letterSpacing: '0.1em',
                  paddingTop: 2,
                }}
              >
                {item.num}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 16,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: '#101828',
                    marginBottom: 6,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: FB,
                    fontSize: 18,
                    color: 'rgba(16,24,40,0.5)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 — Beitragsrechner ─────────────────────────────────────── */}
      <BeitragsrechnerSection isMobile={isMobile} />

      {/* ── Antrag-Wahl Strip ────────────────────────────────────────────────── */}
      <PDFDownloadSection isMobile={isMobile} />

      {/* ── SECTION 6 — Formular ────────────────────────────────────────────── */}
      <section
        id="mitglied-formular"
        style={{ background: NAVY, position: 'relative', overflow: 'hidden', height: isMobile ? 'auto' : 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '4fr 1px 8fr',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {/* Left — pitch */}
          <div
            style={{
              padding: isMobile ? '32px 24px 24px' : '36px 36px 32px 52px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
                color: GOLD,
                display: 'block',
                marginBottom: 20,
              }}
            >
              Jetzt beitreten
            </span>
            <h2
              style={{
                fontFamily: FF,
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                lineHeight: 1.04,
                margin: '0 0 20px',
              }}
            >
              DU BIST DABEI.
            </h2>
            <div style={{ width: 36, height: 2, background: GOLD, marginBottom: 28 }} />
            <p
              style={{
                fontFamily: FB,
                fontSize: 18,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
                maxWidth: 400,
                marginBottom: 48,
              }}
            >
              Fülle das Formular aus und wir melden uns innerhalb von 48 Stunden bei dir.
              Die Mitgliedschaft beginnt mit Bestätigung durch den Vorstand.
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                {
                  num: '01',
                  label: 'Sofort-Zugang',
                  desc: 'Netzwerk-Plattform ab Aufnahme',
                },
                {
                  num: '02',
                  label: 'Willkommenspaket',
                  desc: 'Mitgliedsausweis + Jahresbericht',
                },
                {
                  num: '03',
                  label: 'Event-Einladung',
                  desc: 'Nächste BMP-Veranstaltung inklusive',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr',
                    gap: '0 16px',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FF,
                      fontSize: 10,
                      fontWeight: 700,
                      color: 'rgba(239,191,4,0.6)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.num}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FF,
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FB,
                        fontSize: 17,
                        color: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center divider */}
          <div
            style={{
              background: 'rgba(255,255,255,0.07)',
              display: isMobile ? 'none' : undefined,
            }}
          />

          {/* Right — wizard */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.18)', overflowY: 'auto', minHeight: 0 }}>
            {!isMobile && (
              <div style={{ height: 180, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/images/gewinner-gruppenfoto.jpg" alt="BMP Mitglieder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,29,85,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: GOLD }} />
                <div style={{ position: 'absolute', bottom: 16, left: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD }} />
                  <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>BMP Mitglieder 2025</span>
                </div>
              </div>
            )}
            <div style={{ padding: isMobile ? '24px' : '28px 40px 32px', flex: 1, overflowY: 'auto' }}>
              <MembershipWizard />
            </div>
          </div>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.25), transparent)', flexShrink: 0 }} />
      </section>

      {/* ── SECTION 7 — Testimonials ────────────────────────────────────────── */}
      <section style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ padding: isMobile ? '48px 24px' : '80px' }}>
          <span
            style={{
              fontFamily: FF,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              color: BLUE,
              display: 'block',
              marginBottom: 16,
            }}
          >
            Stimmen der Mitglieder
          </span>
          <h2
            style={{
              fontFamily: FF,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#101828',
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              lineHeight: 1.03,
              margin: '0 0 20px',
            }}
          >
            WAS MITGLIEDER SAGEN.
          </h2>
          <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 48 }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            <QuoteCard
              quote="Die Mitgliedschaft hat mir Zugang zu einem Netzwerk gegeben, das ich sonst nie erreicht hätte. Der BMP verbindet Menschen, die wirklich etwas bewegen wollen."
              initials="MH"
              name="Markus Hoffmann"
              role="Unternehmer, München"
            />
            <QuoteCard
              quote="Als Fördermitglied kann ich aktiv mitgestalten, was im bayerischen Mittelstand als exzellent gilt. Dieser Einfluss ist unbezahlbar."
              initials="SK"
              name="Sandra Keller"
              role="Verbandsvertreterin"
            />
            <QuoteCard
              quote="Der Verein ist das Rückgrat des Awards — ohne die Mitglieder gibt es keinen BMP. Ich bin stolz, Teil davon zu sein."
              initials="TR"
              name="Thomas Riedl"
              role="Jury-Alumni"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <FAQSection isMobile={isMobile} />

      {/* ── SECTION 8 — Bottom CTA ──────────────────────────────────────────── */}
      <section
        style={{
          background: NAVY,
          padding: isMobile ? '48px 24px' : '80px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: FF,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.32em',
            color: GOLD,
            display: 'block',
            marginBottom: 20,
          }}
        >
          Werde Teil des BMP
        </span>
        <h2
          style={{
            fontFamily: FF,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '-0.025em',
            lineHeight: 1.03,
            margin: '0 auto 20px',
            maxWidth: 640,
          }}
        >
          GESTALTE MIT. NETZWERKE. WIRKE.
        </h2>
        <div
          style={{
            width: 40,
            height: 2,
            background: GOLD,
            margin: '0 auto 40px',
          }}
        />
        <a
          href="#mitglied-formular"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: GOLD,
            color: '#101828',
            fontFamily: FF,
            fontSize: 17,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            padding: '16px 36px',
            textDecoration: 'none',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#FFD130';
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = GOLD;
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          Jetzt Mitglied werden
          <ChevronRight size={14} />
        </a>
      </section>

    </div>
  );
};

export default MitgliedWerden;
