import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Bell, BellOff, ArrowLeft, ChevronRight, Users, Tag } from 'lucide-react'
import { getEventBySlug, EventUpdate, UpdateType } from '@/data/events'
import { useIsMobile } from '@/hooks/useIsMobile'

const NAVY  = '#111D55'
const GOLD  = '#EFBF04'
const CREAM = '#EFE5E3'
const INK   = '#3A3A3A'

// ── Timestamp formatter ──────────────────────────────────────────────────────
const MONATE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
function formatTs(iso: string): string {
  const d = new Date(iso)
  return `${d.getDate()}. ${MONATE[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} Uhr`
}

// ── Update type styling ──────────────────────────────────────────────────────
const UPDATE_STYLE: Record<UpdateType, { bg: string; color: string; label: string }> = {
  ankündigung: { bg: '#EBF4FF', color: '#1D4ED8', label: 'Ankündigung' },
  erinnerung:  { bg: '#FFFBEB', color: '#B45309', label: 'Erinnerung'  },
  update:      { bg: '#F3F4F6', color: '#374151', label: 'Update'       },
  highlight:   { bg: `${NAVY}12`, color: NAVY,    label: 'Highlight'    },
  ergebnis:    { bg: '#ECFDF5', color: '#065F46', label: 'Ergebnis'     },
  wichtig:     { bg: '#FEF2F2', color: '#991B1B', label: 'Wichtig'      },
}

// ── Status badge ─────────────────────────────────────────────────────────────
const STATUS_LABEL: Record<string, { label: string; bg: string; color: string }> = {
  'geplant':         { label: 'In Planung',       bg: `${NAVY}18`,  color: NAVY   },
  'anmeldung-offen': { label: 'Anmeldung offen',  bg: '#ECFDF5',    color: '#065F46' },
  'intern':          { label: 'Intern',            bg: '#FEF9C3',    color: '#713F12' },
  'abgeschlossen':   { label: 'Abgeschlossen',     bg: '#F3F4F6',    color: '#6B7280' },
}

