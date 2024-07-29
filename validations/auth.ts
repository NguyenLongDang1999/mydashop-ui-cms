// ** VeeValidate Imports
import * as v from 'valibot'

// ** Label
export const authLabel = {
    email: 'Email',
    password: 'Mật khẩu'
}

// ** Schema
export const authLogin = v.object({
    email: v.pipe(
        v.string(`${authLabel.email} không được bỏ trống.`),
        v.email(`${authLabel.email} không đúng định dạng.`),
        v.nonEmpty(`${authLabel.email} không được bỏ trống.`)
    ),
    password: v.pipe(
        v.string(`${authLabel.password} không được bỏ trống.`),
        v.nonEmpty(`${authLabel.password} không được bỏ trống.`),
        v.minLength(6, `${authLabel.password} phải từ 6 - 20 ký tự.`),
        v.maxLength(20, `${authLabel.password} phải từ 6 - 20 ký tự.`)
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
