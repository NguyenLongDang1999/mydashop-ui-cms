<script setup lang="ts">

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductCollectionDataTable()
const { isPending, mutateAsync } = useProductCollectionFormDelete()
</script>

<template>
    <ProductCollectionSearch />

    <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable"
            :columns="productCollectionColumns"
            :loading="Boolean(isFetching) || Boolean(isPending)"
            class="w-full"
        >
            <template #name-data="{ row }: IRow<IProductCollection>">
                <ULink :to="goToPage(row.id, ROUTER.PRODUCT_COLLECTION)">
                    <div class="flex items-center gap-1">
                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.title }}</span>
                            <span>{{ row.product.length }} Sản Phẩm</span>
                        </div>
                    </div>
                </ULink>
            </template>

            <template #status-data="{ row }: IRow<IProductCollection>">
                <UToggle :model-value="areValuesEqual(row.status, STATUS.ACTIVE)" />
            </template>

            <template #created_at-data="{ row }: IRow<IProductCollection>">
                <span>{{ formatDateTime(row.created_at) }}</span>
            </template>

            <template #actions-data="{ row }: IRow<IProductCollection>">
                <div class="flex gap-2">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="orange"
                        square
                        variant="solid"
                        :to="goToPage(row.id, ROUTER.PRODUCT_COLLECTION)"
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
