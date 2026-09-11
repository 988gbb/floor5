<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink-900 text-warm-300 mt-24">
    <div class="container-f5 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
      <div>
        <NuxtImg src="/img/logo-floor5.png" alt="Floor5" class="h-11 w-auto mb-4 brightness-0 invert" width="500" height="230" />
        <p class="text-sm text-warm-400 max-w-[26ch]">Premium keramika i pločice, italijanski dizajn. Salon u Beogradu.</p>
      </div>
      <div>
        <div class="label-caps text-warm-500 mb-3">Katalog</div>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/katalog?namena=pod" class="hover:text-white">Podovi</NuxtLink></li>
          <li><NuxtLink to="/katalog?namena=zid" class="hover:text-white">Zidovi</NuxtLink></li>
          <li><NuxtLink to="/katalog?namena=kupatilo" class="hover:text-white">Kupatila</NuxtLink></li>
          <li><NuxtLink to="/katalog?namena=fasada" class="hover:text-white">Fasade</NuxtLink></li>
        </ul>
      </div>
      <div>
        <div class="label-caps text-warm-500 mb-3">Kompanija</div>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/o-nama" class="hover:text-white">O nama</NuxtLink></li>
          <li><NuxtLink to="/inspiracija" class="hover:text-white">Projekti</NuxtLink></li>
          <li><NuxtLink to="/kolekcije" class="hover:text-white">Kolekcije</NuxtLink></li>
        </ul>
      </div>
      <div>
        <div class="label-caps text-warm-500 mb-3">Kontakt</div>
        <ul class="space-y-2 text-sm">
          <li><a href="mailto:office@floor5.rs" class="hover:text-white">office@floor5.rs</a></li>
          <li><a href="tel:+381649067173" class="hover:text-white">+381 64 9067173</a></li>
          <li class="text-warm-400">Bulevar Zorana Đinđića 123g, Beograd</li>
          <li><a href="https://www.instagram.com/keramikafloor5/" target="_blank" rel="noopener" class="hover:text-white">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-warm-800">
      <div class="container-f5 py-4 text-xs text-warm-500 flex justify-between">
        <span>© {{ year }} Floor5</span>
        <span>Sva prava zadržana</span>
      </div>
    </div>
  </footer>
</template>
