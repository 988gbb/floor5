<script setup lang="ts">
const mobileOpen = ref(false)
const route = useRoute()
const mobileMenuEl = ref<HTMLElement | null>(null)

const links = [
  { to: '/', label: 'Početna' },
  { to: '/#o-nama', label: 'O nama' },
  { to: '/brendovi', label: 'Brendovi' },
  { to: '/#usluge', label: 'Usluge' },
  { to: '/#inspiracije', label: 'Inspiracije' },
  { to: '/#reference', label: 'Reference' },
  { to: '/#kontakt', label: 'Kontakt' }
]

// Na početnoj header ostaje taman/proziran sa belim tekstom (kao original) —
// skrol samo menja providnost/blur pozadine, nikad ne prelazi u svetlu traku.
// Na ostalim stranicama (koje original nema) header je uvek čvrst i svetao.
const isHome = computed(() => route.path === '/')
const scrolled = ref(false)
const hidden = ref(false)

const { $lenis, $gsap: gsap } = useNuxtApp() as any
let lastScroll = 0
let onScroll: ((e: { scroll: number }) => void) | null = null
let menuTl: any = null

onMounted(() => {
  if (isHome.value) {
    onScroll = ({ scroll }) => {
      hidden.value = scroll > 150 && scroll > lastScroll
      scrolled.value = scroll > 40
      lastScroll = scroll
    }
    ;(($lenis as any))?.on?.('scroll', onScroll)
  }

  menuTl = gsap.timeline({ paused: true })
  menuTl
    .set(mobileMenuEl.value, { visibility: 'visible' })
    .to(mobileMenuEl.value, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut' })
    .from(mobileMenuEl.value!.querySelectorAll('nav a'), { y: 60, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=0.3')
    .from(mobileMenuEl.value!.querySelector('.mobile-menu-footer'), { opacity: 0, duration: 0.5 }, '-=0.3')
})

onBeforeUnmount(() => {
  if (onScroll) (($lenis as any))?.off?.('scroll', onScroll)
})

watch(() => route.fullPath, () => { closeMobileMenu() })

function openMobileMenu() {
  mobileOpen.value = true
  menuTl?.play()
  ;(($lenis as any))?.stop?.()
}

function closeMobileMenu() {
  if (!mobileOpen.value) return
  mobileOpen.value = false
  menuTl?.reverse()
  ;(($lenis as any))?.start?.()
}
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-8 lg:px-16 transition-[transform,background,backdrop-filter,padding] duration-500 ease-out"
    :class="[
      hidden ? '-translate-y-full' : 'translate-y-0',
      isHome ? (scrolled ? 'py-4 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[12px]' : 'py-[1.4rem]') : 'py-4 bg-porcelain shadow-[0_1px_0_rgba(53,49,47,0.08)]'
    ]"
    :style="isHome ? { background: scrolled ? 'linear-gradient(to bottom, rgba(53,49,47,0.72), rgba(53,49,47,0.35))' : 'transparent' } : undefined"
  >
    <div v-if="isHome && !scrolled" class="absolute inset-0 -z-10 pointer-events-none" style="background:linear-gradient(to bottom, rgba(53,49,47,0.35), rgba(53,49,47,0))" />

    <NuxtLink to="/" class="block mt-2 relative z-[601]" aria-label="Floor5 — početna">
      <NuxtImg
        :src="(isHome || mobileOpen) ? '/img/reference/logo1.png' : '/img/logo-floor5.png'"
        alt="Floor5"
        class="h-[34px] w-auto"
        :width="isHome || mobileOpen ? 447 : 500" :height="isHome || mobileOpen ? 148 : 230"
      />
    </NuxtLink>

    <nav class="hidden md:flex items-center gap-[2.4rem] mt-2">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="group relative inline-block h-[1.1em] overflow-hidden text-[0.75rem] font-medium uppercase tracking-[2.5px]"
        :class="isHome ? 'text-white' : 'text-ink-700'"
      >
        <span class="block leading-[1.1em] transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{{ link.label }}</span>
        <span class="absolute left-0 top-full block leading-[1.1em] text-sage-400 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{{ link.label }}</span>
      </NuxtLink>
    </nav>

    <button
      class="relative z-[601] flex flex-col gap-[7px] p-1.5 md:hidden"
      aria-label="Meni"
      @click="mobileOpen ? closeMobileMenu() : openMobileMenu()"
    >
      <span
        class="w-[26px] h-[1.5px] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="[mobileOpen ? 'translate-y-[4.25px] rotate-45 bg-white' : (isHome ? 'bg-white' : 'bg-ink-900')]"
      />
      <span
        class="w-[26px] h-[1.5px] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="[mobileOpen ? '-translate-y-[4.25px] -rotate-45 bg-white' : (isHome ? 'bg-white' : 'bg-ink-900')]"
      />
    </button>

  </header>

  <!-- Fullscreen mobilni meni — isti tretman kao original: taman, centriran, veliki linkovi.
       Teleport na body je NAMERAN: header ima CSS transform (translate-y za sakrivanje pri
       skrolu), a transform na pretku pravi nov "containing block" za position:fixed potomke —
       bez Teleport-a bi ovaj meni bio zarobljen unutar header-ove (tanke) kutije umesto da
       pokrije ceo ekran. -->
  <Teleport to="body">
    <div
      ref="mobileMenuEl"
      class="fixed inset-0 z-[450] flex flex-col justify-center bg-ink-900 px-[8vw] invisible"
      style="clip-path:inset(0 0 100% 0);"
    >
      <nav class="flex flex-col gap-4">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="font-sans text-porcelain hover:text-sage-400 transition-colors overflow-hidden"
          style="font-size:clamp(2.2rem, 8vw, 4rem);"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="mobile-menu-footer absolute bottom-12 left-[8vw] text-porcelain/50 text-[0.85rem] leading-[1.8]">
        <p>Bulevar Zorana Đinđića 123g</p>
        <p>office@floor5.rs</p>
      </div>
    </div>
  </Teleport>
</template>
