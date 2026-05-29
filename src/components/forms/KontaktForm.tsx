import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, MessageSquare, User, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';

const DARK = {
  border:         'rgba(255,255,255,0.12)',
  borderActive:   'rgba(239,191,4,0.8)',
  progressBg:     'rgba(255,255,255,0.1)',
  progressFill:   '#EFBF04',
  stepActive:     '#fff',
  stepDone:       '#EFBF04',
  stepInactive:   'rgba(255,255,255,0.25)',
  stepActiveBg:   'rgba(239,191,4,0.07)',
  stepUnderline:  '#EFBF04',
  subtext:        'rgba(255,255,255,0.5)',
  inputBg:        'rgba(255,255,255,0.05)',
  inputBgFocus:   'rgba(255,255,255,0.09)',
  inputBorder:    'rgba(255,255,255,0.18)',
  inputBorderFoc: 'rgba(239,191,4,0.8)',
  inputText:      '#fff',
  labelText:      'rgba(255,255,255,0.45)',
  errorText:      '#f87171',
  cardBg:         'rgba(255,255,255,0.06)',
  cardBgSel:      'rgba(239,191,4,0.1)',
  cardBorder:     'rgba(255,255,255,0.22)',
  cardBorderSel:  '#EFBF04',
  cardTitle:      '#fff',
  cardTitleSel:   '#EFBF04',
  cardDesc:       'rgba(255,255,255,0.5)',
  radioBorder:    'rgba(255,255,255,0.25)',
  radioBorderSel: '#EFBF04',
  radioFill:      '#EFBF04',
  radioInner:     '#111D55',
  btnBg:          '#EFBF04',
  btnBgHover:     '#FFD130',
  btnText:        '#101828',
  backText:       'rgba(255,255,255,0.35)',
  backTextHover:  '#fff',
  successIcon:    '#EFBF04',
  successIconIn:  '#111D55',
  successHeading: '#fff',
  successBody:    'rgba(255,255,255,0.6)',
};

const GOLD = {
  border:         'rgba(17,29,85,0.15)',
  borderActive:   '#111D55',
  progressBg:     'rgba(17,29,85,0.12)',
  progressFill:   '#111D55',
  stepActive:     '#111D55',
  stepDone:       'rgba(17,29,85,0.55)',
  stepInactive:   'rgba(17,29,85,0.28)',
  stepActiveBg:   'rgba(17,29,85,0.07)',
  stepUnderline:  '#111D55',
  subtext:        'rgba(17,29,85,0.6)',
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
  cardDesc:       'rgba(17,29,85,0.55)',
  radioBorder:    'rgba(17,29,85,0.25)',
  radioBorderSel: '#111D55',
  radioFill:      '#111D55',
  radioInner:     '#fff',
  btnBg:          '#111D55',
  btnBgHover:     '#051A87',
  btnText:        '#fff',
  backText:       'rgba(17,29,85,0.4)',
  backTextHover:  '#111D55',
  successIcon:    '#111D55',
  successIconIn:  '#EFBF04',
  successHeading: '#111D55',
  successBody:    'rgba(17,29,85,0.65)',
};

type C = typeof DARK;

type FormData = {
  betreff: string;
  name: string;
  email: string;
  nachricht: string;
};

const STEPS = [
  { label: 'Betreff',   icon: MessageSquare },
  { label: 'Kontakt',   icon: User          },
  { label: 'Nachricht', icon: Send          },
];

const BETREFFS = [
  { value: 'allgemein',  label: 'Allgemeine Anfrage',  desc: 'Ich habe eine allgemeine Frage.'                  },
  { value: 'bewerbung',  label: 'Frage zur Bewerbung', desc: 'Ich möchte mich bewerben oder habe Rückfragen.'   },
  { value: 'presse',     label: 'Presseanfrage',        desc: 'Ich bin Journalist:in und recherchiere zum BMP.' },
  { value: 'sponsoring', label: 'Sponsoring',           desc: 'Ich interessiere mich für eine Partnerschaft.'   },
];

