// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  // CSS
  css: ['~/assets/css/main.css'],
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  
  // Auto-imports
  imports: {
    dirs: ['stores']
  },
  
  // SSR settings
  ssr: true,
  
  // Nitro configuration for production
  nitro: {
    preset: 'node-server',
    minify: true,
    experimental: {
      wasm: false
    }
  },
  
  // Build configuration
  build: {
    transpile: ['ethers']
  },
  
  // Runtime config
  runtimeConfig: {
    // Private keys (only available on the server-side)
    // Public keys (also exposed to the client-side)
    public: {
      appName: 'DID-Fi DApp',
      appDescription: 'Decentralized Identity Finance Application',
      defaultNetwork: process.env.NODE_ENV === 'production' ? 'mainnet' : 'localhost'
    }
  },
  
  // App config
  app: {
    head: {
      title: 'DID-Fi DApp',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Decentralized Identity Finance Application' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // TypeScript configuration
  typescript: {
    strict: true
  },
  
  // Development server
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  }
})
