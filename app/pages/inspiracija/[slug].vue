<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data, error } = await useFetch(`/api/projects/${slug}`, { key: `project-${slug}` })

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Projekat nije pronađen', fatal: true })
}

const project = computed(() => data.value!.project)
const povezaniProizvodi = computed(() => data.value!.povezaniProizvodi)

useSeoMeta({
  title: computed(() => project.value.naslov),
  description: computed(() => project.value.opis)
})
</script>

<template>
  <div>
    <div class="aspect-[21/9] max-h-[420px] max-w-[1100px] mx-auto relative bg-warm-100 overflow-hidden">
      <NuxtImg
        :src="projectImage[project.slug] ?? '/img/stock/texture-marble.jpg'"
        :alt="project.naslov"
        class="absolute inset-0 w-full h-full object-cover"
        width="1400"
        height="600"
        loading="eager"
      />
    </div>
    <div class="container-f5 py-10 md:py-14">
      <span class="label-caps text-warm-500">{{ project.lokacija }}</span>
      <h1 class="font-display font-semibold text-3xl md:text-4xl mt-2">{{ project.naslov }}</h1>
      <p class="text-warm-600 mt-4 max-w-2xl leading-relaxed">{{ project.opis }}</p>

      <div v-if="povezaniProizvodi.length" class="mt-12">
        <h2 class="font-display font-semibold text-xl mb-4">Korišćene pločice</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <ProductCard v-for="p in povezaniProizvodi" :key="p.slug" :product="p as any" />
        </div>
      </div>
    </div>
  </div>
</template>
