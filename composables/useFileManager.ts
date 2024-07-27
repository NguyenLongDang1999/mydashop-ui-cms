// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Validations Imports
import type { Columns } from '~/validations/core'

// ** State
const path = ref<string>(ROUTE.FILE_MANAGER)
const pathURL = ref<string>('')

const queryKey = {
    dataTable: `${path.value}-data-table`
}

export const fileManagerColumns: Columns[] = [
    {
        key: 'name',
        label: 'Tiêu đề',
        class: minWithColumn(350)
    },
    {
        key: 'size',
        label: 'Kích thước',
        class: minWithColumn(160)
    },
    {
        key: 'date_modified',
        label: 'Ngày chỉnh sửa',
        class: minWithColumn(250)
    },
    {
        key: 'actions',
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export const useFileManagerDataTable = () => {
    // ** Data
    const search = ref<string>('')

    // ** Computed
    const pathSplit = computed(() => pathURL.value.split(','))

    // ** useHooks
    const { data, isFetching } = useQuery<{ ObjectName: string }[]>({
        queryKey: [queryKey.dataTable, pathURL],
        queryFn: () => useFetcher(path.value, {
            params: { path: pathURL.value }
        }),
        placeholderData: keepPreviousData
    })

    const dataTable = computed(() => {
        return data.value?.filter(({ ObjectName }) =>
            ObjectName.toLowerCase().includes(search.value.toLowerCase())
        ) || []
    })

    return {
        search,
        isFetching,
        pathURL,
        pathSplit,
        dataTable
    }
}

export const useFileManagerCreateFolder = () => {
    const queryClient = useQueryClient()

    return useMutation<{ folder_name: string }, Error, { folder_name: string }>({
        mutationFn: body => useFetcher(path.value, {
            method: 'POST',
            body,
            params: { path: pathURL.value }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable, pathURL] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationMessage(MESSAGE.ERROR)
    })
}

export const useFileManagerUploadFile = () => {
    const queryClient = useQueryClient()

    return useMutation<File, Error, FormData>({
        mutationFn: body => useFetcher(path.value, {
            method: 'PUT',
            body,
            params: { path: pathURL.value }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable, pathURL] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationMessage(MESSAGE.ERROR)
    })
}

export const useFileManagerDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<{ folder_name: string, is_folder: boolean }, Error, { folder_name: string, is_folder: boolean }>({
        mutationFn: body => useFetcher(path.value, {
            method: 'DELETE',
            body,
            params: { path: pathURL.value }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable, pathURL] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationMessage(MESSAGE.ERROR)
    })
}
