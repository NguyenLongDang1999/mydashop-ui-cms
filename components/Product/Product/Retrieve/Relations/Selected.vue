<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: number
    data: IProductVariantForm
    modelValue?: string[] | string
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductRelationsForm()

const { handleSubmit, values } = useForm({
    validationSchema: productRelationsFormSchema,
    initialValues: {
        product_id: props.modelValue as string[]
    }
})

// ** Methods
const onSubmit = handleSubmit(() => mutateAsync({
    id: props.data.id!,
    product_id: values.product_id!,
    product_relation_type: props.name
}))
</script>

<template>
    <UForm
        :state="productRelationsFormSchema"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <BaseCardTitle title="Sản phẩm đính kèm" />
            </template>

            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <FormSelectedProduct name="product_id" />
                </div>
            </div>

            <template #footer>
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
            </template>
        </UCard>
    </UForm>
</template>
