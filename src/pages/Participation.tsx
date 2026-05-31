import React, { useRef } from 'react';
import { MapPin, Users, TrendingUp, Building2, ArrowRight, CheckCircle2, UserCheck, Send, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import BewerbungsForm from '@/components/forms/BewerbungsForm';
import WegZurAuszeichnungSection from '@/components/WegZurAuszeichnungSection';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';
const NAVY = '#111D55';
const GOLD = '#EFBF04';
const CREAM = '#E4E2E3';

const Participation: React.FC = () => {
  const isMobile = useIsMobile();
  const qualSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="animate-fade-in">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: NAVY }}>
        <img
          src="/images/preisuebergabe.jpg"
          alt="Teilnahme BMP"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #020930 0%, rgba(2,9,48,0.90) 38%, rgba(2,9,48,0.18) 65%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.3), transparent)` }} />

        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 24px 48px' : '0 80px 80px', maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 2, background: GOLD }} />
            <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#EFBF04' }}>Phase 2026</span>
          </div>
          <h1 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.6rem, 6vw, 5rem)' : 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 24px' }}>
            GESTALTEN SIE<br />BAYERNS ZUKUNFT.
          </h1>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: 24 }} />
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 520, fontWeight: 300 }}>
            Alles, was Sie für Ihre erfolgreiche Bewerbung zum Bayerischen Mittelstandspreis wissen müssen.
          </p>
        </div>
      </section>

      {/* ── TIMELINE — direkt nach Hero ──────────────────────────────────────── */}
      <WegZurAuszeichnungSection />

      {/* ── QUALIFICATIONS ───────────────────────────────────────────────────── */}
      <section id="voraussetzungen" ref={qualSectionRef} style={{ background: CREAM, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />

        {/* Header */}
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '48px 24px 32px' : '80px 80px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, alignItems: 'flex-end', borderBottom: `1px solid #D0D5DD` }}>
          <div>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Berechtigung</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.03, margin: 0 }}>
              WER KANN<br />TEILNEHMEN?
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexShrink: 0 }}>
              <Link
                to="#bewerben"
                style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '11px 22px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                Jetzt bewerben <ArrowRight size={13} />
              </Link>
              <Link
                to="/mitglied-werden"
                style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: NAVY, border: `1.5px solid rgba(3,9,58,0.3)`, padding: '10px 22px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'border-color 0.2s, color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = NAVY; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3,9,58,0.3)'; }}
              >
                Mitglied werden
              </Link>
            </div>
            <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)', lineHeight: 1.8, margin: 0, textAlign: isMobile ? 'left' : 'right' }}>
              Vier klar definierte Kriterien — erfüllen Sie alle, bewerben Sie sich kostenlos und ohne bürokratischen Aufwand.
            </p>
          </div>
        </div>

        {/* 4 criteria as editorial rows */}
        <div style={{ position: 'relative', zIndex: 1, borderBottom: `1px solid #D0D5DD` }}>
          {[
            { num: '01', title: 'Standort Bayern', body: 'Sitz oder wesentliche Betriebsstätte im Freistaat Bayern.', Icon: MapPin },
            { num: '02', title: 'KMU-Größe', body: '10 bis 500 Beschäftigte — klassischer Mittelstand im privatwirtschaftlichen Bereich.', Icon: Users },
            { num: '03', title: 'Marktreife', body: 'Mindestens drei vollständige Geschäftsjahre am Markt tätig.', Icon: TrendingUp },
            { num: '04', title: 'Privatwirtschaft', body: 'Keine überwiegende Zugehörigkeit zu staatlichen oder kommunalen Trägern.', Icon: Building2 },
          ].map((item, i, arr) => {
            const Icon = item.Icon;
            return (
              <QualRow key={i} item={item} Icon={Icon} last={i === arr.length - 1} />
            );
          })}
        </div>

        {/* CTA nudge */}
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '24px 24px' : '32px 80px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle2 size={18} style={{ color: GOLD, flexShrink: 0 }} />
            <span style={{ fontFamily: FF, fontSize: 18, fontWeight: 600, color: '#101828' }}>Alle 4 Punkte erfüllt? Dann jetzt kostenlos bewerben.</span>
          </div>
          <Link
            to="#bewerben"
            style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '13px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Zum Formular <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── CRITERIA / BEWERTUNG ─────────────────────────────────────────────── */}
      <section id="kriterien" style={{ background: NAVY, overflow: 'hidden', position: 'relative' }}>

        {/* TOP: editorial split — image left (45%) / header right (55%) */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '45% 55%', minHeight: isMobile ? 'auto' : 480 }}>

          {/* Left — full-bleed image with gradient blend into navy on the right */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src="/images/buehne-gewinner.jpg"
              alt="Jury-Bewertung BMP"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            {/* Dark overlay for depth */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,9,58,0.35) 0%, rgba(3,9,58,0.15) 50%, rgba(3,9,58,0.35) 100%)' }} />
            {/* Right-side blend into navy */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(3,9,58,0.7) 80%, #111D55 100%)' }} />
            {/* Bottom blend for continuity with grid below */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, #111D55)' }} />
          </div>

          {/* Right — overline + headline + intro */}
          <div style={{ padding: isMobile ? '48px 24px' : '80px 80px 72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 20 }}>Bewertung</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.97, margin: '0 0 28px' }}>
              UNSERE<br />KRITERIEN.
            </h2>
            <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 28 }} />
            <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, margin: 0, maxWidth: 420 }}>
              Vier gleichgewichtete Säulen — bewertet durch eine vollständig unabhängige Expertenjury aus Wirtschaft, Wissenschaft und Gesellschaft.
            </p>
          </div>
        </div>

        {/* BOTTOM: full-width 4-column criteria grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
          {[
            { percentage: '25%', title: 'Innovations\u00ADkraft', desc: 'Zukunftsweisende Produkte, Dienstleistungen oder interne Prozessinnovationen.' },
            { percentage: '25%', title: 'Nachhaltigkeit',        desc: 'Ökologische Verantwortung und Ressourcen-Effizienz im operativen Kern.' },
            { percentage: '25%', title: 'Unternehmens\u00ADkultur', desc: 'Mitarbeiterbindung, Aus- und Weiterbildung sowie wertebasierte Führung.' },
            { percentage: '25%', title: 'Regionale Wurzeln',     desc: 'Engagement am Standort Bayern und Beitrag zur regionalen Wertschöpfung.' },
          ].map((crit, i) => (
            <CriteriaCell key={i} crit={crit} idx={i} />
          ))}
        </div>

        <div style={{ height: 2, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.2), transparent)` }} />
      </section>

      {/* ── BEWERBUNGSWEGE ───────────────────────────────────────────────────── */}
      <BewerbungswegeSection />

      {/* ── DATES BANNER ─────────────────────────────────────────────────────── */}
      <section id="fristen" style={{ background: GOLD }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr 1px 1fr 1px 1fr', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ padding: isMobile ? '32px 24px' : '48px 56px' }}>
            <h3 style={{ fontFamily: FF, fontSize: 18, fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 6 }}>Wichtige Termine 2026</h3>
            <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.6)', margin: 0 }}>Planen Sie Ihre Teilnahme rechtzeitig.</p>
          </div>
          <div style={{ background: 'rgba(3,9,58,0.12)' }} />
          {[
            { date: '30. Juni 2026', label: 'Bewerbungsschluss' },
            { date: 'August 2026', label: 'Bekanntgabe Nominierte' },
            { date: 'Oktober 2026', label: 'Gala-Verleihung' },
          ].map((d, i) => (
            <React.Fragment key={i}>
              <div style={{ padding: isMobile ? '24px 24px' : '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: isMobile ? '1px solid rgba(3,9,58,0.12)' : 'none' }}>
                <div style={{ fontFamily: FF, fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 900, color: '#101828', letterSpacing: '-0.02em', marginBottom: 6 }}>{d.date}</div>
                <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(16,24,40,0.55)' }}>{d.label}</div>
              </div>
              {i < 2 && !isMobile && <div style={{ background: 'rgba(3,9,58,0.12)' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY, position: 'relative', overflow: 'hidden', height: isMobile ? 'auto' : 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }} id="bewerben">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '4fr 1px 8fr', flex: 1, minHeight: 0, overflow: isMobile ? 'visible' : 'hidden' }}>
          {/* Left — copy */}
          <div style={{ padding: isMobile ? '32px 24px 24px' : '36px 36px 32px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: isMobile ? 'visible' : 'hidden' }}>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 20 }}>Direktbewerbung</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: '0 0 20px' }}>
              BEWERBEN ODER<br />VORSCHLAGEN.
            </h2>
            <div style={{ width: 36, height: 2, background: GOLD, marginBottom: 28 }} />
            <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, maxWidth: 400, marginBottom: 48 }}>
              Sie können sich selbst bewerben oder ein herausragendes Unternehmen vorschlagen. Die Teilnahme ist vollständig kostenfrei.
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { num: '01', label: 'Kostenfrei', desc: 'Keine Teilnahmegebühr' },
                { num: '02', label: 'Schnell', desc: 'Ca. 30–45 Minuten' },
                { num: '03', label: 'Mehrstufig', desc: 'Transparenter Prozess' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: '0 16px', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                  <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(239,191,4,0.5)', letterSpacing: '0.1em' }}>{item.num}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</span>
                    <span style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,0.62)' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          {!isMobile && <div style={{ background: 'rgba(255,255,255,0.07)' }} />}

          {/* Right — gold form panel */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: isMobile ? 'visible' : 'hidden', minHeight: 0, position: 'relative', background: 'linear-gradient(160deg,#DDB84A 0%,#C9A227 52%,#A87800 100%)' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
              <defs>
                <pattern id="participationCross" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L18,18 M18,0 L0,18" stroke="rgba(17,29,85,0.055)" strokeWidth="0.65" />
                </pattern>
                <pattern id="participationDiamond" width="36" height="36" patternUnits="userSpaceOnUse">
                  <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="rgba(17,29,85,0.045)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#participationCross)" />
              <rect width="100%" height="100%" fill="url(#participationDiamond)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(100,70,0,0.25) 100%)', pointerEvents: 'none', zIndex: 0 }} />

            {!isMobile && (
              <div style={{ height: 220, position: 'relative', overflow: 'hidden', flexShrink: 0, zIndex: 1 }}>
                <img src="/images/preistraeger-jubel.jpg" alt="Preisverleihung 2025" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'sepia(0.18) brightness(0.92)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(168,120,0,0.1) 0%, rgba(168,120,0,0.25) 50%, rgba(168,120,0,0.92) 88%, #A87800 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(17,29,85,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(17,29,85,0.7)' }} />
                  <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(17,29,85,0.75)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Preisverleihung 2025</span>
                </div>
              </div>
            )}
            <div style={{ padding: isMobile ? '28px 20px' : '24px 48px 32px 40px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: isMobile ? 560 : 0, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(17,29,85,0.5)', textTransform: 'uppercase', letterSpacing: '0.28em', fontWeight: 700 }}>Bewerbung 2026</span>
                <Link
                  to="/formular-hochladen"
                  style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(17,29,85,0.55)', border: '1px solid rgba(17,29,85,0.2)', padding: '7px 14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 0.15s, border-color 0.15s', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#111D55'; (e.currentTarget as HTMLElement).style.borderColor = '#111D55'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(17,29,85,0.55)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(17,29,85,0.2)'; }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 4l3-3 3 3M1 10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  PDF hochladen
                </Link>
              </div>
              <BewerbungsForm theme="gold" />
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '16px 20px 20px' : '14px 56px 18px', display: 'flex', justifyContent: 'center', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <Link to="/formular-hochladen" style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(239,191,4,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(239,191,4,0.3)', paddingBottom: 1 }}>
            Formular hochladen →
          </Link>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.25), transparent)', flexShrink: 0 }} />
      </section>
    </div>
  );
};

