<script setup lang="ts">

// ** Props & Emits
interface Props {
    productCategoryId?: string
    productBrandId?: string
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useProductCategoryDataList()

const { handleSubmit, resetForm, meta } = useForm<IProductSearch>({
    validationSchema: productCategorySearchSchema,
    initialValues: {
        product_category_id: props.productCategoryId,
        product_brand_id: props.productBrandId,
        page: PAGE.CURRENT
    }
})

// ** Data
const search = inject('search') as IProductSearch
const searchTemp = reactive<IProductSearch>(_clone(search))

// ** Methods
const onReset = () => {
    resetForm()
    clearObject(search)
    _assign(search, meta.value.initialValues)
}

const onSubmit = handleSubmit(() => _assign(search, searchTemp))
</script>

<template>
    <UForm
        :state="search"
        @submit="onSubmit"
        @reset="onReset"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.sku"
                    :label="productLabel.sku"
                    name="search_sku"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.name"
                    :label="productLabel.name"
                    name="search_name"
                />
            </div>

            <div
                v-if="!productCategoryId"
                class="md:col-span-3 sm:col-span-6 col-span-12"
            >
                <FormSelect
                    v-model="searchTemp.product_category_id"
                    :label="productLabel.product_category_id"
                    :options="categoryList"
                    name="search_product_category_id"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="productLabel.status"
                    :options="optionStatus"
                    name="search_status"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.product_type"
                    :label="productLabel.product_type"
                    :options="optionProductType"
                    name="search_product_type"
                />
            </div>

            <div class="col-span-12">
                <div class="flex justify-center gap-4">
                    <UButton
                        type="submit"
                        icon="i-heroicons-magnifying-glass"
                        size="sm"
                        variant="solid"
                        label="Tìm Kiếm"
                        :trailing="false"
                    />

                    <UButton
                        type="reset"
                        icon="i-heroicons-arrow-path"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Làm Mới"
                        :trailing="false"
                    />
                </div>
            </div>
        </div>
    </UForm>
</template>
