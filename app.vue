<script setup lang="ts">

// ** Third Party Imports
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

// ** useHooks
useHead({
    htmlAttrs: {
        lang: 'vi',
        class: 'nuxt-ui-scrollbars'
    },
    bodyAttrs: {
        class: 'font-[Quicksand] font-normal overflow-x-hidden text-sm bg-white text-dark-700'
    },
    title: 'Quản trị viên',
    titleTemplate: titleChunk => {
        return titleChunk ? `${titleChunk} · Mydashop` : 'Mydashop'
    }
})
</script>

<template>
    <NuxtLayout>
        <VueQueryDevtools />
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>

    <UNotifications />
</template>

<style>
.nuxt-ui-scrollbars ::-webkit-scrollbar {
    background-color: transparent;
    height: .6em;
    width: .7em;
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-track {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-100)/1);
    background-color: rgb(var(--color-gray-100)/var(--tw-bg-opacity))
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-thumb {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-300)/1);
    background-color: rgb(var(--color-gray-300)/var(--tw-bg-opacity));
    border-radius: .6em
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-400)/1);
    background-color: rgb(var(--color-gray-400)/var(--tw-bg-opacity))
}

.page-enter-active,
.page-leave-active {
    transition: all .2s
}

.page-leave-to,
.page-enter-from {
    filter: blur(.2rem);
    opacity: 0;
    transform: translateX(1rem);
}
</style>
