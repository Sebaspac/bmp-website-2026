import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useIsMobile } from '@/hooks/useIsMobile';

interface LayoutProps { children: React.ReactNode; }

/* ── SVG icons ─────────────────────────────────────────── */
const IgIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
const LiIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const FbIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
const SOCIAL = [
  { href:'https://instagram.com', Icon:IgIcon, label:'Instagram' },
  { href:'https://linkedin.com',  Icon:LiIcon, label:'LinkedIn'  },
  { href:'https://facebook.com',  Icon:FbIcon, label:'Facebook'  },
];

/* ── Nav data ──────────────────────────────────────────── */
interface NavItem {
  key: string; label: string; path: string;
  subLabel?: string;
  sub?: { label: string; path: string }[];
}
const NAV: NavItem[] = [
  {
    key: 'preistraeger', label: 'Preisträger:innen', path: '/preistraeger',
    subLabel: 'PREISTRÄGER:INNEN',
    sub: [
      { label: 'Alle Preisträger:innen',      path: '/preistraeger' },
      { label: 'Sieger & Aufsteiger 2025',    path: '/preistraeger' },
      { label: 'Preisträger 2024',            path: '/preistraeger' },
      { label: 'Preisträger 2023',            path: '/preistraeger' },
      { label: 'Preisträger-Detail →',        path: '/preistraeger' },
    ],
  },
  {
    key: 'teilnahme', label: 'Ihr Weg zum Preis', path: '/teilnahme',
    subLabel: 'IHR WEG ZUM PREIS',
    sub: [
      { label: 'Die 4 Schritte zum Preis',    path: '/teilnahme#schritte' },
      { label: 'Teilnahmevoraussetzungen',    path: '/teilnahme#voraussetzungen' },
      { label: 'Kriterien & Bewertung',       path: '/teilnahme#kriterien' },
      { label: 'Vorschlag unterbreiten',      path: '/teilnahme#bewerben' },
      { label: 'Fristen & Termine',           path: '/teilnahme#fristen' },
      { label: 'Bewerbungsformular',          path: '/teilnahme#bewerben' },
    ],
  },
  {
    key: 'bmp', label: 'Der BMP', path: '/der-bmp',
    subLabel: 'DER BMP',
    sub: [
      { label: 'Was ist der Preis?',          path: '/der-bmp#was-ist' },
      { label: 'Geschichte & Werte',          path: '/der-bmp#geschichte' },
      { label: 'Vorteile der Auszeichnung',   path: '/der-bmp#vorteile' },
      { label: 'Bayerischer Mittelstand',     path: '/der-bmp#mittelstand' },
      { label: 'Jetzt bewerben →',            path: '/teilnahme' },
    ],
  },
  {
    key: 'netzwerk', label: 'Netzwerk', path: '/netzwerk',
    subLabel: 'NETZWERK',
    sub: [
      { label: 'Das Netzwerk',                path: '/netzwerk' },
      { label: 'Jury-Mitglieder',             path: '/netzwerk#jury' },
      { label: 'Partner & Sponsoren',         path: '/netzwerk#partner' },
      { label: 'Schirmherrschaft',            path: '/netzwerk#schirmherrschaft' },
      { label: 'Mitglied werden',             path: '/mitglied-werden' },
      { label: 'Sponsoring-Anfrage →',        path: '/netzwerk#sponsoring' },
    ],
  },
  {
    key: 'presse', label: 'Presse', path: '/presse',
    subLabel: 'PRESSE',
    sub: [
      { label: 'Aktuelles & News',            path: '/presse' },
      { label: 'Events & Gala',               path: '/presse#events' },
      { label: 'Downloads & Impressionen',    path: '/presse#downloads' },
      { label: 'Pressekontakt →',             path: '/kontakt' },
    ],
  },
];

const SECONDARY = [
  { label:'Startseite',  path:'/' },
  { label:'Kontakt',     path:'/kontakt' },
  { label:'Impressum',   path:'/impressum' },
  { label:'Datenschutz', path:'/datenschutz' },
];

/* ── Tokens ────────────────────────────────────────────── */
const NAVY   = '#111D55';
const ANTHRA = '#1A2030';   // nav + footer shared bg
const GOLD = '#EFBF04';
const MUTED = '#D0D5DD';
const SEP  = 'rgba(239,191,4,0.2)';
const LINE = 'rgba(239,191,4,0.35)';
const FF_DISPLAY = '"IBM Plex Sans", sans-serif';
const FF_BODY    = '"Inter", sans-serif';

