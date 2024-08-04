<script setup lang="ts">

// ** Props & Emits
interface Props {
    to?: string
    name?: string
    hasImage?: boolean
    hasFlashDeals?: boolean
    image?: string
    count?: string
}

defineProps<Props>()
</script>

<template>
    <ULink :to="to">
        <UBadge
            v-if="hasFlashDeals"
            color="red"
        >
            Flash Deals
        </UBadge>

        <div class="flex items-center gap-1">
            <UAvatar
                v-if="hasImage"
                :src="getPathImageFile(image)"
                :alt="name"
            />

            <div class="flex flex-col flex-1 truncate">
                <span class="capitalize text-primary truncate">{{ name }}</span>
                <span v-if="count">{{ count }}</span>
            </div>
        </div>
    </ULink>
</template>
