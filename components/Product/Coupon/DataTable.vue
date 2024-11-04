<script setup lang="ts">

// ** useHooks
const { dataTable, dataAggregations, isFetching } = useProductCouponDataTable()
const { isPending, mutateAsync } = useProductCouponFormDelete()

// ** Data
const productCouponTableColumns = ref(_clone(productCouponColumns))
</script>

<template>
    <ProductCouponSearch />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProductCoupon>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productCouponTableColumns"
        :loading="isFetching || isPending"
        v-bind="$attrs"
    >
        <BaseDataTableColumnInformation
            v-if="areValuesEqual(column.key, PRODUCT_COUPON_KEYS.CODE)"
            :name="row.code"
            :to="goToPage(row.id, ROUTER.PRODUCT_COUPON)"
        />

        <span v-if="areValuesEqual(column.key, PRODUCT_COUPON_KEYS.MIN_ORDER_VALUE)">
            {{ formatCurrency(Number(row.minimum_order_value)) }}
        </span>

        <span v-if="areValuesEqual(column.key, PRODUCT_COUPON_KEYS.PRICE)">
            -
            <template v-if="areValuesEqual(row.discount_type, SPECIAL_PRICE.PERCENT)">
                {{ row.discount_value }}%
            </template>

            <template v-else>
                {{ formatCurrency(Number(row.discount_value)) }}
            </template>
        </span>

        <span v-if="areValuesEqual(column.key, PRODUCT_COUPON_KEYS.DATE_RANGE)">
            {{ formatDateTime(row.start_date) }} - {{ formatDateTime(row.end_date) }}
        </span>

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
                :to="goToPage(row.id, ROUTER.PRODUCT_COUPON)"
            />

            <BaseConfirm
                :remove="() => mutateAsync({
                    id: row.id,
                    slug: row.code
                })"
            />
        </div>
    </BaseDataTableInit>
</template>