// ── QualRow ───────────────────────────────────────────────────────────────────

function QualRow({ item, Icon, last }: { item: { num: string; title: string; body: string }; Icon: React.ElementType; last: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  const isMobileRow = useIsMobile();
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: isMobileRow ? '40px 1fr' : '80px 200px 1fr 48px', gap: isMobileRow ? '0 16px' : '0 32px', padding: isMobileRow ? '24px 24px' : '28px 80px', borderBottom: last ? 'none' : '1px solid #D0D5DD', alignItems: isMobileRow ? 'flex-start' : 'center', background: hovered ? '#EAE7E6' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, color: hovered ? GOLD : 'rgba(239,191,4,0.5)', letterSpacing: '0.1em', transition: 'color 0.2s', paddingTop: 2 }}>{item.num}</span>
      {isMobileRow ? (
        <div>
          <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 700, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{item.title}</div>
          <div style={{ fontFamily: FB, fontSize: 17, color: 'rgba(16,24,40,0.5)', lineHeight: 1.6 }}>{item.body}</div>
        </div>
      ) : (
        <>
          <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 700, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{item.title}</div>
          <div style={{ fontFamily: FB, fontSize: 17, color: 'rgba(16,24,40,0.5)', lineHeight: 1.6 }}>{item.body}</div>
          <div style={{ width: 36, height: 36, background: hovered ? GOLD : 'rgba(3,9,58,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
            <Icon size={16} style={{ color: hovered ? '#101828' : 'rgba(16,24,40,0.3)', transition: 'color 0.2s' }} strokeWidth={1.5} />
          </div>
        </>
      )}
    </div>
  );
}

