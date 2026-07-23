import { createResolver, defineNuxtModule, addComponent } from '@nuxt/kit';

type ModuleOptions = Record<string, never>;

const PACKAGE_NAME: string = 'nuxt-lazytube';
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    configKey: 'NuxtLazytube',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '>=3.0.0',
    },
  },

  setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: 'LazyYoutube',
      filePath: resolve(`./runtime/LazyYoutube.vue`),
      global: true,
    });
    addComponent({
      name: 'LazyVimeo',
      filePath: resolve(`./runtime/LazyVimeo.vue`),
      global: true,
    });
  },
});
