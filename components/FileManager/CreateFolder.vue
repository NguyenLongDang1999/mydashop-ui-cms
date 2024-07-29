<script setup lang="ts">

// ** Data
const isOpen = ref<boolean>(false)

// ** useHooks
const { mutateAsync } = useFileManagerCreateFolder()

const { handleSubmit } = useForm<IFileManagerForm>({
    validationSchema: fileManagerSchema
})

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-folder-plus"
        size="sm"
        square
        label="Tạo Folder"
        color="gray"
        variant="solid"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        :ui="{ width: 'sm:max-w-sm' }"
    >
        <UForm
            :state="fileManagerSchema"
            class="space-y-4 md:space-y-6"
            @submit="onSubmit"
        >
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="capitalize text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Tạo Folder
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

                <FormInput
                    :label="fileManagerLabel.folder_name"
                    name="folder_name"
                />

                <template #footer>
                    <div class="flex justify-center gap-2">
                        <UButton
                            color="primary"
                            variant="solid"
                            label="Xác Nhận"
                            type="submit"
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
        </UForm>
    </UModal>
</template>
