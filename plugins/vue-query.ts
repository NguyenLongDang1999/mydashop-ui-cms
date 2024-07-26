// ** Types Imports
import type {
    DehydratedState,
    VueQueryPluginOptions
} from '@tanstack/vue-query'

// ** Plugins Imports
import {
    QueryClient,
    VueQueryPlugin,
    dehydrate,
    hydrate
} from '@tanstack/vue-query'

export default defineNuxtPlugin(nuxt => {
    const vueQueryState = useState<DehydratedState | null>('vue-query')

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                retry: 1,
                staleTime: 5 * (60 * 1000),
                gcTime: 10 * (60 * 1000)
            },
            mutations: {
                retry: (failureCount, error) => failureCount < 1 && error.message.includes(`${HTTP_CODE.UNAUTHORIZED}`)
            }
        }
    })

    const options: VueQueryPluginOptions = { queryClient }

    nuxt.vueApp.use(VueQueryPlugin, options)

    if (import.meta.server) {
        nuxt.hooks.hook('app:rendered', () => {
            vueQueryState.value = dehydrate(queryClient)
        })
    }

    if (import.meta.client) {
        hydrate(queryClient, vueQueryState.value)
    }
})
