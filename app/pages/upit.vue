<script setup lang="ts">
useSeoMeta({ title: 'Vaš upit' })

const { lines, remove, clear } = useInquiry()

const details = ref<Record<string, any>>({})
watch(lines, async (val) => {
  const missing = [...new Set(val.map(l => l.productSlug))].filter(slug => !details.value[slug])
  await Promise.all(missing.map(async (slug) => {
    try {
      const data = await $fetch(`/api/products/${slug}`)
      details.value[slug] = data.product
    } catch {
      // proizvod je možda uklonjen iz kataloga u međuvremenu
    }
  }))
}, { immediate: true, deep: true })

function variantOf(productSlug: string, sku: string) {
  return details.value[productSlug]?.variante?.find((v: any) => v.sku === sku)
}

const justSubmitted = ref(false)

function onSubmitted() {
  justSubmitted.value = true
  clear()
}
</script>

<template>
  <div class="container-f5 py-10 md:py-14">
    <h1 class="font-display font-semibold text-3xl md:text-4xl mb-8">Vaš upit</h1>

    <div v-if="lines.length === 0 && !justSubmitted" class="border border-dashed border-warm-300 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-warm-100 text-warm-500 flex items-center justify-center">
        <UIcon name="i-lucide-shopping-bag" class="size-5" />
      </div>
      <p class="text-warm-700 font-medium">Vaš upit je prazan.</p>
      <UButton to="/katalog" color="primary">Istraži katalog</UButton>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
      <div class="flex flex-col gap-3">
        <div v-if="justSubmitted" class="p-4 rounded-2xl border border-success-100 bg-success-50 text-success-700 text-sm">
          Stavke iz upita su poslate i korpa je ispražnjena.
        </div>
        <div
          v-for="line in lines" :key="line.productSlug + line.variantSku"
          class="flex gap-4 p-4 rounded-2xl border border-warm-200 bg-white"
        >
          <div class="w-20 h-20 rounded-lg bg-gradient-to-br from-warm-300 to-warm-100 flex-none" />
          <div class="min-w-0 flex-1">
            <NuxtLink :to="`/katalog/${line.productSlug}`" class="font-display font-semibold text-sm hover:text-clay-600">
              {{ details[line.productSlug]?.naziv ?? line.productSlug }}
            </NuxtLink>
            <div class="text-xs text-warm-500 mt-1">
              {{ variantOf(line.productSlug, line.variantSku)?.dimenzije }} ·
              {{ variantOf(line.productSlug, line.variantSku)?.boja }} ·
              {{ variantOf(line.productSlug, line.variantSku)?.zavrsnaObrada }}
            </div>
            <div class="text-xs text-warm-400 mt-0.5">SKU {{ line.variantSku }} · {{ line.kolicinaM2 }} m²</div>
          </div>
          <UButton icon="i-lucide-trash-2" variant="ghost" color="neutral" size="sm" @click="remove(line.productSlug, line.variantSku)" />
        </div>
      </div>

      <div class="p-6 md:p-8 rounded-2xl bg-white border border-warm-200 h-fit">
        <h2 class="font-display font-semibold text-lg mb-1">Pošaljite zahtev za ponudu</h2>
        <p class="text-sm text-warm-500 mb-6">Odgovaramo u najkraćem roku putem email-a ili telefona.</p>
        <RfqForm :stavke="lines" @submitted="onSubmitted" />
      </div>
    </div>
  </div>
</template>
