<script setup lang="ts">
useSeoMeta({
  title: 'Inspiracija i projekti',
  description: 'Realizovani projekti i inspiracija za enterijere sa Floor5 keramikom.'
})

const { data: projects } = await useFetch('/api/projects', { key: 'all-projects' })
</script>

<template>
  <div class="container-f5 py-10 md:py-14">
    <h1 class="font-display font-semibold text-3xl md:text-4xl mb-2">Inspiracija i projekti</h1>
    <p class="text-warm-600 mb-8 max-w-xl">Pogledajte kako naša keramika izgleda u realizovanim prostorima.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="p in projects" :key="p.slug" :to="`/inspiracija/${p.slug}`"
        class="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-warm-100"
      >
        <NuxtImg
          :src="projectImage[p.slug] ?? '/img/stock/texture-marble.jpg'"
          :alt="p.naslov"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width="800"
          height="500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
        <div class="absolute bottom-0 left-0 p-6 text-white">
          <div class="font-display font-semibold text-lg">{{ p.naslov }}</div>
          <div class="text-sm text-white/80">{{ p.lokacija }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
