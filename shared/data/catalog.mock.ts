/**
 * Razvojni seed podaci.
 *
 * Proizvođači (Caesar, Cercom, Serenissima, CIR, Elios) su stvarni brendovi iz Floor5
 * asortimana, potvrđeni preko Instagram bio-a (@keramikafloor5). Kolekcije, proizvodi,
 * dimenzije i cene u ovom fajlu su ILUSTRATIVNI PLACEHOLDER radi razvoja i testiranja
 * kataloga — zamenjuju se stvarnim sadržajem iz Sanity Studio-a (vidi cms/schemas).
 */
import type { Manufacturer, Collection, Product } from '../types/catalog'

export const manufacturers: Manufacturer[] = [
  { slug: 'caesar', naziv: 'Caesar', zemljaPorekla: 'Italija', opis: 'Italijanska porcelanska keramika, poznata po velikim formatima i imitacijama prirodnog kamena.' },
  { slug: 'cercom', naziv: 'Cercom', zemljaPorekla: 'Italija', opis: 'Italijanski proizvođač sa fokusom na teksture inspirisane prirodnim materijalima.' },
  { slug: 'serenissima', naziv: 'Serenissima Cir', zemljaPorekla: 'Italija', opis: 'Dugogodišnja italijanska tradicija u proizvodnji keramičkih pločica.' },
  { slug: 'cir', naziv: 'CIR', zemljaPorekla: 'Italija', opis: 'Italijanska keramika za stambene i poslovne prostore.' },
  { slug: 'elios', naziv: 'Elios Ceramica', zemljaPorekla: 'Italija', opis: 'Italijanski proizvođač porcelanskih pločica širokog kolekcijskog raspona.' }
]

export const collections: Collection[] = [
  {
    slug: 'terra-greige', naziv: 'Terra Greige', proizvodjacSlug: 'caesar', stil: 'Kamen',
    opis: 'Veliki format inspirisan prirodnim kamenom, u toplim greige tonovima. Rektificirane ivice omogućavaju polaganje sa minimalnom fugom, a mat površina krije otiske i lako se održava — zato je ova kolekcija podjednako dobar izbor za dnevni boravak kao i za poslovni prostor sa velikim protokom ljudi.'
  },
  {
    slug: 'marmo-statuario', naziv: 'Marmo Statuario', proizvodjacSlug: 'serenissima', stil: 'Mermer',
    opis: 'Klasičan beli mermer sa izraženim sivim žilama, prenet u porcelansku keramiku velikog formata. Visok sjaj i verno preslikana tekstura prirodnog kamena čine je prvim izborom za kupatila i prostore gde je vizuelni efekat mermera u prvom planu, bez zahtevnog održavanja koje prirodni kamen nosi sa sobom.'
  },
  {
    slug: 'cemento-urbano', naziv: 'Cemento Urbano', proizvodjacSlug: 'cir', stil: 'Beton',
    opis: 'Industrijski izgled livenog betona, u ujednačenoj mat površini bez izraženog šara. Dostupna u više formata — od standardnih podnih ploča do manjeg fasadnog formata — pa se ista vizuelna priča može provući kroz enterijer i eksterijer istog objekta.'
  },
  {
    slug: 'pietra-scura', naziv: 'Pietra Scura', proizvodjacSlug: 'elios', stil: 'Kamen',
    opis: 'Tamni kamen izraženog reljefa, razvijen prvenstveno za fasade i eksterijerne podove gde je otpornost na klizanje presudna. Strukturirana površina i otpornost na mraz je čine pogodnom i za bazenske terase i druge spoljne površine izložene vremenskim uslovima.'
  }
]

