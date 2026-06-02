import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, TrendingUp, Play, ChevronRight, Building2, ShieldCheck, Leaf, HeartHandshake, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PartnerTicker } from '@/components/ui/partner-ticker';
import { WINNERS } from '@/data/winners';
import BewerbungsForm from '@/components/forms/BewerbungsForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';

const PARTNERS = [
  { id: 'rsm', label: <><span style={{fontWeight:700,fontSize:11,letterSpacing:2}}>RSM</span><br/><span style={{fontWeight:300,fontSize:8,letterSpacing:1,opacity:.7}}>Ebner Stolz</span></> },
  { id: 'wwk', label: <span style={{fontWeight:800,fontSize: 15,letterSpacing:3}}>WWK</span> },
  { id: 'db', label: <span style={{fontWeight:700,fontSize:10,letterSpacing:1.5}}>Deutsche Bank</span> },
  { id: 'bio', label: <span style={{fontFamily:'Georgia,serif',fontSize: 14,letterSpacing:.5}}>Bionorica</span> },
  { id: 'bcl', label: <span style={{fontWeight:700,fontSize:9,letterSpacing:1.5,lineHeight:1.3,textAlign:'center' as const,display:'block'}}>Berchtesgadener<br/>Land</span> },
  { id: 'mtz', label: <span style={{fontFamily:'Georgia,serif',fontStyle:'italic',fontSize: 14}}>Metzler</span> },
  { id: 'vbw', label: <span style={{fontWeight:800,fontSize: 14,letterSpacing:2}}>vbw</span> },
  { id: 'wby', label: <span style={{fontWeight:700,fontSize:9,letterSpacing:1,lineHeight:1.3,textAlign:'center' as const,display:'block'}}>Wirtschafts-<br/>beirat Bayern</span> },
  { id: 'rgong', label: <span style={{fontWeight:700,fontSize:9,letterSpacing:1}}>Radio Gong 96.3</span> },
  { id: 'mtvr', label: <span style={{fontWeight:700,fontSize:10,letterSpacing:1.5}}>münchen.tv</span> },
  { id: 'ews', label: <span style={{fontWeight:800,fontSize: 14,letterSpacing:2}}>EWS</span> },
];

const FF = '"IBM Plex Sans", sans-serif';

// ─── Status Phase Slider ────────────────────────────────────────────────────
/**
 * 🔧 DEPLOYMENT CONFIG
 * Setze ACTIVE_PHASE je nach aktuellem Stand des BMP-Zyklus:
 *   0 = Bewerbungsphase offen
 *   1 = Auswertungsphase (Jury bewertet)
 *   2 = Nach der Preisverleihung (Erfolg)
 */
const ACTIVE_PHASE: 0 | 1 | 2 = 0;

interface StatusPhase {
  num: string;
  tag: string;
  pulse: boolean;
  phase: string;
  headline: string;
  body: string;
  cta: { label: string; to: string } | null;
  accent: string;
  bg: string;
  glow: string;
  meta: string;
}

const STATUS_PHASES: StatusPhase[] = [
  {
    num: '01',
    tag: 'JETZT OFFEN',
    pulse: true,
    phase: 'Bewerbungsphase 2026',
    headline: 'BEWERBEN SIE SICH JETZT.',
    body: 'Die Bewerbungsphase 2026 ist eröffnet — es ist noch nicht zu spät. Reichen Sie Ihre Unterlagen bis zum 30. Juni kostenlos ein und zeigen Sie, was den bayerischen Mittelstand ausmacht.',
    cta: { label: 'Jetzt kostenlos bewerben', to: '/teilnahme' },
    accent: '#EFBF04',
    bg: '#020A1E',
    glow: 'rgba(239,191,4,0.14)',
    meta: 'Deadline: 30. Juni 2026',
  },
  {
    num: '02',
    tag: 'IN AUSWERTUNG',
    pulse: true,
    phase: 'Auswertungsphase 2026',
    headline: 'DIE JURY BEWERTET GERADE.',
    body: 'Die Anmeldephase 2026 ist geschlossen. Unsere unabhängige Expertenjury aus Wirtschaft, Wissenschaft und Gesellschaft sichtet und bewertet derzeit alle Einreichungen.',
    cta: null,
    accent: '#4A8FC9',
    bg: '#060D1C',
    glow: 'rgba(74,143,201,0.12)',
    meta: 'Ergebnis: August 2026',
  },
  {
    num: '03',
    tag: 'ABGESCHLOSSEN',
    pulse: false,
    phase: 'Preisverleihung · Oktober 2026',
    headline: 'DER BMP 2026 WAR EIN ERFOLG.',
    body: 'Wir danken allen 247 Bewerberinnen und Bewerbern für Mut und Exzellenz. Drei außergewöhnliche Unternehmen wurden in München ausgezeichnet — ein unvergesslicher Abend.',
    cta: { label: 'Alle Preisträger ansehen', to: '/preistraeger' },
    accent: '#EFBF04',
    bg: '#06090F',
    glow: 'rgba(239,191,4,0.08)',
    meta: 'Gala · Oktober 2026 · München',
  },
];

