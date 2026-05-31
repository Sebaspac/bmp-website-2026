import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Trophy, User, Send, Building2, AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';

/* ── Theme definitions ─────────────────────────────────────────────────── */

const DARK = {
  outerBg:           'transparent',
  outerBgImage:      'none',
  border:            'rgba(255,255,255,0.12)',
  borderActive:      'rgba(239,191,4,0.8)',
  progressBg:        'rgba(255,255,255,0.1)',
  progressFill:      'linear-gradient(to right,#EFBF04,rgba(239,191,4,0.75))',
  progressGlow:      '0 0 8px rgba(239,191,4,0.6)',
  stepActive:        '#fff',
  stepDone:          '#EFBF04',
  stepInactive:      'rgba(255,255,255,0.25)',
  stepActiveBg:      'rgba(239,191,4,0.07)',
  stepUnderline:     '#EFBF04',
  accentLabel:       'rgba(239,191,4,0.8)',
  heading:           '#fff',
  inputBg:           'rgba(255,255,255,0.05)',
  inputBgFocus:      'rgba(255,255,255,0.08)',
  inputBorder:       'rgba(255,255,255,0.18)',
  inputText:         '#fff',
  inputPlaceholder:  'rgba(255,255,255,0.35)',
  fieldLabel:        'rgba(255,255,255,0.45)',
  fieldError:        '#f87171',
  cardBg:            'rgba(255,255,255,0.06)',
  cardBgSelected:    'rgba(239,191,4,0.1)',
  cardBorder:        'rgba(255,255,255,0.22)',
  cardBorderSel:     '#EFBF04',
  cardText:          '#fff',
  cardTextSel:       '#EFBF04',
  cardDesc:          'rgba(255,255,255,0.65)',
  optBg:             'rgba(255,255,255,0.05)',
  optBgSel:          'rgba(239,191,4,0.12)',
  optBorder:         'rgba(255,255,255,0.22)',
  optBorderSel:      '#EFBF04',
  optText:           'rgba(255,255,255,0.7)',
  optTextSel:        '#EFBF04',
  bodyText:          'rgba(255,255,255,0.6)',
  mutedText:         'rgba(255,255,255,0.35)',
  rowLabel:          'rgba(255,255,255,0.35)',
  rowValue:          '#fff',
  alertIcon:         '#EFBF04',
  alertTitle:        '#EFBF04',
  alertEmail:        '#EFBF04',
  btnBg:             '#EFBF04',
  btnBgHover:        '#FFD130',
  btnText:           '#101828',
  backText:          'rgba(255,255,255,0.35)',
  backTextHover:     '#fff',
  successIcon:       '#EFBF04',
  successIconInner:  '#111D55',
  successHeading:    '#fff',
  successBody:       'rgba(255,255,255,0.55)',
  successName:       '#fff',
  successAccent:     '#EFBF04',
};

const GOLD = {
  outerBg:           'transparent',
  outerBgImage:      'none',
  border:            'rgba(17,29,85,0.15)',
  borderActive:      '#111D55',
  progressBg:        'rgba(17,29,85,0.12)',
  progressFill:      'linear-gradient(to right,#111D55,#051A87)',
  progressGlow:      'none',
  stepActive:        '#111D55',
  stepDone:          'rgba(17,29,85,0.55)',
  stepInactive:      'rgba(17,29,85,0.28)',
  stepActiveBg:      'rgba(17,29,85,0.07)',
  stepUnderline:     '#111D55',
  accentLabel:       'rgba(17,29,85,0.5)',
  heading:           '#111D55',
  inputBg:           'rgba(255,255,255,0.5)',
  inputBgFocus:      'rgba(255,255,255,0.9)',
  inputBorder:       'rgba(17,29,85,0.18)',
  inputText:         '#111D55',
  inputPlaceholder:  'rgba(17,29,85,0.35)',
  fieldLabel:        'rgba(17,29,85,0.5)',
  fieldError:        '#b91c1c',
  cardBg:            'rgba(255,255,255,0.38)',
  cardBgSelected:    'rgba(17,29,85,0.1)',
  cardBorder:        'rgba(17,29,85,0.2)',
  cardBorderSel:     '#111D55',
  cardText:          '#111D55',
  cardTextSel:       '#111D55',
  cardDesc:          'rgba(17,29,85,0.6)',
  optBg:             'rgba(255,255,255,0.4)',
  optBgSel:          'rgba(17,29,85,0.1)',
  optBorder:         'rgba(17,29,85,0.2)',
  optBorderSel:      '#111D55',
  optText:           'rgba(17,29,85,0.65)',
  optTextSel:        '#111D55',
  bodyText:          'rgba(17,29,85,0.65)',
  mutedText:         'rgba(17,29,85,0.4)',
  rowLabel:          'rgba(17,29,85,0.4)',
  rowValue:          '#111D55',
  alertIcon:         '#111D55',
  alertTitle:        '#111D55',
  alertEmail:        '#111D55',
  btnBg:             '#111D55',
  btnBgHover:        '#051A87',
  btnText:           '#fff',
  backText:          'rgba(17,29,85,0.4)',
  backTextHover:     '#111D55',
  successIcon:       '#111D55',
  successIconInner:  '#EFBF04',
  successHeading:    '#111D55',
  successBody:       'rgba(17,29,85,0.6)',
  successName:       '#111D55',
  successAccent:     '#111D55',
};

