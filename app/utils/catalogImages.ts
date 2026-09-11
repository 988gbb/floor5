/**
 * Slike su mešavina dva izvora dok Floor5 ne dostavi kompletnu fotografiju proizvoda:
 * 1) Stvarne Floor5 fotografije sa Instagrama (@keramikafloor5) — za hero, o nama i
 *    kolekcije gde je autentičnost bitna (fajlovi sa prefiksom "ig-").
 * 2) Besplatne Unsplash teksture (komercijalna upotreba dozvoljena) — za pojedinačne
 *    proizvode gde tačna fotografija još ne postoji, mapirano po "izgledu" materijala.
 */
export const izgledImage: Record<string, string> = {
  mermer: '/img/stock/ig-marble-spa.jpg',
  kamen: '/img/stock/texture-stone.jpg',
  beton: '/img/stock/texture-concrete.jpg',
  jednobojno: '/img/stock/texture-concrete.jpg',
  'cement-pločice': '/img/stock/texture-concrete.jpg'
}

export const collectionImage: Record<string, string> = {
  'terra-greige': '/img/stock/kolekcija1.webp',
  'marmo-statuario': '/img/stock/kolekcija4.webp',
  'cemento-urbano': '/img/stock/kolekcija3.webp',
  'pietra-scura': '/img/stock/kolekcija2.webp'
}

export const projectImage: Record<string, string> = {
  'usce-shopping-center': '/img/stock/usce.jpeg',
  'stambeni-enterijer-dedinje': '/img/stock/ig-kitchen-terracotta.jpg',
  'poslovni-prostor-novi-beograd': '/img/stock/texture-concrete.jpg'
}
