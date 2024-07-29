<script setup lang="ts">

// ** useHooks
const categoryList = useProductCategoryDataList()
const { isPending, mutateAsync } = useProductCategoryFormInput()
const { data, links } = await useProductCategoryRetrieve()

const { handleSubmit, setFieldValue } = useForm<IProductCategoryForm>({
    validationSchema: productCategoryFormSchema,
    initialValues: _omitBy(data.value, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật danh mục: ${data.name}`"
        :links="links"
    >
        <UForm
            :state="productCategoryFormSchema"
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
                            :label="productCategoryLabel.name"
                            name="name"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="productCategoryLabel.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productCategoryLabel.parent_id"
                            :options="categoryList"
                            name="parent_id"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="productCategoryLabel.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="productCategoryLabel.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="productCategoryLabel.meta_title"
                            name="meta_title"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="productCategoryLabel.meta_description"
                            name="meta_description"
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
