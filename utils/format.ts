export const formatDateTime = (date: string | Date) => useDateFormat(date, FORMAT.DATE_TIME).value

export const formatCurrency = (amount: string | number) => {
    const formatAmount = Number(amount)

    return formatAmount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })
}

export const formatPathFile = (originalPath: string, ObjectName: string) => originalPath.replace(/^\/images-data/, '') + ObjectName

export const formatSellingPrice = (row: IProduct | unknown) => {
    let discount = 0
    let sellingPrice = 0

    const productRow = row as IProduct

    const formatPrice = Number(productRow.price)
    const formatSpecialPrice = Number(productRow.special_price)

    if (areValuesEqual(productRow.special_price_type, SPECIAL_PRICE.PERCENT)) {
        discount = (formatPrice / 100) * formatSpecialPrice
        sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
    }

    if (areValuesEqual(productRow.special_price_type, SPECIAL_PRICE.PRICE)) {
        discount = formatSpecialPrice
        sellingPrice = formatPrice - discount
    }

    return formatCurrency(sellingPrice)
}
