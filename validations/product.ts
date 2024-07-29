// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema Core Imports
// import { aggregationsSchema, countSchema, paginationSchema } from './core'

// ** Label
export const productLabel = {
    sku: 'Mã sản phẩm',
    name: 'Tên sản phẩm',
    slug: 'Đường dẫn URL',
    product_category_id: 'Danh mục',
    product_type: 'Loại sản phẩm',
    product_brand_id: 'Thương hiệu',
    status: 'Trạng thái',
    quantity: 'Số lượng',
    manage_inventory: 'Quản lý hàng tồn kho?',
    price: 'Giá tiền',
    special_price: 'Giá ưu đãi',
    special_price_type: 'Loại ưu đãi',
    selling_price: 'Giá bán',
    technical_specifications: {
        name: 'Thông số kỹ thuật',
        title: 'Tiêu đề',
        content: 'Nội dung'
    },
    attribute: {
        name: 'Thuộc tính',
        values: 'Giá trị'
    },
    short_description: 'Mô tả ngắn',
    description: 'Mô tả chi tiết',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description',
    related_products: 'Sản phẩm liên quan',
    upsell_products: 'Sản phẩm UpSell',
    cross_sell_products: 'Sản phẩm CrossSell'
}

// ** Schema
export const productSingleForm = v.object({
    id: v.optional(v.string()),
    sku: v.pipe(
        v.string(`${productLabel.sku} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.sku} không được bỏ trống.`)
    ),
    name: v.pipe(
        v.string(`${productLabel.name} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.name} không được bỏ trống.`)
    ),
    slug: v.pipe(
        v.string(`${productLabel.slug} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.slug} không được bỏ trống.`)
    ),
    product_category_id: v.pipe(
        v.string(`${productLabel.product_category_id} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.product_category_id} không được bỏ trống.`)
    ),
    description: v.pipe(
        v.string(`${productLabel.description} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.description} không được bỏ trống.`)
    ),
    short_description: v.optional(v.string()),
    technical_specifications: v.array(
        v.object({
            title: v.pipe(
                v.string(`${productLabel.technical_specifications.title} không được bỏ trống.`),
                v.nonEmpty(`${productLabel.technical_specifications.title} không được bỏ trống.`)
            ),
            content: v.pipe(
                v.string(`${productLabel.technical_specifications.content} không được bỏ trống.`),
                v.nonEmpty(`${productLabel.technical_specifications.content} không được bỏ trống.`)
            )
        })
    ),
    price: v.number(`${productLabel.price} không được bỏ trống.`),
    quantity: v.number(`${productLabel.quantity} không được bỏ trống.`),
    special_price_type: v.number(`${productLabel.special_price_type} không được bỏ trống.`),
    special_price: v.number(`${productLabel.special_price} không được bỏ trống.`),
    manage_inventory: v.optional(v.number()),
    product_type: v.optional(v.number()),
    product_brand_id: v.optional(v.string()),
    status: v.optional(v.number()),
    image_uri: v.optional(v.string()),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string())
})

export const productSingleFormSchema = toTypedSchema(productSingleForm)

// ** Types
export type IProductSingleForm = v.InferInput<typeof productSingleForm>
