<script setup lang="ts">
useSeoMeta({
  title: 'Katalog pločica',
  description: 'Pretražite katalog keramike i pločica po nameni, formatu, boji, izgledu materijala, završnoj obradi i proizvođaču.'
})

const route = useRoute()
const router = useRouter()

const queryString = computed(() => route.fullPath.split('?')[1] ?? '')

const { data, status, error, refresh } = await useFetch('/api/products', {
  query: computed(() => route.query),
  key: () => `catalog-${queryString.value}`,
  watch: [() => route.query]
})

const { data: manufacturers } = await useFetch('/api/manufacturers', { key: 'manufacturers-list', default: () => [] })

const manufacturerNames = computed(() =>
  Object.fromEntries((manufacturers.value ?? []).map((m: any) => [m.slug, m.naziv]))
)

const searchInput = ref((route.query.q as string) ?? '')
let searchTimer: ReturnType<typeof setTimeout>
watch(searchInput, (val) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    router.push({ query: { ...route.query, q: val || undefined } })
  }, 350)
})

const sortOptions = [
  { label: 'Prvo najnovije', value: 'novo' },
  { label: 'Naziv A–Š', value: 'naziv-az' },
  { label: 'Cena — rastuće', value: 'cena-rastuce' },
  { label: 'Cena — opadajuće', value: 'cena-opadajuce' }
]
const sortValue = computed({
  get: () => (route.query.sort as string) ?? 'novo',
  set: (v: string) => router.push({ query: { ...route.query, sort: v === 'novo' ? undefined : v } })
})

const mobileFiltersOpen = ref(false)
const activeFilterCount = computed(() =>
  Object.keys(route.query).filter(k => k !== 'q' && k !== 'sort').reduce((sum, k) => {
    const v = route.query[k]
    return sum + (Array.isArray(v) ? v.length : 1)
  }, 0)
)
</script>

<template>
  <div class="container-f5 py-10 md:py-14">
    <div class="mb-8">
      <h1 class="font-display font-semibold text-3xl md:text-4xl">Katalog pločica</h1>
      <p class="text-warm-600 mt-2 max-w-xl">Filtrirajte po nameni, izgledu materijala, završnoj obradi i proizvođaču — filteri ostaju sačuvani u linku.</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mb-8">
      <UInput
        v-model="searchInput"
        icon="i-lucide-search"
        placeholder="Pretraži po nazivu, kolekciji, proizvođaču…"
        size="lg"
        class="flex-1"
      />
      <USelect v-model="sortValue" :items="sortOptions" value-key="value" size="lg" class="w-full sm:w-56" />
      <UButton
        icon="i-lucide-sliders-horizontal"
        color="neutral"
        variant="outline"
        size="lg"
        class="lg:hidden"
        @click="mobileFiltersOpen = true"
      >
        Filteri <UBadge v-if="activeFilterCount" size="sm" class="ml-1">{{ activeFilterCount }}</UBadge>
      </UButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
      <aside class="hidden lg:block">
        <div class="sticky top-24">
          <FilterPanel v-if="data?.facets" :facets="data.facets" :manufacturer-names="manufacturerNames" />
        </div>
      </aside>

      <USlideover v-model:open="mobileFiltersOpen" side="left">
        <template #content>
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <span class="font-display font-semibold">Filteri</span>
              <UButton icon="i-lucide-x" variant="ghost" color="neutral" @click="mobileFiltersOpen = false" />
            </div>
            <FilterPanel v-if="data?.facets" :facets="data.facets" :manufacturer-names="manufacturerNames" />
          </div>
        </template>
      </USlideover>

      <div>
        <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="rounded-2xl border border-warm-200 overflow-hidden">
            <div class="aspect-[4/3] animate-pulse bg-warm-200" />
            <div class="p-4 space-y-2">
              <div class="h-3 w-1/3 bg-warm-200 rounded animate-pulse" />
              <div class="h-4 w-2/3 bg-warm-200 rounded animate-pulse" />
              <div class="h-3 w-1/2 bg-warm-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div
          v-else-if="error"
          class="border border-dashed border-warm-300 rounded-2xl p-10 text-center flex flex-col items-center gap-3"
        >
          <div class="w-10 h-10 rounded-full bg-error-100 text-error-600 flex items-center justify-center">
            <UIcon name="i-lucide-alert-triangle" class="size-5" />
          </div>
          <p class="text-warm-700 font-medium">Nije moguće učitati katalog.</p>
          <UButton variant="outline" color="neutral" @click="refresh()">Pokušaj ponovo</UButton>
        </div>

        <div
          v-else-if="!data?.items?.length"
          class="border border-dashed border-warm-300 rounded-2xl p-10 text-center flex flex-col items-center gap-3"
        >
          <div class="w-10 h-10 rounded-full bg-warm-100 text-warm-500 flex items-center justify-center">
            <UIcon name="i-lucide-search-x" class="size-5" />
          </div>
          <p class="text-warm-700 font-medium">Nema pločica koje odgovaraju izabranim filterima.</p>
          <UButton variant="outline" color="neutral" @click="router.push({ query: {} })">Resetuj filtere</UButton>
        </div>

        <template v-else>
          <p class="text-sm text-warm-500 mb-4">{{ data.total }} {{ data.total === 1 ? 'proizvod' : 'proizvoda' }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <ProductCard v-for="p in data.items" :key="p.slug" :product="p as any" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
