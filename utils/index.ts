export const goToPage = (pageName?: number | string, currentPath?: string, prefixPath?: string) => {
    const basePath = prefixPath ? `${prefixPath}/${currentPath}` : currentPath
    const fullPath = pageName ? `${basePath}/${pageName}` : basePath

    return fullPath?.replace(/\/\/+/g, '/').replace(/\/$/, '')

}

export const pathQueryKey = (pathKey: string, id: string | string[]) => pathKey.replace('$id', id as string)

export const minWithColumn = (width: number) => `min-w-[${width}px]`

export const areValuesEqual = (firstValue: number | string, secondValue: number | string) => String(firstValue) === String(secondValue)

