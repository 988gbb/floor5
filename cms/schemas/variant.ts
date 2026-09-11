import { defineField, defineType } from 'sanity'

/**
 * Varijanta je "object" tip (ne poseban dokument) i živi ugnežđena unutar Product-a,
 * jer se uvek traži i uređuje zajedno sa proizvodom (nema smisla da postoji samostalno).
 * SKU, format, pakovanje i dostupnost su namerno OVDE, ne na nivou proizvoda.
 */
export default defineType({
  name: 'variant',
  title: 'Varijanta',
  type: 'object',
  fields: [
    defineField({ name: 'sku', title: 'SKU', type: 'string', validation: r => r.required() }),
    defineField({ name: 'dimenzije', title: 'Dimenzije (npr. 60×120 cm)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'debljinaMm', title: 'Debljina (mm)', type: 'number' }),
    defineField({ name: 'boja', title: 'Boja', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'zavrsnaObrada',
      title: 'Završna obrada',
      type: 'string',
      options: { list: ['mat', 'sjaj', 'poluspaj', 'strukturirano'] },
      validation: r => r.required()
    }),
    defineField({ name: 'komadaPoPakovanju', title: 'Komada po pakovanju', type: 'number' }),
    defineField({ name: 'm2PoPakovanju', title: 'm² po pakovanju', type: 'number' }),
    defineField({
      name: 'dostupnost',
      title: 'Dostupnost',
      type: 'string',
      options: { list: [
        { title: 'Na stanju', value: 'na-stanju' },
        { title: 'Ograničena količina', value: 'ogranicena-kolicina' },
        { title: 'Po porudžbini', value: 'po-porudzbini' },
        { title: 'Trenutno nedostupno', value: 'nedostupno' }
      ] },
      initialValue: 'na-stanju',
      description: 'Ručno potvrđuje zaposleni — ne povlači se automatski.'
    }),
    defineField({ name: 'cena', title: 'Cena', type: 'number', description: 'Ostaviti prazno za "Cena na upit".' }),
    defineField({
      name: 'jedinicaCene',
      title: 'Jedinica obračuna',
      type: 'string',
      options: { list: ['m2', 'komad', 'pak'] },
      initialValue: 'm2'
    }),
    defineField({
      name: 'fotografije',
      title: 'Fotografije (tekstura / primena)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'altTekst', title: 'Alt tekst', type: 'string', validation: (r: any) => r.required() },
          { name: 'tip', title: 'Tip', type: 'string', options: { list: ['tekstura', 'primena', 'detalj'] } }
        ]
      }],
      validation: r => r.min(1).error('Bar jedna fotografija je obavezna po varijanti.')
    })
  ],
  preview: {
    select: { title: 'sku', dimenzije: 'dimenzije', boja: 'boja', media: 'fotografije.0' },
    prepare({ title, dimenzije, boja, media }) {
      return { title, subtitle: [dimenzije, boja].filter(Boolean).join(' · '), media }
    }
  }
})
