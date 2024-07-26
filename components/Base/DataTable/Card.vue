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
            <BaseCardTitle :title="title">
                <slot name="create" />
            </BaseCardTitle>
        </template>

        <slot />
    </UCard>
</template>
