<script setup lang="ts">

// ** Props & Emits
const emits = defineEmits(['dataTable'])

// ** useHooks
const { dataTable, dataAggregations, isFetching } = useProductInventoryDataTable()

// ** Data
const productInventoryTableColumns = ref(_clone(productInventoryColumns))

// ** Watch
watchEffect(() => emits('dataTable', dataTable.value))
</script>

<template>
    <ProductProductSearch />

    <BaseDataTableInit
        v-slot="{ row, column }: IRow<IProductInventory>"
        :data-table="dataTable"
        :data-aggregations="dataAggregations"
        :columns="productInventoryTableColumns"
        :loading="isFetching"
        v-bind="$attrs"
    >
        <ULink
            v-if="areValuesEqual(column.key, PRODUCT_INVENTORY_KEYS.NAME)"
            :to="goToPage(ROUTER.PRODUCT_GENERAL, row.product.id, ROUTER.PRODUCT)"
        >
            <div class="flex items-center gap-1">
                <UAvatar
                    :src="getPathImageFile(row.product.image_uri)"
                    :alt="row.product.name"
                />

                <div class="flex flex-col flex-1 truncate">
                    <span class="capitalize text-primary truncate">{{ row.product.name }}</span>
                    <strong>SKU: {{ row.product.sku }}</strong>
                    <span>{{ row.label }}</span>
                </div>
            </div>
        </ULink>

        <template v-if="areValuesEqual(column.key, PRODUCT_INVENTORY_KEYS.QUANTITY)">
            <span v-if="row.productInventory?.quantity">
                {{ row.productInventory?.quantity || '-' }}
            </span>

            <OrderProductInventoryCreate
                v-else
                :product-inventory="row"
            />
        </template>
    </BaseDataTableInit>
</template>
