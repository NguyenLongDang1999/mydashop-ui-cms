<script setup lang="ts">

// ** Validations Imports
import { label, type IProductSingleForm } from '~/validations/product'

// ** Props & Emits
interface Props {
    isSingle?: boolean
}

withDefaults(defineProps<Props>(), {
    isSingle: true
})

// ** useHooks
const categoryList = useProductCategoryDataList()
const { category_id, brandList, isFetchingBrand } = useProductSelectedWithCategory()

// ** Data
const product = inject('product') as IProductSingleForm

// ** Computed
const isPercent = computed(() => areValuesEqual(product.special_price_type as number, SPECIAL_PRICE.PERCENT))
</script>

<template>
    <div class="col-span-12">
        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
            1. Thông tin chung
        </p>
    </div>

    <template v-if="isSingle">
        <div class="col-span-12">
            <FormUpload />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormInput
                :label="label.name"
                name="name"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormInput
                :label="label.slug"
                name="slug"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormInput
                :label="label.sku"
                name="sku"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormSelect
                :label="label.status"
                :options="optionStatus"
                name="status"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormSelect
                :label="label.product_category_id"
                :options="categoryList"
                name="product_category_id"
                @update:model-value="val => category_id = val"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormSelect
                :label="label.product_brand_id"
                :options="brandList"
                :loading="isFetchingBrand"
                name="product_brand_id"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormSelect
                :label="label.manage_inventory"
                :options="optionManageInventory"
                name="manage_inventory"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormMoney
                :label="label.quantity"
                :disabled="!areValuesEqual(product.manage_inventory as number, MANAGE_INVENTORY.YES)"
                name="quantity"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormSelect
                :label="label.special_price_type"
                :options="optionTypeDiscount"
                name="special_price_type"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormMoney
                :label="label.price"
                name="price"
                text-trailing="VNĐ"
                help="Giá Gốc"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormMoney
                :label="label.special_price"
                :text-trailing="isPercent ? '%' : 'VNĐ'"
                name="special_price"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormMoney
                :value="formatSellingPrice(product)"
                :label="label.selling_price"
                :help="`${!isPercent ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                name="selling_price"
                text-trailing="VNĐ"
                disabled
            />
        </div>
    </template>

    <template v-else>
        <div class="col-span-12">
            <FormUpload />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormInput
                :label="label.name"
                name="name"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormInput
                :label="label.slug"
                name="slug"
            />
        </div>

        <div class="md:col-span-4 sm:col-span-6 col-span-12">
            <FormSelect
                :label="label.status"
                :options="optionStatus"
                name="status"
            />
        </div>
    </template>
</template>
