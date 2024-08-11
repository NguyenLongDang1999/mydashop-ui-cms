<script setup lang="ts">

// ** Props & Emits
interface Props {
    data: IProductVariantForm
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductFormInput<IProductUpdateGeneralVariantForm>()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductUpdateGeneralVariantForm>({
    validationSchema: productUpdateGeneralVariantFormSchema,
    initialValues: _omitBy(props.data, _isNil)
})

provide('product', product)

// ** Watch
watch(() => product.name, () => setFieldValue('slug', slugify(product.name)))

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <UForm
        :state="productUpdateGeneralVariantFormSchema"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <BaseCardTitle title="Thông tin chi tiết" />
            </template>

            <div class="grid gap-4 grid-cols-12">
                <ProductProductInitGeneral :is-single="false" />
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
