<script setup lang="ts">

// ** useHooks
const categoryList = useProductCategoryDataList()
const { category_id, brandList, attributeList, isFetchingBrand, isFetchingAttribute } = useProductSelectedWithCategory()
const { attribute_id, attributeValueList } = useProductAttributeValueList()

// ** Data
const product = inject('product') as IProductVariantForm
const setFieldValue = inject('setFieldValue') as (field: string, value: unknown) => void

// ** Watch
watch(attribute_id, () => {
    if (!product.product_attribute_id) return

    const attributeData: IProductAttributeList[] = attributeList.value.filter(attributeItem =>
        product.product_attribute_id!.includes(attributeItem.id)
    ).sort((a, b) => {
        const indexA = product.product_attribute_id!.indexOf(a.id)
        const indexB = product.product_attribute_id!.indexOf(b.id)

        return indexA - indexB
    })

    setFieldValue('product_attributes', attributeData.map(_v => ({
        id: _v.id,
        name: _v.name,
        values: []
    })))

    setFieldValue('product_variants', [])
})

watch(() => product.product_category_id, () => {
    category_id.value = product.product_category_id
    attribute_id.value = []
})

// ** Computed
const isPercent = computed(() => areValuesEqual(product.special_price_type as number, SPECIAL_PRICE.PERCENT))
</script>

<template>
    <div class="col-span-12">
        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
            4. Thông tin danh mục và thuộc tính
        </p>
    </div>

    <div class="sm:col-span-4 col-span-12">
        <FormSelect
            :label="productLabel.product_category_id"
            :options="categoryList"
            name="product_category_id"
        />
    </div>

    <div class="sm:col-span-4 col-span-12">
        <FormSelect
            :label="productLabel.product_brand_id"
            :options="brandList"
            :loading="isFetchingBrand"
            name="product_brand_id"
        />
    </div>

    <div class="sm:col-span-4 col-span-12">
        <FormSelect
            v-model="attribute_id"
            :label="productLabel.attribute.name"
            :options="attributeList"
            :loading="isFetchingAttribute"
            name="product_attribute_id"
            multiple
        />
    </div>
</template>