const variants = {
  enter:  (dir: number) => ({ x: dir > 0 ?  40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 :  40, opacity: 0 }),
};

function StyledInput({ c, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { c: C }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={e => { setFocused(true);  props.onFocus?.(e); }}
      onBlur ={e => { setFocused(false); props.onBlur?.(e);  }}
      style={{
        width: '100%', height: 42, padding: '0 12px',
        fontSize: 14, color: c.inputText, fontFamily: FF,
        border: `1.5px solid ${focused ? c.inputBorderFoc : c.inputBorder}`,
        background: focused ? c.inputBgFocus : c.inputBg,
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color 0.15s, background 0.15s',
        ...props.style,
      }}
    />
  );
}

function StyledTextarea({ c, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { c: C }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={e => { setFocused(true);  props.onFocus?.(e); }}
      onBlur ={e => { setFocused(false); props.onBlur?.(e);  }}
      style={{
        width: '100%', padding: '10px 12px',
        fontSize: 14, color: c.inputText, fontFamily: FF,
        border: `1.5px solid ${focused ? c.inputBorderFoc : c.inputBorder}`,
        background: focused ? c.inputBgFocus : c.inputBg,
        outline: 'none', boxSizing: 'border-box',
        resize: 'vertical', minHeight: 100,
        transition: 'border-color 0.15s, background 0.15s',
        ...props.style,
      }}
    />
  );
}

