<script setup lang="ts">

// ** useHooks
const { productCategoryId, dataTable, dataAggregations, isFetching } = useProductBrandDataTable()
const { isPending, mutateAsync } = useProductBrandFormDelete()

// ** Data
const showAll = ref<{
    [key: string]: boolean
}>({})

const productBrandTableColumns = ref(_clone(productBrandColumns))

if (productCategoryId) {
    productBrandTableColumns.value.pop()
}
</script>

<template>
    <ProductBrandSearch :product-category-id="productCategoryId" />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProductBrand>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productBrandTableColumns"
        :loading="isFetching || isPending"
    >
        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_BRAND_KEYS.NAME)"
            :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_BRAND)"
            :name="row.name"
            :image="row.image_uri"
            :count="`${row._count.product} Sản Phẩm`"
            has-image
        />

        <template v-if="areValuesEqual(column.key, PRODUCT_BRAND_KEYS.PRODUCT_CATEGORY_ID)">
            <div v-if="row.productCategoryBrand.length">
                <ULink
                    v-for="category in row.productCategoryBrand.slice(0, showAll[row.id] ? undefined : 5)"
                    :key="category.id"
                    :to="goToPage(ROUTER.PRODUCT_GENERAL, category.id, ROUTER.PRODUCT_CATEGORY)"
                    class="flex items-center gap-1 hover:text-primary-500"
                >
                    <span class="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                    <span class="truncate capitalize flex-1">{{ category.name }}</span>
                </ULink>

                <div
                    v-if="row.productCategoryBrand.length > 5"
                    class="flex gap-2 items-center cursor-pointer hover:text-primary mt-2"
                    @click="showAll[row.id] = !showAll[row.id]"
                >
                    {{ showAll[row.id] ? 'Rút Gọn' : 'Xem Tất Cả' }}
                    <UIcon :name="showAll[row.id] ? 'i-heroicons-chevron-double-up' : 'i-heroicons-chevron-double-down'" />
                </div>
            </div>

            <span v-else />
        </template>

        <UToggle
            v-if="areValuesEqual(column.key, PRODUCT_BRAND_KEYS.STATUS)"
            :model-value="areValuesEqual(row.status, STATUS.ACTIVE)"
        />

        <span v-if="areValuesEqual(column.key, PRODUCT_BRAND_KEYS.CREATED_AT)">
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
                :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_BRAND)"
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
