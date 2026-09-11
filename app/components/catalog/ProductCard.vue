<script setup lang="ts">
import type { Product, Manufacturer, Collection } from '#shared/types/catalog'

const props = defineProps<{
  product: Product & { proizvodjac?: Manufacturer; kolekcija?: Collection }
}>()

const { add } = useInquiry()

const firstVariant = computed(() => props.product.variante[0])

function quickAdd() {
  if (!firstVariant.value) return
  add({ productSlug: props.product.slug, variantSku: firstVariant.value.sku, kolicinaM2: firstVariant.value.m2PoPakovanju ?? 1 })
}

function priceLabel() {
  const v = firstVariant.value
  if (!v?.cena) return 'Na upit'
  return `${v.cena.toLocaleString('sr-RS')} RSD/${v.jedinicaCene === 'm2' ? 'm²' : v.jedinicaCene}`
}
</script>

<template>
  <NuxtLink
    :to="`/katalog/${product.slug}`"
    class="group block bg-white border border-warm-200 rounded-2xl overflow-hidden shadow-[var(--shadow-warm-sm)] hover:shadow-[var(--shadow-warm-lg)] hover:-translate-y-0.5 transition-all duration-200"
  >
    <div class="aspect-[4/3] relative bg-warm-100 overflow-hidden">
      <NuxtImg
        :src="izgledImage[product.izgled] ?? '/img/stock/texture-concrete.jpg'"
        :alt="`Tekstura — ${product.naziv}`"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        width="480"
        height="360"
        loading="lazy"
      />
      <span
        v-if="product.oznakaNovo"
        class="absolute top-3 left-3 bg-clay-500 text-white text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-full"
      >
        Novo
      </span>
    </div>
    <div class="p-4 flex flex-col gap-1">
      <span class="text-[11px] uppercase tracking-wide text-warm-500 font-semibold">{{ product.proizvodjac?.naziv }}</span>
      <span class="font-display font-semibold text-sm text-ink-900">{{ product.naziv }}</span>
      <span class="text-xs text-warm-500">{{ firstVariant?.dimenzije }} · {{ firstVariant?.zavrsnaObrada }}</span>
      <div class="flex items-center justify-between mt-2">
        <span class="text-sm font-bold" :class="firstVariant?.cena ? 'text-ink-900' : 'text-warm-500 font-medium'">{{ priceLabel() }}</span>
        <UButton size="xs" variant="outline" color="neutral" icon="i-lucide-plus" @click.prevent="quickAdd">
          Upit
        </UButton>
      </div>
    </div>
  </NuxtLink>
</template>
