<script setup lang="ts">

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

const props = defineProps<Props>()

// ** Computed
const productFlashDeals = computed(() => props.data.find(_p => areValuesEqual(_p.key, HOME_SETTING.PRODUCT_FLASH_DEALS)))

// ** useHooks
const flashDealList = useProductFlashDealsDataList()
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values: flashDeals, setFieldValue } = useForm<ISettingSystemProductFlashDealsForm>({
    validationSchema: settingSystemProductFlashDealsFormSchema,
    initialValues: {
        flash_deals_id: typeof productFlashDeals.value?.value === 'string' ? JSON.parse(productFlashDeals.value?.value).flash_deals_id : '',
        product_id: typeof productFlashDeals.value?.value === 'string' ? JSON.parse(productFlashDeals.value?.value).product_id : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.PRODUCT_FLASH_DEALS,
    key: HOME_SETTING.PRODUCT_FLASH_DEALS,
    value: JSON.stringify({
        flash_deals_id: values.flash_deals_id,
        product_id: values.product_id
    }),
    redis_key: 'home_',
    input_type: INPUT_TYPE.TEXT

}))
</script>

<template>
    <UForm
        :state="settingSystemProductFlashDealsFormSchema"
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
                                <span>Chỉ được chọn tối đa 1 sự kiện Flash Deals.</span>
                            </div>

                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Khuyến khích chọn dưới 10 sản phẩm.</span>
                            </div>

                            <div class="flex items-center">
                                <UIcon name="i-heroicons-chevron-right" />
                                <span>Những sản phẩm được chọn chỉ hiển thị trong trang chủ.</span>
                            </div>
                        </div>
                    </template>
                </UAlert>
            </div>

            <div class="col-span-12">
                <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                    1. Lựa chọn Flash Deals
                </p>
            </div>

            <div class="col-span-12">
                <FormSelect
                    label="Flash Deals"
                    name="flash_deals_id"
                    :options="flashDealList"
                    @update:model-value="setFieldValue('product_id', [])"
                />
            </div>

            <div class="col-span-12">
                <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                    2. Lựa chọn sản phẩm
                </p>
            </div>

            <div
                v-if="flashDeals.flash_deals_id"
                class="col-span-12"
            >
                <FormSelectedProduct
                    name="product_id"
                    :flash-deals-id="flashDeals.flash_deals_id"
                />
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
