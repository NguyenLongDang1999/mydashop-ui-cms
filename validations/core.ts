// ** VeeValidate Imports
import * as v from 'valibot'

// ** Schema
export const paginationSchema = v.object({
    page: v.optional(
        v.number(),
        PAGE.CURRENT
    ),
    pageSize: v.optional(
        v.number(),
        PAGE.SIZE
    )
})

export const optionsSchema = v.object({
    id: v.union([v.string(), v.number()]),
    name: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    color: v.optional(v.string())
})

export const deleteRecordSchema = v.object({
    id: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    slug: v.optional(v.string())
})

export const aggregationsSchema = v.required(
    v.object({
        aggregations: v.optional(v.number())
    })
)

export const countSchema = v.required(
    v.object({
        _count: v.optional(v.number())
    })
)

// ** Types
export type IDeleteRecord = v.InferInput<typeof deleteRecordSchema>

export type IPagination = v.InferInput<typeof paginationSchema>

export type IOptions = v.InferInput<typeof optionsSchema>

export interface IRow<T> {
    row: T
}

export interface Columns {
    [key: string]: unknown;
    key: string;
    sortable?: boolean | undefined;
    direction?: 'desc' | 'asc' | undefined;
    class?: string | undefined;
}
