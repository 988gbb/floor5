export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const product = getProduct(slug!)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Pločica nije pronađena' })
  }
  const enriched = enrich(product)
  const povezani = (product.povezaniSlugovi ?? [])
    .map(s => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => !!p && p.status === 'published')
    .map(enrich)

  return { product: enriched, povezani }
})
