import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Layers, Building2, Mail } from 'lucide-react';

const FF = '"IBM Plex Sans", sans-serif';

const DARK = {
  border:         'rgba(255,255,255,0.12)',
  borderActive:   'rgba(239,191,4,0.8)',
  progressBg:     'rgba(255,255,255,0.06)',
  progressFill:   '#EFBF04',
  stepActive:     '#fff',
  stepDone:       '#EFBF04',
  stepInactive:   'rgba(255,255,255,0.2)',
  stepActiveBg:   'rgba(239,191,4,0.07)',
  stepUnderline:  '#EFBF04',
  accentLabel:    'rgba(239,191,4,0.8)',
  heading:        '#fff',
  inputBg:        'rgba(255,255,255,0.05)',
  inputBgFocus:   'rgba(255,255,255,0.08)',
  inputBorder:    'rgba(255,255,255,0.18)',
  inputBorderFoc: 'rgba(239,191,4,0.8)',
  inputText:      '#fff',
  labelText:      'rgba(255,255,255,0.5)',
  errorText:      '#f87171',
  cardBg:         'rgba(255,255,255,0.05)',
  cardBgSel:      'rgba(239,191,4,0.08)',
  cardBorder:     'rgba(255,255,255,0.12)',
  cardBorderSel:  '#EFBF04',
  cardTitle:      '#fff',
  cardTitleSel:   '#EFBF04',
  cardDesc:       'rgba(255,255,255,0.65)',
  radioFill:      '#EFBF04',
  btnBg:          '#EFBF04',
  btnBgHover:     '#FFD130',
  btnText:        '#101828',
  backText:       'rgba(255,255,255,0.35)',
  backTextHover:  '#fff',
  successIcon:    '#EFBF04',
  successIconIn:  '#111D55',
  successHeading: '#fff',
  successBody:    'rgba(255,255,255,0.45)',
  footerText:     'rgba(255,255,255,0.3)',
};

const GOLD = {
  border:         'rgba(17,29,85,0.15)',
  borderActive:   '#111D55',
  progressBg:     'rgba(17,29,85,0.1)',
  progressFill:   '#111D55',
  stepActive:     '#111D55',
  stepDone:       'rgba(17,29,85,0.55)',
  stepInactive:   'rgba(17,29,85,0.28)',
  stepActiveBg:   'rgba(17,29,85,0.07)',
  stepUnderline:  '#111D55',
  accentLabel:    'rgba(17,29,85,0.5)',
  heading:        '#111D55',
  inputBg:        'rgba(255,255,255,0.5)',
  inputBgFocus:   'rgba(255,255,255,0.9)',
  inputBorder:    'rgba(17,29,85,0.18)',
  inputBorderFoc: '#111D55',
  inputText:      '#111D55',
  labelText:      'rgba(17,29,85,0.5)',
  errorText:      '#b91c1c',
  cardBg:         'rgba(255,255,255,0.38)',
  cardBgSel:      'rgba(17,29,85,0.1)',
  cardBorder:     'rgba(17,29,85,0.2)',
  cardBorderSel:  '#111D55',
  cardTitle:      '#111D55',
  cardTitleSel:   '#111D55',
  cardDesc:       'rgba(17,29,85,0.6)',
  radioFill:      '#111D55',
  btnBg:          '#111D55',
  btnBgHover:     '#051A87',
  btnText:        '#fff',
  backText:       'rgba(17,29,85,0.4)',
  backTextHover:  '#111D55',
  successIcon:    '#111D55',
  successIconIn:  '#EFBF04',
  successHeading: '#111D55',
  successBody:    'rgba(17,29,85,0.6)',
  footerText:     'rgba(17,29,85,0.4)',
};

type C = typeof DARK;

type FormData = {
  paket: string;
  unternehmen: string;
  branche: string;
  kontakt: string;
  email: string;
};

