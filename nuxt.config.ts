// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  /** Prefer 3000 so the browser URL matches `npm run dev` output; free the port if something else is bound. */
  devServer: {
    port: 3000,
    host: 'localhost',
  },
  /** Off by default for faster, more reliable startup. Set NUXT_DEVTOOLS=true to enable. */
  devtools: {
    enabled: process.env.NUXT_DEVTOOLS === 'true',
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/.nuxt/tsconfig.json'],
      },
    },
  },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s',
      defaultTitle: 'Silent Runners Club',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Silent Runners Club' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo-illuminati.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Instrument+Sans:wght@600;700&display=swap',
        },
      ],
    },
  },
  content: {
    highlight: false,
  },
  runtimeConfig: {
    public: {
      /** Set in production for absolute OG URLs, e.g. https://yoursite.com */
      siteUrl: '',
      /**
       * Club QR when a run has no `jamUrl` in frontmatter (e.g. default listen link or landing URL).
       * Env: NUXT_PUBLIC_DEFAULT_JAM_QR_URL. If empty, QR falls back to `siteUrl` (homepage).
       */
      defaultJamQrUrl: '',
    },
  },
})
