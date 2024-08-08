// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.PRODUCT_COLLECTION)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`
}

const pathKey = {
    index: path.value,
    id: `${path.value}/$id`,
    dataList: `${path.value}/data-list`
}

export const productCollectionColumns: Columns[] = [
    {
        key: PRODUCT_COLLECTION_KEYS.NAME,
        label: 'Thông tin bộ sưu tập',
        class: minWithColumn(250)
    },
    {
        key: PRODUCT_COLLECTION_KEYS.STATUS,
        label: 'Trạng thái'
    },
    {
        key: PRODUCT_COLLECTION_KEYS.CREATED_AT,
        label: 'Ngày tạo',
        class: minWithColumn(160)
    },
    {
        key: CORE_KEYS.ACTION,
        label: 'Thao tác',
        class: minWithColumn(100)
    }
]

export const useProductCollectionDataTable = () => {
    // ** Data
    const search = reactive<IProductCollectionSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductCollectionTable>({
        queryKey: [queryKey.dataTable, search],
        queryFn: () => useFetcher(pathKey.index, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useProductCollectionDataList = () => {
    // ** useHooks
    const { data } = useQuery<IProductCollectionList[]>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(pathKey.dataList)
    })

    return computed(() => data.value || [])
}

export const useProductCollectionRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    const { data, suspense } = useQuery<IProductCollectionForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(pathQueryKey(pathKey.id, params.id))
    })

    await suspense()

    return {
        data: computed(() => data.value as IProductCollectionForm || {})
    }
}

export const useProductCollectionFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductCollectionForm, Error, IProductCollectionForm>({
        mutationFn: body => useFetcher(body.id ? pathQueryKey(pathKey.id, body.id) : pathKey.index, {
            method: body.id ? 'PATCH' : 'POST',
            body
        }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.SUCCESS)
        }
    })
}

export const useProductCollectionFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(pathQueryKey(pathKey.id, body.id), {
            method: 'DELETE',
            params: {
                slug: body.slug
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
