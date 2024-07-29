<script setup lang="ts">

// ** useHooks
const { productCategoryId, dataTable, dataAggregations, isFetching } = useProductAttributeDataTable()
const { isPending, mutateAsync } = useProductAttributeFormDelete()

// ** Data
const showAll = ref<{
    [key: string]: boolean
}>({})

const productAttributeTableColumns = ref(_clone(productAttributeColumns))

if (productCategoryId) {
    productAttributeTableColumns.value.pop()
}
</script>

<template>
    <ProductAttributeSearch :product-category-id="productCategoryId" />

    <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable"
            :columns="productAttributeTableColumns"
            :loading="Boolean(isFetching) || Boolean(isPending)"
            class="w-full"
        >
            <template #name-data="{ row }: IRow<IProductAttribute>">
                <ULink :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_ATTRIBUTE)">
                    <div class="flex flex-col flex-1 truncate">
                        <span class="capitalize text-primary truncate">{{ row.name }}</span>
                        <span>{{ row.productAttributeValues.length }} Giá Trị</span>
                    </div>
                </ULink>
            </template>

            <template #product_category_id-data="{ row }: IRow<IProductAttribute>">
                <div v-if="row.productCategoryAttributes.length">
                    <ULink
                        v-for="category in row.productCategoryAttributes.slice(0, showAll[row.id] ? undefined : 5)"
                        :key="category.id"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, category.id, ROUTER.PRODUCT_CATEGORY)"
                        class="flex items-center gap-1 hover:text-primary-500"
                    >
                        <span class="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                        <span class="truncate capitalize flex-1">{{ category.name }}</span>
                    </ULink>

                    <div
                        v-if="row.productCategoryAttributes.length > 5"
                        class="flex gap-2 items-center cursor-pointer hover:text-primary mt-2"
                        @click="showAll[row.id] = !showAll[row.id]"
                    >
                        {{ showAll[row.id] ? 'Rút Gọn' : 'Xem Tất Cả' }}
                        <UIcon :name="showAll[row.id] ? 'i-heroicons-chevron-double-up' : 'i-heroicons-chevron-double-down'" />
                    </div>
                </div>

                <span v-else />
            </template>

            <template #status-data="{ row }: IRow<IProductAttribute>">
                <UToggle :model-value="areValuesEqual(row.status, STATUS.ACTIVE)" />
            </template>

            <template #created_at-data="{ row }: IRow<IProductAttribute>">
                <span>{{ formatDateTime(row.created_at) }}</span>
            </template>

            <template #actions-data="{ row }: IRow<IProductAttribute>">
                <div class="flex gap-2">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="orange"
                        square
                        variant="solid"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_ATTRIBUTE)"
                    />

                    <BaseConfirm
                        :remove="() => mutateAsync({
                            id: row.id,
                            slug: row.slug
                        })"
                    />
                </div>
            </template>
        </UTable>
    </div>

    <BasePagination :data-aggregations="dataAggregations" />
</template>
