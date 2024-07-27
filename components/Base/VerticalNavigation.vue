<script setup lang="ts">

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** Props & Emits
interface Props {
    links: VerticalNavigationLink[]
}

defineProps<Props>()
</script>

<template>
    <div class="w-40 mr-7 lg:flex gap-4 flex-col mb-4">
        <div class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-64px)] lg:sticky lg:top-16 lg:px-4 lg:-mx-4">
            <UVerticalNavigation
                :links="links"
                :ui="{
                    wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
                    base: 'group block border-s -ms-px leading-6 before:hidden capitalize',
                    padding: 'p-0 ps-4',
                    rounded: '',
                    font: '',
                    ring: '',
                    active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
                    inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                }"
            />
        </div>
    </div>
</template>
