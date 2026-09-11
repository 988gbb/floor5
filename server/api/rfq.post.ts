interface RfqBody {
  ime: string
  email: string
  telefon?: string
  poruka?: string
  stavke?: { productSlug: string; variantSku: string; kolicinaM2?: number }[]
}

/**
 * Prima "Zahtev za ponudu". Trenutno validira i loguje na serveru — slanje email
 * obaveštenja zaposlenima (npr. preko Resend/Postmark/SMTP) je sledeći korak kada
 * se izabere provajder; runtimeConfig.rfqToEmail već postoji za tu konfiguraciju.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<RfqBody>(event)

  if (!body?.ime?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Ime i prezime su obavezni.' })
  }
  if (!body?.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Unesite ispravnu email adresu.' })
  }

  const config = useRuntimeConfig()
  const referenca = `F5-${Date.now().toString(36).toUpperCase()}`

  // TODO: poslati email na config.rfqToEmail preko izabranog provajdera
  console.log(`[RFQ ${referenca}] za ${config.rfqToEmail}:`, {
    ime: body.ime,
    email: body.email,
    telefon: body.telefon,
    poruka: body.poruka,
    stavke: body.stavke
  })

  return { ok: true, referenca }
})
