<script setup lang="ts">

// ** useHooks
const { data, links } = await useProductRetrieve()

// ** Computed
const productImages = computed(() => ({
    id: data.value.id,
    image_uri: data.value.image_uri,
    product_images: data.value.product_images.map(_product => ({
        id: _product.id,
        image_uri: _product.image_uri
    }))
}))
</script>

<template>
    <BaseRetrieve
        :title="`Cập nhật sản phẩm: ${data.name}`"
        :links="links"
    >
        <ProductProductRetrieveImages :data="productImages" />
    </BaseRetrieve>
</template>
