<script setup lang="ts">
defineProps<{
  collection: { slug: string; naziv: string; stil?: string; opis?: string; proizvodjac?: { naziv: string }; brojProizvoda?: number }
}>()
</script>

<template>
  <NuxtLink
    :to="`/kolekcije/${collection.slug}`"
    class="group block rounded-2xl overflow-hidden border border-warm-200 bg-white shadow-[var(--shadow-warm-sm)] hover:shadow-[var(--shadow-warm-lg)] transition-shadow"
  >
    <div class="aspect-[16/11] relative bg-warm-100 overflow-hidden">
      <NuxtImg
        :src="collectionImage[collection.slug] ?? '/img/stock/texture-stone.jpg'"
        :alt="`Kolekcija ${collection.naziv}`"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        width="640"
        height="440"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <span class="text-[11px] uppercase tracking-wide text-warm-500 font-semibold">{{ collection.proizvodjac?.naziv }}</span>
      <h3 class="font-display font-semibold text-base mt-0.5">{{ collection.naziv }}</h3>
      <p v-if="collection.opis" class="text-sm text-warm-600 mt-1 line-clamp-2">{{ collection.opis }}</p>
    </div>
  </NuxtLink>
</template>
