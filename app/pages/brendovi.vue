<script setup lang="ts">
useSeoMeta({
  title: 'Brendovi',
  description: 'Floor5 — brendovi sa kojima sarađujemo. Selekcija najboljih evropskih proizvođača keramike iz Italije i Španije.'
})

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!import.meta.client) return
  const { $gsap: gsap } = useNuxtApp() as any
  const ctx = gsap.context(() => {
    document.querySelectorAll('.split-heading').forEach((heading) => {
      const text = heading.textContent || ''
      const words = text.trim().split(/\s+/).map(w => `<span class="inline-block overflow-hidden align-top"><span class="inline-block translate-y-[110%]">${w}</span></span>`).join(' ')
      heading.innerHTML = words
      const spans = heading.querySelectorAll(':scope > span > span')
      gsap.to(spans, { y: 0, duration: 1, stagger: 0.04, ease: 'power4.out', delay: 0.2 })
    })
    gsap.utils.toArray('.f5-stagger-grid').forEach((grid: any) => {
      gsap.fromTo(grid.children, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 90%' }
      })
    })
  }, root.value!)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <div ref="root">
    <!-- PAGE HERO -->
    <section class="min-h-[46vh] flex flex-col items-center justify-center text-center px-[5%] pt-40 pb-16 bg-porcelain">
      <p class="text-[0.72rem] font-semibold uppercase tracking-[4px] text-sage-600 mb-6">Naša ponuda</p>
      <h1 class="split-heading font-display font-semibold leading-[1.05] mb-6" style="font-size:clamp(2.6rem, 6vw, 4.6rem);">
        Naši <em class="font-accent-italic text-sage-600 not-italic" style="font-style:italic;">brendovi</em>
      </h1>
      <p class="text-[1.05rem] font-light leading-[1.8] opacity-75 max-w-[56ch]">Selekcija najboljih evropskih proizvođača keramike i opremanja, pažljivo odabranih za prostore koji traže više.</p>
      <div class="mt-9 inline-flex items-center gap-3 border border-ink-900/25 px-6 py-3 text-[0.66rem] uppercase tracking-[2.5px]">
        <strong class="text-sage-600 text-base not-italic font-display">19</strong>
        <span>brend partnera</span>
      </div>
    </section>

    <!-- BRENDOVI -->
    <section class="pb-24">
      <div class="f5-stagger-grid grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/18 border-y border-ink-900/18 mx-[1.2rem] md:mx-8 lg:mx-16">
        <BrandCard v-for="b in allBrands" :key="b.name" :brand="b" />
      </div>

      <div class="flex justify-center pt-20 pb-8 px-6">
        <NuxtLink to="/" class="inline-flex items-center gap-3 text-ink-900 hover:text-sage-600 uppercase tracking-[2.5px] text-[0.72rem] font-semibold transition-colors group">
          <UIcon name="i-lucide-arrow-left" class="size-5 transition-transform group-hover:-translate-x-1.5" />
          <span>Nazad na početnu</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
