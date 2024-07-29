<script setup lang="ts">

// ** Validations Imports
import { label, productCategoryFormSchema, type IProductCategoryForm } from '~/validations/product-category'

// ** useHooks
const categoryList = useProductCategoryDataList()
const { isPending, mutateAsync } = useProductCategoryFormInput()

const { handleSubmit, setFieldValue } = useForm<IProductCategoryForm>({
    validationSchema: productCategoryFormSchema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Thêm Mới"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
    >
        <UForm
            :state="productCategoryFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Thêm mới danh mục">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </BaseCardTitle>
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
                                label="Thêm Mới"
                                :loading="isPending"
                                :trailing="false"
                            />

                            <UButton
                                type="reset"
                                size="sm"
                                color="gray"
                                variant="solid"
                                label="Huỷ Bỏ"
                                :trailing="false"
                                @click="isOpen = false"
                            />
                        </div>
                    </div>
                </div>
            </UCard>
        </UForm>
    </UModal>
</template>
