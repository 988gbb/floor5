export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const manufacturer = getManufacturer(slug!)
  if (!manufacturer) {
    throw createError({ statusCode: 404, statusMessage: 'Proizvođač nije pronađen' })
  }
  const items = publishedProducts()
    .filter(p => p.proizvodjacSlug === slug)
    .map(enrich)
  const cols = collections.filter(c => c.proizvodjacSlug === slug)

  return { manufacturer, items, collections: cols }
})
