<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data, error } = await useFetch(`/api/products/${slug}`, { key: `product-${slug}` })

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Pločica nije pronađena', fatal: true })
}

const product = computed(() => data.value!.product)
const povezani = computed(() => data.value!.povezani)

const selectedSku = ref(product.value.variante[0]?.sku)
// Svaki objavljen proizvod ima bar jednu varijantu (CMS pravilo) — otuda non-null.
const selectedVariant = computed(() => (product.value.variante.find(v => v.sku === selectedSku.value) ?? product.value.variante[0])!)

const dimenzijeOptions = computed(() => [...new Set(product.value.variante.map(v => v.dimenzije))])
const bojaOptions = computed(() => [...new Set(product.value.variante.map(v => v.boja))])
const obradaOptions = computed(() => [...new Set(product.value.variante.map(v => v.zavrsnaObrada))])

function pick(dim?: string, boja?: string, obrada?: string) {
  const target = { dim: dim ?? selectedVariant.value.dimenzije, boja: boja ?? selectedVariant.value.boja, obrada: obrada ?? selectedVariant.value.zavrsnaObrada }
  const match = product.value.variante.find(v => v.dimenzije === target.dim && v.boja === target.boja && v.zavrsnaObrada === target.obrada)
    ?? product.value.variante.find(v => v.dimenzije === target.dim && v.boja === target.boja)
    ?? product.value.variante.find(v => v.dimenzije === target.dim)
  if (match) selectedSku.value = match.sku
}

const { add } = useInquiry()
const kolicina = ref(selectedVariant.value.m2PoPakovanju ?? 1)
watch(selectedVariant, (v) => { kolicina.value = v.m2PoPakovanju ?? 1 })

function addToInquiry() {
  add({ productSlug: product.value.slug, variantSku: selectedVariant.value.sku, kolicinaM2: kolicina.value })
}

function priceLabel(v: typeof selectedVariant.value) {
  if (!v.cena) return 'Na upit'
  return `${v.cena.toLocaleString('sr-RS')} RSD / ${v.jedinicaCene === 'm2' ? 'm²' : v.jedinicaCene}`
}

useSeoMeta({
  title: computed(() => product.value.seoNaslov ?? product.value.naziv),
  description: computed(() => product.value.seoOpis ?? product.value.opis)
})
</script>

