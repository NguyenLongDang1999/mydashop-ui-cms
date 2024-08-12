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
                    handleErrorResponse(response)
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

const handleErrorResponse = async (response: Response) => {
    if (areValuesEqual(response.status, HTTP_CODE.UNAUTHORIZED)) {
        await handle401Error()
    } else if (areValuesEqual(response.status, HTTP_CODE.CONFLICT)) {
        useNotificationMessage(response.status)
    }
}

const handle401Error = async () => {
    try {
        if (!refreshTokenLock.value) {
            refreshTokenLock.value = true

            refreshTokenPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    await useFetcher('/auth/refresh')
                    resolve()
                } catch {
                    removeCookie()
                    reject()
                } finally {
                    refreshTokenLock.value = false
                }
            })
        }

        await refreshTokenPromise
    } catch {
        removeCookie()
    }
}

const removeCookie = () => {
    const accessTokenAdmin = useCookie('accessTokenAdmin')
    const refreshTokenAdmin = useCookie('refreshTokenAdmin')

    accessTokenAdmin.value = null
    refreshTokenAdmin.value = null

    navigateTo(ROUTER.LOGIN)
}
