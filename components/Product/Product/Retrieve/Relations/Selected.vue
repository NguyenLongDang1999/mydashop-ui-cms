<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: number
    data: IProductVariantForm
    modelValue?: string[] | string
}

const props = defineProps<Props>()

// ** Data
const selected = ref<IProduct[]>([])
const dataTable = ref<IProduct[]>([])

const relationTypeName = {
    [RELATIONS_TYPE.UPSELL]: 'product_upsell',
    [RELATIONS_TYPE.RELATED]: 'product_related',
    [RELATIONS_TYPE.CROSS_SELL]: 'product_cross_sell'
}

// ** useHooks
const { isPending, mutateAsync } = useProductRelationsForm()

const { handleSubmit } = useForm({
    validationSchema: productRelationsFormSchema
})

// ** Watch
watch(dataTable, () => selected.value = dataTable.value.filter(_d => props.data[relationTypeName[props.name]].includes(_d.id)))

// ** Methods
const onSubmit = handleSubmit(() => mutateAsync({
    id: props.data.id!,
    product_relations: selected.value.length ? selected.value.map(_s => ({
        related_product_id: _s.id,
        relation_type: props.name
    })) : []
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
                    <ProductProductDataTable
                        v-model="selected"
                        @data-table="val => dataTable = val"
                    />
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
