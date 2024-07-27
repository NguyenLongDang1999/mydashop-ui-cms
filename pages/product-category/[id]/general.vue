<script setup lang="ts">

// ** Validations Imports
import { label, productCategoryFormSchema, type IProductCategoryForm } from '~/validations/product-category';

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
                            :label="label.name"
                            name="name"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.parent_id"
                            :options="categoryList"
                            name="parent_id"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="label.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="label.meta_title"
                            name="meta_title"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="label.meta_description"
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
