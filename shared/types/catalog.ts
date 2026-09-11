export type ProductStatus = 'draft' | 'published' | 'archived'
export type Availability = 'na-stanju' | 'ogranicena-kolicina' | 'po-porudzbini' | 'nedostupno'
export type PriceUnit = 'm2' | 'komad' | 'pak'

export interface Manufacturer {
  slug: string
  naziv: string
  zemljaPorekla: string
  logo?: string
  opis?: string
}

export interface Collection {
  slug: string
  naziv: string
  proizvodjacSlug: string
  stil?: string
  opis?: string
  heroImage?: string
}

export interface MediaItem {
  url: string
  altTekst: string
  tip: 'tekstura' | 'primena' | 'detalj'
}

export interface Variant {
  sku: string
  dimenzije: string
  debljinaMm?: number
  boja: string
  zavrsnaObrada: 'mat' | 'sjaj' | 'poluspaj' | 'strukturirano'
  komadaPoPakovanju?: number
  m2PoPakovanju?: number
  dostupnost: Availability
  cena?: number
  jedinicaCene?: PriceUnit
  mediji: MediaItem[]
}

export interface TechSpec {
  naziv: string
  vrednost: string
}

export interface Product {
  slug: string
  naziv: string
  proizvodjacSlug: string
  kolekcijaSlug: string
  namena: ('pod' | 'zid' | 'kupatilo' | 'kuhinja' | 'fasada' | 'bazen')[]
  materijal: string
  izgled: 'mermer' | 'drvo' | 'kamen' | 'beton' | 'jednobojno' | 'cement-pločice'
  opis: string
  tehnickeKarakteristike: TechSpec[]
  dokumentacija?: { naziv: string; url: string }[]
  status: ProductStatus
  oznakaNovo: boolean
  seoNaslov?: string
  seoOpis?: string
  variante: Variant[]
  povezaniSlugovi?: string[]
}

export interface InquiryLine {
  productSlug: string
  variantSku: string
  kolicinaM2?: number
  napomena?: string
}
