import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { WINNERS } from '@/data/winners';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';
const NAVY = '#111D55';
const GOLD = '#EFBF04';
const CREAM = '#E4E2E3';

// 8 highlight winners from 2025
const HIGHLIGHTS = WINNERS.filter(w => w.year === 2025).slice(0, 8);

const About: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className="animate-fade-in">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '72vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#060C14' }}>
        <img
          src="/images/saal-leer-atmosphaere.jpg"
          alt="BMP Gala"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Left-to-right dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'linear-gradient(to top, rgba(2,9,48,0.95) 0%, rgba(2,9,48,0.72) 38%, rgba(2,9,48,0.22) 72%, transparent 100%)' : 'linear-gradient(to right, #020930 0%, rgba(2,9,48,0.90) 38%, rgba(2,9,48,0.18) 65%, transparent 100%)' }} />
        {/* Gold accent line */}
        <div style={{ position: 'absolute', top: 0, left: 80, width: 2, height: '100%', background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, opacity: 0.4 }} />
        {/* Gold bottom line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.3), transparent)', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 24px 48px' : '0 80px 80px', maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 40, height: 2, background: GOLD }} />
            <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EFBF04' }}>
              Bayerischer Mittelstandspreis
            </span>
          </div>
          <h1 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.6rem, 6vw, 5rem)' : 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 28px' }}>
            WERTE, DIE<br />
            <span style={{ color: GOLD }}>BAYERN BEWEGEN</span>
          </h1>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 560, margin: '0 0 40px', fontWeight: 300 }}>
            Seit 2005 ehrt der BMP herausragende Leistungen im bayerischen Mittelstand. Entdecken Sie die Geschichte, die Vision und die Menschen dahinter.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link
              to="/teilnahme"
              style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', background: '#111D55', padding: '14px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.15s, color 0.15s', border: '2px solid rgba(255,255,255,0.15)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = '#101828'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111D55'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            >
              Jetzt bewerben <ChevronRight size={16} />
            </Link>
            <Link
              to="/preistraeger"
              style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '14px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.15s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Alle Preisträger <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, display: isMobile ? 'none' : 'flex', borderTop: '1px solid rgba(255,255,255,0.08)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          {[['20+', 'Jahre'], ['0 €', 'Teilnahme'], ['100%', 'Unabhängig']].map(([val, lbl], i) => (
            <div key={i} style={{ padding: '20px 36px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: FF, fontSize: 22, fontWeight: 900, color: GOLD }}>{val}</div>
              <div style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>


      {/* ── 2a. WAS IST DER PREIS? (cream, text left / image right) ─────────── */}
      <section id="was-ist" style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%', minHeight: isMobile ? 'auto' : 580 }}>

          {/* Left – text on cream */}
          <div style={{ background: CREAM, padding: isMobile ? '32px 24px 44px' : '88px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: isMobile ? 2 : 0 }}>
            {!isMobile && (
              <>
                <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 20 }}>Was ist der Preis?</span>
                <h2 style={{ fontFamily: FF, fontSize: 'clamp(2.1rem, 3.4vw, 3.1rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: '0 0 20px' }}>
                  DER BAYERISCHE<br />MITTELSTANDS<wbr />PREIS
                </h2>
              </>
            )}
            <div style={{ width: 36, height: 2, background: GOLD, marginBottom: 28 }} />
            <p style={{ fontFamily: FB, fontSize: 19, color: 'rgba(16,24,40,0.8)', lineHeight: 1.8, maxWidth: 440, marginBottom: 16 }}>
              Seit 2005 ist der BMP eine der bedeutendsten Auszeichnungen für den bayerischen Mittelstand. Vergeben von einer vollständig unabhängigen Expertenjury, ehrt er Unternehmen, die durch Innovation, Nachhaltigkeit und regionale Verwurzelung herausragen.
            </p>
            <p style={{ fontFamily: FB, fontSize: 19, color: 'rgba(16,24,40,0.8)', lineHeight: 1.8, maxWidth: 440, marginBottom: isMobile ? 0 : 44 }}>
              Entstanden aus einer Initiative bayerischer Wirtschaftsvertreter, ehrt der Preis heute jährlich die Leuchttürme unserer Wirtschaft.
            </p>
            {/* Key facts – moved above the copy on mobile */}
            <div style={{ display: 'flex', order: isMobile ? -1 : 0, borderTop: isMobile ? 'none' : '1px solid #D0D5DD', borderBottom: isMobile ? '1px solid #D0D5DD' : 'none', marginBottom: isMobile ? 26 : 0 }}>
              {[
                { val: '2005', label: 'Gegründet' },
                { val: '0 €', label: 'Teilnahmegebühr' },
                { val: '5', label: 'Jury-Schritte' },
              ].map((f, i) => (
                <div key={i} style={{ flex: 1, padding: '20px 0', borderRight: i < 2 ? '1px solid #D0D5DD' : 'none', paddingLeft: 0, paddingRight: i < 2 ? 20 : 0 }}>
                  <div style={{ fontFamily: FF, fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 900, color: '#101828', letterSpacing: '-0.03em', lineHeight: 1 }}>{f.val}</div>
                  <div style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: 6 }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – full-bleed image (+ heading on mobile) */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 280 : undefined, order: isMobile ? 1 : 0 }}>
            <img
              src="/images/preistraeger-gruppe.jpg"
              alt="BMP Gala Preisverleihung"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: isMobile
              ? 'linear-gradient(to top, rgba(3,9,58,0.94) 0%, rgba(3,9,58,0.55) 38%, rgba(3,9,58,0.12) 72%, transparent 100%), linear-gradient(to right, rgba(3,9,58,0.5) 0%, transparent 55%)'
              : `linear-gradient(to right, ${CREAM} 0%, transparent 25%), linear-gradient(to top, rgba(3,9,58,0.75) 0%, transparent 60%)` }} />
            {/* Heading overlay – mobile only */}
            {isMobile && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 24px 24px', zIndex: 2 }}>
                <span style={{ fontFamily: FF, fontSize: 10, color: '#8FBEEC', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 12 }}>Was ist der Preis?</span>
                <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.9rem, 8vw, 2.6rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: 0, textShadow: '0 2px 18px rgba(3,9,58,0.6)' }}>
                  DER BAYERISCHE<br />MITTELSTANDS<wbr />PREIS
                </h2>
              </div>
            )}
            {/* Decorative label – desktop only */}
            {!isMobile && (
              <div style={{ position: 'absolute', bottom: 36, left: 36 }}>
                <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>BMP Preisverleihung · München</div>
                <div style={{ width: 28, height: 2, background: GOLD }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 2b. BEDEUTUNG FÜR DEN MITTELSTAND (navy, image left / text right) ── */}
      <section id="mittelstand" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '45% 55%', minHeight: isMobile ? 'auto' : 580 }}>

          {/* Left – full-bleed image (+ heading on mobile) */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 280 : undefined }}>
            <img
              src="/images/networking-innenhof.jpg"
              alt="Bayerischer Mittelstand"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: isMobile
              ? 'linear-gradient(to top, rgba(3,9,58,0.94) 0%, rgba(3,9,58,0.55) 38%, rgba(3,9,58,0.12) 72%, transparent 100%), linear-gradient(to right, rgba(3,9,58,0.5) 0%, transparent 55%)'
              : `linear-gradient(to left, ${NAVY} 0%, transparent 30%)` }} />
            {!isMobile && (
              <div style={{ position: 'absolute', top: 36, left: 36 }}>
                <div style={{ width: 2, height: 40, background: GOLD }} />
              </div>
            )}
            {/* Heading overlay – mobile only */}
            {isMobile && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 24px 24px', zIndex: 2 }}>
                <span style={{ fontFamily: FF, fontSize: 10, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 12 }}>Relevanz &amp; Zielsetzung</span>
                <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.9rem, 8vw, 2.6rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: 0, textShadow: '0 2px 18px rgba(3,9,58,0.6)' }}>
                  BEDEUTUNG FÜR<br />DEN MITTELSTAND
                </h2>
              </div>
            )}
          </div>

          {/* Right – text on navy */}
          <div style={{ background: NAVY, padding: isMobile ? '32px 24px 40px' : '88px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {!isMobile && (
              <>
                <span style={{ fontFamily: FF, fontSize: 10, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 20 }}>Relevanz &amp; Zielsetzung</span>
                <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3.2vw, 2.9rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: '0 0 20px' }}>
                  BEDEUTUNG FÜR<br />DEN MITTELSTAND
                </h2>
              </>
            )}
            <div style={{ width: 36, height: 2, background: GOLD, marginBottom: 28 }} />
            <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 440, marginBottom: 16 }}>
              Der Bayerische Mittelstandspreis ist weit mehr als eine Trophäe. Seit seiner Gründung im Jahr 2005 verfolgt er das Ziel, die Vielfalt und Leistungsstärke bayerischer Familienunternehmen und KMU sichtbar zu machen.
            </p>
            <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
              In einer globalisierten Welt sind es diese Unternehmen, die für Stabilität, Innovation und soziale Verantwortung stehen. Der BMP macht sie sichtbar.
            </p>
          </div>
        </div>
      </section>


      {/* ── 3. PREISTRÄGER-HIGHLIGHTS ─────────────────────────────────────────── */}
      <section style={{ background: '#111D55' }}>
        {/* Section header */}
        <div style={{ padding: isMobile ? '48px 24px 32px' : '72px 80px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 16 : 0, justifyContent: 'space-between', maxWidth: 1600, margin: '0 auto' }}>
          <div>
            <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EFBF04', display: 'block', marginBottom: 12 }}>Preisträger-Highlights</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
              AUSGEZEICHNETE 2025
            </h2>
          </div>
          <Link
            to="/preistraeger"
            style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 4, borderBottom: `1px solid ${GOLD}`, whiteSpace: 'nowrap' }}
          >
            Alle Preisträger <ChevronRight size={14} />
          </Link>
        </div>

        {/* 4-col photo grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? undefined : 'repeat(4, 1fr)',
          gridAutoFlow: isMobile ? 'column' : undefined,
          gridTemplateRows: isMobile ? 'repeat(2, 1fr)' : undefined,
          gridAutoColumns: isMobile ? '66vw' : undefined,
          overflowX: isMobile ? 'auto' : undefined,
          scrollSnapType: isMobile ? 'x mandatory' : undefined,
          gap: isMobile ? 8 : 0,
          padding: isMobile ? '0 16px 8px' : 0,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}>
          {HIGHLIGHTS.map(w => <HighlightCard key={w.id} winner={w} />)}
        </div>
      </section>


      {/* ── 4. TESTIMONIALS ──────────────────────────────────────────────────── */}
      <TestimonialsSection />


      {/* ── 5. GESCHICHTE & ZIELSETZUNG ──────────────────────────────────────── */}
      <section id="geschichte" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : 700 }}>

          {/* LEFT – navy, timeline */}
          <div style={{ background: NAVY, padding: isMobile ? '56px 24px' : '88px 80px', position: 'relative', overflow: 'hidden' }}>
            {/* Ghost "20" watermark – desktop only */}
            {!isMobile && <div style={{ position: 'absolute', right: -24, bottom: -40, fontFamily: FF, fontSize: 'clamp(160px, 20vw, 240px)', fontWeight: 900, color: 'rgba(239,191,4,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>20</div>}

            <span style={{ fontFamily: FF, fontSize: 10, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Geschichte &amp; Meilensteine</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 52px' }}>
              20 JAHRE<br /><span style={{ color: GOLD }}>MITTELSTANDS</span><wbr />EXZELLENZ
            </h2>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              {/* Vertical gold line */}
              <div style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 2, background: `linear-gradient(to bottom, ${GOLD}, rgba(239,191,4,0.15))` }} />

              {[
                { year: '2005', title: 'Gründung', desc: 'Initiative bayerischer Wirtschaftsvertreter zur Stärkung des Mittelstands.' },
                { year: '2010', title: 'Erste mediale Partnerschaft', desc: 'Kooperation mit bayernweiten TV- und Printmedien.' },
                { year: '2015', title: '100 Preisträger', desc: 'Jubiläum: 100 ausgezeichnete Unternehmen seit der ersten Verleihung.' },
                { year: '2020', title: 'Digital-Transformation', desc: 'Erweiterung um digitale Bewerbungsprozesse und Online-Formate.' },
                { year: '2025', title: 'Jubiläumsjahr', desc: '20 Jahre BMP: stärker, sichtbarer und vernetzter denn je.' },
                { year: '2026', title: 'Bavarian Future Award', desc: 'Ergänzung des Portfolios um den Bavarian Future Award mit Fokus auf zukunftsweisende Unternehmen.' },
              ].map((item, i, arr) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < arr.length - 1 ? 32 : 0 }}>
                  {/* Gold dot */}
                  <div style={{ position: 'absolute', left: -34, top: 7, width: 10, height: 10, background: GOLD, outline: `3px solid ${NAVY}`, outlineOffset: 1, transform: 'rotate(45deg)' }} />
                  <div style={{ fontFamily: FF, fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', fontWeight: 900, color: GOLD, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>{item.title}</div>
                  <div style={{ fontFamily: FB, fontSize: 16, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – cream, Zielsetzung */}
          <div style={{ background: '#EFE5E3', padding: isMobile ? '56px 24px' : '88px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Zielsetzung</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 900, color: NAVY, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 40px' }}>
              WOFÜR WIR<br />STEHEN
            </h2>

            <div>
              {[
                { n: '01', title: 'Sichtbarkeit', desc: 'Die Vielfalt und Leistungsstärke des bayerischen Mittelstands in der Öffentlichkeit sichtbar machen.' },
                { n: '02', title: 'Netzwerk', desc: 'Branchenübergreifende Verbindungen zwischen herausragenden Unternehmen und Entscheidern schaffen.' },
                { n: '03', title: 'Werte', desc: 'Wertebasierte Führung, nachhaltige Unternehmenskultur und gesellschaftliche Verantwortung fördern.' },
                { n: '04', title: 'Arbeitgebermarke', desc: 'Den Mittelstand als attraktiven Arbeitgeber stärken und Talente für Bayern gewinnen.' },
                { n: '05', title: 'Resilienz', desc: 'Die Widerstandsfähigkeit bayerischer Unternehmen würdigen, die auch in unsicheren Zeiten Stabilität und Verantwortung beweisen.' },
              ].map((item, i, arr) => (
                <div
                  key={i}
                  style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 0', borderTop: '1px solid rgba(17,29,85,0.1)', borderBottom: i === arr.length - 1 ? '1px solid rgba(17,29,85,0.1)' : 'none', cursor: 'default' }}
                >
                  <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', paddingTop: 3, flexShrink: 0, minWidth: 24 }}>{item.n}</span>
                  <div>
                    <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 800, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{item.title}</div>
                    <div style={{ fontFamily: FB, fontSize: 16, color: 'rgba(17,29,85,0.5)', lineHeight: 1.75 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VORTEILE & WERTE ──────────────────────────────────────────────── */}
      <section id="vorteile" style={{ background: CREAM, position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
        <MunichSkylineBg />
        {/* Header */}
        <div style={{ padding: isMobile ? '48px 24px 32px' : '88px 80px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40, alignItems: 'flex-end', borderBottom: '1px solid #D0D5DD' }}>
          <div>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Vorteile &amp; Werte</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3.2vw, 2.9rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: 0 }}>
              WARUM DER<br />BMP ZÄHLT
            </h2>
          </div>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)', lineHeight: 1.8, margin: 0, maxWidth: 440 }}>
            Drei Dimensionen, die den Unterschied machen: für Ihr Unternehmen, Ihre Mitarbeitenden und Ihren Marktauftritt.
          </p>
        </div>

        {/* Editorial rows – no cards, pure typography */}
        {[
          {
            num: '01',
            title: 'Exzellenz-Siegel',
          },
          {
            num: '02',
            title: 'Partner-Netzwerk',
          },
          {
            num: '03',
            title: 'Reichweite',
          },
        ].map((item, i, arr) => (
          <ValueRow key={i} item={item} last={i === arr.length - 1} />
        ))}
      </section>


      {/* ── 5. CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY, padding: isMobile ? '48px 24px' : '100px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Gold decorative lines */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, opacity: 0.15 }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.6 }} />
            <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EFBF04' }}>Starten Sie Ihre Reise</span>
            <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.6 }} />
          </div>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, margin: '0 0 24px' }}>
            SCHREIBEN AUCH SIE GESCHICHTE
          </h2>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
            Werden Sie Teil der Wall of Fame des bayerischen Mittelstands. Die Teilnahmegebühr beträgt 0 EUR und die Teilnahme lohnt sich in jeder Phase.
          </p>
          <Link
            to="/teilnahme"
            style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#101828', background: GOLD, padding: '16px 40px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'background 0.15s, box-shadow 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            Jetzt kostenlos bewerben <ChevronRight size={16} />
          </Link>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginRight: 8 }}>Oder:</span>
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
      </section>

    </div>
  );
};

// ── HighlightCard ─────────────────────────────────────────────────────────────

function HighlightCard({ winner }: { winner: import('@/data/winners').Winner }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  return (
    <Link
      to={`/preistraeger/${winner.slug}`}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', height: isMobile ? 220 : 280, overflow: 'hidden', scrollSnapAlign: isMobile ? 'start' : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={winner.img}
        alt={winner.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.07)' : 'scale(1)', filter: 'grayscale(15%)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
          <Star size={10} style={{ color: GOLD, flexShrink: 0 }} fill={GOLD} />
          <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {winner.year} · {winner.type}
          </span>
        </div>
        <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 3px', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {winner.name}
        </h3>
        <p style={{ fontFamily: FF, fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, letterSpacing: '0.03em' }}>
          {winner.category}
        </p>
      </div>
      {/* hover pill */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, background: GOLD, color: '#101828', padding: '6px 14px', borderRadius: 999, fontSize: 10, fontFamily: FF, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.25s' }}>
        Detail →
      </div>
    </Link>
  );
}

// ── ValueRow ──────────────────────────────────────────────────────────────────

function ValueRow({ item, last }: { item: { num: string; title: string }; last: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isMobileRow = useIsMobile();
  return (
    <div
      style={{
        display: 'grid', gridTemplateColumns: isMobileRow ? '1fr' : '120px 1fr', gap: isMobileRow ? '16px 0' : '0 48px',
        padding: isMobileRow ? '32px 24px' : '48px 80px',
        borderBottom: last ? 'none' : '1px solid #D0D5DD',
        background: hovered ? '#EAE7E6' : 'transparent',
        transition: 'background 0.2s', cursor: 'default',
        alignItems: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left: number */}
      <div>
        <div style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 900, color: hovered ? GOLD : 'rgba(16,24,40,0.1)', lineHeight: 1, letterSpacing: '-0.04em', transition: 'color 0.2s' }}>{item.num}</div>
      </div>
      {/* Right: title (short label only) */}
      <div>
        <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>{item.title}</h3>
      </div>
    </div>
  );
}

export default About;