export const products: Product[] = [
  {
    slug: 'terra-greige-60x120-mat',
    naziv: 'Terra Greige 60×120',
    proizvodjacSlug: 'caesar',
    kolekcijaSlug: 'terra-greige',
    namena: ['pod', 'zid'],
    materijal: 'Porcelanska keramika, rektificirana',
    izgled: 'kamen',
    opis: 'Veliki format u toplom greige tonu, mat završna obrada koja krije otiske i lako se održava. Pogodno za dnevne boravke i komercijalne prostore sa velikim protokom ljudi.',
    tehnickeKarakteristike: [
      { naziv: 'Apsorpcija vode', vrednost: '≤ 0.5%' },
      { naziv: 'Otpornost na klizanje', vrednost: 'R10' },
      { naziv: 'PEI klasa', vrednost: 'PEI IV' }
    ],
    dokumentacija: [{ naziv: 'Tehnički list (PDF)', url: '#' }],
    status: 'published',
    oznakaNovo: true,
    seoNaslov: 'Terra Greige 60×120 mat — Caesar | Floor5',
    seoOpis: 'Porcelanska keramika velikog formata u greige tonu, mat, za pod i zid. Dostupno u Floor5 salonu.',
    variante: [
      {
        sku: 'CAE-TG-60120-GR-MAT', dimenzije: '60×120 cm', debljinaMm: 9, boja: 'Greige', zavrsnaObrada: 'mat',
        komadaPoPakovanju: 2, m2PoPakovanju: 1.44, dostupnost: 'na-stanju', cena: 2490, jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/terra-greige-1.jpg', altTekst: 'Terra Greige pločica, tekstura kamena, greige boja', tip: 'tekstura' }]
      },
      {
        sku: 'CAE-TG-60120-BE-MAT', dimenzije: '60×120 cm', debljinaMm: 9, boja: 'Bež', zavrsnaObrada: 'mat',
        komadaPoPakovanju: 2, m2PoPakovanju: 1.44, dostupnost: 'ogranicena-kolicina', cena: 2490, jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/terra-greige-2.jpg', altTekst: 'Terra Greige pločica, bež varijanta', tip: 'tekstura' }]
      }
    ],
    povezaniSlugovi: ['cemento-urbano-60x60-mat']
  },
  {
    slug: 'marmo-statuario-120x278-lux',
    naziv: 'Marmo Statuario 120×278',
    proizvodjacSlug: 'serenissima',
    kolekcijaSlug: 'marmo-statuario',
    namena: ['pod', 'zid', 'kupatilo'],
    materijal: 'Porcelanska keramika, rektificirana',
    izgled: 'mermer',
    opis: 'Veliki panel sa izraženom mermernom žilom, visok sjaj. Idealno za kupatila i prostore gde je efekat prirodnog kamena u prvom planu.',
    tehnickeKarakteristike: [
      { naziv: 'Apsorpcija vode', vrednost: '≤ 0.1%' },
      { naziv: 'Otpornost na klizanje', vrednost: 'R9' },
      { naziv: 'PEI klasa', vrednost: 'PEI III' }
    ],
    dokumentacija: [{ naziv: 'Tehnički list (PDF)', url: '#' }, { naziv: 'Sertifikat kvaliteta (PDF)', url: '#' }],
    status: 'published',
    oznakaNovo: true,
    variante: [
      {
        sku: 'SER-MS-120278-BI-LUX', dimenzije: '120×278 cm', debljinaMm: 6, boja: 'Bianco', zavrsnaObrada: 'sjaj',
        komadaPoPakovanju: 1, m2PoPakovanju: 3.34, dostupnost: 'po-porudzbini', jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/marmo-statuario-1.jpg', altTekst: 'Marmo Statuario, beli mermer sa sivim žilama', tip: 'tekstura' }]
      }
    ],
    povezaniSlugovi: ['terra-greige-60x120-mat']
  },
  {
    slug: 'cemento-urbano-60x60-mat',
    naziv: 'Cemento Urbano 60×60',
    proizvodjacSlug: 'cir',
    kolekcijaSlug: 'cemento-urbano',
    namena: ['pod', 'zid', 'fasada'],
    materijal: 'Porcelanska keramika',
    izgled: 'beton',
    opis: 'Industrijski izgled betona, ujednačena mat površina. Pogodno za moderne enterijere i eksterijere.',
    tehnickeKarakteristike: [
      { naziv: 'Apsorpcija vode', vrednost: '≤ 0.5%' },
      { naziv: 'Otpornost na klizanje (ext.)', vrednost: 'R11' }
    ],
    status: 'published',
    oznakaNovo: false,
    variante: [
      {
        sku: 'CIR-CU-6060-GR-MAT', dimenzije: '60×60 cm', debljinaMm: 9, boja: 'Grafit', zavrsnaObrada: 'mat',
        komadaPoPakovanju: 4, m2PoPakovanju: 1.44, dostupnost: 'na-stanju', cena: 1890, jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/cemento-urbano-1.jpg', altTekst: 'Cemento Urbano, siva betonska tekstura', tip: 'tekstura' }]
      },
      {
        sku: 'CIR-CU-2020-GR-STR', dimenzije: '20×20 cm', debljinaMm: 9, boja: 'Grafit', zavrsnaObrada: 'strukturirano',
        komadaPoPakovanju: 25, m2PoPakovanju: 1.0, dostupnost: 'na-stanju', cena: 1990, jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/cemento-urbano-2.jpg', altTekst: 'Cemento Urbano, strukturirana fasadna varijanta', tip: 'primena' }]
      }
    ]
  },
  {
    slug: 'pietra-scura-40x80-strukturirano',
    naziv: 'Pietra Scura 40×80',
    proizvodjacSlug: 'elios',
    kolekcijaSlug: 'pietra-scura',
    namena: ['fasada', 'pod'],
    materijal: 'Porcelanska keramika, protivklizna',
    izgled: 'kamen',
    opis: 'Tamni kamen izraženog reljefa za fasade i eksterijerne podove. Visoka otpornost na klizanje.',
    tehnickeKarakteristike: [
      { naziv: 'Otpornost na klizanje', vrednost: 'R12' },
      { naziv: 'Otpornost na mraz', vrednost: 'Da' }
    ],
    status: 'published',
    oznakaNovo: false,
    variante: [
      {
        sku: 'ELI-PS-4080-AN-STR', dimenzije: '40×80 cm', debljinaMm: 20, boja: 'Antracit', zavrsnaObrada: 'strukturirano',
        komadaPoPakovanju: 3, m2PoPakovanju: 0.96, dostupnost: 'na-stanju', jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/pietra-scura-1.jpg', altTekst: 'Pietra Scura, tamna strukturirana kamena tekstura', tip: 'tekstura' }]
      }
    ]
  },
  {
    slug: 'terra-greige-30x60-poluspaj',
    naziv: 'Terra Greige 30×60',
    proizvodjacSlug: 'caesar',
    kolekcijaSlug: 'terra-greige',
    namena: ['zid', 'kupatilo'],
    materijal: 'Keramika, glazirana',
    izgled: 'kamen',
    opis: 'Manji format iz iste kolekcije, poluspaj obrada za zidne aplikacije u kupatilima.',
    tehnickeKarakteristike: [{ naziv: 'Apsorpcija vode', vrednost: '≤ 3%' }],
    status: 'draft',
    oznakaNovo: false,
    variante: [
      {
        sku: 'CAE-TG-3060-GR-PS', dimenzije: '30×60 cm', debljinaMm: 8, boja: 'Greige', zavrsnaObrada: 'poluspaj',
        komadaPoPakovanju: 6, m2PoPakovanju: 1.08, dostupnost: 'nedostupno', jedinicaCene: 'm2',
        mediji: [{ url: '/img/placeholder/terra-greige-3.jpg', altTekst: 'Terra Greige zidna pločica', tip: 'tekstura' }]
      }
    ]
  }
]

export function publishedProducts() {
  return products.filter(p => p.status === 'published')
}
