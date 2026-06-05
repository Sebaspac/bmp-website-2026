import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KontaktForm from '@/components/forms/KontaktForm';
import { useIsMobile } from '@/hooks/useIsMobile';

const NAVY  = '#111D55';
const GOLD  = '#EFBF04';
const CREAM = '#EFE5E3';
const INK   = '#3A3A3A';

const faqs = [
  {
    q: 'Was kostet die Teilnahme am BMP?',
    a: 'Die Teilnahme am Bayerischen Mittelstandspreis ist für alle Unternehmen vollständig kostenfrei. Wir finanzieren uns durch Partner und Sponsoren, um exzellenten Mittelstand ohne finanzielle Hürden zu fördern.',
  },
  {
    q: 'Nach welchen Kriterien wird bewertet?',
    a: 'Die Bewertung basiert auf vier Säulen: Zukunftsfähigkeit & Innovation, Nachhaltigkeit & Verantwortung, Unternehmenskultur sowie Regionale Verwurzelung. Jede Säule fließt mit 25 % in das Gesamtergebnis ein.',
  },
  {
    q: 'Wie läuft der Bewerbungsprozess ab?',
    a: 'Der Prozess ist mehrstufig: 1. Online-Bewerbung oder Vorschlag, 2. Formale Prüfung & erste Jury-Sichtung, 3. Fach-Audits bei den Finalisten vor Ort, 4. Finale Jury-Sitzung und abschließende Preisverleihung.',
  },
  {
    q: 'Wie lange dauert die Bewerbung?',
    a: 'Dank unseres optimierten Bewerbungsformulars benötigen Sie für die erste Einreichung ca. 30–45 Minuten. Tiefergehende Unterlagen werden erst in der Audit-Phase angefordert.',
  },
];

const deadlines = [
  { step: '01', label: 'Bewerbungsschluss', date: '30. Juni 2026',     desc: 'Letzte Möglichkeit zur Einreichung Ihrer Unterlagen.' },
  { step: '02', label: 'Nominierung',        date: '15. August 2026',  desc: 'Bekanntgabe der Nominierten nach Jury-Sichtung.'       },
  { step: '03', label: 'Preisverleihung',    date: '22. Oktober 2026', desc: 'Festliche Gala in München.'                            },
];

