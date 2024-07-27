// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema Core Imports
import { aggregationsSchema, countSchema, paginationSchema } from './core'
import { productCategoryList } from './product-category'

// ** Label
export const label = {
    name: 'Tên thuộc tính',
    slug: 'Đường dẫn URL',
    product_category_id: 'Danh mục',
    status: 'Trạng thái',
    description: 'Mô tả',
    value: 'Giá trị thuộc tính'
}

// ** Schema
export const productAttributeForm = v.object({
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
    product_attribute_values: v.array(
        v.object({
            value: v.string(`${label.value} không được bỏ trống.`)
        })
    ),
    status: v.optional(v.number()),
    description: v.optional(v.string()),
})

export const productAttributeSearch = v.object({
    ...paginationSchema.entries,
    name: v.optional(v.string()),
    product_category_id: v.optional(v.string()),
    status: v.optional(v.number()),
})

export const productAttributeList = productCategoryList

export const productAttribute = v.object({
    id: v.string(),
    name: v.string(),
    slug: v.string(),
    status: v.number(),
    created_at: v.string(),
    productAttributeValues: v.array(countSchema),
    productCategoryAttributes: v.array(productCategoryList)
})

export const productAttributeTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productAttribute)
})

export const productAttributeFormSchema = toTypedSchema(productAttributeForm)

export const productAttributeSearchSchema = toTypedSchema(productAttributeSearch)

// ** Types
export type IProductAttributeForm = v.InferInput<typeof productAttributeForm>

export type IProductAttributeSearch = v.InferInput<typeof productAttributeSearch>

export type IProductAttributeList = v.InferInput<typeof productAttributeList>

export type IProductAttribute = v.InferInput<typeof productAttribute>

export type IProductAttributeTable = v.InferInput<typeof productAttributeTable>
