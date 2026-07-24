export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-lazytube/',
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/content', 'nuxt-llms', 'nuxt-lazytube'],

  compatibilityDate: '2024-07-11',

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },

  icon: {
    provider: 'iconify',
  },

  llms: {
    domain: 'https://4sllan.github.io/nuxt-lazytube/',
    title: 'Nuxt Lazytube',
    description:
      'Lazy loading module for YouTube and Vimeo videos in Nuxt 4, improving page performance by loading video players only when needed.',
    full: {
      title: 'Nuxt Lazytube – Lazy Loading for Videos',
      description:
        'Complete documentation for Nuxt Lazytube, a Nuxt 4 module that provides lazy loading components for YouTube and Vimeo videos. Features include automatic iframe loading, customizable placeholders, performance optimization, and seamless integration with Nuxt applications.',
    },

    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/getting-started%' }],
      },
      {
        title: 'Usage',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/usage%' }],
      },
      {
        title: 'API',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/api%' }],
      },
    ],
  },

  content: {
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
  },
});
