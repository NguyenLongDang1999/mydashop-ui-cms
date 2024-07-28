export default defineNuxtRouteMiddleware(to => {
    const path = ROUTER.LOGIN
    const isLoggedIn = !!(useCookie(AUTH.ACCESS_TOKEN).value || useCookie(AUTH.REFRESH_TOKEN).value)

    if (!isLoggedIn && to.path !== path) {
        return navigateTo({
            path,
            query: { to: to.name !== 'index' ? to.fullPath : undefined }
        })
    }

    if (isLoggedIn && to.path === path) {
        return navigateTo(ROUTER.DASHBOARD)
    }
})
