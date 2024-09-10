// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const productCollectionLabel = {
    title: 'Tên bộ sưu tập',
    slug: 'Đường dẫn URL',
    status: 'Trạng thái',
    product_id: 'Lựa chọn sản phẩm'
}

// ** Schema
export const productCollectionForm = v.object({
    id: v.optional(v.string()),
    title: v.pipe(
        v.string(`${productCollectionLabel.title} không được bỏ trống.`),
        v.nonEmpty(`${productCollectionLabel.title} không được bỏ trống.`)
    ),
    slug: v.pipe(
        v.string(`${productCollectionLabel.slug} không được bỏ trống.`),
        v.nonEmpty(`${productCollectionLabel.slug} không được bỏ trống.`)
    ),
    product_id: v.pipe(
        v.array(v.string(), `${productCollectionLabel.product_id} không được bỏ trống.`),
        v.minLength(1, `${productCollectionLabel.product_id} không được bỏ trống.`)
    ),
    status: v.optional(v.number())
})

export const productCollectionSearch = v.object({
    ...paginationSchema.entries,
    title: v.optional(v.string()),
    status: v.optional(v.number())
})

export const productCollectionList = v.object({
    id: v.string(),
    name: v.string(),
    product_id: v.array(v.string())
})

export const productCollection = v.object({
    ...countSchema.entries,
    id: v.string(),
    title: v.string(),
    slug: v.string(),
    status: v.number(),
    created_at: v.string()
})

export const productCollectionTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productCollection)
})

export const productCollectionFormSchema = toTypedSchema(productCollectionForm)

export const productCollectionSearchSchema = toTypedSchema(productCollectionSearch)

// ** Types
export type IProductCollectionForm = v.InferInput<typeof productCollectionForm>

export type IProductCollectionSearch = v.InferInput<typeof productCollectionSearch>

export type IProductCollectionList = v.InferInput<typeof productCollectionList>

export type IProductCollection = v.InferInput<typeof productCollection>

export type IProductCollectionTable = v.InferInput<typeof productCollectionTable>
