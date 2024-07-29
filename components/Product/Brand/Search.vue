<script setup lang="ts">

// ** Validations Imports
import { label, productBrandSearchSchema, type IProductBrandSearch } from '~/validations/product-brand'

// ** Props & Emits
interface Props {
    productCategoryId?: string
}

const props = defineProps<Props>()

// ** useHooks
const categoryList = useProductCategoryDataList()

const { handleSubmit, resetForm, meta } = useForm<IProductBrandSearch>({
    validationSchema: productBrandSearchSchema,
    initialValues: {
        product_category_id: props.productCategoryId,
        page: PAGE.CURRENT
    }
})

// ** Data
const search = inject('search') as IProductBrandSearch
const searchTemp = reactive<IProductBrandSearch>(_clone(search))

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
                    :label="label.name"
                    name="search_name"
                />
            </div>

            <div
                v-if="!productCategoryId"
                class="md:col-span-3 sm:col-span-6 col-span-12"
            >
                <FormSelect
                    v-model="searchTemp.product_category_id"
                    :label="label.product_category_id"
                    :options="categoryList"
                    name="search_product_category_id"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="label.status"
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
