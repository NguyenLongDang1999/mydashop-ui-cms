<template>
    <div class="col-span-12">
        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
            3. Mô tả sản phẩm
        </p>
    </div>

    <div class="col-span-12">
        <FormTextarea
            :label="productLabel.short_description"
            name="short_description"
        />
    </div>

    <div class="col-span-12">
        <FormEditor
            :label="productLabel.description"
            name="description"
        />
    </div>
</template>
