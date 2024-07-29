<script setup lang="ts">

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** Props & Emits
interface Props {
    title: string
    links: VerticalNavigationLink[]
}

defineProps<Props>()
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="title"
        />

        <div class="mt-8 pb-24 max-w-none lg:flex">
            <BaseVerticalNavigation :links="links" />

            <div class="lg:w-[calc(100%-180px)] w-full">
                <slot />
            </div>
        </div>
    </section>
</template>
