<script setup lang="ts">

// ** useHooks
const { isPending, mutateAsync } = useProductFlashDealsFormInput()

const { handleSubmit, setFieldValue } = useForm<IProductFlashDealsForm>({
    validationSchema: productFlashDealsFormSchema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        start_time: values.date_range?.start,
        end_time: values.date_range?.end
    })

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
        :ui="{ width: 'sm:max-w-6xl' }"
    >
        <UForm
            :state="productFlashDealsFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Thêm mới Flash Deals">
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

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="productFlashDealsLabel.title"
                            name="title"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="productFlashDealsLabel.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productFlashDealsLabel.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormDateRange
                            :label="productFlashDealsLabel.date_range"
                            name="date_range"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productFlashDealsLabel.discounted_price_type"
                            :options="optionTypeDiscount"
                            name="discounted_price_type"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :label="productFlashDealsLabel.discounted_price"
                            name="discounted_price"
                            text-trailing="VNĐ"
                            help="Giá Gốc"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="productFlashDealsLabel.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            2. Lựa chọn sản phẩm
                        </p>
                    </div>

                    <div class="col-span-12">
                        <FormSelectedProduct
                            name="product_id"
                            not-flash-deals
                        />
                    </div>

                    <div class="col-span-12">
                        <div class="flex justify-start gap-4">
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
