<script setup lang="ts">
const year = new Date().getFullYear()
const bigText = ref<HTMLElement | null>(null)
const footerRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!import.meta.client) return
  const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp() as any
  const ctx = gsap.context(() => {
    gsap.from(bigText.value, {
      yPercent: 35,
      ease: 'none',
      scrollTrigger: { trigger: footerRoot.value, start: 'top bottom', end: 'bottom bottom', scrub: true }
    })
  }, footerRoot.value!)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <footer ref="footerRoot" class="bg-ink-900 text-porcelain/80 relative overflow-hidden px-8 lg:px-16 pt-12 lg:pt-16">
    <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 pb-12 border-b border-white/10">
      <NuxtLink to="/"><NuxtImg src="/img/reference/logo1.png" alt="Floor5" class="h-9 w-auto" width="447" height="148" /></NuxtLink>
      <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2">
        <NuxtLink to="/#o-nama" class="text-xs uppercase tracking-[0.15em] hover:text-sage-400 transition-colors">O nama</NuxtLink>
        <NuxtLink to="/brendovi" class="text-xs uppercase tracking-[0.15em] hover:text-sage-400 transition-colors">Brendovi</NuxtLink>
        <NuxtLink to="/#usluge" class="text-xs uppercase tracking-[0.15em] hover:text-sage-400 transition-colors">Usluge</NuxtLink>
        <NuxtLink to="/#inspiracije" class="text-xs uppercase tracking-[0.15em] hover:text-sage-400 transition-colors">Inspiracije</NuxtLink>
        <NuxtLink to="/#reference" class="text-xs uppercase tracking-[0.15em] hover:text-sage-400 transition-colors">Reference</NuxtLink>
      </nav>
    </div>

    <div class="flex flex-col md:flex-row items-center md:justify-between gap-2 py-6 text-xs text-porcelain/50 text-center md:text-left">
      <span>© {{ year }} Floor5. Sva prava zadržana.</span>
      <span>Opremanje i dizajn enterijera i eksterijera</span>
    </div>

    <div ref="bigText" class="select-none pointer-events-none font-display font-semibold leading-none text-white/[0.06] text-center pb-2" style="font-size:clamp(4rem, 16vw, 13rem);">
      FLOOR5
    </div>
  </footer>
</template>
