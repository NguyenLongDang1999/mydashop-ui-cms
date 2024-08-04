<script setup lang="ts">

// ** Props & Emits
const emits = defineEmits(['dataTable'])

// ** useHooks
const { productBrandId, dataTable, dataAggregations, isFetching } = useProductCategoryDataTable()
const { isPending, mutateAsync } = useProductCategoryFormDelete()

// ** Data
const productCategoryTableColumns = ref(_clone(productCategoryColumns))

if (productBrandId) {
    productCategoryTableColumns.value.pop()
}

// ** Watch
watchEffect(() => emits('dataTable', dataTable.value))
</script>

<template>
    <ProductCategorySearch :product-brand-id="productBrandId" />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProductCategory>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productCategoryTableColumns"
        :loading="isFetching || isPending"
        v-bind="$attrs"
    >
        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.NAME)"
            :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_CATEGORY)"
            :name="row.name"
            :image="row.image_uri"
            :count="`${row.product.length} Sản Phẩm`"
            has-image
        />

        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.PARENT_ID) && row.parentCategory"
            :to="goToPage(ROUTER.PRODUCT_GENERAL, row.parentCategory.id, ROUTER.PRODUCT_CATEGORY)"
            :name="row.parentCategory.name"
            :image="row.parentCategory.image_uri"
            :count="`${row.parentCategory.product.length} Sản Phẩm`"
            has-image
        />

        <UToggle
            v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.STATUS)"
            :model-value="areValuesEqual(row.status, STATUS.ACTIVE)"
        />

        <span v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.CREATED_AT)">
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
                :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_CATEGORY)"
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
