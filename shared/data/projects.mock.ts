/**
 * Razvojni seed podaci za "Inspiracija i projekti".
 * "Ušće Shopping Center" je potvrđen kao realizacija preko Instagram highlight-a
 * (@keramikafloor5, "UŠĆE.SC") — opis ispod je ILUSTRATIVNI placeholder tekst,
 * ne stvaran opis obima radova, dok Floor5 ne dostavi prave materijale i fotografije.
 */
import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'usce-shopping-center',
    naslov: 'Ušće Shopping Center',
    lokacija: 'Beograd',
    opis: 'Realizacija u okviru poslovno-trgovinskog kompleksa. Detaljan opis obima radova i korišćenih pločica dodaje se kada Floor5 dostavi materijale.',
    koristiProizvode: ['cemento-urbano-60x60-mat']
  },
  {
    slug: 'stambeni-enterijer-dedinje',
    naslov: 'Stambeni enterijer, Dedinje',
    lokacija: 'Beograd',
    opis: 'Ilustrativan primer stambenog projekta — dnevni boravak i kupatilo u toplim, prirodnim tonovima.',
    koristiProizvode: ['terra-greige-60x120-mat', 'marmo-statuario-120x278-lux']
  },
  {
    slug: 'poslovni-prostor-novi-beograd',
    naslov: 'Poslovni prostor, Novi Beograd',
    lokacija: 'Beograd',
    opis: 'Ilustrativan primer poslovnog enterijera sa naglaskom na izdržljive podne površine velikog formata.',
    koristiProizvode: ['pietra-scura-40x80-strukturirano']
  }
]
