<script setup lang="ts">
useSeoMeta({
  title: 'O nama',
  description: 'Floor5 — salon premium keramike i pločica u Beogradu, sa asortimanom iz Italije i Španije.'
})

const brandovi = ['Caesar', 'Cercom', 'Serenissima Cir', 'CIR', 'Elios Ceramica']
</script>

<template>
  <div>
    <div class="aspect-[21/9] max-h-[420px] max-w-[1100px] mx-auto relative bg-warm-100 overflow-hidden">
      <NuxtImg
        src="/img/stock/ig-onama-board.jpg"
        alt="Floor5 — uzorci pločica u herringbone rasporedu"
        class="absolute inset-0 w-full h-full object-cover"
        width="1400"
        height="600"
        loading="eager"
      />
    </div>
    <div class="container-f5 py-12 md:py-16">
      <div class="max-w-2xl">
        <span class="label-caps text-clay-600">O nama</span>
        <h1 class="font-display font-semibold text-3xl md:text-4xl mt-2">Premium keramika, opremanje enterijera.</h1>
        <p class="text-warm-600 mt-4 leading-relaxed">
          Floor5 je salon keramike i pločica u Beogradu, sa asortimanom ekskluzivnog kvaliteta i italijanskim
          dizajnom — proizvedene u Italiji i Španiji. U šourumu možete uživo videti teksture, formate i završne
          obrade pre nego što odlučite šta odgovara vašem prostoru.
        </p>
      </div>

      <div class="mt-12">
        <span class="label-caps text-warm-500">Zastupamo</span>
        <div class="flex flex-wrap gap-3 mt-3">
          <span v-for="b in brandovi" :key="b" class="px-4 py-2 rounded-full border border-warm-300 text-sm font-medium text-warm-700">{{ b }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
        <div class="p-6 rounded-2xl bg-white border border-warm-200">
          <UIcon name="i-lucide-map-pin" class="size-5 text-clay-600 mb-3" />
          <div class="font-display font-semibold text-sm mb-1">Adresa</div>
          <div class="text-sm text-warm-600">Bulevar Zorana Đinđića 123g, Beograd</div>
        </div>
        <div class="p-6 rounded-2xl bg-white border border-warm-200">
          <UIcon name="i-lucide-phone" class="size-5 text-clay-600 mb-3" />
          <div class="font-display font-semibold text-sm mb-1">Telefon</div>
          <div class="text-sm text-warm-600">+381 64 9067173</div>
        </div>
        <div class="p-6 rounded-2xl bg-white border border-warm-200">
          <UIcon name="i-lucide-mail" class="size-5 text-clay-600 mb-3" />
          <div class="font-display font-semibold text-sm mb-1">Email</div>
          <div class="text-sm text-warm-600">office@floor5.rs</div>
        </div>
      </div>

      <div class="mt-14 text-center">
        <UButton to="/kontakt" size="xl" color="primary">Zakažite posetu šourumu</UButton>
      </div>
    </div>
  </div>
</template>
