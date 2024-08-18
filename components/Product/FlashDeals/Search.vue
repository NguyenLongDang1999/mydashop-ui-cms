<script setup lang="ts">

// ** Data
const search = inject('search') as IProductFlashDealsSearch
const searchTemp = reactive<IProductFlashDealsSearch>(_clone(search))

// ** useHooks
const { handleSubmit, resetForm, meta } = useForm<IProductFlashDealsSearch>({
    validationSchema: productFlashDealsSearchSchema,
    initialValues: {
        page: PAGE.CURRENT
    }
})

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
                    v-model="searchTemp.title"
                    :label="productFlashDealsLabel.title"
                    name="search_title"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="productFlashDealsLabel.status"
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
