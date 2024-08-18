<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
}

const props = defineProps<Props>()

// ** useHooks
const { errorMessage, value, setValue } = useField<string[]>(() => props.name, undefined, {
    syncVModel: true
})

const { productBrandId, dataTable, dataAggregations, isFetching } = useProductCategoryDataTable()

// ** Data
const product_category_id = value.value || []
const selected = ref<IProductCategory[]>([])
const productCategoryTableColumns = ref(_clone(productCategoryColumns))

productCategoryTableColumns.value.pop()

// ** Computed
const error = computed(() => errorMessage.value)

// ** Watch
watch(selected, newValue => setValue(newValue.map(_s => _s.id)))
watchEffect(() => selected.value = _unionBy(selected.value, dataTable.value.filter(_d => product_category_id.includes(_d.id)), 'id'))
</script>

<template>
    <UFormGroup
        :name="name"
        :error="error"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12">
                <ProductCategorySearch :product-brand-id="productBrandId" />

                <BaseDataTableInit
                    v-slot="{ row, column }: IRow<IProductCategory>"
                    v-model="selected"
                    :data-table="dataTable"
                    :data-aggregations="dataAggregations"
                    :columns="productCategoryTableColumns"
                    :loading="isFetching"
                    v-bind="$attrs"
                >
                    <BaseDataTableColumnInformation
                        v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.NAME)"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, row.id, ROUTER.PRODUCT_CATEGORY)"
                        :name="row.name"
                        :image="row.image_uri"
                        :count="`${row.product.length} Sản Phẩm`"
                        has-image
                    />

                    <BaseDataTableColumnInformation
                        v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.PARENT_ID) && row.parentCategory"
                        :to="goToPage(ROUTER.PRODUCT_GENERAL, row.parentCategory.id, ROUTER.PRODUCT_CATEGORY)"
                        :name="row.parentCategory.name"
                        :image="row.parentCategory.image_uri"
                        :count="`${row.parentCategory.product.length} Sản Phẩm`"
                        has-image
                    />

                    <UToggle
                        v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.STATUS)"
                        :model-value="areValuesEqual(row.status, STATUS.ACTIVE)"
                    />

                    <span v-if="areValuesEqual(column.key, PRODUCT_CATEGORY_KEYS.CREATED_AT)">
                        {{ formatDateTime(row.created_at) }}
                    </span>
                </BaseDataTableInit>
            </div>
        </div>
    </UFormGroup>
</template>
