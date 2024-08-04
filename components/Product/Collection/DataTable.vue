<script setup lang="ts">

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductCollectionDataTable()
const { isPending, mutateAsync } = useProductCollectionFormDelete()
</script>

<template>
    <ProductCollectionSearch />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProductCollection>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productCollectionColumns"
        :loading="isFetching || isPending"
    >
        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_COLLECTION_KEYS.NAME)"
            :to="goToPage(row.id, ROUTER.PRODUCT_COLLECTION)"
            :name="row.title"
            :count="`${row.product.length} Sản Phẩm`"
        />

        <UToggle
            v-if="areValuesEqual(column.key, PRODUCT_COLLECTION_KEYS.STATUS)"
            :model-value="areValuesEqual(row.status, STATUS.ACTIVE)"
        />

        <span v-if="areValuesEqual(column.key, PRODUCT_COLLECTION_KEYS.CREATED_AT)">
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
                :to="goToPage(row.id, ROUTER.PRODUCT_COLLECTION)"
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
