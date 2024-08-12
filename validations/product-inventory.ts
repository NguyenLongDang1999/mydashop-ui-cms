// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const productInventoryLabel = {
    quantity: 'Số lượng'
}

// ** Schema
export const productInventoryForm = v.object({
    quantity: v.number(`${productInventoryLabel.quantity} không được bỏ trống.`)
})

export const productInventory = v.object({
    id: v.string(),
    sku: v.string(),
    label: v.string(),
    product,
    productInventory: v.object({
        quantity: v.number()
    })
})

export const productInventoryTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productInventory)
})

export const productInventoryFormSchema = toTypedSchema(productInventoryForm)

// ** Types
export type IProductInventoryForm = v.InferInput<typeof productInventoryForm>

export type IProductInventory = v.InferInput<typeof productInventory>

export type IProductInventoryTable = v.InferInput<typeof productInventoryTable>
