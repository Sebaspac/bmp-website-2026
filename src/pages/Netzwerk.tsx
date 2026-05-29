import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ArrowRight, Globe, Linkedin, Building2, MapPin, ExternalLink } from 'lucide-react';
import SponsoringForm from '@/components/forms/SponsoringForm';
import MunichSkylineBg from '@/components/ui/munich-skyline-bg';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';
const FB = '"Inter", sans-serif';
const NAVY = '#111D55';
const GOLD = '#EFBF04';
const CREAM = '#E4E2E3';

const ROLE_COLOR: Record<string, string> = {
  'Hauptsponsor':  '#EFBF04',
  'Sponsor':       '#2563EB',
  'Finanzpartner': '#16A34A',
  'Partner':       '#111D55',
  'Medienpartner': '#DC2626',
};

// ── PersonCard (Schirmherrschaft) ─────────────────────────────────────────────

interface PersonCardProps {
  imgSrc: string;
  imgAlt: string;
  name: string;
  titleLine1: string;
  titleLine2: string;
  institution: string;
  borderRight?: boolean;
}

function PersonCard({ imgSrc, imgAlt, name, titleLine1, titleLine2, institution, borderRight }: PersonCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ borderRight: borderRight ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', width: '100%' }}>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)', transition: 'filter 0.55s ease, transform 0.55s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,9,58,0.8) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: GOLD }} />
      </div>
      <div style={{ padding: '36px 40px', background: NAVY, flex: 1 }}>
        <div style={{ fontFamily: FF, fontSize: 20, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10 }}>{name}</div>
        <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 400, color: `${GOLD}CC`, lineHeight: 1.6, marginBottom: 2 }}>{titleLine1}</div>
        <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 400, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{titleLine2}</div>
        <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>{institution}</div>
      </div>
    </div>
  );
}

// ── JuryCard ──────────────────────────────────────────────────────────────────

interface JuryMember {
  name: string;
  role: string;
  bio: string;
  img: string;
}

