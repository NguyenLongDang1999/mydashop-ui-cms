<script setup lang="ts">

// ** useHooks
const { data } = await useProductCouponRetrieve()
const { isPending, mutateAsync } = useProductCouponFormInput()

const { handleSubmit, values: coupon } = useForm<IProductCouponForm>({
    validationSchema: productCouponFormSchema,
    initialValues: {
        ..._omitBy(data.value, _isNil),
        start_date: data.value.start_date ? new Date(data.value.start_date) : new Date(),
        end_date: data.value.end_date ? new Date(data.value.end_date) : new Date()
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    ...values,
    start_date: values.date_range?.start,
    end_date: values.date_range?.end
}))
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật Coupon: ${data.code}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="productCouponFormSchema"
                @submit="onSubmit"
            >
                <UCard>
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
                                :data="{
                                    start_date: coupon.start_date as Date,
                                    end_date: coupon.end_date as Date
                                }"
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
                                    label="Cập Nhật"
                                    :loading="Boolean(isPending)"
                                    :trailing="false"
                                />

                                <UButton
                                    type="reset"
                                    size="sm"
                                    color="gray"
                                    variant="solid"
                                    label="Quay Lại"
                                    :trailing="false"
                                    @click="$router.go(-1)"
                                />
                            </div>
                        </div>
                    </div>
                </UCard>
            </UForm>
        </div>
    </section>
</template>
