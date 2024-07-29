// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.AUTHENTICATION)

const queryKey = {
    signOut: `${path.value}-sign-out`,
    profile: `${path.value}-profile`
}

const pathKey = {
    signIn: `${path.value}/sign-in`,
    signOut: `${path.value}/sign-out`,
    profile: `${path.value}/profile`
}

export const useAuthLogin = () => useMutation<{ accessToken: string }, Error, IAuthLoginForm>({
    mutationFn: body => useFetcher(pathKey.signIn, {
        method: 'POST',
        body
    }),
    onSuccess: () => {
        const route = useRoute()

        navigateTo(route.query.to ? String(route.query.to) : '/')
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotificationError(MESSAGE.ERROR)
})

export const useAuthLogout = () => useQuery({
    queryKey: [queryKey.signOut],
    queryFn: () => useFetcher(pathKey.signOut),
    enabled: false
})

export const useAuthProfile = async () => {
    const { data, suspense } = useQuery<IAuthProfile>({
        queryKey: [queryKey.profile],
        queryFn: () => useFetcher(pathKey.profile)
    })

    await suspense()

    // ** Computed
    return {
        data: computed(() => data.value as IAuthProfile)
    }
}
