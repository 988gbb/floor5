<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-porcelain">
    <AppHeader />
    <main class="flex-1 flex items-center justify-center">
      <div class="text-center px-6">
        <div class="font-display font-bold text-6xl text-warm-300">{{ error.statusCode }}</div>
        <h1 class="font-display font-semibold text-2xl mt-4">
          {{ error.statusCode === 404 ? 'Stranica nije pronađena' : 'Nešto je pošlo po zlu' }}
        </h1>
        <p class="text-warm-600 mt-2">{{ error.statusMessage ?? 'Pokušajte ponovo ili se vratite na početnu.' }}</p>
        <UButton to="/" color="primary" size="lg" class="mt-6" @click="clearError({ redirect: '/' })">
          Nazad na početnu
        </UButton>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
