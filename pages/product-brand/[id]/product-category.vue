<script setup lang="ts">

// ** useHooks
const { data, links } = await useProductBrandRetrieve()

// ** Data
provide('productBrandId', data.value?.id)
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật thương hiệu: ${data.name}`"
        :links="links"
    >
        <BaseDataTablePage title="Thuộc tính">
            <ProductCategoryDataTable />
        </BaseDataTablePage>
    </BaseRetrieve>
</template>
