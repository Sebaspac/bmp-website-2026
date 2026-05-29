export type UpdateType =
  | 'ankündigung'
  | 'erinnerung'
  | 'update'
  | 'highlight'
  | 'ergebnis'
  | 'wichtig'

export interface EventUpdate {
  id: string
  timestamp: string // ISO: "2026-03-15T10:30:00"
  type: UpdateType
  title: string
  body: string
}

export interface EventEckdaten {
  label: string
  value: string
}

export interface BmpEvent {
  slug: string
  title: string
  subtitle: string
  date: string
  time: string
  location: string
  venue: string
  category: string
  status: 'geplant' | 'anmeldung-offen' | 'intern' | 'abgeschlossen'
  img: string
  description: string
  longDescription: string
  eckdaten: EventEckdaten[]
  updates: EventUpdate[]
}

// ---------------------------------------------------------------------------
// Event 1 — Preisverleihung 2026
// ---------------------------------------------------------------------------

const preisverleihung2026: BmpEvent = {
  slug: 'preisverleihung-2026',
  title: 'Preisverleihung 2026',
  subtitle: 'Der Bayerische Mittelstandspreis — Gala-Abend in der Münchner Residenz',
  date: '22. Oktober 2026',
  time: '18:00 Uhr',
  location: 'München',
  venue: 'Residenz München, Antiquarium',
  category: 'Gala / Event',
  status: 'geplant',
  img: '/images/buehne-moderatoren.jpg',
  description:
    'Die Preisverleihung des Bayerischen Mittelstandspreises 2026 ist der feierliche Höhepunkt des Jahrgangs. Im prunkvollen Antiquarium der Münchner Residenz werden herausragende mittelständische Unternehmen Bayerns vor geladenen Gästen aus Wirtschaft, Politik und Gesellschaft ausgezeichnet. Der Abend vereint Ehrung, Networking und ein exklusives Rahmenprogramm auf höchstem Niveau.',
  longDescription: `Die Preisverleihung des Bayerischen Mittelstandspreises findet in diesem Jahr im historischen Antiquarium der Münchner Residenz statt — einem der bedeutendsten Renaissancesäle nördlich der Alpen. Der festliche Rahmen unterstreicht die Wertschätzung, die wir den ausgezeichneten Unternehmen entgegenbringen: Sie stehen exemplarisch für unternehmerischen Mut, regionale Verwurzelung und wirtschaftliche Stärke.

Der Abend beginnt mit einem Empfang und Sektempfang ab 18:00 Uhr, gefolgt von der offiziellen Verleihungszeremonie mit Laudationes, musikalischen Darbietungen und Grußworten aus der Bayerischen Staatsregierung. Im Anschluss lädt ein gemeinsames Gala-Dinner zum Austausch und zur Vernetzung ein. Alle Nominierten, Preisträger und geladenen Gäste erleben einen Abend, der Tradition und modernen Unternehmergeist in Einklang bringt.`,
  eckdaten: [
    { label: 'Datum', value: '22. Oktober 2026' },
    { label: 'Uhrzeit', value: '18:00 Uhr (Einlass ab 17:30 Uhr)' },
    { label: 'Ort', value: 'München' },
    { label: 'Venue', value: 'Residenz München, Antiquarium' },
    { label: 'Dresscode', value: 'Schwarzer Anzug / Abendgarderobe' },
    { label: 'Kapazität', value: '350 geladene Gäste' },
    { label: 'Anmeldeschluss', value: '01. Oktober 2026' },
    { label: 'Veranstalter', value: 'Bayerischer Mittelstandspreis e. V.' },
    {
      label: 'Programmpunkte',
      value: 'Sektempfang, Verleihungszeremonie, Laudationes, Gala-Dinner',
    },
  ],
  updates: [
    {
      id: 'pv2026-u8',
      timestamp: '2026-09-10T09:00:00',
      type: 'erinnerung',
      title: 'Anmeldeschluss naht — letzte Plätze verfügbar',
      body: 'Nur noch wenige Wochen bis zum Anmeldeschluss am 1. Oktober 2026. Wir bitten alle Nominierten und eingeladenen Gäste, ihre Teilnahme baldmöglichst zu bestätigen, da die Kapazitäten im Antiquarium begrenzt sind.',
    },
    {
      id: 'pv2026-u7',
      timestamp: '2026-08-05T11:30:00',
      type: 'update',
      title: 'Abendprogramm finalisiert',
      body: 'Das Programm für den Gala-Abend ist nun vollständig abgestimmt. Die Verleihungszeremonie umfasst fünf Kategorien mit je einer Laudatio und einem Grußwort des Bayerischen Staatsministers für Wirtschaft. Musikalisch begleitet wird der Abend von einem Streichquartett der Münchner Philharmoniker.',
    },
    {
      id: 'pv2026-u6',
      timestamp: '2026-07-14T14:00:00',
      type: 'highlight',
      title: 'Moderatorin bestätigt',
      body: 'Wir freuen uns, die Bestätigung von Katharina Bremer als Moderatorin des Abends bekanntzugeben. Die erfahrene Wirtschaftsjournalistin führt bereits zum zweiten Mal durch die Preisverleihung des Bayerischen Mittelstandspreises.',
    },
    {
      id: 'pv2026-u5',
      timestamp: '2026-06-01T10:00:00',
      type: 'update',
      title: 'Einladungen an Gäste versendet',
      body: 'Die persönlichen Einladungen an alle 350 geladenen Gäste wurden heute postalisch sowie per E-Mail versandt. Darunter befinden sich Vertreter aus Wirtschaft, Politik, Verbänden und Medien aus ganz Bayern.',
    },
    {
      id: 'pv2026-u4',
      timestamp: '2026-04-22T09:00:00',
      type: 'ankündigung',
      title: 'Location offiziell bestätigt',
      body: 'Die Bayerische Schlösserverwaltung hat die Nutzung des Antiquariums in der Münchner Residenz für den 22. Oktober 2026 offiziell bestätigt. Damit steht der feierliche Rahmen der diesjährigen Preisverleihung fest.',
    },
    {
      id: 'pv2026-u3',
      timestamp: '2026-03-15T08:30:00',
      type: 'update',
      title: 'Jury-Entscheidung abgeschlossen',
      body: 'Die unabhängige Jury hat ihre Beratungen beendet und die Preisträger in allen fünf Kategorien bestimmt. Die Entscheidungen werden bis zur Preisverleihung vertraulich behandelt. Eine persönliche Benachrichtigung der Preisträger erfolgt Ende August.',
    },
    {
      id: 'pv2026-u2',
      timestamp: '2026-02-01T12:00:00',
      type: 'ankündigung',
      title: 'Bewerbungsphase geschlossen',
      body: 'Die Bewerbungsphase für den Bayerischen Mittelstandspreis 2026 ist mit dem 31. Januar erfolgreich abgeschlossen worden. Insgesamt wurden 214 Bewerbungen eingereicht — ein neuer Rekord. Die Jury tritt im Februar zu ihrer ersten Sitzung zusammen.',
    },
    {
      id: 'pv2026-u1',
      timestamp: '2026-01-08T10:00:00',
      type: 'ankündigung',
      title: 'Jahrgang 2026 offiziell eröffnet',
      body: 'Der Bayerische Mittelstandspreis 2026 ist offiziell gestartet. Ab sofort können sich Unternehmen und Institutionen für die diesjährige Auszeichnung bewerben. Alle Informationen zu den Kategorien und dem Bewerbungsverfahren stehen auf unserer Website bereit.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Event 2 — Mittelstands-Gipfel 2026
// ---------------------------------------------------------------------------

const mittelstandsGipfel2026: BmpEvent = {
  slug: 'mittelstands-gipfel-2026',
  title: 'Mittelstands-Gipfel 2026',
  subtitle: 'Impulse, Dialog und Vernetzung für den bayerischen Mittelstand',
  date: '15. Juni 2026',
  time: '09:00 Uhr',
  location: 'Nürnberg',
  venue: 'NürnbergMesse, Halle 7A',
  category: 'Workshop',
  status: 'anmeldung-offen',
  img: '/images/networking-innenhof.jpg',
  description:
    'Der Mittelstands-Gipfel 2026 bringt Unternehmerinnen und Unternehmer aus ganz Bayern für einen Tag der Begegnung, des Austauschs und der konkreten Weiterbildung zusammen. In Panels, Workshops und Netzwerkformaten werden aktuelle Herausforderungen des Mittelstands diskutiert — von Digitalisierung über Fachkräftemangel bis hin zu nachhaltiger Unternehmensführung.',
  longDescription: `Der Mittelstands-Gipfel ist das zentrale Begegnungsformat des Bayerischen Mittelstandspreises für alle, die den Mittelstand aktiv gestalten. Im Mittelpunkt stehen in diesem Jahr drei Themenschwerpunkte: digitale Transformation in produzierenden Betrieben, Strategien zur Fachkräftegewinnung in ländlichen Regionen sowie resiliente Lieferketten in einer globalisierten Wirtschaft. Renommierte Referentinnen und Referenten aus Wissenschaft, Praxis und Politik gestalten das Programm.

Die Veranstaltung in der NürnbergMesse bietet neben Hauptbühnen-Panels auch kleinere Workshop-Formate mit begrenzter Teilnehmerzahl, in denen konkrete Lösungsansätze erarbeitet werden. Ein strukturiertes Networking-Programm am Mittag und am Nachmittag sorgt dafür, dass aus Gesprächen echte Verbindungen entstehen. Die Anmeldung ist derzeit geöffnet — Plätze sind begrenzt.`,
  eckdaten: [
    { label: 'Datum', value: '15. Juni 2026' },
    { label: 'Uhrzeit', value: '09:00–18:00 Uhr' },
    { label: 'Ort', value: 'Nürnberg' },
    { label: 'Venue', value: 'NürnbergMesse, Halle 7A' },
    { label: 'Dresscode', value: 'Business Casual' },
    { label: 'Kapazität', value: '600 Teilnehmerinnen und Teilnehmer' },
    { label: 'Anmeldeschluss', value: '31. Mai 2026' },
    { label: 'Veranstalter', value: 'Bayerischer Mittelstandspreis e. V.' },
    {
      label: 'Programmpunkte',
      value: 'Keynotes, Panel-Diskussionen, Workshops, Networking-Lunch, Abschluss-Podium',
    },
  ],
  updates: [
    {
      id: 'mg2026-u7',
      timestamp: '2026-05-20T10:00:00',
      type: 'wichtig',
      title: 'Anmeldeschluss verlängert bis 31. Mai',
      body: 'Aufgrund der großen Nachfrage und mehrfacher Rückmeldungen haben wir den Anmeldeschluss vom 20. Mai auf den 31. Mai 2026 verlängert. Bitte melden Sie sich zeitnah an — die verbleibenden Plätze sind stark begrenzt.',
    },
    {
      id: 'mg2026-u6',
      timestamp: '2026-04-28T09:30:00',
      type: 'highlight',
      title: 'Keynote-Speaker bestätigt',
      body: 'Wir freuen uns, Prof. Dr. Monika Hartmann (Technische Universität München) als Keynote-Speakerin gewonnen zu haben. Sie spricht zum Thema „KI im Mittelstand: Chancen jenseits des Hypes". Weitere Bestätigungen folgen in Kürze.',
    },
    {
      id: 'mg2026-u5',
      timestamp: '2026-04-03T11:00:00',
      type: 'ankündigung',
      title: 'Anmeldung ab sofort geöffnet',
      body: 'Die Anmeldung zum Mittelstands-Gipfel 2026 ist ab heute freigeschaltet. Teilnehmerinnen und Teilnehmer können sich über unser Online-Portal für die Gesamtveranstaltung sowie für einzelne Workshops anmelden. Frühbucher erhalten vergünstigte Konditionen bis zum 30. April.',
    },
    {
      id: 'mg2026-u4',
      timestamp: '2026-03-10T14:00:00',
      type: 'update',
      title: 'Programm veröffentlicht',
      body: 'Das vollständige Tagesprogramm des Mittelstands-Gipfels 2026 ist jetzt online abrufbar. Es umfasst drei Hauptbühnen-Panels, zwölf Workshops in parallelen Tracks sowie ein moderiertes Networking-Format am Mittag.',
    },
    {
      id: 'mg2026-u3',
      timestamp: '2026-02-18T09:00:00',
      type: 'update',
      title: 'NürnbergMesse als Venue bestätigt',
      body: 'Die NürnbergMesse GmbH hat die Nutzung der Halle 7A für den 15. Juni 2026 vertraglich bestätigt. Damit steht die Veranstaltungsfläche fest. Die Halle bietet optimale Bedingungen für Großveranstaltungen mit flexiblen Workshop-Räumen.',
    },
    {
      id: 'mg2026-u2',
      timestamp: '2026-02-01T10:00:00',
      type: 'update',
      title: 'Themenstruktur festgelegt',
      body: 'Das Programmkomitee hat die drei inhaltlichen Schwerpunkte des Gipfels final abgestimmt: (1) Digitale Transformation in KMU, (2) Fachkräftesicherung in der Region, (3) Resiliente Lieferketten. Referentinnen und Referenten werden derzeit angefragt.',
    },
    {
      id: 'mg2026-u1',
      timestamp: '2026-01-15T08:00:00',
      type: 'ankündigung',
      title: 'Mittelstands-Gipfel 2026 angekündigt',
      body: 'Der Bayerische Mittelstandspreis e. V. gibt bekannt: Der diesjährige Mittelstands-Gipfel findet am 15. Juni 2026 in Nürnberg statt. Erstmals wird die Veranstaltung auf der NürnbergMesse ausgerichtet und bietet damit deutlich mehr Raum für Teilnehmer und Formate.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Event 3 — Nominierten-Auswahl 2026
// ---------------------------------------------------------------------------

const nominiertenAuswahl2026: BmpEvent = {
  slug: 'nominierten-auswahl-2026',
  title: 'Nominierten-Auswahl 2026',
  subtitle: 'Interne Jury-Sitzung zur Festlegung der Nominierten des Jahrgangs 2026',
  date: '04. August 2026',
  time: '10:00 Uhr',
  location: 'Regensburg',
  venue: 'Haus der Bayerischen Wirtschaft, Regensburg',
  category: 'Jury-Sitzung',
  status: 'intern',
  img: '/images/saal-gedeckt.jpg',
  description:
    'Die Nominierten-Auswahl ist eine interne Jury-Sitzung, bei der die unabhängigen Jurymitglieder des Bayerischen Mittelstandspreises die nominierten Unternehmen für den Jahrgang 2026 final festlegen. Die Sitzung findet unter Ausschluss der Öffentlichkeit statt und ist nicht öffentlich zugänglich.',
  longDescription: `Die Jury-Sitzung zur Nominierten-Auswahl ist ein zentrales Element im Vergabeprozess des Bayerischen Mittelstandspreises. Die zwölf Jurymitglieder — bestehend aus renommierten Persönlichkeiten aus Wissenschaft, Wirtschaft und Zivilgesellschaft — bewerten an diesem Tag die eingegangenen Bewerbungen anhand der definierten Kriterien und legen die Nominierten in jeder Kategorie fest. Das Verfahren folgt klaren Prinzipien der Unabhängigkeit, Transparenz und Nachvollziehbarkeit.

Die Sitzung findet im Haus der Bayerischen Wirtschaft in Regensburg statt und dauert voraussichtlich den gesamten Arbeitstag. Im Vorfeld haben alle Jurymitglieder die anonymisierten Bewerbungsunterlagen in Einzelprüfung bewertet. Die Ergebnisse der Sitzung werden nach einer Sperrfrist von vier Wochen öffentlich kommuniziert und die Nominierten persönlich benachrichtigt.`,
  eckdaten: [
    { label: 'Datum', value: '04. August 2026' },
    { label: 'Uhrzeit', value: '10:00–17:00 Uhr' },
    { label: 'Ort', value: 'Regensburg' },
    { label: 'Venue', value: 'Haus der Bayerischen Wirtschaft, Regensburg' },
    { label: 'Dresscode', value: 'Business' },
    { label: 'Kapazität', value: '12 Jurymitglieder (interne Sitzung)' },
    { label: 'Anmeldeschluss', value: 'Geschlossener Teilnehmerkreis' },
    { label: 'Veranstalter', value: 'Bayerischer Mittelstandspreis e. V.' },
    {
      label: 'Programmpunkte',
      value: 'Einzelwertungen, Jury-Diskussion, Abstimmung, Protokollierung',
    },
  ],
  updates: [
    {
      id: 'na2026-u7',
      timestamp: '2026-07-28T08:00:00',
      type: 'erinnerung',
      title: 'Unterlagen fristgerecht eingegangen',
      body: 'Alle Bewerbungsunterlagen wurden bis zum 25. Juli fristgerecht anonymisiert und an die Jurymitglieder übermittelt. Die Vorab-Einzelbewertungen sind bis zum 1. August einzureichen. Bitte beachten Sie die Vertraulichkeit der Unterlagen.',
    },
    {
      id: 'na2026-u6',
      timestamp: '2026-07-10T11:00:00',
      type: 'update',
      title: 'Bewerbungsunterlagen anonymisiert',
      body: 'Die Geschäftsstelle hat sämtliche 214 eingegangenen Bewerbungen anonymisiert und kategorisiert. Die Unterlagen werden in der kommenden Woche digital an alle Jurymitglieder übermittelt. Die Einzelbewertungsphase beginnt damit termingerecht.',
    },
    {
      id: 'na2026-u5',
      timestamp: '2026-06-15T14:00:00',
      type: 'wichtig',
      title: 'Jury vollständig bestätigt',
      body: 'Alle zwölf Jurymitglieder für den Jahrgang 2026 haben ihre Teilnahme an der Sitzung am 4. August schriftlich bestätigt. Darunter sind vier neue Mitglieder, die erstmals in der Jury des Bayerischen Mittelstandspreises mitwirken.',
    },
    {
      id: 'na2026-u4',
      timestamp: '2026-05-04T09:30:00',
      type: 'update',
      title: 'Bewertungskriterien für 2026 verabschiedet',
      body: 'Das Kuratorium hat die aktualisierten Bewertungskriterien für den Jahrgang 2026 verabschiedet. Neu hinzugekommen ist das Kriterium „Gesellschaftliche Verantwortung und Nachhaltigkeit", das künftig 15 % der Gesamtbewertung ausmacht.',
    },
    {
      id: 'na2026-u3',
      timestamp: '2026-04-01T10:00:00',
      type: 'update',
      title: 'Venue in Regensburg bestätigt',
      body: 'Das Haus der Bayerischen Wirtschaft in Regensburg steht für die Jury-Sitzung am 4. August zur Verfügung. Die Räumlichkeiten bieten optimale Arbeitsbedingungen und diskreten Rahmen für die vertraulichen Beratungen.',
    },
    {
      id: 'na2026-u2',
      timestamp: '2026-03-01T08:00:00',
      type: 'ankündigung',
      title: 'Jury-Sitzung terminiert',
      body: 'Die interne Nominierten-Auswahl des Bayerischen Mittelstandspreises 2026 ist für den 4. August in Regensburg angesetzt. Die Einladungen an alle Jurymitglieder wurden versandt. Die Teilnahme ist verbindlich und wird im Jurymitgliedsvertrag geregelt.',
    },
    {
      id: 'na2026-u1',
      timestamp: '2026-01-20T09:00:00',
      type: 'ankündigung',
      title: 'Jury-Besetzung für 2026 bekannt gegeben',
      body: 'Der Bayerische Mittelstandspreis e. V. gibt die Zusammensetzung der unabhängigen Jury für den Jahrgang 2026 bekannt. Die Jury besteht aus zwölf Persönlichkeiten aus Wissenschaft, Unternehmertum, Verbänden und Zivilgesellschaft. Vier Mitglieder sind neu.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const events: BmpEvent[] = [
  preisverleihung2026,
  mittelstandsGipfel2026,
  nominiertenAuswahl2026,
]

export function getEventBySlug(slug: string): BmpEvent | undefined {
  return events.find((event) => event.slug === slug)
}
