<script setup lang="ts">

// ** useHooks
const { isPending, mutateAsync } = useProductCouponFormInput()

const { handleSubmit } = useForm<IProductCouponForm>({
    validationSchema: productCouponFormSchema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        start_date: values.date_range?.start,
        end_date: values.date_range?.end
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
    >
        <UForm
            :state="productCouponFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Thêm mới coupon">
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
                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="productCouponLabel.code"
                            name="code"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productCategoryLabel.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormDateRange
                            :label="productCouponLabel.date_range"
                            name="date_range"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :label="productCouponLabel.minimum_order_value"
                            name="minimum_order_value"
                            text-trailing="VNĐ"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productCouponLabel.discount_type"
                            :options="optionTypeDiscount"
                            name="discount_type"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :label="productCouponLabel.discount_value"
                            name="discount_value"
                            text-trailing="VNĐ"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormMoney
                            :label="productCouponLabel.max_uses"
                            name="max_uses"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="productCouponLabel.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <div class="flex justify-start gap-4">
                            <UButton
                                type="submit"
                                size="sm"
                                variant="solid"
                                label="Thêm Mới"
                                :loading="isPending"
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
