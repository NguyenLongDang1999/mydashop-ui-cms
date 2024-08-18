<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
    notFlashDeals?: boolean
    productIdFlashDeals?: string
    productIdCollection?: string
    flashDealsId?: string
}

const props = defineProps<Props>()

// ** useHooks
const { errorMessage, value, setValue } = useField<string[]>(() => props.name, undefined, {
    syncVModel: true
})

const { search, productCategoryId, productBrandId, isFetching, dataTable, dataAggregations } = useProductDataTable(props.notFlashDeals, props.productIdFlashDeals, props.flashDealsId)

// ** Data
const product_id = value.value || []
const selected = ref<IProduct[]>([])
const productTableColumns = ref(_clone(productColumns))

productTableColumns.value.pop()

// ** Computed
const error = computed(() => errorMessage.value)

// ** Watch
watch(selected, newValue => setValue(newValue.map(_s => _s.id)))
watch(() => props.flashDealsId, () => search.flash_deals_id = props.flashDealsId)
watch(() => props.productIdCollection, () => search.product_id_collection = props.productIdCollection)
watchEffect(() => selected.value = dataTable.value.filter(_d => product_id.includes(_d.id)))
</script>

<template>
    <UFormGroup
        :name="name"
        :error="error"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12">
                <ProductProductSearch
                    :product-brand-id="productBrandId"
                    :product-category-id="productCategoryId"
                />

                <BaseDataTableInit
                    v-slot="{ row, column }: IRow<IProduct>"
                    v-model="selected"
                    :data-table="dataTable"
                    :data-aggregations="dataAggregations"
                    :columns="productTableColumns"
                    :loading="isFetching"
                >
                    <BaseDataTableColumnInformation
                        v-if="areValuesEqual(column.key, PRODUCT_KEYS.NAME)"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT)"
                        :name="row.name"
                        :title="row.title"
                        :image="row.image_uri"
                        :count="row.sku"
                        :has-flash-deals="row.hasFlashDeals"
                        has-image
                    />

                    <ul v-if="areValuesEqual(column.key, PRODUCT_KEYS.PRICE)">
                        <li>
                            <span class="font-semibold capitalize">Giá gốc:</span>
                            {{ formatCurrency(Number(row.price)) }}
                        </li>

                        <li>
                            <span class="font-semibold capitalize">Giá giảm: </span>

                            <template v-if="areValuesEqual(row.special_price_type, SPECIAL_PRICE.PERCENT)">
                                {{ row.special_price }}%
                            </template>

                            <template v-else>
                                {{ formatCurrency(Number(row.special_price)) }}
                            </template>
                        </li>

                        <li>
                            <span class="font-semibold capitalize">Giá bán:</span>
                            {{ formatSellingPrice(row) }}
                        </li>
                    </ul>

                    <BaseDataTableColumnInformation
                        v-if="areValuesEqual(column.key, PRODUCT_KEYS.PRODUCT_CATEGORY_ID) && row.productCategory"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, row.productCategory.id, ROUTER.PRODUCT_CATEGORY)"
                        :name="row.productCategory.name"
                        :image="row.productCategory.image_uri"
                        has-image
                    />

                    <BaseDataTableColumnInformation
                        v-if="areValuesEqual(column.key, PRODUCT_KEYS.PRODUCT_BRAND_ID) && row.productBrand"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, row.productBrand.id, ROUTER.PRODUCT_BRAND)"
                        :name="row.productBrand.name"
                        :image="row.productBrand.image_uri"
                        has-image
                    />

                    <UToggle
                        v-if="areValuesEqual(column.key, PRODUCT_KEYS.STATUS)"
                        :model-value="areValuesEqual(row.status, STATUS.ACTIVE)"
                    />

                    <span v-if="areValuesEqual(column.key, PRODUCT_KEYS.CREATED_AT)">
                        {{ formatDateTime(row.created_at) }}
                    </span>
                </BaseDataTableInit>
            </div>
        </div>
    </UFormGroup>
</template>
