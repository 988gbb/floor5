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
      { name: 'Cormorant Garamond', provider: 'google', weights: [500, 600], styles: ['italic'] },
      { name: 'Nunito Sans', provider: 'google', weights: [300, 400, 500, 600, 700], styles: ['normal', 'italic'] }
    ]
  },

  image: {
    quality: 82,
    format: ['avif', 'webp'],
    domains: ['images.unsplash.com']
  },

  routeRules: {
    '/': { isr: 900 },
    '/brendovi': { isr: 900 }
  },

  runtimeConfig: {
    public: {
      siteName: 'Floor5',
      siteUrl: process.env.SITE_URL || 'https://www.floor5.rs'
    }
  }
})
