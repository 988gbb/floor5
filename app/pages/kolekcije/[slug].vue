<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data, error } = await useFetch(`/api/collections/${slug}`, { key: `collection-${slug}` })

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Kolekcija nije pronađena', fatal: true })
}

const collection = computed(() => data.value!.collection)
const items = computed(() => data.value!.items)

function unique<T>(arr: T[]) {
  return [...new Set(arr)]
}

const namenaList = computed(() => unique(items.value.flatMap(p => p.namena)))
const formatList = computed(() => unique(items.value.flatMap(p => p.variante.map(v => v.dimenzije))))
const obradaList = computed(() => unique(items.value.flatMap(p => p.variante.map(v => v.zavrsnaObrada))))

useSeoMeta({
  title: computed(() => collection.value.naziv),
  description: computed(() => collection.value.opis)
})
</script>

<template>
  <div>
    <div class="aspect-[21/9] max-h-[420px] max-w-[1100px] mx-auto relative bg-warm-100 overflow-hidden">
      <NuxtImg
        :src="collectionImage[collection.slug] ?? '/img/stock/texture-stone.jpg'"
        :alt="`Kolekcija ${collection.naziv}`"
        class="absolute inset-0 w-full h-full object-cover"
        width="1400"
        height="600"
        loading="eager"
      />
    </div>
    <div class="container-f5 py-10 md:py-14">
      <span class="label-caps text-warm-500">{{ collection.proizvodjac?.naziv }} · {{ collection.stil }}</span>
      <h1 class="font-display font-semibold text-3xl md:text-4xl mt-2">{{ collection.naziv }}</h1>
      <p class="text-warm-600 mt-3 max-w-2xl leading-relaxed">{{ collection.opis }}</p>

      <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 pt-8 border-t border-warm-200">
        <div v-if="namenaList.length">
          <div class="label-caps text-warm-500 mb-3">Namena</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="n in namenaList" :key="n" class="px-3 py-1.5 rounded-full bg-warm-100 text-sm font-medium text-warm-700">{{ namenaLabels[n] ?? n }}</span>
          </div>
        </div>
        <div v-if="formatList.length">
          <div class="label-caps text-warm-500 mb-3">Dostupni formati</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="f in formatList" :key="f" class="px-3 py-1.5 rounded-full bg-warm-100 text-sm font-medium text-warm-700">{{ f }}</span>
          </div>
        </div>
        <div v-if="obradaList.length">
          <div class="label-caps text-warm-500 mb-3">Završne obrade</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="o in obradaList" :key="o" class="px-3 py-1.5 rounded-full bg-warm-100 text-sm font-medium text-warm-700 capitalize">{{ obradaLabels[o] ?? o }}</span>
          </div>
        </div>
      </div>

      <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        <ProductCard v-for="p in items" :key="p.slug" :product="p as any" />
      </div>
      <div v-else class="border border-dashed border-warm-300 rounded-2xl p-10 text-center text-warm-600 mt-10">
        Trenutno nema objavljenih proizvoda u ovoj kolekciji.
      </div>
    </div>
  </div>
</template>
