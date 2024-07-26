export default function (description = 'Thao tác thành công!') {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: 'Thành Công',
        description,
        icon: 'i-heroicons-check-circle'
    })
}

export const useNotificationError = (description = 'Có lỗi xảy ra. Vui lòng kiểm tra lại!') => {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: 'Thất Bại',
        description: description,
        icon: 'i-heroicons-x-circle',
        color: 'red'
    })
}

export const useNotificationMessage = (message: string | number) => {
    switch (message) {
        case HTTP_CODE.CONFLICT:
            return useNotificationError(MESSAGE.CONFLICT)

        case HTTP_CODE.UNAUTHORIZED:
            return useNotificationError('Không xác định!')

        default:
            return useNotificationError()
    }
}
