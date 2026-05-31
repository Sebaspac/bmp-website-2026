import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const NAVY = "#111D55";
const GOLD = "#EFBF04";
const CREAM = "#EFE5E3";
const BLUE = "#4A8FC9";
const WHITE = "#fff";

const TIERS = [
  { max: 10,   label: "bis 10",    annual: 480 },
  { max: 20,   label: "bis 20",    annual: 600 },
  { max: 50,   label: "bis 50",    annual: 900 },
  { max: 100,  label: "bis 100",   annual: 1200 },
  { max: 250,  label: "bis 250",   annual: 2400 },
  { max: 1000, label: "bis 1.000", annual: 3600 },
];

const VAT = 0.19;
const ADMISSION = 500;

const STEPS = [
  { id: 1, label: "Unternehmen" },
  { id: 2, label: "Kontakt" },
  { id: 3, label: "Details" },
  { id: 4, label: "Zahlung" },
  { id: 5, label: "Abschluss" },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface FormData {
  firmenname: string;
  rechtsform: string;
  strasse: string;
  plz: string;
  ort: string;
  mitarbeiter: string;
  website: string;
  anrede: string;
  vorname: string;
  nachname: string;
  position: string;
  email: string;
  telefon: string;
  eintrittsdatum: string;
  aufmerksam: string;
  motivation: string;
  kontoinhaber: string;
  iban: string;
  bic: string;
  bank: string;
  sepaMandat: boolean;
  datenschutz: boolean;
  satzung: boolean;
  widerruf: boolean;
  newsletter: boolean;
  websitePub: boolean;
}

type Errors = Partial<Record<keyof FormData, string>>;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getFirstOfNextMonth(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1, 1);
  return d.toISOString().split("T")[0];
}

function formatEur(n: number): string {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function calcBeitrag(mitarbeiter: string) {
  const tier = TIERS.find((t) => t.label === mitarbeiter) ?? TIERS[0];
  const annualNet = tier.annual;
  const annualGross = annualNet * (1 + VAT);
  const admissionGross = ADMISSION * (1 + VAT);
  const today = new Date();
  const monthsLeft = 12 - today.getMonth();
  const anteilig = (annualGross / 12) * monthsLeft + admissionGross;
  return { annualNet, annualGross, admissionGross, anteilig };
}

// Basic IBAN mod-97 check (DE format, 22 chars)
function validateIBAN(raw: string): boolean {
  const iban = raw.replace(/\s/g, "").toUpperCase();
  if (!/^DE\d{20}$/.test(iban)) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.split("").map((c) => {
    const code = c.charCodeAt(0);
    return code >= 65 ? (code - 55).toString() : c;
  }).join("");
  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + parseInt(numeric[i])) % 97;
  }
  return remainder === 1;
}

function maskIBAN(iban: string): string {
  const clean = iban.replace(/\s/g, "");
  if (clean.length < 8) return clean;
  return clean.slice(0, 4) + " **** **** **** " + clean.slice(-4);
}

