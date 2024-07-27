<script setup lang="ts">

// ** Validations Imports
import type { IRow } from '~/validations/core'
import type { IProductCategory } from '~/validations/product-category'

// ** useHooks
const { productBrandId, dataTable, dataAggregations, isFetching } = useProductCategoryDataTable()
const { isPending, mutateAsync } = useProductCategoryFormDelete()

// ** Data
const productCategoryTableColumns = ref(_clone(productCategoryColumns))

if (productBrandId) {
    productCategoryTableColumns.value.pop()
}
</script>

<template>
    <ProductCategorySearch :product-brand-id="productBrandId" />

    <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
        <UTable
            :rows="dataTable"
            :columns="productCategoryTableColumns"
            :loading="Boolean(isFetching) || Boolean(isPending)"
            class="w-full"
        >
            <template #name-data="{ row }: IRow<IProductCategory>">
                <ULink :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_CATEGORY)">
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

            <template #parent_id-data="{ row }: IRow<IProductCategory>">
                <ULink
                    v-if="row.parentCategory"
                    :to="goToPage(ROUTER.PRODUCT_GENERAL, row.parentCategory.id, ROUTER.PRODUCT_CATEGORY)"
                >
                    <div class="flex items-center gap-1">
                        <UAvatar
                            :src="getPathImageFile(row.parentCategory.image_uri)"
                            :alt="row.parentCategory.name"
                        />

                        <div class="flex flex-col flex-1 truncate">
                            <span class="capitalize text-primary truncate">{{ row.parentCategory.name }}</span>
                            <span>{{ row.parentCategory.product?.length }} Sản Phẩm</span>
                        </div>
                    </div>
                </ULink>

                <span v-else />
            </template>

            <template #status-data="{ row }: IRow<IProductCategory>">
                <UToggle :model-value="areValuesEqual(row.status, STATUS.ACTIVE)" />
            </template>

            <template #created_at-data="{ row }: IRow<IProductCategory>">
                <span>{{ formatDateTime(row.created_at) }}</span>
            </template>

            <template #actions-data="{ row }: IRow<IProductCategory>">
                <div class="flex gap-2">
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
            </template>
        </UTable>
    </div>

    <BasePagination :data-aggregations="dataAggregations" />
</template>