const STEPS = [
  { label: 'Paket',       icon: Layers    },
  { label: 'Unternehmen', icon: Building2 },
  { label: 'Kontakt',     icon: Mail      },
];

const PAKETE = [
  { value: 'main',     title: 'Haupt-Sponsoring',  desc: 'Maximale Sichtbarkeit auf allen Kanälen — Bühne, Digital, Print.' },
  { value: 'category', title: 'Kategorie-Partner', desc: 'Namensgebung einer Auszeichnungskategorie — fokussiertes Branding.' },
  { value: 'event',    title: 'Event-Partner',      desc: 'Präsenz beim exklusiven Gala-Abend in München.' },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ?  40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 :  40, opacity: 0 }),
};

function Field({ c, label, error, children }: { c: C; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: FF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: c.labelText }}>{label}</label>
      {children}
      {error && <span style={{ fontFamily: FF, fontSize: 11, color: c.errorText }}>{error}</span>}
    </div>
  );
}

function StyledInput({ c, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { c: C }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={e => { setFocused(true);  props.onFocus?.(e); }}
      onBlur ={e => { setFocused(false); props.onBlur?.(e);  }}
      style={{
        width: '100%', height: 44, padding: '0 14px',
        fontFamily: FF, fontSize: 14, color: c.inputText,
        border: `1px solid ${focused ? c.inputBorderFoc : c.inputBorder}`,
        background: focused ? c.inputBgFocus : c.inputBg,
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s, background 0.15s',
        ...props.style,
      }}
    />
  );
}

function PaketCard({ c, pkg, selected, onClick }: { c: C; pkg: typeof PAKETE[0]; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      width: '100%', padding: '13px 18px', textAlign: 'left', cursor: 'pointer',
      border: `2px solid ${selected ? c.cardBorderSel : c.cardBorder}`,
      background: selected ? c.cardBgSel : c.cardBg,
      fontFamily: FF, transition: 'all 0.15s',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: selected ? c.cardTitleSel : c.cardTitle, marginBottom: 5 }}>{pkg.title}</div>
        <div style={{ fontSize: 13, color: c.cardDesc, lineHeight: 1.45 }}>{pkg.desc}</div>
      </div>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2,
        border: `2px solid ${selected ? c.cardBorderSel : c.cardBorder}`,
        background: selected ? c.radioFill : 'transparent',
        transition: 'all 0.15s',
      }} />
    </button>
  );
}

