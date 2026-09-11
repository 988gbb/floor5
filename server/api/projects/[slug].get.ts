import { projects } from '#shared/data/projects.mock'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const project = projects.find(p => p.slug === slug)
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Projekat nije pronađen' })
  }
  const povezaniProizvodi = (project.koristiProizvode ?? [])
    .map(s => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map(enrich)

  return { project, povezaniProizvodi }
})