// ── CriteriaCell ──────────────────────────────────────────────────────────────

function CriteriaCell({ crit, idx }: { crit: { percentage: string; title: string; desc: string }; idx: number }) {
  const [hovered, setHovered] = React.useState(false);
  const isMobileCell = useIsMobile();
  return (
    <div
      style={{ padding: isMobileCell ? '32px 24px' : '56px 40px', borderLeft: !isMobileCell && idx > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none', borderTop: isMobileCell && idx > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none', display: 'flex', flexDirection: 'column', gap: 0, cursor: 'default', transition: 'background 0.2s', background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>0{idx + 1}</span>
        <span style={{ fontFamily: FF, fontSize: 28, fontWeight: 900, color: GOLD, lineHeight: 1, letterSpacing: '-0.02em' }}>{crit.percentage}</span>
      </div>
      <div style={{ width: hovered ? '100%' : 28, height: 1, background: hovered ? 'rgba(239,191,4,0.6)' : 'rgba(239,191,4,0.3)', marginBottom: 20, transition: 'width 0.5s ease' }} />
      <h4 style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3, marginBottom: 14 }}>{crit.title}</h4>
      <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, flex: 1 }}>{crit.desc}</p>
    </div>
  );
}

// ── BewerbungswegeSection ─────────────────────────────────────────────────────

