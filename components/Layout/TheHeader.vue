<script setup lang="ts">

// ** Types Imports
import type { DropdownItem } from '#ui/types';

// ** useHooks
const { data } = await useAuthProfile()
const { refetch } = useAuthLogout()

// ** Data
const items: DropdownItem[][] = [
    [
        {
            label: data.value?.email,
            slot: 'account',
            disabled: true
        }
    ],
    [
        {
            label: 'Chỉnh sửa thông tin',
            icon: 'i-heroicons-cog-8-tooth',
            href: '/profile'
        }
    ],
    [
        {
            label: 'Documentation',
            icon: 'i-heroicons-book-open'
        },
        {
            label: 'Changelog',
            icon: 'i-heroicons-megaphone'
        },
        {
            label: 'Status',
            icon: 'i-heroicons-signal'
        }
    ],
    [
        {
            label: 'Đăng xuất',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: async () => {
                await refetch()

                navigateTo(ROUTER.LOGIN)
                useNotification('Đăng xuất thành công!')
            }
        }
    ]
]
</script>

<template>
    <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
            <div class="flex items-center justify-between gap-3 h-16">
                <div class="lg:flex-1 flex items-center gap-1.5">
                    <BaseLogo />
                </div>

                <div class="flex items-center justify-end lg:flex-1 gap-3">
                    <div class="lg:hidden block">
                        <LayoutTheMobileNav />
                    </div>

                    <UDropdown
                        :items="items"
                        :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }"
                    >
                        <div class="flex items-center gap-2">
                            <span>{{ data.name }}</span>
                            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
                        </div>

                        <template #account="{ item }">
                            <div class="text-left">
                                <p>Signed in as</p>
                                <p class="truncate font-medium text-gray-900 dark:text-white">
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>

                        <template #item="{ item }">
                            <span class="truncate capitalize">{{ item.label }}</span>
                            <UIcon
                                :name="item.icon"
                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                            />
                        </template>
                    </UDropdown>
                </div>
            </div>
        </div>
    </header>
</template>
