<script setup lang="ts">
useSeoMeta({
  title: 'Kontakt',
  description: 'Kontaktirajte Floor5 salon keramike i pločica u Beogradu.'
})
</script>

<template>
  <div class="container-f5 py-12 md:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <span class="label-caps text-clay-600">Kontakt</span>
        <h1 class="font-display font-semibold text-3xl md:text-4xl mt-2">Pišite nam ili posetite šourum.</h1>
        <p class="text-warm-600 mt-4 max-w-md">
          Za konkretan upit o pločicama, lakše je da krenete iz kataloga i dodate proizvode u upit — ali ako imate
          opšte pitanje, slobodno nam pišite ovde.
        </p>

        <div class="mt-10 space-y-5">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-map-pin" class="size-5 text-clay-600 mt-0.5" />
            <div>
              <div class="font-medium text-sm">Šourum</div>
              <div class="text-sm text-warm-600">Bulevar Zorana Đinđića 123g, Beograd</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-phone" class="size-5 text-clay-600 mt-0.5" />
            <div>
              <div class="font-medium text-sm">Telefon</div>
              <a href="tel:+381649067173" class="text-sm text-warm-600 hover:text-ink-900">+381 64 9067173</a>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-mail" class="size-5 text-clay-600 mt-0.5" />
            <div>
              <div class="font-medium text-sm">Email</div>
              <a href="mailto:office@floor5.rs" class="text-sm text-warm-600 hover:text-ink-900">office@floor5.rs</a>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 md:p-8 rounded-2xl bg-white border border-warm-200">
        <RfqForm />
      </div>
    </div>
  </div>
</template>
