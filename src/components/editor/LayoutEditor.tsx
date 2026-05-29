'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ModuleEdit {
  bg?: string;
  heading?: string;
  text?: string;
  tag?: string;
}
type ModuleEdits = Record<string, ModuleEdit>;

interface ElementEdit {
  text?: string;
  fg?: string;
  bg?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  fontStyle?: string;
  textAlign?: string;
}

type ElementTab  = 'text' | 'style' | 'color';
type EditTarget  = 'section' | 'element';
type PopupState  = { x: number; y: number; el: HTMLElement; sel: string; originalStyle: string };

// ---------------------------------------------------------------------------
// Storage / style-tag IDs
// ---------------------------------------------------------------------------

const LS_MODULE      = 'bmp-module-edits';
const LS_ELEMENT     = 'bmp-element-edits';
const LS_ARCHIVED    = 'bmp-archived';   // set of keys that are "binned" (still CSS-active)
const LS_BATCHES     = 'bmp-batches';
const LS_SAVECOUNT   = 'bmp-save-count';

const STYLE_MODULE   = 'bmp-style-module';
const STYLE_ELEMENT  = 'bmp-style-element';  // backup CSS (for elements not yet in DOM)
const STYLE_PREVIEW  = 'bmp-style-preview';
const STYLE_EDITMODE = 'bmp-style-editmode';

const FONT = '"IBM Plex Sans", sans-serif';

const FONT_FAMILIES = [
  { label: 'IBM Plex Sans',  value: '"IBM Plex Sans", sans-serif' },
  { label: 'Georgia',        value: 'Georgia, serif' },
  { label: 'Times New Roman',value: '"Times New Roman", serif' },
  { label: 'Helvetica',      value: 'Helvetica, Arial, sans-serif' },
  { label: 'Monospace',      value: '"Courier New", monospace' },
];

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

function loadModuleEdits(): ModuleEdits {
  try { return JSON.parse(localStorage.getItem(LS_MODULE)  || '{}'); } catch { return {}; }
}
function saveModuleEdits(e: ModuleEdits) {
  try { localStorage.setItem(LS_MODULE, JSON.stringify(e)); } catch {}
}
function loadElementEdits(): Record<string, ElementEdit> {
  try { return JSON.parse(localStorage.getItem(LS_ELEMENT) || '{}'); } catch { return {}; }
}
function saveElementEdits(e: Record<string, ElementEdit>) {
  try { localStorage.setItem(LS_ELEMENT, JSON.stringify(e)); } catch {}
}

// Archived = set of storage keys the user has "binned" — CSS stays active
function loadArchived(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(LS_ARCHIVED) || '[]')); } catch { return new Set(); }
}
function saveArchived(s: Set<string>) {
  try { localStorage.setItem(LS_ARCHIVED, JSON.stringify([...s])); } catch {}
}

// ---------------------------------------------------------------------------
// Batch / archive helpers
// ---------------------------------------------------------------------------

interface Batch {
  id: number;
  name: string;
  timestamp: number;
  modules: ModuleEdits;
  elements: Record<string, ElementEdit>;
}

function loadBatches(): Batch[] {
  try { return JSON.parse(localStorage.getItem(LS_BATCHES) || '[]'); } catch { return []; }
}
function saveBatches(b: Batch[]) {
  try { localStorage.setItem(LS_BATCHES, JSON.stringify(b)); } catch {}
}
function loadSaveCount(): number {
  try { return parseInt(localStorage.getItem(LS_SAVECOUNT) || '0', 10) || 0; } catch { return 0; }
}
function saveSaveCount(n: number) {
  try { localStorage.setItem(LS_SAVECOUNT, String(n)); } catch {}
}

// ---------------------------------------------------------------------------
// CSS builders  (backup stylesheet — primary persistence is via setProperty)
// ---------------------------------------------------------------------------

/** Build CSS only for edits that belong to `forPathname` */
function buildModuleCSS(edits: ModuleEdits, forPathname: string): string {
  return Object.entries(edits)
    .filter(([key]) => keyPathname(key) === forPathname)
    .map(([key, e]) => {
      const sel = cssSel(key);
      const rules: string[] = [];
      if (e.bg) {
        rules.push(`${sel} { background: ${e.bg} !important; background-color: ${e.bg} !important; }`);
      }
      if (e.heading) rules.push(`${sel} h1, ${sel} h2, ${sel} h3, ${sel} h4 { color: ${e.heading} !important; }`);
      if (e.text)    rules.push(`${sel} p, ${sel} li, ${sel} blockquote { color: ${e.text} !important; }`);
      if (e.tag)     rules.push(`${sel} > div > span:first-child, ${sel} > span:first-child { color: ${e.tag} !important; }`);
      return rules.join('\n');
    }).join('\n\n');
}

function buildElementCSS(edits: Record<string, ElementEdit>, forPathname: string): string {
  return Object.entries(edits)
    .filter(([key]) => keyPathname(key) === forPathname)
    .map(([key, e]) => {
      const sel = cssSel(key);
      const props: string[] = [];
      if (e.bg)            props.push(`background-color: ${e.bg} !important;`);
      if (e.fg)            props.push(`color: ${e.fg} !important;`);
      if (e.fontFamily)    props.push(`font-family: ${e.fontFamily} !important;`);
      if (e.fontWeight)    props.push(`font-weight: ${e.fontWeight} !important;`);
      if (e.fontSize)      props.push(`font-size: ${e.fontSize} !important;`);
      if (e.lineHeight)    props.push(`line-height: ${e.lineHeight} !important;`);
      if (e.letterSpacing) props.push(`letter-spacing: ${e.letterSpacing} !important;`);
      if (e.fontStyle)     props.push(`font-style: ${e.fontStyle} !important;`);
      if (e.textAlign)     props.push(`text-align: ${e.textAlign} !important;`);
      if (!props.length) return '';
      return `${sel} { ${props.join(' ')} }`;
    }).filter(Boolean).join('\n');
}

