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
