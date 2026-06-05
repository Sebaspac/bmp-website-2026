import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const ANTHRA = '#1A2030';
const NAVY   = '#111D55';
const GOLD   = '#EFBF04';
const CREAM  = '#EFE5E3';
const FF     = '"IBM Plex Sans", sans-serif';
const FB     = '"Inter", sans-serif';

const TOC = [
  { id: 'betreiber',         label: 'Angaben gem. §5 TMG' },
  { id: 'datenschutz',       label: 'Datenschutz' },
  { id: 'kontaktformular',   label: 'Kontaktformular' },
  { id: 'betroffenenrechte', label: 'Betroffenenrechte' },
  { id: 'aufsichtsbehoerde', label: 'Beschwerderecht' },
  { id: 'verantwortlicher',  label: 'Verantwortlicher' },
  { id: 'privacy-policy',    label: 'Privacy Policy' },
  { id: 'bildnachweise',     label: 'Bildnachweise' },
  { id: 'haftung',           label: 'Haftungsausschluss' },
];

const ADDR = (
  <>
    VM Verbands-Management GmbH<br />
    Edelsbergstr. 8<br />
    80686 München<br />
    Tel. +49 (0) 89 – 57007-0<br />
    Fax +49 (0) 89 – 57007 260<br />
    info@vm-verbands-management.de<br />
    HRB 110222 AG München, gesetzl. vertreten durch Friedrich Marx
  </>
);

