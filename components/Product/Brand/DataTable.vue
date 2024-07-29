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

    <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable"
            :columns="productBrandTableColumns"
            :loading="Boolean(isFetching) || Boolean(isPending)"
            class="w-full"
        >
            <template #name-data="{ row }: IRow<IProductBrand>">
                <ULink :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_BRAND)">
                    <div class="flex items-center gap-1">
                        <UAvatar
                            :src="getPathImageFile(row.image_uri)"
                            :alt="row.name"
                        />

                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.name }}</span>
                            <span>{{ row.product.length }} Sản Phẩm</span>
                        </div>
                    </div>
                </ULink>
            </template>

            <template #product_category_id-data="{ row }: IRow<IProductBrand>">
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

            <template #status-data="{ row }: IRow<IProductBrand>">
                <UToggle :model-value="areValuesEqual(row.status, STATUS.ACTIVE)" />
            </template>

            <template #created_at-data="{ row }: IRow<IProductBrand>">
                <span>{{ formatDateTime(row.created_at) }}</span>
            </template>

            <template #actions-data="{ row }: IRow<IProductBrand>">
                <div class="flex gap-2">
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
            </template>
        </UTable>
    </div>

    <BasePagination :data-aggregations="dataAggregations" />
</template>
