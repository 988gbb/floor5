export default defineEventHandler((event) => {
  const query = getQuery(event) as Record<string, any>
  const items = filterProducts(query)
  const facets = buildFacets()
  return { items, facets, total: items.length }
})
