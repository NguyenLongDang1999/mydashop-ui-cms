// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const label = {
    email: 'Email',
    password: 'Mật khẩu'
}

// ** Schema
export const authLogin = v.object({
    email: v.pipe(
        v.string(`${label.email} không được bỏ trống.`),
        v.email(`${label.email} không đúng định dạng.`),
        v.nonEmpty(`${label.email} không được bỏ trống.`)
    ),
    password: v.pipe(
        v.string(`${label.password} không được bỏ trống.`),
        v.nonEmpty(`${label.password} không được bỏ trống.`),
        v.minLength(6, `${label.password} phải từ 6 - 20 ký tự.`),
        v.maxLength(20, `${label.password} phải từ 6 - 20 ký tự.`)
    )
})

export const authProfile = v.object({
    id: v.string(),
    name: v.string(),
    email: v.string(),
    image_uri: v.string()
})

export const authLoginSchema = toTypedSchema(authLogin)

// ** Types
export type IAuthLoginForm = v.InferInput<typeof authLogin>

export type IAuthProfile = v.InferInput<typeof authProfile>
