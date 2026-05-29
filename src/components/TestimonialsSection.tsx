import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';

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

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section style={{ background: '#fff', overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
      <MunichSkylineBg />
      <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', height: 560, position: 'relative', zIndex: 1 }}>
        {/* Left — portrait photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            key={t.img}
            src={t.img}
            alt={t.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'opacity 0.4s' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #fff 100%)' }} />
        </div>

        {/* Right — quote */}
        <div style={{ padding: '80px 72px 80px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 700, display: 'block', marginBottom: 32 }}>Stimmen der Preisträger</span>

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
            <button onClick={prev} style={{ width: 40, height: 40, border: '1.5px solid #D0D5DD', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#111D55'; (e.currentTarget as HTMLElement).style.background = '#111D55'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D0D5DD'; (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'inherit'; }}
            >
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={next} style={{ width: 40, height: 40, border: '1.5px solid #111D55', background: '#111D55', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', color: '#fff' }}
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
    </section>
  );
}
