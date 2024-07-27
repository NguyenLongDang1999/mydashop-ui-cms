<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Thuộc tính"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách thuộc tính">
                <template #create>
                    <ProductAttributeCreate />
                </template>

                <ProductAttributeDataTable />
            </BaseDataTableCard>
        </div>
    </section>
</template>
