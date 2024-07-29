// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const label = {
    label: 'Tiêu đề',
    key: 'Key',
    value: 'Value',
    description: 'Mô tả',
    input_type: 'Loại nhập dữ liệu',
    setting_system_options: {
        id: 'Key',
        name: 'Value'
    }
}

// ** Schema
export const settingSystemForm = v.object({
    id: v.optional(v.string()),
    label: v.pipe(
        v.string(`${label.label} không được bỏ trống.`),
        v.nonEmpty(`${label.label} không được bỏ trống.`)
    ),
    key: v.pipe(
        v.string(`${label.key} không được bỏ trống.`),
        v.nonEmpty(`${label.key} không được bỏ trống.`)
    ),
    value: v.pipe(
        v.string(`${label.value} không được bỏ trống.`),
        v.nonEmpty(`${label.value} không được bỏ trống.`)
    ),
    description: v.optional(v.string()),
    input_type: v.number(`${label.value} không được bỏ trống.`),
    setting_system_options: v.optional(
        v.array(
            v.object({
                id: v.pipe(
                    v.string(`${label.setting_system_options.id} không được bỏ trống.`),
                    v.nonEmpty(`${label.setting_system_options.id} không được bỏ trống.`)
                ),
                name: v.pipe(
                    v.string(`${label.setting_system_options.name} không được bỏ trống.`),
                    v.nonEmpty(`${label.setting_system_options.name} không được bỏ trống.`)
                )
            })
        )
    )
})

export const settingSystemProductCategoryForm = v.object({
    product_category_id: v.array(v.string())
})

export const settingSystemProductCollectionForm = v.object({
    selected_product_collection_id: v.string(),
    product_collection_id: v.array(v.string()),
    product_collection: v.array(
        v.object({
            product_collection_id: v.string(),
            product_id: v.array(v.string())
        })
    )
})

export const metadata = v.object({
    theme_colour: v.string(),
    system: v.array(settingSystemForm)
})

export const settingSystemFormSchema = toTypedSchema(settingSystemForm)

export const settingSystemProductCategoryFormSchema = toTypedSchema(settingSystemProductCategoryForm)

export const settingSystemProductCollectionFormSchema = toTypedSchema(settingSystemProductCollectionForm)

// ** Types
export type ISettingSystemForm = v.InferInput<typeof settingSystemForm>

export type ISettingSystemProductCategoryForm = v.InferInput<typeof settingSystemProductCategoryForm>

export type ISettingSystemProductCollectionForm = v.InferInput<typeof settingSystemProductCollectionForm>

export type IMetadata = v.InferInput<typeof metadata>
