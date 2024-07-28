<script setup lang="ts">

// ** Props & Emits
interface Props {
    title: string
}

defineProps<Props>()

// ** useHooks
const { links, data, suspense } = useSettingSystemDataList('home_')

await suspense()
</script>

<template>
    <section>
        <BaseTitle
            label="Thiết lập WEBSITE"
            title="Thiết lập trang chủ"
        />

        <div class="mt-8 pb-24 max-w-none flex">
            <div class="w-40 mr-7 lg:flex gap-4 flex-col">
                <BaseVerticalNavigation :links="links" />
            </div>

            <div class="lg:w-[calc(100%-180px)] w-full">
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                                {{ title }}
                            </h2>
                        </div>
                    </template>

                    <slot :data="data" />
                </UCard>
            </div>
        </div>
    </section>
</template>