<template>
  <div class="container-f5 py-8 md:py-12">
    <nav class="text-sm text-warm-500 mb-6 flex items-center gap-2 flex-wrap">
      <NuxtLink to="/katalog" class="hover:text-ink-900">Katalog</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/proizvodjaci/${product.proizvodjacSlug}`" class="hover:text-ink-900">{{ product.proizvodjac?.naziv }}</NuxtLink>
      <span>/</span>
      <span class="text-ink-900">{{ product.naziv }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
      <!-- Gallery -->
      <div>
        <div class="aspect-square rounded-2xl bg-warm-100 relative overflow-hidden">
          <NuxtImg
            :src="izgledImage[product.izgled] ?? '/img/stock/texture-concrete.jpg'"
            :alt="`Tekstura — ${product.naziv}, ${selectedVariant.boja}`"
            class="absolute inset-0 w-full h-full object-cover"
            width="800"
            height="800"
            loading="eager"
          />
          <span v-if="product.oznakaNovo" class="absolute top-4 left-4 bg-clay-500 text-white text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">Novo</span>
        </div>
        <div class="grid grid-cols-4 gap-3 mt-3">
          <div v-for="m in selectedVariant.mediji" :key="m.url" class="aspect-square rounded-lg bg-warm-100 relative overflow-hidden" :title="m.altTekst">
            <NuxtImg
              :src="izgledImage[product.izgled] ?? '/img/stock/texture-concrete.jpg'"
              :alt="m.altTekst"
              class="absolute inset-0 w-full h-full object-cover"
              width="200"
              height="200"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Info -->
      <div>
        <span class="label-caps text-warm-500">{{ product.proizvodjac?.naziv }} · {{ product.kolekcija?.naziv }}</span>
        <h1 class="font-display font-semibold text-3xl md:text-4xl mt-2">{{ product.naziv }}</h1>
        <p class="text-warm-600 mt-4 leading-relaxed">{{ product.opis }}</p>

        <div class="mt-8 space-y-5">
          <div v-if="dimenzijeOptions.length > 1">
            <div class="label-caps text-warm-500 mb-2">Dimenzija</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="d in dimenzijeOptions" :key="d" type="button"
                class="px-3 py-1.5 rounded-full border text-sm font-medium"
                :class="selectedVariant.dimenzije === d ? 'bg-sage-400 border-transparent text-ink-900 font-semibold' : 'border-warm-300 text-warm-600 hover:border-ink-900'"
                @click="pick(d)"
              >{{ d }}</button>
            </div>
          </div>
          <div v-if="bojaOptions.length > 1">
            <div class="label-caps text-warm-500 mb-2">Boja</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="b in bojaOptions" :key="b" type="button"
                class="px-3 py-1.5 rounded-full border text-sm font-medium"
                :class="selectedVariant.boja === b ? 'bg-sage-400 border-transparent text-ink-900 font-semibold' : 'border-warm-300 text-warm-600 hover:border-ink-900'"
                @click="pick(undefined, b)"
              >{{ b }}</button>
            </div>
          </div>
          <div v-if="obradaOptions.length > 1">
            <div class="label-caps text-warm-500 mb-2">Završna obrada</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="o in obradaOptions" :key="o" type="button"
                class="px-3 py-1.5 rounded-full border text-sm font-medium capitalize"
                :class="selectedVariant.zavrsnaObrada === o ? 'bg-sage-400 border-transparent text-ink-900 font-semibold' : 'border-warm-300 text-warm-600 hover:border-ink-900'"
                @click="pick(undefined, undefined, o)"
              >{{ obradaLabels[o] ?? o }}</button>
            </div>
          </div>
        </div>

        <div class="mt-8 p-5 rounded-2xl border border-warm-200 bg-white">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xl font-bold font-display">{{ priceLabel(selectedVariant) }}</div>
              <div class="text-xs text-warm-500 mt-0.5">SKU {{ selectedVariant.sku }}</div>
            </div>
            <UBadge :color="dostupnostBadge[selectedVariant.dostupnost]" variant="subtle">
              {{ dostupnostLabels[selectedVariant.dostupnost] }}
            </UBadge>
          </div>
          <div class="flex items-center gap-3 mt-4">
            <UInputNumber v-model="kolicina" :min="0.5" :step="0.5" class="w-32" />
            <span class="text-sm text-warm-500">m²</span>
            <UButton size="lg" color="primary" icon="i-lucide-shopping-bag" class="flex-1" @click="addToInquiry">
              Dodaj u upit
            </UButton>
          </div>
        </div>

        <div v-if="product.tehnickeKarakteristike?.length" class="mt-10">
          <h2 class="font-display font-semibold text-lg mb-3">Tehničke karakteristike</h2>
          <table class="w-full text-sm">
            <tbody>
              <tr v-for="spec in product.tehnickeKarakteristike" :key="spec.naziv" class="border-b border-warm-200">
                <td class="py-2 text-warm-500">{{ spec.naziv }}</td>
                <td class="py-2 text-right font-medium">{{ spec.vrednost }}</td>
              </tr>
              <tr v-if="selectedVariant.komadaPoPakovanju" class="border-b border-warm-200">
                <td class="py-2 text-warm-500">Pakovanje</td>
                <td class="py-2 text-right font-medium">{{ selectedVariant.komadaPoPakovanju }} kom · {{ selectedVariant.m2PoPakovanju }} m²</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="product.dokumentacija?.length" class="mt-6 flex flex-col gap-2">
          <a
            v-for="doc in product.dokumentacija" :key="doc.url" :href="doc.url"
            class="flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-clay-600"
          >
            <UIcon name="i-lucide-file-text" class="size-4" /> {{ doc.naziv }}
          </a>
        </div>
      </div>
    </div>

    <!-- Related -->
    <div v-if="povezani.length" class="mt-20">
      <h2 class="font-display font-semibold text-2xl mb-6">Povezani proizvodi</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <ProductCard v-for="p in povezani" :key="p.slug" :product="p as any" />
      </div>
    </div>
  </div>
</template>
