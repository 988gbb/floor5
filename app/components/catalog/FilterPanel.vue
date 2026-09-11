<script setup lang="ts">
const props = defineProps<{
  facets: {
    namena: { value: string; count: number }[]
    izgled: { value: string; count: number }[]
    boja: { value: string; count: number }[]
    zavrsnaObrada: { value: string; count: number }[]
    proizvodjac: { value: string; count: number }[]
  }
  manufacturerNames: Record<string, string>
}>()

const route = useRoute()
const router = useRouter()

function selected(key: string): string[] {
  const v = route.query[key]
  if (!v) return []
  return Array.isArray(v) ? (v as string[]) : [v as string]
}

function toggle(key: string, value: string) {
  const current = selected(key)
  const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
  router.push({ query: { ...route.query, [key]: next.length ? next : undefined } })
}

function resetAll() {
  router.push({ query: {} })
}

const activeCount = computed(() =>
  ['namena', 'izgled', 'boja', 'zavrsnaObrada', 'proizvodjac'].reduce((sum, k) => sum + selected(k).length, 0)
)

const groups = [
  { key: 'namena', title: 'Namena', labels: namenaLabels },
  { key: 'proizvodjac', title: 'Proizvođač', labels: props.manufacturerNames },
  { key: 'izgled', title: 'Izgled materijala', labels: izgledLabels },
  { key: 'zavrsnaObrada', title: 'Završna obrada', labels: obradaLabels }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <span class="font-display font-semibold text-sm">Filteri</span>
      <UButton v-if="activeCount > 0" size="xs" variant="link" color="neutral" @click="resetAll">
        Resetuj ({{ activeCount }})
      </UButton>
    </div>

    <div v-for="group in groups" :key="group.key" class="border-t border-warm-200 pt-4 first:border-t-0 first:pt-0">
      <div class="label-caps text-warm-500 mb-3">{{ group.title }}</div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="facet in (props.facets as any)[group.key]"
          :key="facet.value"
          type="button"
          class="px-3 py-1.5 rounded-full border text-sm font-medium transition-colors"
          :class="selected(group.key).includes(facet.value)
            ? 'bg-sage-400 text-ink-900 border-transparent font-semibold'
            : 'bg-white text-warm-600 border-warm-300 hover:border-ink-900 hover:text-ink-900'"
          @click="toggle(group.key, facet.value)"
        >
          {{ group.labels[facet.value] ?? facet.value }}
          <span class="text-xs opacity-60">({{ facet.count }})</span>
        </button>
      </div>
    </div>
  </div>
</template>
