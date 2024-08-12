<script setup lang="ts">

// ** Data
const product = inject('product') as IProductVariantForm
const setFieldValue = inject('setFieldValue') as (field: keyof IProductVariantForm, value: unknown) => void

const attributeValueName = ref<Omit<IProductAttributeValuesList[], 'values'>[]>([])

// ** Computed
const attributeIdList = computed(() => product.product_attribute_id || [])
const productCategoryId = computed(() => product.product_category_id || '')
const productAttributes = computed(() => product.product_attributes || [])

// ** useHooks
const categoryList = useProductCategoryDataList()
const { attributeValueList } = useProductAttributeValueList(attributeIdList)
const { brandList, attributeList, isFetchingBrand, isFetchingAttribute } = useProductSelectedWithCategory(productCategoryId)

// ** Watch
watch(() => product.product_attribute_id, () => {
    if (!product.product_attribute_id) return

    const attributeData = attributeList.value
        .filter(({ id }) => product.product_attribute_id.includes(id))
        .sort((a, b) => product.product_attribute_id.indexOf(a.id) - product.product_attribute_id.indexOf(b.id))
        .map(({ id, name }) => ({
            id,
            name,
            values: []
        }))

    setFieldValue('product_attributes', attributeData)
    setFieldValue('product_variants', [])
})

// ** Methods
const handleIsDefault = (index: number) => {
    if (product.product_variants && product.product_variants.length) {
        product.product_variants.forEach((_item, _index) => {
            setFieldValue(`product_variants[${_index}].is_default`, areValuesEqual(index, _index))
        })
    }
}

const generateProductVariants = () => {
    if (!product.product_attributes || areValuesEqual(product.product_attributes.length, 0)) return

    const combinations: IProductVariants[] = []

    const generateCombinations = (
        currentIndex: number,
        currentCombination: { name: string, id: string }[]
    ) => {
        if (Array.isArray(product.product_attributes)) {
            if (areValuesEqual(currentIndex, product.product_attributes.length)) {
                combinations.push({
                    is_default: areValuesEqual(combinations.length, 0),
                    label: currentCombination.map(item => item.name).join(' - '),
                    sku: '',
                    price: 0,
                    manage_inventory: MANAGE_INVENTORY.NO,
                    quantity: 0,
                    special_price: 0,
                    special_price_type: SPECIAL_PRICE.PRICE,
                    product_attribute_value_id: currentCombination.map(item => item.id)
                })

                return
            }

            const currentAttribute = attributeValueName.value[currentIndex]

            for (const value of currentAttribute) {
                generateCombinations(currentIndex + 1, [
                    ...currentCombination,
                    {
                        id: value.id,
                        name: value.name
                    }
                ])
            }
        }
    }

    generateCombinations(0, [])

    setFieldValue('product_variants', combinations)
}

const getAttributeOptions = (index: number) => attributeValueList.value[index]?.data as IProductAttributeValuesList[] || []

const handleAttributeValues = (index: number) => {
    attributeValueName.value[index] = getAttributeOptions(index)?.filter(({ id }) => productAttributes.value[index].values?.includes(id))
}
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
            :label="productLabel.attribute.name"
            :options="attributeList"
            :loading="isFetchingAttribute"
            name="product_attribute_id"
            multiple
        />
    </div>

    <template v-if="product.product_attribute_id?.length">
        <div class="col-span-12 flex flex-col gap-4">
            <div
                v-for="(attributeItem, index) in product.product_attributes"
                :key="attributeItem.name"
                class="grid grid-cols-12 gap-4"
            >
                <div class="col-span-3">
                    <FormInput
                        :model-value="attributeItem.name"
                        :label="productLabel.attribute.name"
                        :name="`product_attributes[${index}].name`"
                        disabled
                    />
                </div>

                <div class="col-span-6">
                    <FormSelect
                        :label="productLabel.attribute.values"
                        :name="`product_attributes[${index}].values`"
                        :options="getAttributeOptions(index)"
                        multiple
                        @update:model-value="handleAttributeValues(index)"
                    />
                </div>
            </div>
        </div>

        <div class="col-span-12">
            <UButton
                icon="i-heroicons-plus"
                size="sm"
                variant="solid"
                label="Tạo Biến Thể"
                :trailing="false"
                @click="generateProductVariants"
            />
        </div>

        <div class="col-span-12 flex flex-col gap-4">
            <div
                v-for="(variant, index) in product.product_variants"
                :key="variant.label"
                class="grid grid-cols-12 gap-4"
            >
                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormToggle
                        label="Mặc định"
                        :name="`product_variants[${index}].is_default`"
                        :label-toggle="variant.label"
                        @update:model-value="handleIsDefault(index)"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormInput
                        :label="productLabel.sku"
                        :name="`product_variants[${index}].sku`"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormSelect
                        :label="productLabel.manage_inventory"
                        :options="optionManageInventory"
                        :name="`product_variants[${index}].manage_inventory`"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormMoney
                        :label="productLabel.quantity"
                        :disabled="areValuesEqual(variant.manage_inventory, MANAGE_INVENTORY.NO)"
                        :name="`product_variants[${index}].quantity`"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormSelect
                        :label="productLabel.special_price_type"
                        :options="optionTypeDiscount"
                        :name="`product_variants[${index}].special_price_type`"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormMoney
                        :label="productLabel.price"
                        :name="`product_variants[${index}].price`"
                        text-trailing="VNĐ"
                        help="Giá Gốc"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormMoney
                        :label="productLabel.special_price"
                        :name="`product_variants[${index}].special_price`"
                        :text-trailing="areValuesEqual(variant.special_price_type, SPECIAL_PRICE.PERCENT) ? '%' : 'VNĐ'"
                    />
                </div>

                <div class="md:col-span-3 sm:col-span-4 col-span-6">
                    <FormMoney
                        :value="formatSellingPrice(variant)"
                        :label="productLabel.selling_price"
                        :name="`product_variants[${index}].selling_price`"
                        :help="`${!areValuesEqual(variant.special_price_type, SPECIAL_PRICE.PERCENT) ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                        text-trailing="VNĐ"
                        disabled
                    />
                </div>

                <div
                    v-if="index < product.product_variants.length - 1"
                    class="col-span-12"
                >
                    <UDivider />
                </div>
            </div>
        </div>
    </template>
</template>