function injectCSS(id: string, css: string) {
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

// ---------------------------------------------------------------------------
// Apply element edit directly via setProperty — survives React re-renders
// because inline !important beats React's non-!important inline style updates
// ---------------------------------------------------------------------------

function applyEditToElement(el: HTMLElement, edit: Partial<ElementEdit>) {
  const s = el.style;
  if (edit.fg          !== undefined) s.setProperty('color',           edit.fg,            'important');
  if (edit.bg          !== undefined) s.setProperty('background-color',edit.bg,            'important');
  if (edit.fontFamily  !== undefined) s.setProperty('font-family',     edit.fontFamily,    'important');
  if (edit.fontWeight  !== undefined) s.setProperty('font-weight',     edit.fontWeight,    'important');
  if (edit.fontSize    !== undefined) s.setProperty('font-size',       edit.fontSize,      'important');
  if (edit.lineHeight  !== undefined) s.setProperty('line-height',     edit.lineHeight,    'important');
  if (edit.letterSpacing!== undefined)s.setProperty('letter-spacing',  edit.letterSpacing, 'important');
  if (edit.fontStyle   !== undefined) s.setProperty('font-style',      edit.fontStyle,     'important');
  if (edit.textAlign   !== undefined) s.setProperty('text-align',      edit.textAlign,     'important');
}

// ---------------------------------------------------------------------------
// Route-scoped key helpers
// Key format: "${pathname}::${cssSelector}"
// e.g. "/netzwerk::div:nth-child(1) > section:nth-child(3)"
// ---------------------------------------------------------------------------

/** Extract the raw CSS selector from a (possibly route-prefixed) key */
function cssSel(key: string): string {
  const i = key.indexOf('::');
  return i >= 0 ? key.slice(i + 2) : key;
}

/** Extract the pathname from a key (empty string for legacy/un-prefixed keys) */
function keyPathname(key: string): string {
  const i = key.indexOf('::');
  return i >= 0 ? key.slice(0, i) : '';
}

function reapplyAllElementEdits(edits: Record<string, ElementEdit>, pathname: string) {
  Object.entries(edits).forEach(([key, edit]) => {
    // Only apply edits that belong to this page
    if (keyPathname(key) !== pathname) return;
    const sel = cssSel(key);
    try {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return;
      applyEditToElement(el, edit);
      if (edit.text !== undefined) el.innerText = edit.text;
    } catch {}
  });
}

// ---------------------------------------------------------------------------
// Selectors  — always include the current route so edits are page-isolated
// ---------------------------------------------------------------------------

function getSectionSelector(section: HTMLElement, pathname: string): string {
  const parts: string[] = [];
  let cur: HTMLElement | null = section;
  while (cur && cur.tagName !== 'BODY') {
    const parent = cur.parentElement;
    if (!parent) break;
    const idx = Array.from(parent.children).indexOf(cur) + 1;
    parts.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
    cur = parent;
  }
  return `${pathname}::${parts.join(' > ')}`;
}

function getElementSelector(el: HTMLElement, pathname: string): string {
  const parts: string[] = [];
  let cur: HTMLElement | null = el;
  while (cur && cur.tagName !== 'BODY') {
    const parent = cur.parentElement;
    if (!parent) break;
    const idx = Array.from(parent.children).indexOf(cur) + 1;
    parts.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
    cur = parent;
  }
  return `${pathname}::${parts.join(' > ')}`;
}

// ---------------------------------------------------------------------------
// Color / style utilities
// ---------------------------------------------------------------------------

function rgbToHex(rgb: string): string {
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return '#000000';
  return '#' + m.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
}

function readSectionColors(section: HTMLElement): ModuleEdit {
  const bg  = window.getComputedStyle(section).backgroundColor;
  const h   = section.querySelector('h1,h2,h3') as HTMLElement | null;
  const p   = section.querySelector('p') as HTMLElement | null;
  const tag = section.querySelector('span') as HTMLElement | null;
  return {
    bg:      bg && bg !== 'rgba(0, 0, 0, 0)' ? rgbToHex(bg) : '#ffffff',
    heading: h   ? rgbToHex(window.getComputedStyle(h).color)   : '#101828',
    text:    p   ? rgbToHex(window.getComputedStyle(p).color)   : '#101828',
    tag:     tag ? rgbToHex(window.getComputedStyle(tag).color) : '#4A8FC9',
  };
}

function readElementProps(el: HTMLElement): ElementEdit {
  const cs = window.getComputedStyle(el);
  const bg = cs.backgroundColor;
  return {
    text:          el.innerText,
    fg:            rgbToHex(cs.color),
    bg:            bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' ? rgbToHex(bg) : undefined,
    fontFamily:    cs.fontFamily,
    fontWeight:    cs.fontWeight,
    fontSize:      Math.round(parseFloat(cs.fontSize)) + 'px',
    lineHeight:    cs.lineHeight !== 'normal' ? (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2) : '1.5',
    letterSpacing: cs.letterSpacing !== 'normal' && cs.letterSpacing !== '0px' ? cs.letterSpacing : '0em',
    fontStyle:     cs.fontStyle,
    textAlign:     cs.textAlign,
  };
}

// ---------------------------------------------------------------------------
// Edit-mode outline CSS
// ---------------------------------------------------------------------------

function injectEditModeCSS() {
  if (document.getElementById(STYLE_EDITMODE)) return;
  injectCSS(STYLE_EDITMODE, `
    body.bmp-edit-section section {
      cursor: pointer !important;
      outline: 1.5px dashed rgba(74,143,201,0.4) !important;
      outline-offset: -1px !important;
    }
    body.bmp-edit-section section:hover {
      outline: 2px solid #4A8FC9 !important;
      outline-offset: -2px !important;
    }
    body.bmp-edit-section section.bmp-sel {
      outline: 2px solid #EFBF04 !important;
      outline-offset: -2px !important;
    }
    body.bmp-edit-element *:not(.bmp-ed-panel):not(.bmp-ed-panel *) {
      cursor: crosshair !important;
      outline: 1px dashed rgba(239,191,4,0.25) !important;
      outline-offset: 0px !important;
    }
    body.bmp-edit-element *:not(.bmp-ed-panel):not(.bmp-ed-panel *):hover {
      outline: 2px solid #EFBF04 !important;
      outline-offset: 1px !important;
    }
    body.bmp-edit-section .bmp-ed-panel *,
    body.bmp-edit-element .bmp-ed-panel * {
      cursor: default !important;
      outline: none !important;
    }
  `);
}

// ---------------------------------------------------------------------------
// Shared UI: ColorRow
// ---------------------------------------------------------------------------

function ColorRow({
  label, value, onChange, allowEmpty,
}: {
  label: string; value: string; onChange: (v: string) => void; allowEmpty?: boolean;
}) {
  const pickerRef = useRef<HTMLInputElement>(null);
  const [hex, setHex] = useState(value);
  useEffect(() => { setHex(value); }, [value]);

  const commit = (raw: string) => {
    if (allowEmpty && raw === '') { onChange(''); setHex(''); return; }
    const v = raw.startsWith('#') ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{3,8}$/.test(v)) { onChange(v); setHex(v); }
    else setHex(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div
        onClick={() => pickerRef.current?.click()}
        title="Farbe wählen"
        style={{
          width: 30, height: 30, borderRadius: 4,
          background: value || 'transparent',
          border: '1.5px solid rgba(255,255,255,0.18)',
          cursor: 'pointer', flexShrink: 0,
          backgroundImage: value ? undefined : 'repeating-linear-gradient(45deg,rgba(255,255,255,0.15) 0,rgba(255,255,255,0.15) 3px,transparent 0,transparent 50%)',
          backgroundSize: '8px 8px',
        }}
      />
      <input
        ref={pickerRef} type="color"
        value={hex.length === 7 ? hex : '#000000'}
        onChange={e => { setHex(e.target.value); onChange(e.target.value); }}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT, fontSize: 9, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 3 }}>{label}</div>
        <input
          type="text" value={hex} placeholder={allowEmpty ? 'transparent' : '#000000'}
          onChange={e => setHex(e.target.value)}
          onBlur={() => commit(hex)}
          onKeyDown={e => e.key === 'Enter' && commit(hex)}
          style={{ fontFamily: FONT, fontSize: 12, color: '#fff', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', width: '100%', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>
    </div>
  );
}

function SmallInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontFamily: FONT, fontSize: 9, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 4 }}>{label}</div>
      <input
        type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{ fontFamily: FONT, fontSize: 12, color: '#fff', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 8px', width: '100%', outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Element popup — full editor with live preview
// ---------------------------------------------------------------------------

const FONT_WEIGHTS = [
  { value: '100', label: 'Thin' }, { value: '300', label: 'Light' },
  { value: '400', label: 'Reg'  }, { value: '500', label: 'Med'   },
  { value: '600', label: 'Semi' }, { value: '700', label: 'Bold'  },
  { value: '900', label: 'Black'},
];

const ALIGN_OPTIONS = [
  { value: 'left', icon: '⬛' }, { value: 'center', icon: '≡' },
  { value: 'right', icon: '▶' }, { value: 'justify', icon: '▬' },
];

function ElementPopup({
  popup, savedEdits, onSave, onClose,
}: {
  popup: PopupState;
  savedEdits: Record<string, ElementEdit>;
  onSave: (sel: string, edit: ElementEdit) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ElementTab>('color');

  const init = useCallback((): ElementEdit => {
    const saved = savedEdits[popup.sel];
    return saved ? { ...saved } : readElementProps(popup.el);
  }, [popup.sel, popup.el, savedEdits]);

  const [props, setProps] = useState<ElementEdit>(init);
  useEffect(() => { setProps(init()); }, [popup.sel, init]);

  const set = <K extends keyof ElementEdit>(key: K, val: ElementEdit[K]) =>
    setProps(p => ({ ...p, [key]: val }));

  // ── LIVE PREVIEW — apply every prop change directly to the element ──────
  useEffect(() => {
    applyEditToElement(popup.el, props);
    if (props.text !== undefined) popup.el.innerText = props.text;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleSave = () => {
    onSave(popup.sel, props);
    onClose();
  };

  const handleCancel = () => {
    // Restore original inline style exactly as it was before editing
    popup.el.setAttribute('style', popup.originalStyle);
    onClose();
  };

  const popX = Math.min(popup.x, window.innerWidth  - 300);
  const popY = Math.min(Math.max(popup.y, 8), window.innerHeight - 440);

  const tabBtn = (t: ElementTab, label: string) => (
    <button
      onClick={() => setTab(t)}
      style={{
        flex: 1, padding: '9px 0',
        fontFamily: FONT, fontSize: 9, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        background: t === tab ? 'rgba(255,255,255,0.09)' : 'transparent',
        color: t === tab ? '#fff' : 'rgba(255,255,255,0.35)',
        border: 'none',
        borderBottom: t === tab ? '2px solid #EFBF04' : '2px solid transparent',
        cursor: 'pointer',
      }}
    >{label}</button>
  );

  return (
    <div
      className="bmp-ed-panel bmp-editor-ignore"
      style={{
        position: 'fixed', left: popX, top: popY,
        width: 286, background: '#080D24',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
        zIndex: 99999, fontFamily: FONT,
        borderRadius: 6, overflow: 'hidden',
      }}
    >
      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', alignItems: 'stretch' }}>
        {tabBtn('color', 'Farbe')}
        {tabBtn('style', 'Stil')}
        {tabBtn('text',  'Text')}
        <button
          onClick={handleCancel}
          style={{ padding: '9px 12px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 15, lineHeight: 1 }}
        >✕</button>
      </div>

      <div style={{ padding: '14px 14px 10px' }}>

        {/* ── Farbe ── */}
        {tab === 'color' && (
          <>
            <ColorRow label="Textfarbe"        value={props.fg ?? '#ffffff'}
              onChange={v => set('fg', v)} />
            <ColorRow label="Hintergrundfarbe" value={props.bg ?? ''}
              onChange={v => set('bg', v || undefined)} allowEmpty />
          </>
        )}

        {/* ── Stil ── */}
        {tab === 'style' && (
          <>
            {/* Schriftart */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: FONT, fontSize: 9, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 4 }}>Schriftart</div>
              <select
                value={props.fontFamily ?? ''}
                onChange={e => set('fontFamily', e.target.value)}
                style={{ fontFamily: FONT, fontSize: 11, color: '#fff', background: '#0D1540', border: '1px solid rgba(255,255,255,0.12)', padding: '7px 8px', width: '100%', outline: 'none', cursor: 'pointer' }}
              >
                <option value="">— unverändert —</option>
                {FONT_FAMILIES.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Schriftstärke */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: FONT, fontSize: 9, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>Schriftstärke</div>
              <div style={{ display: 'flex', gap: 3 }}>
                {FONT_WEIGHTS.map(fw => {
                  const active = props.fontWeight === fw.value;
                  return (
                    <button
                      key={fw.value}
                      onClick={() => set('fontWeight', fw.value)}
                      style={{
                        flex: 1, padding: '5px 2px',
                        fontFamily: FONT, fontSize: 8, fontWeight: 700,
                        background: active ? '#EFBF04' : 'rgba(255,255,255,0.07)',
                        color: active ? '#101828' : 'rgba(255,255,255,0.5)',
                        border: 'none', cursor: 'pointer', borderRadius: 2,
                        transition: 'background 0.1s',
                      }}
                    >{fw.label}</button>
                  );
                })}
              </div>
            </div>

            <SmallInput label="Schriftgröße"      value={props.fontSize      ?? ''} onChange={v => set('fontSize', v)}      placeholder="16px" />
            <SmallInput label="Zeilenabstand"      value={props.lineHeight     ?? ''} onChange={v => set('lineHeight', v)}     placeholder="1.6" />
            <SmallInput label="Buchstabenabstand"  value={props.letterSpacing  ?? ''} onChange={v => set('letterSpacing', v)}  placeholder="0.05em" />

            {/* Ausrichtung */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: FONT, fontSize: 9, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>Ausrichtung</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {(['left','center','right','justify'] as const).map(a => {
                  const icons: Record<string,string> = { left:'L', center:'C', right:'R', justify:'J' };
                  const active = props.textAlign === a;
                  return (
                    <button key={a} onClick={() => set('textAlign', a)}
                      style={{ flex:1, padding:'6px 0', fontSize:10, fontWeight:700, fontFamily: FONT,
                        background: active ? '#EFBF04' : 'rgba(255,255,255,0.07)',
                        color: active ? '#101828' : 'rgba(255,255,255,0.5)',
                        border:'none', cursor:'pointer', borderRadius:2 }}
                    >{icons[a]}</button>
                  );
                })}
              </div>
            </div>

            {/* Kursiv */}
            <button
              onClick={() => set('fontStyle', props.fontStyle === 'italic' ? 'normal' : 'italic')}
              style={{
                padding: '7px 14px', fontFamily: FONT, fontSize: 11, fontStyle: 'italic',
                background: props.fontStyle === 'italic' ? '#EFBF04' : 'rgba(255,255,255,0.07)',
                color: props.fontStyle === 'italic' ? '#101828' : 'rgba(255,255,255,0.5)',
                border:'none', cursor:'pointer', borderRadius:2,
              }}
            >{props.fontStyle === 'italic' ? '✓ Kursiv aktiv' : 'Kursiv'}</button>
          </>
        )}

        {/* ── Text ── */}
        {tab === 'text' && (
          <>
            <div style={{ fontFamily: FONT, fontSize: 9, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 6 }}>Textinhalt</div>
            <textarea
              value={props.text ?? ''}
              onChange={e => set('text', e.target.value)}
              rows={6}
              style={{
                fontFamily: FONT, fontSize: 12, color: '#fff',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px', width: '100%', outline: 'none',
                boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.55,
              }}
            />
          </>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
        <button
          onClick={handleSave}
          style={{ flex:1, padding:'10px 0', fontFamily:FONT, fontSize:10, fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.15em',
            background:'#EFBF04', color:'#101828', border:'none', cursor:'pointer', borderRadius:2 }}
        >✓ Speichern</button>
        <button
          onClick={handleCancel}
          style={{ flex:1, padding:'10px 0', fontFamily:FONT, fontSize:10, fontWeight:700,
            textTransform:'uppercase', letterSpacing:'0.15em',
            background:'rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.5)',
            border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer', borderRadius:2 }}
        >Abbrechen</button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function LayoutEditor() {
  const location = useLocation();

  const [panelOpen,  setPanelOpen]  = useState(false);
  const [editMode,   setEditMode]   = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget>('section');

  // — Module state —
  const [savedModules, setSavedModules] = useState<ModuleEdits>(() => loadModuleEdits());
  const [selSel,  setSelSel]  = useState('');
  const [preview, setPreview] = useState<ModuleEdit>({});

  // — Element state —
  const [savedElements, setSavedElements] = useState<Record<string, ElementEdit>>(() => loadElementEdits());
  const [popup, setPopup] = useState<PopupState | null>(null);

  // — Bin (archived keys — CSS still active, hidden from main list) —
  const [archived, setArchived] = useState<Set<string>>(() => loadArchived());
  const [binOpen,  setBinOpen]  = useState(false);

  // — Batch / archive state —
  const [batches, setBatches]       = useState<Batch[]>(() => loadBatches());
  const [saveCount, setSaveCount]   = useState<number>(() => loadSaveCount());
  const [expandedBatch, setExpandedBatch] = useState<number | null>(null);

  // ── On mount ──────────────────────────────────────────────────────────────
  useEffect(() => {
    injectEditModeCSS();
    // Clear legacy (un-prefixed) storage to avoid cross-page contamination
    try { localStorage.removeItem('bmp-editor-colors'); } catch {}
    const mods = loadModuleEdits();
    const els  = loadElementEdits();
    setSavedModules(mods);
    setSavedElements(els);
    const p = location.pathname;
    injectCSS(STYLE_MODULE, buildModuleCSS(mods, p));
    injectCSS(STYLE_ELEMENT, buildElementCSS(els, p));
    setTimeout(() => reapplyAllElementEdits(els, p), 80);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Rebuild CSS + re-apply when route changes ─────────────────────────────
  useEffect(() => {
    const p = location.pathname;
    injectCSS(STYLE_MODULE,  buildModuleCSS(savedModules,   p));
    injectCSS(STYLE_ELEMENT, buildElementCSS(savedElements, p));
    const t = setTimeout(() => reapplyAllElementEdits(savedElements, p), 180);
    return () => clearTimeout(t);
  }, [location.pathname, savedModules, savedElements]);

  // ── Body class for edit mode + target ─────────────────────────────────────
  useEffect(() => {
    document.body.classList.remove('bmp-edit-section', 'bmp-edit-element');
    if (editMode) {
      document.body.classList.add(editTarget === 'section' ? 'bmp-edit-section' : 'bmp-edit-element');
    }
    if (!editMode) {
      cancelModuleEdit();
      setPopup(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, editTarget]);

  // ── Live section preview ───────────────────────────────────────────────────
  useEffect(() => {
    if (!selSel) { injectCSS(STYLE_PREVIEW, ''); return; }
    injectCSS(STYLE_PREVIEW, buildModuleCSS({ [selSel]: preview }, location.pathname));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, selSel]);

  // ── Click handler ─────────────────────────────────────────────────────────
  const handleClick = useCallback((e: MouseEvent) => {
    if (!editMode) return;
    const target = e.target as HTMLElement;
    if (target.closest('.bmp-ed-panel') || target.closest('.bmp-editor-ignore')) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (editTarget === 'section') {
      const section = target.closest('section') as HTMLElement | null;
      if (!section) return;
      document.querySelectorAll('.bmp-sel').forEach(el => el.classList.remove('bmp-sel'));
      section.classList.add('bmp-sel');
      const sel = getSectionSelector(section, location.pathname);
      setSelSel(sel);
      const existing = savedModules[sel];
      setPreview(existing ? { ...existing } : readSectionColors(section));
      setPopup(null);
      return;
    }

    // Element mode — open popup for the clicked element
    const sel           = getElementSelector(target, location.pathname);
    const originalStyle = target.getAttribute('style') || '';
    setPopup({ x: e.clientX + 14, y: e.clientY + 14, el: target, sel, originalStyle });
  }, [editMode, editTarget, savedModules]);

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [handleClick]);

  // ── Auto-archive every 10 saves ──────────────────────────────────────────
  const autoArchive = useCallback((
    newCount: number,
    mods: ModuleEdits,
    els: Record<string, ElementEdit>,
    currentBatches: Batch[],
  ): Batch[] => {
    if (newCount % 10 !== 0 || newCount === 0) return currentBatches;
    const batchNumber = currentBatches.length + 1;
    const newBatch: Batch = {
      id: Date.now(),
      name: `Batch ${batchNumber}`,
      timestamp: Date.now(),
      modules: { ...mods },
      elements: { ...els },
    };
    const next = [...currentBatches, newBatch];
    setBatches(next);
    saveBatches(next);
    return next;
  }, []);

  // ── Module actions ─────────────────────────────────────────────────────────
  const saveModuleEdit = () => {
    if (!selSel) return;
    const nextMods = { ...savedModules, [selSel]: { ...preview } };
    setSavedModules(nextMods);
    saveModuleEdits(nextMods);
    injectCSS(STYLE_MODULE, buildModuleCSS(nextMods, location.pathname));
    injectCSS(STYLE_PREVIEW, '');
    document.querySelectorAll('.bmp-sel').forEach(el => el.classList.remove('bmp-sel'));
    setSelSel(''); setPreview({});
    // auto-archive
    const newCount = saveCount + 1;
    setSaveCount(newCount); saveSaveCount(newCount);
    autoArchive(newCount, nextMods, savedElements, batches);
  };

  function cancelModuleEdit() {
    injectCSS(STYLE_PREVIEW, '');
    document.querySelectorAll('.bmp-sel').forEach(el => el.classList.remove('bmp-sel'));
    setSelSel(''); setPreview({});
  }

  const deleteModuleEdit = (sel: string) => {
    const next = { ...savedModules };
    delete next[sel];
    setSavedModules(next); saveModuleEdits(next);
    injectCSS(STYLE_MODULE, buildModuleCSS(next, location.pathname));
  };

  const clearAllModules = () => {
    setSavedModules({}); saveModuleEdits({});
    injectCSS(STYLE_MODULE, ''); injectCSS(STYLE_PREVIEW, '');
    cancelModuleEdit();
  };

  // ── Element actions ────────────────────────────────────────────────────────
  const saveElementEdit = (sel: string, edit: ElementEdit) => {
    const nextEls = { ...savedElements, [sel]: edit };
    setSavedElements(nextEls); saveElementEdits(nextEls);
    // Primary persistence: direct setProperty on element (strip route prefix first)
    const cssSel_ = cssSel(sel);
    try {
      const el = document.querySelector<HTMLElement>(cssSel_);
      if (el) applyEditToElement(el, edit);
    } catch {}
    // Backup: CSS style tag (catches elements that re-mount via React)
    injectCSS(STYLE_ELEMENT, buildElementCSS(nextEls, location.pathname));
    // auto-archive
    const newCount = saveCount + 1;
    setSaveCount(newCount); saveSaveCount(newCount);
    autoArchive(newCount, savedModules, nextEls, batches);
  };

  const deleteElementEdit = (sel: string) => {
    const next = { ...savedElements };
    delete next[sel];
    setSavedElements(next); saveElementEdits(next);
    injectCSS(STYLE_ELEMENT, buildElementCSS(next, location.pathname));
  };

  const clearAllElements = () => {
    setSavedElements({}); saveElementEdits({});
    injectCSS(STYLE_ELEMENT, '');
  };

  // ── Bin actions ────────────────────────────────────────────────────────────
  const binKey = (key: string) => {
    const next = new Set(archived).add(key);
    setArchived(next); saveArchived(next);
  };
  const unBinKey = (key: string) => {
    const next = new Set(archived);
    next.delete(key);
    setArchived(next); saveArchived(next);
  };
  const clearBin = () => {
    // Remove binned keys entirely from storage (now truly deleted)
    const nextMods = { ...savedModules };
    const nextEls  = { ...savedElements };
    archived.forEach(k => { delete nextMods[k]; delete nextEls[k]; });
    setSavedModules(nextMods); saveModuleEdits(nextMods);
    setSavedElements(nextEls); saveElementEdits(nextEls);
    injectCSS(STYLE_MODULE,  buildModuleCSS(nextMods,  location.pathname));
    injectCSS(STYLE_ELEMENT, buildElementCSS(nextEls, location.pathname));
    const empty = new Set<string>();
    setArchived(empty); saveArchived(empty);
  };

  // ── Batch actions ──────────────────────────────────────────────────────────
  const restoreBatch = (batch: Batch) => {
    const p = location.pathname;
    setSavedModules(batch.modules); saveModuleEdits(batch.modules);
    setSavedElements(batch.elements); saveElementEdits(batch.elements);
    injectCSS(STYLE_MODULE,  buildModuleCSS(batch.modules, p));
    injectCSS(STYLE_ELEMENT, buildElementCSS(batch.elements, p));
    setTimeout(() => reapplyAllElementEdits(batch.elements, p), 80);
  };

  const deleteBatch = (id: number) => {
    const next = batches.filter(b => b.id !== id);
    setBatches(next); saveBatches(next);
  };

  const clearAllBatches = () => { setBatches([]); saveBatches([]); };

  // ── Counts ─────────────────────────────────────────────────────────────────
  const activeModuleKeys  = Object.keys(savedModules).filter(k => !archived.has(k));
  const activeElementKeys = Object.keys(savedElements).filter(k => !archived.has(k));
  const binKeys = [...Object.keys(savedModules), ...Object.keys(savedElements)].filter(k => archived.has(k));
  const totalCount = activeModuleKeys.length + activeElementKeys.length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Trigger button */}
      <button
        className="bmp-editor-ignore"
        onClick={() => setPanelOpen(p => !p)}
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 99998,
          background: editMode ? '#EFBF04' : '#03093A',
          color: editMode ? '#101828' : '#EFBF04',
          fontFamily: FONT, fontSize: 10, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
          padding: '8px 14px', border: '1px solid #EFBF04',
          borderRadius: 20, cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'background 0.15s, color 0.15s',
        }}
      >
        ✏ EDITOR {totalCount > 0 && `· ${totalCount}`}
      </button>

      {/* Side panel */}
      {panelOpen && (
        <div
          className="bmp-ed-panel bmp-editor-ignore"
          style={{
            position: 'fixed', top: 0, right: 0,
            width: 300, height: '100vh',
            background: '#080D24',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            zIndex: 99997,
            display: 'flex', flexDirection: 'column',
            fontFamily: FONT, overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.2em' }}>BMP Editor</span>
            <button onClick={() => setPanelOpen(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>

          {/* Edit-mode toggle */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setEditMode(m => !m)}
              style={{
                width: '100%', padding: '10px 0', fontFamily: FONT, fontSize: 11,
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                background: editMode ? '#EFBF04' : 'rgba(255,255,255,0.07)',
                color: editMode ? '#101828' : '#fff',
                border: editMode ? 'none' : '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {editMode ? '⊙ Edit-Modus AKTIV' : '○ Edit-Modus aktivieren'}
            </button>

            {/* Section / Element toggle */}
            {editMode && (
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {(['section', 'element'] as EditTarget[]).map(t => (
                  <button
                    key={t}
                    onClick={() => { setEditTarget(t); setPopup(null); cancelModuleEdit(); }}
                    style={{
                      flex: 1, padding: '8px 0', fontFamily: FONT, fontSize: 9,
                      fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                      background: editTarget === t ? (t === 'section' ? '#4A8FC9' : '#EFBF04') : 'rgba(255,255,255,0.06)',
                      color: editTarget === t ? (t === 'section' ? '#fff' : '#101828') : 'rgba(255,255,255,0.4)',
                      border: 'none', cursor: 'pointer', borderRadius: 2,
                    }}
                  >
                    {t === 'section' ? '⬛ Sektion' : '✎ Element'}
                  </button>
                ))}
              </div>
            )}

            {editMode && (
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 10, lineHeight: 1.6, textAlign: 'center' }}>
                {editTarget === 'section'
                  ? 'Klicke eine Sektion (blau umrahmt) an'
                  : 'Klicke ein beliebiges Element an'}
              </p>
            )}
          </div>

          {/* Section editor */}
          {selSel && editTarget === 'section' && (
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 9, color: '#EFBF04', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, marginBottom: 14 }}>
                Sektion bearbeiten
              </div>
              <ColorRow label="Hintergrund"         value={preview.bg      ?? '#ffffff'} onChange={v => setPreview(p => ({ ...p, bg: v }))} />
              <ColorRow label="Überschrift (h1–h3)" value={preview.heading ?? '#101828'} onChange={v => setPreview(p => ({ ...p, heading: v }))} />
              <ColorRow label="Fließtext (p)"       value={preview.text    ?? '#101828'} onChange={v => setPreview(p => ({ ...p, text: v }))} />
              <ColorRow label="Tag / Eyebrow"       value={preview.tag     ?? '#4A8FC9'} onChange={v => setPreview(p => ({ ...p, tag: v }))} />
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button
                  onClick={saveModuleEdit}
                  style={{ flex:1, padding:'10px 0', fontFamily:FONT, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.14em', background:'#EFBF04', color:'#101828', border:'none', cursor:'pointer', borderRadius:2 }}
                >✓ Speichern</button>
                <button
                  onClick={cancelModuleEdit}
                  style={{ flex:1, padding:'10px 0', fontFamily:FONT, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.14em', background:'transparent', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer', borderRadius:2 }}
                >Abbrechen</button>
              </div>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', marginTop: 8, textAlign: 'center' }}>
                Vorschau live · erst bei Speichern übernommen
              </p>
            </div>
          )}

          {/* Saved modules list — active (not binned) */}
          {activeModuleKeys.length > 0 && (
            <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Sektionen ({activeModuleKeys.length})</span>
                <button onClick={clearAllModules} style={{ fontSize: 9, color: 'rgba(255,80,80,0.6)', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Alle löschen</button>
              </div>
              {activeModuleKeys.map(sel => {
                const edit = savedModules[sel];
                return (
                  <div key={sel} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {edit.bg && <div style={{ width: 14, height: 14, background: edit.bg, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2, flexShrink: 0 }} />}
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cssSel(sel).split(' > ').slice(-2).join(' > ')}
                    </span>
                    <button onClick={() => binKey(sel)} title="In Korb" style={{ fontSize: 12, color: 'rgba(255,200,60,0.55)', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 1 }}>🗑</button>
                    <button onClick={() => deleteModuleEdit(sel)} title="Löschen" style={{ fontSize: 11, color: 'rgba(255,80,80,0.5)', background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Saved elements list — active (not binned) */}
          {activeElementKeys.length > 0 && (
            <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Elemente ({activeElementKeys.length})</span>
                <button onClick={clearAllElements} style={{ fontSize: 9, color: 'rgba(255,80,80,0.6)', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Alle löschen</button>
              </div>
              {activeElementKeys.map(sel => {
                const edit = savedElements[sel];
                return (
                  <div key={sel} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {edit.fg && <div style={{ width: 10, height: 10, borderRadius: '50%', background: edit.fg, flexShrink: 0 }} />}
                    {edit.bg && <div style={{ width: 10, height: 10, background: edit.bg, flexShrink: 0 }} />}
                    {edit.text !== undefined && <span style={{ fontSize: 8, color: '#EFBF04', flexShrink: 0 }}>T</span>}
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cssSel(sel).split(' > ').slice(-2).join(' > ')}
                    </span>
                    <button onClick={() => binKey(sel)} title="In Korb" style={{ fontSize: 12, color: 'rgba(255,200,60,0.55)', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 1 }}>🗑</button>
                    <button onClick={() => deleteElementEdit(sel)} title="Löschen" style={{ fontSize: 11, color: 'rgba(255,80,80,0.5)', background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Bin / Korb ── */}
          {binKeys.length > 0 && (
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setBinOpen(o => !o)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px', background: 'transparent', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 13, lineHeight: 1 }}>🗑</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.18em', flex: 1 }}>
                  Korb ({binKeys.length})
                </span>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{binOpen ? '▲' : '▼'}</span>
              </button>
              {binOpen && (
                <div style={{ padding: '0 18px 12px' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 8, lineHeight: 1.5 }}>
                    Änderungen sind weiterhin aktiv — nur aus der Hauptliste ausgeblendet.
                  </div>
                  {binKeys.map(key => {
                    const isMod = key in savedModules;
                    const edit  = isMod ? savedModules[key] : savedElements[key];
                    const swatchBg = isMod ? (edit as ModuleEdit).bg : (edit as ElementEdit).bg;
                    const swatchFg = !isMod ? (edit as ElementEdit).fg : undefined;
                    return (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        {swatchBg && <div style={{ width: 10, height: 10, background: swatchBg, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, flexShrink: 0 }} />}
                        {swatchFg && <div style={{ width: 10, height: 10, borderRadius: '50%', background: swatchFg, flexShrink: 0 }} />}
                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.18)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {cssSel(key).split(' > ').slice(-2).join(' > ')}
                        </span>
                        <button onClick={() => unBinKey(key)} title="Wiederherstellen" style={{ fontSize: 9, color: 'rgba(100,200,100,0.6)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: FONT }}>↩</button>
                      </div>
                    );
                  })}
                  <button
                    onClick={clearBin}
                    style={{ marginTop: 10, width: '100%', padding: '7px 0', fontSize: 9, fontFamily: FONT, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                      background: 'rgba(255,60,60,0.1)', color: 'rgba(255,100,100,0.7)',
                      border: '1px solid rgba(255,60,60,0.15)', cursor: 'pointer', borderRadius: 2 }}
                  >Korb leeren (endgültig löschen)</button>
                </div>
              )}
            </div>
          )}

          {/* Archive / Batches */}
          {batches.length > 0 && (
            <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                  Archiv ({batches.length})
                </span>
                <button onClick={clearAllBatches} style={{ fontSize: 9, color: 'rgba(255,80,80,0.5)', background: 'transparent', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Alle löschen
                </button>
              </div>
              {[...batches].reverse().map(batch => {
                const isOpen = expandedBatch === batch.id;
                const mCount = Object.keys(batch.modules).length;
                const eCount = Object.keys(batch.elements).length;
                const d = new Date(batch.timestamp);
                const dateStr = `${d.getDate().toString().padStart(2,'0')}.${(d.getMonth()+1).toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
                return (
                  <div key={batch.id} style={{ marginBottom: 4, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                    {/* Batch header */}
                    <div
                      onClick={() => setExpandedBatch(isOpen ? null : batch.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', cursor: 'pointer', background: isOpen ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                    >
                      <span style={{ fontSize: 8, color: isOpen ? '#EFBF04' : 'rgba(255,255,255,0.5)', flexShrink: 0 }}>{isOpen ? '▼' : '▶'}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#EFBF04', flex: 1 }}>{batch.name}</span>
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>{dateStr}</span>
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>{mCount + eCount}</span>
                    </div>
                    {/* Expanded actions */}
                    {isOpen && (
                      <div style={{ padding: '8px 10px 10px', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
                          {mCount} Sektionen · {eCount} Elemente
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => restoreBatch(batch)}
                            style={{ flex: 1, padding: '6px 0', fontSize: 9, fontWeight: 700, fontFamily: FONT,
                              textTransform: 'uppercase', letterSpacing: '0.12em',
                              background: '#4A8FC9', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 2 }}
                          >↩ Wiederherstellen</button>
                          <button
                            onClick={() => deleteBatch(batch.id)}
                            style={{ padding: '6px 10px', fontSize: 9, fontFamily: FONT,
                              background: 'transparent', color: 'rgba(255,80,80,0.5)',
                              border: '1px solid rgba(255,80,80,0.2)', cursor: 'pointer', borderRadius: 2 }}
                          >✕</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Save counter hint */}
          {saveCount % 10 !== 0 && (
            <div style={{ padding: '8px 18px', textAlign: 'center' }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)' }}>
                {10 - (saveCount % 10)} Speicherungen bis Batch {batches.length + 1}
              </span>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: 'auto', padding: '10px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 9, color: 'rgba(255,255,255,0.12)', textAlign: 'center' }}>
            BMP Layout Editor — Dev Only
          </div>
        </div>
      )}

      {/* Backdrop */}
      {panelOpen && !editMode && (
        <div className="bmp-editor-ignore" onClick={() => setPanelOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99996 }} />
      )}

      {/* Element popup */}
      {popup && (
        <ElementPopup
          popup={popup}
          savedEdits={savedElements}
          onSave={saveElementEdit}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  );
}
