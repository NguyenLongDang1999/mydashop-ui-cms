<script setup lang="ts">

// ** Props & Emits
interface Props {
    notFlashDeals?: boolean
    productIdFlashDeals?: string
}

const props = defineProps<Props>()
const emits = defineEmits(['dataTable'])

// ** useHooks
const { productCategoryId, productBrandId, isFetching, dataTable, dataAggregations } = useProductDataTable(props.notFlashDeals, props.productIdFlashDeals)
const { isPending, mutateAsync } = useProductFormDelete()

// ** Data
const productTableColumns = ref(_clone(productColumns))

if (productCategoryId || productBrandId) {
    productTableColumns.value.pop()
}

// ** Watch
watchEffect(() => emits('dataTable', dataTable.value))
</script>

<template>
    <ProductProductSearch
        :product-brand-id="productBrandId"
        :product-category-id="productCategoryId"
    />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProduct>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productTableColumns"
        :loading="isFetching || isPending"
        v-bind="$attrs"
    >
        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_KEYS.NAME)"
            :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT)"
            :name="row.name"
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

        <div
            v-if="areValuesEqual(column.key, CORE_KEYS.ACTION)"
            class="flex gap-2"
        >
            <UButton
                icon="i-heroicons-pencil-square"
                size="sm"
                color="orange"
                square
                variant="solid"
                :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT)"
            />

            <BaseConfirm
                :remove="() => mutateAsync({
                    id: row.id,
                    slug: row.slug
                })"
            />
        </div>
    </BaseDataTableInit>
</template>
