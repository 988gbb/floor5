export interface Brand {
  name: string
  country: string
  href: string
  bg: string
  logo: string
}

// Puna lista od 19 brend partnera — potvrđeno sa zvaničnog Floor5 sajta (brendovi.html).
export const allBrands: Brand[] = [
  { name: 'Lea Ceramiche', country: 'Italija · Keramičke pločice', href: 'https://www.leaceramiche.com/', bg: '/img/reference/brands/lea-slika.webp', logo: '/img/reference/brands/lea-logo.webp' },
  { name: 'Cotto d’Este', country: 'Italija · Porcelan i veliki formati', href: 'https://www.cottodeste.com/', bg: '/img/reference/brands/cotto-slika.webp', logo: '/img/reference/brands/cotto-logo.webp' },
  { name: 'Unicom Starker', country: 'Italija · Porcelan pločice', href: 'https://www.unicomstarker.com/en', bg: '/img/reference/brands/unicom-slika.jpg', logo: '/img/reference/brands/unicom-logo.png' },
  { name: 'Caesar', country: 'Italija · Porcelanski granit', href: 'https://www.caesar.it/en/', bg: '/img/reference/brands/caesar_hover.jpg', logo: '/img/reference/brands/caesar.svg' },
  { name: 'Marca Corona', country: 'Italija · Podne i zidne pločice', href: 'https://www.marcacorona.it/en/', bg: '/img/reference/brands/marca-slika.webp', logo: '/img/reference/brands/marca-logo.png' },
  { name: 'Cercom', country: 'Italija · Gres porcelanato', href: 'https://www.cercomceramiche.it/?lang=en', bg: '/img/reference/brands/cercom_hover.jpg', logo: '/img/reference/brands/cercom.png' },
  { name: 'Serenissima', country: 'Italija · Podna i zidna keramika', href: 'https://www.serenissima.re.it/?lang=en', bg: '/img/reference/brands/serenissima_hover.jpg', logo: '/img/reference/brands/serenissima.png' },
  { name: 'Cir', country: 'Italija · Podne i zidne pločice', href: 'https://www.cir.it/?lang=en', bg: '/img/reference/brands/cir_hover.jpg', logo: '/img/reference/brands/cir.png' },
  { name: 'Cerasarda', country: 'Italija · Keramika za enterijer i eksterijer', href: 'https://www.cerasarda.it/en/', bg: '/img/reference/brands/cerasarda-slika.jpg', logo: '/img/reference/brands/cerasarda-logo.jpeg' },
  { name: 'Fioranese', country: 'Italija · Podna i zidna keramika', href: 'https://www.fioranese.it/en/', bg: '/img/reference/brands/fioranese-slika.jpg', logo: '/img/reference/brands/fioranese-logo.webp' },
  { name: 'Coem', country: 'Italija · Porcelan i keramika', href: 'https://www.coem.it/en/', bg: '/img/reference/brands/coem-slika.jpg', logo: '/img/reference/brands/coem-logo.png' },
  { name: 'Elios Ceramica', country: 'Italija · Porcelan i granit', href: 'https://eliosceramica.com/', bg: '/img/reference/brands/elios_hover.jpg', logo: '/img/reference/brands/elios.png' },
  { name: 'Cesi', country: 'Italija · Porcelan', href: 'https://www.cesiceramica.it/index.php?lin=en&', bg: '/img/reference/brands/cesi-slika.jpg', logo: '/img/reference/brands/cesi-logo.webp' },
  { name: 'Tubadzin', country: 'Poljska · Keramičke pločice', href: 'https://www.tubadzin.pl/en', bg: '/img/reference/brands/tubadzin-slika.jpg', logo: '/img/reference/brands/tubadzin-logo.png' },
  { name: 'Stargres', country: 'Poljska · Porculan', href: 'https://stargres.pl/en/', bg: '/img/reference/brands/stargres-slika.jpg', logo: '/img/reference/brands/stargres-logo.jpg' },
  { name: 'Scarabeo', country: 'Italija · Sanitarije', href: 'https://scarabeoceramiche.it/', bg: '/img/reference/brands/scarabeo-slika.jpg', logo: '/img/reference/brands/scarabeo-logo.webp' },
  { name: 'Fima', country: 'Italija · Sanitarije', href: 'https://fimacf.com/en/', bg: '/img/reference/brands/fima-slika.jpeg', logo: '/img/reference/brands/fima-logo.jpeg' },
  { name: 'Geberit', country: 'Švajcarska · Sanitarije', href: 'https://www.geberit.rs/pocetna-strana/', bg: '/img/reference/brands/geberit-slika.jpeg', logo: '/img/reference/brands/geberit-logo.jpg' },
  { name: 'Tece', country: 'Nemačka · Sanitarije i instalacije', href: 'https://www.tece.com/en', bg: '/img/reference/brands/tece-slika.jpg', logo: '/img/reference/brands/tece-logo.jpg' }
]

export const featuredBrands = allBrands.slice(0, 6)
