import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';

export const TESTIMONIALS = [
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600", name: "Dr. Maria Huber",   role: "Geschäftsführerin", company: "TechVision GmbH",         year: "2025", quote: "Der BMP hat uns neue Türen geöffnet. Die Auszeichnung ist ein wichtiges Qualitätssiegel für unser gesamtes Team." },
  { img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",  name: "Hannes Weber",      role: "Inhaber & CEO",    company: "Weber Präzision GmbH",     year: "2023", quote: "Der Gewinn war ein Moment des Stolzes für die gesamte Belegschaft. Die höchste Anerkennung für unsere tägliche Arbeit." },
  { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",  name: "Lisa Berger",       role: "Gründerin & CEO",  company: "EcoTech Bavaria",          year: "2024", quote: "Das Netzwerk, das wir durch den BMP gewonnen haben, ist unbezahlbar. Wir fanden Partner, die unsere Werte teilen." },
  { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",     name: "Dr. Michael Schuh", role: "Vorstand",          company: "Bayerischer Maschinenbau", year: "2024", quote: "Der Preis hat unsere Sichtbarkeit weit über die bayerischen Grenzen hinaus gestärkt. Ein echtes Premium-Siegel." },
  { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",  name: "Anna Kellner",      role: "Mitgründerin",     company: "AlpinTech Solutions",      year: "2024", quote: "Der BMP hat unsere Employer Brand transformiert. Wir gewinnen heute die besten Talente, weil wir Preisträger sind." },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];
  const isMobile = useIsMobile();

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section style={{ background: '#fff', overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
      <MunichSkylineBg />
      {/* ── MOBILE: headed section + premium testimonial card ── */}
      {isMobile && (
        <div style={{ padding: '48px 24px 52px', position: 'relative', zIndex: 1 }}>
          {/* Section header */}
          <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: 14 }}>Stimmen der Preisträger</span>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.8rem, 8vw, 2.3rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: '0 0 16px' }}>
            DAS SAGEN UNSERE<br />PREISTRÄGER.
          </h2>
          <div style={{ width: 40, height: 2, background: '#EFBF04', marginBottom: 28 }} />

          {/* Card */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(17,29,85,0.10)', boxShadow: '0 16px 38px rgba(3,9,58,0.10)', overflow: 'hidden' }}>
            {/* Photo banner */}
            <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
              <img key={t.img} src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,9,58,0.28) 0%, transparent 45%)' }} />
              <span style={{ position: 'absolute', top: 14, left: 14, fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#101828', background: '#EFBF04', padding: '5px 10px', borderRadius: 100 }}>Preisträger {t.year}</span>
            </div>
            {/* Body */}
            <div style={{ padding: '22px 22px 24px' }}>
              <span aria-hidden style={{ fontFamily: 'Georgia, serif', fontSize: 52, lineHeight: 0.4, color: '#EFBF04', display: 'block', height: 26, marginBottom: 6 }}>&ldquo;</span>
              <p style={{ fontFamily: FF, fontSize: '1.2rem', fontWeight: 300, color: '#101828', lineHeight: 1.5, margin: '0 0 22px' }}>{t.quote}</p>
              <div style={{ width: 36, height: 2, background: '#EFBF04', marginBottom: 16 }} />
              <div style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: '#101828', marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontFamily: FF, fontSize: 14, color: 'rgba(16,24,40,0.5)' }}>{t.role} · {t.company}</div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24 }}>
            <button onClick={prev} aria-label="Vorheriges" style={{ width: 46, height: 46, borderRadius: 12, border: '1.5px solid #D0D5DD', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={next} aria-label="Nächstes" style={{ width: 46, height: 46, borderRadius: 12, border: '1.5px solid #111D55', background: '#111D55', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <ChevronRight size={16} />
            </button>
            <div style={{ display: 'flex', gap: 6, marginLeft: 6 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Stimme ${i + 1}`} style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 100, background: i === active ? '#EFBF04' : '#D0D5DD', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DESKTOP ── */}
      {!isMobile && (
      <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', height: 560, position: 'relative', zIndex: 1 }}>
        {/* Left — portrait photo */}
        <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 280 : 'auto' }}>
          <img
            key={t.img}
            src={t.img}
            alt={t.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'opacity 0.4s' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'linear-gradient(to bottom, transparent 70%, #fff 100%)' : 'linear-gradient(to right, transparent 60%, #fff 100%)' }} />
        </div>

        {/* Right — quote */}
        <div style={{ padding: isMobile ? '40px 22px 56px' : '80px 72px 80px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: 14 }}>Stimmen der Preisträger</span>

          <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.8rem, 2.6vw, 2.6rem)', fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.04, margin: '0 0 36px' }}>
            DAS SAGEN UNSERE PREISTRÄGER.
          </h2>

          <p style={{ fontFamily: FF, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 300, color: '#101828', lineHeight: 1.55, margin: '0 0 40px' }}>
            {t.quote}
          </p>

          <div style={{ width: 40, height: 2, background: '#EFBF04', marginBottom: 20 }} />
          <div>
            <div style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#101828', marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontFamily: FF, fontSize: 12, color: 'rgba(16,24,40,0.5)' }}>{t.role} · {t.company}</div>
            <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, color: '#4A8FC9', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Preisträger {t.year}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40 }}>
            <button onClick={prev} style={{ width: isMobile ? 44 : 40, height: isMobile ? 44 : 40, border: '1.5px solid #D0D5DD', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#111D55'; (e.currentTarget as HTMLElement).style.background = '#111D55'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D0D5DD'; (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'inherit'; }}
            >
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={next} style={{ width: isMobile ? 44 : 40, height: isMobile ? 44 : 40, border: '1.5px solid #111D55', background: '#111D55', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EFBF04'; (e.currentTarget as HTMLElement).style.borderColor = '#EFBF04'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111D55'; (e.currentTarget as HTMLElement).style.borderColor = '#111D55'; }}
            >
              <ChevronRight size={16} />
            </button>
            <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? '#EFBF04' : '#D0D5DD', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
