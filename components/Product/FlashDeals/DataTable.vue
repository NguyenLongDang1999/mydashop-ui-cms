<script setup lang="ts">

// ** useHooks
const { isFetching, dataTable, dataAggregations } = useProductFlashDealsDataTable()
const { isPending, mutateAsync } = useProductFlashDealsFormDelete()
</script>

<template>
    <ProductFlashDealsSearch />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProductFlashDeals>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productFlashDealsColumns"
        :loading="isFetching || isPending"
    >
        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_FLASH_DEALS_KEYS.NAME)"
            :to="goToPage(row.id, ROUTER.PRODUCT_FLASH_DEALS)"
            :name="row.title"
        />

        <span v-if="areValuesEqual(column.key, PRODUCT_FLASH_DEALS_KEYS.PRICE)">
            -
            <template v-if="areValuesEqual(row.discounted_price_type, SPECIAL_PRICE.PERCENT)">
                {{ row.discounted_price }}%
            </template>

            <template v-else>
                {{ formatCurrency(Number(row.discounted_price)) }}
            </template>
        </span>

        <span v-if="areValuesEqual(column.key, PRODUCT_FLASH_DEALS_KEYS.DATE_RANGE)">
            {{ formatDateTime(row.start_time) }} - {{ formatDateTime(row.end_time) }}
        </span>

        <UToggle
            v-if="areValuesEqual(column.key, PRODUCT_FLASH_DEALS_KEYS.STATUS)"
            :model-value="areValuesEqual(row.status, STATUS.ACTIVE)"
        />

        <span v-if="areValuesEqual(column.key, PRODUCT_FLASH_DEALS_KEYS.CREATED_AT)">
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
                :to="goToPage(row.id, ROUTER.PRODUCT_FLASH_DEALS)"
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