const JuryCard: React.FC<{ member: JuryMember; idx: number }> = ({ member, idx }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderLeft: idx > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none', display: 'flex', flexDirection: 'column', cursor: 'default', background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent', transition: 'background 0.2s' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
        <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hovered ? 'none' : 'grayscale(100%)', transition: 'filter 0.5s', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(3,9,58,0.65), transparent)' }} />
      </div>
      <div style={{ padding: '28px 28px 32px' }}>
        <div style={{ fontFamily: FF, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{member.name}</div>
        <div style={{ fontFamily: FF, fontSize: 10, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>{member.role}</div>
        <div style={{ width: hovered ? '100%' : 24, height: 1, background: GOLD, opacity: 0.4, transition: 'width 0.4s ease', marginBottom: 12 }} />
        <div style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{member.bio}</div>
      </div>
    </div>
  );
};

// ── PartnerCell ───────────────────────────────────────────────────────────────

interface Partner {
  id: string;
  name: string;
  role: string;
  desc: string;
  fullDesc: string;
  logo: React.ReactNode;
  industry: string;
  location: string;
  website: string;
  heroImg?: string;
  linkedin?: string;
}

const PartnerCell: React.FC<{ partner: Partner; idx: number; onClick: () => void }> = ({ partner, idx, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const isMobileCell = useIsMobile();
  const borderLeft = isMobileCell ? (idx % 2 === 0 ? 'none' : '1px solid rgba(3,9,58,0.08)') : (idx % 4 === 0 ? 'none' : '1px solid rgba(3,9,58,0.08)');
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: isMobileCell ? '24px 20px' : '36px 32px', borderLeft, borderBottom: (isMobileCell ? idx < 10 : idx < 8) ? '1px solid rgba(3,9,58,0.08)' : 'none', display: 'flex', flexDirection: 'column', gap: 16, cursor: 'pointer', background: hovered ? '#E8E5E4' : 'transparent', transition: 'background 0.15s' }}
    >
      <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>{partner.logo}</div>
      <div style={{ width: hovered ? 48 : 20, height: 1, background: GOLD, transition: 'width 0.3s ease' }} />
      <div style={{ fontFamily: FF, fontSize: 18, fontWeight: 700, color: '#101828' }}>{partner.name}</div>
      <div style={{ fontFamily: FF, fontSize: 11, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>{partner.role}</div>
      <div style={{ fontFamily: FB, fontSize: 17, color: 'rgba(16,24,40,0.45)', lineHeight: 1.6, flexGrow: 1 }}>{partner.desc}</div>
      <div style={{ fontFamily: FF, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: GOLD, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
        Details <ArrowRight size={10} />
      </div>
    </div>
  );
};

// ── PartnerModal ─────────────────────────────────────────────────────────────

function PartnerModal({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const accentColor = ROLE_COLOR[partner.role] ?? GOLD;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', width: '100%', maxWidth: 720,
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          overflow: 'hidden', flexShrink: 0,
          maxHeight: '92vh', overflowY: 'auto',
        }}
      >
        {/* ── Hero ── */}
        <div style={{ position: 'relative', height: 220, flexShrink: 0, overflow: 'hidden' }}>
          {/* Background */}
          {partner.heroImg
            ? <img src={partner.heroImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accentColor}33 0%, ${NAVY} 70%)` }} />
          }
          {/* Gradient to white */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 35%, rgba(255,255,255,0.6) 75%, #fff 100%)' }} />

          {/* Category badge — top left */}
          <div style={{ position: 'absolute', top: 20, left: 24 }}>
            <span style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff', padding: '5px 13px',
              fontFamily: FF, fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.22em',
              display: 'inline-block',
            }}>
              {partner.role}
            </span>
          </div>

          {/* Social + Close — top right */}
          <div style={{ position: 'absolute', top: 16, right: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
            {partner.linkedin && (
              <a href={partner.linkedin} target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: NAVY, textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}>
                <Linkedin size={14} />
              </a>
            )}
            {partner.website && (
              <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: NAVY, textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}>
                <Globe size={14} />
              </a>
            )}
            <button onClick={onClose} style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)', color: NAVY,
            }}>
              <X size={15} />
            </button>
          </div>

          {/* Logo box — bottom left (overflows hero) */}
          <div style={{
            position: 'absolute', bottom: -28, left: 28,
            width: 80, height: 80, background: '#fff',
            borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 10, zIndex: 2,
          }}>
            {partner.logo}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: '52px 32px 32px' }}>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 900, color: '#101828',
            letterSpacing: '-0.025em', lineHeight: 1.05,
            margin: '0 0 10px',
          }}>
            {partner.name}
          </h2>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.5)', lineHeight: 1.65, margin: '0 0 24px' }}>
            {partner.desc}
          </p>

          {/* 3 info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
            {[
              { Icon: Building2, label: 'Branche',  value: partner.industry },
              { Icon: MapPin,    label: 'Standort', value: partner.location },
              { Icon: Globe,     label: 'Web',      value: partner.website  },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{ background: 'hsl(220,40%,97%)', padding: '14px 16px', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Icon size={11} color="rgba(16,24,40,0.35)" />
                  <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(16,24,40,0.35)' }}>{label}</span>
                </div>
                <div style={{ fontFamily: FB, fontSize: 17, fontWeight: 600, color: '#101828', lineHeight: 1.4, wordBreak: 'break-word' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div style={{ height: 1, background: 'rgba(16,24,40,0.08)', marginBottom: 28 }} />

          {/* Über section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 4, height: 20, background: accentColor, borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: FF, fontSize: 17, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#101828' }}>
              Über das Unternehmen
            </span>
          </div>
          <p style={{ fontFamily: FB, fontSize: 19, color: 'rgba(16,24,40,0.6)', lineHeight: 1.82, marginBottom: 36 }}>
            {partner.fullDesc}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {partner.website && (
              <a
                href={`https://${partner.website}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '13px 28px', background: GOLD, color: '#101828',
                  fontFamily: FF, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'background 0.15s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#FFD130'; el.style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.boxShadow = 'none'; }}
              >
                Website besuchen <ExternalLink size={12} />
              </a>
            )}
            <button
              onClick={onClose}
              style={{
                padding: '13px 28px', background: 'transparent',
                color: 'rgba(16,24,40,0.45)', border: '1px solid rgba(16,24,40,0.12)',
                fontFamily: FF, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = '#fff'; el.style.borderColor = NAVY; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(16,24,40,0.45)'; el.style.borderColor = 'rgba(16,24,40,0.12)'; }}
            >
              Schließen
            </button>
          </div>
        </div>

        {/* ── Footer strip ── */}
        <div style={{
          background: 'hsl(220,20%,96%)', padding: '14px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid rgba(16,24,40,0.06)',
        }}>
          <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(16,24,40,0.3)' }}>
            Bayerischer Mittelstandspreis 2026
          </span>
          <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accentColor }}>
            Offizieller {partner.role}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Netzwerk ──────────────────────────────────────────────────────────────────