type C = typeof DARK;

/* ── Data / Steps ─────────────────────────────────────────────────────── */

type FormData = {
  type: 'selbst' | 'vorschlag' | '';
  mitarbeiter: string;
  standortBayern: 'ja' | 'nein' | '';
  familiengeführt: 'ja' | 'nein' | '';
  firmenname: string;
  kontaktName: string;
  email: string;
  telefon: string;
  nomFirma: string;
  nomBranche: string;
  nomStandort: string;
  nomName: string;
  nomEmail: string;
  nomBeziehung: string;
};

const STEPS_SELBST = [
  { label: 'Einreichung',  icon: Trophy   },
  { label: 'Schnell-Check',icon: Check    },
  { label: 'Kontakt',      icon: User     },
  { label: 'Absenden',     icon: Send     },
];

const STEPS_VORSCHLAG = [
  { label: 'Einreichung',  icon: Trophy   },
  { label: 'Unternehmen',  icon: Building2},
  { label: 'Nominierender',icon: User     },
  { label: 'Absenden',     icon: Send     },
];

const MITARBEITER_OPTIONS = [
  { value: 'unter10', label: 'Unter 10'  },
  { value: '10-50',   label: '10 – 50'  },
  { value: '51-200',  label: '51 – 200' },
  { value: '201-500', label: '201 – 500'},
  { value: 'über500', label: 'Über 500' },
];

const variants = {
  enter:  (dir: number) => ({ x: dir > 0 ?  40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 :  40, opacity: 0 }),
};

/* ── Sub-components ───────────────────────────────────────────────────── */

function Field({ label, error, children, optional, c }: {
  label: string; error?: string; children: React.ReactNode; optional?: boolean; c: C;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: c.fieldLabel }}>
        {label}{!optional && ' *'}
      </label>
      {children}
      {error && <span style={{ fontFamily: FF, fontSize: 11, color: c.fieldError }}>{error}</span>}
    </div>
  );
}

