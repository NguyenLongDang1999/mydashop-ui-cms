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
watch(dataTable, () => emits('dataTable', dataTable.value))
</script>

<template>
    <ProductProductSearch
        :product-brand-id="productBrandId"
        :product-category-id="productCategoryId"
    />

    <div class="my-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable"
            :columns="productTableColumns"
            :loading="Boolean(isFetching) || Boolean(isPending)"
            class="w-full"
            v-bind="$attrs"
        >
            <template #name-data="{ row }: IRow<IProduct>">
                <ULink :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT)">
                    <UBadge
                        v-if="row.hasFlashDeals"
                        color="red"
                    >
                        Flash Deals
                    </UBadge>

                    <div class="flex items-center gap-1 mt-2">
                        <UAvatar
                            :src="getPathImageFile(row.image_uri)"
                            :alt="row.name"
                        />

                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.name }}</span>
                            <span>{{ row.sku }}</span>
                        </div>
                    </div>
                </ULink>
            </template>

            <template #price-data="{ row }: IRow<IProduct>">
                <ul>
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
            </template>

            <template #product_category_id-data="{ row }: IRow<IProduct>">
                <ULink
                    v-if="row.productCategory"
                    :to="goToPage(ROUTER.PRODUCT_GENERAL, row.productCategory.id, ROUTER.PRODUCT_CATEGORY)"
                >
                    <div class="flex items-center gap-1">
                        <UAvatar
                            :src="getPathImageFile(row.productCategory.image_uri)"
                            :alt="row.productCategory.name"
                        />

                        <span class="capitalize text-primary flex-1 truncate">{{ row.productCategory.name }}</span>
                    </div>
                </ULink>
            </template>

            <template #product_brand_id-data="{ row }: IRow<IProduct>">
                <ULink
                    v-if="row.productBrand"
                    :to="goToPage(ROUTER.PRODUCT_GENERAL, row.productBrand.id, ROUTER.PRODUCT_BRAND)"
                >
                    <div class="flex items-center gap-1">
                        <UAvatar
                            :src="getPathImageFile(row.productBrand.image_uri)"
                            :alt="row.productBrand.name"
                        />

                        <span class="capitalize text-primary flex-1 truncate">{{ row.productBrand.name }}</span>
                    </div>
                </ULink>
            </template>

            <template #status-data="{ row }: IRow<IProduct>">
                <UToggle :model-value="areValuesEqual(row.status, STATUS.ACTIVE)" />
            </template>

            <template #created_at-data="{ row }: IRow<IProduct>">
                <span>{{ formatDateTime(row.created_at) }}</span>
            </template>

            <template #actions-data="{ row }: IRow<IProduct>">
                <div class="flex gap-2">
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
            </template>
        </UTable>
    </div>

    <BasePagination :data-aggregations="dataAggregations" />
</template>