export default function SponsoringForm({ theme = 'dark' }: { theme?: 'dark' | 'gold' }) {
  const c = theme === 'gold' ? GOLD : DARK;
  const [step, setStep]           = useState(0);
  const [dir,  setDir]            = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData]           = useState<FormData>({ paket: '', unternehmen: '', branche: '', kontakt: '', email: '' });
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (k: keyof FormData, v: string) => {
    setData(d => ({ ...d, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: typeof errors = {};
    if (step === 0 && !data.paket)       e.paket = 'Bitte wählen Sie ein Paket.';
    if (step === 1 && !data.unternehmen) e.unternehmen = 'Pflichtfeld';
    if (step === 2) {
      if (!data.kontakt) e.kontakt = 'Pflichtfeld';
      if (!data.email)   e.email   = 'Pflichtfeld';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Ungültige E-Mail';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next   = () => { if (validate()) { setDir(1);  setStep(s => s + 1); } };
  const prev   = () => {                   setDir(-1); setStep(s => s - 1); };
  const submit = () => { if (validate()) setSubmitted(true); };

  const progress = (step / (STEPS.length - 1)) * 100;

  if (submitted) {
    return (
      <div style={{ padding: '64px 28px', textAlign: 'center', fontFamily: FF }}>
        <div style={{ width: 52, height: 52, background: c.successIcon, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={22} color={c.successIconIn} strokeWidth={3} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: c.successHeading, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 10 }}>
          Anfrage eingegangen
        </h3>
        <p style={{ fontSize: 12, color: c.successBody, maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>
          Vielen Dank, <strong style={{ color: c.successHeading }}>{data.kontakt}</strong>. Wir senden Ihnen unser Sponsoring-Exposé innerhalb von 48 Stunden zu.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Progress bar */}
      <div style={{ height: 2, background: c.progressBg, flexShrink: 0 }}>
        <div style={{ height: '100%', background: c.progressFill, width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Step tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i < step, active = i === step;
          return (
            <div key={i} style={{
              flex: 1, padding: '10px 4px', textAlign: 'center', fontFamily: FF, fontSize: 9,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              color: active ? c.stepActive : done ? c.stepDone : c.stepInactive,
              borderBottom: active ? `2px solid ${c.stepUnderline}` : '2px solid transparent',
              background: active ? c.stepActiveBg : 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              marginBottom: -1, transition: 'color 0.2s',
            }}>
              <Icon size={11} strokeWidth={active ? 2 : 1.5} />
              <span>{done ? '✓' : s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 0', flex: 1, minHeight: 0, overflowX: 'hidden', overflowY: 'auto' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}>

            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Schritt 1 — Paket wählen</p>
                  <h3 style={{ fontFamily: FF, fontSize: 18, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 12 }}>Interesse an</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {PAKETE.map(pkg => (
                    <PaketCard key={pkg.value} c={c} pkg={pkg} selected={data.paket === pkg.value} onClick={() => set('paket', pkg.value)} />
                  ))}
                </div>
                {errors.paket && <p style={{ fontFamily: FF, fontSize: 11, color: c.errorText, marginTop: 4 }}>{errors.paket}</p>}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 8 }}>Schritt 2 — Unternehmen</p>
                  <h3 style={{ fontFamily: FF, fontSize: 18, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Ihr Unternehmen</h3>
                </div>
                <Field c={c} label="Unternehmen *" error={errors.unternehmen}>
                  <StyledInput c={c} value={data.unternehmen} onChange={e => set('unternehmen', e.target.value)} placeholder="Firmenname" />
                </Field>
                <Field c={c} label="Branche">
                  <StyledInput c={c} value={data.branche} onChange={e => set('branche', e.target.value)} placeholder="z. B. Finanzdienstleistungen" />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 8 }}>Schritt 3 — Kontakt</p>
                  <h3 style={{ fontFamily: FF, fontSize: 18, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Ansprechpartner</h3>
                </div>
                <Field c={c} label="Ansprechpartner *" error={errors.kontakt}>
                  <StyledInput c={c} value={data.kontakt} onChange={e => set('kontakt', e.target.value)} placeholder="Vor- und Nachname" />
                </Field>
                <Field c={c} label="E-Mail *" error={errors.email}>
                  <StyledInput c={c} type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="name@unternehmen.de" />
                </Field>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{ paddingTop: 14, borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        {step > 0 ? (
          <button type="button" onClick={prev} style={{
            fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            color: c.backText, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, padding: 0, transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = c.backTextHover)}
            onMouseLeave={e => (e.currentTarget.style.color = c.backText)}
          >
            <ArrowLeft size={13} /> Zurück
          </button>
        ) : <div />}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} style={{
            fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            color: c.btnText, background: c.btnBg, border: 'none', cursor: 'pointer',
            padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c.btnBgHover; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c.btnBg; }}
          >
            Weiter <ArrowRight size={13} />
          </button>
        ) : (
          <button type="button" onClick={submit} style={{
            fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            color: c.btnText, background: c.btnBg, border: 'none', cursor: 'pointer',
            padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c.btnBgHover; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c.btnBg; }}
          >
            Exposé anfordern <ArrowRight size={13} />
          </button>
        )}
      </div>

      <p style={{ fontFamily: FF, textAlign: 'center', fontSize: 12, color: c.footerText, paddingTop: 12 }}>
        Wir melden uns innerhalb von 48 Stunden.
      </p>
    </div>
  );
}
