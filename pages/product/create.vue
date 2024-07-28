<script setup lang="ts">

// ** useHooks
const route = useRoute()

// ** Computed
const productType = computed(() => route.query?.product_type as string)
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Sản phẩm"
        />

        <div class="mt-8 pb-24 max-w-none">
            <ProductProductCreateSingle v-if="areValuesEqual(productType, PRODUCT_TYPE_TEXT.SINGLE)" />
            <!-- <ProductProductCreateVariants v-if="areValuesEqual(productType, PRODUCT_TYPE_TEXT.VARIANT)" /> -->
        </div>
    </section>
</template>
