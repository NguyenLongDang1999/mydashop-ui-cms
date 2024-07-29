<script setup lang="ts">

// ** Data
const product = inject('product') as IProductSingleForm

// ** Computed
const hasTechnicalSpecifications = computed(() => product.technical_specifications && product.technical_specifications.length > 0)
</script>

<template>
    <div class="col-span-12">
        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
            2. Thông số kỹ thuật
        </p>
    </div>

    <div class="col-span-12">
        <FieldArray
            v-slot="{ push, remove }"
            name="technical_specifications"
        >
            <UButton
                icon="i-heroicons-plus"
                size="sm"
                color="primary"
                variant="solid"
                label="Thêm Thông Số"
                :trailing="false"
                @click="push({ title: '', content: '' })"
            />

            <div
                class="flex flex-col gap-4"
                :class="hasTechnicalSpecifications ? 'mt-4' : ''"
            >
                <div
                    v-for="(_, index) in product.technical_specifications"
                    :key="index"
                    class="grid gap-4 grid-cols-12"
                >
                    <div class="col-span-4">
                        <FormInput
                            :label="productLabel.technical_specifications.title"
                            :name="`technical_specifications[${index}].title`"
                        />
                    </div>

                    <div class="col-span-4">
                        <FormInput
                            :label="productLabel.technical_specifications.content"
                            :name="`technical_specifications[${index}].content`"
                        />
                    </div>

                    <div class="col-span-3">
                        <UButton
                            :ui="{ rounded: 'rounded-full' }"
                            icon="i-heroicons-trash"
                            size="sm"
                            color="red"
                            variant="solid"
                            class="mt-6"
                            @click="remove(index)"
                        />
                    </div>
                </div>
            </div>
        </FieldArray>
    </div>
</template>
