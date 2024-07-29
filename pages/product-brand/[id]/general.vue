<script setup lang="ts">

// ** useHooks
const categoryList = useProductCategoryDataList()
const { isPending, mutateAsync } = useProductBrandFormInput()
const { data, links } = await useProductBrandRetrieve()

const { handleSubmit, setFieldValue } = useForm<IProductBrandForm>({
    validationSchema: productBrandFormSchema,
    initialValues: _omitBy(data.value, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật thương hiệu: ${data.name}`"
        :links="links"
    >
        <UForm
            :state="productBrandFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Thông tin chi tiết" />
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <FormUpload />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="productBrandLabel.name"
                            name="name"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="productBrandLabel.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productBrandLabel.product_category_id"
                            :options="categoryList"
                            :route-page="ROUTER.PRODUCT_CATEGORY"
                            name="product_category_id"
                            multiple
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productBrandLabel.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="productBrandLabel.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <div class="flex justify-start gap-4">
                            <UButton
                                type="submit"
                                size="sm"
                                variant="solid"
                                label="Cập Nhật"
                                :loading="Boolean(isPending)"
                                :trailing="false"
                            />

                            <UButton
                                type="reset"
                                size="sm"
                                color="gray"
                                variant="solid"
                                label="Quay Lại"
                                :trailing="false"
                                @click="$router.go(-1)"
                            />
                        </div>
                    </div>
                </div>
            </UCard>
        </UForm>
    </BaseRetrieve>
</template>
