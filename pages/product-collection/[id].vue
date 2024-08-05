<script setup lang="ts">

// ** useHooks
const { data } = await useProductCollectionRetrieve()

// ** useHooks
const { isPending, mutateAsync } = useProductCollectionFormInput()

const { handleSubmit, setFieldValue } = useForm<IProductCollectionForm>({
    validationSchema: productCollectionFormSchema,
    initialValues: _omitBy(data.value, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật bộ sưu tập: ${data.title}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="productCollectionFormSchema"
                @submit="onSubmit"
            >
                <UCard>
                    <div class="grid gap-4 grid-cols-12">
                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                1. Thông tin chung
                            </p>
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormInput
                                :label="productCollectionLabel.title"
                                name="title"
                                @update:model-value="val => setFieldValue('slug', slugify(val))"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormInput
                                :label="productCollectionLabel.slug"
                                name="slug"
                            />
                        </div>

                        <div class="sm:col-span-4 col-span-12">
                            <FormSelect
                                :label="productCollectionLabel.status"
                                :options="optionStatus"
                                name="status"
                            />
                        </div>

                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                2. Lựa chọn sản phẩm
                            </p>
                        </div>

                        <div class="col-span-12">
                            <FormSelectedProduct name="product_id" />
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
        </div>
    </section>
</template>
