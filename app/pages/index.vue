<script setup lang="ts">
useSeoMeta({
  title: 'Premium keramika i pločice iz Italije i Španije',
  description: 'Floor5 — salon keramike i pločica u Beogradu. Italijanski dizajn, veliki formati, kolekcije za podove, zidove, kupatila i fasade.'
})

const { data: collections } = await useFetch('/api/collections', { key: 'home-collections' })
const { data: projects } = await useFetch('/api/projects', { key: 'home-projects' })

const featuredCollections = computed(() => (collections.value ?? []).slice(0, 4))
const featuredProjects = computed(() => (projects.value ?? []).slice(0, 2))

const categories = [
  { key: 'pod', label: 'Podovi', icon: 'i-lucide-square' },
  { key: 'zid', label: 'Zidovi', icon: 'i-lucide-panels-top-left' },
  { key: 'kupatilo', label: 'Kupatila', icon: 'i-lucide-bath' },
  { key: 'kuhinja', label: 'Kuhinje', icon: 'i-lucide-cooking-pot' },
  { key: 'fasada', label: 'Fasade', icon: 'i-lucide-building-2' },
  { key: 'bazen', label: 'Bazeni', icon: 'i-lucide-waves' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="h-[76vh] min-h-[480px] max-h-[720px] relative flex items-end overflow-hidden">
        <NuxtImg
          src="/img/stock/hero-spa.webp"
          alt="Enterijer sa velikoformatnim kamenim pločicama, spa prostor"
          class="absolute inset-0 w-full h-full object-cover"
          width="1600"
          height="1000"
          loading="eager"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-ink-900/10" />
        <div class="container-f5 relative pb-16 md:pb-24">
          <p class="text-white/80 label-caps mb-4">Floor5 · Premium keramika</p>
          <h1 class="text-white font-display font-semibold text-4xl md:text-6xl max-w-xl leading-[1.08]">
            Prostor koji diše kamenom i svetlom.
          </h1>
          <p class="text-white/85 mt-4 max-w-md text-base md:text-lg">
            Keramika i pločice ekskluzivnog kvaliteta, sa neospornim stilom — proizvedene u Italiji i Španiji.
          </p>
          <div class="flex flex-wrap gap-3 mt-8">
            <UButton to="/katalog" size="xl" color="neutral" class="bg-white text-ink-900 hover:bg-warm-100">
              Istraži kolekcije
            </UButton>
            <UButton to="/o-nama" size="xl" variant="outline" class="border-white text-white hover:bg-white/10">
              Poseti salon
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured collections -->
    <section class="container-f5 py-16 md:py-24">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="eyebrow-label label-caps text-clay-600 mb-2">Izdvojeno</p>
          <h2 class="font-display font-semibold text-2xl md:text-3xl">Kolekcije koje izdvajamo</h2>
        </div>
        <UButton to="/kolekcije" variant="link" color="neutral" trailing-icon="i-lucide-arrow-right" class="hidden sm:flex">
          Sve kolekcije
        </UButton>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CollectionCard v-for="c in featuredCollections" :key="c.slug" :collection="c" />
      </div>
    </section>

    <!-- Categories -->
    <section class="bg-white border-y border-warm-200 py-16 md:py-20">
      <div class="container-f5">
        <h2 class="font-display font-semibold text-2xl md:text-3xl mb-8">Pretraži po nameni</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.key"
            :to="`/katalog?namena=${cat.key}`"
            class="group aspect-square rounded-2xl bg-warm-100 hover:bg-sage-400 flex flex-col items-center justify-center gap-2 transition-colors"
          >
            <UIcon :name="cat.icon" class="size-6 text-warm-600 group-hover:text-ink-900" />
            <span class="text-sm font-medium text-warm-700 group-hover:text-ink-900">{{ cat.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="container-f5 py-16 md:py-24">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="label-caps text-clay-600 mb-2">Realizacije</p>
          <h2 class="font-display font-semibold text-2xl md:text-3xl">Projekti iz naše prakse</h2>
        </div>
        <UButton to="/inspiracija" variant="link" color="neutral" trailing-icon="i-lucide-arrow-right" class="hidden sm:flex">
          Svi projekti
        </UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="p in featuredProjects"
          :key="p.slug"
          :to="`/inspiracija/${p.slug}`"
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
            <div class="text-sm text-white/80 mt-1 flex items-center gap-1">
              Pogledaj projekat <UIcon name="i-lucide-arrow-right" class="size-4" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Salon CTA -->
    <section class="bg-sage-400">
      <div class="container-f5 py-16 md:py-20 text-center">
        <h2 class="font-display font-semibold text-2xl md:text-3xl text-ink-900">Posetite naš šourum</h2>
        <p class="text-ink-800/80 mt-2 max-w-md mx-auto">
          Bulevar Zorana Đinđića 123g, Beograd — dođite da dodirnete teksture uživo pre nego što odlučite.
        </p>
        <UButton to="/kontakt" size="xl" color="neutral" class="bg-ink-900 text-white hover:bg-ink-800 mt-6">
          Kontaktirajte nas
        </UButton>
      </div>
    </section>
  </div>
</template>
