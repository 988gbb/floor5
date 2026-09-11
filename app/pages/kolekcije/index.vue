<script setup lang="ts">
useSeoMeta({
  title: 'Kolekcije',
  description: 'Sve kolekcije keramike i pločica dostupne u Floor5 salonu.'
})

const { data: collections, status } = await useFetch('/api/collections', { key: 'all-collections' })
</script>

<template>
  <div class="container-f5 py-10 md:py-14">
    <h1 class="font-display font-semibold text-3xl md:text-4xl mb-8">Kolekcije</h1>

    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i" class="aspect-[16/11] rounded-2xl bg-warm-200 animate-pulse" />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <CollectionCard v-for="c in collections" :key="c.slug" :collection="c" />
    </div>
  </div>
</template>
