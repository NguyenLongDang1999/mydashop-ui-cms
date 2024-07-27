// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema Core Imports
import { aggregationsSchema, countSchema, paginationSchema } from './core'

// ** Label
export const label = {
    name: 'Tên danh mục',
    slug: 'Đường dẫn URL',
    parent_id: 'Danh mục cha',
    status: 'Trạng thái',
    description: 'Mô tả',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description'
}

// ** Schema
export const productCategoryForm = v.object({
    id: v.optional(v.string()),
    name: v.pipe(
        v.string(`${label.name} không được bỏ trống.`),
        v.nonEmpty(`${label.name} không được bỏ trống.`)
    ),
    slug: v.pipe(
        v.string(`${label.slug} không được bỏ trống.`),
        v.nonEmpty(`${label.slug} không được bỏ trống.`)
    ),
    parent_id: v.optional(v.string()),
    image_uri: v.optional(v.string()),
    status: v.optional(v.number()),
    description: v.optional(v.string()),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
})

export const productCategorySearch = v.object({
    ...paginationSchema.entries,
    name: v.optional(v.string()),
    parent_id: v.optional(v.string()),
    product_brand_id: v.optional(v.string()),
    status: v.optional(v.number()),
})

export const productCategoryList = v.object({
    id: v.string(),
    name: v.string(),
    image_uri: v.string(),
    product: v.array(countSchema)
})

export const productCategory = v.object({
    ...productCategoryList.entries,
    slug: v.string(),
    parentCategory: productCategoryList,
    status: v.number(),
    created_at: v.string(),
})

export const productCategoryTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productCategory)
})

export const productCategoryFormSchema = toTypedSchema(productCategoryForm)

export const productCategorySearchSchema = toTypedSchema(productCategorySearch)

// ** Types
export type IProductCategoryForm = v.InferInput<typeof productCategoryForm>

export type IProductCategorySearch = v.InferInput<typeof productCategorySearch>

export type IProductCategoryList = v.InferInput<typeof productCategoryList>

export type IProductCategory = v.InferInput<typeof productCategory>

export type IProductCategoryTable = v.InferInput<typeof productCategoryTable>
