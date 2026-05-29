import React from 'react';
import { FileText, Search, UserPlus, Trophy } from 'lucide-react';
import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle,
} from '@/components/ui/process-timeline';

const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';
const NAVY = '#111D55';
const GOLD = '#EFBF04';

const STEPS = [
  { step: '01', title: 'Online-Einreichung',  desc: 'Bewerbungsformular vollständig ausfüllen. Die Teilnahme ist kostenfrei und ohne bürokratischen Aufwand möglich.',                                                        Icon: FileText,  date: 'Bis 30. Juni 2026' },
  { step: '02', title: 'Formale Vorprüfung',  desc: 'Das Gremium sichtet alle Unterlagen auf Vollständigkeit, KMU-Konformität und regionale Zugehörigkeit im Freistaat.',                                                  Icon: Search,    date: 'Juli 2026' },
  { step: '03', title: 'Audit & Jury-Sitzung',desc: 'Die besten Unternehmen werden durch unabhängige Experten-Audits vor Ort evaluiert und in der Jury-Sitzung bewertet.',                                                  Icon: UserPlus,  date: 'Aug – Sep 2026' },
  { step: '04', title: 'Gala-Preisverleihung',desc: 'Die Gewinner werden im Rahmen der feierlichen Gala in München vor geladenen Gästen aus Wirtschaft und Politik geehrt.',                                               Icon: Trophy,    date: 'Oktober 2026' },
];

export default function WegZurAuszeichnungSection() {
  return (
    <ContainerScroll id="schritte" className="h-[380vh]" style={{ background: NAVY }}>
      <ContainerSticky className="top-0 h-screen flex flex-col">

        {/* Section header */}
        <div style={{ padding: '56px 80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <div>
            <span style={{ fontFamily: FF, fontSize: 10, color: '#4A8FC9', textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, display: 'block', marginBottom: 14 }}>Schritt für Schritt</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.03, margin: 0 }}>
              IHR WEG ZUR<br />AUSZEICHNUNG.
            </h2>
          </div>
          <p style={{ fontFamily: FB, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: 0 }}>
            Von der Einreichung bis zur Gala — vier klar definierte Schritte auf dem Weg zur höchsten Auszeichnung des bayerischen Mittelstands.
          </p>
        </div>

        {/* Scroll hint — prominent */}
        <div style={{ padding: '20px 80px', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          {/* Animated chevron stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[0, 1, 2].map(i => (
              <svg
                key={i}
                width="12" height="7" viewBox="0 0 12 7" fill="none"
                style={{ opacity: 1 - i * 0.3, animation: `scrollBounce 1.6s ease-in-out ${i * 0.18}s infinite` }}
              >
                <polyline points="1,1 6,6 11,1" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
          <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            Scrollen zum Erkunden
          </span>
          {/* Progress bar */}
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden', maxWidth: 200 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '25%', background: GOLD, opacity: 0.6 }} />
          </div>
          <span style={{ fontFamily: FF, fontSize: 9, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.1em' }}>01 / 04</span>
        </div>

        {/* Cards strip */}
        <div className="flex flex-nowrap flex-1 items-stretch px-20 pb-16 gap-0">
          {STEPS.map((item, index) => {
            const Icon = item.Icon;
            return (
              <ProcessCard
                key={item.step}
                itemsLength={4}
                index={index}
                variant="bmp"
                className="min-w-[70%] max-w-[70%] flex-shrink-0"
              >
                {/* Left accent strip with step number */}
                <ProcessCardTitle className="border-r border-[rgba(239,191,4,0.2)] flex flex-col items-center justify-between py-8 px-5 min-w-[80px]">
                  <div style={{ width: 40, height: 40, border: '1px solid rgba(239,191,4,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} style={{ color: GOLD }} strokeWidth={1.5} />
                  </div>
                  <span style={{ fontFamily: FF, fontSize: 11, fontWeight: 900, color: 'rgba(239,191,4,0.4)', letterSpacing: '0.1em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    {item.step}
                  </span>
                </ProcessCardTitle>

                {/* Card body */}
                <ProcessCardBody className="flex flex-col justify-between py-10 px-10 gap-6">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                      <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                        Schritt {item.step}
                      </span>
                      <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                      <span style={{ fontFamily: FF, fontSize: 10, color: 'rgba(255,255,255,0.62)', letterSpacing: '0.08em' }}>{item.date}</span>
                    </div>
                    <div style={{ width: 32, height: 1, background: GOLD, marginBottom: 20, opacity: 0.5 }} />
                    <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, margin: 0 }}>
                    {item.desc}
                  </p>
                  {/* Step progress indicator */}
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{ height: 2, flex: i === index ? 2 : 1, background: i === index ? GOLD : 'rgba(255,255,255,0.1)', transition: 'flex 0.3s' }} />
                    ))}
                  </div>
                </ProcessCardBody>
              </ProcessCard>
            );
          })}
        </div>
      </ContainerSticky>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: inherit; }
          50%       { transform: translateY(3px); }
        }
      `}</style>
    </ContainerScroll>
  );
}
