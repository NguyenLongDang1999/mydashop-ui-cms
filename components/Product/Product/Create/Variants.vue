<script setup lang="ts">

// ** useHooks
const { isPending, mutateAsync } = useProductFormInput()
const { attribute_id } = useProductAttributeValueList()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductVariantForm>({
    validationSchema: productVariantFormSchema
})

// ** Data
provide('product', product)
provide('setFieldValue', setFieldValue)

// ** Watch
watch(() => product.name, () => setFieldValue('slug', slugify(product.name)))

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        product_variants: values.product_variants,
        technical_specifications: product.technical_specifications ? JSON.stringify(product.technical_specifications) : undefined
    })

    attribute_id.value = []

    navigateTo(ROUTER.PRODUCT)
})
</script>

<template>
    <UForm
        :state="productVariantFormSchema"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <BaseCardTitle title="Thêm mới sản phẩm (Biến thể)" />
            </template>

            <div class="grid gap-4 grid-cols-12">
                <ProductProductInitGeneral :is-single="false" />
                <ProductProductInitSpecifications />
                <ProductProductInitDescription />
                <ProductProductInitVariants />
                <ProductProductInitMetaSEO :number="5" />

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
