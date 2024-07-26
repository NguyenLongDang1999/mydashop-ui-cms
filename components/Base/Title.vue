<script setup lang="ts">

// ** Props & Emits
interface Props {
    label?: string;
    title?: string;
}

defineProps<Props>()
</script>

<template>
    <div class="pt-8">
        <p class="mb-4 text-sm/6 font-semibold text-primary capitalize flex items-center gap-1.5">
            {{ label }}
        </p>

        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight capitalize">
            {{ title }}
        </h1>
    </div>
</template>
