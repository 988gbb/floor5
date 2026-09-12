<script setup lang="ts">
useSeoMeta({
  title: 'Premium keramika i pločice iz Italije i Španije',
  description: 'Floor5 — opremanje i dizajn enterijera i eksterijera. Keramika ekskluzivnog kvaliteta iz Italije i Španije, u šourumu na Novom Beogradu.'
})

const brands = featuredBrands

const services = [
  { num: '01', title: 'Opremanje enterijera', text: 'Kompletno opremanje stambenih i poslovnih enterijera, od podova i zidova do finalnih detalja.', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop' },
  { num: '02', title: 'Dizajn eksterijera', text: 'Fasadna keramika, terase i spoljni prostori otporni na vremenske uslove, bez kompromisa u estetici.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop' },
  { num: '03', title: 'Projektovanje', text: 'Idejna rešenja i tehnička dokumentacija za rezidencijalne i komercijalne objekte.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop' },
  { num: '04', title: 'Konsultacije', text: 'Stručni tim rame uz rame sa Vama, od izbora materijala i formata do budžeta prilagođenog projektu.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop' }
]

const galleryItems = [
  { to: '', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1400&auto=format&fit=crop', caption: 'Kupatilo · mermerni efekat', size: 'tall' as const },
  { to: '', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', caption: 'Rezidencija · eksterijer', size: 'wide' as const },
  { to: '', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1400&auto=format&fit=crop', caption: 'Kuhinja · veliki formati', size: 'tall' as const },
  { to: '', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop', caption: 'Dnevni boravak · keramika', size: 'wide' as const },
  { to: '', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop', caption: 'Vila · fasadna keramika', size: 'tall' as const },
  { to: '', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop', caption: 'Penthouse · dnevna zona', size: 'wide' as const }
]

const refCards = [
  { num: '01', title: 'Komercijalni objekti', text: 'Tržni centri i poslovne hale opremljene keramikom velikih formata.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop' },
  { num: '02', title: 'Rezidencijalni objekti', text: 'Zgrade, kuće i stanovi projektovani i opremljeni od temelja do detalja.', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop' },
  { num: '03', title: 'Poslovni prostori', text: 'Kancelarije i showroom prostori sa premium enterijer rešenjima.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop' }
]

const clients = [
  { name: 'Gradina', href: 'https://gradinazemun.rs/', logo: '/img/reference/clients/gradina-logo.png' },
  { name: 'Jadran', href: 'https://jadran-bg.rs/', logo: '/img/reference/clients/jadran-logo.png' },
  { name: 'MPC Properties', href: 'https://mpcproperties.rs/', logo: '/img/reference/clients/mpc-logo.png' },
  { name: 'Brigate', href: 'https://brigate.rs/', logo: '/img/reference/clients/brigate-logo.png' },
  { name: 'Termomont', href: 'https://termomont.rs/', logo: '/img/reference/clients/termomont-logo.png' },
  { name: 'Airport Garden', href: 'https://airport-garden.rs/en/', logo: '/img/reference/clients/airport-logo.webp' }
]

const instaPhotos = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=900&auto=format&fit=crop'
]

const root = ref<HTMLElement | null>(null)
const galleryPin = ref<HTMLElement | null>(null)
const galleryTrack = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!import.meta.client) return
  const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp() as any
  const ctx = gsap.context(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isTouch = window.matchMedia('(hover: none)').matches

    // Hero intro
    gsap.timeline()
      .to('.ht-inner', { y: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' })
      .to('.reveal-line > span', { y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.8')
      .to('.hero-cta .btn', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
      .from('.frame-corner', { scale: 0, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' }, '-=0.6')

    // Hero parallax
    gsap.to('.hero-content', {
      yPercent: -30, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.f5-hero', start: 'top top', end: 'bottom top', scrub: true }
    })

    // Parallax images
    gsap.utils.toArray('.f5-parallax-img').forEach((img: any) => {
      gsap.fromTo(img, { yPercent: -10 }, {
        yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    // Clip reveal
    gsap.utils.toArray('.clip-reveal').forEach((el: any) => {
      gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } })
    })

    // Split headings (word reveal)
    document.querySelectorAll('.split-heading').forEach((heading) => {
      const text = heading.textContent || ''
      const words = text.trim().split(/\s+/).map(w => `<span class="inline-block overflow-hidden align-top"><span class="inline-block translate-y-[110%]">${w}</span></span>`).join(' ')
      heading.innerHTML = words
      const spans = heading.querySelectorAll(':scope > span > span')
      gsap.to(spans, { y: 0, duration: 1, stagger: 0.04, ease: 'power4.out', scrollTrigger: { trigger: heading, start: 'top 88%' } })
    })

    // Fade up
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })

    // Counters
    document.querySelectorAll('.stat-num').forEach((num: any) => {
      const target = parseInt(num.dataset.count, 10)
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target, duration: 1.8, ease: 'power2.out',
        onUpdate: () => { num.textContent = Math.round(obj.val) },
        scrollTrigger: { trigger: num, start: 'top 90%' }
      })
    })

    // Brand / ref / insta card entrances
    gsap.utils.toArray('.f5-stagger-grid').forEach((grid: any) => {
      gsap.fromTo(grid.children, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 88%' }
      })
    })

    // Horizontal pinned gallery (desktop only)
    if (galleryTrack.value && galleryPin.value && !isMobile) {
      const getAmount = () => galleryTrack.value!.scrollWidth - window.innerWidth
      gsap.to(galleryTrack.value, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: galleryPin.value, start: 'top top', end: () => `+=${getAmount()}`,
          pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1
        }
      })
    }

    // Magnetic buttons
    if (!isTouch) {
      document.querySelectorAll('.magnetic').forEach((btn: any) => {
        const strength = 24
        btn.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(btn, { x: (x / rect.width) * strength, y: (y / rect.height) * strength, duration: 0.4, ease: 'power3.out' })
        })
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        })
      })
    }

    window.addEventListener('load', () => ScrollTrigger.refresh())
  }, root.value!)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <div ref="root">
    <!-- HERO -->
    <section class="f5-hero relative h-[100svh] min-h-[560px] flex items-center justify-center text-center overflow-hidden">
      <NuxtImg
        src="/img/reference/hero.jpg"
        alt="Enterijer sa mermernim pločicama velikog formata, dnevni boravak"
        class="absolute inset-0 w-full h-full object-cover brightness-[0.6] saturate-[0.92]"
        width="1920" height="1280" loading="eager" fetchpriority="high"
      />
      <div class="absolute inset-0 z-[1]" style="background:linear-gradient(to bottom, rgba(20,18,17,.85), rgba(20,18,17,.4) 20%, rgba(53,49,47,0) 42%, rgba(53,49,47,0) 58%, rgba(53,49,47,.5))" />
      <div class="absolute inset-4 md:inset-8 z-[2] pointer-events-none">
        <span class="frame-corner absolute top-0 left-0 w-10 h-10 border-t border-l border-sage-400/90" />
        <span class="frame-corner absolute top-0 right-0 w-10 h-10 border-t border-r border-sage-400/90" />
        <span class="frame-corner absolute bottom-0 left-0 w-10 h-10 border-b border-l border-sage-400/90" />
        <span class="frame-corner absolute bottom-0 right-0 w-10 h-10 border-b border-r border-sage-400/90" />
      </div>

      <div class="hero-content relative z-[3] px-6">
        <p class="reveal-line overflow-hidden mb-6"><span class="inline-block translate-y-[110%] text-white/85 text-xs font-semibold uppercase tracking-[0.3em]">Showroom · Bulevar Zorana Đinđića 123g</span></p>
        <h1 class="font-display text-white font-semibold leading-[1.08] mb-6" style="font-size:clamp(2.8rem, 8vw, 7rem); letter-spacing:0.015em;">
          <span class="inline-block overflow-hidden"><span class="ht-inner inline-block translate-y-[110%]">Premium <em class="font-accent-italic text-sage-400 not-italic" style="font-style:italic;">Keramika</em></span></span>
        </h1>
        <p class="reveal-line overflow-hidden mb-10"><span class="inline-block translate-y-[110%] text-white/90 text-base md:text-lg font-light tracking-wide">Ekskluzivni kvalitet za prostor po Vašoj meri.</span></p>
        <div class="hero-cta flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/#kontakt" class="btn magnetic opacity-0 translate-y-4 inline-block px-9 py-4 uppercase tracking-[0.2em] text-[0.72rem] font-medium bg-sage-400 text-ink-900 hover:bg-white transition-colors">
            Zakažite termin
          </NuxtLink>
          <NuxtLink to="/#inspiracije" class="btn magnetic opacity-0 translate-y-4 inline-block px-9 py-4 uppercase tracking-[0.2em] text-[0.72rem] font-medium border border-white/60 text-white hover:border-sage-400 hover:text-sage-400 transition-colors">
            Inspiracije
          </NuxtLink>
        </div>
      </div>

      <div class="absolute z-[3] bottom-8 left-6 right-6 md:left-16 md:right-16 flex justify-between items-end text-white">
        <div class="flex items-center gap-4">
          <span class="text-[0.62rem] uppercase tracking-[0.25em] opacity-70">Scroll</span>
          <span class="relative w-px h-12 bg-white/25 overflow-hidden">
            <span class="absolute inset-x-0 h-full bg-sage-400 animate-[scrollDrop_2.2s_ease-in-out_infinite]" />
          </span>
        </div>
        <div class="hidden sm:flex flex-col items-end gap-1 text-[0.62rem] tracking-[0.15em] uppercase opacity-60">
          <span>44.8183° N</span>
          <span>20.4107° E</span>
        </div>
      </div>
    </section>

    <!-- O NAMA -->
    <section id="o-nama" class="bg-porcelain">
      <div class="flex items-center gap-4 px-8 lg:px-16 pt-20 pb-10">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-700">O nama</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 md:min-h-[90vh]">
        <div class="flex flex-col justify-center px-6 md:px-16 py-14 md:py-0">
          <h2 class="split-heading font-display font-semibold mb-8" style="font-size:clamp(1.9rem, 3.4vw, 3.2rem);">Naš cilj je prostor po Vašoj meri</h2>
          <p class="fade-up opacity-0 translate-y-6 text-ink-700 leading-[1.9] font-light max-w-[52ch] mb-5">Floor5 bavi se opremanjem i dizajnom enterijera i eksterijera. To radimo rame uz rame sa našim stručnim timom kroz konsultacije, od prve ideje do poslednje pločice.</p>
          <p class="fade-up opacity-0 translate-y-6 text-ink-700 leading-[1.9] font-light max-w-[52ch] mb-5">Pored opremanja komercijalnih prostora poput tržnih centara i hala, vršimo i kompletno projektovanje i opremanje rezidencijalnih objekata: zgrada, kuća i stanova.</p>
          <p class="fade-up opacity-0 translate-y-6 text-ink-700 leading-[1.9] font-light max-w-[52ch]">U našoj ponudi je keramika ekskluzivnog kvaliteta, proizvedena u Italiji i Španiji, pažljivo odabrana za prostore koji traže više.</p>

          <div class="flex gap-10 flex-wrap mt-10 pt-8 border-t border-ink-900/15">
            <div>
              <span class="stat-num font-display text-4xl text-sage-600" data-count="15">0</span><span class="font-display text-4xl text-sage-600">+</span>
              <span class="block text-[0.62rem] uppercase tracking-[0.15em] mt-1 text-ink-600">Godina iskustva</span>
            </div>
            <div>
              <span class="stat-num font-display text-4xl text-sage-600" data-count="400">0</span><span class="font-display text-4xl text-sage-600">+</span>
              <span class="block text-[0.62rem] uppercase tracking-[0.15em] mt-1 text-ink-600">Realizovanih projekata</span>
            </div>
            <div>
              <span class="stat-num font-display text-4xl text-sage-600" data-count="2">0</span>
              <span class="block text-[0.62rem] uppercase tracking-[0.15em] mt-1 text-ink-600">Zemlje porekla keramike</span>
            </div>
          </div>
        </div>

        <div class="relative min-h-[55vh] md:min-h-[60vh] overflow-hidden clip-reveal" style="clip-path:inset(100% 0 0 0);">
          <div class="f5-parallax-img absolute -inset-y-[15%] inset-x-0">
            <NuxtImg src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop" alt="Enterijer" class="w-full h-full object-cover" width="900" height="1200" loading="lazy" />
          </div>
          <span class="absolute bottom-6 left-6 z-[2] bg-ink-900 text-porcelain text-[0.62rem] uppercase tracking-[0.2em] px-4 py-2">Enterijer · Kolekcija 2026</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 md:min-h-[90vh]">
        <div class="relative min-h-[55vh] md:min-h-[60vh] overflow-hidden md:order-1 clip-reveal" style="clip-path:inset(100% 0 0 0);">
          <div class="f5-parallax-img absolute -inset-y-[15%] inset-x-0">
            <NuxtImg src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop" alt="Eksterijer" class="w-full h-full object-cover" width="900" height="1200" loading="lazy" />
          </div>
          <span class="absolute bottom-6 left-6 z-[2] bg-ink-900 text-porcelain text-[0.62rem] uppercase tracking-[0.2em] px-4 py-2">Eksterijer · Rezidencijalni objekti</span>
        </div>
        <div class="flex flex-col justify-center px-6 md:px-16 py-14 md:py-0 bg-ink-900 text-porcelain md:order-2">
          <h2 class="split-heading font-display font-semibold mb-8" style="font-size:clamp(1.9rem, 3.4vw, 3.2rem);">Od konsultacija do ključa u ruke.</h2>
          <p class="fade-up opacity-0 translate-y-6 text-porcelain/85 leading-[1.9] font-light max-w-[52ch] mb-5">Svaki projekat posmatramo kao jedinstven. Naš tim vodi Vas kroz izbor materijala, formata i tekstura, uz detaljno planiranje svakog kvadratnog metra.</p>
          <p class="fade-up opacity-0 translate-y-6 text-porcelain/85 leading-[1.9] font-light max-w-[52ch] mb-8">Verujemo da prostor u kojem živite i radite zaslužuje materijale koji traju, estetski i tehnički.</p>
          <a href="#usluge" class="fade-up opacity-0 translate-y-6 inline-flex items-center gap-3 text-sage-400 uppercase tracking-[0.2em] text-[0.72rem] w-fit group">
            <span>Naše usluge</span>
            <UIcon name="i-lucide-arrow-right" class="size-5 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>

    <!-- BRENDOVI -->
    <section id="brendovi" class="bg-porcelain pb-20">
      <div class="flex items-center gap-4 px-8 lg:px-16 pt-20 pb-10">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-700">Brendovi</span>
      </div>
      <h2 class="split-heading font-display font-semibold px-8 lg:px-16 max-w-3xl mb-10" style="font-size:clamp(1.9rem, 3.8vw, 3.4rem);">Selekcija najboljih evropskih proizvođača</h2>

      <div class="f5-stagger-grid grid grid-cols-2 lg:grid-cols-3 gap-px bg-ink-900/15 border-y border-ink-900/15 mx-[1.2rem] md:mx-8 lg:mx-16">
        <BrandCard v-for="b in brands" :key="b.name" :brand="b" />
      </div>

      <div class="flex justify-center pt-10 px-6">
        <NuxtLink to="/brendovi" class="inline-flex items-center gap-3 border border-ink-900/25 px-10 py-4 uppercase tracking-[0.2em] text-[0.72rem] font-semibold text-ink-800 hover:bg-sage-400 hover:border-sage-400 transition-colors">
          <span>Svi brendovi</span>
          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </NuxtLink>
      </div>
    </section>

    <!-- USLUGE -->
    <section id="usluge" class="bg-porcelain pb-32">
      <div class="flex items-center gap-4 px-8 lg:px-16 pt-24 pb-14">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-700">Usluge</span>
      </div>
      <div class="f5-stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-ink-900/12 mx-[1.2rem] md:mx-8 lg:mx-16">
        <div v-for="s in services" :key="s.num" class="group relative border-r border-t border-b border-ink-900/12 flex flex-row md:flex-col items-stretch bg-porcelain hover:bg-white transition-colors overflow-hidden">
          <div class="w-[120px] h-auto max-md:min-h-full md:w-full md:h-[220px] flex-shrink-0 overflow-hidden relative">
            <NuxtImg :src="s.img" :alt="s.title" class="absolute inset-0 w-full h-full object-cover grayscale-[45%] brightness-[0.92] scale-105 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.14]" width="400" height="220" loading="lazy" />
          </div>
          <div class="p-[1.3rem_1.3rem_2.2rem] md:p-[2.2rem_2.2rem_3.4rem] flex flex-col flex-1 relative">
            <span class="font-display italic text-sage-600 text-[0.85rem] md:text-base">{{ s.num }}</span>
            <h3 class="font-display font-semibold text-[1.2rem] md:text-[1.55rem] mt-[0.7rem] md:mt-[1.6rem] mb-2 md:mb-[1.1rem]">{{ s.title }}</h3>
            <p class="text-[0.8rem] md:text-[0.9rem] leading-[1.6] md:leading-[1.8] font-light text-ink-700 opacity-90">{{ s.text }}</p>
          </div>
          <div class="absolute bottom-0 left-0 w-full h-[3px] bg-sage-400 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
        </div>
      </div>
    </section>

    <!-- INSPIRACIJE — horizontal gallery -->
    <section id="inspiracije" class="bg-ink-900 text-porcelain overflow-hidden">
      <div class="flex items-center gap-4 px-8 lg:px-16 pt-20 pb-6">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-porcelain">Inspiracije</span>
      </div>
      <div ref="galleryPin" class="md:h-[100svh] flex flex-col md:flex-row md:items-center overflow-hidden pb-8 md:pb-0">
        <div ref="galleryTrack" class="flex flex-col md:flex-row md:items-center gap-8 md:gap-[4vw] px-6 md:px-[6vw] will-change-transform">
          <div class="w-full md:w-[34vw] md:min-w-[300px] flex-shrink-0">
            <h2 class="font-display font-semibold leading-[1.1] mb-5" style="font-size:clamp(2rem, 5vw, 4rem);">Prostori koji <em class="font-accent-italic text-sage-400 not-italic" style="font-style:italic;">inspirišu</em></h2>
            <p class="font-light leading-[1.8] opacity-75 max-w-[36ch]">Pomerite kroz selekciju naših najnovijih realizacija i kolekcija.</p>
          </div>
          <figure
            v-for="(g, i) in galleryItems" :key="i"
            class="group relative w-full md:min-w-[280px] h-[55vh] flex-shrink-0 overflow-hidden"
            :class="g.size === 'tall' ? 'md:w-[30vw] md:h-[68vh]' : 'md:w-[46vw] md:h-[55vh]'"
          >
            <NuxtImg :src="g.img" :alt="g.caption" class="absolute -inset-[10%] w-[120%] h-[120%] object-cover brightness-[0.85] transition-[filter] duration-500 group-hover:brightness-100" width="900" height="700" loading="lazy" />
            <figcaption class="absolute bottom-5 left-5 z-[2] bg-porcelain text-ink-900 text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2.5">
              <span class="text-sage-600 italic font-display mr-2">{{ String(i + 1).padStart(2, '0') }}</span>{{ g.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- REFERENCE -->
    <section id="reference" class="bg-porcelain pb-28">
      <div class="flex items-center gap-4 px-8 lg:px-16 pt-20 pb-10">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-700">Reference</span>
      </div>
      <h2 class="split-heading font-display font-semibold px-8 lg:px-16 mb-10" style="font-size:clamp(2rem, 4.2vw, 3.6rem);">Projekti i saradnje</h2>

      <div class="f5-stagger-grid grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink-900/12 border-y border-ink-900/12">
        <div v-for="r in refCards" :key="r.num" class="bg-porcelain pb-10">
          <div class="h-[300px] md:h-[340px] overflow-hidden relative mb-8 clip-reveal" style="clip-path:inset(100% 0 0 0);">
            <NuxtImg :src="r.img" :alt="r.title" class="absolute inset-0 w-full h-full object-cover scale-105 grayscale-[35%] brightness-[0.94] transition-all duration-700 hover:scale-110 hover:grayscale-0 hover:brightness-100" width="500" height="340" loading="lazy" />
          </div>
          <div class="px-8">
            <span class="font-display italic text-sage-600 text-sm block mb-3">{{ r.num }}</span>
            <h3 class="font-display font-semibold text-xl mb-3">{{ r.title }}</h3>
            <p class="text-sm leading-[1.8] font-light opacity-80">{{ r.text }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-20 px-6">
        <p class="fade-up opacity-0 translate-y-6 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-ink-700 mb-10">Sarađujemo sa</p>
        <div class="f5-stagger-grid grid grid-cols-2 lg:grid-cols-3 gap-px bg-ink-900/12 border border-ink-900/12 max-w-4xl mx-auto">
          <a v-for="c in clients" :key="c.name" :href="c.href" target="_blank" rel="noopener" class="bg-white flex items-center justify-center aspect-[3/1.6] lg:aspect-[3/1.4] p-4 lg:p-[1.8rem_1rem] hover:bg-porcelain transition-colors">
            <NuxtImg :src="c.logo" :alt="c.name" fit="contain" class="max-w-[76%] lg:max-w-[74%] max-h-[34px] lg:max-h-11 object-contain grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all" width="140" height="44" loading="lazy" />
          </a>
        </div>
      </div>
    </section>

    <!-- INSTAGRAM -->
    <section class="bg-porcelain pb-28">
      <div class="flex items-center gap-4 px-8 lg:px-16 pt-4 pb-10">
        <span class="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink-700">Instagram</span>
      </div>
      <h2 class="split-heading font-display font-semibold px-8 lg:px-16 mb-6" style="font-size:clamp(2rem, 4.2vw, 3.6rem);">Pratite nas</h2>
      <a href="https://www.instagram.com/keramikafloor5/" target="_blank" rel="noopener" class="fade-up opacity-0 translate-y-6 inline-flex items-center gap-3 mx-8 lg:mx-16 mb-10 font-display italic text-sage-600 relative group" style="font-size:clamp(1.2rem, 2.2vw, 1.8rem);">
        <UIcon name="i-lucide-instagram" class="size-6 transition-transform group-hover:-rotate-[8deg] group-hover:scale-110" />
        <span class="border-b border-transparent group-hover:border-sage-600">@keramikafloor5</span>
      </a>
      <div class="f5-stagger-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ink-900/12 border-y border-ink-900/12">
        <a v-for="(img, i) in instaPhotos" :key="i" href="https://www.instagram.com/keramikafloor5/" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden">
          <NuxtImg :src="img" alt="Floor5 na Instagramu" class="absolute inset-0 w-full h-full object-cover scale-105 grayscale-[25%] transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0" width="400" height="400" loading="lazy" />
          <div class="absolute inset-0 bg-sage-400 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30" />
        </a>
      </div>
    </section>

    <!-- KONTAKT -->
    <section id="kontakt" class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 clip-reveal" style="clip-path:inset(0);">
        <div class="f5-parallax-img absolute -inset-y-[15%] inset-x-0">
          <NuxtImg src="https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2000&auto=format&fit=crop" alt="Enterijer" class="w-full h-full object-cover" width="1600" height="1000" loading="lazy" />
        </div>
      </div>
      <div class="absolute inset-0 bg-ink-900/82" />
      <div class="relative z-[2] text-center text-porcelain px-6 py-28 w-full">
        <p class="fade-up opacity-0 translate-y-6 text-[0.68rem] uppercase tracking-[0.3em] text-sage-400 mb-4">Showroom</p>
        <h2 class="split-heading font-display font-semibold mb-14" style="font-size:clamp(2.4rem, 6vw, 5rem);">Posetite nas</h2>

        <div class="f5-stagger-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/20 max-w-5xl mx-auto mb-16">
          <a href="https://www.google.com/maps/place/Floor+5+opremanje+enterijera+doo/@44.8184552,20.4116632,17z" target="_blank" rel="noopener" class="group relative text-left border-r border-b lg:border-b-0 border-white/20 p-8 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div class="absolute inset-0 bg-sage-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span class="relative z-[2] text-[0.62rem] uppercase tracking-[0.25em] text-sage-400 group-hover:text-ink-900">Adresa</span>
            <p class="relative z-[2] font-display text-lg group-hover:text-ink-900">Bulevar Zorana Đinđića 123g<br>Novi Beograd</p>
          </a>
          <div class="group relative text-left border-r border-b sm:border-b-0 border-white/20 p-8 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div class="absolute inset-0 bg-sage-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span class="relative z-[2] text-[0.62rem] uppercase tracking-[0.25em] text-sage-400 group-hover:text-ink-900">Email</span>
            <p class="relative z-[2] font-display text-lg group-hover:text-ink-900"><a href="mailto:office@floor5.rs">office@floor5.rs</a></p>
          </div>
          <div class="group relative text-left border-r lg:border-r border-white/20 p-8 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div class="absolute inset-0 bg-sage-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span class="relative z-[2] text-[0.62rem] uppercase tracking-[0.25em] text-sage-400 group-hover:text-ink-900">Telefon</span>
            <p class="relative z-[2] font-display text-lg group-hover:text-ink-900"><a href="tel:+381649067173">064 / 9067-173</a></p>
          </div>
          <a href="https://www.instagram.com/keramikafloor5/" target="_blank" rel="noopener" class="group relative text-left p-8 min-h-[190px] flex flex-col justify-between overflow-hidden">
            <div class="absolute inset-0 bg-sage-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span class="relative z-[2] text-[0.62rem] uppercase tracking-[0.25em] text-sage-400 group-hover:text-ink-900">Instagram</span>
            <p class="relative z-[2] font-display text-lg group-hover:text-ink-900">@keramikafloor5</p>
          </a>
        </div>

        <a href="mailto:office@floor5.rs" class="btn magnetic opacity-0 translate-y-4 inline-block px-12 py-5 uppercase tracking-[0.2em] text-[0.72rem] font-medium bg-sage-400 text-ink-900 hover:bg-white transition-colors">
          Zakažite termin
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0%); }
  100% { transform: translateY(100%); }
}
</style>
