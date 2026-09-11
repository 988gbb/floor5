export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const collection = getCollection(slug!)
  if (!collection) {
    throw createError({ statusCode: 404, statusMessage: 'Kolekcija nije pronađena' })
  }
  const items = publishedProducts()
    .filter(p => p.kolekcijaSlug === slug)
    .map(enrich)

  return {
    collection: { ...collection, proizvodjac: getManufacturer(collection.proizvodjacSlug) },
    items
  }
})
