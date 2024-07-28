export default defineNuxtRouteMiddleware(to => {
    const path = ROUTER.LOGIN
    const isLoggedIn = !!getToken()

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
