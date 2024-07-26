<script setup lang="ts">

// ** Data
const isOpen = ref<boolean>(false)
</script>

<template>
    <UButton
        icon="i-heroicons-bars-3-center-left"
        size="sm"
        color="primary"
        square
        variant="soft"
        @click="isOpen = true"
    />

    <USlideover
        v-model="isOpen"
        side="left"
    >
        <UCard
            class="flex flex-col flex-1 overflow-auto"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        MENU
                    </h3>

                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-heroicons-x-mark-20-solid"
                        class="-my-1"
                        @click="isOpen = false"
                    />
                </div>
            </template>

            <nav class="space-y-3">
                <UAccordion
                    multiple
                    default-open
                    :items="navigation"
                    :ui="{ wrapper: 'flex flex-col w-full' }"
                >
                    <template #default="{ item, open }">
                        <UButton
                            color="gray"
                            variant="link"
                            class="text-dark-700 dark:text-dark-200 hover:no-underline"
                            :padded="false"
                            :ui="{
                                base: 'flex items-center gap-1.5 group mb-3 w-full focus-visible:outline-primary border-transparent',
                            }"
                        >
                            <span class="text-sm/6 font-semibold truncate capitalize">
                                {{ item.label }}
                            </span>

                            <template #trailing>
                                <UIcon
                                    name="i-heroicons-chevron-right-20-solid"
                                    class="w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 text-gray-700 dark:text-gray-200"
                                    :class="[open && 'rotate-90']"
                                />
                            </template>
                        </UButton>
                    </template>

                    <template #item="{ item }">
                        <nav
                            class="space-y-3 border-l border-gray-200 dark:border-gray-800"
                            style="margin-left: 0.5rem"
                        >
                            <div class="space-y-1.5">
                                <ULink
                                    v-for="nav in item.children"
                                    :key="nav.to"
                                    :to="nav.to"
                                    class="flex items-center capitalize gap-1.5 group border-l -ml-px pl-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-transparent hover:border-gray-500 dark:hover:border-gray-400"
                                    active-class="!text-primary !font-medium !border-current"
                                    @click="isOpen = false"
                                >
                                    <span class="text-sm/6">{{ nav.title }}</span>
                                </ULink>
                            </div>
                        </nav>
                    </template>
                </UAccordion>
            </nav>
        </UCard>
    </USlideover>
</template>