function StyledInput({ c, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { c: C }) {
  const [focused, setFocused] = useState(false);
  const isMobile = useIsMobile();
  return (
    <input
      {...props}
      onFocus={e => { setFocused(true);  props.onFocus?.(e); }}
      onBlur ={e => { setFocused(false); props.onBlur?.(e);  }}
      style={{
        width: '100%', height: isMobile ? 44 : 38, padding: isMobile ? '0 14px' : '0 12px',
        fontFamily: FF, fontSize: isMobile ? 16 : 13, color: c.inputText,
        border: `1px solid ${focused ? c.borderActive : c.inputBorder}`,
        background: focused ? c.inputBgFocus : c.inputBg,
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s,background 0.15s',
        ...props.style,
      }}
    />
  );
}

function TypeCard({ selected, onClick, title, desc, c }: {
  selected: boolean; onClick: () => void; title: string; desc: string; c: C;
}) {
  return (
    <button type="button" onClick={onClick} style={{
      flex: 1, padding: '13px 12px', textAlign: 'left', cursor: 'pointer',
      border: `1.5px solid ${selected ? c.cardBorderSel : c.cardBorder}`,
      background: selected ? c.cardBgSelected : c.cardBg,
      fontFamily: FF, transition: 'all 0.15s',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: selected ? c.cardTextSel : c.cardText }}>{title}</span>
        <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${selected ? c.cardBorderSel : c.border}`, background: selected ? c.cardBorderSel : 'transparent', transition: 'all 0.15s' }} />
      </div>
      <span style={{ fontSize: 13, color: c.cardDesc, lineHeight: 1.5 }}>{desc}</span>
    </button>
  );
}

function OptionButton({ selected, onClick, label, c, style }: {
  selected: boolean; onClick: () => void; label: string; c: C; style?: React.CSSProperties;
}) {
  const isMobile = useIsMobile();
  return (
    <button type="button" onClick={onClick} style={{
      padding: isMobile ? '12px 18px' : '8px 16px', minHeight: isMobile ? 44 : undefined,
      fontFamily: FF, fontSize: isMobile ? 14 : 12, fontWeight: 600, cursor: 'pointer',
      border: `1.5px solid ${selected ? c.optBorderSel : c.optBorder}`,
      background: selected ? c.optBgSel : c.optBg,
      color: selected ? c.optTextSel : c.optText,
      transition: 'all 0.15s',
      ...style,
    }}>
      {label}
    </button>
  );
}

function YesNo({ value, onChange, c }: {
  value: 'ja' | 'nein' | ''; onChange: (v: 'ja' | 'nein') => void; c: C;
}) {
  const isMobile = useIsMobile();
  const flexStyle = isMobile ? { flex: 1 } : undefined;
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <OptionButton selected={value === 'ja'}   onClick={() => onChange('ja')}   label="Ja"   c={c} style={flexStyle} />
      <OptionButton selected={value === 'nein'} onClick={() => onChange('nein')} label="Nein" c={c} style={flexStyle} />
    </div>
  );
}

function isEligible(data: FormData) {
  return ['10-50', '51-200', '201-500'].includes(data.mitarbeiter) && data.standortBayern === 'ja';
}

/* ── Main component ───────────────────────────────────────────────────── */

export default function BewerbungsForm({ theme = 'dark' }: { theme?: 'dark' | 'gold' }) {
  const c = theme === 'gold' ? GOLD : DARK;
  const isMobile = useIsMobile();

  const [step, setStep]       = useState(0);
  const [dir,  setDir]        = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData]       = useState<FormData>({
    type: '', mitarbeiter: '', standortBayern: '', familiengeführt: '',
    firmenname: '', kontaktName: '', email: '', telefon: '',
    nomFirma: '', nomBranche: '', nomStandort: '',
    nomName: '', nomEmail: '', nomBeziehung: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const STEPS    = data.type === 'vorschlag' ? STEPS_VORSCHLAG : STEPS_SELBST;
  const progress = step === 0 ? 0 : (step / (STEPS.length - 1)) * 100;

  const set = (k: keyof FormData, v: string) => {
    setData(d => ({ ...d, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (data.type === 'selbst') {
      if (step === 1) {
        if (!data.mitarbeiter)    e.mitarbeiter    = 'Bitte wählen';
        if (!data.standortBayern) e.standortBayern = 'Bitte wählen';
        if (!data.familiengeführt)e.familiengeführt= 'Bitte wählen';
      }
      if (step === 2) {
        if (!data.firmenname)  e.firmenname  = 'Pflichtfeld';
        if (!data.kontaktName) e.kontaktName = 'Pflichtfeld';
        if (!data.email)       e.email       = 'Pflichtfeld';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Ungültige E-Mail';
      }
    } else {
      if (step === 1) {
        if (!data.nomFirma)   e.nomFirma   = 'Pflichtfeld';
        if (!data.nomBranche) e.nomBranche = 'Pflichtfeld';
      }
      if (step === 2) {
        if (!data.nomName)  e.nomName  = 'Pflichtfeld';
        if (!data.nomEmail) e.nomEmail = 'Pflichtfeld';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.nomEmail)) e.nomEmail = 'Ungültige E-Mail';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next   = () => { if (validate()) { setDir(1);  setStep(s => s + 1); } };
  const prev   = () => {                   setDir(-1); setStep(s => s - 1);   };
  const submit = () => { if (validate()) setSubmitted(true); };

  if (submitted) {
    return (
      <div style={{ fontFamily: FF, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, borderTop: `1px solid ${c.border}`, background: c.outerBg, backgroundImage: c.outerBgImage }}>
        <div style={{ padding: '48px 28px', textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, background: c.successIcon, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={22} color={c.successIconInner} strokeWidth={3} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: c.successHeading, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 10 }}>
            {data.type === 'selbst' ? 'Anfrage eingegangen' : 'Nominierung eingegangen'}
          </h3>
          <p style={{ fontSize: 13, color: c.successBody, maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
            {data.type === 'selbst'
              ? <><span>Vielen Dank, </span><strong style={{ color: c.successName }}>{data.firmenname}</strong><span>. Wir senden Ihnen den vollständigen Fragebogen an </span><strong style={{ color: c.successAccent }}>{data.email}</strong>.</>
              : <><span>Vielen Dank, </span><strong style={{ color: c.successName }}>{data.nomName}</strong><span>. Wir nehmen Kontakt mit </span><strong style={{ color: c.successAccent }}>{data.nomFirma}</strong><span> auf und informieren sie über Ihre Nominierung.</span></>
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, borderTop: `1px solid ${c.border}`, background: c.outerBg, backgroundImage: c.outerBgImage }}>

      {/* Progress bar */}
      <div style={{ height: 3, background: c.progressBg, flexShrink: 0 }}>
        <div style={{ height: '100%', backgroundImage: c.progressFill, width: `${progress}%`, transition: 'width 0.4s ease', boxShadow: c.progressGlow }} />
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
        {STEPS.map((s, i) => {
          const Icon   = s.icon;
          const done   = i < step;
          const active = i === step;
          return (
            <div key={i} style={{
              flex: 1, padding: '8px 4px', textAlign: 'center', fontFamily: FF, fontSize: 9,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              color: active ? c.stepActive : done ? c.stepDone : c.stepInactive,
              borderBottom: active ? `2px solid ${c.stepUnderline}` : '2px solid transparent',
              background: active ? c.stepActiveBg : 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              marginBottom: -1, transition: 'color 0.2s',
            }}>
              <Icon size={11} strokeWidth={active ? 2 : 1.5} />
              <span>{done ? '✓' : s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? '18px 20px' : '20px 28px', flex: 1, minHeight: 0, overflowX: 'hidden', overflowY: 'auto' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`${step}-${data.type}`} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}>

            {/* ── Step 0: Typ-Wahl ── */}
            {step === 0 && (
              <div>
                <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 8 }}>Schritt 1</p>
                <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 14 }}>Art der Einreichung</h3>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8 }}>
                  <TypeCard c={c} selected={data.type === 'selbst'} title="Eigenbewerbung"
                    desc="Ich bewerbe mein eigenes Unternehmen für den Bayerischen Mittelstandspreis."
                    onClick={() => { set('type', 'selbst'); setDir(1); setStep(1); }} />
                  <TypeCard c={c} selected={data.type === 'vorschlag'} title="Vorschlag"
                    desc="Ich schlage ein anderes Unternehmen vor, das den Preis verdient."
                    onClick={() => { set('type', 'vorschlag'); setDir(1); setStep(1); }} />
                </div>
              </div>
            )}

            {/* ── Eigenbewerbung Step 1: Schnell-Check ── */}
            {step === 1 && data.type === 'selbst' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Schnell-Check</p>
                  <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Grundlegende Eignung</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: c.fieldLabel }}>Wie viele Mitarbeiter hat Ihr Unternehmen? *</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {MITARBEITER_OPTIONS.map(o => (
                        <OptionButton c={c} key={o.value} selected={data.mitarbeiter === o.value} onClick={() => set('mitarbeiter', o.value)} label={o.label} />
                      ))}
                    </div>
                    {errors.mitarbeiter && <span style={{ fontFamily: FF, fontSize: 11, color: c.fieldError }}>{errors.mitarbeiter}</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: c.fieldLabel }}>Hat Ihr Unternehmen seinen Sitz in Bayern? *</label>
                    <YesNo c={c} value={data.standortBayern} onChange={v => set('standortBayern', v)} />
                    {errors.standortBayern && <span style={{ fontFamily: FF, fontSize: 11, color: c.fieldError }}>{errors.standortBayern}</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: c.fieldLabel }}>Ist Ihr Unternehmen inhabergeführt oder familiengeführt? *</label>
                    <YesNo c={c} value={data.familiengeführt} onChange={v => set('familiengeführt', v)} />
                    {errors.familiengeführt && <span style={{ fontFamily: FF, fontSize: 11, color: c.fieldError }}>{errors.familiengeführt}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* ── Eigenbewerbung Step 2: Kontakt / Ineligible ── */}
            {step === 2 && data.type === 'selbst' && (() => {
              if (!isEligible(data)) return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AlertCircle size={18} color={c.alertIcon} />
                    <h3 style={{ fontFamily: FF, fontSize: 15, fontWeight: 800, color: c.alertTitle, textTransform: 'uppercase' }}>Leider nicht förderfähig</h3>
                  </div>
                  <p style={{ fontFamily: FF, fontSize: 13, color: c.bodyText, lineHeight: 1.7 }}>
                    Der Bayerische Mittelstandspreis richtet sich an inhabergeführte Unternehmen mit 10–500 Mitarbeitern und Sitz in Bayern. Ihr Unternehmen erfüllt diese Voraussetzungen aktuell nicht.
                  </p>
                  <p style={{ fontFamily: FF, fontSize: 13, color: c.mutedText, lineHeight: 1.7 }}>
                    Fragen? Schreiben Sie uns: <span style={{ color: c.alertEmail }}>info@bmp-bayern.de</span>
                  </p>
                </div>
              );
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Kontakt</p>
                    <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Ihre Kontaktdaten</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                    <Field c={c} label="Firmenname" error={errors.firmenname}>
                      <StyledInput c={c} value={data.firmenname} onChange={e => set('firmenname', e.target.value)} placeholder="Muster GmbH" />
                    </Field>
                    <Field c={c} label="Ihr Name" error={errors.kontaktName}>
                      <StyledInput c={c} value={data.kontaktName} onChange={e => set('kontaktName', e.target.value)} placeholder="Vor- und Nachname" />
                    </Field>
                    <Field c={c} label="E-Mail" error={errors.email}>
                      <StyledInput c={c} type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="name@unternehmen.de" />
                    </Field>
                    <Field c={c} label="Telefon" optional>
                      <StyledInput c={c} type="tel" value={data.telefon} onChange={e => set('telefon', e.target.value)} placeholder="+49 89 ..." />
                    </Field>
                  </div>
                  <p style={{ fontFamily: FF, fontSize: 12, color: c.mutedText, lineHeight: 1.6 }}>
                    Wir senden Ihnen den vollständigen Fragebogen automatisch per E-Mail zu.
                  </p>
                </div>
              );
            })()}

            {/* ── Eigenbewerbung Step 3: Zusammenfassung ── */}
            {step === 3 && data.type === 'selbst' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Zusammenfassung</p>
                  <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Ihre Bewerbung</h3>
                </div>
                <div style={{ borderTop: `1px solid ${c.border}` }}>
                  {[
                    { label: 'Unternehmen', value: data.firmenname },
                    { label: 'Mitarbeiter', value: MITARBEITER_OPTIONS.find(o => o.value === data.mitarbeiter)?.label || '' },
                    { label: 'Standort',    value: `Bayern: ${data.standortBayern === 'ja' ? 'Ja' : 'Nein'}` },
                    { label: 'Kontakt',     value: `${data.kontaktName} · ${data.email}` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${c.border}`, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: c.rowLabel, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{row.label}</span>
                      <span style={{ fontFamily: FF, fontSize: 13, color: c.rowValue, overflowWrap: 'anywhere' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Vorschlag Step 1: Nominiertes Unternehmen ── */}
            {step === 1 && data.type === 'vorschlag' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Nominierung</p>
                  <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Nominiertes Unternehmen</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <Field c={c} label="Firmenname" error={errors.nomFirma}>
                    <StyledInput c={c} value={data.nomFirma} onChange={e => set('nomFirma', e.target.value)} placeholder="Muster GmbH" />
                  </Field>
                  <Field c={c} label="Branche" error={errors.nomBranche}>
                    <StyledInput c={c} value={data.nomBranche} onChange={e => set('nomBranche', e.target.value)} placeholder="z. B. Maschinenbau" />
                  </Field>
                  <Field c={c} label="Standort Bayern" optional>
                    <StyledInput c={c} value={data.nomStandort} onChange={e => set('nomStandort', e.target.value)} placeholder="z. B. München" />
                  </Field>
                </div>
              </div>
            )}

            {/* ── Vorschlag Step 2: Nominierender ── */}
            {step === 2 && data.type === 'vorschlag' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Nominierender</p>
                  <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Ihre Angaben</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <Field c={c} label="Ihr Name" error={errors.nomName}>
                    <StyledInput c={c} value={data.nomName} onChange={e => set('nomName', e.target.value)} placeholder="Vor- und Nachname" />
                  </Field>
                  <Field c={c} label="Ihre E-Mail" error={errors.nomEmail}>
                    <StyledInput c={c} type="email" value={data.nomEmail} onChange={e => set('nomEmail', e.target.value)} placeholder="ihre@email.de" />
                  </Field>
                  <Field c={c} label="Ihre Beziehung zum Unternehmen" optional>
                    <StyledInput c={c} value={data.nomBeziehung} onChange={e => set('nomBeziehung', e.target.value)} placeholder="z. B. Kunde, Partner, Bekannter" />
                  </Field>
                </div>
                <p style={{ fontFamily: FF, fontSize: 12, color: c.mutedText, lineHeight: 1.6 }}>
                  Wir nehmen Kontakt mit dem nominierten Unternehmen auf und informieren es über Ihre Nominierung.
                </p>
              </div>
            )}

            {/* ── Vorschlag Step 3: Zusammenfassung ── */}
            {step === 3 && data.type === 'vorschlag' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <p style={{ fontFamily: FF, fontSize: 10, color: c.accentLabel, textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, marginBottom: 6 }}>Zusammenfassung</p>
                  <h3 style={{ fontFamily: FF, fontSize: 16, fontWeight: 900, color: c.heading, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Ihre Nominierung</h3>
                </div>
                <div style={{ borderTop: `1px solid ${c.border}` }}>
                  {[
                    { label: 'Unternehmen',  value: data.nomFirma },
                    { label: 'Branche',      value: data.nomBranche },
                    { label: 'Standort',     value: data.nomStandort || '—' },
                    { label: 'Nominiert von',value: `${data.nomName} · ${data.nomEmail}` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, padding: '10px 0', borderBottom: `1px solid ${c.border}`, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: c.rowLabel, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{row.label}</span>
                      <span style={{ fontFamily: FF, fontSize: 13, color: c.rowValue, overflowWrap: 'anywhere' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step > 0 && (
        <div style={{ padding: isMobile ? '12px 20px' : '12px 28px', borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <button type="button" onClick={prev} style={{
            fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: c.backText, background: 'none',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
            padding: isMobile ? '12px 4px' : 0, minHeight: isMobile ? 44 : undefined,
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = c.backTextHover)}
            onMouseLeave={e => (e.currentTarget.style.color = c.backText)}
          >
            <ArrowLeft size={12} /> Zurück
          </button>

          {step < STEPS.length - 1 ? (
            step === 2 && data.type === 'selbst' && !isEligible(data) ? <div /> :
            <button type="button" onClick={next} style={{
              fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: c.btnText, background: c.btnBg,
              border: 'none', cursor: 'pointer', padding: isMobile ? '13px 24px' : '10px 22px',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c.btnBgHover; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c.btnBg; }}
            >
              Weiter <ArrowRight size={12} />
            </button>
          ) : (
            <button type="button" onClick={submit} style={{
              fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: c.btnText, background: c.btnBg,
              border: 'none', cursor: 'pointer', padding: isMobile ? '13px 24px' : '10px 22px',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c.btnBgHover; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c.btnBg; }}
            >
              Absenden <Send size={12} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
