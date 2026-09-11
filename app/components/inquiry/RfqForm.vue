<script setup lang="ts">
import type { InquiryLine } from '#shared/types/catalog'

const props = defineProps<{ stavke?: InquiryLine[] }>()
const emit = defineEmits<{ submitted: [referenca: string] }>()

const ime = ref('')
const email = ref('')
const telefon = ref('')
const poruka = ref('')

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const referenca = ref('')

const errors = computed(() => ({
  ime: submitted.value && !ime.value.trim() ? 'Unesite ime i prezime.' : '',
  email: submitted.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? 'Unesite ispravnu email adresu.' : ''
}))
const submitted = ref(false)

async function submit() {
  submitted.value = true
  if (errors.value.ime || errors.value.email) return

  status.value = 'loading'
  errorMsg.value = ''
  try {
    const res = await $fetch('/api/rfq', {
      method: 'POST',
      body: { ime: ime.value, email: email.value, telefon: telefon.value, poruka: poruka.value, stavke: props.stavke ?? [] }
    })
    referenca.value = res.referenca
    status.value = 'success'
    emit('submitted', res.referenca)
  } catch (e: any) {
    status.value = 'error'
    errorMsg.value = e?.data?.statusMessage ?? 'Došlo je do greške. Pokušajte ponovo.'
  }
}
</script>

<template>
  <div v-if="status === 'success'" class="text-center py-10 flex flex-col items-center gap-3">
    <div class="w-12 h-12 rounded-full bg-success-100 text-success-600 flex items-center justify-center">
      <UIcon name="i-lucide-check" class="size-6" />
    </div>
    <h3 class="font-display font-semibold text-xl">Upit je poslat.</h3>
    <p class="text-warm-600 max-w-sm">Javićemo vam se na {{ email }} u najkraćem roku. Referenca: <strong>{{ referenca }}</strong></p>
  </div>

  <form v-else class="flex flex-col gap-5" novalidate @submit.prevent="submit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="flex flex-col gap-1.5">
        <label class="label-caps text-warm-600" for="ime">Ime i prezime</label>
        <UInput id="ime" v-model="ime" size="lg" placeholder="Npr. Jovana Petrović" :color="errors.ime ? 'error' : 'neutral'" />
        <span v-if="errors.ime" class="text-xs text-error-600">{{ errors.ime }}</span>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="label-caps text-warm-600" for="email">Email</label>
        <UInput id="email" v-model="email" type="email" size="lg" placeholder="ime@primer.rs" :color="errors.email ? 'error' : 'neutral'" />
        <span v-if="errors.email" class="text-xs text-error-600">{{ errors.email }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="label-caps text-warm-600" for="telefon">Telefon <span class="text-warm-400 normal-case font-normal">(opciono)</span></label>
      <UInput id="telefon" v-model="telefon" size="lg" placeholder="06x xxx xxxx" />
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="label-caps text-warm-600" for="poruka">Poruka</label>
      <UTextarea id="poruka" v-model="poruka" :rows="4" placeholder="Recite nam nešto više o vašem prostoru i planovima…" />
    </div>

    <p v-if="status === 'error'" class="text-sm text-error-600">{{ errorMsg }}</p>

    <UButton type="submit" size="xl" color="primary" :loading="status === 'loading'" class="self-start">
      Pošalji upit
    </UButton>
  </form>
</template>
