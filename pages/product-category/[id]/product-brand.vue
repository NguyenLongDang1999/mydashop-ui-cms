<script setup lang="ts">

// ** useHooks
const { data, links } = await useProductCategoryRetrieve()

// ** Data
provide('productCategoryId', data.value?.id)
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật danh mục: ${data.name}`"
        :links="links"
    >
        <BaseDataTablePage title="Thương hiệu">
            <ProductBrandDataTable />
        </BaseDataTablePage>
    </BaseRetrieve>
</template>
