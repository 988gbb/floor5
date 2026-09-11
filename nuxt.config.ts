// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  components: [{ path: '~/components', pathPrefix: false }],

  // Floor5 v1 je jednoslojna, svetla tema (brend nema definisan dark mode) —
  // gasimo praćenje sistemske teme da UI komponente ne prelaze u tamni izgled.
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'sr-Latn' },
      titleTemplate: '%s · Floor5',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  fonts: {
    families: [
      { name: 'Montserrat', provider: 'google', weights: [500, 600, 700] },
      { name: 'Work Sans', provider: 'google', weights: [400, 500, 600], styles: ['normal', 'italic'] }
    ]
  },

  image: {
    quality: 82,
    format: ['avif', 'webp']
  },

  routeRules: {
    '/': { isr: 900 },
    '/katalog': { isr: 300 },
    '/katalog/**': { isr: 900 },
    '/kolekcije/**': { isr: 900 },
    '/inspiracija/**': { isr: 900 }
  },

  runtimeConfig: {
    rfqToEmail: process.env.RFQ_TO_EMAIL || 'office@floor5.rs',
    sanity: {
      projectId: process.env.SANITY_PROJECT_ID || '',
      dataset: process.env.SANITY_DATASET || 'production'
    },
    public: {
      siteName: 'Floor5',
      siteUrl: process.env.SITE_URL || 'https://www.floor5.rs'
    }
  }
})
