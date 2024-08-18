<script setup lang="ts">

// ** useHooks
const { data } = await useProductFlashDealsRetrieve()
const { isPending, mutateAsync } = useProductFlashDealsFormInput()

const { handleSubmit, values: flashDeals, setFieldValue } = useForm<IProductFlashDealsForm>({
    validationSchema: productFlashDealsFormSchema,
    initialValues: {
        ..._omitBy(data.value, _isNil),
        start_time: data.value.start_time ? new Date(data.value.start_time) : new Date(),
        end_time: data.value.end_time ? new Date(data.value.end_time) : new Date()
    }
})

// ** Computed
const product_id_flash_deals = computed(() => flashDeals.product_id.map(_p => _p).join(','))

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    ...values,
    start_time: values.date_range?.start,
    end_time: values.date_range?.end
}))
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật Flash Deals: ${data.title}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="productFlashDealsFormSchema"
                @submit="onSubmit"
            >
                <UCard>
                    <div class="grid gap-4 grid-cols-12">
                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                1. Thông tin chung
                            </p>
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormInput
                                :label="productFlashDealsLabel.title"
                                name="title"
                                @update:model-value="val => setFieldValue('slug', slugify(val))"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormInput
                                :label="productFlashDealsLabel.slug"
                                name="slug"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormSelect
                                :label="productFlashDealsLabel.status"
                                :options="optionStatus"
                                name="status"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormDateRange
                                :label="productFlashDealsLabel.date_range"
                                :data="{
                                    start_date: flashDeals.start_time as Date,
                                    end_date: flashDeals.end_time as Date
                                }"
                                name="date_range"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormSelect
                                :label="productFlashDealsLabel.discounted_price_type"
                                :options="optionTypeDiscount"
                                name="discounted_price_type"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
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
                                :product-id-flash-deals="product_id_flash_deals"
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
