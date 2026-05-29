import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle, X, ArrowRight, Clock, Shield, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const FF = '"IBM Plex Sans", sans-serif';
const GOLD = '#EFBF04';
const NAVY = '#111D55';
const DARK = '#101828';
const GRAU = '#E4E2E3';
const BORDER = '#D0D5DD';
const HELLBLAU = '#4A8FC9';

type UploadFile = { name: string; size: number; status: 'ready' | 'uploading' | 'done' | 'error' };

function formatBytes(b: number) {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FormularUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const addFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map(f => ({
      name: f.name, size: f.size, status: 'ready',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const remove = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!files.length) return;
    setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' })));
    setTimeout(() => {
      setFiles(prev => prev.map(f => ({ ...f, status: 'done' })));
      setTimeout(() => setSubmitted(true), 600);
    }, 1800);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── HERO ────────────────────────────────────────── */}
      <div style={{ background: DARK, position: 'relative', overflow: 'hidden', padding: isMobile ? '64px 24px 48px' : '100px 80px 72px' }}>
        <div style={{ height: 3, background: `linear-gradient(to right, ${GOLD}, transparent)`, position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: 720, position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.35em', color: HELLBLAU, display: 'block', marginBottom: 16 }}>
            BMP 2026 — Bewerbungsportal
          </span>
          <h1 style={{ fontFamily: FF, fontSize: isMobile ? 'clamp(1.6rem, 4vw, 3.6rem)' : 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.0, margin: '0 0 20px' }}>
            UNTERLAGEN<br />EINREICHEN
          </h1>
          <div style={{ width: 48, height: 3, background: GOLD, marginBottom: 24 }} />
          <p style={{ fontFamily: FF, fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 520, margin: 0 }}>
            Laden Sie Ihre Bewerbungsunterlagen sicher hoch. Alle Einreichungen werden vertraulich behandelt und direkt an die Jury weitergeleitet.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: isMobile ? '24px 0' : 0, marginTop: 56, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32, position: 'relative', zIndex: 1 }}>
          {[
            { num: '100%', label: 'Vertraulich' },
            { num: 'SSL', label: 'Verschlüsselt' },
            { num: '30 MB', label: 'Max. Dateigröße' },
            { num: 'PDF/DOCX', label: 'Akzeptierte Formate' },
          ].map((s, i) => (
            <div key={i} style={{ flex: isMobile ? '0 0 50%' : 1, paddingRight: 32 }}>
              <div style={{ fontFamily: FF, fontSize: 22, fontWeight: 900, color: GOLD, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${BORDER}`, padding: isMobile ? '16px 24px' : '16px 80px' }}>
        <span style={{ fontFamily: FF, fontSize: 12, color: HELLBLAU, fontWeight: 700, letterSpacing: '0.04em' }}>Formular hochladen</span>
      </div>

      {/* ── ERKLÄRUNG ───────────────────────────────────── */}
      <div style={{ background: GRAU, padding: isMobile ? '48px 24px' : '64px 80px' }}>
        <p style={{ fontFamily: FF, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Was wird benötigt?</p>
        <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 900, color: DARK, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 40 }}>
          ANFORDERUNGEN & FRISTEN
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 1, background: BORDER }}>
          {[
            {
              icon: FileText,
              title: 'Pflichtdokumente',
              items: ['Kurzprofil des Unternehmens (max. 2 Seiten)', 'Begründung der Bewerbung (mind. 500 Wörter)', 'Letzte 2 Jahresabschlüsse', 'Anschreiben der Geschäftsführung'],
            },
            {
              icon: Clock,
              title: 'Fristen & Einreichung',
              items: ['Bewerbungsschluss: 30. Juni 2026', 'Nachreichungen bis: 15. Juli 2026', 'Benachrichtigung: August 2026', 'Gala & Verleihung: Oktober 2026'],
            },
            {
              icon: Shield,
              title: 'Technische Anforderungen',
              items: ['Formate: PDF, DOCX, XLSX', 'Max. Dateigröße: 30 MB pro Datei', 'Max. Gesamtgröße: 100 MB', 'Sprache: Deutsch'],
            },
          ].map(({ icon: Icon, title, items }, i) => (
            <div key={i} style={{ background: '#fff', padding: '36px 32px' }}>
              <div style={{ width: 40, height: 40, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Icon size={18} color={GOLD} />
              </div>
              <h3 style={{ fontFamily: FF, fontSize: 14, fontWeight: 700, color: DARK, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>{title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: FF, fontSize: 14, color: '#555', lineHeight: 1.5 }}>
                    <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── UPLOAD-BEREICH ──────────────────────────────── */}
      <div style={{ background: NAVY, padding: isMobile ? '48px 24px' : '72px 80px' }}>
        <p style={{ fontFamily: FF, fontSize: 11, color: HELLBLAU, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 8 }}>Einreichung</p>
        <h2 style={{ fontFamily: FF, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 40 }}>
          DATEIEN HOCHLADEN
        </h2>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ width: 64, height: 64, background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={28} color={DARK} />
            </div>
            <h3 style={{ fontFamily: FF, fontSize: 22, fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: 12 }}>Einreichung erfolgreich</h3>
            <p style={{ fontFamily: FF, fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Ihre Unterlagen wurden übermittelt. Sie erhalten eine Bestätigung per E-Mail. Die Jury meldet sich bis August 2026.
            </p>
            <Link to="/teilnahme" style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: DARK, background: GOLD, padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Zur Teilnahmeseite <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: 32, alignItems: 'start' }}>

            {/* Drop zone */}
            <div>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); }}
                onClick={() => inputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragging ? GOLD : 'rgba(255,255,255,0.2)'}`,
                  padding: '52px 32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragging ? 'rgba(239,191,4,0.05)' : 'rgba(255,255,255,0.03)',
                  transition: 'all 0.2s',
                  marginBottom: 20,
                }}
              >
                <Upload size={32} color={dragging ? GOLD : 'rgba(255,255,255,0.3)'} style={{ margin: '0 auto 16px' }} />
                <p style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                  Dateien hierher ziehen
                </p>
                <p style={{ fontFamily: FF, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
                  oder klicken zum Auswählen
                </p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['PDF', 'DOCX', 'XLSX', 'PPT'].map(ext => (
                    <span key={ext} style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: GOLD, border: `1px solid rgba(239,191,4,0.4)`, padding: '3px 10px' }}>{ext}</span>
                  ))}
                </div>
                <input ref={inputRef} type="file" multiple accept=".pdf,.docx,.xlsx,.pptx" style={{ display: 'none' }} onChange={e => { if (e.target.files) addFiles(e.target.files); }} />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {files.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${f.status === 'done' ? GOLD : f.status === 'error' ? '#f87171' : 'rgba(255,255,255,0.15)'}` }}>
                      {f.status === 'done' ? <CheckCircle size={14} color={GOLD} /> : f.status === 'error' ? <AlertCircle size={14} color="#f87171" /> : <FileText size={14} color="rgba(255,255,255,0.4)" />}
                      <span style={{ fontFamily: FF, fontSize: 12, color: '#fff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                      <span style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{formatBytes(f.size)}</span>
                      {f.status === 'uploading' && <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: GOLD, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
                      {f.status !== 'uploading' && f.status !== 'done' && (
                        <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar info + submit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.04)', borderTop: `2px solid ${GOLD}` }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
                  <Info size={14} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Hinweis</span>
                </div>
                <p style={{ fontFamily: FF, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>
                  Stellen Sie sicher, dass alle Pflichtdokumente vollständig sind, bevor Sie einreichen. Unvollständige Bewerbungen können nicht berücksichtigt werden.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={files.length === 0}
                style={{
                  fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: DARK, background: files.length ? GOLD : 'rgba(239,191,4,0.3)',
                  border: 'none', cursor: files.length ? 'pointer' : 'not-allowed',
                  padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, transition: 'background 0.15s, box-shadow 0.2s', width: '100%',
                }}
                onMouseEnter={e => { if (files.length) { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = files.length ? GOLD : 'rgba(239,191,4,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <Upload size={14} />
                {files.length ? `${files.length} Datei${files.length > 1 ? 'en' : ''} einreichen` : 'Keine Dateien ausgewählt'}
              </button>

              <p style={{ fontFamily: FF, fontSize: 11, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, margin: 0 }}>
                Mit der Einreichung stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung zu.
              </p>
            </div>

          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div style={{ padding: isMobile ? '48px 24px' : '64px 80px', borderTop: `1px solid ${BORDER}`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <p style={{ fontFamily: FF, fontSize: 12, color: '#888', marginBottom: 6 }}>Noch Fragen zur Einreichung?</p>
          <Link to="/kontakt" style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            Kontakt aufnehmen <ArrowRight size={14} />
          </Link>
        </div>
        <Link
          to="/teilnahme"
          style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: DARK, background: GOLD, padding: '14px 32px', textDecoration: 'none', display: isMobile ? 'flex' : 'inline-flex', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : undefined, alignItems: 'center', gap: 8, transition: 'background 0.15s, box-shadow 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FFD130'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(239,191,4,0.65), 0 0 40px rgba(239,191,4,0.3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        >
          Zur Teilnahmeseite <ArrowRight size={13} />
        </Link>
      </div>

    </div>
  );
}
