import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Download, ArrowRight, FileText } from 'lucide-react';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';

const NAVY = '#111D55';
const GOLD = '#EFBF04';
const CREAM = '#E4E2E3';
const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';

const events = [
  {
    title: 'Preisverleihung 2026',
    date: '22. Okt 2026',
    location: 'München, Residenz',
    cat: 'Gala / Event',
    status: 'In Planung',
    img: '/images/buehne-moderatoren.jpg',
    desc: 'Der glanzvolle Höhepunkt des Jahres. Die Verleihung der Preise in der prachtvollen Kulisse der Residenz München.',
    slug: '/presse/events/preisverleihung-2026',
  },
  {
    title: 'Mittelstands-Gipfel',
    date: '15. Juni 2026',
    location: 'Nürnberg',
    cat: 'Workshop',
    status: 'Anmeldung offen',
    img: '/images/networking-innenhof.jpg',
    desc: 'Regionaler Austausch und Best-Practices für bayerische Unternehmen auf dem Weg zum Preis.',
    slug: '/presse/events/mittelstands-gipfel-2026',
  },
  {
    title: 'Nominierten-Auswahl',
    date: '04. Aug 2026',
    location: 'Regensburg',
    cat: 'Jury-Sitzung',
    status: 'Intern',
    img: '/images/saal-gedeckt.jpg',
    desc: 'Das Gremium sichtet die Ergebnisse der Audits und legt die Nominierten für die Hauptpreise fest.',
    slug: '/presse/events/nominierten-auswahl-2026',
  },
];

const news = [
  {
    title: 'Wie Bayerns KMU die KI nutzen',
    excerpt:
      'Ein Deep-Dive in die Bewerbungsunterlagen 2024 zeigt: Der Mittelstand treibt die Digitalisierung aktiv voran.',
    cat: 'Innovation',
    img: '/images/gala-saal-overview.jpg',
    slug: '/presse/blog/ki-nutzung-bayerischer-kmu',
  },
  {
    title: 'Start der Ehrenamts-Initiative',
    excerpt:
      'Gemeinsam mit unseren Partnern fördern wir soziale Projekte mittelständischer Unternehmen.',
    cat: 'Engagement',
    img: '/images/networking-innenhof.jpg',
    slug: '/presse/blog/ehrenamts-initiative-2026',
  },
  {
    title: 'Bayerische Wirtschaft wächst',
    excerpt:
      'Neue Prognosen zeigen ein stabiles Wachstum für den Mittelstand – gute Aussichten für die Awards.',
    cat: 'Wirtschaft',
    img: '/images/gala-dinner.jpg',
    slug: '/presse/blog/bayerische-wirtschaft-waechst',
  },
];

