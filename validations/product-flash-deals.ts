// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const productFlashDealsLabel = {
    title: 'Tên Flash Deals',
    slug: 'Đường dẫn URL',
    status: 'Trạng thái',
    date_range: 'Ngày áp dụng',
    description: 'Mô tả',
    product_id: 'Lựa chọn sản phẩm',
    discounted_price: 'Giá ưu đãi',
    discounted_price_type: 'Loại ưu đãi'
}

// ** Schema
export const productFlashDealsForm = v.object({
    id: v.optional(v.string()),
    title: v.pipe(
        v.string(`${productFlashDealsLabel.title} không được bỏ trống.`),
        v.nonEmpty(`${productFlashDealsLabel.title} không được bỏ trống.`)
    ),
    slug: v.pipe(
        v.string(`${productFlashDealsLabel.slug} không được bỏ trống.`),
        v.nonEmpty(`${productFlashDealsLabel.slug} không được bỏ trống.`)
    ),
    status: v.optional(v.number()),
    description: v.optional(v.string()),
    start_time: v.optional(v.date()),
    end_time: v.optional(v.date()),
    date_range: v.optional(
        v.object({
            start: v.optional(v.date()),
            end: v.optional(v.date())
        })
    ),
    discounted_price: v.number(`${productFlashDealsLabel.discounted_price} không được bỏ trống.`),
    discounted_price_type: v.number(`${productFlashDealsLabel.discounted_price_type} không được bỏ trống.`),
    product_id: v.array(v.string())
})

export const productFlashDealsSearch = v.object({
    ...paginationSchema.entries,
    title: v.optional(v.string()),
    status: v.optional(v.number())
})

export const productFlashDealsList = v.object({
    id: v.string(),
    name: v.string()
})

export const productFlashDeals = v.object({
    id: v.string(),
    title: v.string(),
    slug: v.string(),
    status: v.number(),
    start_time: v.string(),
    end_time: v.string(),
    created_at: v.string(),
    discounted_price: v.string(),
    discounted_price_type: v.number()
})

export const productFlashDealsTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productFlashDeals)
})

export const productFlashDealsFormSchema = toTypedSchema(productFlashDealsForm)

export const productFlashDealsSearchSchema = toTypedSchema(productFlashDealsSearch)

// ** Types
export type IProductFlashDealsForm = v.InferInput<typeof productFlashDealsForm>

export type IProductFlashDealsSearch = v.InferInput<typeof productFlashDealsSearch>

export type IProductFlashDealsList = v.InferInput<typeof productFlashDealsList>

export type IProductFlashDeals = v.InferInput<typeof productFlashDeals>

export type IProductFlashDealsTable = v.InferInput<typeof productFlashDealsTable>
