// ** Types Imports
import type { FetchOptions, ResponseType } from 'ofetch'

// ** Interface
type HTTPMethod = 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
export type RouterMethod = Lowercase<HTTPMethod>

interface IFetchOptions extends FetchOptions<ResponseType> {
    method?: Uppercase<RouterMethod> | RouterMethod
}

// ** Data
let refreshTokenPromise: Promise<void> | null = null
const refreshTokenLock = ref<boolean>(false)

export const useFetcher = async <T>(
    path: string,
    opts?: IFetchOptions
) => {
    const config = useRuntimeConfig()

    if (refreshTokenLock.value) {
        await refreshTokenPromise
    }

    try {
        const data = await $fetch<T>(path, {
            baseURL: config.public.apiBase,
            credentials: 'include',
            headers: useRequestHeaders(),
            keepalive: true,
            onRequest({ options }) {
                const access_token = useCookie(AUTH.ACCESS_TOKEN).value

                if (access_token) {
                    options.headers = {
                        ...options.headers,
                        Authorization: `Bearer ${access_token}`
                    }
                }
            },
            async onResponseError({ response }) {
                if (!response.ok) {
                    if (areValuesEqual(response.status, HTTP_CODE.UNAUTHORIZED)) {
                        try {
                            if (!refreshTokenLock.value) {
                                refreshTokenLock.value = true

                                refreshTokenPromise = new Promise<void>(async (resolve, reject) => {
                                    useFetcher('/auth/refresh', {
                                        onResponse() {
                                            resolve()
                                            refreshTokenLock.value = false
                                        },
                                        onResponseError() {
                                            removeCookie()
                                            reject()
                                            refreshTokenLock.value = false
                                        }
                                    })
                                })
                            }

                            await refreshTokenPromise
                        } catch {
                            removeCookie()
                        }
                    }

                    if (areValuesEqual(response.status, HTTP_CODE.CONFLICT)) {
                        useNotificationMessage(response.status)
                    }
                }
            },
            ...opts
        })

        return data as T
    } catch (err: unknown) {
        if (!(err instanceof Error)) throw err

        throw new Error(err instanceof Error ? err.message : 'An error occurred during data fetching.')
    }
}

const removeCookie = () => {
    const refreshTokenAdmin = useCookie('refreshTokenAdmin')

    refreshTokenAdmin.value = null

    navigateTo(ROUTER.LOGIN)
}
