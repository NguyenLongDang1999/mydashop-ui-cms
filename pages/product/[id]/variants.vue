<script setup lang="ts">

// ** useHooks
const { data, links } = await useProductRetrieve()
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật sản phẩm: ${data.name}`"
        :links="links"
    >
        <ProductProductRetrieveVariants :data="data" />
    </BaseRetrieve>
</template>
