<script setup lang="ts">

// ** useHooks
const { data, links, productTypeSingle } = await useProductRetrieve()

// ** Computed
const productSingle = computed(() => data.value as unknown as IProductSingleForm)
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật sản phẩm: ${data.name}`"
        :links="links"
    >
        <ProductProductRetrieveGeneralSingle
            v-if="productTypeSingle"
            :data="productSingle"
        />

        <ProductProductRetrieveGeneralVariants
            v-else
            :data="data"
        />
    </BaseRetrieve>
</template>
