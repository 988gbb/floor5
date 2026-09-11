<script setup lang="ts">
const { lines, isOpen, remove } = useInquiry()

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
</script>

<template>
  <USlideover v-model:open="isOpen" side="right">
    <template #content>
      <div class="flex flex-col h-full">
        <div class="p-6 border-b border-warm-200 flex items-center justify-between">
          <h3 class="font-display font-semibold text-lg">Vaš upit</h3>
          <UButton icon="i-lucide-x" variant="ghost" color="neutral" @click="isOpen = false" />
        </div>

        <div v-if="lines.length === 0" class="flex-1 flex flex-col items-center justify-center text-center gap-3 p-8">
          <div class="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center text-warm-500">
            <UIcon name="i-lucide-shopping-bag" class="size-5" />
          </div>
          <p class="text-sm text-warm-600 max-w-[24ch]">Još uvek niste dodali nijednu pločicu u upit.</p>
          <UButton to="/katalog" variant="soft" color="neutral" @click="isOpen = false">Istraži katalog</UButton>
        </div>

        <div v-else class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div
            v-for="line in lines"
            :key="line.productSlug + line.variantSku"
            class="flex gap-3 border border-warm-200 rounded-lg p-3"
          >
            <div class="w-16 h-16 rounded-md bg-gradient-to-br from-warm-300 to-warm-100 flex-none" />
            <div class="min-w-0 flex-1">
              <div class="font-display font-semibold text-sm truncate">
                {{ details[line.productSlug]?.naziv ?? line.productSlug }}
              </div>
              <div class="text-xs text-warm-500">
                {{ variantOf(line.productSlug, line.variantSku)?.dimenzije }}
                · {{ variantOf(line.productSlug, line.variantSku)?.boja }}
              </div>
              <div class="text-xs text-warm-400 mt-0.5">SKU {{ line.variantSku }}</div>
            </div>
            <UButton
              icon="i-lucide-trash-2"
              variant="ghost"
              color="neutral"
              size="xs"
              @click="remove(line.productSlug, line.variantSku)"
            />
          </div>
        </div>

        <div v-if="lines.length > 0" class="p-6 border-t border-warm-200">
          <UButton to="/upit" block color="primary" size="lg" @click="isOpen = false">
            Nastavi na slanje upita ({{ lines.length }})
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>