/* ── SocialLink helper ─────────────────────────────────── */
const SocialLink: React.FC<{ href:string; Icon:()=>JSX.Element; label:string }> = ({ href, Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    style={{ color:MUTED, display:'flex', textDecoration:'none', transition:'color .2s' }}
    onMouseEnter={e=>(e.currentTarget.style.color=GOLD)}
    onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}
  ><Icon /></a>
);


/* ── Component ──────────────────────────────────────────── */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen]        = useState(false);            // desktop overlay
  const [activeKey, setActive] = useState<string | null>(null); // desktop hover subnav
  const [mobileOpen, setMobileOpen] = useState(false);      // mobile sidebar overlay
  const [expandKey, setExpand] = useState<string | null>(null); // mobile accordion
  const [lang, setLang]        = useState<'DE'|'EN'>('DE');
  const [mounted, setMounted]  = useState(false);
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') return false;
    sessionStorage.removeItem('bmp-intro-seen');
    return true;
  });
  const [formVisible, setFormVisible] = useState(false);
  const location               = useLocation();
  const firstLinkRef           = useRef<HTMLAnchorElement>(null);
  const isLegalPage            = ['/impressum', '/datenschutz'].includes(location.pathname);
  const isMobile               = useIsMobile();

  // Close everything on route change
  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
    setExpand(null);
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Reset mobile accordion when its overlay closes
  useEffect(() => {
    if (!mobileOpen) setTimeout(() => setExpand(null), 220);
  }, [mobileOpen]);

  // Body scroll lock (either overlay)
  useEffect(() => {
    const anyOpen = open || mobileOpen;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (anyOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = open ? `${scrollbarWidth}px` : '';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      setTimeout(() => setActive(null), 220);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open, mobileOpen]);

  // Focus first desktop nav link on open
  useEffect(() => {
    if (open) setTimeout(() => firstLinkRef.current?.focus(), 300);
  }, [open]);

  // Escape closes either overlay
  useEffect(() => {
    const h = (e:KeyboardEvent) => {
      if (e.key === 'Escape') { if (open) setOpen(false); if (mobileOpen) setMobileOpen(false); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, mobileOpen]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Hide floating CTA when the form section (#bewerben) is in view — homepage only
  useEffect(() => {
    setFormVisible(false);
    if (location.pathname !== '/') return;
    const el = document.getElementById('bewerben');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [location.pathname]);

  return (
    <div
      style={{ paddingTop: isMobile ? 0 : 60, paddingLeft: isMobile ? 60 : 0 }}
      className="min-h-screen flex flex-col bg-background text-foreground font-body"
    >
      {showLoader && <LoadingScreen onDone={() => setShowLoader(false)} />}

      {/* ── GLOBAL BAYERN CSS ────────────────────────── */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #060C14; }
        ::-webkit-scrollbar-thumb { background: #051A87; }
        ::-webkit-scrollbar-thumb:hover { background: #03126B; }
        * { scrollbar-width: thin; scrollbar-color: #051A87 #060C14; }
        ::selection { background: #051A87; color: #fff; }
      `}</style>


      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ══  DESKTOP CHROME (≥768px) — original top bar + overlay  ══ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <>
          {/* ── TOP BAR ──────────────────────────────────── */}
          <header style={{
            position:'fixed', top:0, left:0, right:0, height:60,
            background:ANTHRA, borderBottom:`1px solid ${LINE}`,
            display:'flex', alignItems:'center',
            zIndex:400, userSelect:'none',
            transform: mounted ? 'translateY(0)' : 'translateY(-100%)',
            transition:'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}>

            {/* LEFT — logo */}
            <div style={{ flex:1, display:'flex', alignItems:'center', padding:'0 24px', height:'100%', borderRight:`1px solid ${LINE}` }}>
              <Link to="/" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
                <img
                  src="/bmp-logo.png"
                  alt="Der Bayerische Mittelstandspreis 2026"
                  style={{ height:38, width:'auto', display:'block', objectFit:'contain' }}
                />
              </Link>
            </div>

            {/* CENTER — hamburger */}
            <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', height:'100%', borderRight:`1px solid ${LINE}`, gap:16 }}>
              <span style={{ fontSize:8, color:'rgba(5,26,135,0.5)', letterSpacing:2, userSelect:'none' }}>◆</span>
              <button
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-label="Navigation öffnen"
                style={{ display:'flex', alignItems:'center', gap:14, background:'none', border:'none', cursor:'pointer', padding:'8px 16px' }}
              >
                <div style={{ width:20, height:15, position:'relative' }}>
                  <span style={{ position:'absolute', top:0, left:0, width:'100%', height:1.5, background:MUTED, transformOrigin:'center', transition:'transform .3s ease, opacity .3s ease', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
                  <span style={{ position:'absolute', top:'50%', left:0, width:'100%', height:1.5, background:MUTED, marginTop:'-0.75px', transition:'opacity .3s', opacity: open ? 0 : 1 }} />
                  <span style={{ position:'absolute', bottom:0, left:0, width:'100%', height:1.5, background:MUTED, transformOrigin:'center', transition:'transform .3s ease', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
                </div>
                <span style={{ fontSize:9, fontWeight:600, textTransform:'uppercase', letterSpacing:'.22em', color:MUTED, lineHeight:1, fontFamily:FF_DISPLAY }}>Menü</span>
              </button>
              <span style={{ fontSize:8, color:'rgba(5,26,135,0.5)', letterSpacing:2, userSelect:'none' }}>◆</span>
            </div>

            {/* RIGHT — social + lang */}
            <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'flex-end', gap:20, padding:'0 28px', height:'100%' }}>
              <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                {SOCIAL.map(s => <SocialLink key={s.label} {...s} />)}
              </div>
              <div style={{ width:1, height:20, background:'rgba(239,191,4,0.3)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {(['DE','EN'] as const).map((l, i) => (
                  <React.Fragment key={l}>
                    {i===1 && <span style={{ color:'rgba(239,191,4,.35)', fontSize: 14 }}>|</span>}
                    <button
                      onClick={() => setLang(l)}
                      style={{ fontSize:10, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', background:'none', border:'none', cursor:'pointer', padding:'1px 0', lineHeight:1, color:lang===l ? GOLD : MUTED, transition:'color .2s', fontFamily:FF_DISPLAY }}
                      onMouseEnter={e => { if (lang !== l) e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { if (lang !== l) e.currentTarget.style.color = MUTED; }}
                    >{l}</button>
                  </React.Fragment>
                ))}
              </div>
            </div>

          </header>

          {/* ── DESKTOP OVERLAY ──────────────────────────── */}
          <div role="dialog" aria-modal="true" aria-label="Navigation"
            style={{
              position:'fixed', top:60, left:0, right:0, bottom:0,
              background:ANTHRA, zIndex:300,
              display:'flex', flexDirection:'column',
              opacity: open ? 1 : 0,
              pointerEvents: open ? 'all' : 'none',
              transition:`opacity ${open ? '.28s' : '.2s'} ease`,
            }}
          >
            <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

              {/* TOP — tagline + logo */}
              <div style={{ flex:'1 1 50%', display:'flex', alignItems:'flex-end', padding:'0 80px 48px', position:'relative', minHeight:0, zIndex:1 }}>
                <div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.4)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12, fontFamily:FF_DISPLAY }}>
                    Bayerischer Mittelstandspreis
                  </div>
                  <div style={{ fontSize:'clamp(42px,6.5vw,88px)', fontWeight:900, color:'#fff', textTransform:'uppercase', lineHeight:.95, letterSpacing:'-.01em', fontFamily:FF_DISPLAY }}>
                    EXZELLENZ HAT<br/>EINEN NAMEN.
                  </div>
                </div>
                <div style={{ position:'absolute', top:48, right:80 }}>
                  <img src="/bmp-logo.png" alt="BMP Logo" style={{ height:40, width:'auto', display:'block', opacity:0.9 }} />
                </div>
              </div>

              {/* BOTTOM — 3 columns */}
              <div style={{
                flex:'0 0 auto',
                display:'grid', gridTemplateColumns:'1fr 1.4fr 1fr',
                borderTop:`1px solid ${SEP}`,
              }}>

                {/* LEFT — main nav */}
                <div style={{ borderRight:`1px solid ${SEP}`, padding:'40px 0 40px 60px' }}>
                  <ul style={{ listStyle:'none' }}>
                    {NAV.map((item, idx) => (
                      <li key={item.key} style={{ borderTop:`1px solid ${SEP}` }}>
                        <Link
                          ref={idx===0 ? firstLinkRef : undefined}
                          to={item.path}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setActive(item.key)}
                          style={{
                            display:'flex', alignItems:'center', justifyContent:'space-between',
                            padding:'14px 40px 14px 0',
                            textDecoration:'none',
                            color: activeKey===item.key ? GOLD : '#fff',
                            fontSize:'clamp(15px,1.4vw,20px)',
                            fontFamily:FF_DISPLAY,
                            fontWeight:600, textTransform:'uppercase', letterSpacing:'.03em',
                            transition:'color .15s, transform .15s, opacity .3s ease-out',
                            transform: open
                              ? `translateX(${activeKey===item.key ? 6 : 0}px)`
                              : 'translateX(-16px)',
                            opacity: open ? 1 : 0,
                            transitionDelay: open ? `${.04 + idx*.06}s` : '0s',
                          }}
                        >
                          {item.label}
                          <span style={{ color:GOLD, fontSize:'1.15em', marginLeft:10, flexShrink:0 }}>›</span>
                        </Link>
                      </li>
                    ))}
                    <li style={{ borderTop:`1px solid ${SEP}` }} />
                  </ul>
                </div>

                {/* MIDDLE — subnav */}
                <div style={{ borderRight:`1px solid ${SEP}`, padding:'40px 48px', position:'relative', minHeight:440 }}>
                  {NAV.map(item => (
                    <div key={item.key} style={{
                      position: 'absolute',
                      top: 40,
                      left: 48,
                      right: 48,
                      opacity: activeKey===item.key ? 1 : 0,
                      transform: activeKey===item.key ? 'translateY(0)' : 'translateY(8px)',
                      transition:'opacity .2s ease, transform .2s ease',
                      pointerEvents: activeKey===item.key ? 'all' : 'none',
                    }}>
                      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.22em', color:'#009EE0', marginBottom:16, fontFamily:FF_DISPLAY }}>
                        Überblick
                      </div>
                      <div style={{ fontSize: 16, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#fff', marginBottom:20, fontFamily:FF_DISPLAY }}>
                        {item.subLabel}
                      </div>
                      <ul style={{ listStyle:'none' }}>
                        {item.sub?.map(sub => (
                          <li key={sub.path} style={{ borderTop:'1px solid rgba(239,191,4,.12)' }}>
                            <Link to={sub.path} onClick={() => setOpen(false)}
                              style={{ display:'block', padding:'9px 0', textDecoration:'none', color:MUTED, fontSize: 16, fontFamily:FF_BODY, transition:'color .15s, padding-left .15s' }}
                              onMouseEnter={e=>{ e.currentTarget.style.color='#fff'; e.currentTarget.style.paddingLeft='8px'; }}
                              onMouseLeave={e=>{ e.currentTarget.style.color=MUTED; e.currentTarget.style.paddingLeft='0'; }}
                            >{sub.label}</Link>
                          </li>
                        ))}
                        <li style={{ borderTop:'1px solid rgba(239,191,4,.12)' }} />
                      </ul>
                    </div>
                  ))}
                </div>

                {/* RIGHT — utilities */}
                <div style={{ padding:'40px 80px 40px 48px', display:'flex', flexDirection:'column', gap:24 }}>

                  <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      {(['DE','EN'] as const).map((l,i) => (
                        <React.Fragment key={l}>
                          {i===1 && <span style={{ color:'rgba(239,191,4,.35)', fontSize: 14 }}>|</span>}
                          <button onClick={() => setLang(l)}
                            style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', background:'none', border:'none', cursor:'pointer', padding:0, color:lang===l ? GOLD : MUTED, transition:'color .2s' }}
                            onMouseEnter={e=>{ if(lang!==l) e.currentTarget.style.color='#fff'; }}
                            onMouseLeave={e=>{ if(lang!==l) e.currentTarget.style.color=MUTED; }}
                          >{l}</button>
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ display:'flex', gap:14 }}>
                      {SOCIAL.map(s => <SocialLink key={s.label} {...s} />)}
                    </div>
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {SECONDARY.map(item => (
                      <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
                        style={{ fontSize: 16, color:MUTED, textDecoration:'none', fontFamily:FF_BODY, transition:'color .15s', width:'fit-content' }}
                        onMouseEnter={e=>(e.currentTarget.style.color=GOLD)}
                        onMouseLeave={e=>(e.currentTarget.style.color=MUTED)}
                      >{item.label}</Link>
                    ))}
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    <Link to="/teilnahme#bewerben" onClick={() => setOpen(false)}
                      style={{ display:'inline-block', background:'#EFBF04', color:'#101828', fontSize: 15, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', padding:'11px 24px', textDecoration:'none', transition:'background .2s, box-shadow .2s', borderRadius:0, fontFamily:FF_DISPLAY }}
                      onMouseEnter={e=>{ e.currentTarget.style.background='#FFD130'; e.currentTarget.style.boxShadow='0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background='#EFBF04'; e.currentTarget.style.boxShadow='none'; }}
                    >Jetzt bewerben</Link>
                    <Link to="/mitglied-werden" onClick={() => setOpen(false)}
                      style={{ display:'inline-block', background:'transparent', color:MUTED, fontSize: 15, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', padding:'10px 24px', textDecoration:'none', transition:'border-color .2s, color .2s', borderRadius:0, fontFamily:FF_DISPLAY, border:'1.5px solid rgba(239,191,4,0.35)' }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor='#EFBF04'; e.currentTarget.style.color='#EFBF04'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(239,191,4,0.35)'; e.currentTarget.style.color=MUTED; }}
                    >Mitglied werden</Link>

                    <div style={{ height:'1px', background:'rgba(239,191,4,0.12)', margin:'4px 0' }} />

                    <Link to="/formular-hochladen" onClick={() => setOpen(false)}
                      style={{
                        display:'flex', alignItems:'center', gap:10,
                        background:'rgba(255,255,255,0.04)',
                        color:'rgba(255,255,255,0.45)',
                        fontSize:11, fontWeight:700,
                        textTransform:'uppercase', letterSpacing:'.14em',
                        padding:'10px 18px',
                        textDecoration:'none',
                        fontFamily:FF_DISPLAY,
                        border:'1px dashed rgba(255,255,255,0.15)',
                        transition:'color .2s, border-color .2s, background .2s',
                      }}
                      onMouseEnter={e=>{
                        e.currentTarget.style.color='#fff';
                        e.currentTarget.style.borderColor='rgba(255,255,255,0.4)';
                        e.currentTarget.style.background='rgba(255,255,255,0.07)';
                      }}
                      onMouseLeave={e=>{
                        e.currentTarget.style.color='rgba(255,255,255,0.45)';
                        e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';
                        e.currentTarget.style.background='rgba(255,255,255,0.04)';
                      }}
                    >
                      <Upload size={12} strokeWidth={2} /> Formular hochladen
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}


      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ══  MOBILE CHROME (<768px) — sidebar + accordion overlay  ══ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {isMobile && (
        <>
          {/* ── SIDEBAR ──────────────────────────────────── */}
          <aside style={{
            position: 'fixed', top: 0, left: 0,
            width: 60, height: '100vh',
            background: ANTHRA,
            zIndex: 400,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '16px 0',
            userSelect: 'none',
            borderRight: `1px solid ${LINE}`,
            transform: mounted ? 'translateX(0)' : 'translateX(-60px)',
            transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}>
            {/* Logo */}
            <Link to="/" style={{ display:'flex', flexDirection:'column', alignItems:'center', textDecoration:'none', flexShrink:0, gap:2 }}>
              <span style={{ fontSize:13, fontWeight:900, letterSpacing:'.06em', color:GOLD, fontFamily:FF_DISPLAY, lineHeight:1 }}>BMP</span>
              <span style={{ fontSize:5.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(239,191,4,.45)', textAlign:'center', lineHeight:1.6, fontFamily:FF_DISPLAY }}>
                BAY.<br/>MITTEL<br/>STANDS<br/>PREIS
              </span>
            </Link>

            {/* Gold vertical line */}
            <div style={{ width:1, background:LINE, margin:'14px 0', flex:1, minHeight:30, maxHeight:'calc(100% - 230px)' }} />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Navigation schließen' : 'Navigation öffnen'}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7, background:'none', border:'none', cursor:'pointer', padding:'8px 0', flexShrink:0 }}
            >
              <div style={{ display:'flex', flexDirection:'column', gap:4.5, width:20 }}>
                <span style={{ display:'block', height:1.5, background:MUTED, transformOrigin:'center', transition:'transform .3s ease, opacity .3s ease', transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
                <span style={{ display:'block', height:1.5, background:MUTED, transition:'opacity .3s', opacity: mobileOpen ? 0 : 1 }} />
                <span style={{ display:'block', height:1.5, background:MUTED, transformOrigin:'center', transition:'transform .3s ease', transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
              </div>
              <span style={{ fontSize:8, fontWeight:600, textTransform:'uppercase', letterSpacing:'.18em', color:MUTED, lineHeight:1, fontFamily:FF_DISPLAY, transition:'opacity .25s', opacity: mobileOpen ? 0 : 1 }}>Menü</span>
            </button>

            {/* Social icons */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, marginTop:'auto', flexShrink:0 }}>
              {SOCIAL.map(s => <SocialLink key={s.label} {...s} />)}
            </div>

            {/* Lang switcher */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, marginTop:14, flexShrink:0 }}>
              {(['DE','EN'] as const).map((l, i) => (
                <React.Fragment key={l}>
                  {i === 1 && <div style={{ width:1, height:9, background:LINE }} />}
                  <button
                    onClick={() => setLang(l)}
                    style={{ fontSize:10, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', background:'none', border:'none', cursor:'pointer', color:lang===l ? GOLD : MUTED, padding:'1px 0', lineHeight:1, transition:'color .2s', fontFamily:FF_DISPLAY }}
                  >{l}</button>
                </React.Fragment>
              ))}
            </div>
          </aside>

          {/* ── MOBILE OVERLAY (accordion) ───────────────── */}
          <div role="dialog" aria-modal="true" aria-label="Navigation"
            style={{
              position: 'fixed', inset: 0,
              background: ANTHRA,
              zIndex: 500,
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? 'all' : 'none',
              transition: `opacity ${mobileOpen ? '.28s' : '.2s'} ease`,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Top bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:60, borderBottom:`1px solid ${SEP}`, flexShrink:0 }}>
              <Link to="/" onClick={() => setMobileOpen(false)} style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
                <img src="/bmp-logo.png" alt="BMP Logo" style={{ height:32, width:'auto', display:'block', objectFit:'contain' }} />
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Menü schließen"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', minWidth:44, minHeight:44, background:'none', border:'none', cursor:'pointer', padding:8 }}>
                <div style={{ width:28, height:28, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ position:'absolute', width:20, height:1.5, background:MUTED, transform:'rotate(45deg)' }} />
                  <span style={{ position:'absolute', width:20, height:1.5, background:MUTED, transform:'rotate(-45deg)' }} />
                </div>
              </button>
            </div>

            {/* Scrollable nav */}
            <nav style={{ flex:1, overflowY:'auto', padding:'4px 0' }}>
              <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                {NAV.map((item) => (
                  <li key={item.key} style={{ borderTop:`1px solid ${SEP}` }}>
                    <button
                      onClick={() => setExpand(k => k === item.key ? null : item.key)}
                      style={{
                        display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%',
                        padding:'14px 20px',
                        background:'none', border:'none', cursor:'pointer',
                        color: expandKey === item.key ? GOLD : '#fff',
                        fontSize:17, fontFamily:FF_DISPLAY, fontWeight:600, textTransform:'uppercase', letterSpacing:'.03em',
                        textAlign:'left', minHeight:44,
                      }}
                    >
                      <span>{item.label}</span>
                      <span style={{ color:GOLD, fontSize:'1.1em', transition:'transform .22s', display:'inline-block', transform: expandKey === item.key ? 'rotate(90deg)' : 'none' }}>›</span>
                    </button>
                    <div style={{
                      overflow:'hidden',
                      maxHeight: expandKey === item.key ? 460 : 0,
                      transition:'max-height .28s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      {item.sub && (
                        <div style={{ padding:'4px 20px 14px 28px', borderTop:`1px solid rgba(239,191,4,.1)` }}>
                          <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.22em', color:'#009EE0', marginBottom:10, fontFamily:FF_DISPLAY }}>{item.subLabel}</div>
                          <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                            {item.sub.map(sub => (
                              <li key={sub.path} style={{ borderTop:'1px solid rgba(239,191,4,.1)' }}>
                                <Link to={sub.path} onClick={() => setMobileOpen(false)}
                                  style={{ display:'flex', alignItems:'center', padding:'10px 0', textDecoration:'none', color:MUTED, fontSize:14, fontFamily:FF_BODY, minHeight:44 }}
                                >{sub.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
                <li style={{ borderTop:`1px solid ${SEP}` }} />
              </ul>

              {/* CTAs */}
              <div style={{ padding:'20px 20px 12px', display:'flex', flexDirection:'column', gap:10 }}>
                <Link to="/teilnahme#bewerben" onClick={() => setMobileOpen(false)}
                  style={{ display:'block', background:GOLD, color:'#101828', fontSize:14, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', padding:'13px 22px', textDecoration:'none', fontFamily:FF_DISPLAY, textAlign:'center' }}
                >Jetzt bewerben</Link>
                <Link to="/mitglied-werden" onClick={() => setMobileOpen(false)}
                  style={{ display:'block', background:'transparent', color:MUTED, fontSize:14, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', padding:'12px 22px', textDecoration:'none', fontFamily:FF_DISPLAY, border:`1.5px solid rgba(239,191,4,0.35)`, textAlign:'center' }}
                >Mitglied werden</Link>
                <Link to="/formular-hochladen" onClick={() => setMobileOpen(false)}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.14em', padding:'12px 22px', textDecoration:'none', fontFamily:FF_DISPLAY, border:'1px dashed rgba(255,255,255,0.2)', textAlign:'center' }}
                ><Upload size={12} strokeWidth={2} /> Formular hochladen</Link>
              </div>

              {/* Secondary links */}
              <div style={{ padding:'0 20px 16px', display:'flex', flexWrap:'wrap', gap:'4px 8px' }}>
                {SECONDARY.map(item => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                    style={{ display:'inline-flex', alignItems:'center', minHeight:44, padding:'0 8px', fontSize:13, color:MUTED, textDecoration:'none', fontFamily:FF_BODY }}
                  >{item.label}</Link>
                ))}
              </div>

              {/* Social */}
              <div style={{ padding:'16px 20px', borderTop:`1px solid ${SEP}`, display:'flex', gap:20 }}>
                {SOCIAL.map(s => <SocialLink key={s.label} {...s} />)}
              </div>
            </nav>
          </div>
        </>
      )}


      {/* ── FLOATING CTA ─────────────────────────────── */}
      {location.pathname === '/' && !formVisible && (
        <Link
          to="/teilnahme"
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 300,
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#111D55', color: '#fff',
            fontFamily: FF_DISPLAY, fontSize: 14, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            padding: '14px 22px', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(3,9,58,0.5)',
            transform: mounted ? 'translateY(0)' : 'translateY(80px)',
            opacity: mounted ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s, opacity 0.4s ease 0.6s, background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EFBF04'; (e.currentTarget as HTMLElement).style.color = '#101828'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111D55'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
        >
          Jetzt bewerben <ArrowRight size={13} />
        </Link>
      )}

      {/* ── MAIN ─────────────────────────────────────── */}
      <main className="flex-1" style={!isLegalPage ? { borderTop: '2px solid #111D55' } : {}}>{children}</main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{
        background: '#1A2030',
        borderTop: `4px solid ${GOLD}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Radial glow top-left */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse 600px 300px at 0% 0%, rgba(239,191,4,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* ── EDITORIAL HEADLINE BAND ── */}
        <div style={{
          position: 'relative',
          padding: isMobile ? '28px 24px 16px' : '36px 64px 0',
        }}>
          <h2 style={{
            fontFamily: FF_DISPLAY,
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
            whiteSpace: isMobile ? 'normal' : 'nowrap',
          }}>
            Der Preis des <span style={{ color: GOLD }}>Bayerischen</span> Mittelstands
          </h2>

          {/* Gold rule beneath headline */}
          <div style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{ width: 36, height: 1, background: GOLD }} />
            <span style={{
              fontFamily: FF_DISPLAY,
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              color: 'rgba(239,191,4,0.55)',
            }}>Exzellenz seit 2005</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(239,191,4,0.18)' }} />
          </div>
        </div>

        {/* ── MAIN BODY: asymmetric layout ── */}
        <div style={{
          position: 'relative',
          padding: isMobile ? '24px 24px' : '24px 64px 20px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 40 : 0,
          alignItems: 'flex-start',
        }}>

          {/* Decorative year — desktop only */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: 52,
              top: -28,
              fontFamily: FF_DISPLAY,
              fontWeight: 900,
              fontSize: 160,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(239,191,4,0.1)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}>2026</div>
          )}

          {/* ── LEFT COLUMN: copy + CTAs ── */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            flex: isMobile ? 'none' : '0 0 420px',
            maxWidth: isMobile ? '100%' : 420,
          }}>
            {/* Logo */}
            <img
              src="/bmp-logo.png"
              alt="Bayerischer Mittelstandspreis"
              style={{ width: 140, height: 'auto', marginBottom: 10, opacity: 0.9 }}
            />

            <p style={{
              fontFamily: FF_BODY,
              fontSize: 15,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 16px 0',
              maxWidth: 300,
            }}>
              Die renommierteste Auszeichnung für herausragende Unternehmen des bayerischen Mittelstands.
            </p>

            {/* CTA stack */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 8,
            }}>
              <Link
                to="/teilnahme#bewerben"
                style={{
                  fontFamily: FF_DISPLAY,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#101828',
                  background: GOLD,
                  padding: '10px 22px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  borderRadius: 2,
                  transition: 'background 0.15s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FFD130';
                  e.currentTarget.style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >Kostenlos bewerben</Link>

              <Link
                to="/mitglied-werden"
                style={{
                  fontFamily: FF_DISPLAY,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: MUTED,
                  border: '1.5px solid rgba(239,191,4,0.35)',
                  padding: '8px 22px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  borderRadius: 2,
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.color = GOLD;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(239,191,4,0.35)';
                  e.currentTarget.style.color = MUTED;
                }}
              >Mitglied werden</Link>

              <Link
                to="/netzwerk#sponsoring"
                style={{
                  fontFamily: FF_DISPLAY,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none',
                  paddingTop: 4,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
              >Sponsoring-Anfrage →</Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: nav links ── */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            alignItems: 'flex-start',
            gap: isMobile ? 32 : 0,
            paddingLeft: isMobile ? 0 : 64,
          }}>

            {/* Nav pair container with gold vertical separator */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 32 : 0,
              alignItems: 'flex-start',
            }}>

              {/* BMP 2026 column */}
              <div style={{ minWidth: isMobile ? 'auto' : 160 }}>
                <p style={{
                  fontFamily: FF_DISPLAY,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.3)',
                  margin: '0 0 10px 0',
                }}>BMP 2026</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { l: 'Startseite', p: '/' },
                    { l: 'Preisträger', p: '/preistraeger' },
                    { l: 'Teilnahme', p: '/teilnahme' },
                  ].map(item => (
                    <li key={item.p}>
                      <Link
                        to={item.p}
                        style={{
                          fontFamily: FF_BODY,
                          fontSize: 16,
                          color: 'rgba(255,255,255,0.55)',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                          display: 'inline-block',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                      >{item.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gold vertical separator — desktop only */}
              {!isMobile && (
                <div style={{
                  width: 1,
                  alignSelf: 'stretch',
                  background: 'rgba(239,191,4,0.22)',
                  margin: '0 40px',
                  flexShrink: 0,
                }} />
              )}

              {/* Engagement column */}
              <div style={{ minWidth: isMobile ? 'auto' : 160 }}>
                <p style={{
                  fontFamily: FF_DISPLAY,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.3)',
                  margin: '0 0 10px 0',
                }}>Engagement</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { l: 'Netzwerk & Jury', p: '/netzwerk' },
                    { l: 'Presse', p: '/presse' },
                    { l: 'Kontakt', p: '/kontakt' },
                  ].map(item => (
                    <li key={item.p}>
                      <Link
                        to={item.p}
                        style={{
                          fontFamily: FF_BODY,
                          fontSize: 16,
                          color: 'rgba(255,255,255,0.55)',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                          display: 'inline-block',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                      >{item.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gold vertical separator — desktop only */}
              {!isMobile && (
                <div style={{
                  width: 1,
                  alignSelf: 'stretch',
                  background: 'rgba(239,191,4,0.22)',
                  margin: '0 40px',
                  flexShrink: 0,
                }} />
              )}

              {/* Legal column */}
              <div style={{ minWidth: isMobile ? 'auto' : 120 }}>
                <p style={{
                  fontFamily: FF_DISPLAY,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.3)',
                  margin: '0 0 10px 0',
                }}>Legal</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { l: 'Datenschutz', p: '/datenschutz' },
                    { l: 'Impressum', p: '/impressum' },
                  ].map(item => (
                    <li key={item.p}>
                      <Link
                        to={item.p}
                        style={{
                          fontFamily: FF_BODY,
                          fontSize: 16,
                          color: 'rgba(255,255,255,0.55)',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                          display: 'inline-block',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                      >{item.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* ── PARTNER STRIP ── */}
        <div style={{
          borderTop: '1px solid rgba(239,191,4,0.15)',
          borderBottom: '1px solid rgba(239,191,4,0.15)',
          padding: isMobile ? '20px 24px' : '20px 64px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 16 : 28,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: FF_DISPLAY,
            fontSize: 8,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.32em',
            color: 'rgba(255,255,255,0.22)',
            flexShrink: 0,
          }}>Partner</span>
          <div style={{ width: 1, height: 20, background: 'rgba(239,191,4,0.2)', flexShrink: 0 }} />
          <img
            src="/images/ewif-logo.png"
            alt="EWIF – Europäisches Wirtschaftsforum"
            style={{ height: 32, width: 'auto', opacity: 0.5, filter: 'brightness(2)', display: 'block' }}
          />
          <img
            src="/images/partner-logos.png"
            alt="Hochschule für angewandtes Management · Gipfeldialog Altaussee"
            style={{ height: 32, width: 'auto', opacity: 0.5, filter: 'brightness(2)', display: 'block' }}
          />
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          padding: isMobile ? '20px 24px' : '20px 64px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 16 : 0,
        }}>
          <p style={{
            fontFamily: FF_DISPLAY,
            fontSize: 10,
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}>
            © 2026 Bayerischer Mittelstandspreis · Alle Rechte vorbehalten
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {SOCIAL.map(s => <SocialLink key={s.label} {...s} />)}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Layout;
