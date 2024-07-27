<script setup lang="ts">

// ** Props & Emits
interface Props {
    remove: () => void
}

defineProps<Props>()

// ** Data
const isOpen = ref<boolean>(false)
</script>

<template>
    <UButton
        icon="i-heroicons-trash"
        size="sm"
        color="red"
        square
        variant="solid"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        :ui="{
            width: 'sm:max-w-sm'
        }"
    >
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="capitalize text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Xác nhận xoá
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

            <p class="text-lg text-center">
                Bạn có chắc chắn muốn xoá dữ liệu này không?
            </p>

            <template #footer>
                <div class="flex justify-center gap-2">
                    <UButton
                        color="primary"
                        variant="solid"
                        label="Đồng Ý"
                        @click="() => {
                            remove()
                            isOpen = false
                        }"
                    />
                    <UButton
                        color="red"
                        variant="solid"
                        label="Huỷ Bỏ"
                        @click="isOpen = false"
                    />
                </div>
            </template>
        </UCard>
    </UModal>
</template>
