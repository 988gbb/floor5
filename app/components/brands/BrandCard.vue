<script setup lang="ts">
defineProps<{ brand: { name: string; country: string; href: string; bg: string; logo: string } }>()
</script>

<template>
  <a
    :href="brand.href" target="_blank" rel="noopener"
    class="group relative overflow-hidden bg-white aspect-[1/0.95] lg:aspect-[3/1.75]"
  >
    <NuxtImg
      :src="brand.bg" alt="" width="500" height="290" loading="lazy"
      class="absolute inset-0 w-full h-full object-cover transition-all duration-700
             opacity-100 scale-[1.06] brightness-[0.96]
             lg:opacity-0 lg:scale-[1.12] lg:grayscale lg:brightness-90
             lg:group-hover:opacity-100 lg:group-hover:scale-105 lg:group-hover:grayscale-0 lg:group-hover:brightness-100"
    />
    <div class="relative z-[2] h-full p-[1.1rem] lg:p-6 flex flex-col items-center justify-center lg:items-stretch lg:justify-between">
      <NuxtImg
        :src="brand.logo" :alt="`${brand.name} logo`" fit="inside" width="160" height="48" loading="lazy"
        class="max-w-[72%] max-h-[42px] self-center bg-white px-[1.2rem] py-[0.7rem] shadow-[0_4px_18px_rgba(53,49,47,0.18)] grayscale contrast-125 transition-all duration-300
               lg:max-w-[70%] lg:max-h-12 lg:self-start lg:px-3 lg:py-2 lg:shadow-none
               group-hover:grayscale-0 group-hover:contrast-100"
      />
      <div class="hidden lg:block transition-colors duration-300">
        <h3 class="font-display font-semibold text-lg text-ink-900 group-hover:text-white transition-colors">{{ brand.name }}</h3>
        <p class="text-[0.64rem] uppercase tracking-[0.12em] text-ink-600/70 group-hover:text-white/85 transition-colors">{{ brand.country }}</p>
      </div>
    </div>
  </a>
</template>
