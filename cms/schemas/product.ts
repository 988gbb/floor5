import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Pločica',
  type: 'document',
  groups: [
    { name: 'osnovno', title: 'Osnovno', default: true },
    { name: 'variante', title: 'Varijante' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({ group: 'osnovno', name: 'naziv', title: 'Naziv', type: 'string', validation: r => r.required() }),
    defineField({ group: 'osnovno', name: 'slug', title: 'Slug', type: 'slug', options: { source: 'naziv' }, validation: r => r.required() }),
    defineField({
      group: 'osnovno', name: 'proizvodjac', title: 'Proizvođač', type: 'reference',
      to: [{ type: 'manufacturer' }], validation: r => r.required()
    }),
    defineField({
      group: 'osnovno', name: 'kolekcija', title: 'Kolekcija', type: 'reference',
      to: [{ type: 'collection' }], validation: r => r.required()
    }),
    defineField({
      group: 'osnovno', name: 'namena', title: 'Namena', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['pod', 'zid', 'kupatilo', 'kuhinja', 'fasada', 'bazen'] },
      validation: r => r.min(1).required()
    }),
    defineField({ group: 'osnovno', name: 'materijal', title: 'Materijal', type: 'string' }),
    defineField({
      group: 'osnovno', name: 'izgled', title: 'Izgled materijala', type: 'string',
      options: { list: ['mermer', 'drvo', 'kamen', 'beton', 'jednobojno', 'cement-pločice'] }
    }),
    defineField({ group: 'osnovno', name: 'opis', title: 'Opis', type: 'text', validation: r => r.required() }),
    defineField({
      group: 'osnovno', name: 'tehnickeKarakteristike', title: 'Tehničke karakteristike', type: 'array',
      description: 'Unositi samo vrednosti potvrđene dokumentacijom proizvođača — ne nagađati.',
      of: [{
        type: 'object',
        name: 'tehSpec',
        fields: [
          { name: 'naziv', title: 'Naziv (npr. Apsorpcija vode)', type: 'string' },
          { name: 'vrednost', title: 'Vrednost (npr. ≤ 0.5%)', type: 'string' }
        ]
      }]
    }),
    defineField({
      group: 'osnovno', name: 'dokumentacija', title: 'PDF dokumentacija', type: 'array',
      of: [{
        type: 'object',
        name: 'dokument',
        fields: [
          { name: 'naziv', title: 'Naziv', type: 'string' },
          { name: 'fajl', title: 'PDF', type: 'file' }
        ]
      }]
    }),

    defineField({
      group: 'variante', name: 'variante', title: 'Varijante', type: 'array',
      of: [{ type: 'variant' }],
      validation: r => r.min(1).error('Proizvod mora imati bar jednu varijantu.')
    }),
    defineField({
      group: 'variante', name: 'povezaniProizvodi', title: 'Povezani proizvodi', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: r => r.max(6)
    }),

    defineField({
      group: 'osnovno', name: 'status', title: 'Status', type: 'string',
      options: { list: ['nacrt', 'objavljeno', 'arhivirano'] },
      initialValue: 'nacrt', validation: r => r.required()
    }),
    defineField({ group: 'osnovno', name: 'oznakaNovo', title: 'Oznaka "Novo"', type: 'boolean', initialValue: false }),

    defineField({ group: 'seo', name: 'seoNaslov', title: 'SEO naslov', type: 'string' }),
    defineField({ group: 'seo', name: 'seoOpis', title: 'SEO opis', type: 'text' })
  ],
  preview: {
    select: { title: 'naziv', proizvodjac: 'proizvodjac.naziv', status: 'status', media: 'variante.0.fotografije.0' },
    prepare({ title, proizvodjac, status, media }) {
      return { title, subtitle: `${proizvodjac ?? ''} · ${status}`, media }
    }
  }
})
