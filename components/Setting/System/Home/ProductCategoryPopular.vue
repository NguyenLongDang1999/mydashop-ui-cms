<script setup lang="ts">

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

const props = defineProps<Props>()

// ** Computed
const productCategory = computed(() => props.data.find(_p => areValuesEqual(_p.key, HOME_SETTING.PRODUCT_CATEGORIES_POPULAR)))

// ** useHooks
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit } = useForm<ISettingSystemProductCategoryForm>({
    validationSchema: settingSystemProductCategoryFormSchema,
    initialValues: {
        product_category_id: typeof productCategory.value?.value === 'string' ? JSON.parse(productCategory.value?.value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.PRODUCT_CATEGORIES_POPULAR,
    key: HOME_SETTING.PRODUCT_CATEGORIES_POPULAR,
    value: JSON.stringify(values.product_category_id),
    input_type: INPUT_TYPE.TEXT
}))
</script>

<template>
    <UForm
        :state="settingSystemProductCategoryFormSchema"
        @submit="onSubmit"
    >
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <UAlert
                    icon="i-heroicons-information-circle"
                    color="primary"
                    variant="solid"
                    title="Lưu Ý!"
                >
                    <template #description>
                        <div class="flex flex-col gap-1 mt-1">
                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Khuyến khích chọn tối đa 6 danh mục.</span>
                            </div>

                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Những danh mục được chọn chỉ hiển thị trong trang chủ.</span>
                            </div>
                        </div>
                    </template>
                </UAlert>
            </div>

            <div class="col-span-12">
                <FormCategorySearchSelected name="product_category_id" />
            </div>

            <div class="col-span-12">
                <UButton
                    type="submit"
                    size="sm"
                    variant="solid"
                    label="Lưu Lại"
                    :loading="Boolean(isPending)"
                    :trailing="false"
                />
            </div>
        </div>
    </UForm>
</template>