const Contact: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isMobile = useIsMobile();

  return (
    <div style={{ background: CREAM }}>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '68vh', minHeight: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <img
          src="/images/gala-dinner.jpg"
          alt="BMP Gala"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Diagonal overlay */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, ${NAVY} 0%, rgba(3,9,58,0.82) 35%, rgba(3,9,58,0.2) 70%, transparent 100%)` }} />
        {/* Bottom fade to navy contact section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${NAVY}, transparent)` }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingBottom: isMobile ? '3rem' : '5rem', paddingLeft: isMobile ? 24 : 80, paddingRight: isMobile ? 24 : 80 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>
            Dialog & Service
          </p>
          <h1 style={{ fontSize: isMobile ? 'clamp(2rem, 10vw, 3rem)' : 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1.0, color: '#fff', letterSpacing: '-0.03em', marginBottom: 24, maxWidth: 640 }}>
            Wir sind<br />für Sie da.
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.72)', maxWidth: 480, lineHeight: 1.65, fontWeight: 400 }}>
            Fragen zur Bewerbung, zur Gala oder zu Partnermöglichkeiten – unser Team begleitet Sie persönlich.
          </p>
        </div>
      </section>

      {/* ── Contact + Form ─────────────────────────────────────────────── */}
      <section style={{ background: NAVY, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', left: -120, bottom: -120, width: 480, height: 480, borderRadius: '50%', background: 'rgba(5,26,135,0.12)', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '4fr 1px 8fr' }}>

          {/* Left – info panel */}
          <div style={{ padding: isMobile ? '48px 24px' : '88px 56px 88px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              Direktkontakt
            </p>
            <div style={{ width: 36, height: 2, background: GOLD, marginBottom: 20 }} />
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 52 }}>
              Kontakt&shy;möglichkeiten
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { icon: MapPin, title: 'Geschäftsstelle',  lines: ['Maximilianstraße 42', '80538 München'] },
                { icon: Mail,   title: 'E-Mail',           lines: ['info@bmp-bayern.de']                   },
                { icon: Phone,  title: 'Telefon',          lines: ['+49 89 123 456 78']                    },
                { icon: Clock,  title: 'Bürozeiten',       lines: ['Mo – Fr: 09:00 – 17:00 Uhr']           },
              ].map(({ icon: Icon, title, lines }, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={17} color="rgba(255,255,255,0.80)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }}>{title}</div>
                    {lines.map((l, j) => <div key={j} style={{ fontSize: 17, color: '#fff', fontWeight: 500, lineHeight: 1.5 }}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 52, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.40)', lineHeight: 1.65 }}>
                Nächste Preisverleihung: <strong style={{ color: '#fff' }}>22. Oktober 2026</strong>
              </p>
            </div>
          </div>

          {/* Divider */}
          {!isMobile && <div style={{ background: 'rgba(255,255,255,0.07)' }} />}

          {/* Right – gold form panel */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: isMobile ? 'visible' : 'hidden', height: isMobile ? 'auto' : undefined, minHeight: 0, position: 'relative', background: 'linear-gradient(160deg,#DDB84A 0%,#C9A227 52%,#A87800 100%)' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
              <defs>
                <pattern id="kontaktCross" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L18,18 M18,0 L0,18" stroke="rgba(17,29,85,0.055)" strokeWidth="0.65" />
                </pattern>
                <pattern id="kontaktDiamond" width="36" height="36" patternUnits="userSpaceOnUse">
                  <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="rgba(17,29,85,0.045)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#kontaktCross)" />
              <rect width="100%" height="100%" fill="url(#kontaktDiamond)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(100,70,0,0.25) 100%)', pointerEvents: 'none', zIndex: 0 }} />

            {!isMobile && (
              <div style={{ height: 200, position: 'relative', overflow: 'hidden', flexShrink: 0, zIndex: 1 }}>
                <img src="/images/preistraeger-gruppe.jpg" alt="BMP Gala 2025" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'sepia(0.18) brightness(0.92)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(168,120,0,0.1) 0%, rgba(168,120,0,0.25) 50%, rgba(168,120,0,0.92) 88%, #A87800 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(17,29,85,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 14, left: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(17,29,85,0.7)' }} />
                  <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(17,29,85,0.75)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Gala 2025 München</span>
                </div>
              </div>
            )}
            <div style={{ padding: isMobile ? '36px 20px' : '32px 48px 32px 40px', flex: isMobile ? 'none' : 1, display: 'flex', flexDirection: 'column', minHeight: isMobile ? 480 : 0, position: 'relative', zIndex: 1 }}>
              <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, color: 'rgba(17,29,85,0.5)', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 8 }}>Kontaktformular</span>
              <h3 style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 900, color: '#111D55', letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 24 }}>
                Schreiben Sie uns
              </h3>
              <KontaktForm theme="gold" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Deadlines ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0D1640', padding: isMobile ? '56px 0' : '88px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(160px, 22vw, 280px)', fontWeight: 900, color: '#fff', opacity: 0.025, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em' }}>
          2026
        </div>
        <div className="container mx-auto px-6" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: isMobile ? 48 : 72 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#EFBF04', whiteSpace: 'nowrap' }}>
              Fahrplan 2026
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.10)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 0 }}>
            {deadlines.map((item, i) => (
              <div key={i} style={isMobile ? {
                paddingTop: i > 0 ? 36 : 0,
                paddingBottom: i < deadlines.length - 1 ? 36 : 0,
                borderBottom: i < deadlines.length - 1 ? '1px solid rgba(255,255,255,0.10)' : 'none',
              } : {
                paddingRight: i < deadlines.length - 1 ? 48 : 0,
                paddingLeft: i > 0 ? 48 : 0,
                borderRight: i < deadlines.length - 1 ? '1px solid rgba(255,255,255,0.10)' : 'none',
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: `rgba(239,191,4,0.5)`, marginBottom: 18, fontVariantNumeric: 'tabular-nums' }}>
                  {item.step}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
                  {item.date}
                </div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: CREAM, padding: isMobile ? '56px 0 72px' : '96px 0 112px' }}>
        <div className="container mx-auto px-6">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 40 : 80 }}>

            {/* Left – sticky label */}
            <div style={isMobile ? undefined : { position: 'sticky', top: 96, alignSelf: 'start' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4A8FC9', marginBottom: 20 }}>
                Antworten
              </p>
              <div style={{ width: 28, height: 2, background: GOLD, marginBottom: 20 }} />
              <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.4rem)' : 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Häufige<br />Fragen
              </h2>
            </div>

            {/* Right – accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: isOpen ? '#fff' : 'transparent',
                      borderRadius: 12,
                      overflow: 'hidden',
                      transition: 'background 0.2s',
                      border: isOpen ? `1.5px solid rgba(17,29,85,0.12)` : '1.5px solid rgba(17,29,85,0.08)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%', padding: '22px 24px',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 17, fontWeight: 700, color: isOpen ? NAVY : INK, flex: 1, paddingRight: 20, lineHeight: 1.4 }}>
                        {faq.q}
                      </span>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                        background: isOpen ? NAVY : 'rgba(17,29,85,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}>
                        <ChevronDown
                          size={15}
                          color={isOpen ? '#fff' : NAVY}
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 24px 24px', fontSize: 17, color: 'rgba(58,58,58,0.72)', lineHeight: 1.75 }}>
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
