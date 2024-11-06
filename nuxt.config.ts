export default defineNuxtConfig({
  ssr: false,

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@/assets/scss/main.scss'
  ],

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    catApiKey: process.env.CAT_API_KEY,
    public: {
      catApiUrl: process.env.CAT_API_URL
    }
  },
  nitro: {
    routeRules: {
      '/api/cats/**': {
        proxy: `${process.env.CAT_API_URL}/**`,
        headers: {
          'x-api-key': process.env.CAT_API_KEY
        }
      }
    }
  }
})