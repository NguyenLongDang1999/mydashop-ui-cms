<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Danh mục"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách danh mục">
                <template #create>
                    <ProductCategoryCreate />
                </template>

                <!-- <ProductCategoryDataTable /> -->
            </BaseDataTableCard>
        </div>
    </section>
</template>
