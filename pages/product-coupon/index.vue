<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Coupon"
        />

        <div class="mt-8 pb-24 max-w-none">
            <BaseDataTableCard title="Danh sách Coupon">
                <template #create>
                    <ProductCouponCreate />
                </template>

                <ProductCouponDataTable />
            </BaseDataTableCard>
        </div>
    </section>
</template>
