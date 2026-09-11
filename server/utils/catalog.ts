import { products, collections, manufacturers, publishedProducts } from '#shared/data/catalog.mock'
import type { Product } from '#shared/types/catalog'

export { products, collections, manufacturers, publishedProducts }

export function getManufacturer(slug: string) {
  return manufacturers.find(m => m.slug === slug)
}

export function getCollection(slug: string) {
  return collections.find(c => c.slug === slug)
}

export function getProduct(slug: string) {
  return products.find(p => p.slug === slug)
}

export function enrich(product: Product) {
  return {
    ...product,
    proizvodjac: getManufacturer(product.proizvodjacSlug),
    kolekcija: getCollection(product.kolekcijaSlug)
  }
}

export interface CatalogQuery {
  namena?: string | string[]
  izgled?: string | string[]
  boja?: string | string[]
  zavrsnaObrada?: string | string[]
  proizvodjac?: string | string[]
  q?: string
  sort?: 'novo' | 'naziv-az' | 'cena-rastuce' | 'cena-opadajuce'
}

function toArray(v?: string | string[]) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

export function filterProducts(query: CatalogQuery) {
  const namena = toArray(query.namena)
  const izgled = toArray(query.izgled)
  const boja = toArray(query.boja)
  const obrada = toArray(query.zavrsnaObrada)
  const proizvodjac = toArray(query.proizvodjac)
  const q = query.q?.toLowerCase().trim()

  let list = publishedProducts().map(enrich)

  if (namena.length) list = list.filter(p => p.namena.some(n => namena.includes(n)))
  if (izgled.length) list = list.filter(p => izgled.includes(p.izgled))
  if (proizvodjac.length) list = list.filter(p => proizvodjac.includes(p.proizvodjacSlug))
  if (boja.length) list = list.filter(p => p.variante.some(v => boja.includes(v.boja)))
  if (obrada.length) list = list.filter(p => p.variante.some(v => obrada.includes(v.zavrsnaObrada)))
  if (q) {
    list = list.filter(p =>
      p.naziv.toLowerCase().includes(q) ||
      p.proizvodjac?.naziv.toLowerCase().includes(q) ||
      p.kolekcija?.naziv.toLowerCase().includes(q)
    )
  }

  switch (query.sort) {
    case 'naziv-az':
      list = [...list].sort((a, b) => a.naziv.localeCompare(b.naziv, 'sr'))
      break
    case 'cena-rastuce':
      list = [...list].sort((a, b) => (a.variante[0]?.cena ?? Infinity) - (b.variante[0]?.cena ?? Infinity))
      break
    case 'cena-opadajuce':
      list = [...list].sort((a, b) => (b.variante[0]?.cena ?? -1) - (a.variante[0]?.cena ?? -1))
      break
    default:
      list = [...list].sort((a, b) => Number(b.oznakaNovo) - Number(a.oznakaNovo))
  }

  return list
}

export function buildFacets() {
  const pub = publishedProducts()
  const count = (arr: string[]) => {
    const map = new Map<string, number>()
    for (const v of arr) map.set(v, (map.get(v) ?? 0) + 1)
    return Array.from(map.entries()).map(([value, count]) => ({ value, count }))
  }

  return {
    namena: count(pub.flatMap(p => p.namena)),
    izgled: count(pub.map(p => p.izgled)),
    boja: count(pub.flatMap(p => p.variante.map(v => v.boja))),
    zavrsnaObrada: count(pub.flatMap(p => p.variante.map(v => v.zavrsnaObrada))),
    proizvodjac: count(pub.map(p => p.proizvodjacSlug))
  }
}
