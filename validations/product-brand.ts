// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema Core Imports
import { aggregationsSchema, paginationSchema } from './core'
import { productCategoryList } from './product-category'

// ** Label
export const label = {
    name: 'Tên thương hiệu',
    slug: 'Đường dẫn URL',
    product_category_id: 'Danh mục',
    status: 'Trạng thái',
    description: 'Mô tả'
}

// ** Schema
export const productBrandForm = v.object({
    id: v.optional(v.string()),
    name: v.pipe(
        v.string(`${label.name} không được bỏ trống.`),
        v.nonEmpty(`${label.name} không được bỏ trống.`)
    ),
    slug: v.pipe(
        v.string(`${label.slug} không được bỏ trống.`),
        v.nonEmpty(`${label.slug} không được bỏ trống.`)
    ),
    product_category_id: v.pipe(
        v.array(v.string(), `${label.product_category_id} không được bỏ trống.`),
        v.minLength(1, `${label.product_category_id} không được bỏ trống.`),
    ),
    image_uri: v.optional(v.string()),
    status: v.optional(v.number()),
    description: v.optional(v.string()),
})

export const productBrandSearch = v.object({
    ...paginationSchema.entries,
    name: v.optional(v.string()),
    product_category_id: v.optional(v.string()),
    status: v.optional(v.number()),
})

export const productBrandList = productCategoryList

export const productBrand = v.object({
    ...productBrandList.entries,
    slug: v.string(),
    status: v.number(),
    created_at: v.string(),
    productCategoryBrand: v.array(productCategoryList)
})

export const productBrandTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productBrand)
})

export const productBrandFormSchema = toTypedSchema(productBrandForm)

export const productBrandSearchSchema = toTypedSchema(productBrandSearch)

// ** Types
export type IProductBrandForm = v.InferInput<typeof productBrandForm>

export type IProductBrandSearch = v.InferInput<typeof productBrandSearch>

export type IProductBrandList = v.InferInput<typeof productBrandList>

export type IProductBrand = v.InferInput<typeof productBrand>

export type IProductBrandTable = v.InferInput<typeof productBrandTable>