export default function Impressum() {
  const isMobile = useIsMobile();

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ background: ANTHRA, padding: isMobile ? '48px 24px 40px' : '64px 80px 52px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.2), transparent)` }} />
        <Link
          to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: 32, transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          <ArrowLeft size={12} /> Zurück zur Website
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: GOLD }} />
          <span style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD }}>Legal</span>
        </div>
        <h1 style={{ fontFamily: FF, fontWeight: 900, fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.6rem)' : 'clamp(2.4rem, 4vw, 3.2rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 1.02, margin: '0 0 12px' }}>
          Impressum
        </h1>
        <p style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          Angaben gemäß §5 TMG · <Link to="/datenschutz" style={{ color: 'rgba(239,191,4,0.7)', textDecoration: 'none' }}>Zur Datenschutzerklärung →</Link>
        </p>
      </section>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '40px 24px' : '64px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>

        {/* LEFT – sticky TOC */}
        {!isMobile && (
          <nav style={{ position: 'sticky', top: 80 }}>
            <div style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>Inhalt</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {TOC.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{ display: 'block', fontFamily: FB, fontSize: 12, color: 'rgba(17,29,85,0.5)', textDecoration: 'none', padding: '5px 0 5px 12px', borderLeft: '2px solid transparent', transition: 'color 0.15s, border-color 0.15s', lineHeight: 1.4 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = NAVY; (e.currentTarget as HTMLElement).style.borderLeftColor = GOLD; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(17,29,85,0.5)'; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}
                  >{item.label}</a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(17,29,85,0.1)' }}>
              <Link to="/datenschutz" style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: NAVY, textDecoration: 'none' }}>
                Datenschutzerklärung →
              </Link>
            </div>
          </nav>
        )}

        {/* RIGHT – content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

          <Section id="betreiber" title="Angaben gemäß §5 TMG">
            <p style={{ ...body, fontWeight: 600, color: NAVY, marginBottom: 8 }}>Informationen über den Verantwortlichen</p>
            <AddressBlock>{ADDR}</AddressBlock>
            <p style={{ ...body, fontWeight: 600, color: NAVY, marginBottom: 8 }}>Angaben zum Webseitenbetreiber</p>
            <AddressBlock>{ADDR}</AddressBlock>
            <p style={body}>Inhaltlich Verantwortlicher gemäß TMG: VM Verbands-Management GmbH, gesetzl. vertreten durch Friedrich Marx</p>
          </Section>

          <Section id="datenschutz" title="Datenschutz & Datenverarbeitung">
            <p style={body}>Alle personenbezogenen Informationen werden vertraulich und gemäß den gesetzlichen Vorschriften behandelt, wie in der <Link to="/datenschutz" style={{ color: NAVY, fontWeight: 600 }}>Datenschutzerklärung</Link> erläutert. Den Schutz der persönlichen Daten nehmen wir als Webseitenbetreiber sehr ernst.</p>
            <p style={body}>Ein Besuch unserer Webseiten ist möglich, ohne Angaben zu Ihrer Person zu machen. Es werden bei jedem Zugriff auf unsere Website Nutzungsdaten durch Ihren Internetbrowser übermittelt und in Protokolldaten (Server-Logfiles) gespeichert. Zu diesen gespeicherten Daten gehören z. B. Name der aufgerufenen Seite, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und der anfragende Provider (IP-Adresse). Diese Daten dienen ausschließlich der Gewährleistung eines störungsfreien Betriebs unserer Website und zur Verbesserung unseres Angebotes. Eine Zuordnung dieser Daten zu einer bestimmten Person ist nicht möglich.</p>
            <p style={body}>Es erfolgt keine Zusammenführung dieser Daten mit anderen Datenquellen.</p>
          </Section>

          <Section id="kontaktformular" title="Erhebung und Verarbeitung beim Kontaktformular">
            <p style={body}>Sofern Sie uns über unsere Kontaktdaten eine E-Mail übersenden bzw. uns über das Kontaktformular informieren, erheben wir Ihre personenbezogenen Daten (Name, E-Mail-Adresse, Telefonnummer, Betreff, Nachrichtentext) nur in dem von Ihnen zur Verfügung gestellten Umfang. Die Datenverarbeitung dient dem Zweck der Kontaktaufnahme.</p>
            <p style={body}>Mit Absenden Ihrer Nachricht willigen Sie in die Verarbeitung der übermittelten Daten ein.</p>
            <Legal>Eine Verarbeitung erfolgt auf Grundlage des Art. 6 (1) lit. a DSGVO mit Ihrer Einwilligung.</Legal>
            <p style={body}>Sie können diese Einwilligung jederzeit durch Mitteilung an uns widerrufen. Ihre E-Mail-Adresse wird nur zur Bearbeitung Ihrer Anfrage genutzt. Ihre Daten werden anschließend gelöscht, sofern Sie der weitergehenden Verarbeitung und Nutzung nicht zugestimmt haben.</p>
          </Section>

          <Section id="betroffenenrechte" title="Betroffenenrechte">
            <p style={body}>Bei Vorliegen der gesetzlichen Voraussetzungen stehen Ihnen folgende Rechte nach Art. 15 bis 20 DSGVO zu:</p>
            <ul style={{ ...body, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung</li>
              <li>Recht auf Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
            </ul>
            <Legal>Außerdem steht Ihnen nach Art. 21 (1) DSGVO ein Widerspruchsrecht gegen die Verarbeitungen zu, die auf Art. 6 (1) f DSGVO beruhen, sowie gegen die Verarbeitung zum Zwecke von Direktwerbung.</Legal>
            <p style={body}>Auf Wunsch können Sie uns kontaktieren. Die Kontaktdaten finden Sie unter <Link to="/kontakt" style={{ color: NAVY, fontWeight: 600 }}>Kontakt</Link>.</p>
          </Section>

          <Section id="aufsichtsbehoerde" title="Beschwerderecht bei der Aufsichtsbehörde">
            <p style={body}>Sie haben gemäß Art. 77 DSGVO das Recht, sich bei der Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt.</p>
            <p style={{ ...body, fontWeight: 600, color: NAVY }}>Die zuständige Aufsichtsbehörde:</p>
            <AddressBlock>
              Bayerisches Landesamt für Datenschutzaufsicht<br />
              Postfach 606<br />
              91511 Ansbach<br />
              Deutschland<br />
              Tel. 09853-1300<br />
              Fax 09853-981300<br />
              E-Mail: poststelle@lda.bayern.de
            </AddressBlock>
          </Section>

          <Section id="verantwortlicher" title="Name und Anschrift des Verantwortlichen">
            <p style={body}>Verantwortlicher im Sinne der Datenschutz-Grundverordnung und sonstiger datenschutzrechtlicher Bestimmungen ist der Webseitenbetreiber:</p>
            <AddressBlock>{ADDR}</AddressBlock>
          </Section>

          <Section id="privacy-policy" title="Erklärung zum Datenschutz (Privacy Policy)">
            <p style={{ ...body, fontStyle: 'italic', borderLeft: `3px solid ${GOLD}`, paddingLeft: 16, marginBottom: 32 }}>
              Die Betreiber des Portals nehmen den Schutz der privaten Daten ernst. Die besondere Beachtung der Privatsphäre bei der Verarbeitung persönlicher Daten ist ein wichtiges Anliegen. Persönliche Daten werden gemäß den Bestimmungen des Bundesdatenschutzgesetzes BDSG verwendet; die Betreiber dieser Website verpflichten sich zur Verschwiegenheit. Diese Webseiten können Links zu Webseiten anderer Anbieter enthalten, auf die sich diese Datenschutzerklärung nicht erstreckt. Weitere wichtige Informationen finden sich auch in den Allgemeinen Nutzungsbedingungen.
            </p>

            <SubSection num="1" title="Personenbezogene Daten">
              <p style={body}>Personenbezogene Daten sind Informationen, die dazu genutzt werden können, die Identität zu erfahren. Darunter fallen Informationen wie richtiger Name, Adresse, Postanschrift, Telefonnummer. Informationen, die nicht direkt mit der wirklichen Identität in Verbindung gebracht werden (wie zum Beispiel favorisierte Webseiten oder Anzahl der Nutzer einer Site) fallen nicht darunter.</p>
              <p style={body}>Die statistische Auswertung anonymisierter Datensätze bleibt vorbehalten. Wir nutzen die persönlichen Daten zu Zwecken der technischen Administration der Webseiten und zur Kundenverwaltung nur im jeweils dafür erforderlichen Umfang. Darüber hinaus werden persönliche Daten nur dann gespeichert, wenn diese freiwillig angegeben werden.</p>
            </SubSection>

            <SubSection num="2" title="Weitergabe personenbezogener Daten">
              <p style={body}>Wir verwenden personenbezogene Informationen nur für diese Webseite. Wir geben die Informationen nicht ohne ausdrückliches Einverständnis an Dritte weiter. Sollten im Rahmen der Auftragsdatenverarbeitung Daten an Dienstleister weitergegeben werden, so sind diese an das Bundesdatenschutzgesetz BDSG, andere gesetzliche Vorschriften und an diese Privacy Policy gebunden.</p>
              <p style={body}>Erhebungen beziehungsweise Übermittlungen persönlicher Daten an staatliche Einrichtungen und Behörden erfolgen nur im Rahmen zwingender Rechtsvorschriften.</p>
              <p style={body}>Bitte beachten Sie gesondert die Hinweise zur Datenverarbeitung im Zusammenhang mit Google reCAPTCHA unter <Link to="/datenschutz#recaptcha" style={{ color: NAVY }}>Datenschutz</Link>.</p>
            </SubSection>

            <SubSection num="3" title="Kinder">
              <p style={body}>Personen unter 18 Jahren sollten ohne Zustimmung der Eltern oder Erziehungsberechtigten keine personenbezogenen Daten an uns übermitteln. Wir fordern keine personenbezogenen Daten von Kindern an, sammeln diese nicht und geben sie nicht an Dritte weiter.</p>
            </SubSection>

            <SubSection num="4" title="Recht auf Widerruf">
              <p style={body}>Wenn Sie uns personenbezogene Daten überlassen haben, können Sie diese jederzeit im Benutzerprofil wieder ändern und löschen. Für eine vollständige Löschung des Accounts bitte an den Webmaster wenden. Bis zu diesem Zeitpunkt erfolgte Beiträge in Foren, Kommentaren, Terminankündigungen und Artikeln bleiben allerdings unter Umständen erhalten – Informationen dazu auch bei den allgemeinen Nutzungsbedingungen.</p>
            </SubSection>

            <SubSection num="5" title="Links zu anderen Websites">
              <p style={body}>Unser Online-Angebot enthält Links zu anderen Websites. Wir haben keinen Einfluss darauf, dass deren Betreiber die Datenschutzbestimmungen einhalten.</p>
            </SubSection>

            <SubSection num="6" title="Beiträge">
              <p style={body}>Die Beiträge auf unserer Seite sind für jeden zugänglich. Beiträge sollten vor der Veröffentlichung sorgfältig darauf überprüft werden, ob sie Angaben enthalten, die nicht für die Öffentlichkeit bestimmt sind. Die Beiträge werden möglicherweise in Suchmaschinen erfasst und auch ohne gezielten Aufruf dieser Website weltweit zugreifbar.</p>
              <p style={body}>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Alle hier verwendeten Namen, Begriffe, Zeichen und Grafiken können Marken- oder Warenzeichen im Besitze ihrer rechtlichen Eigentümer sein. Die Rechte aller erwähnten und benutzten Marken- und Warenzeichen liegen ausschließlich bei deren Besitzern.</p>
            </SubSection>

            <SubSection num="7" title="Fragen und Kommentare">
              <p style={body}>Bei Fragen und für Anregungen und Kommentare zum Thema Datenschutz bitte per Mail an den Webmaster wenden.</p>
              <AddressBlock>{ADDR}</AddressBlock>
            </SubSection>
          </Section>

          <Section id="bildnachweise" title="Bildnachweise">
            <ul style={{ ...body, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Headline Maximilianeum: © Dietmar Egerer, München</li>
              <li>Ingrid Großmann, Taufkirchen</li>
              <li>EWIF Deutschland, München</li>
              <li>icon.icons.com</li>
              <li>Bilder zum Bayerischen Mittelstandspreis: © VM Verbands-Management GmbH, gesetzl. vertreten durch Friedrich Marx</li>
            </ul>
          </Section>

          <Section id="haftung" title="Haftungsausschluss">
            <p style={body}>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
            <p style={body}>Alle hier verwendeten Namen, Begriffe, Zeichen und Grafiken können Marken- oder Warenzeichen im Besitze ihrer rechtlichen Eigentümer sein. Die Rechte aller erwähnten und benutzten Marken- und Warenzeichen liegen ausschließlich bei deren Besitzern.</p>
            <p style={body}>Einen allgemeinen Haftungsausschluss finden Sie unter:{' '}
              <a href="https://www.disclaimer.de/disclaimer.htm" target="_blank" rel="noopener noreferrer" style={{ color: NAVY }}>disclaimer.de</a>
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ── shared styles ── */
const body: React.CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontSize: 15,
  color: 'rgba(58,58,58,0.82)',
  lineHeight: 1.85,
  margin: '0 0 16px',
  overflowWrap: 'anywhere',
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ scrollMarginTop: 80 }}>
      <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 16, marginBottom: 28 }}>
        <h2 style={{ fontFamily: FF, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: NAVY, margin: 0 }}>
          {title}
        </h2>
      </div>
      <div style={{ background: '#fff', padding: 'clamp(20px, 5vw, 28px) clamp(20px, 5vw, 32px)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        {children}
      </div>
    </div>
  );
}

function SubSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
        <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.12em' }}>{num}.</span>
        <h3 style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: NAVY, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function AddressBlock({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <address style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? 15 : 14, color: 'rgba(58,58,58,0.75)', lineHeight: 1.9, fontStyle: 'normal', background: 'rgba(17,29,85,0.04)', padding: '16px 20px', borderLeft: '2px solid rgba(239,191,4,0.4)', marginBottom: 16, overflowWrap: 'anywhere' }}>
      {children}
    </address>
  );
}

function Legal({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <p style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? 15 : 14, color: NAVY, lineHeight: 1.75, background: 'rgba(17,29,85,0.04)', padding: '12px 16px', borderLeft: `3px solid ${NAVY}`, margin: '0 0 16px', fontWeight: 500, overflowWrap: 'anywhere' }}>
      {children}
    </p>
  );
}
