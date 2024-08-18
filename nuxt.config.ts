// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-07-24',
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        '@nuxtjs/google-fonts',
        '@vee-validate/nuxt',
        '@vueuse/nuxt',
        '@samk-dev/nuxt-vcalendar',
        'nuxt-lodash'
    ],
    ssr: false,
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Quicksand': [400, 500, 600, 700]
        }
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE
        }
    },
    lodash: {
        prefix: '_',
        prefixSkip: ['string'],
        upperAfterPrefix: false
    },
    imports: {
        dirs: ['validations']
    },
    tailwindcss: {
        configPath: 'tailwind.config.ts'
    }
})