function HomeWinnerCard({ winner }: { winner: import('@/data/winners').Winner }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/preistraeger/${winner.slug}`}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', height: 280, overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={winner.img} alt={winner.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.07)' : 'scale(1)', filter: 'grayscale(15%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
          <Star size={10} style={{ color: '#EFBF04', flexShrink: 0 }} fill="#EFBF04" />
          <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, fontWeight: 700, color: '#EFBF04', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{winner.year} · {winner.type}</span>
        </div>
        <h3 style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 3px', lineHeight: 1.3 }}>{winner.name}</h3>
        <p style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{winner.category}</p>
        <div style={{ marginTop: 10, display: 'inline-block', background: '#EFBF04', color: '#101828', padding: '5px 14px', borderRadius: 999, fontSize: 10, fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.25s' }}>
          Detail →
        </div>
      </div>
    </Link>
  );
}

const Home: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden" style={{ background: '#111D55', height: isMobile ? '100svh' : '100vh' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/gala-saal-overview.jpg"
            alt="Awards Gala"
            className="w-full h-full object-cover scale-105"
            style={{ objectPosition: 'center top' }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #111D55 0%, rgba(17,29,85,0.90) 38%, rgba(17,29,85,0.18) 65%, transparent 100%)' }}></div>
        </div>

        <div className="container mx-auto relative z-10" style={{ padding: isMobile ? '0 24px' : '0 24px' }}>
          <div style={{ maxWidth: isMobile ? '100%' : '48rem' }}>
            <div className="inline-flex items-center gap-3 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">Bewerbungsphase 2026 Eröffnet</span>
            </div>
            
            <h1 className="font-display font-bold text-white mb-6 leading-[0.9] tracking-tight" style={{ fontSize: isMobile ? 'clamp(1.8rem, 10vw, 3rem)' : 'clamp(3.5rem, 8vw, 6rem)' }}>
              BAYERNS BESTE <br />
              <span className="text-accent">MITTELSTÄNDLER.</span>
            </h1>
            
            <p className="text-white/70 mb-12 font-light leading-relaxed" style={{ fontSize: isMobile ? '1.0625rem' : '1.375rem', maxWidth: isMobile ? '100%' : '36rem' }}>
              Der Bayerische Mittelstandspreis würdigt herausragende Leistungen – von Innovation über Nachhaltigkeit bis hin zur Exzellenz.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Link
                to="/teilnahme"
                style={{ fontFamily:'"IBM Plex Sans", sans-serif', fontSize: 16, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#101828', background:'#EFBF04', padding:'16px 36px', textDecoration:'none', display:'inline-flex', alignItems:'center', justifyContent: isMobile ? 'center' : 'flex-start', gap:10, transition:'background 0.15s, box-shadow 0.2s', width: isMobile ? '100%' : 'auto' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EFBF04'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                Jetzt kostenlos bewerben <ChevronRight size={16} />
              </Link>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 16, alignItems: isMobile ? 'stretch' : 'center' }}>
              <Link
                to="/mitglied-werden"
                style={{ fontFamily:'"IBM Plex Sans", sans-serif', fontSize: 16, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.85)', border:'1.5px solid rgba(255,255,255,0.35)', padding:'14px 32px', textDecoration:'none', display:'inline-flex', alignItems:'center', justifyContent: isMobile ? 'center' : 'flex-start', gap:10, transition:'border-color 0.15s, color 0.15s', background:'transparent', width: isMobile ? '100%' : 'auto' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#EFBF04'; (e.currentTarget as HTMLElement).style.color = '#EFBF04'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'; }}
              >
                Mitglied werden
              </Link>
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-4 text-white hover:text-accent transition-colors group"
                style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}
              >
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <Play size={20} fill="currentColor" />
                </div>
                <span className="uppercase text-xs tracking-widest font-bold">Film abspielen</span>
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-xl border-t border-white/10 hidden lg:block">
          <div className="px-8 py-5 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Left: label — stays put */}
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', flexShrink: 0 }}>Unsere Partner</span>
            {/* Right: ticker — fixed window, exactly 4 logos wide */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: 560, overflow: 'hidden', flexShrink: 0 }}>
                <PartnerTicker logos={PARTNERS} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schnell-Check Section */}
      <section style={{ overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%' }}>
          {/* Left (desktop) / Bottom (mobile) — text */}
          <div style={{ background: '#E4E2E3', padding: isMobile ? '36px 24px 48px' : '80px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: isMobile ? 2 : 0 }}>
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Schnell-Check</span>
            <h2 style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 20px' }}>
              SIND SIE<br />BERECHTIGT?
            </h2>
            <div style={{ width: 40, height: 2, background: '#EFBF04', marginBottom: 28 }} />
            <p style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 17, color: 'rgba(16,24,40,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
              Der Bayerische Mittelstandspreis richtet sich an inhabergeführte KMU im Freistaat. Vier Kriterien entscheiden — erfüllen Sie alle vier, steht Ihrer Bewerbung nichts im Weg.
            </p>
            {/* Criteria list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 36, borderTop: '1px solid #D0D5DD' }}>
              {[
                { label: 'Standort Bayern', desc: 'Sitz oder Betriebsstätte im Freistaat' },
                { label: '10–500 Mitarbeiter', desc: 'Klassischer Mittelstand' },
                { label: 'Min. 3 Geschäftsjahre', desc: 'Markterfahrung und Stabilität' },
                { label: 'Privatwirtschaft', desc: 'Kein staatlicher Träger' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: '1px solid #D0D5DD' }}>
                  <div style={{ width: 24, height: 24, background: '#111D55', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1,5 3.5,7.5 9,2" stroke="#EFBF04" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#101828' }}>{item.label}</div>
                    <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 14, color: 'rgba(16,24,40,0.5)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/teilnahme"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#101828', background: '#EFBF04', padding: '15px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, alignSelf: isMobile ? 'stretch' : 'flex-start', transition: 'background 0.15s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EFBF04'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Ihr Weg zum Preis <ChevronRight size={14} />
            </Link>
          </div>

          {/* Right (desktop) / Top (mobile) — full-bleed image */}
          <div style={{ position: 'relative', minHeight: isMobile ? 230 : 560, overflow: 'hidden', order: isMobile ? 1 : 0 }}>
            <img
              src="/images/buehne-gewinner.jpg"
              alt="Preisverleihung Bühne"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
            />
            {/* Fade: into the text bg — downward on mobile, leftward on desktop */}
            <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'linear-gradient(to bottom, transparent 45%, #E4E2E3 100%)' : 'linear-gradient(to left, transparent 40%, #E4E2E3 100%)' }} />
            {/* Gold accent line — bottom edge */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, rgba(239,191,4,0.2), #EFBF04, rgba(239,191,4,0.2))' }} />
          </div>
        </div>
      </section>

      {/* Intro Section — editorial split, no radius, no floating badge */}
      <section style={{ overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '45% 55%' }}>
          {/* Left — full-bleed image with stats overlay */}
          <div style={{ position: 'relative', minHeight: isMobile ? 300 : 600, overflow: 'hidden' }}>
            <img
              src="/images/preistraeger-jubel.jpg"
              alt="BMP Auszeichnung"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, #fff 100%), linear-gradient(to top, rgba(3,9,58,0.82) 0%, rgba(3,9,58,0.50) 60%, transparent 100%)' }} />
            {/* Stats bottom-left */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '24px 24px' : '32px 40px', background: 'linear-gradient(to top, rgba(3,9,58,0.88) 0%, transparent 100%)', display: 'flex', gap: isMobile ? 20 : 36 }}>
              {[['20+', 'Jahre Exzellenz'], ['0 €', 'Teilnahmegebühr'], ['100%', 'Unabhängig']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 28, fontWeight: 900, color: '#EFBF04', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — editorial text */}
          <div style={{ background: '#fff', padding: isMobile ? '48px 24px' : '80px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Ein Gewinn für alle</span>
            <h2 style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 20px' }}>
              AUSZEICHNUNG<br />FÜR DIE BESTEN.
            </h2>
            <div style={{ width: 40, height: 2, background: '#EFBF04', marginBottom: 28 }} />
            <blockquote style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 18, fontStyle: 'italic', color: '#101828', lineHeight: 1.65, borderLeft: '3px solid #EFBF04', paddingLeft: 20, margin: '0 0 24px' }}>
              "Ein Unternehmen zu gründen erfordert nicht allein spezielle Fähigkeiten. Es erfordert Persönlichkeit!"
            </blockquote>
            <p style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 17, color: 'rgba(16,24,40,0.6)', lineHeight: 1.75, margin: '0 0 36px' }}>
              Wir suchen Vorbilder, die sich trotz aller Risiken nicht scheuen, Visionen in Businesspläne und Ideen in Unternehmungen zu verwandeln. Seit vielen Jahren würdigen wir herausragende unternehmerische Leistungen im Freistaat.
            </p>
            <Link
              to="/der-bmp"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#101828', background: '#EFBF04', padding: '14px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, alignSelf: isMobile ? 'stretch' : 'flex-start', transition: 'background 0.15s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EFBF04'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Mehr über den Preis <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Status Phase Slider */}
      <StatusSlider />

      {/* Winners Grid — neue Preisträger-Übersicht */}
      <section style={{ background: '#111D55' }}>
        <div style={{ padding: isMobile ? '48px 24px 32px' : '72px 80px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: isMobile ? 16 : 0 }}>
          <div>
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#EFBF04', display: 'block', marginBottom: 12 }}>Success Stories</span>
            <h2 style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
              PREISTRÄGER DER HERZEN.
            </h2>
          </div>
          <Link
            to="/preistraeger"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EFBF04', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 4, borderBottom: '1px solid #EFBF04', whiteSpace: 'nowrap' }}
          >
            Alle Preisträger <ChevronRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0 }}>
          {WINNERS.filter(w => w.year === 2025).slice(0, 8).map(w => (
            <HomeWinnerCard key={w.id} winner={w} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />


      {/* Benefits Section — editorial split */}
      <section style={{ overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%', minHeight: isMobile ? 'auto' : 560 }}>

          {/* Left — text on cream */}
          <div style={{ background: '#E4E2E3', padding: isMobile ? '48px 24px' : '80px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: 16 }}>Mehr als nur ein Preis</span>
            <h2 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.2rem)' : 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 48px' }}>
              WARUM SICH DIE<br />TEILNAHME LOHNT.
            </h2>

            {/* Numbered rows — no cards, no shadows */}
            <div style={{ borderTop: '1px solid #D0D5DD' }}>
              {[
                { num: '01', title: 'Netzwerk', desc: 'Direkter Zugang zu Entscheidern aus Staatsregierung, Wirtschaft und Wissenschaft.' },
                { num: '02', title: 'Sichtbarkeit', desc: 'Breite mediale Begleitung durch TV-, Radio- und Print-Partner bayernweit.' },
                { num: '03', title: 'Bestätigung', desc: 'Ein unabhängiger Qualitätsnachweis — das stärkste Siegel für Ihren Marktauftritt.' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0 20px', padding: '24px 0', borderBottom: '1px solid #D0D5DD', cursor: 'default', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#EAE7E6')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, color: '#EFBF04', letterSpacing: '0.1em', paddingTop: 2 }}>{item.num}</span>
                  <div>
                    <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 700, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>{item.title}</div>
                    <div style={{ fontFamily: FF, fontSize: 16, color: 'rgba(16,24,40,0.55)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — full-bleed photo */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 240 : 'auto', display: isMobile ? 'block' : 'block' }}>
            <img
              src="/images/networking-innenhof.jpg"
              alt="BMP Gala Netzwerk"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #E4E2E3 0%, transparent 30%), linear-gradient(to top, rgba(3,9,58,0.82) 0%, transparent 50%)' }} />
            {/* Bottom-left label */}
            <div style={{ position: 'absolute', bottom: 40, left: 40 }}>
              <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#EFBF04', marginBottom: 6 }}>BMP Gala-Netzwerk</div>
              <div style={{ width: 32, height: 2, background: '#EFBF04' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — with embedded form */}
      <section style={{ background: '#111D55', position: 'relative', overflow: 'hidden', height: isMobile ? 'auto' : 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }} id="bewerben">
        {/* Subtle radial glow behind left copy */}
        <div style={{ position: 'absolute', left: -120, top: '50%', transform: 'translateY(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,26,135,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '4fr 1px 8fr', position: 'relative', flex: isMobile ? 'none' : 1, minHeight: 0, overflow: 'hidden' }}>

          {/* Left — pitch copy */}
          <div style={{ padding: isMobile ? '32px 24px 24px' : '36px 36px 32px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.36em', fontWeight: 700, display: 'block', marginBottom: 16, opacity: 0.8 }}>Chance ergreifen</span>
            <h2 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.6rem)' : 'clamp(1.8rem, 2.8vw, 2.6rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 16 }}>
              SCHREIBEN<br />AUCH SIE<br />GESCHICHTE.
            </h2>
            <div style={{ width: 32, height: 2, background: '#EFBF04', marginBottom: 20 }} />
            <p style={{ fontFamily: FF, fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
              Werden Sie Teil der Wall of Fame des bayerischen Mittelstands — vollständig kostenfrei.
            </p>

            {/* Benefit rows */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { num: '01', label: 'Kostenfrei',   desc: 'Ohne Teilnahmegebühr' },
                { num: '02', label: 'Jury',          desc: 'Unabhängige Experten' },
                { num: '03', label: 'Sichtbarkeit', desc: 'Medial bayernweit' },
                { num: '04', label: 'Gala',          desc: 'Verleihung München' },
              ].map(item => (
                <div key={item.num} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0 14px', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                  <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, color: 'rgba(239,191,4,0.55)', letterSpacing: '0.1em' }}>{item.num}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: FF, fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</span>
                    <span style={{ fontFamily: FF, fontSize: 14, color: 'rgba(255,255,255,0.45)', textAlign: 'right' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          {!isMobile && <div style={{ background: 'rgba(255,255,255,0.07)' }} />}

          {/* Right — gold premium panel */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, position: 'relative', background: 'linear-gradient(160deg,#DDB84A 0%,#C9A227 52%,#A87800 100%)' }}>

            {/* Premium award crosshatch pattern */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
              <defs>
                <pattern id="bmpCross" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L18,18 M18,0 L0,18" stroke="rgba(17,29,85,0.055)" strokeWidth="0.65" />
                </pattern>
                {/* Corner-mark diamond accent */}
                <pattern id="bmpDiamond" width="36" height="36" patternUnits="userSpaceOnUse">
                  <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="rgba(17,29,85,0.045)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bmpCross)" />
              <rect width="100%" height="100%" fill="url(#bmpDiamond)" />
            </svg>

            {/* Inner vignette — edges slightly deeper gold */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(100,70,0,0.25) 100%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Award ceremony photo */}
            {!isMobile && (
              <div style={{ height: 220, position: 'relative', overflow: 'hidden', flexShrink: 0, zIndex: 1 }}>
                <img
                  src="/images/preisuebergabe.jpg"
                  alt="Preisverleihung Bayerischer Mittelstandspreis"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'sepia(0.18) brightness(0.92)' }}
                />
                {/* Blend photo into gold panel */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(168,120,0,0.1) 0%, rgba(168,120,0,0.25) 50%, rgba(168,120,0,0.92) 88%, #A87800 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(17,29,85,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 14, left: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(17,29,85,0.7)' }} />
                  <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(17,29,85,0.75)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Preisverleihung 2025</span>
                </div>
              </div>
            )}

            {/* Form area */}
            <div style={{ padding: isMobile ? '32px 24px' : '24px 48px 32px 40px', flex: isMobile ? 'none' : 1, height: isMobile ? '82svh' : undefined, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', zIndex: 1 }}>
              <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(17,29,85,0.5)', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 8 }}>Direktbewerbung 2026</span>
              <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 900, color: '#111D55', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }}>Kostenlos bewerben</h3>
              <BewerbungsForm theme="gold" />
            </div>
          </div>

        </div>

        {/* Footnote row */}
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '16px 24px 20px' : '14px 56px 18px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <span style={{ fontFamily: FF, fontSize: 15, color: 'rgba(255,255,255,0.45)', marginRight: isMobile ? 6 : 10 }}>Kostenlos und unverbindlich —</span>
          <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: 'rgba(239,191,4,0.8)' }}>keine Teilnahmegebühr</span>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.25), transparent)', flexShrink: 0 }} />
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6 bg-opacity-95">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-6xl aspect-video bg-white/5 rounded-3xl overflow-hidden flex items-center justify-center relative">
            <div className="text-center">
              <Play size={80} className="text-accent mx-auto mb-6 opacity-40" />
              <p className="text-white/40 uppercase tracking-widest text-sm">Video-Player Platzhalter</p>
              <p className="text-white/60 mt-4 text-xs italic font-body">Hier würde das Image-Video des BMP geladen werden.</p>
              <Button onClick={() => setShowVideo(false)} className="mt-8" variant="outline">Schließen</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── StatusSlider ─────────────────────────────────────────────────────────────

function StatusSlider() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<number>(ACTIVE_PHASE);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const lastDelta = useRef(0);

  // Swipe hint on mount: peek next slide briefly, then bounce back
  useEffect(() => {
    const peek = setTimeout(() => setDragOffset(-Math.round(window.innerWidth * 0.11)), 900);
    const back = setTimeout(() => setDragOffset(0), 1700);
    return () => { clearTimeout(peek); clearTimeout(back); };
  }, []);

  const goTo = (i: number) => setActive(Math.max(0, Math.min(STATUS_PHASES.length - 1, i)));

  const onStart = (x: number) => { startX.current = x; lastDelta.current = 0; setIsDragging(true); };
  const onMove  = (x: number) => {
    if (startX.current === null) return;
    const d = x - startX.current;
    lastDelta.current = d;
    setDragOffset(d);
  };
  const onEnd = () => {
    if (startX.current === null) return;
    const d = lastDelta.current;
    startX.current = null;
    setIsDragging(false);
    setDragOffset(0);
    if (d < -60 && active < STATUS_PHASES.length - 1) goTo(active + 1);
    else if (d > 60 && active > 0) goTo(active - 1);
  };

  const curPhase = STATUS_PHASES[active];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: isMobile ? 'auto' : 480,
        minHeight: isMobile ? 360 : 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={e => onStart(e.clientX)}
      onMouseMove={e => onMove(e.clientX)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={e => onStart(e.touches[0].clientX)}
      onTouchMove={e => onMove(e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      {/* Track */}
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: `${STATUS_PHASES.length * 100}vw`,
          transform: `translateX(calc(${-active * 100}vw + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.62s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
      >
        {STATUS_PHASES.map(phase => (
          <StatusSlideCard key={phase.num} phase={phase} isMobile={isMobile} />
        ))}
      </div>

      {/* Dots */}
      <div
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}
        onMouseDown={e => e.stopPropagation()}
      >
        {STATUS_PHASES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? 32 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? curPhase.accent : 'rgba(255,255,255,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        ))}
      </div>

      {/* Prev arrow */}
      {active > 0 && (
        <button
          onMouseDown={e => e.stopPropagation()}
          onClick={() => goTo(active - 1)}
          style={{ position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 22, lineHeight: 1, transition: 'background 0.2s' }}
        >‹</button>
      )}

      {/* Next arrow */}
      {active < STATUS_PHASES.length - 1 && (
        <button
          onMouseDown={e => e.stopPropagation()}
          onClick={() => goTo(active + 1)}
          style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 22, lineHeight: 1, transition: 'background 0.2s' }}
        >›</button>
      )}
    </section>
  );
}

