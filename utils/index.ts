// ** Validations Imports
import type { IOptions } from '~/validations/core'

export const valueTransform = (options: IOptions[], value: string | number) => options.find(val => areValuesEqual(val.id, value))

export const goToPage = (pageName?: number | string, currentPath?: string, prefixPath?: string): string => {
    const basePath = prefixPath ? `${prefixPath}/${currentPath}` : currentPath || ''
    const fullPath = pageName !== undefined ? `${basePath}/${pageName}` : basePath

    return fullPath.replace(/\/\/+/g, '/').replace(/\/$/, '')
}

export const getPathImageFile = (name?: string): string => {
    if (name) {
        return name.startsWith('https://') ? name : `${PATH.BUNNY_CDN_URL}${name}`
    }

    return IMAGE.DEFAULT
}

export const pathQueryKey = (pathKey: string, id: string | string[]) => pathKey.replace('$id', id as string)

export const minWithColumn = (width: number) => `min-w-[${width}px]`

export const areValuesEqual = (firstValue: number | string, secondValue: number | string) => String(firstValue) === String(secondValue)

export const clearObject = <T extends object>(data: T) => _keys(data).forEach(key => delete data[key as keyof T])
