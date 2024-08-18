// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const settingSystemLabel = {
    label: 'Tiêu đề',
    key: 'Key',
    value: 'Value',
    description: 'Mô tả',
    input_type: 'Loại nhập dữ liệu',
    setting_system_options: {
        id: 'Key',
        name: 'Value'
    },
    home_slider: {
        image_uri: 'Ảnh đại diện',
        image_link: 'Đường dẫn URL'
    }
}

// ** Schema
export const settingSystemForm = v.object({
    id: v.optional(v.string()),
    label: v.pipe(
        v.string(`${settingSystemLabel.label} không được bỏ trống.`),
        v.nonEmpty(`${settingSystemLabel.label} không được bỏ trống.`)
    ),
    key: v.pipe(
        v.string(`${settingSystemLabel.key} không được bỏ trống.`),
        v.nonEmpty(`${settingSystemLabel.key} không được bỏ trống.`)
    ),
    value: v.pipe(
        v.string(`${settingSystemLabel.value} không được bỏ trống.`),
        v.nonEmpty(`${settingSystemLabel.value} không được bỏ trống.`)
    ),
    redis_key: v.optional(v.string()),
    description: v.optional(v.string()),
    input_type: v.number(`${settingSystemLabel.value} không được bỏ trống.`),
    setting_system_options: v.optional(
        v.array(
            v.object({
                id: v.pipe(
                    v.string(`${settingSystemLabel.setting_system_options.id} không được bỏ trống.`),
                    v.nonEmpty(`${settingSystemLabel.setting_system_options.id} không được bỏ trống.`)
                ),
                name: v.pipe(
                    v.string(`${settingSystemLabel.setting_system_options.name} không được bỏ trống.`),
                    v.nonEmpty(`${settingSystemLabel.setting_system_options.name} không được bỏ trống.`)
                )
            })
        )
    )
})

export const settingSystemProductCategoryForm = v.object({
    product_category_id: v.array(v.string())
})

export const settingSystemSliderForm = v.object({
    home_slider: v.array(
        v.object({
            image_uri: v.pipe(
                v.string(`${settingSystemLabel.home_slider.image_uri} không được bỏ trống.`),
                v.nonEmpty(`${settingSystemLabel.home_slider.image_uri} không được bỏ trống.`)
            ),
            image_link: v.pipe(
                v.string(`${settingSystemLabel.home_slider.image_link} không được bỏ trống.`),
                v.nonEmpty(`${settingSystemLabel.home_slider.image_link} không được bỏ trống.`),
                v.url(`${settingSystemLabel.home_slider.image_link} không đúng định dạng.`)
            )
        })
    )
})

export const settingSystemProductCollectionForm = v.intersect([
    v.object({
        selected_product_collection_id: v.string(),
        product_collection_id: v.array(v.string())
    }),
    v.record(v.string(), v.union([v.string(), v.array(v.string())]))
])

export const settingSystemProductFlashDealsForm = v.object({
    flash_deals_id: v.string(),
    product_id: v.array(v.string())
})

export const metadata = v.object({
    theme_colour: v.string(),
    system: v.array(settingSystemForm)
})

export const settingSystemFormSchema = toTypedSchema(settingSystemForm)

export const settingSystemSliderFormSchema = toTypedSchema(settingSystemSliderForm)

export const settingSystemProductCategoryFormSchema = toTypedSchema(settingSystemProductCategoryForm)

export const settingSystemProductCollectionFormSchema = toTypedSchema(settingSystemProductCollectionForm)

export const settingSystemProductFlashDealsFormSchema = toTypedSchema(settingSystemProductFlashDealsForm)

// ** Types
export type ISettingSystemForm = v.InferInput<typeof settingSystemForm>

export type ISettingSystemSliderForm = v.InferInput<typeof settingSystemSliderForm>

export type ISettingSystemProductCategoryForm = v.InferInput<typeof settingSystemProductCategoryForm>

export type ISettingSystemProductCollectionForm = v.InferInput<typeof settingSystemProductCollectionForm>

export type ISettingSystemProductFlashDealsForm = v.InferInput<typeof settingSystemProductFlashDealsForm>

export type IMetadata = v.InferInput<typeof metadata>
