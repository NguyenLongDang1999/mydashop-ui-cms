<script setup lang="ts">

// ** Props & Emits
interface Props {
    title: string
}

defineProps<Props>()
</script>

<template>
    <UCard>
        <template #header>
            <BaseCardTitle :title="title" />
        </template>

        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12">
                <slot />
            </div>
        </div>
    </UCard>
</template>