function BetreffCard({ c, item, selected, onClick }: { c: C; item: typeof BETREFFS[0]; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick}
      style={{
        width: '100%', padding: '11px 14px', textAlign: 'left', cursor: 'pointer',
        border: `1.5px solid ${selected ? c.cardBorderSel : c.cardBorder}`,
        background: selected ? c.cardBgSel : c.cardBg,
        fontFamily: FF, transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${selected ? c.radioBorderSel : c.radioBorder}`,
        background: selected ? c.radioFill : 'transparent',
        transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected && <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.radioInner }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: selected ? c.cardTitleSel : c.cardTitle, marginBottom: 1 }}>{item.label}</div>
        <div style={{ fontSize: 11, color: c.cardDesc }}>{item.desc}</div>
      </div>
    </button>
  );
}

export default function KontaktForm({ theme = 'dark' }: { theme?: 'dark' | 'gold' }) {
  const c = theme === 'gold' ? GOLD : DARK;
  const isMobile = useIsMobile();
  const [step, setStep]           = useState(0);
  const [dir,  setDir]            = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData]           = useState<FormData>({ betreff: 'allgemein', name: '', email: '', nachricht: '' });
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (k: keyof FormData, v: string) => {
    setData(d => ({ ...d, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: typeof errors = {};
    if (step === 1) {
      if (!data.name)  e.name  = 'Bitte Namen angeben';
      if (!data.email) e.email = 'Bitte E-Mail angeben';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Ungültige E-Mail';
    }
    if (step === 2 && !data.nachricht) e.nachricht = 'Bitte Nachricht verfassen.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next   = () => { if (validate()) { setDir(1);  setStep(s => s + 1); } };
  const prev   = () => {                   setDir(-1); setStep(s => s - 1); };
  const submit = () => { if (validate()) setSubmitted(true); };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        style={{ padding: '48px 24px', textAlign: 'center' }}
      >
        <div style={{ width: 56, height: 56, background: c.successIcon, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={24} color={c.successIconIn} strokeWidth={2.5} />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: c.successHeading, marginBottom: 10, letterSpacing: '-0.02em', fontFamily: FF }}>
          Nachricht gesendet
        </h3>
        <p style={{ fontSize: 15, color: c.successBody, lineHeight: 1.7, maxWidth: 280, margin: '0 auto', fontFamily: FF }}>
          Danke, <strong style={{ color: c.successHeading }}>{data.name}</strong>. Wir melden uns zeitnah bei{' '}
          <strong style={{ color: c.successIcon }}>{data.email}</strong>.
        </p>
      </motion.div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Progress */}
      <div style={{ height: 3, background: c.progressBg, flexShrink: 0 }}>
        <div style={{ height: '100%', background: c.progressFill, width: step === 0 ? '0%' : `${(step / (STEPS.length - 1)) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Step tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${c.border}`, flexShrink: 0 }}>
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i < step, active = i === step;
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
      <div style={{ padding: '20px 0', flex: 1, minHeight: 0, overflowX: 'hidden', overflowY: 'auto' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}>

            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 14, color: c.subtext, marginBottom: 12, fontFamily: FF }}>Womit können wir Ihnen helfen?</p>
                {BETREFFS.map(item => (
                  <BetreffCard key={item.value} c={c} item={item} selected={data.betreff === item.value}
                    onClick={() => { set('betreff', item.value); setDir(1); setStep(1); }} />
                ))}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 14, color: c.subtext, marginBottom: 4, fontFamily: FF }}>Wie dürfen wir Sie kontaktieren?</p>
                {([
                  { label: 'Name',   key: 'name'  as const, type: 'text',  placeholder: 'Vor- und Nachname', error: errors.name  },
                  { label: 'E-Mail', key: 'email' as const, type: 'email', placeholder: 'ihre@email.de',     error: errors.email },
                ] as const).map(f => (
                  <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.labelText, fontFamily: FF }}>{f.label}</label>
                    <StyledInput c={c} type={f.type} value={data[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} />
                    {f.error && <span style={{ fontSize: 11, color: c.errorText, fontFamily: FF }}>{f.error}</span>}
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 14, color: c.subtext, marginBottom: 4, fontFamily: FF }}>Was möchten Sie uns mitteilen?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.labelText, fontFamily: FF }}>Nachricht</label>
                  <StyledTextarea c={c} value={data.nachricht} onChange={e => set('nachricht', e.target.value)} rows={5} placeholder="Schreiben Sie Ihre Nachricht…" />
                  {errors.nachricht && <span style={{ fontSize: 11, color: c.errorText, fontFamily: FF }}>{errors.nachricht}</span>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step > 0 && (
        <div style={{ paddingTop: 16, borderTop: `1px solid ${c.border}`, display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: 12, flexShrink: 0 }}>
          <button type="button" onClick={prev} style={{
            fontSize: 12, fontWeight: 600, color: c.backText, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 5,
            padding: isMobile ? '8px 0' : 0, fontFamily: FF, transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = c.backTextHover)}
            onMouseLeave={e => (e.currentTarget.style.color = c.backText)}
          >
            <ArrowLeft size={13} /> Zurück
          </button>

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} style={{
              fontSize: 14, fontWeight: 700, color: c.btnText, background: c.btnBg, border: 'none', cursor: 'pointer',
              padding: '12px 28px', fontFamily: FF, display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background 0.15s',
              ...(isMobile ? { width: '100%', justifyContent: 'center' } : {}),
            }}
              onMouseEnter={e => (e.currentTarget.style.background = c.btnBgHover)}
              onMouseLeave={e => (e.currentTarget.style.background = c.btnBg)}
            >
              Weiter <ArrowRight size={14} />
            </button>
          ) : (
            <button type="button" onClick={submit} style={{
              fontSize: 14, fontWeight: 700, color: c.btnText, background: c.btnBg, border: 'none', cursor: 'pointer',
              padding: '12px 28px', fontFamily: FF, display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background 0.15s',
              ...(isMobile ? { width: '100%', justifyContent: 'center' } : {}),
            }}
              onMouseEnter={e => (e.currentTarget.style.background = c.btnBgHover)}
              onMouseLeave={e => (e.currentTarget.style.background = c.btnBg)}
            >
              Anfrage senden <Send size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
