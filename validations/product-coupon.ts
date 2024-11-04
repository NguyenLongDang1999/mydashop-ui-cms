// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const productCouponLabel = {
    code: 'Code',
    description: 'Mô tả',
    status: 'Trạng thái',
    discount_value: 'Giá ưu đãi',
    discount_type: 'Loại ưu đãi',
    date_range: 'Ngày áp dụng',
    minimum_order_value: 'Giá trị đơn hàng tối thiểu',
    max_uses: 'Số lần sử dụng'
}

// ** Schema
export const productCouponForm = v.object({
    id: v.optional(v.string()),
    code: v.pipe(
        v.string(`${productCouponLabel.code} không được bỏ trống.`),
        v.nonEmpty(`${productCouponLabel.code} không được bỏ trống.`)
    ),
    start_date: v.optional(v.date()),
    end_date: v.optional(v.date()),
    date_range: v.optional(
        v.object({
            start: v.optional(v.date()),
            end: v.optional(v.date())
        })
    ),
    minimum_order_value: v.optional(v.number(`${productCouponLabel.discount_value} không được bỏ trống.`), 0),
    discount_type: v.optional(v.number(`${productCouponLabel.discount_type} không được bỏ trống.`), SPECIAL_PRICE.PRICE),
    discount_value: v.optional(v.number(`${productCouponLabel.discount_value} không được bỏ trống.`), 0),
    max_uses: v.optional(v.number(`${productCouponLabel.max_uses} không được bỏ trống.`), 0),
    description: v.optional(v.string()),
    status: v.optional(v.number())
})

export const productCouponSearch = v.object({
    ...paginationSchema.entries,
    code: v.optional(v.string()),
    status: v.optional(v.number())
})

export const productCoupon = v.object({
    ...countSchema.entries,
    id: v.string(),
    code: v.string(),
    start_date: v.string(),
    end_date: v.string(),
    minimum_order_value: v.number(),
    discount_type: v.number(),
    discount_value: v.number(),
    max_uses: v.number(),
    status: v.number(),
    created_at: v.string()
})

export const productCouponTable = v.object({
    ...aggregationsSchema.entries,
    data: v.array(productCoupon)
})

export const productCouponFormSchema = toTypedSchema(productCouponForm)

export const productCouponSearchSchema = toTypedSchema(productCouponSearch)

// ** Types
export type IProductCouponForm = v.InferInput<typeof productCouponForm>

export type IProductCouponSearch = v.InferInput<typeof productCouponSearch>

export type IProductCoupon = v.InferInput<typeof productCoupon>

export type IProductCouponTable = v.InferInput<typeof productCouponTable>
