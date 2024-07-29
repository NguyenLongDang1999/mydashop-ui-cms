import type { Config } from 'tailwindcss'

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
    content: [
        './composables/**'
    ],
    safelist: [
        ...[100, 120, 160, 200, 180, 250, 350].map(_i => `min-w-[${_i}px]`)
    ]
}