function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!data.firmenname.trim()) e.firmenname = "Pflichtfeld";
    if (!data.rechtsform) e.rechtsform = "Bitte wählen";
    if (!data.strasse.trim()) e.strasse = "Pflichtfeld";
    if (!/^\d{5}$/.test(data.plz)) e.plz = "5-stellige PLZ erforderlich";
    if (!data.ort.trim()) e.ort = "Pflichtfeld";
    if (!data.mitarbeiter) e.mitarbeiter = "Bitte wählen";
  }
  if (step === 2) {
    if (!data.anrede) e.anrede = "Bitte wählen";
    if (!data.vorname.trim()) e.vorname = "Pflichtfeld";
    if (!data.nachname.trim()) e.nachname = "Pflichtfeld";
    if (!data.position.trim()) e.position = "Pflichtfeld";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Gültige E-Mail erforderlich";
    if (!data.telefon.trim()) e.telefon = "Pflichtfeld";
  }
  if (step === 3) {
    if (!data.eintrittsdatum) e.eintrittsdatum = "Pflichtfeld";
    if (!data.aufmerksam) e.aufmerksam = "Bitte wählen";
  }
  if (step === 4) {
    if (!data.kontoinhaber.trim()) e.kontoinhaber = "Pflichtfeld";
    if (!validateIBAN(data.iban)) e.iban = "Ungültige IBAN (DE, 22 Zeichen)";
    if (!data.bic.trim()) e.bic = "Pflichtfeld";
    if (!data.bank.trim()) e.bank = "Pflichtfeld";
    if (!data.sepaMandat) e.sepaMandat = "Bitte SEPA-Mandat bestätigen";
  }
  if (step === 5) {
    if (!data.datenschutz) e.datenschutz = "Pflichtfeld";
    if (!data.satzung) e.satzung = "Pflichtfeld";
    if (!data.widerruf) e.widerruf = "Pflichtfeld";
  }
  return e;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span style={{
      display: "block",
      marginTop: 5,
      fontSize: 11,
      color: GOLD,
      fontFamily: '"IBM Plex Sans", sans-serif',
      letterSpacing: "0.04em",
      opacity: 0.9,
    }}>
      ⚡ {msg}
    </span>
  );
}

const fieldBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  color: WHITE,
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: 14,
  padding: "11px 14px",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
  boxSizing: "border-box",
};

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)",
        marginBottom: 7,
        fontFamily: '"IBM Plex Sans", sans-serif',
      }}>
        {label}{required && <span style={{ color: GOLD, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

function Input({
  value, onChange, placeholder, type = "text", error, onFocus, onBlur,
  maxLength,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; error?: string; onFocus?: () => void; onBlur?: () => void;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isMobile = useIsMobile();
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => { setFocused(true); onFocus?.(); }}
      onBlur={() => { setFocused(false); onBlur?.(); }}
      style={{
        ...fieldBase,
        // ≥16px on mobile prevents iOS auto-zoom on focus
        fontSize: isMobile ? 16 : fieldBase.fontSize,
        borderColor: error ? GOLD : focused ? "rgba(239,191,4,0.6)" : "rgba(255,255,255,0.15)",
        background: focused ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)",
      }}
    />
  );
}

function Select({
  value, onChange, options, placeholder, error,
}: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isMobile = useIsMobile();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...fieldBase,
        // ≥16px on mobile prevents iOS auto-zoom on focus
        fontSize: isMobile ? 16 : fieldBase.fontSize,
        cursor: "pointer",
        appearance: "none",
        borderColor: error ? GOLD : focused ? "rgba(239,191,4,0.6)" : "rgba(255,255,255,0.15)",
        background: focused ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)",
        color: value ? WHITE : "rgba(255,255,255,0.4)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23EFBF04' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        backgroundSize: "12px",
      } as React.CSSProperties}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ background: NAVY, color: WHITE }}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Textarea({
  value, onChange, placeholder, maxLength, error,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  maxLength?: number; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div>
      <textarea
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        style={{
          ...fieldBase,
          // ≥16px on mobile prevents iOS auto-zoom on focus
          fontSize: isMobile ? 16 : fieldBase.fontSize,
          resize: "vertical",
          borderColor: error ? GOLD : focused ? "rgba(239,191,4,0.6)" : "rgba(255,255,255,0.15)",
          background: focused ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)",
        }}
      />
      {maxLength && (
        <div style={{ textAlign: "right", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

function Checkbox({
  checked, onChange, label, error, optional,
}: {
  checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode;
  error?: string; optional?: boolean;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: "pointer",
      }}>
        <span
          onClick={() => onChange(!checked)}
          style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            marginTop: 1,
            border: `2px solid ${checked ? GOLD : error ? GOLD : "rgba(255,255,255,0.25)"}`,
            borderRadius: 4,
            background: checked ? GOLD : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            cursor: "pointer",
          }}
        >
          {checked && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path d="M1 4l3 3 6-6" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.75)",
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          {label}
          {optional && <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: 6, fontSize: 11 }}>(optional)</span>}
        </span>
      </label>
      {error && <FieldError msg={error} />}
    </div>
  );
}

