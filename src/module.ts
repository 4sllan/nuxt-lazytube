import {
    useLogger,
    createResolver,
    defineNuxtModule,
    addComponent
} from '@nuxt/kit'

interface ModuleOptions {

}


const PACKAGE_NAME: string = 'nuxt-lazytube'
export default defineNuxtModule<ModuleOptions>({

    meta: {
        name: PACKAGE_NAME,
        configKey: 'NuxtLazytube',
        // Compatibility constraints
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '>=3.0.0'
        }
    },

    setup(moduleOptions, nuxt) {
        const logger = useLogger(PACKAGE_NAME)

        const {resolve} = createResolver(import.meta.url)

        addComponent({
            name: "lazy-youtube",
            filePath: resolve(`./runtime/LazyYoutube.vue`),
            pascalName: "LazyYoutube",
            global: true,
            mode: 'client',
        })
        addComponent({
            name: "lazy-vimeo",
            filePath: resolve(`./runtime/LazyVimeo.vue`),
            pascalName: "LazyVimeo",
            global: true,
            mode: 'client',
        })
    }
})