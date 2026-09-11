import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'manufacturer',
  title: 'Proizvođač',
  type: 'document',
  fields: [
    defineField({ name: 'naziv', title: 'Naziv', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'naziv' }, validation: r => r.required() }),
    defineField({ name: 'zemljaPorekla', title: 'Zemlja porekla', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'opis', title: 'Opis', type: 'text' })
  ],
  preview: { select: { title: 'naziv', subtitle: 'zemljaPorekla', media: 'logo' } }
})