// ─── ACCORDION ────────────────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 10,
      marginBottom: 10,
      overflow: "hidden",
    }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "13px 16px",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          cursor: "pointer",
          color: WHITE,
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textAlign: "left",
        }}
      >
        {title}
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}
        >
          <path d="M2 4l5 5 5-5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: "14px 16px", background: "rgba(0,0,0,0.15)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 13,
    }}>
      <span style={{ color: "rgba(255,255,255,0.45)", fontFamily: '"IBM Plex Sans", sans-serif' }}>
        {label}
      </span>
      <span style={{ color: WHITE, fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 500 }}>
        {value || "—"}
      </span>
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ marginBottom: isMobile ? 24 : 36 }}>
      {/* Step dots + connecting lines */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", marginBottom: 12 }}>
        {/* Background track */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 14,
          right: 14,
          height: 2,
          background: "rgba(255,255,255,0.12)",
          transform: "translateY(-50%)",
        }} />
        {/* Gold progress fill */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 14,
          height: 2,
          background: `linear-gradient(90deg, ${GOLD}, rgba(239,191,4,0.7))`,
          transform: "translateY(-50%)",
          width: total > 1 ? `calc(${((current - 1) / (total - 1)) * 100}% * (1 - ${28 / 100}))` : "0%",
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          // More precise: calculate pixel-based width
          right: "auto",
        }} />
        {/* Override with direct width calc */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 14,
          height: 2,
          background: `linear-gradient(90deg, ${GOLD}, rgba(239,191,4,0.6))`,
          transform: "translateY(-50%)",
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          width: `calc((100% - 28px) * ${(current - 1) / (total - 1)})`,
        }} />

        {/* Dots */}
        {STEPS.map((step) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} style={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              display: "flex",
              justifyContent: step.id === 1 ? "flex-start" : step.id === total ? "flex-end" : "center",
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: done ? GOLD : active ? "transparent" : "rgba(255,255,255,0.08)",
                border: `2px solid ${done ? GOLD : active ? GOLD : "rgba(255,255,255,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: active ? `0 0 16px rgba(239,191,4,0.4)` : "none",
              }}>
                {done ? (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4.5l3.5 3.5 6.5-7" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: active ? GOLD : "rgba(255,255,255,0.35)",
                    fontFamily: '"IBM Plex Sans", sans-serif',
                  }}>
                    {step.id}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step labels — full list on desktop; on mobile only the active label
          (the 5-up text row would overflow / wrap on narrow screens) */}
      {isMobile ? (
        <div style={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: GOLD,
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          {STEPS.find((s) => s.id === current)?.label} · {current}/{total}
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {STEPS.map((step) => {
            const done = step.id < current;
            const active = step.id === current;
            return (
              <div key={step.id} style={{
                flex: 1,
                textAlign: step.id === 1 ? "left" : step.id === total ? "right" : "center",
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: active ? GOLD : done ? "rgba(239,191,4,0.5)" : "rgba(255,255,255,0.25)",
                fontFamily: '"IBM Plex Sans", sans-serif',
                transition: "color 0.3s",
              }}>
                {step.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── STEP HEADING ─────────────────────────────────────────────────────────────

function StepHeading({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
      }}>
        <div style={{
          width: 4,
          height: 18,
          background: GOLD,
          borderRadius: 2,
        }} />
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: GOLD,
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          Schritt {step} von 5
        </span>
      </div>
      <h3 style={{
        margin: 0,
        fontSize: 20,
        fontWeight: 600,
        color: WHITE,
        fontFamily: '"IBM Plex Sans", sans-serif',
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{
          margin: "6px 0 0",
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── NAV BUTTONS ─────────────────────────────────────────────────────────────

function NavButtons({
  step, onBack, onNext, onSubmit, disabled,
}: {
  step: number; onBack: () => void; onNext: () => void; onSubmit: () => void; disabled?: boolean;
}) {
  const isMobile = useIsMobile();
  const isLast = step === 5;
  return (
    <div style={{
      display: "flex",
      gap: 10,
      marginTop: 28,
      paddingTop: 20,
      borderTop: "1px solid rgba(255,255,255,0.08)",
    }}>
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: "0 0 auto",
            padding: isMobile ? "12px 16px" : "12px 20px",
            minHeight: 44,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "rgba(255,255,255,0.6)",
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.05em",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)";
            (e.target as HTMLButtonElement).style.color = WHITE;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
            (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
          }}
        >
          ← Zurück
        </button>
      )}
      <button
        type="button"
        onClick={isLast ? onSubmit : onNext}
        disabled={disabled}
        style={{
          flex: 1,
          padding: "13px 20px",
          minHeight: 44,
          background: disabled ? "rgba(239,191,4,0.3)" : GOLD,
          border: "none",
          borderRadius: 8,
          color: disabled ? "rgba(17,29,85,0.5)" : NAVY,
          fontFamily: '"IBM Plex Sans", sans-serif',
          // long final-step label needs a smaller size + wrapping on mobile
          fontSize: isMobile && isLast ? 12 : 13,
          fontWeight: 700,
          cursor: disabled ? "not-allowed" : "pointer",
          letterSpacing: isMobile && isLast ? "0.04em" : "0.1em",
          textTransform: "uppercase",
          transition: "all 0.2s",
          lineHeight: 1.3,
          overflowWrap: "anywhere",
        }}
        onMouseEnter={(e) => {
          if (!disabled) (e.target as HTMLButtonElement).style.background = "#f5ca1a";
        }}
        onMouseLeave={(e) => {
          if (!disabled) (e.target as HTMLButtonElement).style.background = GOLD;
        }}
      >
        {isLast ? "Mitgliedschaftsantrag verbindlich einreichen" : "Weiter →"}
      </button>
    </div>
  );
}

// ─── STEP 1 — UNTERNEHMEN ─────────────────────────────────────────────────────

function Step1({ data, onChange, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string | boolean) => void; errors: Errors;
}) {
  const isMobile = useIsMobile();
  const rechtsformen = [
    "GmbH","GmbH & Co. KG","AG","UG","KG","OHG","GbR",
    "Einzelunternehmen","e.K.","Sonstige",
  ].map((v) => ({ value: v, label: v }));

  return (
    <>
      <StepHeading step={1} title="Ihr Unternehmen" subtitle="Angaben zum antragstellenden Unternehmen" />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Firmenname" required error={errors.firmenname}>
            <Input value={data.firmenname} onChange={(v) => onChange("firmenname", v)} placeholder="Muster GmbH" error={errors.firmenname} />
          </Field>
        </div>
        <Field label="Rechtsform" required error={errors.rechtsform}>
          <Select value={data.rechtsform} onChange={(v) => onChange("rechtsform", v)}
            options={rechtsformen} placeholder="Bitte wählen" error={errors.rechtsform} />
        </Field>
        <Field label="Anzahl Mitarbeiter" required error={errors.mitarbeiter}>
          <Select value={data.mitarbeiter} onChange={(v) => onChange("mitarbeiter", v)}
            options={TIERS.map((t) => ({ value: t.label, label: t.label }))}
            placeholder="Bitte wählen" error={errors.mitarbeiter} />
        </Field>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Straße & Hausnummer" required error={errors.strasse}>
            <Input value={data.strasse} onChange={(v) => onChange("strasse", v)} placeholder="Musterstraße 42" error={errors.strasse} />
          </Field>
        </div>
        <Field label="PLZ" required error={errors.plz}>
          <Input value={data.plz} onChange={(v) => onChange("plz", v)} placeholder="12345" maxLength={5} error={errors.plz} />
        </Field>
        <Field label="Ort" required error={errors.ort}>
          <Input value={data.ort} onChange={(v) => onChange("ort", v)} placeholder="Berlin" error={errors.ort} />
        </Field>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Website">
            <Input value={data.website} onChange={(v) => onChange("website", v)} placeholder="https://www.ihrewebsite.de" type="url" />
          </Field>
        </div>
      </div>
    </>
  );
}

// ─── STEP 2 — KONTAKT ─────────────────────────────────────────────────────────

function Step2({ data, onChange, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string | boolean) => void; errors: Errors;
}) {
  const isMobile = useIsMobile();
  return (
    <>
      <StepHeading step={2} title="Kontaktperson" subtitle="Ansprechpartner für die Mitgliedschaft" />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
        <Field label="Anrede" required error={errors.anrede}>
          <Select value={data.anrede} onChange={(v) => onChange("anrede", v)}
            options={[{value:"Herr",label:"Herr"},{value:"Frau",label:"Frau"},{value:"Divers",label:"Divers"}]}
            placeholder="Bitte wählen" error={errors.anrede} />
        </Field>
        {!isMobile && <div />} {/* spacer (desktop only) */}
        <Field label="Vorname" required error={errors.vorname}>
          <Input value={data.vorname} onChange={(v) => onChange("vorname", v)} placeholder="Max" error={errors.vorname} />
        </Field>
        <Field label="Nachname" required error={errors.nachname}>
          <Input value={data.nachname} onChange={(v) => onChange("nachname", v)} placeholder="Mustermann" error={errors.nachname} />
        </Field>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Position / Funktion" required error={errors.position}>
            <Input value={data.position} onChange={(v) => onChange("position", v)} placeholder="z. B. Geschäftsführer" error={errors.position} />
          </Field>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="E-Mail-Adresse" required error={errors.email}>
            <Input value={data.email} onChange={(v) => onChange("email", v)} placeholder="max@muster.de" type="email" error={errors.email} />
          </Field>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Telefon" required error={errors.telefon}>
            <Input value={data.telefon} onChange={(v) => onChange("telefon", v)} placeholder="+49 30 123456" type="tel" error={errors.telefon} />
          </Field>
        </div>
      </div>
    </>
  );
}

// ─── STEP 3 — DETAILS ─────────────────────────────────────────────────────────

function Step3({ data, onChange, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string | boolean) => void; errors: Errors;
}) {
  const isMobile = useIsMobile();
  const beitrag = calcBeitrag(data.mitarbeiter);
  return (
    <>
      <StepHeading step={3} title="Mitgliedschaft & Details" subtitle="Beitragsübersicht und Eintrittsdatum" />

      {/* Contribution card */}
      {data.mitarbeiter && (
        <div style={{
          background: "rgba(239,191,4,0.07)",
          border: "1px solid rgba(239,191,4,0.25)",
          borderRadius: 12,
          padding: "16px 18px",
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: GOLD, marginBottom: 12,
            fontFamily: '"IBM Plex Sans", sans-serif',
          }}>
            Beitragsübersicht
          </div>
          {[
            ["Jahresbeitrag (netto)", formatEur(beitrag.annualNet)],
            ["Jahresbeitrag (brutto)", formatEur(beitrag.annualGross)],
            ["Aufnahmegebühr (brutto)", formatEur(beitrag.admissionGross)],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: '"IBM Plex Sans", sans-serif' }}>{l}</span>
              <span style={{ color: WHITE, fontWeight: 500, fontFamily: '"IBM Plex Sans", sans-serif' }}>{v}</span>
            </div>
          ))}
          <div style={{
            height: 1, background: "rgba(239,191,4,0.2)", margin: "10px 0",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
            <span style={{ color: GOLD, fontWeight: 600, fontFamily: '"IBM Plex Sans", sans-serif' }}>
              Gesamt Jahr 1 (anteilig)
            </span>
            <span style={{ color: GOLD, fontWeight: 700, fontFamily: '"IBM Plex Sans", sans-serif' }}>
              {formatEur(beitrag.anteilig)}
            </span>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
        <Field label="Gewünschtes Eintrittsdatum" required error={errors.eintrittsdatum}>
          <Input value={data.eintrittsdatum} onChange={(v) => onChange("eintrittsdatum", v)} type="date" error={errors.eintrittsdatum} />
        </Field>
        <Field label="Wie wurden Sie aufmerksam?" required error={errors.aufmerksam}>
          <Select value={data.aufmerksam} onChange={(v) => onChange("aufmerksam", v)}
            options={["Empfehlung","Veranstaltung","Google","Social Media","Presse","Sonstiges"]
              .map((v) => ({ value: v, label: v }))}
            placeholder="Bitte wählen" error={errors.aufmerksam} />
        </Field>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Ihre Motivation (optional)">
            <Textarea value={data.motivation} onChange={(v) => onChange("motivation", v)}
              placeholder="Was erhoffen Sie sich von der Mitgliedschaft beim BMP e.V.?" maxLength={500} />
          </Field>
        </div>
      </div>
    </>
  );
}

// ─── STEP 4 — SEPA ────────────────────────────────────────────────────────────

function Step4({ data, onChange, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string | boolean) => void; errors: Errors;
}) {
  const isMobile = useIsMobile();
  const ibanIsValid = validateIBAN(data.iban);

  return (
    <>
      <StepHeading step={4} title="SEPA-Lastschriftmandat" subtitle="Bankverbindung für den Beitragseinzug" />

      {/* Mandate text */}
      <div style={{
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "12px 16px",
        maxHeight: 100,
        overflowY: "auto",
        marginBottom: 20,
        fontSize: 12,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.5)",
        fontFamily: '"IBM Plex Sans", sans-serif',
      }}>
        Ich ermächtige den BMP e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die vom BMP e.V. auf mein Konto gezogenen Lastschriften einzulösen. Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen. Die Mandatsreferenz wird separat mitgeteilt. Gläubiger-Identifikationsnummer: DE98ZZZ09999999999.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Kontoinhaber" required error={errors.kontoinhaber}>
            <Input value={data.kontoinhaber} onChange={(v) => onChange("kontoinhaber", v)} placeholder="Max Mustermann" error={errors.kontoinhaber} />
          </Field>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="IBAN" required error={errors.iban}>
            <div style={{ position: "relative" }}>
              <Input value={data.iban} onChange={(v) => onChange("iban", v.toUpperCase())}
                placeholder="DE00 0000 0000 0000 0000 00" error={errors.iban} />
              {data.iban.replace(/\s/g,"").length > 4 && (
                <div style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  fontSize: 11, fontWeight: 700,
                  color: ibanIsValid ? "#4ade80" : "rgba(239,191,4,0.6)",
                }}>
                  {ibanIsValid ? "✓ OK" : "…"}
                </div>
              )}
            </div>
          </Field>
        </div>
        <Field label="BIC" required error={errors.bic}>
          <Input value={data.bic} onChange={(v) => onChange("bic", v.toUpperCase())}
            placeholder={ibanIsValid ? "Wird ausgefüllt" : "BELADEBEXXX"} error={errors.bic} />
        </Field>
        <Field label="Bank / Kreditinstitut" required error={errors.bank}>
          <Input value={data.bank} onChange={(v) => onChange("bank", v)} placeholder="Berliner Sparkasse" error={errors.bank} />
        </Field>
        <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
          <Checkbox
            checked={data.sepaMandat}
            onChange={(v) => onChange("sepaMandat", v)}
            label="Ich bestätige das SEPA-Lastschriftmandat und ermächtige den BMP e.V. zum Einzug."
            error={errors.sepaMandat}
          />
        </div>
      </div>
    </>
  );
}

// ─── STEP 5 — SUMMARY + CONSENT ───────────────────────────────────────────────

function Step5({ data, onChange, errors }: {
  data: FormData; onChange: (k: keyof FormData, v: string | boolean) => void; errors: Errors;
}) {
  return (
    <>
      <StepHeading step={5} title="Zusammenfassung & Abschluss" subtitle="Bitte prüfen Sie Ihre Angaben" />

      <Accordion title="Unternehmen">
        <ReviewRow label="Firmenname" value={data.firmenname} />
        <ReviewRow label="Rechtsform" value={data.rechtsform} />
        <ReviewRow label="Adresse" value={`${data.strasse}, ${data.plz} ${data.ort}`} />
        <ReviewRow label="Mitarbeiter" value={data.mitarbeiter} />
        <ReviewRow label="Website" value={data.website || "—"} />
      </Accordion>

      <Accordion title="Kontaktperson">
        <ReviewRow label="Name" value={`${data.anrede} ${data.vorname} ${data.nachname}`} />
        <ReviewRow label="Position" value={data.position} />
        <ReviewRow label="E-Mail" value={data.email} />
        <ReviewRow label="Telefon" value={data.telefon} />
      </Accordion>

      <Accordion title="Zahlung">
        <ReviewRow label="Kontoinhaber" value={data.kontoinhaber} />
        <ReviewRow label="IBAN" value={maskIBAN(data.iban)} />
        <ReviewRow label="BIC" value={data.bic} />
        <ReviewRow label="Bank" value={data.bank} />
        <ReviewRow label="Eintrittsdatum" value={data.eintrittsdatum} />
        <ReviewRow label="Jahresbeitrag" value={formatEur(calcBeitrag(data.mitarbeiter).annualGross)} />
      </Accordion>

      <div style={{ marginTop: 20, marginBottom: 4 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
          marginBottom: 14, fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          Pflichtbestätigungen
        </div>
        <Checkbox checked={data.satzung} onChange={(v) => onChange("satzung", v)}
          label="Ich habe die Satzung des BMP e.V. gelesen und erkenne sie an."
          error={errors.satzung} />
        <Checkbox checked={data.datenschutz} onChange={(v) => onChange("datenschutz", v)}
          label="Ich habe die Datenschutzerklärung gelesen und stimme zu."
          error={errors.datenschutz} />
        <Checkbox checked={data.widerruf} onChange={(v) => onChange("widerruf", v)}
          label="Ich habe die Kündigungsfrist zur Kenntnis genommen (1 Jahr zum Jahresende)."
          error={errors.widerruf} />

        <div style={{
          height: 1, background: "rgba(255,255,255,0.08)",
          margin: "14px 0",
        }} />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
          marginBottom: 14, fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          Optional
        </div>
        <Checkbox checked={data.newsletter} onChange={(v) => onChange("newsletter", v)}
          label="Ich möchte elektronische Informationen, Einladungen und den Newsletter erhalten."
          optional />
        <Checkbox checked={data.websitePub} onChange={(v) => onChange("websitePub", v)}
          label="Meinen Firmennamen auf der Website des BMP e.V. als Mitglied veröffentlichen."
          optional />
      </div>
    </>
  );
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0 8px",
    }}>
      {/* Animated gold checkmark */}
      <div style={{
        width: 80, height: 80,
        borderRadius: "50%",
        background: "rgba(239,191,4,0.12)",
        border: `2px solid ${GOLD}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        animation: "successPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
      }}>
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none"
          style={{ animation: "checkDraw 0.6s 0.3s ease-out both" }}>
          <path
            d="M2 14l10 10 22-22"
            stroke={GOLD}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset="0"
            style={{ animation: "checkDraw 0.6s 0.3s ease-out both" }}
          />
        </svg>
      </div>

      <h3 style={{
        margin: "0 0 10px",
        fontSize: 22,
        fontWeight: 700,
        color: WHITE,
        fontFamily: '"IBM Plex Sans", sans-serif',
        letterSpacing: "-0.02em",
      }}>
        Ihr Antrag ist eingegangen.
      </h3>
      <p style={{
        margin: "0 0 28px",
        fontSize: 14,
        color: "rgba(255,255,255,0.55)",
        fontFamily: '"IBM Plex Sans", sans-serif',
        lineHeight: 1.6,
      }}>
        Wir melden uns innerhalb von 5 Werktagen bei Ihnen.
      </p>

      <div style={{
        width: "100%",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 12,
        padding: "18px 20px",
        textAlign: "left",
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: GOLD, marginBottom: 14,
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          Ihre nächsten Schritte
        </div>
        {[
          ["1", "Bestätigung per E-Mail", "Sie erhalten in Kürze eine Eingangsbestätigung."],
          ["2", "Prüfung durch den Vorstand", "Ihr Antrag wird in der nächsten Sitzung behandelt."],
          ["3", "Willkommen im BMP e.V.", "Nach Bestätigung erhalten Sie Ihre Mitgliedsdaten."],
        ].map(([num, title, desc]) => (
          <div key={num} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
            <div style={{
              flexShrink: 0,
              width: 28, height: 28,
              borderRadius: "50%",
              background: "rgba(239,191,4,0.15)",
              border: `1px solid rgba(239,191,4,0.4)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: GOLD,
              fontFamily: '"IBM Plex Sans", sans-serif',
            }}>
              {num}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: WHITE, fontFamily: '"IBM Plex Sans", sans-serif', marginBottom: 3 }}>
                {title}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: '"IBM Plex Sans", sans-serif', lineHeight: 1.5 }}>
                {desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes successPop {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes checkDraw {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

function MembershipWizard() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [slideDir, setSlideDir] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<FormData>({
    firmenname: "", rechtsform: "", strasse: "", plz: "", ort: "",
    mitarbeiter: "", website: "",
    anrede: "", vorname: "", nachname: "", position: "", email: "", telefon: "",
    eintrittsdatum: getFirstOfNextMonth(), aufmerksam: "", motivation: "",
    kontoinhaber: "", iban: "", bic: "", bank: "", sepaMandat: false,
    datenschutz: false, satzung: false, widerruf: false, newsletter: false, websitePub: false,
  });

  const onChange = (k: keyof FormData, v: string | boolean) => {
    setData((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => { const e = { ...prev }; delete e[k]; return e; });
  };

  const animateTransition = (newStep: number, dir: "forward" | "back") => {
    if (animating) return;
    setAnimating(true);
    setSlideDir(dir);

    const el = contentRef.current;
    if (!el) { setStep(newStep); setAnimating(false); return; }

    const outX = dir === "forward" ? "-40px" : "40px";
    el.style.transition = "opacity 0.22s ease, transform 0.22s ease";
    el.style.opacity = "0";
    el.style.transform = `translateX(${outX})`;

    setTimeout(() => {
      setStep(newStep);
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = `translateX(${dir === "forward" ? "40px" : "-40px"})`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "opacity 0.28s ease, transform 0.28s ease";
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          setTimeout(() => setAnimating(false), 300);
        });
      });
    }, 230);
  };

  const handleNext = () => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    if (step < 5) animateTransition(step + 1, "forward");
  };

  const handleBack = () => {
    setErrors({});
    if (step > 1) animateTransition(step - 1, "back");
  };

  const handleSubmit = () => {
    const errs = validateStep(5, data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const submitDisabled = step === 5 && (!data.datenschutz || !data.satzung || !data.widerruf);

  return (
    <div style={{
      background: "rgba(0,0,0,0.18)",
      backdropFilter: "blur(8px)",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.08)",
      padding: isMobile ? "20px 16px" : "32px 28px",
      color: WHITE,
      fontFamily: '"IBM Plex Sans", sans-serif',
      boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      width: "100%",
      boxSizing: "border-box",
    }}>
      {/* Inject date input styling */}
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(5deg);
          opacity: 0.6;
          cursor: pointer;
        }
        select option {
          background: ${NAVY};
          color: ${WHITE};
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(239,191,4,0.3); border-radius: 4px; }
      `}</style>

      {submitted ? (
        <SuccessScreen />
      ) : (
        <>
          <ProgressBar current={step} total={STEPS.length} />

          <div ref={contentRef} style={{ minHeight: isMobile ? 300 : 380 }}>
            {step === 1 && <Step1 data={data} onChange={onChange} errors={errors} />}
            {step === 2 && <Step2 data={data} onChange={onChange} errors={errors} />}
            {step === 3 && <Step3 data={data} onChange={onChange} errors={errors} />}
            {step === 4 && <Step4 data={data} onChange={onChange} errors={errors} />}
            {step === 5 && <Step5 data={data} onChange={onChange} errors={errors} />}
          </div>

          <NavButtons
            step={step}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
            disabled={submitDisabled}
          />
        </>
      )}
    </div>
  );
}

export default MembershipWizard;
