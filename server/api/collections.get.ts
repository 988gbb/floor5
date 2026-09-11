export default defineEventHandler(() => {
  return collections.map(c => ({
    ...c,
    proizvodjac: getManufacturer(c.proizvodjacSlug),
    brojProizvoda: publishedProducts().filter(p => p.kolekcijaSlug === c.slug).length
  }))
})
