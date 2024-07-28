<script setup lang="ts">

// ** Types Imports
import type { DropdownItem } from '#ui/types';

// ** Data
const items: DropdownItem[][] = [
    [
        {
            label: 'Sản phẩm đơn',
            to: goToPage(`create?product_type=${PRODUCT_TYPE_TEXT.SINGLE}`, ROUTER.PRODUCT)
        },
        {
            label: 'Sản phẩm biến thể',
            to: goToPage(`create?product_type=${PRODUCT_TYPE_TEXT.VARIANT}`, ROUTER.PRODUCT)
        }
    ]
]
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Sản phẩm"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách sản phẩm">
                <template #create>
                    <UDropdown
                        :items="items"
                        :popper="{ placement: 'bottom-start' }"
                    >
                        <UButton
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Mới"
                            trailing-icon="i-heroicons-chevron-down-20-solid"
                        />
                    </UDropdown>
                </template>

                <ProductProductDataTable />
            </BaseDataTableCard>
        </div>
    </section>
</template>