const INSTITUTIONEN = [
  'Senatoren und Mitglieder der Verbandsgruppe „Wir Eigentümerunternehmer"',
  'Bundesverband Deutscher Mittelstand (BM)',
  'Europäisches Wirtschaftsforum (EWIF)',
  'Union Mittelständischer Unternehmen (UMU)',
  'HAM – Hochschule für angewandtes Management und deren Regionalpartner',
  'Mitglieder des Wirtschaftsbeirates Bayern',
  'Ehemalige Preisträger des Bayerischen Mittelstandspreises',
];

function BewerbungswegeSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: CREAM, position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
      <MunichSkylineBg />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '48px 24px 32px' : '80px 80px 56px', borderBottom: '1px solid #D0D5DD' }}>
        <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Bewerbung 2026</span>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 48, alignItems: 'flex-end' }}>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.03, margin: 0 }}>
            HIER KÖNNEN SIE SICH<br />BEWERBEN ODER EIN<br />UNTERNEHMEN VORSCHLAGEN.
          </h2>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.55)', lineHeight: 1.8, margin: 0 }}>
            Als Unternehmen haben Sie zwei Möglichkeiten: Sie werden von einem unterstützenden Partner oder einer Institution vorgeschlagen — oder Sie ergreifen selbst die Initiative und füllen unsere Anmeldung aus. Die Teilnahme ist in allen Fällen kostenfrei.
          </p>
        </div>
      </div>

      {/* 3 Wege */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>

        {/* ── Weg A: Vorschlag ── */}
        <div style={{ padding: isMobile ? '32px 24px' : '56px 48px 56px', borderRight: isMobile ? 'none' : '1px solid #D0D5DD', borderBottom: isMobile ? '1px solid #D0D5DD' : 'none', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 44, height: 44, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            <Send size={18} style={{ color: GOLD }} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(16,24,40,0.4)', display: 'block', marginBottom: 10 }}>Weg 01</span>
          <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 8px' }}>
            Vorschlag<br />unterbreiten
          </h3>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)', lineHeight: 1.7, margin: '0 0 32px' }}>
            Durch ehemalige Preisträger, die HAM, Senatoren und den Preis unterstützende Institutionen.
          </p>

          {/* Institution list */}
          <div style={{ borderTop: '1px solid #D0D5DD', flex: 1 }}>
            {INSTITUTIONEN.map((inst, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid #D0D5DD' }}>
                <div style={{ width: 16, height: 16, background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" stroke="#101828" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.65)', lineHeight: 1.55 }}>{inst}</span>
              </div>
            ))}
          </div>

          <a
            href="#bewerben"
            style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '14px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 36, alignSelf: 'flex-start', transition: 'opacity 0.15s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Vorschlag unterbreiten <ArrowRight size={13} />
          </a>
        </div>

        {/* ── Weg B: Initiativbewerbung ── */}
        <div style={{ padding: isMobile ? '32px 24px' : '56px 48px 56px', borderRight: isMobile ? 'none' : '1px solid #D0D5DD', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none', display: 'flex', flexDirection: 'column', background: NAVY }}>
          <div style={{ width: 44, height: 44, background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            <UserCheck size={18} style={{ color: '#101828' }} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 10 }}>Weg 02</span>
          <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 8px' }}>
            Initiativ­bewerbung
          </h3>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: '0 0 32px' }}>
            Für Unternehmer, die selbst die Initiative ergreifen.
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
            {[
              { label: 'Kostenfrei', desc: 'Keine Teilnahmegebühr' },
              { label: 'Eigeninitiative', desc: 'Direkt ohne Intermediär' },
              { label: 'Für Unternehmer', desc: 'Inhabergeführte KMU in Bayern' },
              { label: 'Deadline', desc: '30. Juni 2026' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{item.label}</span>
                <span style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,0.50)' }}>{item.desc}</span>
              </div>
            ))}
          </div>

          <a
            href="#bewerben"
            style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '14px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 36, alignSelf: 'flex-start', transition: 'opacity 0.15s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Jetzt bewerben <ArrowRight size={13} />
          </a>
        </div>

        {/* ── Weg C: Sonderpreis ── */}
        <div style={{ padding: isMobile ? '32px 24px' : '56px 48px 56px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 44, height: 44, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            <Star size={18} style={{ color: GOLD }} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(16,24,40,0.4)', display: 'block', marginBottom: 10 }}>Weg 03 — Sonderpreis</span>
          <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 8px' }}>
            Bavarian<br />Future Award
          </h3>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)', lineHeight: 1.7, margin: '0 0 32px' }}>
            Sonderpreis, initiiert durch die Studierenden der HAM — Hochschule für angewandtes Management.
          </p>

          <div style={{ borderTop: '1px solid #D0D5DD', flex: 1 }}>
            {[
              { label: 'Vorschlag möglich', desc: 'Durch HAM & Partner' },
              { label: 'Selbstbewerbung', desc: 'Direkte Einreichung' },
              { label: 'Initiiert von', desc: 'Studierenden der HAM' },
              { label: 'Kategorie', desc: 'Zukunft & Innovation' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid #D0D5DD' }}>
                <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{item.label}</span>
                <span style={{ fontFamily: FB, fontSize: 15, color: 'rgba(16,24,40,0.45)' }}>{item.desc}</span>
              </div>
            ))}
          </div>

          <a
            href="#bewerben"
            style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '14px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 36, alignSelf: 'flex-start', transition: 'opacity 0.15s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Zum Formular <ArrowRight size={13} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default Participation;
