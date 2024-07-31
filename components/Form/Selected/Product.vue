<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
    notFlashDeals?: boolean
    productIdFlashDeals?: string
}

const props = defineProps<Props>()

// ** useHooks
const { errorMessage, setValue } = useField<string[]>(() => props.name, undefined, {
    syncVModel: true
})

// ** Data
const product_id = inject('product_id') as string[]
const selected = ref<IProduct[]>([])
const dataTable = ref<IProduct[]>([])
const productTableColumns = ref(_clone(productColumns))

// ** Set Data
productTableColumns.value.pop()

// ** Computed
const error = computed(() => errorMessage.value)

// ** Watch
watch(selected, newValue => setValue(newValue.map(_s => _s.id)))
watch(dataTable, () => selected.value = dataTable.value.filter(_d => product_id.includes(_d.id)))
</script>

<template>
    <UFormGroup
        :name="name"
        :error="error"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12">
                <ProductProductDataTable
                    v-model="selected"
                    @data-table="val => dataTable = val"
                />
            </div>
        </div>
    </UFormGroup>
</template>
