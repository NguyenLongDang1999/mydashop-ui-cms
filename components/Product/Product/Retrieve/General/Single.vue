<script setup lang="ts">

// ** Props & Emits
interface Props {
    data: IProductSingleForm
}

const props = defineProps<Props>()

// ** useHooks
const { category_id } = useProductSelectedWithCategory()
const { isPending, mutateAsync } = useProductFormInput<IProductSingleForm>()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductSingleForm>({
    validationSchema: productSingleFormSchema,
    initialValues: _omitBy(props.data, _isNil)
})

provide('product', product)

// ** Watch
watch(() => product.name, () => setFieldValue('slug', slugify(product.name)))

// ** Lifecycle
nextTick(() => category_id.value = props.data.product_category_id)

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    id: values.id,
    sku: values.sku,
    name: values.name,
    slug: values.slug,
    status: values.status,
    short_description: values.short_description,
    description: values.description,
    technical_specifications: values.technical_specifications,
    price: values.price,
    special_price: values.special_price,
    special_price_type: values.special_price_type,
    meta_title: values.meta_title,
    meta_description: values.meta_description,
    product_category_id: values.product_category_id,
    product_brand_id: values.product_brand_id
}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <BaseCardTitle title="Thông tin chi tiết" />
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
</template>
