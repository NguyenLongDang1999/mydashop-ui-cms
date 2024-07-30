<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Bộ sưu tập"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách Bộ sưu tập">
                <template #create>
                    <ProductCollectionCreate />
                </template>

                <ProductCollectionDataTable />
            </BaseDataTableCard>
        </div>
    </section>
</template>
