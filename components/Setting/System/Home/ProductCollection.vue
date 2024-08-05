<script setup lang="ts">

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

const props = defineProps<Props>()

// ** Computed
const productCollection = computed(() => props.data.find(_p => areValuesEqual(_p.key, HOME_SETTING.PRODUCT_COLLECTION)))
const productCollectionValue = computed(() => typeof productCollection.value?.value === 'string' ? JSON.parse(productCollection.value?.value)?.product_collection : [])

const product_collection = computed(() => {
    const result: ISettingSystemProductCollectionForm  = {
        product_collection_id: productCollectionValue.value.map((_p: { product_collection_id: string }) => _p.product_collection_id),
        selected_product_collection_id: productCollectionValue.value[0]?.product_collection_id,
        product_collection: []
    }

    productCollectionValue.value.forEach((_c: { product_collection_id: string, product_id: string }) => {
        result[`${_c.product_collection_id}-product_id`] = _c.product_id
    })

    return result
})

console.log(product_collection.value)

// ** useHooks
const productCollectionList = useProductCollectionDataList()
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values: collection } = useForm({
    validationSchema: settingSystemProductCollectionFormSchema,
    initialValues: product_collection.value
})

// ** Computed
const productCollectionSelected = computed(() => productCollectionList.value.filter(_p => collection.product_collection_id?.includes(_p.id)))

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.PRODUCT_COLLECTION,
    key: HOME_SETTING.PRODUCT_COLLECTION,
    value: JSON.stringify({
        product_collection: values.product_collection_id.map(_p => ({
            product_collection_id: _p,
            product_id: values[`${_p}-product_id`]
        }))
    }),
    input_type: INPUT_TYPE.TEXT
}))
</script>

<template>
    <UForm
        :state="settingSystemProductCollectionFormSchema"
        @submit="onSubmit"
    >
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <UAlert
                    icon="i-heroicons-information-circle"
                    color="primary"
                    variant="solid"
                    title="Lưu Ý!"
                >
                    <template #description>
                        <div class="flex flex-col gap-1 mt-1">
                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Có thể chọn được nhiều bộ sưu tập (Khuyến khích chọn tối đa 3 bộ).</span>
                            </div>

                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Mỗi bộ sưu tập khuyến khích 10 sản phẩm.</span>
                            </div>

                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Những bộ sưu tập được chọn chỉ hiển thị trong trang chủ.</span>
                            </div>
                        </div>
                    </template>
                </UAlert>
            </div>

            <div class="col-span-12">
                <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                    1. Lựa chọn bộ sưu tập
                </p>
            </div>

            <div class="col-span-12">
                <FormSelect
                    label="Bộ sưu tập"
                    name="product_collection_id"
                    multiple
                    :options="productCollectionList"
                />
            </div>

            <div class="col-span-12">
                <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                    2. Lựa chọn sản phẩm
                </p>
            </div>

            <div class="col-span-12">
                <FormSelect
                    :model-value="productCollectionSelected[0]?.id"
                    :options="productCollectionSelected"
                    label="Chọn bộ sưu tập"
                    name="selected_product_collection_id"
                />
            </div>

            <div
                v-for="(item, index) in collection.product_collection_id"
                :key="index"
                class="col-span-12"
            >
                <FormSelectedProduct
                    v-show="areValuesEqual(item, collection.selected_product_collection_id as string)"
                    :name="`${item}-product_id`"
                />
            </div>

            <div class="col-span-12">
                <UButton
                    type="submit"
                    size="sm"
                    variant="solid"
                    label="Lưu Lại"
                    :loading="Boolean(isPending)"
                    :trailing="false"
                />
            </div>
        </div>
    </UForm>
</template>
