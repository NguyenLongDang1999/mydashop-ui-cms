<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Thương hiệu"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách thương hiệu">
                <template #create>
                    <ProductBrandCreate />
                </template>

                <ProductBrandDataTable />
            </BaseDataTableCard>
        </div>
    </section>
</template>
