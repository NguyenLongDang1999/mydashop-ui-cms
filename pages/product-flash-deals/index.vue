<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Flash Deals"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách Flash Deals">
                <template #create>
                    <ProductFlashDealsCreate />
                </template>

                <ProductFlashDealsDataTable />
            </BaseDataTableCard>
        </div>
    </section>
</template>
