# Floor5 — sajt (v1, razvojna verzija)

Nuxt 4 implementacija sajta za Floor5 (salon keramike i pločica), zasnovana na dogovorenom
dizajn sistemu ("Floor5 Dizajn Sistem" artifact). Trenutno radi sa **mock/placeholder podacima**
(vidi `shared/data/`) — CMS (Sanity) povezivanje je sledeći korak.

## Pokretanje

```bash
npm install
npm run dev
```

Otvara se na `http://localhost:3000` (ili prvom slobodnom portu).

## Šta je gotovo

- **Dizajn tokeni** — `app/assets/css/main.css` (Tailwind v4 `@theme`), `app/app.config.ts` (Nuxt UI boje).
  Potvrđene brend boje (`ink`/charcoal, `sage`, `stone`) su odvojene komentarom od predloženih (`clay`, `warm`, `porcelain`).
- **Stranice**: početna, katalog sa filterima (sinhronizovani u URL-u), detalj proizvoda sa
  variantama, kolekcije, proizvođači, inspiracija/projekti, o nama, kontakt, korpa upita (`/upit`).
- **Korpa upita** — `app/composables/useInquiry.ts`, čuva se u `localStorage`, šalje se na
  `POST /api/rfq` (trenutno samo loguje na serveru — vidi TODO u `server/api/rfq.post.ts`).
- **API (mock)** — `server/api/*` čita iz `shared/data/catalog.mock.ts` i `projects.mock.ts`.
  Proizvođači (Caesar, Cercom, Serenissima Cir, CIR, Elios) su stvarni brendovi iz Floor5
  asortimana; proizvodi/kolekcije/cene su ilustrativni placeholder.
- **CMS model** — `cms/schemas/` (Sanity schema nacrt za Manufacturer/Collection/Product/Variant).
- Logo (`public/img/logo-floor5.png`) je pravi Floor5 logo.
- **Slike** (`public/img/stock/`, mapirane u `app/utils/catalogImages.ts`) — mešavina:
  - stvarne Floor5 fotografije sa Instagrama (@keramikafloor5, fajlovi `ig-*.jpg`) za hero,
    "O nama" i kolekciju Marmo Statuario — Floor5 je vlasnik ovog sadržaja, pa je bezbedno
    koristiti ga na sopstvenom sajtu;
  - besplatne Unsplash teksture (dozvoljena komercijalna upotreba) za proizvode gde tačna
    fotografija još ne postoji.
  Sve su privremene — čim Floor5 dostavi fotografa, menjaju se 1:1 kroz `catalogImages.ts`.

## Sledeći koraci (nisu deo ovog koraka)

1. **Sanity CMS** — kreirati projekat, povezati `SANITY_PROJECT_ID`/`SANITY_DATASET` (već postoje
   u `nuxt.config.ts` → `runtimeConfig.sanity`), zameniti `server/api/*` GROQ upitima umesto mock podataka.
2. **Prava fotografija proizvoda** — trenutne slike su privremene (vidi gore); svaka varijanta u
   Sanity-ju dobija sopstvenu fotografiju umesto deljene teksture po "izgledu" materijala.
3. **Slanje email-a** — `server/api/rfq.post.ts` ima TODO za pravog email provajdera (npr. Resend).
4. **Pravi sadržaj** — tekstovi na `/o-nama`, projekti na `/inspiracija` su ili potvrđeni (adresa,
   telefon, brendovi) ili jasno označeni kao placeholder u kodu — treba ih zameniti pravim materijalima.

## Struktura

```
app/            Nuxt 4 srcDir — stranice, komponente, composables, stilovi
shared/         Tipovi i mock podaci (dostupni i klijentu i serveru)
server/api/     Nitro API rute (trenutno servira mock podatke)
cms/schemas/    Nacrt Sanity šeme za CMS model
```
