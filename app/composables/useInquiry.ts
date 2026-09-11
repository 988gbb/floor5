import type { InquiryLine } from '#shared/types/catalog'

const STORAGE_KEY = 'floor5-upit'

export function useInquiry() {
  const lines = useState<InquiryLine[]>('inquiry-lines', () => [])
  const isOpen = useState<boolean>('inquiry-open', () => false)
  const hydrated = useState<boolean>('inquiry-hydrated', () => false)

  // Čitanje iz localStorage se namerno dešava tek posle prvog mount-a (ne tokom setup-a),
  // da server i klijent renderuju identičan prvi prikaz — inače dolazi do hydration mismatch-a
  // jer server nema pristup localStorage-u pa uvek "vidi" praznu korpu.
  if (import.meta.client) {
    onMounted(() => {
      if (hydrated.value) return
      hydrated.value = true
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) lines.value = JSON.parse(raw)
      } catch {
        // localStorage nedostupan (privatni mod i sl.) — nastavljamo sa praznom korpom
      }
      watch(lines, (val) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        } catch {
          // ignorišemo — korpa i dalje radi u okviru sesije
        }
      }, { deep: true })
    })
  }

  function add(line: InquiryLine) {
    const existing = lines.value.find(l => l.productSlug === line.productSlug && l.variantSku === line.variantSku)
    if (existing) {
      existing.kolicinaM2 = (existing.kolicinaM2 ?? 0) + (line.kolicinaM2 ?? 1)
    } else {
      lines.value.push(line)
    }
    isOpen.value = true
  }

  function remove(productSlug: string, variantSku: string) {
    lines.value = lines.value.filter(l => !(l.productSlug === productSlug && l.variantSku === variantSku))
  }

  function clear() {
    lines.value = []
  }

  const count = computed(() => lines.value.length)

  return { lines, isOpen, count, add, remove, clear }
}
