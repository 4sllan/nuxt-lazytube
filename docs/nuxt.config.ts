export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-lazytube/',
    head: {
      meta: [
        { name: 'theme-color', content: '#00dc82' },
        { name: 'theme-color', content: '#18181b', media: '(prefers-color-scheme: dark)' },
      ],
    },
  },

  site: {
    url: 'https://4sllan.github.io',
    name: 'Nuxt Lazytube',
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    'nuxt-lazytube',
    'nuxt-seo-utils',
    'nuxt-qrcode',
  ],

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
        title: 'Demo',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/demo%' }],
      },
      {
        title: 'API',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/api%' }],
      },
      {
        title: 'Features',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/features%' }],
      },
      {
        title: 'Comparison',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/comparison%' }],
      },
      {
        title: 'Performance',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/performance%' }],
      },
      {
        title: 'Supported URLs',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/supported-urls%' }],
      },
      {
        title: 'FAQ',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/faq%' }],
      },
      {
        title: 'Roadmap',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/roadmap%' }],
      },
      {
        title: 'Best Practices',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/best-practices%' }],
      },
      {
        title: 'Migration',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/migration%' }],
      },
      {
        title: 'Contributing',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/contributing%' }],
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

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'pix-payload', // CJS
        'vue-qrcode-reader',
      ],
    },
  },

  ogImage: {
    zeroRuntime: true,
  },
});
