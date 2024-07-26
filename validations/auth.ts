// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const label = {
    email: 'Email',
    password: 'Mật khẩu'
}

// ** Schema
export const authLoginSchema = v.object({
    email: v.pipe(
        v.string(),
        v.email(`${label.email} không đúng định dạng.`),
        v.nonEmpty(`${label.email} không được bỏ trống.`)
    ),
    password: v.pipe(
        v.string(),
        v.nonEmpty(`${label.password} không được bỏ trống.`),
        v.minLength(6, `${label.password} phải từ 6 - 20 ký tự.`),
        v.maxLength(20, `${label.password} phải từ 6 - 20 ký tự.`)
    )
})

// ** Types
export type IAuthLoginForm = v.InferInput<typeof authLoginSchema>
