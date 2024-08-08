<script setup lang="ts">

// ** Props & Emits
interface Props {
    data: IProductVariantForm
}

const props = defineProps<Props>()

// ** Computed
const productImagesCount = computed(() => props.data.product_images?.length || 0)
const remainingUploads = computed(() => Math.max(6 - productImagesCount.value, 0))

// ** useHooks
const { isPending, mutateAsync } = useProductImagesForm()

const { handleSubmit } = useForm<IProductImagesForm>({
    validationSchema: productImagesFormSchema,
    initialValues: _omitBy(props.data, _isNil)
})

const onSubmit = handleSubmit(values => mutateAsync({
    id: values.id,
    image_uri: values.image_uri,
    product_images: values.product_images
}))
</script>

<template>
    <UForm
        :state="productImagesFormSchema"
        @submit="onSubmit"
    >
        <UCard>
            <template #header>
                <BaseCardTitle title="Hình ảnh sản phẩm" />
            </template>

            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <FormUpload />
                </div>

                <div class="col-span-12">
                    <div class="grid gap-4 grid-cols-12">
                        <div
                            v-for="(_, index) in data.product_images"
                            :key="index"
                            class="col-span-12"
                        >
                            <FormUpload
                                label="Ảnh bổ sung"
                                :name="`product_images[${index}].image_uri`"
                            />
                        </div>

                        <div
                            v-for="(_, index) in remainingUploads"
                            :key="index"
                            class="col-span-12"
                        >
                            <FormUpload
                                label="Ảnh bổ sung"
                                :name="`product_images[${index + productImagesCount}].image_uri`"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
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
            </template>
        </UCard>
    </UForm>
</template>
