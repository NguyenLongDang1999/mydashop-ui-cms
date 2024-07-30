<script setup lang="ts">

// ** useHooks
const { isPending, mutateAsync } = useProductCollectionFormInput()

const { handleSubmit, setFieldValue } = useForm<IProductCollectionForm>({
    validationSchema: productCollectionFormSchema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Thêm Mới"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
        :ui="{
            width: 'sm:max-w-6xl'
        }"
    >
        <UForm
            :state="productCollectionForm"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Thêm mới bộ sưu tập">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </BaseCardTitle>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            1. Thông tin chung
                        </p>
                    </div>

                    <div class="sm:col-span-4 col-span-12">
                        <FormInput
                            :label="productCollectionLabel.title"
                            name="title"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-4 col-span-12">
                        <FormInput
                            :label="productCollectionLabel.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-4 col-span-12">
                        <FormSelect
                            :label="productCollectionLabel.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            2. Lựa chọn sản phẩm
                        </p>
                    </div>

                    <div class="col-span-12">
                        <FormSelectedProduct name="product_id" />
                    </div>

                    <div class="col-span-12">
                        <div class="flex justify-center gap-4">
                            <UButton
                                type="submit"
                                size="sm"
                                variant="solid"
                                label="Thêm Mới"
                                :loading="Boolean(isPending)"
                                :trailing="false"
                            />

                            <UButton
                                type="reset"
                                size="sm"
                                color="gray"
                                variant="solid"
                                label="Huỷ Bỏ"
                                :trailing="false"
                                @click="isOpen = false"
                            />
                        </div>
                    </div>
                </div>
            </UCard>
        </UForm>
    </UModal>
</template>
