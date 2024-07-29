<script setup lang="ts">

// ** Props & Emits
interface Props {
    productBrandId?: string
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useProductCategoryDataList()

const { handleSubmit, resetForm, meta } = useForm<IProductCategorySearch>({
    validationSchema: productCategorySearchSchema,
    initialValues: {
        product_brand_id: props.productBrandId,
        page: PAGE.CURRENT
    }
})

// ** Data
const search = inject('search') as IProductCategorySearch
const searchTemp = reactive<IProductCategorySearch>(_clone(search))

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
                    v-model="searchTemp.name"
                    :label="productCategoryLabel.name"
                    name="search_name"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.parent_id"
                    :label="productCategoryLabel.parent_id"
                    :options="categoryList"
                    name="search_parent_id"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="productCategoryLabel.status"
                    :options="optionStatus"
                    name="search_status"
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
