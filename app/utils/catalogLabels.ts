export const namenaLabels: Record<string, string> = {
  pod: 'Podovi',
  zid: 'Zidovi',
  kupatilo: 'Kupatila',
  kuhinja: 'Kuhinje',
  fasada: 'Fasade',
  bazen: 'Bazeni'
}

export const izgledLabels: Record<string, string> = {
  mermer: 'Mermer',
  drvo: 'Drvo',
  kamen: 'Kamen',
  beton: 'Beton',
  jednobojno: 'Jednobojno',
  'cement-pločice': 'Cement pločice'
}

export const obradaLabels: Record<string, string> = {
  mat: 'Mat',
  sjaj: 'Sjaj',
  poluspaj: 'Poluspaj',
  strukturirano: 'Strukturirano'
}

export const dostupnostLabels: Record<string, string> = {
  'na-stanju': 'Na stanju',
  'ogranicena-kolicina': 'Ograničena količina',
  'po-porudzbini': 'Po porudžbini',
  nedostupno: 'Trenutno nedostupno'
}

export const dostupnostBadge: Record<string, 'success' | 'warning' | 'neutral' | 'error'> = {
  'na-stanju': 'success',
  'ogranicena-kolicina': 'warning',
  'po-porudzbini': 'neutral',
  nedostupno: 'error'
}