// ─── StatusSlideCard ──────────────────────────────────────────────────────────

function StatusSlideCard({ phase, isMobile }: { phase: StatusPhase; isMobile: boolean }) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        position: 'relative',
        background: phase.bg,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
      }}
    >

      {/* Left content */}
      <div style={{ padding: isMobile ? '48px 24px' : '52px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1, gap: isMobile ? 24 : 0 }}>

        {/* Status badge + phase label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${phase.accent}18`, border: `1px solid ${phase.accent}35`, borderRadius: 999, padding: '5px 14px' }}>
            {phase.pulse && <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: phase.accent, display: 'inline-block' }} />}
            <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: phase.accent }}>{phase.tag}</span>
          </div>
          <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{phase.phase}</span>
        </div>

        {/* Headline + body + CTA */}
        <div>
          <h2 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.6rem)' : 'clamp(2.4rem, 3.8vw, 3.8rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 0.94, margin: '0 0 24px' }}>
            {phase.headline}
          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, marginBottom: 32, maxWidth: 520 }}>
            {phase.body}
          </p>
          {phase.cta ? (
            <Link
              to={phase.cta.to}
              onMouseDown={e => e.stopPropagation()}
              style={{ fontFamily: FF, fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#101828', background: phase.accent, padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'opacity 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              {phase.cta.label} <ChevronRight size={14} />
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Kein Handlungsbedarf</span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 20, height: 1, background: phase.accent, opacity: 0.35 }} />
          <span style={{ fontFamily: FF, fontSize: 10, color: `${phase.accent}70`, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{phase.meta}</span>
        </div>
      </div>

      {/* Right visual panel */}
      {!isMobile && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 36, padding: '52px 48px', position: 'relative', zIndex: 1, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        {phase.num !== '03' ? (
          /* Concentric rings for active phases */
          <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {([0, 20, 44] as const).map((inset, i) => (
              <div key={inset} style={{ position: 'absolute', inset, borderRadius: '50%', border: `1px solid ${phase.accent}${['12', '25', '45'][i]}` }} />
            ))}
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: `${phase.accent}15`, border: `1px solid ${phase.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 900, color: phase.accent, letterSpacing: '0.05em' }}>{phase.num}</span>
            </div>
          </div>
        ) : (
          /* Success stats */
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: FF, fontSize: 68, fontWeight: 900, color: phase.accent, lineHeight: 1, opacity: 0.9 }}>247</div>
            <div style={{ fontFamily: FF, fontSize: 8, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginTop: 4, marginBottom: 20 }}>Bewerbungen</div>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)', margin: '0 auto 20px' }} />
            <div style={{ fontFamily: FF, fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1 }}>3</div>
            <div style={{ fontFamily: FF, fontSize: 8, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginTop: 4 }}>Preisträger</div>
          </div>
        )}

        {/* Membership CTA — for active phases only */}
        {phase.num !== '03' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', margin: '0 auto 20px' }} />
            <Link
              to="/mitglied-werden"
              onMouseDown={e => e.stopPropagation()}
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: phase.accent,
                border: `1.5px solid ${phase.accent}55`,
                background: 'transparent',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 22px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = phase.accent;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${phase.accent}55`;
              }}
            >
              Mitglied werden <ChevronRight size={13} />
            </Link>
          </div>
        )}
      </div>}
    </div>
  );
}

export default Home;