function NewsCard({ item, idx, isMobile }: { item: typeof news[0]; idx: number; isMobile: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      to={item.slug}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderLeft: isMobile ? 'none' : (idx > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none'),
        borderBottom: isMobile && idx < news.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        textDecoration: 'none',
      }}
    >
      {/* image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <img
          src={item.img}
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hovered ? 'none' : 'grayscale(100%)',
            transition: 'filter 0.5s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(3,9,58,0.8), transparent)',
          }}
        />
      </div>
      {/* body */}
      <div style={{ padding: isMobile ? '24px 24px 32px' : '32px 36px 40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span
          style={{
            fontFamily: FF,
            fontSize: 9,
            color: GOLD,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            fontWeight: 700,
            marginBottom: 12,
            display: 'block',
          }}
        >
          {item.cat}
        </span>
        <h3
          style={{
            fontFamily: FF,
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            marginBottom: 16,
          }}
        >
          {item.title}
        </h3>
        <div
          style={{
            width: hovered ? '100%' : 24,
            height: 1,
            background: 'rgba(239,191,4,0.5)',
            transition: 'width 0.4s ease',
            marginBottom: 16,
          }}
        />
        <p
          style={{
            fontFamily: FB,
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            flex: 1,
            marginBottom: 20,
          }}
        >
          {item.excerpt}
        </p>
        <span
          style={{
            fontFamily: FF,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: GOLD,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          Weiterlesen <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

const Press: React.FC = () => {
  const isMobile = useIsMobile();
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [dlHovered, setDlHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);

  // Form state
  const [medium, setMedium] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (medium.trim() && name.trim() && email.trim()) {
      setSubmitted(true);
    }
  };

  // DarkInput defined inline as required
  function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const [f, setF] = React.useState(false);
    return (
      <input
        {...props}
        onFocus={(e) => {
          setF(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setF(false);
          props.onBlur?.(e);
        }}
        style={{
          width: '100%',
          height: 44,
          padding: '0 14px',
          fontFamily: FF,
          fontSize: 18,
          color: '#fff',
          border: `1px solid ${f ? 'rgba(239,191,4,0.8)' : 'rgba(255,255,255,0.12)'}`,
          background: f ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s, background 0.15s',
          ...props.style,
        }}
      />
    );
  }

  return (
    <div className="animate-fade-in">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          background: NAVY,
        }}
      >
        <img
          src="/images/gala-dinner.jpg"
          alt="Presse BMP"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isMobile
              ? 'linear-gradient(to top, rgba(2,9,48,0.95) 0%, rgba(2,9,48,0.72) 38%, rgba(2,9,48,0.22) 72%, transparent 100%)'
              : 'linear-gradient(to right, #020930 0%, rgba(2,9,48,0.90) 38%, rgba(2,9,48,0.18) 65%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.3), transparent)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 24px 48px' : '0 80px 80px', maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 2, background: GOLD }} />
            <span
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: GOLD,
              }}
            >
              Presse &amp; Newsroom
            </span>
          </div>
          <h1
            style={{
              fontFamily: FF,
              fontSize: isMobile ? 'clamp(2rem, 8vw, 2.8rem)' : 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 24px',
              overflowWrap: 'anywhere',
            }}
          >
            EVENTS &amp;<br />BERICHTERSTATTUNG.
          </h1>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: 24 }} />
          <p
            style={{
              fontFamily: FB,
              fontSize: 18,
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              maxWidth: 520,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Alle Termine, Pressemitteilungen und Medienmaterial rund um den Bayerischen Mittelstandspreis.
          </p>
        </div>
      </section>

      {/* ── 2. EVENTS ───────────────────────────────────────────────────── */}
      <section id="events" style={{ background: CREAM, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />
        {/* Section header */}
        <div
          style={{
            padding: isMobile ? '48px 24px 40px' : '80px 80px 56px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 48,
            alignItems: 'flex-end',
            borderBottom: '1px solid rgba(3,9,58,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: '#4A8FC9',
                marginBottom: 16,
              }}
            >
              Termine 2026
            </div>
            <h2
              style={{
                fontFamily: FF,
                fontWeight: 900,
                color: '#101828',
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                margin: 0,
              }}
            >
              EVENTS RUND UM DEN PREIS.
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: FB,
                fontSize: 18,
                color: 'rgba(16,24,40,0.45)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Von der Jurysitzung bis zur festlichen Gala — alle Veranstaltungen auf einen Blick.
            </p>
          </div>
        </div>

        {/* Event rows */}
        {events.map((event, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredEvent(idx)}
            onMouseLeave={() => setHoveredEvent(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
              borderBottom: '1px solid rgba(3,9,58,0.08)',
              background: hoveredEvent === idx ? '#EAE7E6' : 'transparent',
              transition: 'background 0.15s',
              cursor: 'pointer',
            }}
          >
            {/* Left — image cell */}
            <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 200 : 240 }}>
              <img src={event.img} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 20, left: 20, padding: '5px 12px', fontFamily: FF, fontSize: 9, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.18em', background: event.status === 'Anmeldung offen' ? GOLD : 'rgba(3,9,58,0.85)', color: event.status === 'Anmeldung offen' ? NAVY : 'rgba(255,255,255,0.6)' }}>
                {event.status}
              </div>
            </div>

            {/* Right — copy cell */}
            <div style={{ padding: isMobile ? '24px 24px 32px' : '40px 56px 40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: FF, fontSize: 9, color: '#4A8FC9', textTransform: 'uppercase' as const, letterSpacing: '0.22em', fontWeight: 700, marginBottom: 10 }}>{event.cat}</div>
              <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase' as const, letterSpacing: '-0.02em', margin: '0 0 14px' }}>{event.title}</h3>
              <div style={{ display: 'flex', gap: isMobile ? 16 : 28, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)' }}>
                  <Calendar size={14} color={GOLD} />{event.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)' }}>
                  <MapPin size={14} color={GOLD} />{event.location}
                </div>
              </div>
              <div style={{ width: 24, height: 1, background: 'rgba(239,191,4,0.4)', marginBottom: 14 }} />
              <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)', lineHeight: 1.7, flex: 1 }}>{event.desc}</p>
              <Link to={event.slug} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: FF, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#101828', textDecoration: 'none' }}>
                Details <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── 3. NEWSROOM ─────────────────────────────────────────────────── */}
      <section style={{ background: NAVY, overflow: 'hidden' }}>
        {/* Section header */}
        <div
          style={{
            padding: isMobile ? '48px 24px 40px' : '80px 80px 56px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 48,
            alignItems: 'flex-end',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: GOLD,
                marginBottom: 16,
              }}
            >
              Newsroom
            </div>
            <h2
              style={{
                fontFamily: FF,
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                margin: 0,
              }}
            >
              NACHRICHTEN &amp; EINBLICKE.
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: FB,
                fontSize: 18,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Berichte, Hintergründe und Einblicke rund um den bayerischen Mittelstand und den BMP.
            </p>
          </div>
        </div>

        {/* 3-column news grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
          {news.map((item, idx) => (
            <NewsCard key={idx} item={item} idx={idx} isMobile={isMobile} />
          ))}
        </div>
      </section>

      {/* ── 4. PRESSE-MATERIAL & AKKREDITIERUNG ─────────────────────────── */}
      <section id="downloads" style={{ background: CREAM, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%', minHeight: isMobile ? 'auto' : 600 }}>

          {/* Left col */}
          <div
            style={{
              padding: isMobile ? '48px 24px' : '88px 80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRight: isMobile ? 'none' : '1px solid rgba(3,9,58,0.1)',
              borderBottom: isMobile ? '1px solid rgba(3,9,58,0.1)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: FF,
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
                color: '#4A8FC9',
                marginBottom: 16,
              }}
            >
              Pressekontakt &amp; Material
            </div>

            <h2
              style={{
                fontFamily: FF,
                fontWeight: 900,
                color: '#101828',
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                margin: '0 0 20px',
              }}
            >
              PRESSE-MATERIAL &amp; KONTAKT.
            </h2>

            {/* Gold divider */}
            <div style={{ width: 40, height: 2, background: GOLD, margin: '0 0 28px' }} />

            <p
              style={{
                fontFamily: FB,
                fontSize: 18,
                color: 'rgba(16,24,40,0.5)',
                lineHeight: 1.8,
                maxWidth: 380,
                marginBottom: 48,
              }}
            >
              Laden Sie unser offizielles Material herunter oder kontaktieren Sie direkt unser Presseteam für individuelle Anfragen.
            </p>

            {/* Download button */}
            <a
              href="/Print_BMP.zip"
              download="Print_BMP.zip"
              onMouseEnter={() => setDlHovered(true)}
              onMouseLeave={() => setDlHovered(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '24px 28px',
                border: `1px solid ${dlHovered ? GOLD : 'rgba(3,9,58,0.12)'}`,
                background: '#fff',
                cursor: 'pointer',
                marginBottom: 20,
                transition: 'border-color 0.15s',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: NAVY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Download size={20} color={GOLD} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#101828',
                    marginBottom: 3,
                  }}
                >
                  Download Presse-Kit
                </div>
                <div style={{ fontFamily: FB, fontSize: 17, color: 'rgba(16,24,40,0.4)' }}>
                  Print_BMP.zip — 1,5 MB
                </div>
              </div>
            </a>

            {/* Press contact block */}
            <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 24, marginTop: 32 }}>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: 10,
                  color: '#4A8FC9',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Pressekontakt
              </div>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#101828',
                  marginBottom: 4,
                }}
              >
                Tanja Meier
              </div>
              <div
                style={{
                  fontFamily: FB,
                  fontSize: 18,
                  color: 'rgba(16,24,40,0.55)',
                  lineHeight: 1.8,
                  overflowWrap: 'anywhere',
                }}
              >
                presse@bmp-bayern.de
                <br />
                +49 89 123 456 99
              </div>
            </div>
          </div>

          {/* Right col */}
          <div
            style={{
              background: NAVY,
              padding: isMobile ? '48px 24px' : '72px 64px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {submitted ? (
              /* Success state */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: GOLD,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 28,
                    flexShrink: 0,
                  }}
                >
                  <FileText size={24} color={NAVY} />
                </div>
                <h3
                  style={{
                    fontFamily: FF,
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                    fontWeight: 900,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px',
                  }}
                >
                  Anfrage eingegangen
                </h3>
                <p
                  style={{
                    fontFamily: FB,
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  Vielen Dank für Ihre Akkreditierungsanfrage. Unser Presseteam meldet sich zeitnah bei Ihnen.
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: 10,
                    color: GOLD,
                    textTransform: 'uppercase',
                    letterSpacing: '0.32em',
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  Akkreditierung
                </div>

                <h3
                  style={{
                    fontFamily: FF,
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                    fontWeight: 900,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px',
                  }}
                >
                  AKKREDITIERUNG ANFRAGEN.
                </h3>

                {/* Gold divider */}
                <div style={{ width: 36, height: 2, background: GOLD, marginBottom: 28 }} />

                <p
                  style={{
                    fontFamily: FB,
                    fontSize: 18,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.8,
                    marginBottom: 36,
                  }}
                >
                  Melden Sie sich für unsere Presse-Verteiler an oder fordern Sie eine Akkreditierung für die Gala-Verleihung an.
                </p>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label
                      style={{
                        fontFamily: FF,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      Medium / Redaktion *
                    </label>
                    <DarkInput
                      type="text"
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label
                      style={{
                        fontFamily: FF,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      Ihr Name *
                    </label>
                    <DarkInput
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label
                      style={{
                        fontFamily: FF,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      E-Mail-Adresse *
                    </label>
                    <DarkInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setSubmitHovered(true)}
                    onMouseLeave={() => setSubmitHovered(false)}
                    style={{
                      background: submitHovered ? '#FFD130' : GOLD,
                      boxShadow: submitHovered ? '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)' : 'none',
                      color: '#101828',
                      border: 'none',
                      fontFamily: FF,
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      padding: '14px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      transition: 'background 0.15s, box-shadow 0.2s',
                    }}
                  >
                    Akkreditierung anfragen <ArrowRight size={13} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Press;
