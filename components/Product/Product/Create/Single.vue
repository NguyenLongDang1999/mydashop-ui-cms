<script setup lang="ts">

// ** useHooks
const { isPending, mutateAsync } = useProductFormInput<IProductSingleForm>()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductSingleForm>({
    validationSchema: productSingleFormSchema,
    initialValues: productSingleFormDefaultValues
})

provide('product', product)

// ** Watch
watch(() => product.name, () => setFieldValue('slug', slugify(product.name)))

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)

    navigateTo(ROUTER.PRODUCT)
})
</script>

<template>
    <UForm
        :state="productSingleFormSchema"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <BaseCardTitle title="Thêm mới sản phẩm (Đơn thể)" />
            </template>

            <div class="grid gap-4 grid-cols-12">
                <ProductProductInitGeneral />
                <ProductProductInitSpecifications />
                <ProductProductInitDescription />
                <ProductProductInitMetaSEO />

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
                            @click="$router.go(-1)"
                        />
                    </div>
                </div>
            </div>
        </UCard>
    </UForm>
</template>
