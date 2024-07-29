<script setup lang="ts">

// ** Validations Imports
import { label, productAttributeFormSchema, type IProductAttributeForm } from '~/validations/product-attribute'

// ** useHooks
const categoryList = useProductCategoryDataList()
const { isPending, mutateAsync } = useProductAttributeFormInput()
const { data, links } = await useProductAttributeRetrieve()

const { handleSubmit, values: productAttribute, setFieldValue } = useForm<IProductAttributeForm>({
    validationSchema: productAttributeFormSchema,
    initialValues: _omitBy(data.value, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật thuộc tính: ${data.name}`"
        :links="links"
    >
        <UForm
            :state="productAttributeFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Thông tin chi tiết" />
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            1. Thông tin chung
                        </p>
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
                            :label="label.product_category_id"
                            :options="categoryList"
                            :route-page="ROUTER.PRODUCT_CATEGORY"
                            name="product_category_id"
                            multiple
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
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            2. Thêm giá trị thuộc tính
                        </p>
                    </div>

                    <div class="col-span-12">
                        <FieldArray
                            v-slot="{ push, remove }"
                            name="product_attribute_values"
                        >
                            <UButton
                                icon="i-heroicons-plus"
                                size="sm"
                                color="primary"
                                variant="solid"
                                label="Thêm Giá Trị"
                                :trailing="false"
                                @click="push({ value: '' })"
                            />

                            <div class="flex flex-col gap-4 mt-4">
                                <div
                                    v-for="(_, index) in productAttribute.product_attribute_values"
                                    :key="index"
                                    class="grid gap-4 grid-cols-12"
                                >
                                    <div class="col-span-6">
                                        <FormInput
                                            :label="label.value"
                                            :name="`product_attribute_values.${index}.value`"
                                        />
                                    </div>

                                    <div class="col-span-3">
                                        <UButton
                                            :ui="{ rounded: 'rounded-full' }"
                                            icon="i-heroicons-trash"
                                            size="sm"
                                            color="red"
                                            variant="solid"
                                            class="mt-6"
                                            @click="remove(index)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </FieldArray>
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
