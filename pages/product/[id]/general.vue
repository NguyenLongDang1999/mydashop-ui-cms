<script setup lang="ts">

// ** useHooks
const { data, links, productTypeSingle } = await useProductRetrieve()
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật sản phẩm: ${data.name}`"
        :links="links"
    >
        <ProductProductRetrieveGeneralSingle
            v-if="productTypeSingle"
            :data="data"
        />

        <ProductProductRetrieveGeneralVariants
            v-else
            :data="data"
        />
    </BaseRetrieve>
</template>
