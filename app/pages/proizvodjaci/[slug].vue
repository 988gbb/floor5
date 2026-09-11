<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data, error } = await useFetch(`/api/manufacturers/${slug}`, { key: `manufacturer-${slug}` })

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Proizvođač nije pronađen', fatal: true })
}

const manufacturer = computed(() => data.value!.manufacturer)
const items = computed(() => data.value!.items)
const collections = computed(() => data.value!.collections)

useSeoMeta({
  title: computed(() => manufacturer.value.naziv),
  description: computed(() => manufacturer.value.opis)
})
</script>

<template>
  <div class="container-f5 py-10 md:py-14">
    <span class="label-caps text-warm-500">{{ manufacturer.zemljaPorekla }}</span>
    <h1 class="font-display font-semibold text-3xl md:text-4xl mt-2">{{ manufacturer.naziv }}</h1>
    <p class="text-warm-600 mt-3 max-w-2xl">{{ manufacturer.opis }}</p>

    <div v-if="collections.length" class="mt-10">
      <h2 class="font-display font-semibold text-lg mb-4">Kolekcije</h2>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="c in collections" :key="c.slug" :to="`/kolekcije/${c.slug}`"
          class="px-3 py-1.5 rounded-full border border-warm-300 text-sm font-medium text-warm-600 hover:border-ink-900 hover:text-ink-900"
        >{{ c.naziv }}</NuxtLink>
      </div>
    </div>

    <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
      <ProductCard v-for="p in items" :key="p.slug" :product="p as any" />
    </div>
    <div v-else class="border border-dashed border-warm-300 rounded-2xl p-10 text-center text-warm-600 mt-10">
      Trenutno nema objavljenih proizvoda ovog proizvođača.
    </div>
  </div>
</template>