// ── Update Card ───────────────────────────────────────────────────────────────
function UpdateCard({ update, index }: { update: EventUpdate; index: number }) {
  const style = UPDATE_STYLE[update.type] ?? UPDATE_STYLE.update
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      style={{ display: 'flex', gap: 16, position: 'relative' }}
    >
      {/* Timeline dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: GOLD, border: `2px solid ${GOLD}`, marginTop: 6, flexShrink: 0 }} />
        <div style={{ flex: 1, width: 1, background: `rgba(3,9,58,0.1)`, marginTop: 6 }} />
      </div>

      {/* Card */}
      <div style={{
        flex: 1, background: '#fff', borderRadius: 12, padding: '16px 20px',
        marginBottom: 12, border: '1px solid rgba(3,9,58,0.08)',
        boxShadow: '0 1px 8px rgba(3,9,58,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '3px 8px', borderRadius: 20,
            background: style.bg, color: style.color,
          }}>{style.label}</span>
          <span style={{ fontSize: 11, color: 'rgba(58,58,58,0.45)' }}>{formatTs(update.timestamp)}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 4, lineHeight: 1.35 }}>{update.title}</div>
        <div style={{ fontSize: 14, color: 'rgba(58,58,58,0.65)', lineHeight: 1.65 }}>{update.body}</div>
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const event = getEventBySlug(slug ?? '')
  const [subscribed, setSubscribed] = useState(false)
  const isMobile = useIsMobile()

  if (!event) {
    return (
      <div style={{ paddingTop: 60, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: CREAM, flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: `${NAVY}20`, letterSpacing: '-0.04em' }}>404</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>Event nicht gefunden</div>
        <Link to="/presse" style={{ fontSize: 15, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, borderBottom: `2px solid ${GOLD}`, paddingBottom: 2 }}>
          <ArrowLeft size={14} /> Zurück zur Presse-Seite
        </Link>
      </div>
    )
  }

  const statusStyle = STATUS_LABEL[event.status] ?? STATUS_LABEL['geplant']

  return (
    <div style={{ paddingTop: 60, background: CREAM, minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: isMobile ? 'auto' : '65vh', minHeight: isMobile ? 520 : 480, overflow: 'hidden' }}>
        <img
          src={event.img}
          alt={event.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,9,58,0.25) 0%, rgba(3,9,58,0.92) 100%)' }} />

        {/* Back link */}
        <div style={{ position: 'absolute', top: 28, left: 0, right: 0, padding: isMobile ? '0 24px' : '0 80px', zIndex: 10 }}>
          <Link to="/presse" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >
            <ArrowLeft size={14} /> Alle Events
          </Link>
        </div>

        {/* Hero content */}
        <div style={{ position: isMobile ? 'relative' : 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '88px 24px 48px' : '40px 80px', zIndex: 10, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'flex-end' : 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 20 : 40, minHeight: isMobile ? 520 : undefined, boxSizing: 'border-box' }}>
          {/* Left */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', background: statusStyle.bg, color: statusStyle.color, padding: '4px 10px', borderRadius: 20 }}>
                {statusStyle.label}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: GOLD }}>
                {event.category}
              </span>
            </div>
            <h1 style={{ fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.8rem)' : 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12, fontFamily: '"IBM Plex Sans", sans-serif' }}>
              {event.title}
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.6 }}>
              {event.subtitle}
            </p>
          </div>

          {/* Right – key facts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, background: 'rgba(3,9,58,0.55)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: isMobile ? '16px 20px' : '24px 28px', border: '1px solid rgba(255,255,255,0.1)', width: isMobile ? '100%' : undefined, boxSizing: 'border-box' }}>
            {[
              { icon: Calendar, label: event.date },
              { icon: Clock,    label: event.time },
              { icon: MapPin,   label: `${event.venue}, ${event.location}` },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <Icon size={15} color={GOLD} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#fff', fontWeight: 500, overflowWrap: 'anywhere' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold bottom line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.3), transparent)` }} />
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '48px 24px' : '64px 80px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 400px', gap: isMobile ? 48 : 64, alignItems: 'start' }}>

          {/* Left – Description + Eckdaten */}
          <div>
            {/* Description */}
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: GOLD, marginBottom: 16 }}>
                Über die Veranstaltung
              </p>
              {event.longDescription.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: 17, color: 'rgba(58,58,58,0.75)', lineHeight: 1.8, marginBottom: 20 }}>{para}</p>
              ))}
            </div>

            {/* Eckdaten */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: GOLD, marginBottom: 24 }}>
                Eckdaten
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>
                {event.eckdaten.map((item, i) => (
                  <div key={i} style={{
                    padding: '20px 24px',
                    background: i % 2 === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
                    borderRadius: isMobile
                      ? (i === 0
                          ? '12px 12px 0 0'
                          : i === event.eckdaten.length - 1
                            ? '0 0 12px 12px'
                            : '0')
                      : (i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === event.eckdaten.length - 2 ? '0 0 0 12px' : i === event.eckdaten.length - 1 ? '0 0 12px 0' : '0'),
                    border: '1px solid rgba(3,9,58,0.06)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(58,58,58,0.4)', marginBottom: 6 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: NAVY, lineHeight: 1.35 }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {event.status === 'anmeldung-offen' && (
                <Link to="/teilnahme" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: NAVY, color: GOLD, textDecoration: 'none',
                  padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                  fontFamily: '"IBM Plex Sans", sans-serif',
                }}>
                  Jetzt anmelden <ChevronRight size={16} />
                </Link>
              )}
              <Link to="/kontakt" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: NAVY, textDecoration: 'none',
                padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                border: `2px solid ${NAVY}`,
              }}>
                Frage stellen
              </Link>
            </div>
          </div>

          {/* Right – Live Updates Feed (sticky on desktop, static on mobile) */}
          <div style={isMobile ? undefined : { position: 'sticky', top: 80 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bell size={18} color={NAVY} />
                <span style={{ fontSize: 17, fontWeight: 800, color: NAVY, fontFamily: '"IBM Plex Sans", sans-serif' }}>
                  Live Updates
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 800, background: NAVY, color: GOLD,
                  borderRadius: 20, padding: '2px 8px',
                }}>{event.updates.length}</span>
              </div>

              <button
                onClick={() => setSubscribed(s => !s)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                  background: subscribed ? NAVY : 'transparent',
                  color: subscribed ? GOLD : NAVY,
                  border: `1.5px solid ${NAVY}`, borderRadius: 8,
                  padding: '8px 14px', fontSize: 12, fontWeight: 700,
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
              >
                {subscribed ? <><BellOff size={13} /> Abgemeldet</> : <><Bell size={13} /> Abonnieren</>}
              </button>
            </div>

            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#065F46', fontWeight: 500 }}
              >
                ✓ Sie erhalten Benachrichtigungen für dieses Event.
              </motion.div>
            )}

            {/* Timeline */}
            <div style={{ maxHeight: isMobile ? 'none' : 560, overflowY: isMobile ? 'visible' : 'auto', paddingRight: 4 }}>
              {event.updates.map((update, i) => (
                <UpdateCard key={update.id} update={update} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: NAVY, padding: isMobile ? '48px 24px' : '64px 80px', marginTop: 40 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 24 : 0 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: GOLD, marginBottom: 10 }}>
              Mehr entdecken
            </p>
            <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', fontFamily: '"IBM Plex Sans", sans-serif' }}>
              Weitere Veranstaltungen
            </h3>
          </div>
          <Link
            to="/presse"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
              background: GOLD, color: NAVY, padding: '14px 28px', borderRadius: 10,
              fontWeight: 800, fontSize: 15, fontFamily: '"IBM Plex Sans", sans-serif',
              transition: 'background 0.15s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#FFD130'; el.style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.boxShadow = 'none'; }}
          >
            Alle Events <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
