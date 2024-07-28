import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default defineNuxtPlugin(nuxt => {
    nuxt.vueApp.component('QuillEditor', QuillEditor)
})
