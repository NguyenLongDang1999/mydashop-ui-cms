<script setup lang="ts">

// ** Props & Emits
interface Props {
    title: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
            {{ title }}
        </h2>

        <slot />
    </div>
</template>