const Netzwerk: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const juryMembers: JuryMember[] = [
    { name: 'Prof. Dr. Klaus Bergmann', role: 'Vorsitzender / LMU München', bio: 'Spezialist für KMU-Strategien und Innovations-Ökosysteme.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
    { name: 'Dr. Sabine Hofmann', role: 'IHK Bayern', bio: 'Expertin für digitale Transformation und regionale Wertschöpfung.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Maximilian Reiter', role: 'Unternehmer', bio: 'CEO der Reiter Group, bringt die wertvolle Unternehmer-Perspektive ein.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Dr. Elena Fischer', role: 'TU München', bio: 'Lehrstuhl für nachhaltige Unternehmensführung.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
  ];

  const partners: Partner[] = [
    {
      id: 'rsm', name: 'RSM Ebner Stolz', role: 'Hauptsponsor',
      desc: 'Führende mittelständische Wirtschaftsprüfungs- und Steuerberatungsgesellschaft.',
      fullDesc: 'RSM Ebner Stolz ist eine der größten unabhängigen Wirtschaftsprüfungs- und Steuerberatungsgesellschaften Deutschlands mit besonderer Expertise im Mittelstand. Als Hauptsponsor des BMP unterstützen sie die Identifikation herausragender Unternehmen und bringen ihre Netzwerke aktiv in die Nominierungsphase ein.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ display: 'flex', gap: 2 }}><span style={{ width: 10, height: 10, background: '#6b7280', display: 'block' }} /><span style={{ width: 10, height: 10, background: '#22c55e', display: 'block' }} /><span style={{ width: 10, height: 10, background: '#3b82f6', display: 'block' }} /></span><span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em', color: '#374151', fontFamily: FF }}>RSM <span style={{ color: '#6b7280', fontWeight: 600 }}>EBNER STOLZ</span></span></span>),
      industry: 'Wirtschaftsprüfung & Beratung', location: 'München, Bayern', website: 'rsm-ebner-stolz.de', linkedin: 'https://linkedin.com/company/rsm-ebner-stolz',
    },
    {
      id: 'wwk', name: 'WWK', role: 'Sponsor',
      desc: 'Eine starke Gemeinschaft — Lebensversicherungsgruppe mit bayerischen Wurzeln.',
      fullDesc: 'Die WWK Lebensversicherung a. G. ist eine der leistungsstärksten deutschen Lebensversicherungsgruppen. Als Münchner Traditionsunternehmen verbindet die WWK tiefe bayerische Verwurzelung mit finanzieller Stärke — Werte, die sie mit dem Bayerischen Mittelstandspreis teilt.',
      logo: (<span style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em', color: '#16a34a', fontFamily: 'Arial Black, sans-serif' }}>WWK</span>),
      industry: 'Lebensversicherung', location: 'München, Bayern', website: 'wwk.de', linkedin: 'https://linkedin.com/company/wwk-versicherung',
    },
    {
      id: 'wir', name: 'Wir Eigentümerunternehmer', role: 'Partner',
      desc: 'Netzwerk und Stimme der inhabergeführten Unternehmen in Bayern.',
      fullDesc: 'Der Verband Wir Eigentümerunternehmer e.V. vertritt die Interessen inhabergeführter Unternehmen und bringt die authentische Unternehmerperspektive in den BMP ein. Mitglieder erhalten exklusive Einblicke in die Jury-Prozesse und profitieren vom Netzwerk der Preisträger.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><svg width="20" height="20" viewBox="0 0 20 20"><polygon points="10,1 19,6 19,14 10,19 1,14 1,6" fill="none" stroke="#1e3a5f" strokeWidth="2" /><polygon points="10,4 16,7.5 16,12.5 10,16 4,12.5 4,7.5" fill="#1e3a5f" /></svg><span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1e3a5f', lineHeight: 1.2, fontFamily: FF }}>WIR<br />EIGENTÜMER</span></span>),
      industry: 'Unternehmensverband', location: 'München, Bayern', website: 'wir-eigentuemerunternehmer.de',
    },
    {
      id: 'deutschebank', name: 'Deutsche Bank', role: 'Finanzpartner',
      desc: 'Partnerbank für die Finanzierung und Skalierung von KMU-Wachstum.',
      fullDesc: 'Die Deutsche Bank begleitet mittelständische Unternehmen als verlässlicher Finanzpartner durch alle Wachstumsphasen. Im Rahmen des BMP stellt sie ihr deutschlandweites Netzwerk, spezifische Mittelstandsprodukte und direkte Ansprechpartner für die Nominierten bereit.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><svg width="20" height="20" viewBox="0 0 20 20"><rect x="1" y="1" width="18" height="18" fill="none" stroke="#1d1d1b" strokeWidth="1.5" /><line x1="5" y1="15" x2="15" y2="5" stroke="#1d1d1b" strokeWidth="2" /></svg><span style={{ fontWeight: 600, fontSize: 15, color: '#1d1d1b', fontFamily: FB }}>Deutsche Bank</span></span>),
      industry: 'Bankwesen & Finanzen', location: 'Frankfurt a. M.', website: 'db.com', linkedin: 'https://linkedin.com/company/deutsche-bank',
    },
    {
      id: 'bionorica', name: 'Bionorica', role: 'Sponsor',
      desc: 'Weltmarktführer für pflanzliche Arzneimittel aus dem bayerischen Neumarkt.',
      fullDesc: 'Bionorica SE ist ein international agierendes Pharmaunternehmen mit Sitz in Neumarkt i. d. OPf. und Weltmarktführer bei pflanzlichen Arzneimitteln. Das Unternehmen selbst ist ein Paradebeispiel eines bayerischen Mittelständlers mit globalem Anspruch und verkörpert die Innovationskraft, die der BMP würdigt.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#16a34a" /><path d="M10 3 Q14 7 14 10 Q14 14 10 17 Q6 14 6 10 Q6 7 10 3Z" fill="white" opacity="0.8" /></svg><span style={{ fontWeight: 700, fontSize: 15, color: '#16a34a', fontFamily: FB }}>Bionorica<sup style={{ fontSize: 8 }}>®</sup></span></span>),
      industry: 'Pharmaindustrie', location: 'Neumarkt i.d.OPf., Bayern', website: 'bionorica.de', linkedin: 'https://linkedin.com/company/bionorica',
    },
    {
      id: 'berchtesgadenerland', name: 'Berchtesgadener Land', role: 'Sponsor',
      desc: 'Bayerische Bio-Molkerei — Qualität und Nachhaltigkeit aus den Alpen.',
      fullDesc: 'Die Molkerei Berchtesgadener Land eG ist eine der führenden Bio-Molkereien Deutschlands. Als genossenschaftlich organisiertes Unternehmen mit Sitz in Piding verkörpert sie die Werte des bayerischen Mittelstands: regionale Verantwortung, Qualität und nachhaltige Unternehmensführung.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,1 17,9 13,17 5,17 1,9" fill="#2d5a27" /><polygon points="9,4 14,9 9,14 4,9" fill="#5a8a54" opacity="0.6" /></svg><span style={{ fontWeight: 700, fontSize: 11, color: '#2d5a27', lineHeight: 1.2, fontFamily: FF }}>BERCHTESGADENER<br />LAND</span></span>),
      industry: 'Bio-Lebensmittel', location: 'Piding, Bayern', website: 'berchtesgadener-land.com', linkedin: 'https://linkedin.com/company/berchtesgadener-land',
    },
    {
      id: 'metzler', name: 'METZLER', role: 'Finanzpartner',
      desc: 'Älteste Privatbank Deutschlands — Unabhängigkeit seit 1674.',
      fullDesc: 'B. Metzler seel. Sohn & Co. KGaA ist die älteste deutsche Privatbank in Familienbesitz — seit über 350 Jahren unabhängig. Ihr Engagement für den BMP unterstreicht die tiefe Verbundenheit mit dem Mittelstand, dessen Werte wie Verlässlichkeit, Substanz und Langfristigkeit Metzler selbst verkörpert.',
      logo: (<span style={{ fontWeight: 900, fontSize: 21, letterSpacing: '0.15em', color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>METZLER</span>),
      industry: 'Privatbankwesen', location: 'Frankfurt a. M.', website: 'metzler.com', linkedin: 'https://linkedin.com/company/metzler',
    },
    {
      id: 'radiogong', name: 'Radio Gong 96.3', role: 'Medienpartner',
      desc: 'Münchens meistgehörter Radiosender — Reichweite für den Mittelstand.',
      fullDesc: 'Radio Gong 96.3 ist der reichweitenstärkste Radiosender Münchens und der Region. Als Medienpartner des BMP sorgt er für maximale Aufmerksamkeit für die Nominierten — in Sendemitschnitten, redaktionellen Beiträgen und Live-Übertragungen von der Gala.',
      logo: (<span style={{ background: '#e11d48', color: '#fff', fontWeight: 900, fontSize: 14, padding: '4px 10px', lineHeight: 1.25, display: 'inline-block', textAlign: 'center', fontFamily: FF }}>Radio<br />Gong <span style={{ color: '#fde047' }}>96.3</span></span>),
      industry: 'Medien & Radio', location: 'München, Bayern', website: 'radiogong.com',
    },
    {
      id: 'muenchentv', name: 'münchen.tv', role: 'Medienpartner',
      desc: 'Das lokale TV des Großraums München — Bild und Ton zur Gala.',
      fullDesc: 'münchen.tv ist der lokale Fernsehsender der Landeshauptstadt München mit einer täglichen Reichweite von mehreren hunderttausend Zuschauern. Als Medienpartner überträgt münchen.tv Highlights der BMP-Gala und produziert Porträts der Nominierten für ein breites Publikum.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><svg width="22" height="18" viewBox="0 0 22 18"><path d="M2 4 Q2 1 5 1 L17 1 Q20 1 20 4 L20 14 Q20 17 17 17 L5 17 Q2 17 2 14 Z" fill="#0ea5e9" /><path d="M20 5 L22 3 L22 15 L20 13" fill="#0ea5e9" /></svg><span style={{ fontWeight: 900, fontSize: 15, color: '#0ea5e9', fontFamily: FB }}>münchen<span style={{ color: '#1e293b' }}>.tv</span></span></span>),
      industry: 'Fernsehen & Medien', location: 'München, Bayern', website: 'muenchen.tv',
    },
    {
      id: 'ews', name: 'EWS', role: 'Partner',
      desc: 'Energiewirtschaftliche Kompetenz für nachhaltige Mittelstandslösungen.',
      fullDesc: 'EWS steht für zukunftsweisende Energieversorgung aus 100% erneuerbaren Quellen. Als Partner des BMP bringt EWS Expertise zu Energieeffizienz, nachhaltiger Unternehmensführung und der Energiewende ein — Themen, die für den modernen bayerischen Mittelstand zentral sind.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, border: '2px solid #1e3a8a' }}><span style={{ fontWeight: 900, color: '#1e3a8a', fontSize: 17, letterSpacing: '0.1em', fontFamily: FF }}>EWS</span></span>),
      industry: 'Erneuerbare Energien', location: 'Schönau, Baden-Württemberg', website: 'ews-schoenau.de',
    },
    {
      id: 'vbw', name: 'vbw', role: 'Partner',
      desc: 'Die bayerische Wirtschaft — Spitzenverband der bayerischen Industrie.',
      fullDesc: 'Die vbw – Vereinigung der Bayerischen Wirtschaft e.V. ist der Spitzenverband der bayerischen Wirtschaft und vertritt rund 150 Mitgliedsverbände. Als strategischer Partner verleiht die vbw dem BMP gesamtwirtschaftliche Bedeutung und öffnet Türen zu Politik und Verbänden.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 40, background: '#1e3a8a' }}><span style={{ fontWeight: 900, color: '#fff', fontSize: 17, letterSpacing: '0.2em', fontFamily: FF }}>vbw</span></span>),
      industry: 'Wirtschaftsverband', location: 'München, Bayern', website: 'vbw-bayern.de', linkedin: 'https://linkedin.com/company/vbw-vereinigung-der-bayerischen-wirtschaft',
    },
    {
      id: 'wirtschaftsbeirat', name: 'Wirtschaftsbeirat Bayern', role: 'Partner',
      desc: 'Im Dialog gestalten — Sprachrohr des bayerischen Unternehmertums.',
      fullDesc: 'Der Wirtschaftsbeirat Bayern e.V. ist die Interessenvertretung des bayerischen Unternehmertums und steht in direktem politischem Dialog mit der Staatsregierung. Er bringt sein Netzwerk von über 2.000 Mitgliedsunternehmen in die Nominierungsphase des BMP ein.',
      logo: (<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg width="18" height="18" viewBox="0 0 18 18"><rect x="1" y="1" width="16" height="16" fill="none" stroke="#1e4d8c" strokeWidth="1.5" /><path d="M4 9 L9 4 L14 9 L9 14Z" fill="#1e4d8c" /></svg><span style={{ fontSize: 10, fontWeight: 700, color: '#1e4d8c', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.2, fontFamily: FF }}>WIRTSCHAFTS<br />BEIRAT BAYERN</span></span>),
      industry: 'Unternehmensverband', location: 'München, Bayern', website: 'wirtschaftsbeirat.de',
    },
  ];

  const expertiseRows = [
    { num: '01', label: 'Aktenstudium', body: 'Alle Einreichungen werden zunächst vollständig gesichtet und nach formalen Kriterien geprüft.' },
    { num: '02', label: 'Scoring-Matrix', body: 'Jedes Jurymitglied bewertet unabhängig nach den vier gleichgewichteten Kriterien.' },
    { num: '03', label: 'Jury-Plenum', body: 'In der gemeinsamen Sitzung werden Abweichungen diskutiert und Konsens gebildet.' },
    { num: '04', label: 'Nominierungsliste', body: 'Die Jury beschließt einstimmig die Nominierten und den Preisträger.' },
  ];

  return (
    <div className="animate-fade-in">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '72vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#060C14' }}>
        <img src="/images/netzwerk-hero.jpg" alt="BMP Netzwerk Preisverleihung" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #020930 0%, rgba(2,9,48,0.90) 38%, rgba(2,9,48,0.18) 65%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 80, width: 2, height: '100%', background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #EFBF04, rgba(239,191,4,0.3), transparent)', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 24px 48px' : '0 80px 88px', maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 40, height: 2, background: GOLD }} />
            <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>Jury & Partner</span>
          </div>
          <h1 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.6rem, 6vw, 5rem)' : 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 28px' }}>
            DAS NETZWERK<br />HINTER DEM <span style={{ color: GOLD }}>AWARD.</span>
          </h1>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 560, margin: 0, fontWeight: 300 }}>
            Der Bayerische Mittelstandspreis wird getragen von einem starken Netzwerk aus Schirmherrschaft, unabhängiger Fach-Jury und langjährigen Partnern aus Wirtschaft und Gesellschaft.
          </p>
        </div>
      </section>


      {/* ── 2. SCHIRMHERRSCHAFT ──────────────────────────────────────────────── */}
      <section id="schirmherrschaft" style={{ background: NAVY }}>
        <div style={{ padding: isMobile ? '48px 24px 32px' : '80px 80px 56px' }}>
          <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 16 }}>Die Schirmherrschaft</span>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, margin: '0 0 20px' }}>Schirmherrin und Schirmherr</h2>
          <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 14 }} />
          <p style={{ fontFamily: FF, fontSize: 18, color: 'rgba(255,255,255,0.5)', margin: 0 }}>des Bayerischen Mittelstandspreises</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          <PersonCard
            imgSrc="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
            imgAlt="Ilse Aigner"
            name="Ilse Aigner MdL"
            titleLine1="Präsidentin des Bayerischen Landtags"
            titleLine2="Bayerische Staatsministerin für Wirtschaft a.D."
            institution="Bayerischer Landtag"
            borderRight
          />
          <PersonCard
            imgSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
            imgAlt="Hubert Aiwanger"
            name="Hubert Aiwanger MdL"
            titleLine1="Bayerischer Staatsminister für Wirtschaft,"
            titleLine2="Landesentwicklung und Energie · Stv. Ministerpräsident"
            institution="Bayerische Staatsregierung"
          />
        </div>

        {/* Grußwort — Ilse Aigner */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ padding: isMobile ? '32px 24px' : '64px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '40% 60%', gap: isMobile ? '24px 0' : '0 64px', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 8 }}>Grußwort</span>
              <div style={{ fontFamily: FF, fontSize: 11, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Schirmherrin</div>
              <div style={{ fontFamily: FF, fontSize: 18, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 10 }}>Ilse Aigner MdL</div>
              <div style={{ fontFamily: FF, fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 4 }}>Präsidentin des Bayerischen Landtags</div>
              <div style={{ fontFamily: FF, fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>Bayerische Staatsministerin für Wirtschaft a.D.</div>
            </div>
            <div>
              <blockquote style={{ fontFamily: FF, fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, margin: 0, paddingLeft: 24, borderLeft: `3px solid ${GOLD}` }}>
                "Der Bayerische Mittelstandspreis steht für das, was Bayern stark macht: Unternehmergeist, Verantwortung und Qualität. Mit großer Freude übernehme ich erneut die Schirmherrschaft für diesen bedeutenden Preis."
              </blockquote>
              <div style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 20, paddingLeft: 24 }}>
                — Ilse Aigner MdL, Präsidentin des Bayerischen Landtags
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 2, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.2), transparent)` }} />
      </section>


      {/* ── 3. JURY-INTRO (editorial 2-col split) ────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '40% 60%', minHeight: isMobile ? 'auto' : 400, position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
        <MunichSkylineBg />
        {/* Left — Cream, stats */}
        <div style={{ background: CREAM, padding: isMobile ? '48px 24px' : '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontFamily: FF, fontSize: 'clamp(4rem, 7vw, 6rem)', fontWeight: 900, color: '#101828', letterSpacing: '-0.04em', lineHeight: 1 }}>04</div>
            <div style={{ fontFamily: FF, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(16,24,40,0.4)', marginTop: 4 }}>Unabhängige Jurymitglieder</div>
          </div>
          <div style={{ width: '100%', height: 1, background: 'rgba(3,9,58,0.1)', margin: '32px 0' }} />
          <div>
            <div style={{ fontFamily: FF, fontSize: 'clamp(4rem, 7vw, 6rem)', fontWeight: 900, color: '#101828', letterSpacing: '-0.04em', lineHeight: 1 }}>100%</div>
            <div style={{ fontFamily: FF, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(16,24,40,0.4)', marginTop: 4 }}>Unabhängig &amp; ehrenamtlich</div>
          </div>
          <div style={{ width: '100%', height: 1, background: 'rgba(3,9,58,0.1)', margin: '32px 0' }} />
          <div>
            <div style={{ fontFamily: FF, fontSize: 'clamp(4rem, 7vw, 6rem)', fontWeight: 900, color: '#101828', letterSpacing: '-0.04em', lineHeight: 1 }}>3</div>
            <div style={{ fontFamily: FF, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(16,24,40,0.4)', marginTop: 4 }}>Bewertungsrunden bis zur Gala</div>
          </div>
        </div>
        {/* Right — Navy, editorial copy */}
        <div style={{ background: NAVY, padding: isMobile ? '48px 24px' : '72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: FF, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, color: GOLD, marginBottom: 20 }}>Wer entscheidet?</span>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.08, margin: '0 0 24px' }}>
            UNABHÄNGIGE EXPERTISE FÜR DEN MITTELSTAND.
          </h2>
          <div style={{ width: 40, height: 2, background: GOLD }} />
          <p style={{ marginTop: 24, fontFamily: FB, fontSize: 19, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85 }}>
            Die Jury des Bayerischen Mittelstandspreises besteht ausschließlich aus ehrenamtlich tätigen Expertinnen und Experten. Kein Mitglied steht in wirtschaftlicher Verbindung zu einem Bewerber — Transparenz und Unparteilichkeit sind die Grundpfeiler unseres Verfahrens.
          </p>
        </div>
      </section>


      {/* ── 4. JURY-MITGLIEDER ───────────────────────────────────────────────── */}
      <section id="jury" style={{ background: NAVY, overflow: 'hidden', position: 'relative' }}>
        <div style={{ padding: isMobile ? '48px 24px 32px' : '80px 80px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 48, alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <span style={{ fontFamily: FF, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, color: GOLD, display: 'block', marginBottom: 16 }}>Das Gremium</span>
            <h2 style={{ fontFamily: FF, fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 0.95, margin: 0 }}>UNSERE JURY 2026</h2>
          </div>
          <p style={{ fontFamily: FB, fontSize: 19, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, margin: 0 }}>
            Vier Expertinnen und Experten aus Wirtschaft, Wissenschaft und Verbänden — für einen vollständig unabhängigen Bewertungsprozess.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)' }}>
          {juryMembers.map((member, idx) => (
            <JuryCard key={idx} member={member} idx={idx} />
          ))}
        </div>
      </section>


      {/* ── 5. HINTERGRUND & EXPERTISE ───────────────────────────────────────── */}
      <section style={{ background: '#101828', overflow: 'hidden', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ padding: isMobile ? '48px 24px' : 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#101828' }}>
          <span style={{ fontFamily: FF, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, color: GOLD, display: 'block', marginBottom: 16 }}>Hintergrund &amp; Expertise</span>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.0, margin: '0 0 24px' }}>WIE BEWERTET DIE JURY?</h2>
          <div style={{ width: 40, height: 2, background: GOLD, marginBottom: 40 }} />
          <div>
            {expertiseRows.map((row) => (
              <div key={row.num} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '0 20px', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                <div style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(239,191,4,0.5)' }}>{row.num}</div>
                <div>
                  <div style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontFamily: FB, fontSize: 18, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{row.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: isMobile ? '48px 24px' : '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.07)', borderTop: isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none', overflow: 'hidden', background: '#101828' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(60px, 8vw, 120px)', color: 'rgba(239,191,4,0.1)', lineHeight: 0.8, display: 'block', marginBottom: -20 }}>&ldquo;</span>
          <p style={{ fontFamily: FF, fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: '0 0 40px' }}>
            Die Jury des BMP ist vollständig von wirtschaftlichen Interessen unabhängig. Jede Entscheidung wird transparent nachvollzogen — das ist unser Versprechen an die Unternehmen Bayerns.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 2, background: GOLD, flexShrink: 0 }} />
            <span style={{ fontFamily: FF, fontSize: 17, color: 'rgba(255,255,255,0.4)' }}>Prof. Dr. Klaus Bergmann, Juryvorsitzender</span>
          </div>
        </div>
      </section>


      {/* ── 6. PARTNER & SPONSOREN ───────────────────────────────────────────── */}
      <section id="partner" style={{ background: CREAM, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        <MunichSkylineBg />
        <div style={{ padding: isMobile ? '48px 24px 32px' : '80px 80px 56px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0, justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', borderBottom: '1px solid rgba(3,9,58,0.1)' }}>
          <div>
            <span style={{ fontFamily: FF, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, color: '#4A8FC9', display: 'block', marginBottom: 16 }}>Netzwerkqualität</span>
            <h2 style={{ fontFamily: FF, fontWeight: 900, color: '#101828', textTransform: 'uppercase', letterSpacing: '-0.025em', fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 0.95, margin: 0 }}>PARTNER &amp; SPONSOREN.</h2>
          </div>
          <p style={{ fontFamily: FB, fontSize: 18, color: 'rgba(16,24,40,0.4)', maxWidth: isMobile ? '100%' : 200, textAlign: isMobile ? 'left' : 'right', lineHeight: 1.6, margin: 0 }}>
            Ein starkes Netzwerk für einen starken Mittelstand. Klicken für Details.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)' }}>
          {partners.map((partner, idx) => (
            <PartnerCell key={partner.id} partner={partner} idx={idx} onClick={() => setSelectedPartner(partner)} />
          ))}
        </div>
      </section>


      {/* ── 7. SPONSORING-FORM ───────────────────────────────────────────────── */}
      <section id="sponsoring" style={{
        background: NAVY, overflow: 'hidden', position: 'relative',
        height: isMobile ? 'auto' : 'calc(100vh - 60px)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '4fr 1px 8fr', minHeight: 0, overflow: 'hidden' }}>
          {/* Left — pitch */}
          <div style={{ padding: isMobile ? '32px 24px 24px' : '36px 36px 32px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ fontFamily: FF, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, color: GOLD, display: 'block', marginBottom: 8 }}>Wachstum durch Partnerschaft</span>
            <h2 style={{ fontFamily: FF, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', lineHeight: 1.0, margin: '0 0 12px' }}>WIR FREUEN UNS ÜBER NEUE SPONSOREN.</h2>
            <div style={{ width: 36, height: 2, background: GOLD, margin: '0 0 14px', flexShrink: 0 }} />
            <p style={{ fontFamily: FB, fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 16 }}>
              Positionieren Sie Ihre Marke im exklusivsten Netzwerk des bayerischen Mittelstands — mit maßgeschneiderten Sponsoring-Paketen.
            </p>
            {[
              { num: '01', label: 'Markenpräsenz', sub: 'Bühne, Drucksachen, digitale Kanäle' },
              { num: '02', label: 'Top-Entscheider', sub: 'Exklusives Netzwerk-Dinner für Partner' },
              { num: '03', label: 'Multichannel', sub: 'Online, Print, Radio & TV-Partner' },
            ].map((item) => (
              <div key={item.num} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(239,191,4,0.5)' }}>{item.num}</span>
                <div>
                  <div style={{ fontFamily: FF, fontSize: 'clamp(14px, 1.05vw, 16px)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: FB, fontSize: 'clamp(13px, 1vw, 15px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Center divider */}
          {!isMobile && <div style={{ background: 'rgba(255,255,255,0.07)' }} />}
          {/* Right — gold form panel */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0, position: 'relative', background: 'linear-gradient(160deg,#DDB84A 0%,#C9A227 52%,#A87800 100%)' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
              <defs>
                <pattern id="sponsoringCross" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L18,18 M18,0 L0,18" stroke="rgba(17,29,85,0.055)" strokeWidth="0.65" />
                </pattern>
                <pattern id="sponsoringDiamond" width="36" height="36" patternUnits="userSpaceOnUse">
                  <polygon points="18,2 34,18 18,34 2,18" fill="none" stroke="rgba(17,29,85,0.045)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sponsoringCross)" />
              <rect width="100%" height="100%" fill="url(#sponsoringDiamond)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(100,70,0,0.25) 100%)', pointerEvents: 'none', zIndex: 0 }} />

            {!isMobile && (
              <div style={{ height: 220, position: 'relative', overflow: 'hidden', flexShrink: 0, zIndex: 1 }}>
                <img src="/images/networking-innenhof.jpg" alt="BMP Partnernetzwerk" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'sepia(0.18) brightness(0.92)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(168,120,0,0.1) 0%, rgba(168,120,0,0.25) 50%, rgba(168,120,0,0.92) 88%, #A87800 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(17,29,85,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 14, left: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(17,29,85,0.7)' }} />
                  <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: 'rgba(17,29,85,0.75)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>BMP Partnernetzwerk</span>
                </div>
              </div>
            )}
            <div style={{ padding: isMobile ? '32px 24px' : '24px 48px 32px 40px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', zIndex: 1 }}>
              <span style={{ fontFamily: FF, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.32em', fontWeight: 700, color: 'rgba(17,29,85,0.5)', display: 'block', marginBottom: 8 }}>Sponsoring 2026</span>
              <SponsoringForm theme="gold" />
            </div>
          </div>
        </div>
        {/* Footnote */}
        <div style={{ position: 'relative', zIndex: 1, padding: '14px 56px 18px', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.45)', marginRight: 10 }}>Oder:</span>
          <Link
            to="/mitglied-werden"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: 15,
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
            Vereinsmitglied werden <ChevronRight size={11} />
          </Link>
        </div>
        <div style={{ position: 'relative', zIndex: 1, height: 2, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.3), transparent)`, flexShrink: 0 }} />
      </section>


      {/* ── 8. PARTNER MODAL ─────────────────────────────────────────────────── */}
      {selectedPartner && (
        <PartnerModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />
      )}

    </div>
  );
};

export default Netzwerk;
