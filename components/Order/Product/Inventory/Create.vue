<script setup lang="ts">

// ** Props & Emits
interface Props {
    productInventory: IProductInventory
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductInventoryFormInput()

const { handleSubmit } = useForm<IProductInventoryForm>({
    validationSchema: productInventoryFormSchema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        product_variant_id: props.productInventory.id,
        quantity: values.quantity
    })

    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="xs"
        color="primary"
        variant="solid"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
    >
        <UForm
            :state="productInventoryFormSchema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <BaseCardTitle title="Tạo hàng tồn kho">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </BaseCardTitle>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-6 col-span-12">
                        <ULink :to="goToPage(ROUTER.PRODUCT_GENERAL, productInventory.product.id, ROUTER.PRODUCT)">
                            <div class="flex items-center gap-1">
                                <UAvatar
                                    :src="getPathImageFile(productInventory.product.image_uri)"
                                    :alt="productInventory.product.name"
                                />

                                <div class="flex flex-col flex-1 truncate">
                                    <span class="capitalize text-primary truncate">{{ productInventory.product.name }}</span>
                                    <strong>SKU: {{ productInventory.product.sku }}</strong>
                                    <span>{{ productInventory.label }}</span>
                                </div>
                            </div>
                        </ULink>
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :label="productInventoryLabel.quantity"
                            name="quantity"
                        />
                    </div>

                    <div class="col-span-12">
                        <div class="flex justify-start gap-4">
                            <UButton
                                type="submit"
                                size="sm"
                                variant="solid"
                                label="Thêm Mới"
                                :loading="Boolean(isPending)"
                                :trailing="false"
                            />

                            <UButton
                                type="reset"
                                size="sm"
                                color="gray"
                                variant="solid"
                                label="Huỷ Bỏ"
                                :trailing="false"
                                @click="isOpen = false"
                            />
                        </div>
                    </div>
                </div>
            </UCard>
        </UForm>
    </UModal>
</template>
