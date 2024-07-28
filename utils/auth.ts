export const setToken = (value: string) => localStorage.setItem(AUTH.ACCESS_TOKEN, value)

export const getToken = () => localStorage.getItem(AUTH.ACCESS_TOKEN)

export const removeToken = () => localStorage.removeItem(AUTH.ACCESS_TOKEN)
