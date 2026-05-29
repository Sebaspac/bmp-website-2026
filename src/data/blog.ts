export interface BlogSection {
  heading?: string;
  body: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  cat: string;
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  img: string;
  excerpt: string;
  sections: BlogSection[];
  tags: string[];
  relatedSlugs: string[];
}

export const articles: BlogArticle[] = [
  {
    slug: 'ki-nutzung-bayerischer-kmu',
    title: 'Wie Bayerns KMU die KI nutzen',
    cat: 'Innovation',
    date: '10. März 2026',
    author: 'Dr. Markus Berger',
    authorRole: 'Redakteur Wirtschaft & Innovation',
    readTime: '6 min',
    img: '/images/gala-saal-overview.jpg',
    excerpt:
      'Ein Deep-Dive in die Bewerbungsunterlagen 2024 zeigt: Der Mittelstand treibt die Digitalisierung aktiv voran.',
    sections: [
      {
        body: 'Die Bewerbungsunterlagen des Bayerischen Mittelstandspreises 2024 zeichnen ein überraschendes Bild: Nicht die großen Konzerne, sondern Familienbetriebe mit 30 bis 250 Mitarbeitern treiben die KI-Transformation in Bayern voran. Über 60 Prozent der eingereichten Projekte wiesen konkrete Anwendungen künstlicher Intelligenz auf – vor zwei Jahren waren es kaum 18 Prozent.',
      },
      {
        heading: 'Vom Pilotprojekt zur Kernstrategie',
        body: 'Was früher unter dem Label „Digitalisierungsexperiment" firmierte, ist heute Teil der Unternehmensstrategie. Bavarian Sensor Systems aus Landsberg optimiert mit Machine-Learning-Modellen seine Qualitätskontrolle und konnte die Ausschussrate um 34 Prozent senken. Der Holzverarbeiter Käser & Söhne in Rosenheim nutzt KI-gestützte Absatzprognosen und hat seinen Lagerbestand um ein Drittel reduziert. Beide Unternehmen sind Erstbewerber – und beide gehören zu den Nominierten 2026.',
      },
      {
        heading: 'Drei Muster, die sich wiederholen',
        body: 'Die Analyse der Unterlagen zeigt drei wiederkehrende Anwendungsfelder: Erstens Predictive Maintenance in der Fertigung, wo Sensordaten Maschinenausfälle früh erkennen. Zweitens KI-unterstützte Kundenkommunikation, meist in Form intelligenter Chatbots oder automatisierter E-Mail-Klassifizierung. Drittens datengetriebene Lieferkettenoptimierung – besonders relevant nach den Erfahrungen der Corona-Jahre.',
      },
      {
        heading: 'Hemmnisse bleiben real',
        body: 'Die positiven Zahlen dürfen nicht darüber hinwegtäuschen, dass rund 40 Prozent der Bewerber KI noch als „zu komplex" oder „zu teuer" einstufen. Fehlende Fachkräfte, unklare Datenschutzanforderungen und der Aufwand der Datenaufbereitung werden als Haupthürden genannt. Die Jury des BMP hat diese Erkenntnis zum Anlass genommen, das Kriterium „Zukunftsfähigkeit & Innovation" für 2026 stärker auf konkrete Umsetzungsschritte auszurichten – nicht nur auf strategische Absichtserklärungen.',
      },
      {
        heading: 'Fazit: Der Mittelstand überrascht',
        body: 'Bayern beweist einmal mehr, dass wirtschaftliche Stärke und Innovationsbereitschaft kein Widerspruch sind. Der Mittelstand – oft belächelt als träge oder technikavers – erweist sich als einer der aktivsten Treiber der KI-Adoption. Die nächste Preisverleihung am 22. Oktober 2026 dürfte diese Entwicklung eindrucksvoll sichtbar machen.',
      },
    ],
    tags: ['KI', 'Innovation', 'Digitalisierung', 'Mittelstand', 'Bayern'],
    relatedSlugs: ['ehrenamts-initiative-2026', 'bayerische-wirtschaft-waechst'],
  },
  {
    slug: 'ehrenamts-initiative-2026',
    title: 'Start der Ehrenamts-Initiative',
    cat: 'Engagement',
    date: '24. Februar 2026',
    author: 'Lena Hofmann',
    authorRole: 'Redakteurin Gesellschaft & Nachhaltigkeit',
    readTime: '4 min',
    img: '/images/networking-innenhof.jpg',
    excerpt:
      'Gemeinsam mit unseren Partnern fördern wir soziale Projekte mittelständischer Unternehmen.',
    sections: [
      {
        body: 'Mit dem Startschuss für die Ehrenamts-Initiative des Bayerischen Mittelstandspreises setzt der BMP ein deutliches Zeichen: Unternehmerisches Engagement hört nicht an der Werksgrenze auf. In Zusammenarbeit mit dem Europäischen Wirtschaftsforum (EWIF) und der Hochschule für angewandtes Management werden ab sofort gezielt Projekte gefördert, bei denen Mittelständler Verantwortung für ihr gesellschaftliches Umfeld übernehmen.',
      },
      {
        heading: 'Was die Initiative leistet',
        body: 'Die Initiative bietet teilnehmenden Unternehmen Sichtbarkeit, Netzwerkzugang und konkrete Unterstützung bei der Konzeption und Dokumentation ihrer sozialen Projekte. Ob Jugendförderung, regionale Integrationsarbeit oder ökologische Renaturierungsprojekte – das Programm ist bewusst offen gehalten. Entscheidend ist der nachweisbare lokale Mehrwert.',
      },
      {
        heading: 'Drei Unternehmen zeigen, wie es geht',
        body: 'Der Augsburger Fensterbauer Denk Fenster & Türen schickt seit zwei Jahren Auszubildende in lokale Schulen, um dort Handwerksberufe erlebbar zu machen. Die Münchner Softwareschmiede Alphacode Technologies stellt monatlich Entwicklerzeit für gemeinnützige Digitalprojekte bereit. Und die Bäckerei Huber aus Landshut betreibt ein Café, das Langzeitarbeitslosen einen strukturierten Wiedereinstieg ermöglicht. Alle drei wurden für die Pilotphase der Initiative ausgewählt.',
      },
      {
        heading: 'Bewertungskriterium ab 2026',
        body: 'Neu ist: Soziales Engagement fließt ab der Bewerbungsrunde 2026 offiziell in die Säule „Nachhaltigkeit & Verantwortung" ein. Unternehmen, die an der Ehrenamts-Initiative teilnehmen, erhalten bei der Jury-Sichtung einen gesonderten Hinweis auf ihre Projekte. Dies soll keine Bevorteilung sein, wohl aber eine Anerkennung von Leistungen, die in klassischen Bilanzen unsichtbar bleiben.',
      },
      {
        heading: 'Wie kann man teilnehmen?',
        body: 'Interessierte Unternehmen können sich ab sofort über das Kontaktformular des BMP anmelden. Die ersten offiziellen Projekttreffen sind für April und Mai 2026 geplant. Eine Beteiligung setzt keine laufende BMP-Bewerbung voraus – die Initiative steht allen bayerischen Mittelständlern offen.',
      },
    ],
    tags: ['Engagement', 'CSR', 'Ehrenamt', 'Nachhaltigkeit', 'Partner'],
    relatedSlugs: ['ki-nutzung-bayerischer-kmu', 'bayerische-wirtschaft-waechst'],
  },
  {
    slug: 'bayerische-wirtschaft-waechst',
    title: 'Bayerische Wirtschaft wächst',
    cat: 'Wirtschaft',
    date: '14. Januar 2026',
    author: 'Thomas Steinbach',
    authorRole: 'Wirtschaftskorrespondent',
    readTime: '5 min',
    img: '/images/gala-dinner.jpg',
    excerpt:
      'Neue Prognosen zeigen ein stabiles Wachstum für den Mittelstand – gute Aussichten für die Awards.',
    sections: [
      {
        body: 'Trotz geopolitischer Unsicherheiten und anhaltender Zinsdiskussionen zeigt die bayerische Wirtschaft eine bemerkenswerte Resilienz. Laut einer aktuellen Analyse des ifo-Instituts, die in Kooperation mit dem EWIF durchgeführt wurde, erwarten 68 Prozent der befragten bayerischen Mittelständler für 2026 ein moderates bis starkes Umsatzwachstum. Der Freistaat bleibt damit Deutschlands wirtschaftsstärkste Region – und der Nährboden für außergewöhnliche Unternehmensgeschichten.',
      },
      {
        heading: 'Exportstärke als Stabilitätsanker',
        body: 'Besonders der exportorientierte Mittelstand profitiert von der Erholung der Nachfrage aus dem asiatischen Raum. Maschinen- und Anlagenbauer in der Oberpfalz berichten von vollen Auftragsbüchern bis ins dritte Quartal 2026. Die Automobilzulieferbranche hingegen kämpft weiterhin mit dem Transformationsdruck, zeigt aber in Einzelfällen beeindruckende Pivot-Strategien – mehrere Unternehmen haben sich erfolgreich in die Batteriekomponenten-Wertschöpfung eingefädelt.',
      },
      {
        heading: 'Mittelstand als Jobmotor',
        body: 'Bayerische KMU mit bis zu 500 Mitarbeitern beschäftigen laut Statistischem Landesamt knapp 3,4 Millionen Menschen – das sind rund 55 Prozent aller sozialversicherungspflichtigen Arbeitsplätze im Freistaat. Die Arbeitslosigkeit in Bayern lag zuletzt bei 3,1 Prozent und bleibt damit bundesweit auf dem niedrigsten Stand. Gerade in ländlichen Regionen wie Niederbayern oder der Oberpfalz sind lokale Mittelständler oft der einzige relevante Arbeitgeber im Umkreis.',
      },
      {
        heading: 'Was das für den BMP 2026 bedeutet',
        body: 'Für den Bayerischen Mittelstandspreis sind die Zahlen ein gutes Vorzeichen. Mehr Wirtschaftskraft bedeutet mehr Investitionsbereitschaft, mehr Innovationsprojekte – und damit mehr hochwertige Bewerbungen. Prof. Dr. Stefan Steinhoff, wissenschaftlicher Beirat des BMP, rechnet mit einem Rekordfeld: „Die Qualität der Bewerbungen steigt jedes Jahr. 2026 erwarte ich Unternehmensgeschichten, die bundesweit Schule machen."',
      },
      {
        heading: 'Ausblick: Herausforderungen nicht verschweigen',
        body: 'Trotz positiver Grundstimmung mahnt die Analyse zur Vorsicht. Der Fachkräftemangel bleibt das meistgenannte Wachstumshemmnis. Über 40 Prozent der Unternehmen geben an, offene Stellen seit mehr als sechs Monaten nicht besetzen zu können. Hinzu kommen steigende Energiekosten und bürokratische Belastungen, die vor allem kleinere Betriebe spüren. Der BMP möchte genau hier ansetzen: nicht nur Erfolge feiern, sondern auch den Dialog darüber fördern, wie Politik und Wirtschaft gemeinsam Lösungen entwickeln können.',
      },
    ],
    tags: ['Wirtschaft', 'Wachstum', 'Bayern', 'Prognose', 'KMU'],
    relatedSlugs: ['ki-nutzung-bayerischer-kmu', 'ehrenamts-initiative-2026'],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find(a => a.slug === slug);
}
