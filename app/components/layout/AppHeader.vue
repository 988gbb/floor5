<script setup lang="ts">
const { count, isOpen } = useInquiry()
const mobileOpen = ref(false)
const route = useRoute()

const links = [
  { to: '/katalog', label: 'Katalog' },
  { to: '/kolekcije', label: 'Kolekcije' },
  { to: '/inspiracija', label: 'Inspiracija' },
  { to: '/o-nama', label: 'O nama' },
  { to: '/kontakt', label: 'Kontakt' }
]

watch(() => route.fullPath, () => { mobileOpen.value = false })
</script>

<template>
  <header class="sticky top-0 z-40 bg-porcelain/95 backdrop-blur border-b border-warm-200">
    <div class="container-f5 flex items-center justify-between h-16 md:h-20">
      <NuxtLink to="/" class="flex items-center" aria-label="Floor5 — početna">
        <NuxtImg src="/img/logo-floor5.png" alt="Floor5" class="h-10 md:h-12 w-auto" width="500" height="230" />
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-warm-700 hover:text-ink-900 transition-colors pb-1 border-b-2 border-transparent"
          active-class="!text-ink-900 !border-clay-500"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          variant="subtle"
          color="neutral"
          icon="i-lucide-shopping-bag"
          class="hidden sm:inline-flex"
          @click="isOpen = true"
        >
          Upit
          <UBadge v-if="count > 0" color="primary" size="sm" class="ml-1">{{ count }}</UBadge>
        </UButton>
        <UButton to="/kontakt" color="primary">Zahtev za ponudu</UButton>
        <UButton
          icon="i-lucide-menu"
          variant="ghost"
          color="neutral"
          class="lg:hidden"
          aria-label="Meni"
          @click="mobileOpen = true"
        />
      </div>
    </div>

    <USlideover v-model:open="mobileOpen" side="right">
      <template #content>
        <div class="p-6 flex flex-col gap-1">
          <NuxtImg src="/img/logo-floor5.png" alt="Floor5" class="h-10 w-auto self-start shrink-0 mb-4" width="500" height="230" />
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-base font-medium py-3 border-b border-warm-200 text-warm-800"
            active-class="!text-clay-600"
          >
            {{ link.label }}
          </NuxtLink>
          <UButton
            block
            color="neutral"
            variant="subtle"
            class="mt-4"
            icon="i-lucide-shopping-bag"
            @click="isOpen = true; mobileOpen = false"
          >
            Upit ({{ count }})
          </UButton>
        </div>
      </template>
    </USlideover>
  </header>
</template>
