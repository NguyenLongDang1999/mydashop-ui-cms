// ** VeeValidate Imports
import * as v from 'valibot'

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
    technical_specifications: v.optional(
        v.array(
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
        )
    ),
    price: v.optional(v.number(`${productLabel.price} không được bỏ trống.`), 0),
    quantity: v.optional(v.number(), 0),
    special_price_type: v.optional(v.number(`${productLabel.special_price_type} không được bỏ trống.`), SPECIAL_PRICE.PRICE),
    special_price: v.optional(v.number(`${productLabel.special_price} không được bỏ trống.`), 0),
    manage_inventory: v.optional(v.number(), MANAGE_INVENTORY.NO),
    product_brand_id: v.optional(v.string()),
    status: v.optional(v.number()),
    image_uri: v.nullish(v.string()),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string())
})

export const productVariants = v.object({
    is_default: v.boolean(),
    label: v.optional(v.string()),
    price: v.number(`${productLabel.price} không được bỏ trống.`),
    quantity: v.number(`${productLabel.quantity} không được bỏ trống.`),
    special_price_type: v.number(`${productLabel.special_price_type} không được bỏ trống.`),
    special_price: v.number(`${productLabel.special_price} không được bỏ trống.`),
    manage_inventory: v.number(),
    product_attribute_value_id: v.optional(v.array(v.string()))
})

export const productImagesForm = v.object({
    id: v.optional(v.string()),
    image_uri: v.nullish(v.string()),
    product_images: v.array(
        v.object({
            id: v.optional(v.string()),
            image_uri: v.nullish(v.string())
        })
    )
})

export const productRelationsForm = v.object({
    id: v.optional(v.string()),
    product_id: v.array(v.string()),
    product_relation_type: v.optional(v.number())
})

export const productVariantForm = v.object({
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
    technical_specifications: v.optional(
        v.array(
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
        )
    ),
    product_brand_id: v.optional(v.string()),
    product_attribute_id: v.pipe(
        v.array(v.string(), `${productLabel.attribute.name} không được bỏ trống.`),
        v.minLength(1, `${productLabel.attribute.name} không được bỏ trống.`)
    ),
    product_attributes: v.pipe(
        v.array(
            v.object({
                name: v.pipe(
                    v.string(`${productLabel.attribute.name} không được bỏ trống.`),
                    v.nonEmpty(`${productLabel.attribute.name} không được bỏ trống.`)
                ),
                values: v.pipe(
                    v.array(v.string(), `${productLabel.attribute.values} không được bỏ trống.`),
                    v.minLength(1, `${productLabel.attribute.values} không được bỏ trống.`)
                )
            }),
            `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`
        ),
        v.minLength(1, `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`)
    ),
    product_variants: v.pipe(
        v.array(productVariants, `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`),
        v.minLength(1, `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`)
    ),
    product_images: v.optional(v.array(productImagesForm)),
    status: v.optional(v.number()),
    image_uri: v.nullish(v.string()),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    product_upsell: v.optional(v.array(v.string())),
    product_cross_sell: v.optional(v.array(v.string())),
    product_related: v.optional(v.array(v.string()))
})

export const productUpdateGeneralVariantForm = v.object({
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
    description: v.pipe(
        v.string(`${productLabel.description} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.description} không được bỏ trống.`)
    ),
    short_description: v.optional(v.string()),
    technical_specifications: v.optional(
        v.array(
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
        )
    ),
    is_variant: v.optional(v.boolean(), true),
    status: v.optional(v.number()),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string())
})

export const productUpdateVariantAttributeForm = v.object({
    id: v.optional(v.string()),
    product_category_id: v.pipe(
        v.string(`${productLabel.product_category_id} không được bỏ trống.`),
        v.nonEmpty(`${productLabel.product_category_id} không được bỏ trống.`)
    ),
    product_attribute_id: v.pipe(
        v.array(v.string(), `${productLabel.attribute.name} không được bỏ trống.`),
        v.minLength(1, `${productLabel.attribute.name} không được bỏ trống.`)
    ),
    product_attributes: v.pipe(
        v.array(
            v.object({
                id: v.optional(v.string()),
                name: v.pipe(
                    v.string(`${productLabel.attribute.name} không được bỏ trống.`),
                    v.nonEmpty(`${productLabel.attribute.name} không được bỏ trống.`)
                ),
                values: v.pipe(
                    v.array(v.string(), `${productLabel.attribute.values} không được bỏ trống.`),
                    v.minLength(1, `${productLabel.attribute.values} không được bỏ trống.`)
                )
            }),
            `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`
        ),
        v.minLength(1, `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`)
    ),
    product_variants: v.pipe(
        v.array(productVariants, `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`),
        v.minLength(1, `${productLabel.attribute.name} phải có ít nhất 1 giá trị.`)
    ),
    product_brand_id: v.optional(v.string())
})

export const productSearch = v.object({
    ...paginationSchema.entries,
    sku: v.optional(v.string()),
    name: v.optional(v.string()),
    product_brand_id: v.optional(v.string()),
    product_category_id: v.optional(v.string()),
    status: v.optional(v.number()),
    product_type: v.optional(v.number()),
    not_flash_deals: v.optional(v.boolean()),
    product_id_flash_deals: v.optional(v.string())
})

export const product = v.object({
    id: v.string(),
    sku: v.string(),
    name: v.string(),
    slug: v.string(),
    price: v.number(),
    quantity: v.number(),
    image_uri: v.string(),
    special_price: v.number(),
    special_price_type: v.number(),
    hasFlashDeals: v.boolean(),
    status: v.number(),
    created_at: v.string(),
    productBrand: productBrandList,
    productCategory: productCategoryList
})

export const productSingleFormSchema = toTypedSchema(productSingleForm)

export const productVariantFormSchema = toTypedSchema(productVariantForm)

export const productUpdateGeneralVariantFormSchema = toTypedSchema(productUpdateGeneralVariantForm)

export const productUpdateVariantAttributeFormSchema = toTypedSchema(productUpdateVariantAttributeForm)

export const productRelationsFormSchema = toTypedSchema(productRelationsForm)

export const productSearchSchema = toTypedSchema(productSearch)

export const productImagesFormSchema = toTypedSchema(productImagesForm)

// ** Types
export type IProductSingleForm = v.InferInput<typeof productSingleForm>

export type IProductVariants = v.InferInput<typeof productVariants>

export type IProductVariantForm = v.InferInput<typeof productVariantForm>

export type IProductUpdateGeneralVariantForm = v.InferInput<typeof productUpdateGeneralVariantForm>

export type IProductUpdateVariantAttributeForm = v.InferInput<typeof productUpdateVariantAttributeForm>

export type IProductRelationsForm = v.InferInput<typeof productRelationsForm>

export type IProductSearch = v.InferInput<typeof productSearch>

export type IProduct = v.InferInput<typeof product>

export type IProductImagesForm = v.InferInput<typeof productImagesForm>

// ** Default Values
export const productSingleFormDefaultValues = v.getDefaults(productSingleForm)
