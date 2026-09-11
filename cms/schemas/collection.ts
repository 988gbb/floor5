import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Kolekcija',
  type: 'document',
  fields: [
    defineField({ name: 'naziv', title: 'Naziv', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'naziv' }, validation: r => r.required() }),
    defineField({
      name: 'proizvodjac',
      title: 'Proizvođač',
      type: 'reference',
      to: [{ type: 'manufacturer' }],
      validation: r => r.required()
    }),
    defineField({ name: 'stil', title: 'Stil (npr. Kamen, Drvo, Mermer)', type: 'string' }),
    defineField({ name: 'opis', title: 'Opis', type: 'text' }),
    defineField({ name: 'heroSlika', title: 'Naslovna fotografija', type: 'image', options: { hotspot: true } })
  ],
  preview: {
    select: { title: 'naziv', subtitle: 'proizvodjac.naziv', media: 'heroSlika' }
  }
})
