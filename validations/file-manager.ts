// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const fileManagerLabel = {
    folder_name: 'Tên Folder'
}

// ** Schema
export const fileManager = v.object({
    folder_name: v.pipe(
        v.string(`${fileManagerLabel.folder_name} không được bỏ trống.`),
        v.nonEmpty(`${fileManagerLabel.folder_name} không được bỏ trống.`)
    )
})

export const fileManagerSchema = toTypedSchema(fileManager)

// ** Types
export type IFileManagerForm = v.InferInput<typeof fileManager>
